"use client";
import { Fragment, useState } from "react"
import { useRouter, useSearchParams } from 'next/navigation';
import { Checkbox, Form, Input, Typography, Row, Col } from 'antd';
import { SubmitButton } from "../../../styles/styledComponent";
import { CustomAuthRow, CustomHomeForm, CustomAgreText, CustomTypographyText,
    CustomHeadTitle } from "../styledComponent";
import { CustomVendorAuthCol, CustomVendorAuthContent } from "../../vendor-auth/styledComponent";
import { resetPasswordService, resetUserPasswordService } from "../../../Services/auth.services";

const ResetPassword = (props) => { 
    const router = useRouter();
    const { role } = props;
    const searchParams = useSearchParams();
    const email = searchParams.get('email')
    const token = searchParams.get('token')
    const validatePassword = (rule, value, callback) => {
        const passwordValidationRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    
        if (!value || value.length < 8 || !passwordValidationRegex.test(value)) {
            callback('Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long.');
        } else {
            callback();
        }
    };
    console.log("Reset role -->>", role)

    
    const onFinish = async (values) => {
        values.email = email;
        values.token = token;
        if(role === 'vendor') {
            const response = await resetPasswordService(values)
            if(response.response.status === 200) {
                router.push('/vendor/login')
            }
        } else if(role === 'user') {
            const response = await resetUserPasswordService(values)
            if(response.response.status === 200) {
                router.push('/')
            }
        }
    };

    return(
        <Fragment>
                <CustomAuthRow style={{marginLeft:'0'}} >
                    <CustomVendorAuthContent>
                        <CustomHeadTitle>Reset password</CustomHeadTitle>
                        <CustomHomeForm
                            name="basic"
                            onFinish={onFinish}
                            autoComplete="off"
                        >

                        <CustomTypographyText>New Password</CustomTypographyText>
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
                                <Input.Password placeholder='create password' />
                            </Form.Item>

                            <CustomTypographyText>Confirm new Password</CustomTypographyText>
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
                                <Input.Password placeholder='Confirm above password again' />
                            </Form.Item>

                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item >
                            <SubmitButton type="primary" htmlType="submit">
                                Save
                            </SubmitButton>
                            </Form.Item>
                        </CustomHomeForm>

                        <CustomAgreText>
                            All rights reserved. <br/> Copyright: © - Bookablebiz.com
                        </CustomAgreText>

                    </CustomVendorAuthContent>
                </CustomAuthRow>
        </Fragment>
    )
}

export default ResetPassword;