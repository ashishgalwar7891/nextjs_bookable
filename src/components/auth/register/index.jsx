"use client";
import { Form, Input, Col, Row, Select } from 'antd';
import { useRouter } from 'next/navigation';
import { useGoogleLogin } from '@react-oauth/google';
import CustomCarousel from "../../../lib/commonComponent/SideCarousel";
import AuthBgImage from "../../../assets/imgs/AuthBg_Image.svg";
import Googlelogo from "../../../assets/imgs/Google-logo.png"
import { BackgroundImage, SubmitButton, RegisterButton, LoginFormButton } from "@/styles/styledComponent";
import {CustomAuthRow, CustomAuthCol, CustomSliderCol, CustomHomeForm, CustomAgreText, CustomContentCol,
    CustomTypography, CustomTypographyText, CustomHeadTitle, CustomText, SliderCol } from "../styledComponent";
import { CustomHorizontalRow } from './styledComponent';
import { registerUserService } from '@/Services/auth.services';
import { StyledHr } from '@/components/vendor-payment/styledComponent';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Register = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const { Option } = Select;
    const [ isLoading, setIsLoading] = useState();

   useEffect(() =>{
    if(localStorage.getItem('userId')){
        router.back();
    }
   },[]);
    const CheckIfValidEmail = (rule, value) => {
        const reg = /^([A-Za-z0-9_\-\+\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{1,9})$/;
        if (value === undefined || value === '') {
        return Promise.reject(new Error('Email address is required!'));
        }
        if (!String(value).trim().match(reg)) {
        return Promise.reject(new Error('Please enter a Email address!'));
        }
        return Promise.resolve();
    };

    const onFinish = async (values) => {
        try {
            setIsLoading(true);
            values.register_type = "bookable";
            const response = await registerUserService(values);  
            if(response?.status === 200){
                form.resetFields();
            }
            setIsLoading(false);
        } catch (error) {
            isLoading(false);
            console.log(error);
        }
    };

    const OnClickRegister = () => {
        router.push('/vendor/register');
    }

    const handleUserLogin = () => {
        router.push('/login');
    }

    const prefixSelector = (
        <Form.Item name="prefix" noStyle initialValue="65" >
            <Select
            style={{
                width: 70,
            }}
            >
            <Option value="65">+65</Option>
            </Select>
        </Form.Item>
    );

    const handleGoogleAuthClick = useGoogleLogin({
        onSuccess: async tokenResponse => {
            // console.log("Google Token Response ==>>", tokenResponse);
            try {
                const userInfo = await axios
                .get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });

                if (userInfo?.data && userInfo?.data?.email_verified === true) {
                    console.log("User Info -->>", userInfo?.data);
                    const values = userInfo?.data;
                    values.register_type = "google";
                    const response = await registerUserService(values);
                    router.push('/');
                }

            } catch (error) {
                console.log(error);
            }
        }
    });

    return (
    <>  
        <CustomAuthRow>
            <CustomAuthCol >
                <CustomContentCol>
                    <CustomHeadTitle>Create your account</CustomHeadTitle>
                    <CustomHomeForm
                        name="basic"
                        onFinish={onFinish}
                        autoComplete="off"
                        form={form}
                    >
                        <CustomTypographyText>Phone number</CustomTypographyText>
                        <Form.Item
                            name="personal_mobile"
                            rules={[
                                {
                                pattern:
                                /^[0-9]{8}$/,
                                message: 'Please enter valid phone phone.',
                                },
                            ]}>
                            <Input placeholder="Phone number" addonBefore={prefixSelector} />
                        </Form.Item>

                        <CustomTypographyText>Name</CustomTypographyText>
                        <Form.Item
                            name="name"
                            rules={[
                            {
                                required: true,
                                message: 'Please enter full name',
                            },
                            ]}
                        >
                            <Input placeholder="Full name" />
                        </Form.Item>

                        <CustomTypographyText>Email Address</CustomTypographyText>
                        <Form.Item
                        name="email"
                        rules={[
                            {
                                validator: CheckIfValidEmail,
                            },
                        ]}
                        >
                        <Input placeholder="Your email" />
                        </Form.Item>

                        <Form.Item >
                        <SubmitButton type="primary" htmlType="submit" loading={isLoading}>
                            Register with Email
                        </SubmitButton>
                        </Form.Item>
                    </CustomHomeForm>

                    <StyledHr style={{margin:'15px 0'}} />

                    <Row style={{ display:'flex', justifyContent:'center', alignItems:'center', marginTop:'-15px' }}>
                        <CustomAgreText onClick={ () => { handleGoogleAuthClick() }} style={{ display:'flex', alignItems:'center', cursor:'pointer' }}> Register with</CustomAgreText>
                        <Col style={{ height:'2.5rem', width:'2.5rem', border:'1px solid #F2F1F0', padding:'5px', margin:'7px', cursor:'pointer' }} >
                            <BackgroundImage onClick={ () => { handleGoogleAuthClick() }} style={{height:'100%', width:'100%' }} src={Googlelogo} alt="Google-logo" ></BackgroundImage>
                        </Col>
                    </Row>

                    <CustomText>Already have a account</CustomText>

                    <LoginFormButton onClick={handleUserLogin} style={{margin:0}} >Log in</LoginFormButton>

                    <StyledHr style={{margin:'10px 0'}} />

                    <CustomAgreText>
                    By signing in or creating an account, you are agreeing with our Terms of Service; Privacy Policy; Reschedule, Cancellation & Refunds policies, and our Cookie policy.
                    </CustomAgreText>

                    <StyledHr style={{margin:'10px 0'}} />

                    <CustomAgreText>
                        All rights reserved. <br/> Copyright: © - Bookablebiz.com
                    </CustomAgreText>

                    <CustomTypography>
                        Are you a service provider ?
                    </CustomTypography>

                    <RegisterButton onClick={OnClickRegister} >Register your business</RegisterButton>

                </CustomContentCol>
            </CustomAuthCol>

            <SliderCol className="SliderCol">
                <Row>
                    <CustomSliderCol image={AuthBgImage} span={24}>
                        <CustomCarousel />
                    </CustomSliderCol>
                </Row>
            </SliderCol>
        </CustomAuthRow>
    </>
    )
}

export default Register