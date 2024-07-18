import {
  CustCamIconTxt,
  CustVendFormBtnRow,
  CustVendFormTxt,
  CustomIconCol,
  CustomUploadButton,
  CustomVendorFormRow,
} from "@/components/vendor-details/styledComponent";
import { Fragment, useState, useEffect } from "react";
import {
  CustomButton,
  CustomForm,
  RedioRow,
  CustomCol,
} from "./styledComponent";
import {
  Row,
  Form,
  Input,
  Select,
  TimePicker,
  Radio,
  Upload,
  Col,
  Button,
  Avatar,
  Spin,
} from "antd";
import { CustomGreyText, CustomTitle } from "../../styledComponent";
import dayjs from "dayjs";
import {
  ArrowLeftOutlined,
  CameraOutlined,
  RightOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  AddResourceVendService,
  GetVendorResourceByIdService,
  UpdateResourceVendService,
  GetResourceVendService,
} from "@/Services/vendorResource.services";
import { GetVendorLocationService, } from "@/Services/vendorLocation.services";
import { useRouter, useParams } from "next/navigation";
import { STORAGE_URL } from "@/Services/vendorService.services";
import InfoModal from "@/lib/commonComponent/ConfirmModal";


const format = "HH:mm";

const ResourceForm = ({ params }) => {
  const router = useRouter();
  // const params = useParams()
  const [form] = Form.useForm();
  const { Option } = Select;
  const [selectedValue, setSelectedValue] = useState();
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [userId, setUserId] = useState();
  const [locationDetails, setLocationDetails] = useState();
  const [userToken, setUserToken] = useState();
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const user_Id = localStorage.getItem("userId");
      const user_token = localStorage.getItem("token");
      setUserId(user_Id);
      setUserToken(user_token);
      // fetchVendorLocations(user_Id);

      if (params?.resourceId) {
        const response = await GetVendorResourceByIdService(
          user_Id,
          params?.resourceId
        );
        const output = response?.response?.data?.data?.resourcesInfo?.[0];
        console.log("GetVendorResourceByIdService,,,,,,,,,,,,", output);
        form.setFieldsValue({ title: output?.title });
        form.setFieldsValue({ first_name: output?.first_name });
        form.setFieldsValue({ middle_name: output?.middle_name });
        form.setFieldsValue({ last_name: output?.last_name });
        form.setFieldsValue({ phone: output?.phone });
        form.setFieldsValue({ email: output?.email });
        form.setFieldsValue({ designation: output?.designation });
        form.setFieldsValue({ department: output?.department });
        form.setFieldsValue({ experience: Number(output?.experience) });
        form.setFieldsValue({ bio: output?.bio });
        form.setFieldsValue({ location: output?.location_name });

        if (output?.image) {
          setPreviewImage(STORAGE_URL + "/images/" + output?.image?.filename);
          form.setFieldsValue({
            image: STORAGE_URL + "/images/" + output?.image?.filename,
          });
        }

        if (output?.hrsType == "office") {
          form.setFieldsValue({ radioGroup: "office" });
          form.setFieldsValue({
            start_time_office: dayjs(output?.start_time, format),
          });
          form.setFieldsValue({
            end_time_office: dayjs(output?.end_time, format),
          });
          setSelectedValue("office");
        } else {
          form.setFieldsValue({ radioGroup: "business" });
        }

        fetchVendorLocations(user_Id, Number(output?.location_id));
      } else {
        fetchVendorLocations(user_Id, "");
      }
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      form.setFieldsValue({
        start_time: dayjs(selectedLocation?.start_time, format),
      });
      form.setFieldsValue({
        end_time: dayjs(selectedLocation?.end_time, format),
      });
    }
  }, [selectedLocation, selectedValue]);

  const fetchVendorLocations = async (id, locId) => {
    try {
      setIsLoading(true);
      const response = await GetVendorLocationService(id);
      if (response?.response?.status === 200) {
        const data = response?.response?.data?.data?.userLocations;

        if (data.length > 0) {
          setLocationDetails(data);
          console.log("locationDetails======>>>",data)
        }
        if (locId) {
          const res = data.find((item) => item.id === locId);

          form.setFieldsValue({ start_time: dayjs(res?.start_time, format) });
          form.setFieldsValue({ end_time: dayjs(res?.end_time, format) });
          setSelectedLocation(res);
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      values.user_id = userId;
      values.token = userToken;
      values.hrsType = selectedValue;

      console.log("values==>", values);

      if (selectedValue === "office") {
        values.start_time = values?.start_time_office?.format(format);
        values.end_time = values?.end_time_office?.format(format);
      } else {
        values.start_time = values?.start_time.format(format);
        values.end_time = values?.end_time.format(format);
      }
      const a = await handleResources();
      console.log("planInfo===>",a)
      if (a) {
        values.location_id = selectedLocation?.id;
      } else {
        InfoModal({title:"Information",text:`Already We Have Enough Resouece For This Location. Please choose Another Location`,type:"error"})
      }

      values.middle_name = values?.middle_name ? values.middle_name : "";

      if (params?.resourceId) {
        const response = await UpdateResourceVendService(
          params?.resourceId,
          values
        );
        if (response?.response?.status == 200) {
          handleBack();
        }
      } else {
        if (a) {
          const response = await AddResourceVendService(values);
          if (response?.response?.status == 200) {
            handleBack();
          }
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const CheckIfValidEmail = (rule, value) => {
    const reg = /^([A-Za-z0-9_\-\+\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{1,9})$/;
    if (value === undefined || value === "") {
      return Promise.reject(new Error("Email address is required!"));
    }
    if (!String(value).trim().match(reg)) {
      return Promise.reject(new Error("Please enter a Email address!"));
    }
    return Promise.resolve();
  };

  const handleCountryChange = (value) => {
    const selected =
      locationDetails && locationDetails.find((item) => item.id === value);
    selected ? setSelectedLocation(selected) : null;
  };

  const handleResources = async () => {
    const response = await GetResourceVendService(userId);
    const resourceData = response.response.data.data.resourcesInfo;
    const planInfo = response.response.data.data.planInfo.resource_allowed_per_location;

    console.log("resourceData===>shfghds==>", resourceData);
    let count = 0;
    for (let item of resourceData) {
      if (item.location_id === selectedLocation.id) {
        count = count + 1;
      }
    }
    if(count<planInfo){
        return true
    }else{
        return false
    }
    
  };

  const beforeUpload = (file) => {
    console.log("file====>>>===>>>",file)
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
        }
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
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);
  };

  var isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
  dayjs.extend(isSameOrBefore);

  var isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
  dayjs.extend(isSameOrAfter);

  const validateStartTime = (_, value) => {
    const StartTimeBus = form.getFieldValue(`start_time`);
    const EndTimeBus = form.getFieldValue(`end_time`);

    if (EndTimeBus && value && dayjs(value).isSameOrAfter(dayjs(EndTimeBus))) {
      return Promise.reject("Start time must be before end time");
    }

    if (StartTimeBus && value && dayjs(value).isBefore(dayjs(StartTimeBus))) {
      return Promise.reject(
        "Start time must be same or after business start time"
      );
    }

    return Promise.resolve();
  };

  const validateEndTime = (_, value) => {
    const StartTimeOffice = form.getFieldValue(`start_time_office`);
    const EndTimeBus = form.getFieldValue(`end_time`);

    if (
      EndTimeBus &&
      value &&
      dayjs(value).isAfter(dayjs(EndTimeBus.add(1, "second")))
    ) {
      return Promise.reject(
        "Custom End time must be same or before Business End time"
      );
    }

    if (EndTimeBus && value && dayjs(value).isBefore(dayjs(StartTimeOffice))) {
      return Promise.reject("Custom End time must be After start time");
    }

    return Promise.resolve();
  };

  const handleBack = () => {
    router.back();
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle initialValue="65">
      <Select>
        <Option value="65">+65</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Fragment>
      <Row style={{ width: "100%" }}>
        <Spin fullscreen spinning={isLoading} />
        <Col
          span={24}
          style={{ padding: params?.resourceId ? "0 20px 20px" : "0 20px" }}
        >
          <Row>
            <Col span={24}>
              You are here:
              <span
                onClick={handleBack}
                style={{ color: "#EA8933", cursor: "pointer" }}
              >
                {" "}
                My Resources{" "}
              </span>
              <RightOutlined style={{ color: "#EA8933" }} />
              <span style={{ color: "#EA8933" }}>
                {params?.resourceId ? "Update Resource" : "Add Resource"}
              </span>
            </Col>
          </Row>
          <CustomTitle>
            {params?.resourceId ? "Update Resources" : "Add Resources"}
          </CustomTitle>
          <CustomGreyText>Please fill in resource details </CustomGreyText>

          <CustomForm
            name="basic"
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            style={{ width: "100%", marginTop: "10px" }}
          >
            <CustomVendorFormRow gutter={[24, 24]}>
              <CustomCol span={2}>
                <CustVendFormTxt>Title</CustVendFormTxt>
                <Form.Item
                  name="title"
                  style={{ width: "100%" }}
                  rules={[
                    {
                      required: true,
                      message: "Please enter title",
                    },
                  ]}
                >
                  <Select placeholder="Select Title" style={{ width: "100%" }}>
                    <Option value="Mr">Mr.</Option>
                    <Option value="Mrs">Mrs.</Option>
                    <Option value="Ms">Ms.</Option>
                    <Option value="Dr">Dr.</Option>
                    <Option value="Prof">Prof.</Option>
                    <Option value="Assoc Prof">Assoc. Prof.</Option>
                    <Option value="none">Other</Option>
                  </Select>
                </Form.Item>
              </CustomCol>

              <CustomCol span={8}>
                <CustVendFormTxt>First name</CustVendFormTxt>
                <Form.Item
                  name="first_name"
                  style={{ width: "100%" }}
                  rules={[
                    {
                      required: true,
                      message: "Please enter first name",
                    },
                  ]}
                >
                  <Input placeholder="first name" />
                </Form.Item>
              </CustomCol>

              <CustomCol span={6}>
                <CustVendFormTxt>Middle name</CustVendFormTxt>
                <Form.Item name="middle_name" style={{ width: "100%" }}>
                  <Input placeholder="middle name" />
                </Form.Item>
              </CustomCol>

              <CustomCol span={8}>
                <CustVendFormTxt>Last name</CustVendFormTxt>
                <Form.Item
                  name="last_name"
                  style={{ width: "100%" }}
                  rules={[
                    {
                      required: true,
                      message: "Please enter last name",
                    },
                  ]}
                >
                  <Input placeholder="last name" />
                </Form.Item>
              </CustomCol>
              
            </CustomVendorFormRow>

            <CustomVendorFormRow gutter={[24, 24]}>
              <CustomCol span={8}>
                <CustVendFormTxt>Email</CustVendFormTxt>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      validator: CheckIfValidEmail,
                    },
                  ]}
                >
                  <Input placeholder="Resource email" />
                </Form.Item>
              </CustomCol>

              <CustomCol span={8}>
                <CustVendFormTxt>Mobile number</CustVendFormTxt>
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please enter mobile number",
                    },
                    {
                      max: 8,
                      message: "Please enter valid mobile.",
                    },
                    {
                      pattern: /^[0-9]{8}$/,
                      message: "Please enter valid mobile.",
                    },
                  ]}
                >
                  <Input placeholder="Mobile" addonBefore={prefixSelector} />
                </Form.Item>
              </CustomCol>

              <CustomCol span={8}>
                <CustVendFormTxt>Designation</CustVendFormTxt>
                <Form.Item
                  name="designation"
                  style={{ width: "100%" }}
                  rules={[
                    {
                      required: true,
                      message: "Please enter designation",
                    },
                  ]}
                >
                  <Input placeholder="Sr. Dentist" />
                </Form.Item>
              </CustomCol>
            </CustomVendorFormRow>

            <CustomVendorFormRow gutter={[24, 24]}>
              <CustomCol span={8}>
                <CustVendFormTxt>Department</CustVendFormTxt>
                <Form.Item
                  name="department"
                  style={{ width: "100%" }}
                  rules={[
                    {
                      required: true,
                      message: "Please enter your department",
                    },
                  ]}
                >
                  <Input placeholder="Your department" />
                </Form.Item>
              </CustomCol>

              <CustomCol span={8}>
                <CustVendFormTxt>Experience</CustVendFormTxt>
                <Form.Item
                  name="experience"
                  rules={[
                    {
                      required: true,
                      message: "Please enter experience",
                    },
                    {
                      pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
                      message:
                        "Please enter a valid experience in number; Integer or Decimal",
                    },
                    // {
                    //     max: 2,
                    //     message: 'Please enter valid number upto 2 digits.',
                    // },
                  ]}
                >
                  <Input placeholder="Like 3.5 years" />
                </Form.Item>
              </CustomCol>

              <CustomCol span={8}>
                {/* <CustVendFormTxt>Option</CustVendFormTxt>
                                <Form.Item
                                name="option"
                                style={{width:'100%'}}
                                rules={[
                                {
                                required: true,
                                message: 'Please enter option',
                                },
                                ]}
                                >
                                <Input placeholder='Your option' />
                                </Form.Item> */}
              </CustomCol>
            </CustomVendorFormRow>

            <CustomVendorFormRow>
              <CustomCol span={24}>
                <CustVendFormTxt>Bio</CustVendFormTxt>
                <Form.Item
                  name={"bio"}
                  rules={[
                    {
                      required: true,
                      message: "bio must be required",
                    },
                  ]}
                >
                  <Input.TextArea
                    allowClear
                    maxLength={500}
                    style={{ width: "100%", height: "100px" }}
                    placeholder="Enter bio here..."
                    autoSize={{ minRows: 2, maxRows: 6 }}
                  />
                </Form.Item>
              </CustomCol>
            </CustomVendorFormRow>

            <CustomCol span={18}>
              <CustomVendorFormRow gutter={[24, 24]}>
                <CustomCol span={24}>
                  <CustVendFormTxt>Assign to a location</CustVendFormTxt>
                  <Form.Item
                    name="location"
                    rules={[
                      {
                        required: true,
                        message: "Please select location!",
                      },
                    ]}
                  >
                    <Select
                      value={selectedLocation}
                      onChange={handleCountryChange}
                      placeholder="Select location"
                    >
                      <Option value="">Select a location</Option>
                      {locationDetails &&
                          locationDetails
                            .filter(location => location.status === 1)
                            .map(location => (
                              <Option key={location?.id} value={location?.id}>
                                {location?.name}
                              </Option>
                            ))}
                    </Select>
                  </Form.Item>
                </CustomCol>
              </CustomVendorFormRow>

              <CustomVendorFormRow>
                <Form.Item
                  name="radioGroup"
                  rules={[
                    {
                      required: true,
                      message: "Please select hours type",
                    },
                  ]}
                >
                  <Radio.Group
                    onChange={handleRadioChange}
                    value={selectedValue}
                    style={{ width: "100%", paddingBottom: "10px"}}
                  >
                    {/* <style>{`
                      .ant-radio-inner{
                        border='2px!important';
                        position:relative;
                      }
                      .ant-radio-inner::after {
                        position:absolute;
                        width: 10px !important; 
                        height: 10px !important; 
                        background-color: black !important; 
                      }
                    `}
                    </style> */}
                    <RedioRow style={{ display: "flex" }}>
                   
                      <CustomCol  span={11} style={{marginRight:'10px'}}>
                        <Radio  value={"business"} >Business hours</Radio>
                        {/* <label>
                            <input
                              type="radio"
                              value="business"
                              checked={selectedValue === 'business'}
                              onChange={handleRadioChange}
                              style={{marginRight:'2%'}}

                            />

                            Business hours
                          </label> */}
                        <Row gutter={[24, 24]} style={{marginTop:'10px'}}>
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
                              <TimePicker format={format} disabled={true} />
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
                              ]}
                            >
                              <TimePicker format={format} disabled={true} />
                            </Form.Item>
                          </CustomCol>
                        </Row>
                      </CustomCol>
                      <CustomCol span={11} style={{marginLeft:'10px'}} >
                      <Radio value={"office"}>Office hours</Radio>
                       {/* <label>
                          <input
                            type="radio"
                            value="office"
                            checked={selectedValue === 'office'}
                            onChange={handleRadioChange}
                            style={{marginRight:'2%'}}

                          />
                          Office hours
                        </label> */}
                        <Row gutter={[24, 24]} style={{marginTop:'10px'}}>
                          <CustomCol span={12}>
                            <CustVendFormTxt>Start time</CustVendFormTxt>
                            <Form.Item
                              name={"start_time_office"}
                              rules={[
                                {
                                  required:
                                    selectedValue === "office" ? true : false,
                                  message: "Start time required",
                                },
                                {
                                  validator: validateStartTime,
                                },
                              ]}
                            >
                              <TimePicker
                                format={format}
                                disabled={
                                  selectedValue === "office" ? false : true
                                }
                              />
                            </Form.Item>
                          </CustomCol>

                          <CustomCol span={12}>
                            <CustVendFormTxt>End time</CustVendFormTxt>
                            <Form.Item
                              name={"end_time_office"}
                              rules={[
                                {
                                  required:
                                    selectedValue === "office" ? true : false,
                                  message: "End time required",
                                },
                                {
                                  validator: validateEndTime,
                                },
                              ]}
                            >
                              <TimePicker
                                format={format}
                                disabled={
                                  selectedValue === "office" ? false : true
                                }
                              />
                            </Form.Item>
                          </CustomCol>
                        </Row>
                      </CustomCol>
                    </RedioRow>
                  </Radio.Group>
                </Form.Item>
              </CustomVendorFormRow>
            </CustomCol>

            <Row>
              <CustomCol span={24}>
                <CustVendFormTxt>Upload Image</CustVendFormTxt>
                <CustomIconCol>
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      style={{ maxWidth: "100%", height: "100%" }}
                    />
                  ) : (
                    <CameraOutlined
                      style={{ fontSize: "40px", lineHeight: "60px" }}
                    />
                  )}
                </CustomIconCol>
                <CustCamIconTxt>
                  Min. resolution is 500px x 500px{" "}
                </CustCamIconTxt>{" "}
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
                    <CustomUploadButton
                      style={{ border: "none", color: "#ED510C" }}
                      icon={<UploadOutlined />}
                    >
                      Upload
                    </CustomUploadButton>
                  </Upload>
                </Form.Item>
              </CustomCol>
            </Row>

            <Row>
              {/* <Button onClick={handleCancel} style={{  backgroundColor:'transparent', color:'#000', border:'1px solid #000', fontWeight:600, marginRight:'20px' }}> Cancel </Button> */}
              <CustomButton
                type="primary"
                htmlType="submit"
                loading={isLoading}
              >
                {params?.resourceId ? "Update" : "Save"}
              </CustomButton>
            </Row>
          </CustomForm>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ResourceForm;
