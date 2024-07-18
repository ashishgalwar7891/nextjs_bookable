"use client"
import React from 'react';
import { Fragment, rowClassName } from 'react';
import './style.css';
import { useRouter } from 'next/navigation';

const Index = () => {
  const router = useRouter();
  return (
    <Fragment>
      <div className='refund-page'>
        <div className="biz-container">
          <div className='refund'>
            <h1 style={{margin:'30px 0px'}}>Reschedule, Cancellation & Refunds Policy</h1>
            <h2>General</h2>
            <p>At Bookablebiz, we are dedicated to delivering exceptional services to both our valued Customers and Vendors. To initiate the booking of services, Vendors require pre-payment through a valid debit or credit card or PayNow. To maintain a consistently high level of service, we kindly request Customers to make reasonable efforts to reschedule or cancel appointments in advance if they are unable to honour the booking. To avoid cancellation fees, kindly note the following:</p>
            <ul>
                <li>Customers should reschedule appointments before the Vendor's cancellation deadline to avoid cancellation fees.</li>
                <li>No fees will be charged for rescheduling bookings, subject to availability of slots.</li>
                <li>Rescheduling or cancelling appointments can be conveniently done through the Bookablebiz Site under "My Bookings or My Appointments."</li>
                <li>Please refrain from directly contacting the Vendor for rescheduling or cancelling unless no available slots are shown on the site.</li>
            </ul>
            <h2>Liability</h2>
            <p>For Vendors requiring debit or credit card information to finalize pre-paid appointments, Bookablebiz, through its payment gateway partner Stripe, utilizes this information as outlined in our Privacy Policy, with no liability for charges resulting from failure to cancel appointments per the Vendor's policy.</p>
            <h2>Refunds & Cancellation Fee</h2>
            <p>Unless otherwise specified, a cancellation fee will apply if a Customer self-cancels an appointment outside the Vendor's policy or records a no-show.</p>
            <ul>
                <li>The cancellation fee, as indicated during booking, will be deducted from the prepaid amount or charged to the credit card for late cancellations or no-shows.</li>
                <li>Refund, after deduction of applicable cancellation fees, is per the Vendor's cancellation/refund policy; Bookablebiz is not liable for refund processing or verifying payment information.</li>
                <li>Multiple instances of no-shows or late cancellations may result in Account termination, at the sole discretion of Bookablebiz and the Vendor.</li>
            </ul>
            <h2>Cancellation Processing Fee</h2>
            <p>Customers acknowledge, at the time of booking confirmation, that any applicable refunds, per Vendor terms, will incur a reasonable cancellation processing fee. This fee covers administrative costs and Stripe's cancellation processing costs, enhancing transparency in our commitment to delivering exceptional services.</p>
          </div>
        </div>
      </div>

    </Fragment>
  );
};

export default Index;
