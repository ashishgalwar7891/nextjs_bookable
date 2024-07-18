import { Fragment, useState } from "react";
import { Col, Row, Form, Input, Select, TimePicker } from 'antd';
import { countries, cities } from '@/lib/constants';
import { CustomButton, CustomTitle } from "@/components/vendor/styledComponent";
import { CustVendFormTxt, CustomVendorFormRow } from "@/components/vendor-details/styledComponent";
import { CustomForm } from "@/components/vendor/location/addLocation/styledComponent";
import { CustomCol } from "@/styles/styledComponent";
import { GetUserAddressService, addUserLocationServices } from "@/Services/userService.services";
import { useEffect } from "react";



const UserAddress = () => {
    const [form] = Form.useForm();
    const { Option } = Select;
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [ userId, setUserId ] = useState();
    const [ userToken, setUserToken ] = useState();

    useEffect(() => {  
        (async() => {
            const userId = localStorage.getItem('userId');
            const userToken = localStorage.getItem('token');
            setUserId(userId)
            setUserToken(userToken)

            fetchUserAddressDetails({ "user_id": userId, "token": userToken})

        })();
    }, []);

    const fetchUserAddressDetails = async (userData) => {
        console.log("User Data ==>>", userData);

        const response = await GetUserAddressService(userData);
        const output = response?.response?.data?.data;
        console.log("Response ==>>", response);
        if (response?.response?.status == 200 && output?.country && output?.city) {
            console.log("Running well");
            form.setFieldsValue({ country: output?.country});
            form.setFieldsValue({ city: output?.city});
            form.setFieldsValue({ address: output?.address});
            form.setFieldsValue({ postal_code: output?.postal_code});
            setSelectedCountry(output?.country);
            setSelectedCity(output?.city);
        }
    }

    const onFinish = async (values) => {
        values.user_id = userId;
        values.token = userToken
        console.log("Address data ==>>", values);
        const response = await addUserLocationServices(values);
        console.log("response ==>>", response);
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
            <div className="biz-container"> 
            <Row style={{ maxWidth:"800px", margin:"0px auto", border:"1px solid #ccc", padding:"10px 20px 20px 20px", borderRadius:"10px", marginTop:"50px"}}>
                <Col span={24} style={{ padding:'20px 10px' }}>
                <CustomTitle>
                Add/Update Address
            </CustomTitle>
            <CustomForm
                name="basic"
                form={form}
                onFinish={onFinish}
                autoComplete="off"
                style={{ width:'100%', marginTop:'10px' }}
            >   
                <CustomVendorFormRow style={{display:'flex', flexDirection:'row', gap:'5%'}}>
                    <CustomCol style={{minWidth:'150px'}}>
                        <CustVendFormTxt>Country</CustVendFormTxt>
                        <Form.Item
                            name="country"
                            rules={[
                                {
                                required: true,
                                message: "Please select country!",
                                },
                            ]}
                            >
                            <Select value={selectedCountry} onChange={handleCountryChange} placeholder='Select Country'>
                                <Option value="">Select a country</Option>
                                {countries.map((country) => (
                                <Option key={country} value={country}>
                                    {country}
                                </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </CustomCol>

                    <CustomCol style={{minWidth:'150px'}}>
                        <CustVendFormTxt>City</CustVendFormTxt>
                        <Form.Item
                            name="city"
                            rules={[
                                {
                                required: true,
                                message: "Please select city!",
                                },
                            ]}
                            >
                            <Select value={selectedCity} onChange={handleCityChange}>
                                <Option value="">Select a City</Option>
                                {cities[selectedCountry]?.map((city) => (
                                <Option key={city} value={city.toLowerCase()}>
                                    {city}
                                </Option>
                                ))}
                            </Select>
                            </Form.Item>
                    </CustomCol>

                    <CustomCol style={{minWidth:'150px'}} >
                        <CustVendFormTxt>Postal code</CustVendFormTxt>
                        <Form.Item
                            name="postal_code"
                            rules={[
                                {
                                    pattern: /^[0-9]{6}$/,
                                    message: 'Please enter a valid 6-digit number.',
                                },
                            ]}
                            >
                            <Input 
                                onInput={(e) => ((e.target).value = (e.target).value.toUpperCase()) }
                            />
                        </Form.Item>
                    </CustomCol>
                </CustomVendorFormRow>

                <CustomVendorFormRow>
                    <CustomCol span={24}>
                        <CustVendFormTxt>Address</CustVendFormTxt>
                        <Form.Item
                            name={'address'}
                            rules={[
                            {
                                required: true,
                                message: 'business address required',
                            }
                            ]}
                            
                        >
                            <Input.TextArea
                                allowClear
                                maxLength={150}
                                style={{ width: '100%', height: '100px' }}
                                placeholder="Enter address here..."
                                autoSize={{ minRows: 2, maxRows: 6 }} 
                            />
                        </Form.Item>
                    </CustomCol>
                </CustomVendorFormRow>

                <Row>
                    <CustomButton  type="primary" htmlType="submit">Save</CustomButton>
                </Row>
            </CustomForm>
                </Col>
            </Row>
            </div>
        </Fragment>
    )
}

export default UserAddress;