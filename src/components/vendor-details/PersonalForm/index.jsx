import { FormContext } from "../index";
import { useEffect, useState, useContext } from "react";
import { CustomHomeForm } from '@/components/auth/styledComponent';
import { RightCircleOutlined } from '@ant-design/icons';
import { Row, Col, Form, Input, Select, Spin } from 'antd';
import { CustVendFormBtnRow, CustVendFormButton, CustVendFormHeadTitle, CustVendFormTitle, CustVendFormTxt, CustomVendorCol, CustomVendorFormRow } from '../styledComponent'
import { EditPersonalDetailsVendService, PersonalDetailsVendService } from '@/Services/vendorForms.services';
import { usePathname, useRouter } from "next/navigation";
import { GetVendorDetailsService } from "@/Services/vendorProfile.services";
import { CustomBlkButton } from "@/components/vendor/styledComponent";

const PersonalDetailsForm = ({setSelectedRadio}) => {
    const pathname = usePathname();
    const router = useRouter();
    const { Option } = Select;
    const [form] = Form.useForm();
    const [userId, setUserId] = useState();
    const [userToken, setUserToken] = useState();
    const [isLoading, setIsLoading] = useState(false);
    // const { setSelectedRadio } = useContext(FormContext)
    const formContext = useContext(FormContext);
    console.log("Path name ==>>", pathname);
    const personlEditPath = "/vendor/profile/edit/personal";

    useEffect(() => {
        var userId = localStorage.getItem('userId');
        var token = localStorage.getItem('token');
        setUserId(userId);
        setUserToken(token);

        if (pathname === personlEditPath) {
            fetchVendorDetails(userId);
        }
    }, []);

    const fetchVendorDetails = async (id) => {
        setIsLoading(true);
        const response = await GetVendorDetailsService(id);
        if (response?.response?.status === 200) {
            const data = response?.response?.data?.data?.persInfo;
            form.setFieldsValue({ first_name: data?.first_name });
            form.setFieldsValue({ middle_name: data?.middle_name });
            form.setFieldsValue({ last_name: data?.last_name });
            form.setFieldsValue({ personal_email: data?.personalInfo?.personal_email });
            form.setFieldsValue({ personal_phone: data?.personalInfo?.personal_phone });
            form.setFieldsValue({ personal_mobile: data?.personal_mobile });
        }
        setIsLoading(false);
    }

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
            values.user_id = userId;
            values.token = userToken;
            if (pathname !== personlEditPath) {
                const response = await PersonalDetailsVendService(values);
                if (response?.response?.status == 200){
                    localStorage.setItem('redirect', 'business-info');
                    setSelectedRadio('business-info')
                }
            } else {
                const response = await EditPersonalDetailsVendService(values);
                console.log("response ==>>", response);
                if (response?.response?.status == 200) {
                    router.back();
                }
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

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

    return(
        <>
            <Row>
                <Spin fullscreen spinning={isLoading} />
                <CustomVendorCol span={24} >
                    <CustVendFormHeadTitle>Personal  information</CustVendFormHeadTitle><br/>
                    <CustVendFormTitle>Please fill in Owner’s details </CustVendFormTitle>
                    <CustomHomeForm
                        name="basic"
                        onFinish={onFinish}
                        form={form}
                        autoComplete="off"
                        style={{ width:'60%', marginTop:'10px' }}
                    >   
                        <CustomVendorFormRow gutter={[24, 24]} >
                            <Col span={12} style={{ maxWidth: '100%' }}>
                                <CustVendFormTxt>First Name *</CustVendFormTxt>
                                <Form.Item
                                name="first_name"
                                style={{width:'100%'}}
                                rules={[
                                {
                                required: true,
                                message: 'Please enter first name',
                                },
                                ]}
                                >
                                <Input placeholder='Your first name' />
                                </Form.Item>
                            </Col>
                            
                            <Col span={12} style={{ maxWidth: '100%' }}>
                                <CustVendFormTxt>Middle Name</CustVendFormTxt>
                                <Form.Item
                                    name="middle_name">
                                    <Input placeholder='Your middle name' />
                                </Form.Item>
                            </Col>
                        </CustomVendorFormRow>

                        <CustomVendorFormRow  gutter={[24, 24]} >
                            <Col span={12} style={{ maxWidth: '100%' }}>
                                <CustVendFormTxt>Last Name *</CustVendFormTxt>
                                <Form.Item
                                name="last_name"
                                rules={[
                                {
                                required: true,
                                message: 'Please enter last name',
                                },
                                ]}
                                >
                                <Input placeholder='Your Last name'/>
                                </Form.Item>
                            </Col>
                            
                            <Col span={12} style={{ maxWidth: '100%' }}>
                                <CustVendFormTxt>Personal Email *</CustVendFormTxt>
                                <Form.Item
                                name="personal_email"
                                rules={[
                                    {
                                        validator: CheckIfValidEmail,
                                    },
                                ]}
                                >
                                <Input placeholder="Your personal email" />
                                </Form.Item>
                            </Col>
                        </CustomVendorFormRow>

                        <CustomVendorFormRow  gutter={[24, 24]} >
                            <Col span={12} style={{ maxWidth: '100%' }}>
                                <CustVendFormTxt>Personal Mobile *</CustVendFormTxt>
                                <Form.Item
                                    name="personal_mobile"
                                    rules={[
                                        {
                                        required: true,
                                        pattern:
                                        /^[0-9]{8}$/,
                                        message: 'Please enter valid mobile number.',
                                        },
                                    ]}>
                                    <Input placeholder="Mobile" addonBefore={prefixSelector} />
                                </Form.Item>
                            </Col>

                            <Col span={12} style={{ maxWidth: '100%' }}>
                                <CustVendFormTxt>Personal Phone *</CustVendFormTxt>
                                <Form.Item
                                    name="personal_phone"
                                    rules={[
                                        {
                                        required: true,
                                        pattern:
                                        /^[0-9]{8}$/,
                                        message: 'Please enter valid phone number.',
                                        },
                                    ]}>
                                    <Input placeholder="personal phone" addonBefore={prefixSelector} />
                                </Form.Item>
                            </Col>
                        </CustomVendorFormRow>

                        <CustVendFormBtnRow>    
                            <Form.Item >
                            { (pathname === personlEditPath) ?                                 
                                <CustomBlkButton type="primary" htmlType="submit" loading={isLoading} >Update </CustomBlkButton> :
                                <CustVendFormButton htmlType="submit" >
                                    Business Information <RightCircleOutlined /> 
                                </CustVendFormButton>
                            }
                            </Form.Item>
                        </CustVendFormBtnRow>
                    </CustomHomeForm>
                </CustomVendorCol>
            </Row>
        </>
    )
}

export default PersonalDetailsForm;