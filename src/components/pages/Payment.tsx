import { FormEvent } from 'react';
import Layout from "../layout";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { useRef, useState } from "react"
import { chargeCustomerCard } from "../../ajax";
import { PaymentResponse, PaymentRequest } from '../../types';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<PaymentResponse>();

  const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
    // Block native form submission.
    event.preventDefault();
    setMessage({status: ""});
    // Prevent submission if stripe is not ready
    if (!stripe || !elements) return;

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
      });

      if (error) return console.log('[error]', error);
      
      if (paymentMethod) {
        //console.log('[PaymentMethod]', paymentMethod);
        const { id } = paymentMethod ;

        if (id && amount) {
          //console.log(`Stripe Token: ${id}, Amount in cents: ${Number(amount.current?.value) * 100}`);
          const formData:PaymentRequest = {
            id,
            amount: Number(amount.current?.value) * 100
          };

          chargeCustomerCard(formData)
            .then(msg => msg && setMessage(msg))
            .catch(console.log);
        }
      }
    };
  }

  return <div id="payment_container">
    <form id="payment_form" onSubmit={handleSubmit}>
      <input ref={amount} type="text"  placeholder="Amount in USD" required />
      <CardElement />
      <button>Pay</button>
      <p style={{color:"red"}}>{message?.status}</p>
    </form>
  </div>
}

const Payment = () => {
  const stripePromise = loadStripe('pk_test_51GrsxpDr6Z4R7UKUmoPXHW7swHORfQcKX7XO6D9GqXVuM1qn6m5ywhZmVmFzgxMYD6oHwkJqCneMr4oUXuIzixt4003qzTIOiD');

  return <div className="Payment">
    <Elements stripe={stripePromise}> <CheckoutForm /> </Elements>

    <style>{`
      .Payment #payment_container {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .Payment #payment_form {
        margin-top: 20px;
        width: 400px;
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
        padding: 11px 15px 11px 0;
      }
    `}</style>
  </div>
};


export default Layout(Payment);