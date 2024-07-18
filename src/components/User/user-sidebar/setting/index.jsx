import { Fragment, useState } from "react";
import { Col, Row, Form, Input, Select, TimePicker } from 'antd';
import { countries, cities } from '@/lib/constants';
import { CustomButton, CustomTitle } from "@/components/vendor/styledComponent";
import { CustVendFormTxt, CustomVendorFormRow } from "@/components/vendor-details/styledComponent";
import { CustomForm } from "@/components/vendor/location/addLocation/styledComponent";
import { CustomCol } from "@/styles/styledComponent";
import { addUserLocationServices } from "@/Services/userService.services";
import { useEffect } from "react";

const UserSettings = () => {
    const [form] = Form.useForm();
    const [ userId, setUserId ] = useState();

    useEffect(() => {  
        (async() => {
            const userId = localStorage.getItem('userId')
            setUserId(userId)
        })();
    }, []);

    const onFinish = async (values) => {
        values.user_id = userId;
        console.log("Address data ==>>", values);
        // const response = await addUserLocationServices(values);
        // console.log("response ==>>", response);
    };

    console.log("User ID -->>", userId);

    const handleCountryChange = (value) => {
        setSelectedCountry(value);
        setSelectedCity('');
    };

    const handleCityChange = (value) => {
        setSelectedCity(value);
    };
    
    return(
        <Fragment>
            <Row style={{ width:'100%' }}>
                <Col span={24} style={{ padding:'0 10px' }}>
                <CustomTitle>
                Settings
            </CustomTitle>
            <CustomForm
                name="basic"
                form={form}
                onFinish={onFinish}
                autoComplete="off"
                style={{ width:'100%', marginTop:'10px' }}
            >   
                <CustomVendorFormRow gutter={[24, 24,]}>
                    Settings 
                </CustomVendorFormRow>

                <Row>
                    <CustomButton  type="primary" htmlType="submit">Generate OTP</CustomButton>
                </Row>
            </CustomForm>
                </Col>
            </Row>
        </Fragment>
    )
}

export default UserSettings;