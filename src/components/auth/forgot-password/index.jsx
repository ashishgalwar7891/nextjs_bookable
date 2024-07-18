"use client"
import { Fragment, useState } from "react";
import { Form, Input, Row, Col } from 'antd';
import { SubmitButton } from "@/styles/styledComponent";
import { CustomHomeForm, CustomAuthRow, CustomAgreText, CustomTypographyText, CustomHeadTitle, CustomPasswordText } from "../styledComponent";
import { CustomVendorAuthCol, CustomVendorAuthContent } from "@/components/vendor-auth/styledComponent";
import { ForgotPasswordService, ForgotUserPasswordService } from "../../../Services/auth.services"; 

const ForgotPassword = (props) => {
    const { role } = props
    const [showPage, setShowPage] = useState(true);

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
        if (role === 'vendor') {
            const response = await ForgotPasswordService(values);
            if(response.response.status === 200) {
                setShowPage(false)
            }
        }
        else if (role === 'user') {
            const response = await ForgotUserPasswordService(values);
            if(response.response.status === 200) {
                setShowPage(false)
            }
        } 
    };

    return(
        <Fragment>
            { (showPage) ? 
           
                    <CustomVendorAuthCol span={24}>
                        <CustomAuthRow>
                            <CustomVendorAuthContent >
                                <CustomHeadTitle>Reset password</CustomHeadTitle>
                                <CustomPasswordText>Enter the email associated with the account and we will send you a link to reset your password.</CustomPasswordText>
                                <CustomHomeForm
                                    name="basic"
                                    onFinish={onFinish}
                                    autoComplete="off"
                                    style={{ marginTop: '1rem'}}
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
                                    <SubmitButton type="primary" htmlType="submit">
                                        Continue
                                    </SubmitButton>
                                    </Form.Item>
                                </CustomHomeForm>

                                <hr/>

                                <CustomAgreText>
                                    All rights reserved. <br/> Copyright: © - Bookablebiz.com
                                </CustomAgreText>
                            </CustomVendorAuthContent>
                        </CustomAuthRow>
                    </CustomVendorAuthCol>
             : 
            <Row>
                <Col style={{ height:'100vh', display:"flex", alignItems:'center', justifyContent:'center'}} span={24}>
                    <h3 style={{display:"flex", alignItems:'center', justifyContent:'center'}}>
                        Reset link has been sent to your registered email address.
                        <br/>
                        Thanks...
                    </h3>
                </Col>
            </Row>
        } 
        </Fragment>
    )
}

export default ForgotPassword;