import { Button, Row, Col, Form, Select, Input, DatePicker } from "antd";
import {
  CustVendFormTxt,
  CustomVendorFormRow,
  CustomForm,
} from "@/components/vendor-details/styledComponent";
import { CustomCol } from "../../../styledComponent";
import React, { useState, useRef, useEffect } from "react";
import { notification, Spin } from "antd";
import {
  CloseOutlined,
  CloudUploadOutlined,
  LoadingOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { MdOutlineCameraAlt } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import "./style.css";
import InfoModal from "@/lib/commonComponent/ConfirmModal";
import {
  get_locations,
  get_Staff_details,
  save_staff_details,
  Update_Staff_details,
} from "@/Services/vendorTeamManagement.services";
import moment from "moment";
import { STORAGE_URL } from "@/Services/vendorService.services";
import { useRouter } from "next/navigation";
import logoImage from "../../../../../assets/imgs/staff-manager.png";

const AddNewMembers = ({ params }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState("");
  const [photo, setPhoto] = useState("");
  const fileInputHref = useRef(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);
  const [apiData, setApiData] = useState([]);
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [JoiningDate, setJoiningDate] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);


  const parseDateForSubmit = (dateString) => {
    return moment(dateString, "DD-MM-YYYY").format("YYYY-MM-DD");
  };

  const formatDateForDisplay = (dateString) => {
    return moment(dateString, "YYYY-MM-DD").format("DD/MM/YYYY");
  };

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      setUserId(userId);
      setToken(token);
      setLoading(true);
      try {
        const res = await get_locations({ user_id: userId, token });
        setApiData(res.response.data.locations);
      } catch (err) {
        console.error("error", err);
      } finally {
        setLoading(false);
      }

      if (params?.StaffId) {
        const response = await get_Staff_details({
          user_id: userId,
          token,
          staff_id: params?.StaffId,
        });

        const output = response?.response?.data?.staff_member;

        const formattedDate = parseDateForSubmit(output.joining_date);

        form.setFieldsValue({ staff_name: output?.name });
        form.setFieldsValue({ email: output?.email });
        form.setFieldsValue({ role: output?.role });
        form.setFieldsValue({ status: output?.status });
        form.setFieldsValue({
          staff_id: output?.staff_id === undefined ? "" : output?.staff_id,
        });
        form.setFieldsValue({ joining_date: formattedDate });

        setPhoto(output?.photo);
        setSelectedOptions(output?.locations);
        setJoiningDate(moment(output?.joining_date).format("DD/MM/YYYY"));
      }
    }
    fetchData();
  }, [params?.StaffId]);

  const handleOptionClick = (option) => {
    let updatedSelectedOptions;
    if (selectedOptions.some((selected) => selected.id === option.id)) {
      updatedSelectedOptions = selectedOptions.filter(
        (selected) => selected.id !== option.id
      );
    } else {
      updatedSelectedOptions = [...selectedOptions, option];
    }
    setSelectedOptions(updatedSelectedOptions);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const validatePassword = (rule, value, callback) => {
    const passwordValidationRegex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

    if (!value || value.length < 8 || !passwordValidationRegex.test(value)) {
      callback(
        "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long."
      );
    } else {
      callback();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  const handelInputField = (changedValues, allValues) => {
    form.setFieldsValue({
      staff_name: allValues?.staff_name,
      email: allValues?.email,
      role: allValues?.role,
      status: allValues?.status,
      staff_id: allValues?.staff_id,
    });
  };

  const handleImageChange1 = (e) => {
    const file = e.target.files[0];
    console.log("file----", file);
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
          if (image.width >= 200) {
            if (file.size / 1024 / 1024 < 2) {
              console.log("file====>>>", file);
              setImage(file);
              setPreview(e.target.result);
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
              text: "Image must have a minimum width of 200px.",
            });
            reject();
          }
        };
      };
      reader.readAsDataURL(file);
    });
  };

  console.log("form===>", form.getFieldValue());
  console.log("logoImage", logoImage);

  const handelClick = () => {
    fileInputHref.current.click();
  };

  const handleFormSubmit = async () => {
    try {
      const formData = form.getFieldsValue();

      if (formData.staff_name === undefined) {
        formData.staff_name = "";
      }

      const locationIdsObject = selectedOptions.reduce((acc, option, index) => {
        acc[`location_ids[${index}]`] = option.id;
        return acc;
      }, {});

      const payload = {
        ...formData,
        user_id: userId,
        ...locationIdsObject,
        token,
        photo: image,
      };
      console.log("payload===>", payload);
      if (params?.StaffId) {
        try {
          const res = await Update_Staff_details({
            ...payload,
            staff_id: params?.StaffId,
          });
          router.push("/vendor/team-management/team-members");
        } catch (err) {
          console.log("error==>>", err.response.data.error);
          setError(err.response.data.error);
        }
      } else {
        try {
          await save_staff_details(payload);
          form.resetFields();
          router.push("/vendor/team-management/team-members");
        } catch (err) {
          setError(err.response.data.error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <Row style={{ padding: "1rem", gap: "2rem" }}>
          <Col xl={24} style={{ width: "100%" }}>
            <Form form={form} onValuesChange={handelInputField}>
              <Row>
                <div
                  style={{
                    border: "1px solid #72959A",
                    borderRadius: "10px",
                    height: "100%",
                    width: "100%",
                    padding: "20px ",
                  }}
                >
                  <CustomVendorFormRow
                    gutter={[24, 24]}
                    style={{ margin: "1rem 0" }}
                    className="teammember-uploadpitcure"
                  >
                    <CustomCol
                      
                      lg={12}
                      md={18}
                      sm={24}
                      span={12}
                    >
                      <div
                        style={{
                          border: "1px solid #72959A",
                          borderRadius: "10px",
                          height: "100%",
                          width: "100%",
                          padding: "1rem",
                        }}
                      >
                        <Row
                          style={{
                            gap: "15px",
                            display: "Flex",
                            alignItems: "center",
                          }}
                        >
                          <Col span={7}>
                            {photo === "" ? (
                              <img
                                src={logoImage.src}
                                alt=""
                                style={{ height: "145px", width: "100%" }}
                              />
                            ) : (
                              <img
                                src={`${
                                  STORAGE_URL + "/vendorstaff/" + `${photo}`
                                }`}
                                alt=""
                                style={{
                                  height: "120px",
                                  width: "100%",
                                  borderRadius: "10px",
                                }}
                              />
                            )}
                            {/* <img
                            src={`${
                              STORAGE_URL + "/vendorstaff/" + `${photo}`
                            }`}
                            alt=""
                            style={{ height: "120px", width: "100%" }}
                          /> */}
                          </Col>
                          <Col span={5}>
                            <div
                              style={{
                                border: "1px solid rgb(182, 177, 177)",
                                padding: "10px",
                                display: "flex",
                                justifyContent: "center",
                                borderRadius: "10px",
                                margin: "0 10px",
                              }}
                            >
                              {preview ? (
                                <img
                                  src={preview}
                                  alt="preview"
                                  style={{
                                    maxHeight: "100%",
                                    maxWidth: "100%",
                                  }}
                                />
                              ) : (
                                <MdOutlineCameraAlt
                                  size={50}
                                  style={{ color: "gray" }}
                                />
                              )}
                            </div>
                            <span
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "15px",
                              }}
                            >
                              <button
                                type="button"
                                style={{
                                  color: "red",
                                  border: "1px solid red",
                                  borderRadius: "5px",
                                  padding: "5px",
                                  cursor: "pointer",
                                }}
                                onClick={handelClick}
                              >
                                Upload <FiUpload />{" "}
                              </button>
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              ref={fileInputHref}
                              onChange={handleImageChange1}
                              style={{ display: "none" }}
                            />
                          </Col>

                          <Col span={10}>
                            <div>
                              <h3>Upload Profile Picture</h3>
                              <p>Min. resolution is 300px X 300px</p>
                              <p>file format must be .jpg or .png</p>
                            </div>
                            {error.photo && (
                              <span style={{ color: "red" }}>
                                {error.photo[0]}
                              </span>
                            )}
                          </Col>
                        </Row>
                      </div>
                    </CustomCol>
                  </CustomVendorFormRow>
                  <CustomVendorFormRow
                    gutter={[24, 2]}
                    style={{ paddingLeft: "10px" }}
                  >
                    <CustomCol lg={5} md={7} sm={12} xsm={12} span={5}>
                      <CustVendFormTxt>Name</CustVendFormTxt>
                      <Form.Item
                        name="staff_name"
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Please enter your Name",
                          },
                        ]}
                      >
                        <Input placeholder="Name" />
                        {error.staff_name && (
                          <span style={{ color: "red" }}>
                            {error.staff_name[0]}
                          </span>
                        )}
                      </Form.Item>
                    </CustomCol>

                    <CustomCol lg={5} md={7} sm={12} xsm={12} span={5}>
                      <CustVendFormTxt>Email ID</CustVendFormTxt>
                      <Form.Item
                        name="email"
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Please enter your email",
                          },
                          {
                            type: "email",
                            message: "please enter valid email",
                          },
                          {
                            validator: (_, value) =>
                              value && value.includes("@")
                                ? Promise.resolve()
                                : Promise.reject(
                                    'Email must contain an "@" symbol'
                                  ),
                          },
                        ]}
                      >
                        <Input placeholder="Email" />
                        {error.email && (
                          <span style={{ color: "red" }}>{error.email[0]}</span>
                        )}
                      </Form.Item>
                    </CustomCol>

                    <CustomCol lg={5} md={7} sm={12} xsm={12} span={5}>
                      <CustVendFormTxt>Role</CustVendFormTxt>
                      <Form.Item
                        name="role"
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Choose role",
                          },
                        ]}
                      >
                        <Select placeholder="Choose role">
                          <Option value={"1"}>Manager</Option>
                          <Option value={"2"}>Staff</Option>
                        </Select>
                        {error.role && (
                          <span style={{ color: "red" }}>{error.role[0]}</span>
                        )}
                      </Form.Item>
                    </CustomCol>

                    <CustomCol lg={5} md={7} sm={12} xsm={12} span={5}>
                      <CustVendFormTxt>Joining Date</CustVendFormTxt>
                      <Form.Item
                        name="joining_date"
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Please enter your joining date",
                          },
                        ]}
                      >
                        <Input
                          type="date"
                          placeholder="Choose Date"
                          style={{ width: "100%" }}
                          value={
                            form.getFieldValue("joining_date")
                              ? formatDateForDisplay(
                                  form.getFieldValue("joining_date")
                                )
                              : ""
                          }
                          onChange={(e) =>
                            form.setFieldsValue({
                              joining_date: e.target.value,
                            })
                          }
                        />
                        {error.joining_date && (
                          <span style={{ color: "red" }}>
                            {error.joining_date[0]}
                          </span>
                        )}
                      </Form.Item>
                    </CustomCol>

                    <CustomCol lg={5} md={7} sm={12} xsm={12} span={5}>
                      <CustVendFormTxt>Status</CustVendFormTxt>
                      <Form.Item
                        name="status"
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Please select status",
                          },
                        ]}
                      >
                        <Select placeholder="Choose Status">
                          <Option value={1}>Active</Option>
                          <Option value={0}>Inactive</Option>
                        </Select>
                      </Form.Item>
                    </CustomCol>

                    <CustomCol lg={5} md={7} sm={12} xsm={12}>
                      <CustVendFormTxt>Staff-ID</CustVendFormTxt>
                      <Form.Item
                        name="staff_id"
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Please enter your staff id",
                          },
                        ]}
                      >
                        <Input placeholder="Staff-id" />
                      </Form.Item>
                    </CustomCol>

                    <CustomCol lg={5} md={7} sm={12} xsm={12}>
                      <CustVendFormTxt>
                        {" "}
                        {params?.StaffId
                          ? "Change Password for Staff Login"
                          : "Enter for Password Login"}{" "}
                      </CustVendFormTxt>
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your password!",
                          },
                          {
                            validator: validatePassword,
                          },
                        ]}
                        hasFeedback
                      >
                        <Input.Password
                          placeholder={
                            params?.StaffId
                              ? "change password"
                              : "create password"
                          }
                        />
                      </Form.Item>
                    </CustomCol>
                  </CustomVendorFormRow>
                </div>
              </Row>
            </Form>
          </Col>

          <Col xl={24} style={{ width: "100%" }}>
            <Row>
              <div
                style={{
                  border: "1px solid #72959A",
                  borderRadius: "10px",
                  height: "100%",
                  width: "100%",
                  padding: "1rem",
                }}
              >
                <h3 style={{ color: "#72959A", padding: "5px" }}>
                  Member Locations
                </h3>
                <p style={{ padding: "5px" }}>
                  You Can choose one or more locations. Member Will have access
                  to Chosen location.
                </p>
                <p style={{ padding: "5px" }}>
                  There given permissions will restrict to below selected
                  locations only.
                </p>

                <div className="multi-select-container" ref={containerRef}>
                  <label>Select Multiple</label>
                  <div className="multi-select">
                    <input
                      type="text"
                      readOnly
                      value={selectedOptions
                        .map((option) => option.name)
                        .join(", ")}
                      onClick={toggleDropdown}
                      style={{ minHeight: "2rem", width: "90%" }}
                      placeholder="  Select options..."
                    />
                    {showDropdown && (
                      <div className="options-dropdown">
                        {apiData.map((option) => (
                          <div
                            key={option.id}
                            className={`option ${
                              selectedOptions.includes(
                                (selected) => selected.id === option.id
                              )
                                ? "selected"
                                : ""
                            }`}
                            onClick={() => handleOptionClick(option)}
                          >
                            {option.name}
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="selected-options">
                      {selectedOptions.map((option) => (
                        <span key={option.id} className="selected-option">
                          {option.name}
                          <button
                            type="button"
                            className="remove-option"
                            onClick={() => handleOptionClick(option)}
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                      {error.location_ids && (
                        <span style={{ color: "red" }}>
                          {error.location_ids[0]}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Row>
          </Col>

          <div style={{ margin: "1rem" }}>
            <Button
              style={{
                backgroundColor: "black",
                color: "white",
                marginRight: "2rem",
              }}
              onClick={handleFormSubmit}
            >
              {params?.StaffId ? "Update" : "Save"}
            </Button>
            <Button
              onClick={() =>
                router.push("/vendor/team-management/team-members")
              }
            >
              Cancel
            </Button>
          </div>
        </Row>
      )}
    </>
  );
};

export default AddNewMembers;
