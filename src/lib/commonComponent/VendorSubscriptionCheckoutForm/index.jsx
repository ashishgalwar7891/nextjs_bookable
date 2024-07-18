import React from "react";
import {
  PaymentElement,
  CardNumberElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Input } from "antd";
import { useState,useContext } from "react";
import { PostStripePaymentDetails } from "@/Services/payment.service";
import { AuthContext } from "@/app/layout";


export default function   VendorSubscriptionCheckoutForm({ sumTotal }) {
    const stripe = useStripe();
    const elements = useElements();

    console.log("props ==>>", sumTotal);

  const [email, setEmail] = React.useState('');
  const [holderName, setHolderName] = React.useState('');
  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [userData, setUserData ] = useState();


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
          setMessage("Card Details Saved succeeded!");
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


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const result = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: "https://dev-web.bookablebiz.website/vendor/profile/redirect-subscription",
        //return_url: "http://localhost:3000/vendor/profile",
      },
    });

    if (result.error) {
      setMessage(result.error.message);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
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
      <div>
        {/* <span>Holder Name </span> */}
        <Input
          type="text"
          id="holder-name"
          value={holderName}
          onChange={(e) => setHolderName(e.target.value)}
          style={{ padding:'8px' }}
          placeholder="Holder's Name"
        />
      </div>

      <PaymentElement id="payment-element" />
      
      <button disabled={isLoading || !stripe || !elements} id="submit" 
      style={{    
        width: '100%',
        cursor:'pointer',
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
          {isLoading ? <div className="spinner" id="spinner"></div> : `Subscribe now`}
        </span>
      </button>
      
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}