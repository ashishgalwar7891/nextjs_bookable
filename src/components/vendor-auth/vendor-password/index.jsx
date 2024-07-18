"use client";
import { Fragment } from "react"
import { Form, Input, Row } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { SubmitButton } from "../../../styles/styledComponent";
import { CustomHomeForm, CustomAgreText, CustomTypographyText,
    CustomHeadTitle } from "../../auth/styledComponent";
import { CustomVendorAuthCol, CustomVendorAuthContent } from "../styledComponent";
import { createPasswordVendorService } from "../../../Services/auth.services"

const VendorPassword = () => {
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
        const response = await createPasswordVendorService(values);
        if(response?.response?.status === 200) {
            router.push('/vendor/login')
        }
    };

    return(
        <Fragment>
            <Row>
                <CustomVendorAuthCol span={24}>
                    <CustomVendorAuthContent span={5}>
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
                                <Input.Password placeholder='create password' />
                            </Form.Item>

                            <CustomTypographyText>Confirm password</CustomTypographyText>
                            <Form.Item
                                name='confirm_password'
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
                                <Input.Password placeholder='confirm above password again' />
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

                    </CustomVendorAuthContent>
                </CustomVendorAuthCol>
            </Row>
        </Fragment>
    )
}

export default VendorPassword;