import React from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Input } from "antd";
import { useState } from "react";
import { PostStripePaymentDetails } from "@/Services/payment.service";
import { RETURN_URL } from "@/Services/vendorService.services";

export default function CheckoutForm({ sumTotal }) {
    const stripe = useStripe();
    const elements = useElements();

    console.log("props ==>>", sumTotal);

  const [email, setEmail] = React.useState('');
  const [holderName, setHolderName] = React.useState('');
  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [ userData, setUserData ] = useState()


  React.useEffect(() => {
    fetchAllCartData();

    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          // handlePaymentSuccess(userData);
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const fetchAllCartData = async () => {
    try {
        const userToken = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        setUserData({
            "token": userToken, 
            "user_id": userId 
        });

      

    } catch (error) {
        console.log(error)
    }
  }

  // const handlePaymentSuccess = async (data) => {
  //   data.payment_status = "succeeded";
  //   console.log('Payment succeeded! Do something...', data);
  //   const response = await PostStripePaymentDetails(data);
  //   console.log("Payment Data ==>>", response)
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: RETURN_URL,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      console.log('An unexpected error occurred.', error)
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target.value)}
      />
      

      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit" 
      style={{    
        width: '100%',
        cursor:'pointer !important',
        color: "#F2F1F0",
        fontSize: "1rem",
        fontWeight: "600",
        backgroundColor: "#2C2C2C",
        height: "45px",
        marginTop: "0.2rem", 
        borderRadius:"5px",
        border:'none'
      }}>
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : `Pay $ ${sumTotal} now`}
        </span>
      </button>
      
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}