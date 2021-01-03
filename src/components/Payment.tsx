import { useState, useEffect, useRef, FormEvent } from 'react';
import loading from "../images/loading.gif";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { chargeCustomerCard } from "../ajax";
import { useSelector, useDispatch } from 'react-redux';
import { Store, PostableOrder } from '../types';
import { colors } from '../styles';
import { updateCartStorage } from '../util';
import { updateCart } from '../store/actions';

const CheckoutForm = () => {
  const { user, cart } = useSelector((store : Store) => store);
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string>('');
  const loadingGIF = useRef<HTMLImageElement>(null);
  const dispatch = useDispatch();

  const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
    // Block native form submission.
    event.preventDefault();
    // Prevent submission if stripe is not ready
    if (!stripe || !elements || !user || !cart.length) return;

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
        items: cart.map(({ id, quantity }) => ({ id, quantity }))
      };
      
      if (loadingGIF.current) loadingGIF.current.style.display = 'inline';
      chargeCustomerCard(formData)
        .then(() => {
          setMessage("Order placed successfully");
          dispatch( updateCart([]) );
          updateCartStorage(user, []);
        })
        .catch(() => setMessage("Could not process payment"))
        .finally(() => {
          //clear card info after submit to prevent duplicate payment
          cardElement?.clear();
          if (loadingGIF.current) loadingGIF.current.style.display = 'none'
        });
    }
  }
    
  return <div className="CheckoutForm">
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button>Place your order</button>
      <p style={{ color: colors.LIGHTEST }}>{message}</p>
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
  const cart = useSelector((store : Store) => store.cart);
  const [subtotal, setSubtotal] = useState<number>(0.00);

  useEffect(() => setSubtotal(cart.reduce((acc, {price, quantity}) => acc + (price * quantity), 0)), [cart]);

  return <div className="Payment">
    <h2>{cart.length ? `Subtotal: ${subtotal.toFixed(2)}` : 'Cart is empty'}</h2>
    <Elements stripe={stripePromise}> <CheckoutForm /> </Elements>

    <style>{`
      .Payment {
        max-height: 250px;
        border-radius: 1rem;
        box-shadow: 0px 5px 5px #ccc;
        margin: 2rem 3rem 1.75rem 3rem;
        padding: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
      
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
        padding: .75rem .75rem;
        border: 1px solid ${colors.GRAYSCALE[4]};
        border-radius: 15px;
      }
    `}</style>
  </div>
};


export default Payment;