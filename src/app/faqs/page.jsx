"use client"
import React from 'react';
import { Fragment } from 'react';
import { MobileOutlined, MailOutlined, InstagramOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import './style.css';
import { useRouter } from 'next/navigation';

const { Panel } = Collapse;

const Index = () => {
  const router =  useRouter();
  // const handleOnClick = () => {
  //     window.location = '/contact';
  // };
  const items = [
    {
      key: '1',
      label: 'I have cancelled my booking. How can I get a refund on my advance payment?',
      children: <p>

        If booking was cancelled before the cancellation time limit, you will automatically receive an email cancellation notification which will indicate date and time of cancellation; the amount to be refunded less any applicable cancellation admin charges.
        <p>The vendor should refund the payment, less applicable cancellation admin charges, via the payment gateway on their end. It may take up to 1-2 weeks for the refund to be processed. Please note that Bookablebiz does not refund on the Vendors behalf at all. </p>

        If you do not receive your refund after 1-2 weeks, please contact the Vendor directly with your cancellation notification as reference. The Vendor contact can be found in their Vendor Profile. </p>,

    },
    {
      key: '2',
      label: 'Why was I charged when I have cancelled my booking before cancellation time limit?  ',
      children: <p>For each cancellation of a booking even before the cancellation time limit, there will be a 5% cancellation processing fee charged to cover payment gateway and vendor admin processing cost.
        <p>Please see terms and conditions at time if making the booking.  </p>
      </p>,
    },
    {
      key: '3',
      label: 'I was overcharged for a service. ',
      children: <p>Please contact the vendor preferably via email and provide your booking confirmation email and a screen shot of the charges incurred. See Vendor Contact details in the booking confirmation email and copy support@bookablebiz.com</p>,
    },




  ];
  const items2 = [
    {
      key: '4',
      label: 'I tried to add my card details and the system does not seem to accept them. ',
      children:
        <p> Check that all card details are entered correctly: name on card; card number, expiration date; security code.
          <p>If a 2 factor verification is required, correctly enter the One-time-pin (OTP) into the OTP verification pop-up send to your mobile phone from your card issuing bank.
          </p><p>If system still does not accept your credit card, try another credit card or payment mode like PayNow.
          </p>If all the above fails, please contact us at support@bookablebiz.com. </p>,
    },

    {
      key: '5',
      label: 'How can I change my card information? ',
      children: <p>Please log in into you Bookablebiz.com account and go to Payments. You can change or remove your card details. </p>,
    },

    {
      key: '6',
      label: 'Does Bookablebiz store my credit card details?   ',
      children: <p>No Bookablebiz.com does not store your credit card details at all for security and privacy reasons. </p>,
    },
  ];

  const items3 = [

    {
      key: '7',
      label: 'How to make a book a service or book an appointment?',
      children: <p>
        <p>Go to Bookablebiz.com to search for a service or a vendor. Select the particular service, choose a date and time, and add to cart.
        </p><p>All visitors to Bookablebiz.com will be required to create an account to book a service or make an appointment.
        </p>If the vendor has more than one location, make sure you book the service at your preferred location.
        <p>If the vendor also offers you a choice of several resources to choose from, select the preferred resource check their booking availability when when making a booking.
        </p>For services that required advance or pre-payment to confirm a booking, the next step is to verify the service to be booked and the price, then complete the check-out form credit card details and click on the submit button.
        <p>It is important before confirming any booking or appointment that you check all the vendors terms and conditions including refund policies and cancellation charges as applicable.
        </p>If you have trouble making a booking with a vendor on the system, contact support@bookablebiz.com.

      </p>,
    },
    {
      key: '8',
      label: 'How can I reschedule my appointment? ',
      children: <p>Your booking or appointment can be rescheduled per the Vendor’s cancellation policy. The time frame allowing for cancellation or re-scheduling is set up individually by each Vendor
        <p>If your appointment can be re-scheduled, you can manage your appointment via the My Bookings under your “My Account”.
        </p><p>If you are unable to make changes to your booking online due to some technical problems, we recommend that you  directly call the Vendor with the phone contact provided when you book the service.
        </p>Please note that Bookablebiz Support cannot re-schedule nor cancel your booking on your behalf under any circumstances.
      </p>,
    },
    {
      key: '9',
      label: 'How can I cancel my booking or appointment? ',
      children: <p>You can cancel your booking via your My Account and go to my My Bookings where all your bookings/appointments are listed.
        <p>Click on the booking/appointment that you want to cancel and follow the instructions on screen.
        </p><p>Importantly, please check the cancellation policy for each vendor and the cancellation time limits applicable.
        </p><p>Some vendors cancellation policy may apply a 100% non-refundable cancellation policy if you cancel your booking less than the cancellation time limit applicable.
        </p><p>For example, if  Vendor A imposes a non-refundable refund policy if cancellation is made less than cancellation time limit for refunds of 24 hours before the booked date and time, then no refunds will be given if cancellation is made less than 24 hours before the booked date and time slot.
        </p><p>Another example could be Vendor B imposes a 50% non-refundable cancellation refund time limit is less than 48 hours before booked date and time. Then any customer who makes a cancellation less than 48 hours before booked date and time will only get a refund of 50% of the prepayment amount.
        </p>IMPORTANTLY, ANY CUSTOMER WHO MAKES A BOOKING CANCELLATION MORE THAN THE VENDOR CANCELLATION TIME LIMIT PERIOD FOR REFUNDS, WILL GET PREPAYMENT REFUND AMOUNT LESS A 5 % REFUND PROCESSING FEE.      </p>,
    },

    {
      key: '10',
      label: 'Why do I need to create an account to book a service or make an appointment? ',
      children: <p>For security reasons and to protect our Vendors, only registered customers who have created their respective accounts by providing their email address with a secure password or a Google Account, are able to make bookings.
        <p>A customer account is also required before a customer is able to make a review or rate a vendor service that he/she has booked and used within 30 days after each service has been completed.
        </p> </p>,
    },
  ]

  const items4 = [
    {
      key: '11',
      label: 'How can I leave a review or rating?',
      children: <p>
        A customer is able to make a review or rate a vendor service that he/she has booked and used within 30 days after each service has been completed.  By default, only registered customers who have booked and used a service are allowed to give reviews and ratings of the service utilised by the same cusmtomer.
      </p>,
    },

    {
      key: '12',
      label: 'What can I do if I am not satisfied with the service?',
      children: <p>We recommend that you first contact the Vendor concerned to share and resolve your unsatisfactory experience.
        <p>As a customer who has booked and used the Vendor’s service, you can leave your review and rate the Vendor and services provided. This must be done not later than 30 days after you have used the vendor service.
        </p></p>,
    },

    {
      key: '13',
      label: 'How to report one of the Vendors, who due to your experience, should not be listed on Bookablebiz?',
      children: <p>If you like to report a business with justifiable reasons, please go to the Vendor’s profile and click on “Report” button. Then select a head line reason for reporting, then provide the justification, and then submit.
      </p>,
    },
  ];


  return (
    <Fragment>
      <div className="biz-faq">
        <div className='biz-container'> <h2>Help Center</h2></div>
      </div>
      <div className="biz-container faq-section">
        <h2>FAQ’s</h2>

        <div className="collapse-grid">
          <div className="collapse-column">
            <h3>Consumer refund request</h3>
            <Collapse items={items.slice(0, Math.ceil(items.length / 1))} defaultActiveKey={[]} />
            <h3>Card Payment Error (Faud and Other)</h3>
            <Collapse items={items2.slice(0, Math.ceil(items2.length / 1))} defaultActiveKey={[]} />

          </div>
          <div className="collapse-column">
            <h3>Bookings, Appointments, Reschedule and Cancellation</h3>
            <Collapse items={items3.slice(0, Math.ceil(items3.length / 1))} defaultActiveKey={[]} />
            <h3>Giving Customer Reviews</h3>
            <Collapse items={items4.slice(0, Math.ceil(items4.length / 1))} defaultActiveKey={[]} />
          </div>
        </div>
        <h4 className='faqs-btn'>For any further questions or enquiries, please send us a message <span onClick={() => router.push('/contact')}>here.</span></h4>

      </div>

    </Fragment>
  );
};

export default Index;
