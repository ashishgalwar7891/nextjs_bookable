import Image from 'next/image';
import { Col, Row } from "antd";
import { CustomHr, CustomInput, CustomUserButton, StyledBoldText, StyledText, MainCol } from "./styledComponent";
import BookableBizLogo from '../../../assets/imgs/logo-V3.png'
import ICoreLogo from '../../../assets/imgs/i-core.svg'
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';
import { BackgroundImage } from '@/styles/styledComponent';
import { useContext, useEffect } from 'react';
import { LayoutContext } from '..';
import { useRouter } from 'next/navigation';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

const Footer = () => {
    const router = useRouter();
    const { industryData } = useContext(LayoutContext)
    const handleClick = () => {
        window.open('../../../assets/imgs/Bookablebiz_for_Business.pdf', '_blank');
      };

    const handleLinksClicks = (type) => {
        if (type === 'About') {
            router.push('/about')
        }
        else if (type === 'Contact') {
            router.push('/contact')
        }
        else if (type === 'Jobs') {
            router.push('/jobs')
        }
        else if (type === 'Help') {
            router.push('/faqs')
        }
        else if (type === 'Business') {
            router.push('/business')
        }
    }
    useEffect(() => {
           const mailchimp = document.querySelectorAll('#MailchimpSubscribe button');
           const mailchimpInput = document.querySelectorAll('#MailchimpSubscribe input')
           mailchimp[0].innerHTML = "Subscribe";
           mailchimpInput[0].setAttribute('placeholder', 'Your email address');
    },[])
    const handleServicesClick = (service) => {
        console.log("Service on click ==>>", service)
        window.location = `search?industry=${service}`
    }
    
    const handleLegalLinksClick = (value) => {
        console.log("value on click ==>>", value)
        "Terms & Policy", "Reschedule, Cancellation & Refunds", "Privacy policy", "Medical Specialists"
        
        if (value === 'Terms of Service') {
            router.push(`/terms-of-service`);
        }
        else if (value === 'Reschedule, Cancellation & Refunds') {
            router.push(`/refund_and_cancelation`);
        }
        else if (value === 'Privacy policy') {
            router.push(`/policy`);
        }
        else if (value === 'Marketplace Guide') {
            router.push(`marketplace-guide`);
        }
        if (value === 'Partnerships') {
            router.push(`/terms-of-service`);
        }
        if (value === 'Vendors & Listings') {
            router.push(`/terms-of-service`);
        }
    }
    
    return (
    <>
        <div  style={{height:'auto',padding:"30px 15px", backgroundColor:'#2C2C2C'}}> 
        <div className='biz-container'>
        <MainCol xl={24} style={{height:'auto', backgroundColor:'#2C2C2C'}}>
                <Row style={{ width:'100%', margin:'0'}} gutter={28}>
                    <Col style={{padding:'0'}} xl={8}>
                        <Col style={{ height: '60px', marginBottom:'15px' }}>
                            <BackgroundImage className='logo' style={{height:'51px', width:"230px" }} src={BookableBizLogo} alt="brand-logo" ></BackgroundImage>
                        </Col>

                        <Col style={{ display:'flex', flexDirection:'column', }}>
                            <StyledBoldText>Business on BOOKABLEbiz</StyledBoldText>
                            <StyledText style={{  cursor: 'pointer'  }}>How Does it work for businesses</StyledText>
                            <StyledText style={{  cursor: 'pointer' }}>Payments</StyledText>
                            <CustomUserButton 
                                style={{ width:'160px', margin:'4px 0'}}
                                onClick={() => {router.push('/vendor/register')}}
                            >
                                Sign up as Vendor
                            </CustomUserButton>
                        </Col>
                    </Col>

                    <Col xl={16} >
                        <Row style={{ width:'100%' }}>
                            <Col span={24}>
                                <StyledText style={{ display:'flex', flexDirection:'column'}} >Subscribe for best deals direct in your inbox</StyledText><br/>
                                <Row style={{ width:'100%'}}>
                                    <div className='MailchimpSubscribe' id='MailchimpSubscribe'>
                                    <MailchimpSubscribe url={"https://bookablebiz.us21.list-manage.com/subscribe/post?u=614320b27b34348c3dde36cb4&amp;id=53922d902d&amp;f_id=0000f4e6f0"} />
                                    </div>
                               
                                </Row>
                            </Col>

                            <Col span={24} >
                                <Row style={{ width:'100%', display: 'flex', justifyContent:'space-between', marginTop:'25px', rowGap: '1rem'}}>                                
                                    <Col>
                                        <StyledBoldText style={{ display:'flex', flexDirection:'column' }}>Business</StyledBoldText>
                                        {["Partnerships", "Vendors & Listings", "Marketplace Guide"].map( (item, key) => {
                                            return <StyledText 
                                                onClick={() => { handleLegalLinksClick(item) }} 
                                                style={{ display:'flex', flexDirection:'column', cursor: 'pointer' }}
                                            >
                                                {item}
                                            </StyledText>
                                        })}
                                        {/* {industryData && industryData?.slice(0, 5).map( (item, key) => {
                                            return <StyledText 
                                                onClick={() => { handleServicesClick(item?.industry) }} 
                                                style={{ display:'flex', flexDirection:'column', cursor: 'pointer'  }}
                                            >
                                                {item?.industry}
                                            </StyledText>
                                        })} */}
                                    </Col>

                                    <Col>
                                        <StyledBoldText style={{ display:'flex', flexDirection:'column' }}>Legal</StyledBoldText>
                                        {["Terms of Service", "Privacy policy", "Reschedule, Cancellation & Refunds"].map( (item, key) => {
                                            return <StyledText 
                                                onClick={() => { handleLegalLinksClick(item) }} 
                                                style={{ display:'flex', flexDirection:'column', cursor: 'pointer' }}
                                            >
                                                {item}
                                            </StyledText>
                                        })}
                                    </Col>

                                    <Col>
                                        <StyledBoldText  style={{ display:'flex', flexDirection:'column' }}>Bookablebiz</StyledBoldText>
                                        {["About", "Contact", "Help"].map( (item, key) => {
                                            return (
                                                <StyledText 
                                                    onClick={() => handleLinksClicks(item)} 
                                                    style={{ display:'flex', flexDirection:'column', cursor: 'pointer'  }}
                                                >
                                                    {item}
                                                </StyledText>
                                            )
                                        })}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <CustomHr />

                <Row className='BottomFooter'>
                    <Col span>
                        {/* <StyledText>Follow us</StyledText>
                        <Col className='Social' span={4} style={{ display: 'flex' }}>
                            <InstagramOutlined style={{ fontSize: '20px', color: '#F2F1F0', margin: '8px 15px 8px 0px', cursor: 'pointer' }} />
                            <FacebookOutlined style={{ fontSize: '20px', color: '#F2F1F0', margin: '8px 15px 8px 0px', cursor: 'pointer' }} />
                            <TwitterOutlined style={{ fontSize: '20px', color: '#F2F1F0', margin: '8px 15px 8px 0px', cursor: 'pointer' }} />
                        </Col> */}
                    </Col>

                    <Col className='copyright' onClick={() => window.location = "https://icore.sg/"} span style={{display:'flex', justifyContent:'flex-end', flex:'1', alignItems: 'end', paddingBottom:"4px" }}>
                        <StyledText className='styledText' style={{  cursor: 'pointer' }}>© Bookablebiz.com I {new Date().getFullYear()}. All Rights Reserved.
                        <span className='styledText' style={{  cursor: 'pointer' }} > Designedc and Developed by
                         <div style={{height:'100%', width:'auto', display:'inline-block' }}>
                            <BackgroundImage style={{height:'1rem', width:'auto', display:'inline-block', padding:'0 .5rem' }} src={ICoreLogo} alt="Google-logo" ></BackgroundImage>
                        </div>
                        </span>
                        </StyledText>
                    </Col>
                </Row>
            </MainCol>
        </div>
          
        </div>

    </>
    )
}

export default Footer;