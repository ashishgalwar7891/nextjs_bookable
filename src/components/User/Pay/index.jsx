import { Fragment, useState, useEffect } from "react";
import { Col, Empty, Row } from "antd";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/lib/commonComponent/CheckoutForm";
import { ReschedulePayIntent } from "@/Services/payment.service";
import RescheduleCheckoutForm from "@/lib/commonComponent/RescheduleCheckoutForm";
import { useSearchParams } from "next/navigation";

const Pay = () => {
    const searchParams = useSearchParams()
    const [userData, setUserData] = useState();
    const [clientSecret, setClientSecret] = useState("");
    const [rescheduleAmt, setRescheduleAmt] = useState("");
    const [stripeConnectId, setStripeConnectId] = useState("");

    const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY



    useEffect(() => {
        fetchCartData()
    }, []);

    const fetchCartData = async () => {
        try {
            const userToken = localStorage.getItem('token')
            const userId = localStorage.getItem('userId')
            const bookingId = localStorage.getItem('booking_id')
            setUserData({
                "token": userToken,
                "user_id": userId
            });
            const response = await ReschedulePayIntent({ "user_id": userId, "id": searchParams.get('request') });
            setRescheduleAmt(response?.response?.data?.amount)
            setClientSecret(response?.response?.data?.client_secret)
            setStripeConnectId(response?.response?.data?.stripeConnectId);
        } catch (error) {
            console.log(error)
        }
    }


    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };
    const stripePromise = loadStripe(stripePublishableKey, {
        stripeAccount: stripeConnectId,
    });

    return (
        <>
            <Row style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px', }}>
                <Col style={{ padding: '15px' }} >
                    {clientSecret && (
                        <>
                            <Elements options={options} stripe={stripePromise}>
                                <RescheduleCheckoutForm sumTotal={rescheduleAmt} id={searchParams.get('request')} />
                            </Elements>
                        </>
                    )}
                </Col>
            </Row>
        </>
    )
}

export default Pay;