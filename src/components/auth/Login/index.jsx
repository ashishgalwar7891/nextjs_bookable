import { Fragment, useState, useContext, useEffect } from "react";
import Link from 'next/link';
import { jwtDecode } from "jwt-decode";
import { useRouter } from 'next/navigation';
import { Checkbox, Form, Input, Typography, Row, Col } from 'antd';
import { useGoogleLogin } from '@react-oauth/google';
import AuthBgImage from "../../../assets/imgs/AuthBg_Image.svg";
import CustomCarousel from "@/lib/commonComponent/SideCarousel";
import { SubmitButton, RegisterButton, BackgroundImage, LoginFormButton } from "@/styles/styledComponent";
import { CustomAuthRow, CustomAuthCol, CustomSliderCol, CustomContentCol, CustomHomeForm, CustomAgreText,
    CustomTypography, CustomTypographyText, CustomHeadTitle, CustomText, SliderCol } from "../styledComponent";
import { loginUserService } from "@/Services/auth.services";
import Googlelogo from "../../../assets/imgs/Google-logo.png"
import { StyledHr } from "@/components/vendor-payment/styledComponent";
import { AuthContext } from '@/app/layout';
import { getCookie, setCookie } from "@/utils/commonMethods";
import axios from "axios";
import { LayoutContext, useCart } from "@/components/Layout";

const Login = ({comingFrom, service_id, location_id}) => {
    const { setCartRefresh, setHeaderRefresh } = useCart();
    const router = useRouter();
    const [form] = Form.useForm();
    const { userDetails, setUserDetails } = useContext(AuthContext);
    const [ isLoading, setIsLoading] = useState();

    useEffect(() => {
        if(localStorage.getItem('userId')){
            router.back();
        }
        const storedUserEmail = getCookie('user_auth_mail');
        const storedPassword = getCookie('user_auth');
        const storedRememberMe = getCookie('remember');
        
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
            const response = await loginUserService(values);
            if (response?.status === 200) {
                setCookie("user_auth_mail", values?.email, "/login");
                setCookie("user_auth", values?.password, "/login");
                setCookie("remember", (values?.remember) ? "true" : "false", "/login");

                const result = response?.response?.data?.success
                setUserDetails(result);
                const allow_previous_route = localStorage.getItem('previous_route');
                if(allow_previous_route) {
                    router.back();
                    localStorage.removeItem('previous_route');
                } else{
                    if(comingFrom){
                        router.push('/'+comingFrom+'?serviceId='+service_id+'&locationId='+location_id);
                    }else{
                        setHeaderRefresh(true);
                        setCartRefresh(true);
                        router.push('/');
                    }
                  
                }
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    const OnClickRegister = () => {
        router.push('/vendor/register');
    }

    const handleUserRegister = () => {
        router.push('/register');
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
                    console.log("User Info -->>", userInfo?.data);
                    const values = userInfo?.data;
                    values.login_type = "google";
                    const response = await loginUserService(values);
                    if (response.status === 200) {
                        
                        const allow_previous_route = localStorage.getItem('previous_route');
                        if(allow_previous_route) {
                            router.back();
                            localStorage.removeItem('previous_route');
                        } else{
                            setHeaderRefresh(true);
                        setCartRefresh(true);
                            router.push('/');
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    });
    
    return (
    <Fragment>
            <CustomAuthRow style={{}}>
                    <CustomAuthCol>
                        <CustomContentCol >
                            <CustomHeadTitle>Log in</CustomHeadTitle>
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

                                <Row style={{ width: '100%', display: 'flex', justifyContent: 'space-between'}} >
                                    <Form.Item
                                        name="remember"
                                        valuePropName="checked"
                                    >
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>
                                        <span>
                                            <Link href="/forgot-password">
                                                <Typography.Text
                                                style={{
                                                    color: '#ED510C',
                                                    cursor: 'pointer',
                                                    textDecoration: 'none',
                                                    fontWeight:400,
                                                }}
                                                >
                                                Forgot Password?
                                                </Typography.Text>
                                            </Link>
                                        </span>
                                </Row>

                                <Form.Item >
                                <SubmitButton type="primary" htmlType="submit" loading={isLoading}>
                                    Log in
                                </SubmitButton>
                                </Form.Item>
                            </CustomHomeForm>

                            <StyledHr style={{margin:'0 0 20px 0'}} />

                            <Row style={{ display:'flex', justifyContent:'center', alignItems:'center', marginTop:'-15px' }}>
                                <CustomAgreText onClick={ () => { handleGoogleAuthClick() }} style={{ display:'flex', alignItems:'center', cursor:'pointer' }} >Sign in with</CustomAgreText>
                                <Col style={{ height:'2.5rem', width:'2.5rem', border:'1px solid #F2F1F0', padding:'5px', margin:'7px', cursor:'pointer' }} >
                                    <BackgroundImage onClick={ () => { handleGoogleAuthClick() }} style={{height:'100%', width:'100%' }} src={Googlelogo} alt="Google-logo" ></BackgroundImage>
                                </Col>
                            </Row>
                            {/* <hr/> */}

                            <CustomText>Don’t have an account</CustomText>

                            <LoginFormButton onClick={handleUserRegister} style={{margin:0}} >Register </LoginFormButton>

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

                            <RegisterButton onClick={OnClickRegister}>Register you business</RegisterButton>
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
    </Fragment>
    )
}

export default Login;
