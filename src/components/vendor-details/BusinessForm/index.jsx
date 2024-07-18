"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState, useContext, useEffect } from "react";
import {
  RightCircleOutlined,
  UploadOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Upload,
  Button,
  message,
  Spin,
} from "antd";
import { FormContext } from "../index";
import { CustomHomeForm } from "@/components/auth/styledComponent";
import {
  CustVendFormBtnRow,
  CustVendFormButton,
  CustVendFormHeadTitle,
  CustomIconCol,
  CustVendFormTitle,
  CustVendFormTxt,
  CustomVendorCol,
  CustomVendorFormRow,
  CustCamIconTxt,
  CustomUploadButton,
} from "../styledComponent";
import { countries, cities } from "@/lib/constants";
import {
  BusinessDetailsVendService,
  EditBusinessDetailsVendService,
  GetCategoryIndustryService,
} from "@/Services/vendorForms.services";
import InfoModal from "@/lib/commonComponent/ConfirmModal";
import { GetVendorDetailsService } from "@/Services/vendorProfile.services";
import { CustomBlkButton } from "@/components/vendor/styledComponent";
import { STORAGE_URL } from "@/Services/vendorService.services";

const BusinessDetailsForm = (props) => {
  const { userEmail, setSelectedRadio } = props;
  const { Option } = Select;
  const router = useRouter();
  const pathname = usePathname();
  // const { setSelectedRadio } = useContext(FormContext)
  const [userId, setUserId] = useState();
  const [userToken, setUserToken] = useState();
  const [form] = Form.useForm();
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [dropDownInfo, setDropDownInfo] = useState();
  const [allTitles, setAllTitle] = useState();
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const businessEditPath = "/vendor/profile/edit/business-info";

  useEffect(() => {
    (async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      setUserId(userId);
      setUserToken(token);
      form.setFieldsValue({ email: localStorage.getItem("email") });

      const response = await GetCategoryIndustryService();
      const data = response?.response?.data?.categoriesByIndustry;
      setDropDownInfo(data);

      if (pathname === businessEditPath) {
        fetchVendorDetails(userId);
      }
    })();
  }, []);

  const fetchVendorDetails = async (id) => {
    try {
      setIsLoading(true);
      const response = await GetVendorDetailsService(id);
      if (response?.response?.status === 200) {
        const data = response?.response?.data?.data?.businessInfo;
        form.setFieldsValue({
          business_name: data?.business_name,
          business_registration_number: data?.business_registration_number,
          industry: data?.industry,
          category: data?.category,
          business_details: data?.business_details,
          business_contact: data?.phone,
          email: data?.email,
          country: data?.country,
          city: data?.city,
          postal_code: data?.postal_code,
          address: data?.address,
          associate_email: data?.associate_email,
          image: data?.image ? STORAGE_URL + "/images/" + data?.image?.filename : null,
        });
        setSelectedCountry(data?.country);
        setSelectedCity(data?.city);
        if (data?.image) {
          setPreviewImage(STORAGE_URL + "/images/" + data?.image?.filename);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIndustryChange = (value) => {
    setSelectedIndustry(value);
    setSelectedCategory("");
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const CheckIfValidEmail = (rule, value) => {
    const reg = /^([A-Za-z0-9_\-\+\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{1,9})$/;
    if (value === undefined || value ==='') {
      return Promise.reject(new Error("Email address is required!"));
    }

    if (!String(value).trim().match(reg)) {
      return Promise.reject(new Error("Please enter a Email address!"));
    }

    return Promise.resolve();
  };

  function CheckIfValidAssociateEmail(value, reg) {
    if (value !== null && value !== "" && !String(value).trim().match(reg)) {
      return Promise.reject(new Error("Please enter a valid Email address!"));
    }
    return Promise.resolve();
  }



  const onFinish = async (values) => {
    console.log("onFinish", values);
    try {
      setIsLoading(true);
      values.user_id = userId;
      values.token = userToken;
      if (typeof values.associate_email == 'undefined') {
        values.associate_email = null;
      }
      if (pathname === businessEditPath) {
        const response = await EditBusinessDetailsVendService(values);
        console.log("Response: ", response);
        if (response?.response?.status == 200) {
          router.back();
        }
      } else {
        const response = await BusinessDetailsVendService(values);
        if (response?.response?.status == 200) {
          localStorage.setItem("redirect", "stripe-onboard");
          setSelectedRadio("stripe-onboard");
          router.replace("/vendor/stripe-onboard");
          setError(response?.response?.data.error);
          console.log("associate id====", response?.response?.data.error);
          
        }       
      }
      setIsLoading(false);
    } catch (error) {
      
      console.log("Hi", error?.response?.data?.error);

      const errorMessage = error?.response?.data?.error;

    if (error?.response?.status === 402) {

      form.setFields([{
        name: 'associate_email',
        errors: [errorMessage],
      }]);

      console.log("Associate email error:", errorMessage);
    }
         
      setIsLoading(false);
      
    }
  };

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    setSelectedCity("");
  };

  const handleCityChange = (value) => {
    setSelectedCity(value);
  };

  const beforeUpload = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.src = e.target.result;
        const isJpgOrPng =
          file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
          InfoModal({
            type: "error",
            title: "warning",
            text: "Image must be in JPEG or PNG format.",
          });
        }else{
          image.onload = () => {
            if (image.width >= 500) {
              if (file.size / 1024 / 1024 < 2) {
                setPreviewImage(e.target.result);
                resolve(file);
              } else {
                InfoModal({
                  type: "error",
                  title: "warning",
                  text: "Image size must be less than 2MB.",
                });
              }
            } else {
              InfoModal({
                type: "error",
                title: "warning",
                text: "Image must have a minimum width of 500px.",
              });
              reject();
            }
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };


    const wordCountValidator = (_, value) => {
      const wordCount = value ? value.trim().split(/\s+/).length : 0;
      if (wordCount > 150) {
        return Promise.reject(new Error('The description cannot exceed 150 words'));
      }
      return Promise.resolve();
    };


  const prefixSelector = (
    <Form.Item name="prefix" noStyle initialValue="65">
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
    <>
      <Row>
        <Spin fullscreen spinning={isLoading} />
        <CustomVendorCol span={24} style={{ padding: "70px 0px 0px 40px" }}>
          <CustVendFormHeadTitle>Business information</CustVendFormHeadTitle>
          <br />
          <CustVendFormTitle>
            Please fill in business details{" "}
          </CustVendFormTitle>

          <CustomHomeForm
            form={form}
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            style={{ width: "60%", marginTop: "10px" }}
          >
            <CustomVendorFormRow gutter={[24, 24]}>
              <Col span={12} style={{ maxWidth: "100%" }}>
                <CustVendFormTxt>Business name *</CustVendFormTxt>
                <Form.Item
                  name="business_name"
                  style={{ width: "100%" }}
                  rules={[
                    {
                      required: true,
                      message: "Please enter business name",
                    },
                  ]}
                >
                  <Input placeholder="Your business name" />
                </Form.Item>
              </Col>

              <Col span={12} style={{ maxWidth: "100%" }}>
                <CustVendFormTxt>Business Registration number *</CustVendFormTxt>
                <Form.Item
                  name="business_registration_number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter business registration number",
                    },
                  ]}
                >
                  <Input placeholder="Your business registration number" />
                </Form.Item>
              </Col>
            </CustomVendorFormRow>

            <CustomVendorFormRow gutter={[24, 24]}>
              <Col span={12} style={{ maxWidth: "100%" }}>
                <CustVendFormTxt>Industry *</CustVendFormTxt>
                <Form.Item
                  name="industry"
                  rules={[
                    {
                      required: true,
                      message: "please enter industry",
                    },
                  ]}
                >
                  <Select
                    value={selectedIndustry}
                    onChange={handleIndustryChange}
                    placeholder={"Select Industry"}
                    disabled={pathname === businessEditPath ? true : false}
                  >
                    <Option value="">Select a industry</Option>
                    {dropDownInfo?.map((category) => (
                      <Option
                        key={category?.industry}
                        value={category?.industry}
                      >
                        {category.industry}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12} style={{ maxWidth: "100%" }}>
                <CustVendFormTxt>Category *</CustVendFormTxt>
                <Form.Item
                  name="category"
                  rules={[
                    {
                      required: true,
                      message: "please enter category",
                    },
                  ]}
                >
                  <Select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    placeholder={"Select category"}
                    disabled={pathname === businessEditPath ? true : false}
                  >
                    <Option value="">Select a category</Option>
                    {selectedIndustry &&
                      dropDownInfo
                        ?.find(
                          (category) => category?.industry === selectedIndustry
                        )
                        ?.titles?.split(",")
                        ?.map((title) => (
                          <Option key={title} value={title}>
                            {title}
                          </Option>
                        ))}
                  </Select>
                </Form.Item>
              </Col>
            </CustomVendorFormRow>

            <CustomVendorFormRow>
              <Col span={24}>
                <CustVendFormTxt>
                  Business details (max. 150 words) *
                </CustVendFormTxt>
                {/* <Form.Item
                  name={"business_details"}
                  rules={[
                    {
                      required: true,
                      message: "business details required",
                    },
                  ]}
                >
                  <Input.TextArea
                    showCount
                    allowClear
                    maxLength={150}
                    style={{ width: "100%", height: "100px" }}
                    placeholder="Enter description here"
                    autoSize={{ minRows: 2, maxRows: 6 }}
                  />
                </Form.Item> */}
                    <Form.Item
                        name="business_details"
                        rules={[
                          {
                            required: true,
                            message: 'Business details required',
                          },
                          {
                            validator: wordCountValidator,
                          },
                        ]}
                      >
                        <Input.TextArea
                          showCount
                          allowClear
                          maxLength={1000}  // Optionally set a high character limit to ensure enough space for 150 words
                          style={{ width: '100%', height: '100px' }}
                          placeholder="Enter description here"
                          autoSize={{ minRows: 2, maxRows: 6 }}
                        />
                    </Form.Item>
              </Col>
            </CustomVendorFormRow>

            <CustomVendorFormRow gutter={[24, 24]}>
              <Col span={12} style={{ maxWidth: "100%" }}>
                <CustVendFormTxt>Business contact number *</CustVendFormTxt>
                <Form.Item
                  name="business_contact"
                  rules={[
                    {
                      required: true,
                      pattern: /^[0-9]{8}$/,
                      message: "Please enter valid mobile phone.",
                    },
                  ]}
                >
                  <Input placeholder="Mobile" addonBefore={prefixSelector} />
                </Form.Item>
              </Col>

              <Col span={12} style={{ maxWidth: "100%" }}>
                <CustVendFormTxt>Email *</CustVendFormTxt>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      validator: CheckIfValidEmail,
                    },
                  ]}
                >
                  <Input placeholder="Your email" disabled={true} />
                </Form.Item>
              </Col>
            </CustomVendorFormRow>

            <span
              style={{
                paddingBottom: "8px",
                fontSize: "16px",
                fontWeight: 400,
                textDecoration: "underline",
              }}
            >
              Business address
            </span>

            <CustomVendorFormRow gutter={[24, 24]}>
              <Col span={8} style={{ maxWidth: "100%" }}>
                <CustVendFormTxt>Country *</CustVendFormTxt>
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
              </Col>

              <Col span={8} style={{ maxWidth: "100%" }}>
                <CustVendFormTxt>Location *</CustVendFormTxt>
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
                      <Option key={city} value={city}>
                        {city}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8} style={{ maxWidth: "100%" }}>
                <CustVendFormTxt>Postal code *</CustVendFormTxt>
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
                    onInput={(e) =>
                      (e.target.value = e.target.value.toUpperCase())
                    }
                  />
                </Form.Item>
              </Col>
            </CustomVendorFormRow>

            <CustomVendorFormRow>
              <Col span={24} style={{ maxWidth: "100%" }}>
                <CustVendFormTxt>Address *</CustVendFormTxt>
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
              </Col>
            </CustomVendorFormRow>

            <CustomVendorFormRow>
              <Col
                span={24}
                style={{
                  maxWidth: "100%",
                  border: "1px solid #72959A",
                  borderRadius: "5px",
                  padding: "10px",
                }}
              >
                <span
                  style={{
                    paddingBottom: "8px",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#72959A",
                  }}
                >
                  Vendors mapping
                </span>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#2C2C2C",
                  }}
                >
                  Enter only if you have a Bookablebiz account manager Email id.
                </p>
                <CustVendFormTxt>Enter Account manager ID</CustVendFormTxt>

                <Form.Item
                  name="associate_email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not a valid email address!",
                    },
                  ]}
                >
                  <Input placeholder="Associate email address" />
                </Form.Item>

              </Col>
            </CustomVendorFormRow>

            <Row>
              <Col span={24} style={{ maxWidth: "100%" }}>
                <CustVendFormTxt>Upload business logo *</CustVendFormTxt>
                <CustomIconCol>
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="No Preview"
                      style={{ maxWidth: "100%", height: "100%" }}
                    />
                  ) : (
                    <CameraOutlined
                      style={{ fontSize: "40px", lineHeight: "60px" }}
                    />
                  )}
                </CustomIconCol>
                <CustCamIconTxt>Min. resolution is 300px 300px </CustCamIconTxt>{" "}
                <br />
                <CustCamIconTxt>
                  file format must be .jpg or .png
                </CustCamIconTxt>{" "}
                <br />
                <Form.Item
                  name="image"
                  rules={[
                    {
                      required: true,
                      message: "Please select image!",
                    },
                  ]}
                >
                  <Upload beforeUpload={beforeUpload} showUploadList={false}>
                    <CustomUploadButton icon={<UploadOutlined />}>
                      Upload
                    </CustomUploadButton>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <CustVendFormBtnRow>
              <Form.Item>
                {pathname === businessEditPath ? (
                  <CustomBlkButton type="primary" htmlType="submit">
                    Update{" "}
                  </CustomBlkButton>
                ) : (
                  <CustVendFormButton htmlType="submit">
                    Set up your payment gateway <RightCircleOutlined />
                  </CustVendFormButton>
                )}
              </Form.Item>
            </CustVendFormBtnRow>
          </CustomHomeForm>
        </CustomVendorCol>
      </Row>
    </>
  );
};

export default BusinessDetailsForm;
