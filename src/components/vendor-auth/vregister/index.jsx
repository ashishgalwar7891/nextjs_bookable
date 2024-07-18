"use client";
const { Fragment, useState, useEffect } = require("react")
import { Form, Input, Col, Row, Spin } from 'antd';
import { useRouter } from 'next/navigation';
import Googlelogo from "../../../assets/imgs/Google-logo.png";
import { BackgroundImage, SubmitButton, RegisterButton } from "../../../styles/styledComponent";
import {
    CustomHomeForm, CustomAgreText, CustomTypography,
    CustomTypographyText, CustomHeadTitle
} from "../../auth/styledComponent";
import { CustomHorizontalRow } from '../../auth/register/styledComponent';
import { CustomVendorAuthCol, CustomVendorAuthContent } from '../styledComponent';
import { registerVendorService } from '@/Services/auth.services';
import InfoModal from "../../../lib/commonComponent/ConfirmModal";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const RegisterVendor = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

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
  useEffect(() => {
    if(localStorage.getItem('userId')){
        router.back();
    }
  },[])
    const onFinish = async (values) => {
        try {
            setIsLoading(true);
            values.register_type = "bookable";
            const response = await registerVendorService(values);
            if (response?.status === 200) {
                form.resetFields();
            }
            setIsLoading(false);

        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    const handleClickLogin = () => {
        setIsLoading(true);
        router.push('/vendor/login')
        setIsLoading(false);
    }

    const handleGoogleAuthClick = useGoogleLogin({
        onSuccess: async tokenResponse => {
            // console.log("Google Token Response ==>>", tokenResponse);
            try {
                const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });

                console.log("User Info -->>", userInfo?.data);
                if (userInfo?.data && userInfo?.data?.email_verified === true) {
                    setIsLoading(true) ;
                    console.log("User Info -->>", userInfo?.data);
                    const values = userInfo?.data;
                    values.register_type = "google";
                    const response = await registerVendorService(values);
                    if (response?.status === 200) {
                        if (response.data.success.google_details.email_verified) {
                            router.push('/vendor/add-info');
                        }

                    }else{
                        setIsLoading(false)
                        router.push('/vendor/login');
                    }
                }

            } catch (error) {
                console.log(error);
                setIsLoading(false)
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
                            <CustomHeadTitle>Create your business account</CustomHeadTitle>
                            <CustomHomeForm
                                form={form}
                                name="basic"
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

                                <Form.Item >
                                    <SubmitButton type="primary" htmlType="submit" loading={isLoading} >
                                        Register with Email
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
                                <CustomAgreText onClick={() => {  handleGoogleAuthClick() }} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}> Register with</CustomAgreText>
                                <Col style={{ height: '2.5rem', width: '2.5rem', border: '1px solid #F2F1F0', padding: '5px', margin: '7px', cursor: 'pointer' }} >
                                    <BackgroundImage onClick={() => { handleGoogleAuthClick() }} style={{ height: '100%', width: '100%' }} src={Googlelogo} alt="Google-logo" ></BackgroundImage>
                                </Col>
                            </Row>

                            <hr />

                            <CustomAgreText>
                            By signing in or creating an account, you are agreeing with our Terms of Service; Privacy Policy; Reschedule, Cancellation & Refunds policies, and our Cookie policy.
                            </CustomAgreText>

                            <hr />

                            <CustomAgreText>
                                All rights reserved. <br /> Copyright: © - Bookablebiz.com
                            </CustomAgreText>

                            <CustomTypography>
                                Account already exists
                            </CustomTypography>

                            <RegisterButton onClick={handleClickLogin} >Login to business</RegisterButton>

                        </CustomVendorAuthContent>
                    </CustomVendorAuthCol>
                </>}
            </Row>
        </Fragment>
    )
}

export default RegisterVendor;