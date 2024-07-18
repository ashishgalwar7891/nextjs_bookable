"use client";
const { Fragment } = require("react");
import { useRouter, useSearchParams } from 'next/navigation';
import { Row, Form, Input } from 'antd';
import AuthBgImage from "../../../assets/imgs/AuthBg_Image.svg";
import CustomCarousel from "../../../lib/commonComponent/SideCarousel";
import { SubmitButton, RegisterButton } from "@/styles/styledComponent";
import { SliderCol, CustomAuthRow, CustomAuthCol, CustomSliderCol, CustomHomeForm, CustomAgreText, CustomContentCol, 
    CustomTypography, CustomTypographyText, CustomHeadTitle } from "../styledComponent";
import { createPasswordUserService } from '@/Services/auth.services';

const ForgetPassword = () => {
    const router = useRouter();
    const searchParams = useSearchParams(); 
    const email = searchParams.get('email');

    const validatePassword = (rule, value, callback) => {
        const passwordValidationRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    
        if (!value || value.length < 8 || !passwordValidationRegex.test(value)) {
            callback('Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long.');
        } else {
            callback();
        }
    };
    
    const onFinish = async (values) => {
        values.email = email;
        const response = await createPasswordUserService(values);
        if(response?.response?.status === 200) {
            router.push('/')
        }
    };

    return (
    <Fragment>
        <CustomAuthRow>
            <CustomAuthCol >
                <CustomContentCol span={24}>
                    <CustomHeadTitle>Create password</CustomHeadTitle>
                    <CustomHomeForm
                        name="basic"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <CustomTypographyText>Password</CustomTypographyText>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your password!',
                                },
                                {
                                    validator: validatePassword,
                                },
                            ]}
                            hasFeedback
                            >
                            <Input.Password placeholder='create password'/>
                        </Form.Item>

                        <CustomTypographyText>Confirm password</CustomTypographyText>
                        <Form.Item
                            name="confirm_password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                            ]}
                        >
                            <Input.Password placeholder='create above password again' />
                        </Form.Item>

                        <Form.Item >
                        <SubmitButton type="primary" htmlType="submit" style={{ margin: '10px 0' }} >
                            Create account
                        </SubmitButton>
                        </Form.Item>
                    </CustomHomeForm>

                    <hr/>

                    <CustomAgreText>
                    By signing in or creating an account, you are agreeing with our Terms of Service; Privacy Policy; Reschedule, Cancellation & Refunds policies, and our Cookie policy.
                    </CustomAgreText>

                    <hr/>

                    <CustomAgreText>
                        All rights reserved. <br/> Copyright: © - Bookablebiz.com
                    </CustomAgreText>

                    <CustomTypography>
                        Are you a service provider ?
                    </CustomTypography>

                    <RegisterButton>Register you business</RegisterButton>

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

export default ForgetPassword;
