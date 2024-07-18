"use client";
import { Fragment, useState, useContext, useEffect } from "react"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Checkbox, Form, Input, Typography, Row, Col, Spin } from 'antd';
import { BackgroundImage, RegisterFormButton, SubmitButton } from "../../../styles/styledComponent";
import {
    CustomHomeForm, CustomAgreText, CustomTypographyText,
    CustomHeadTitle
} from "../../auth/styledComponent";
import { CustomVendorAuthCol, CustomVendorAuthContent } from "../styledComponent";
import { CustomHorizontalRow } from "@/components/auth/register/styledComponent";
import { loginVendorService } from '../../../Services/auth.services'
import { getCookie, setCookie } from "@/utils/commonMethods";
import axios from "axios";
import Googlelogo from "../../../assets/imgs/Google-logo.png";
import { useGoogleLogin } from "@react-oauth/google";

const LoginVendor = () => {
    const router = useRouter();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('userId')){
            router.back();
        }
        const storedUserEmail = getCookie('vend_auth_mail');
        const storedPassword = getCookie('vend_auth');
        const storedRememberMe = getCookie('v_remember');

        if (storedRememberMe === 'true' && storedUserEmail && storedPassword) {
            form.setFieldsValue({ email: storedUserEmail });
            form.setFieldsValue({ password: storedPassword });
            form.setFieldsValue({ remember: true });
        }
    }, []);

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

    const CheckIfBlankPassword = (rule, value) => {
        if (value === undefined || value === '') {
            return Promise.reject(new Error('Password is required!'));
        }
        return Promise.resolve();
    };

    const onFinish = async (values) => {
        try {
            setIsLoading(true);
            values.login_type = 'bookable';
            const response = await loginVendorService(values);
            if (response?.status === 200) {
                setCookie("vend_auth_mail", values?.email, '/vendor/login');
                setCookie("vend_auth", values?.password, '/vendor/login');
                setCookie("v_remember", (values?.remember) ? "true" : "false", "/vendor/login");
                localStorage.setItem("v_industry", response?.data?.success?.industry);
                localStorage.setItem("v_category", response?.data?.success?.category);
                localStorage.setItem("redirect", response?.data?.success?.redirect);
               
                if (response?.data?.success?.redirect === "dashboard") {
                    window.location = '/vendor/profile';
                } else if (response?.data?.success?.redirect === "stripe-onboard") {
                   // console.log(response);
                    //window.location = '/vendor/stripe-onboard';
                   router.replace('/vendor/stripe-onboard');
                } else {
                    window.location = '/vendor/add-info';
                   // router.push('/vendor/add-info');
                }
            }else{
                setIsLoading(false);
            }
           
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    const OnClickRegister = () => {
        router.push('/vendor/register');
    }

    const handleGoogleAuthClick = useGoogleLogin({
        onSuccess: async tokenResponse => {
            // console.log("Google Token Response ==>>", tokenResponse);
            try {
                const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                })
                console.log("User Info -->>", userInfo?.data);

                if (userInfo?.data && userInfo?.data?.email_verified === true) {
                    setIsLoading(true)
                    console.log("User Info -->>", userInfo?.data);
                    const values = userInfo?.data;
                    values.login_type = "google";
                    console.log("Values on Google Auth -->>", values);
                    const response = await loginVendorService(values);
                    if (response.status === 200) {
                        setCookie("vend_auth_mail", values?.email, '/vendor/login');
                        setCookie("vend_auth", values?.password, '/vendor/login');
                        setCookie("v_remember", (values?.remember) ? "true" : "false", "/vendor/login");
                        localStorage.setItem("v_industry", response?.data?.success?.industry);
                        localStorage.setItem("v_category", response?.data?.success?.category);

                        if (response?.data?.success?.redirect === "dashboard") {
                            router.push('/vendor/profile');
                        } else if (response?.data?.success?.redirect === "stripe-onboard") {
                            router.replace('/vendor/stripe-onboard');
                        } else {
                            router.push('/vendor/add-info');
                        }
                    } else{
                        setIsLoading(false);
                    }
                    
                }else{
                    setIsLoading(false);
                }
                
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        }
    });

    return (
        <Fragment>
            <Row>
                {isLoading ? <>
                    <div style={{ textAlign: "center", flex: '1', maxWidth: "100%", padding: "120px" }}>
                        <Spin tip="Loading" size="large">
                            <div className="content" />
                        </Spin>
                    </div>
                </> : <>
                    <CustomVendorAuthCol span={24}>
                        <CustomVendorAuthContent span={5}>
                            <CustomHeadTitle>Business Log in</CustomHeadTitle>
                            <CustomHomeForm
                                name="basic"
                                form={form}
                                onFinish={onFinish}
                                autoComplete="off"
                            >
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

                                <CustomTypographyText>Password</CustomTypographyText>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            validator: CheckIfBlankPassword,
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder="Enter your passward" />
                                </Form.Item>

                                {/* <Form.Item> */}
                                <Row style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }} >
                                    <Form.Item
                                        name="remember"
                                        valuePropName="checked"
                                    >
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>
                                    <span>
                                        <Link href="/vendor/forgot-password">
                                            <Typography.Text
                                                style={{
                                                    color: '#ED510C',
                                                    cursor: 'pointer',
                                                    textDecoration: 'none',
                                                    fontWeight: 400,
                                                }}
                                            >
                                                Forgot Password?
                                            </Typography.Text>
                                        </Link>
                                    </span>
                                </Row>
                                {/* </Form.Item> */}

                                <Form.Item >
                                    <SubmitButton type="primary" htmlType="submit" loading={isLoading}>
                                        Log in
                                    </SubmitButton>
                                </Form.Item>
                            </CustomHomeForm>

                            <CustomHorizontalRow>
                                <Col span={7}>{<hr />}</Col>
                                <span>
                                    Or use other option
                                </span>
                                <Col span={7}>{<hr />}</Col>
                            </CustomHorizontalRow>

                            <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <CustomAgreText onClick={() => { handleGoogleAuthClick() }} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} >Sign in with</CustomAgreText>
                                <Col style={{ height: '2.5rem', width: '2.5rem', border: '1px solid #F2F1F0', padding: '5px', margin: '7px', cursor: 'pointer' }} >
                                    <BackgroundImage onClick={() => { handleGoogleAuthClick() }} style={{ height: '100%', width: '100%' }} src={Googlelogo} alt="Google-logo" ></BackgroundImage>
                                </Col>
                            </Row>

                            <RegisterFormButton onClick={OnClickRegister}>
                                Register your business
                            </RegisterFormButton>

                            <hr />

                            <CustomAgreText>
                            By signing in or creating an account, you are agreeing with our Terms of Service; Privacy Policy; Reschedule, Cancellation & Refunds policies, and our Cookie policy.
                            </CustomAgreText>

                            <hr />

                            <CustomAgreText>
                                All rights reserved. <br /> Copyright: © - Bookablebiz.com
                            </CustomAgreText>

                        </CustomVendorAuthContent>
                    </CustomVendorAuthCol>
                </>}
            </Row>
        </Fragment>
    )
}

export default LoginVendor;