import "./PaymentStyle.css";
import Layout from "../layout";
import { loadStripe } from "@stripe/stripe-js";
import {CardElement, useStripe, useElements, Elements} from '@stripe/react-stripe-js';
import {useRef, useState} from "react"
import {charge} from "../../ajax";
import { PaymentResponse, PaymentRequest} from '../../types';
const CheckoutForm = () => {
    const stripe = useStripe();
  const elements = useElements();
  const amount = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<PaymentResponse>();
  const handleSubmit = async (event:any) => {
    // Block native form submission.
    event.preventDefault();
    setMessage({status: ""});

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    if(cardElement) {
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
          });
          if (error) {
            console.log('[error]', error);
          } else {
            //console.log('[PaymentMethod]', paymentMethod);

            const {id}:{id:string}= paymentMethod! ;

            if(id && amount) {
              //console.log(`Stripe Token: ${id}, Amount in cents: ${Number(amount.current?.value) * 100}`);
              const formData:PaymentRequest = {
                id,
                amount: Number(amount.current?.value) * 100
              }
              charge(formData)
              .then(response => setMessage(response!))
              .catch(err => {
                console.log(err)
              }) 

            }

          }
        };
    }
    return(
      <div id="payment_container">
        <form id="payment_form" onSubmit={handleSubmit}>
          <input ref={amount} type="text"  placeholder="Amount in USD" required/>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
        <p style={{color:"red"}}>{message?.status}</p>
      </form>

      </div>
    )

}
const Payment = () => {
    const stripePromise = loadStripe('pk_test_51GrsxpDr6Z4R7UKUmoPXHW7swHORfQcKX7XO6D9GqXVuM1qn6m5ywhZmVmFzgxMYD6oHwkJqCneMr4oUXuIzixt4003qzTIOiD');
    return (
        <Elements stripe={stripePromise}>
        <CheckoutForm/>
        </Elements>
      );
    };


export default Layout(Payment);