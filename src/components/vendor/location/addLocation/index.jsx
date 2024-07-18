import { CustVendFormBtnRow, CustVendFormTxt, CustomVendorFormRow } from "@/components/vendor-details/styledComponent";
import { Fragment, useEffect, useState } from "react";
import { useRouter, useParams } from 'next/navigation';
import { CustomButton, CustomForm, CustomCol } from "./styledComponent";
import { Col, Row, Form, Input, Select, TimePicker, Spin } from 'antd';
import { countries, cities } from '@/lib/constants';
import { CustomTitle } from "../../styledComponent";
import dayjs from 'dayjs';
import { AddLocationVendService, GetVendorLocationByIdService, GetVendorLocationService, UpdateLocationVendorService } from "@/Services/vendorLocation.services";
import { RightOutlined } from "@ant-design/icons";


const format = 'HH:mm';

const LocationForm = ({ params }) => {
    const router = useRouter();
    const [form] = Form.useForm();
    const { Option } = Select;
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [ userId, setUserId ] = useState();
    const [ userToken, setUserToken ] = useState();
    const [ isLoading, setIsLoading ] = useState(false)
    
    useEffect( () => {
        (async () => {
            setIsLoading(true);
            const user_Id = localStorage.getItem('userId');
            const user_token = localStorage.getItem('token');
            setUserId(user_Id);
            setUserToken(user_token);

            if (params?.locationId) {
                const response = await GetVendorLocationByIdService(user_Id, params?.locationId);
                const output = response?.response?.data?.data?.locationInfo?.[0];
                form.setFieldsValue({ name: output?.name});
                form.setFieldsValue({ phone: output?.phone});
                form.setFieldsValue({ country: output?.country});
                form.setFieldsValue({ city: output?.city});
                form.setFieldsValue({ address: output?.address});
                form.setFieldsValue({ location_email: output?.email});
                form.setFieldsValue({ postal_code: output?.postal_code});
                form.setFieldsValue({ start_time:  dayjs(output?.start_time, format)});
                form.setFieldsValue({ end_time:  dayjs(output?.end_time, format)});
                setSelectedCountry(output?.country);
                setSelectedCity(output?.city);
            }
            setIsLoading(false)
        })();
    }, [])

    const onFinish = async (values) => {
        try {
            setIsLoading(true);
            values.user_id = userId;
            values.token = userToken;
            values.start_time = values.start_time.format(format);
            values.end_time = values.end_time.format(format);
            values.city = values.city.toLowerCase();
    
            if(params?.locationId) {
                const response = await UpdateLocationVendorService(params?.locationId, values);
                if (response?.response?.status == 200) {
                    form.resetFields();
                    handleBack()
                }
            } else {
                const response = await AddLocationVendService(values);
                if (response?.response?.status == 200) {
                    form.resetFields();
                    handleBack();
                }
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

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

    const handleCountryChange = (value) => {
        setSelectedCountry(value);
        setSelectedCity('');
    };

    const handleCityChange = (value) => {
        setSelectedCity(value);
    };

    const validateEndTime = (_, value) => {
        const startTime = form.getFieldValue('start_time');
        if (startTime && value && dayjs(value).isBefore(dayjs(startTime))) {
            return Promise.reject('End time must be after start time');
        }
        return Promise.resolve();
    };

    const handleBack = () => {
        router.back()
    }

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
    
    return (
      <Fragment>
        <Spin fullscreen spinning={isLoading} />
        <Row>
          <Col
            span={24}
            style={{ padding: params?.locationId ? "0 20px" : "0 20px" }}
          >
            <Row>
              <Col span={24}>
                You are here:
                <span
                  onClick={handleBack}
                  style={{ color: "#EA8933", cursor: "pointer" }}
                >
                  {" "}
                  My Locations{" "}
                </span>
                <RightOutlined style={{ color: "#EA8933" }} />
                <span style={{ color: "#EA8933" }}>
                  {params?.locationId ? "Update Location" : "Add Location"}
                </span>
              </Col>
            </Row>

            <CustomTitle>
              {params?.locationId ? "Update Location" : "Add Location"}
            </CustomTitle>
            <CustomForm
              name="basic"
              form={form}
              onFinish={onFinish}
              autoComplete="off"
              style={{ width: "100%", marginTop: "10px" }}
            >
              <CustomVendorFormRow gutter={[24, 24]}>
                <CustomCol span={12}>
                  <CustVendFormTxt>Location Name</CustVendFormTxt>
                  <Form.Item
                    name="name"
                    style={{ width: "100%" }}
                    rules={[
                      {
                        required: true,
                        message: "Please enter Location name",
                      },
                    ]}
                  >
                    <Input placeholder="Location Name" />
                  </Form.Item>
                </CustomCol>
              </CustomVendorFormRow>

              <CustomVendorFormRow gutter={[24, 24]}>
                <CustomCol span={12}>
                  <CustVendFormTxt>Location contact number</CustVendFormTxt>
                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Please enter location phone number",
                      },
                      {
                        max: 8,
                        message: "Please enter a valid phone number.",
                      },
                      {
                        pattern: /^[0-9]{8}$/,
                        message: "Please enter a valid phone no.",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Phone number"
                      addonBefore={prefixSelector}
                    />
                  </Form.Item>
                </CustomCol>

                <CustomCol span={12}>
                  <CustVendFormTxt>Email</CustVendFormTxt>
                  <Form.Item
                    name="location_email"
                    rules={[
                      {
                        validator: CheckIfValidEmail,
                      },
                    ]}
                  >
                    <Input
                      placeholder="Location email"
                      disabled={params?.locationId ? true : false}
                    />
                  </Form.Item>
                </CustomCol>
              </CustomVendorFormRow>

              <CustomVendorFormRow gutter={[24, 24]}>
                <CustomCol span={8}>
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
                    <Select
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      placeholder="Select Country"
                    >
                      <Option value="">Select a country</Option>
                      {countries.map((country) => (
                        <Option key={country} value={country}>
                          {country}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </CustomCol>

                <CustomCol span={8}>
                  <CustVendFormTxt>City/Town</CustVendFormTxt>
                  <Form.Item
                    name="city"
                    rules={[
                      {
                        required: true,
                        message: "Please select city/town",
                      },
                    ]}
                  >
                    <Select
                      value={selectedCity}
                      onChange={handleCityChange}
                      placeholder="Select City"
                    >
                      <Option value="">Select a City</Option>
                      {cities[selectedCountry]?.map((city) => (
                        <Option key={city} value={city}>
                          {city}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </CustomCol>

                <CustomCol span={8}>
                  <CustVendFormTxt>Postal code</CustVendFormTxt>
                  <Form.Item
                    name="postal_code"
                    rules={[
                      {
                        required: true,
                        pattern: /^[0-9]{6}$/,
                        message: "Please enter a valid 6-digit number.",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter Postal Code.."
                      onInput={(e) =>
                        (e.target.value = e.target.value.toUpperCase())
                      }
                    />
                  </Form.Item>
                </CustomCol>
              </CustomVendorFormRow>

              <CustomVendorFormRow>
                <CustomCol span={24}>
                  <CustVendFormTxt>Address</CustVendFormTxt>
                  <Form.Item
                    name={"address"}
                    rules={[
                      {
                        required: true,
                        message: "business address required",
                      },
                    ]}
                  >
                    <Input.TextArea
                      allowClear
                      maxLength={150}
                      style={{ width: "100%", height: "100px" }}
                      placeholder="Enter address here..."
                      autoSize={{ minRows: 2, maxRows: 6 }}
                    />
                  </Form.Item>
                </CustomCol>
              </CustomVendorFormRow>

              <CustomVendorFormRow>
                <CustVendFormTxt style={{ marginBottom: "12px" }}>
                  Business hours for this location
                </CustVendFormTxt>
              </CustomVendorFormRow>

              <CustomVendorFormRow style={{ display: "flex" }}>
                <CustomCol span={12}>
                  <CustVendFormTxt>Start time</CustVendFormTxt>
                  <Form.Item
                    name={"start_time"}
                    rules={[
                      {
                        required: true,
                        message: "business time required",
                      },
                    ]}
                  >
                    <TimePicker
                      initialValues={dayjs("12:00", format)}
                      format={format}
                    />
                  </Form.Item>
                </CustomCol>

                <CustomCol span={12}>
                  <CustVendFormTxt>End time</CustVendFormTxt>
                  <Form.Item
                    name={"end_time"}
                    rules={[
                      {
                        required: true,
                        message: "business time required",
                      },
                      { validator: validateEndTime },
                    ]}
                  >
                    <TimePicker
                      initialValues={dayjs("12:00", format)}
                      format={format}
                    />
                  </Form.Item>
                </CustomCol>
              </CustomVendorFormRow>

              <Row>
                <CustomButton
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                >
                  {params?.locationId ? "Update" : "Save"}
                </CustomButton>
              </Row>
            </CustomForm>
          </Col>
        </Row>
      </Fragment>
    );
}

export default LocationForm;