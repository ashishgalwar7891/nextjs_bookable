import { useRouter } from 'next/navigation';
import React from 'react';
import { BiCheckCircle } from 'react-icons/bi';

function Thankyou(props) {
    const router = useRouter();
    return (
        <>
            <div className='thankyou-page' style={{ textAlign: "center", padding: "50px" }}>
                <BiCheckCircle style={{ fontSize: "60px", color: "green" }} />
                <h1 style={{ color: "green", marginBottom: "15px" }}>Your booking is successfully rescheduled</h1>
                <span className='biz-common-btn' onClick={() => {router.push('/mybookings') }}>Check My Booking</span>
            </div>
        </>
    );
}

export default Thankyou;