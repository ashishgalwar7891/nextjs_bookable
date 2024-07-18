"use client"
import React from 'react';
import { Fragment, rowClassName } from 'react';
import { MobileOutlined, MailOutlined, InstagramOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { Collapse, Table } from 'antd';
import Welcome from '../../assets/imgs/unnamed.png';
import Bizbooking from '../../assets/imgs/building.png';
import Bizupdate from '../../assets/imgs/goal.png';
import Bizguidline from '../../assets/imgs/guideline.png';
import Bizcommunity from '../../assets/imgs/community.png';
import './style.css';
import { useRouter } from 'next/navigation';

const Index = () => {
  const router = useRouter();
  return (
    <Fragment>
      <div className='business-page'>
        <div className="biz-container">
          <div className='business-section-heading'>
            <h2>Marketplace Community Guidelines </h2>
            <p style={{fontSize:'18px', fontWeight:'700'}}>Bookablebiz brings together a diverse marketplace community of Users that includes Customers and participating Vendors who provide bookable services or appointments for services or consultation.  </p>
          </div>
          <div className='business-section'>
            <div className="biz-business-column">
              <p>The integrity and safety of our platform is something we take very seriously. We developed these Marketplace Community Guidelines to describe the types of services, activities, and content that we encourage on Bookablebiz, and the types that aren’t allowed. These Marketplace Community Guidelines are incorporated into the larger and more comprehensive Bookablebiz Terms of Service.</p>
              <p>We have the sole discretion to remove or restrict access to any content we determine violates our Marketplace Community Guidelines or Terms of Service. To learn more about Bookablebiz legal Terms of Service, take a look <span onClick={() => router.push('/terms-of-service')} style={{cursor:"pointer", color:'#ED510C'}}>here.</span></p>

            </div>
            <div className="biz-business-column1">
              <img style={{borderRadius:'8px'}} src={Welcome.src} alt="contact-img" />
            </div>
          </div>

          <div className='business-section2'>
            <div className="biz-business-column">
              <h2> Building a Bookablebiz Marketplace Community</h2>
              <p>Bookablebiz is envisaged as a hassle free one-stop online marketplace to more efficiently connect customers with a wide array of local service providers offering services that include professional consultation, services, freelance work or gigs, training, skills classes, leisure activities programmes or classes, fitness classes and health/wellness services, medical or dental appointments, and more. </p>

              <p>As a marketplace platform bringing together a large community of users with different needs and helping them connect with service providers who may be able to meet such needs whether individually or in groups, we are committed to providing a safe, inclusive, and respectful platform for the marketplace and fulfilment of customer needs and achievement of business goals for service providers.</p>
            </div>
            <div className="biz-business-column1">
              <img style={{borderRadius:'8px'}}  src={Bizbooking.src} alt="contact-img" />
            </div>
          </div>
          <div className='biz_booking_process'>
            <p>‍We encourage all Users to grow the marketplace community together - whether you’re interested in fitness or baking classes, tuition for children, skills upgrading courses, dining reservations, travel experiences bookings, or coding. We ask that you make this marketplace one that can be trusted and having integrity of participation that encourages participation by service providers from home businesses to small start-up businesses and more.
            </p>
            <p>‍To help you understand what we do not allow on Bookablebiz, we created this set of Marketplace Community Guidelines. The list isn't exhaustive, and we may add to it or improve upon it, so it is important that you continue to check in on any modifications or updates frequently.</p>

          </div>
          <div className='business-section2'>
            <div className="biz-business-column">
              <h2> Our Marketplace Community Goal</h2>
              <p>Our goal is to promote a safe and respectful community. If you learn of any listing or content that may violate these Community Guidelines or our Terms of Service, please contact us right away.
              </p>
              <p>We truly value your feedback and the opportunity to hear from our community. If you believe our removal of your service content is an error, please let us know by replying to our original email regarding your services.</p>

              <p>To make your services as authentic, respectful, inclusive, and safe as possible, read our Best Practices guide below: </p>
            </div>
            <div className="biz-business-column1">
              <img style={{borderRadius:'8px'}} src={Bizupdate.src} alt="contact-img" />
            </div>
          </div>
          <div className='biz_booking_process'>
            <p>The key to creating a fantastic service experience for your customers and securing a community of repeat followers is to:
            </p>
            <p>(i) make your content clear and authentic.   </p>
            <p>(ii) every service listing must have the following required content: </p>
              <ul>
                <li>Name of service</li>
                <li>Description of service: provide a concise description of the service, the purpose and benefits.</li>
                <li>Agenda and booking dates/times availability (system allows to block unavailable slots) </li>
                <li>Requirements to use the service, e.g. age, gender, attire, health requirements if any.</li>
                <li>Indicate service delivery location address and preferably include a contact number.</li>
                <li>Price for pre-payment of the service/appointment to be booked. This is a system requirement you must complete.</li>
                <li>Have a clear cancellation and refund policy for the service offered. For example, if required, you should clearly state that “no refund”  or “partial refund amount of X% will be applied” “ if cancellation is made..” say “..48 hours before booked date/time slot”.</li>
                <li>Appropriate image related to the service offered.</li>
                <li>Any do’s and don’ts related to the service delivery.</li>
              </ul>
              <p>(iii) create services that meet the needs of customers and your community of followers together</p>
              <p>(iv) use self-generated or properly procured content including photos, videos, logos and copy in your event listing</p>
              <p>(v) try describe the expertise or experience of the service provider in the delivery of the service. Be authentic. Avoid exaggeration or face consumer backlash if expectations are not met.</p>
              <p>(vi) provide services that can be delivered successfully and to the expected satisfaction of customers.</p>
              <p>(vii) when feedback or review is provided about the service, graciously accept the feedback for learning and improvements.</p>

          </div>
          <div className='business-section2'>
            <div className="biz-business-column">
              <h2> Prohibited Practices</h2>
              <p>In addition to the other restrictions on use set forth herein, you agree and acknowledge that you <b>shall not</b> use the Services: 
              </p>
                <p>(A) for any unlawful purpose;</p>
                <p>(B) to solicit Users to perform or participate in any unlawful acts or to engage in acts that are unrelated to the purpose(s) of the Services; </p>
                <p>(C) to violate any international or governmental regulations, rules, laws, or local ordinances; </p>
                <p>(D) to infringe upon or violate our intellectual property rights or the intellectual property rights of others;</p>
                
            </div>
            <div className="biz-business-column1">
              <img style={{borderRadius:'8px'}} src={Bizguidline.src} alt="contact-img" />
            </div>
          </div>
          <div className='biz_booking_process'>
            <p>(E) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; </p>
            <p>(F) to disseminate misleading content that promotes fear, hate and/or prejudice, and encourages violence against an individual or specific group of people</p>
            <p>(G) to spread scientifically or medically unsubstantiated health advice that may have detrimental effects on attendees’ health or public safety or content that originates from misinformation campaigns targeted at Bookablebiz or other platforms.</p>
            <p>(H) to misrepresent yourself, your services, or the contents of your services. This includes: Impersonation of any person or entity, including without limitation any governmental officials or public figure; falsely stating or otherwise misrepresenting your affiliation with any person or entity; or expressing or implying that Bookablebiz or public figure endorses any statement or services you make without expressed written approval to do so.</p>
            <p>(I) to sell unauthorized sale or resale of tickets, engaging in prohibited sales, or facilitating the sale of anything other than for a service for your company or your professional services.</p>
            <p>(J) to use of venues or locations without the appropriate authorization or permissions to deliver your services.</p>
            <p>(K) to invade the Privacy of Others. Be thoughtful and careful about the kind of information you ask for. You should not use Bookablebiz to collect or share credit card numbers, social security numbers, financial information, or other sensitive information not absolutely necessary for the fulfilment of your services as Vendor. </p>
            <p>(L) to publish content about raffles, sweepstakes, or giveaways that are otherwise prohibited by law. In Singapore, the online sale of raffle tickets must comply with local laws on games of chance before including them in your service offering. </p>
            <p>(M) for anything that constitutes an unacceptable business practice, such as: unsolicited advertising, promotional material, links to unsafe websites, email marketing spam or "junk mail", chain letters, surveys, investment opportunities, or any other form of commercial solicitation, fake  services, or other fraudulent and deceptive services.</p>
            <p>(N) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Services; </p>
            <p>(O) to collect or track the personal information of others; to spam, phish, pharm, pretext, spider, crawl, or scrape; </p>
            <p>(P) to use the marketplace for any obscene or immoral purpose or solicitation; </p>
            <p>(Q) to interfere with or circumvent the security features or cause undue loading of Bookablebiz Services.</p>
          </div>
          <div className='business-section2'>
            <div className="biz-business-column">
              <h2> How we ensure that our Marketplace Community Guidelines are followed:</h2>
              
                <p>(1) We review feedback and monitor the marketplace activities</p>
                <p>(2) We engage our customers and vendors </p>
                <p>(3) We act as and when necessary in the interest of the marketplace community </p>
                <p>(4) We update guidelines to ensure that it remains relevant and appropriate for all in the community.</p>
                
            </div>
            <div className="biz-business-column1">
              <img style={{borderRadius:'8px'}} src={Bizcommunity.src} alt="contact-img" />
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  );
};

export default Index;
