"use client"
export const dynamic = 'force-dynamic';
import { Fragment } from 'react';
import { CiBellOn } from "react-icons/ci";
import { LuBookMarked } from "react-icons/lu";
import { TbRefresh, TbBook2, TbDownload } from "react-icons/tb";
import { LiaSearchLocationSolid } from "react-icons/lia";
import { MdOutlineSecurityUpdateWarning, MdOutlineSell } from "react-icons/md";
import { TfiMenuAlt } from "react-icons/tfi";
import { GrUserManager } from "react-icons/gr";
import { FaLaptopCode } from "react-icons/fa";
import Bbzsitephone from '../../assets/imgs/Bookablebiz Mobile Booking Orange Screen (Actual) 2 .png';
import aboutcard from '../../assets/imgs/about-card.png';
import Bbzsite from '../../assets/imgs/Bbz-site.png';
import { UserOutlined, MailOutlined, InstagramOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import './style.css'
const Index = () => {
    return (
        <Fragment>
            <div className="biz-about">
                <div className="biz-container ">
                    <h2>About</h2>
                </div>
            </div>
            <div className="biz-container about-section">
                <div className="biz-about-content">
                    <h2>What We Do</h2>

                    <p>Bookablebiz is a start-up company based in Singapore with the objective of providing  customers a convenient one-stop-marketplace to book services, appointments and travel experiences.</p>
                    <p>No more any need to depend on browser search engine results for non-curated services. Bookablebiz makes consumers search for service providers easy on our bookable services marketplace platform.
                    </p>
                </div>
                {/* <div className="about-top-hed">
                    <h2>For Consumers</h2>
                </div> */}
            </div>
            <div className='biz-container'>
                <h2 style={{padding:'10px'}}>For Consumers</h2>
            </div>
            <div style={{background:"azure"}}>
                <div className='biz-container'>
                    <div className='biz-about-section'>
                        <div className="biz-about-column">
                            <img src={Bbzsitephone.src} alt="contact-img" />
                        </div>
                        <div className="biz-about-column1">
                            <div className="biz-about-row">
                                <div className="biz-about-box-column">
                                    <div className="biz-about-box-content">
                                        <UserOutlined />
                                        <h2>Book services Online 24/7</h2>
                                        <p>Make your bookings for services and appointments online or on your devices.</p>
                                    </div>
                                </div>
                                <div className="biz-about-box-column">
                                    <div className="biz-about-box-content">
                                        <CiBellOn />
                                        <h2>Booking notifications</h2>
                                        <p>Get notifications and reminders to ensure you do not miss your appointments.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="biz-about-row">
                                <div className="biz-about-box-column">
                                    <div className="biz-about-box-content">
                                        <LuBookMarked />
                                        <h2>One stop marketplace</h2>
                                        <p>Hassle free marketplace for services from wide array of participating service vendors.</p>
                                    </div>
                                </div>
                                <div className="biz-about-box-column">
                                    <div className="biz-about-box-content">
                                        <TbRefresh />
                                        <h2>Change bookings online</h2>
                                        <p>Conveniently change or cancel bookings online and get change confirmation.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="biz-about-row">
                                <div className="biz-about-box-column">
                                    <div className="biz-about-box-content">
                                        <LiaSearchLocationSolid />
                                        <h2>Check out vendors near you</h2>
                                        <p>With our geo-locator, you can choose a vendor located nearer to where you are.</p>
                                    </div>
                                </div>
                                <div className="biz-about-box-column">
                                    <div className="biz-about-box-content">
                                        <MdOutlineSecurityUpdateWarning />
                                        <h2>Secure payments </h2>
                                        <p>Pay securely by Credit Card or Pay Now for pre-payable advance bookings as applicable.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           <div style={{padding:"60px 0px"}}>
           <div className="biz-container">
                <div className="about-top-hed">
                    <h2>For Service Providers</h2>
                </div>
                <div className="biz-about-service-row">
                    <div className="biz-about-service-column" style={{flexBasis:"80%"}}>
                        <div className="about-service-column-content">
                            <h2>Why Work with Bookablebiz</h2>
                            <p>Bookablebiz is a powerful Subscription-as-a-Service (SaaS) platform. Vendors, as service providers, now do not need to buy their own booking systems and spend additional monies to market their services.</p>

                            <h2>Benefit for Vendors </h2>
                            <p>With Bookablebiz, service vendors now have the opportunity to participate and enjoy benefits from an online marketplace where customers can search and book almost all types of services: from simple pay-and-go services to complex recurring services.</p>

                            <h2>Seamless Setup </h2>
                            <p>Check out the fairly easy steps to be a Vendor in the Bookablebiz services marketplace:</p>
                        </div>

                        <h2><TbDownload /> Easy online registration </h2>
                        <p>Complete the online registration form and submit for approval to join marketplace as a vendor. T&Cs apply.</p>

                        <h2><TbBook2 /> Set up payment account</h2>
                        <p>Set up your entity's payment gateway account. Bookablebiz uses Stripe Connect that allows vendors to collect and track customer payments directly less applicable platform & service fees.</p>

                        <h2><TfiMenuAlt /> Start with Free Starter Subscription</h2>
                        <p>Start with Bookablebiz free starter subscription. Upgrade when required as your booking volume grows to benefit from more features.</p>

                        <h2><FaLaptopCode /> Upload Your Bookable Services</h2>
                        <p>Easily upload details and images of services to be provided. Choose booking types and booking availability by days, dates and times as  applicable. You can also combine a few services to be booked together as a package.</p>

                        <h2><GrUserManager /> Manage Resources By Locations</h2>
                        <p>Additionally,  if you have several service outlets,  you can even offer bookings by locations and by available resources at each location.</p>

                        <h2><MdOutlineSell /> Start Selling Your Services </h2>
                        <p>Set the price for each of your bookable services. Remember to check out the competition's pricing. You also have the option of offering discounts to attract customers.</p>
                    </div>
                    <div className="biz-about-service-column">
                        <div className="biz-about-service-column-box">
                            <img src={aboutcard.src} alt="contact-img" />
                        </div>
                        <div className='biz-about-service-column-boximg'></div>
                        <img src={Bbzsite.src} alt="contact-img" />
                    </div>
                </div>
            </div>
           </div>
        </Fragment>
    );
};
export default Index;