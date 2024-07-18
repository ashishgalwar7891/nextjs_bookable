"use client"
export const dynamic = 'force-dynamic';
import { Fragment, useEffect, useState } from 'react';
import { Button, Checkbox, Image, Form, Input, Spin, Radio } from 'antd';
import BookableBizImg from '../../assets/imgs/contact-img.png';
import { MobileOutlined, MailOutlined, InstagramOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import './style.css'
import { SEND_CONTACT_MAIL, SEND_VENDOR_CALL_MAIL } from '@/Services/frontend';
const Index = () => {
    const [name, set_name] = useState('');
    const [phone, set_phone] = useState('');
    const [email, set_email] = useState('');
    const [subject, set_subject] = useState('');
    const [subject_type, set_subject_type] = useState('');
    const [message, set_message] = useState('');
    const [contact_mail_errors, set_contact_mail_errors] = useState('');
    const [contact_loader, set_contact_loader] = useState(false);
    const [msg, set_msg] = useState('');
    // For Vendor
    const [vname, set_vname] = useState('');
    const [vphone, set_vphone] = useState('');
    const [vemail, set_vemail] = useState('');
    const [vmessage, set_vmessage] = useState('');
    const [call_mail_errors, set_call_mail_errors] = useState('');
    const [call_loader, set_call_loader] = useState(false);
    const [value, setValue] = useState(1);


    const send_mail = async () => {
        set_contact_loader(true);
        const FORM_DATA = new FormData();
        FORM_DATA.append('name', name);
        FORM_DATA.append('phone', phone);
        FORM_DATA.append('email', email);
        FORM_DATA.append('subject', subject);
        FORM_DATA.append('message', message);
        FORM_DATA.append('user_type', value);
        FORM_DATA.append('subject_type', subject_type);

        const result = await SEND_CONTACT_MAIL(FORM_DATA);
        console.log('SEND_CONTACT_MAIL', result);
        if (result.data.status) {
            set_name('');
            set_email('');
            set_phone('');
            set_subject('');
            set_subject_type('');
            set_message('');
            set_vname('');
            set_vemail('');
            set_vphone('');
            set_vmessage('');
            set_msg(result.data.message)
            set_contact_mail_errors('');
            set_call_mail_errors('');
            set_contact_loader(false);
        } else {
            set_call_mail_errors('');
            set_contact_mail_errors(result.data.errors);
            set_msg('');
            set_contact_loader(false);
        }
    }

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);

    };
    // console.log('BookableBizImg',BookableBizImg);
    return (
        <Fragment>
            <div className="biz-contact">
                {/* <img src={BookableBizImg.src} alt="contact-img" /> */}
                <div className='biz-container'>
                    <h2>Contact</h2>
                </div>
            </div>
            <div className="biz-container contact-section">
                <br></br> <br></br>
                <div className="icon-list">
                    <ul>
                        <li><b style={{ fontSize: "14px", fontWeight: "400" }}>General</b><span style={{ cursor: "pointer" }} onClick={() => window.location = 'mailto:support@bookablebiz.com'}><MailOutlined /> support@bookablebiz.com</span></li>
                        <li><b style={{ fontSize: "14px", fontWeight: "400" }}>Vendors</b><span style={{ cursor: "pointer" }} onClick={() => window.location = 'mailto:vendorhelp@bookablebiz.com'}><MailOutlined /> vendorhelp@bookablebiz.com</span></li>
                    </ul>

                </div>
                {msg && <><p style={{ color: 'green', fontWeight: "bold", textAlign: "center", fontSize: "26px", marginBottom: "40px" }}>{msg}</p></>}
                <div className="biz-form-section">

                    <div className="biz-form-column wrapper">
                        <h3>Get in touch with us </h3>
                        <div className="form">
                            <div className='form-checkbox'>
                                <p>Please tick one box* only</p>
                                <Radio.Group onChange={(e) => onChange(e)} value={value}>
                                    <Radio value={1} checked>I am a customer or visitor</Radio>
                                    <Radio value={2}>I am making a business or vendor enquiry</Radio>
                                </Radio.Group>
                            </div>
                            <div className="form-column">
                                <div className="form-name">
                                    <label htmlFor="Name">Name</label><br></br>
                                    <input type="text" value={name} onChange={(e) => set_name(e.target.value)} />
                                    {contact_mail_errors?.name && <><span className="red-para">{contact_mail_errors?.name[0]}</span></>}
                                </div>
                                <div className="form-name">
                                    <label htmlFor="Phone number">Phone number</label><br></br>
                                    <input type="Phone" value={phone} onChange={(e) => set_phone(e.target.value)} />
                                    {contact_mail_errors?.phone && <><span className="red-para">{contact_mail_errors?.phone[0]}</span></>}
                                </div>

                            </div>
                            <div className="form-column">
                                <div className="form-name">
                                    <label htmlFor="email">Email Address*</label><br></br>
                                    <input type="email" value={email} onChange={(e) => set_email(e.target.value)} />
                                    {contact_mail_errors?.email && <><span className="red-para">{contact_mail_errors?.email[0]}</span></>}
                                </div>
                                <div className="form-name">
                                    <label for="selectOption">Subject</label><br></br>
                                    <select id="selectOption" style={{ width: "100%" }} value={subject_type} name="selectOption" onChange={(e) => set_subject_type(e.target.value)} >
                                        <option value="">Choose a Subject</option>
                                        <option value="Service Related">Service Related</option>
                                        <option value="Bookings Related">Bookings Related</option>
                                        <option value="Rescheduling/Cancelation Related">Rescheduling/Cancelation Related</option>
                                        <option value="Pricing/Refund Related">Pricing/Refund Related</option>
                                        <option value="Vendor Sign Up">Vendor Sign Up</option>
                                        <option value="Vendor Enquiries">Vendor Enquiries</option>
                                        <option value="Other">Other</option>
                                    </select><br></br>
                                    {contact_mail_errors?.subject_type && <><span className="red-para">{contact_mail_errors?.subject_type[0]}</span></>}
                                </div>

                            </div>
                            <div className="form-column">
                                <div className="form-name">
                                    <label for="message">Message:</label><br></br>
                                    <textarea id="message" name="message" onChange={(e) => set_message(e.target.value)} rows="4" required>{message}</textarea>
                                    {contact_mail_errors?.message && <><span className="red-para">{contact_mail_errors?.message[0]}</span></>}
                                </div>
                            </div>


                            <div className="form-name">
                                {contact_loader ? <>
                                    <button type="button" disabled><Spin tip="Loading"></Spin> Submit</button>

                                </> : <>
                                    <button type="button" onClick={() => send_mail()}>Submit</button>
                                </>}

                            </div>
                        </div>
                    </div>
                    <div className="biz-form-column3">

                    </div>
                </div>
            </div>
        </Fragment>
    );
};
export default Index;