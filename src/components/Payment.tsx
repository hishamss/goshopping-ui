import { useState, useRef, FormEvent } from 'react';
import loading from "../images/loading.gif";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { chargeCustomerCard } from "../ajax";
import { useSelector } from 'react-redux';
import { Store, PostableOrder } from '../types';
import { colors } from '../styles';

const CheckoutForm = () => {
  const user = useSelector(({ user } : Store) => user);
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string>('');
  const loadingGIF = useRef<HTMLImageElement>(null);

  const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
    // Block native form submission.
    event.preventDefault();
    // Prevent submission if stripe is not ready
    if (!stripe || !elements || !user) return;

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element. 
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;
    
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
    });
    if (error) return console.log(error);
    if (paymentMethod?.id) {
      const formData:PostableOrder = {
        userID: user.id,
        stripeToken: paymentMethod.id,
        items: [
          {
            id: 1,
            quantity:2
          },
          {
            id: 2,
            quantity:4
          }
        ]
      };
      
      loadingGIF.current!.style.display = 'inline';
      chargeCustomerCard(formData)
        .then(() => setMessage("Order placed successfully"))
        .catch(() => setMessage("Invalid card information"))
        .finally(() => {
          //clear card info after submit to prevent duplicate payment
          cardElement?.clear();
          loadingGIF.current!.style.display = 'none'
        });
    }
  }
    
  return <div className="CheckoutForm">
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button>Pay</button>
      <p style={{color: colors.LIGHTEST}}>{message}</p>
      <img ref={loadingGIF} className="loading-gif" src={loading} alt="Loading..." />
    </form>

    <style>{`
      .CheckoutForm {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .CheckoutForm form {
        margin-top: 20px;
        width: 400px;
      }

      .CheckoutForm .loading-gif {
        display: none;
        height: 30px;
        width: 30px;
      }
    `}</style>
  </div>
}

const Payment = () => {
  const [stripePromise] = useState(() => loadStripe('pk_test_51GrsxpDr6Z4R7UKUmoPXHW7swHORfQcKX7XO6D9GqXVuM1qn6m5ywhZmVmFzgxMYD6oHwkJqCneMr4oUXuIzixt4003qzTIOiD'));

  return <div className="Payment">
    <Elements stripe={stripePromise}> <CheckoutForm /> </Elements>

    <style>{`
      .Payment .FormGroup {
        margin: 0 15px 20px;
        padding: 0;
        border-style: none;
        background-color: #7795f8;
        will-change: opacity, transform;
        box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),
          inset 0 1px 0 #829fff;
        border-radius: 4px;
      }
      
      .Payment .FormRow {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        margin-left: 15px;
        border-top: 1px solid #819efc;
      }
      
      .Payment .StripeElement--webkit-autofill {
        background: transparent !important;
      }
      
      .Payment .StripeElement {
        width: 100%;
        // padding: 11px 15px 11px 0;
        padding: .75rem .75rem;
        border: 1px solid ${colors.GRAYSCALE[4]};
        border-radius: 15px;
      }
    `}</style>
  </div>
};


export default Payment;