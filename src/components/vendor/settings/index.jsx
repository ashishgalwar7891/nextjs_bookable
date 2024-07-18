import { Row, Col, Form, Radio, Checkbox,Spin } from "antd";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { BodyDemi, H4, H5 } from "@/styles/styledComponent";
import {
  vendorSettingsService,
  getVendorSettingsService,
  Remove_Banner_Image,
  Add_Update_Logo_Image,
  Add_Banner_Image,
} from "@/Services/vendor.settings";
import yellow_split from "../../../../src/assets/imgs/settings_yellow.svg";
import green_split from "../../../../src/assets/imgs/settings-green.svg";
import red_split from "../../../../src/assets/imgs/settings-red.svg";
import blue_split from "../../../../src/assets/imgs/settings-blue.svg";
import yel_split_no_prof from "../../../../src/assets/imgs/split-yellow-without-professional.svg";
import yellow_full_scr from "../../../../src/assets/imgs/settling-full-scr.svg";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { IoCloudUploadOutline } from "react-icons/io5";
import {
  Button,
  Dropdown,
  message,
  Space,
  Tooltip,
  Menu,
  Carousel,
  ColorPicker,
} from "antd";
import { STORAGE_URL } from "@/Services/vendorService.services";
import { CustomButton } from "../EditService/styledComponent";
import style from "./../../../styles/style.module.css";
import { TbAward } from "react-icons/tb";
import { LuMapPin } from "react-icons/lu";
// import { PiLineVertical } from "react-icons/pi";
import { FiUpload } from "react-icons/fi";
import { IoStar, IoCall } from "react-icons/io5";
import { FaRegHeart, FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import styles from "./style.css";
import { MdOutlineCameraAlt } from "react-icons/md";
import InfoModal from "@/lib/commonComponent/ConfirmModal";
import { GetVendorAllDetailsByIdService } from "@/Services/frontStore.service";
import { stubTrue } from "lodash";

const contentStyle = {
  height: "160px",
  color: "#fff",
  width: "70%",
  lineHeight: "100px",
  textAlign: "center",
};
const VendorSettings = (props) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [userDetails, setUserDetails] = useState({});
  const [screenType, setScreenType] = useState();
  const [showProfessionals, setShowProfessionals] = useState(0);
  const [toggleValue, setToggleValue] = useState(1);
  const [hours, setHours] = useState(0);
  const [percentage, setPercentage] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  // const [hoursValue, setHoursValue] = useState(12);
  // const [percentageValue, setPercentageValue] = useState(90);
  const [apiData, setApiData] = useState('');
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [screenSize, setScreenSize] = useState("split_screen");
  const [storeFrontSetting, setStoreFrontSetting] = useState(null);
  const maxSelection = 5;
  const [color, setColor] = useState("#EA8933");



  const handleColorChange = (newColor) => {
    console.log("85...", newColor.toHexString());
    setColor(newColor.toHexString());
    setApiData({ ...apiData, theme_color: newColor.toHexString() });
  };

  useEffect(() => {
    setIsLoading(true);
    const userId = localStorage.getItem("userId");
    const userToken = localStorage.getItem("token");
    setUserDetails({ userId: userId, token: userToken });

    getVendorSettingsService({ token: userToken, user_id: userId })
      .then((res) => {
        setColor(res?.response?.data?.store_front_setting_details?.theme_color);

        setIsLoading(false);
        console.log("getVendorSettingsService===>",typeof(res.response.data.store_front_setting_details))
        const dataa =
          res.response.data.store_front_setting_details.cancellation_details;
        const toggle =
          res.response.data.store_front_setting_details.cancellation_policy;

          setStoreFrontSetting(res.response.data.store_front_setting_details);

        const newHours = items1.findIndex(
          (item) => item.value === Number(dataa.substring(28, 30))
        );
        const newPercentage = items2.findIndex(
          (item) => item.value === Number(dataa.substring(49, 51))
        );

        if (toggle === "no_cancellation") {
          setToggleValue(2);
        } else if (toggle === "service_cancellation") {
          setToggleValue(1);
        }

        setHours(newHours);
        setPercentage(newPercentage);
      })
      .catch((err) => {
        console.log(err);
      });

    GetVendorAllDetailsByIdService(userId)
      .then((res) => {
        if (res !== null || res !== undefined) {
          setApiData(res?.response?.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  // useEffect(() => {
  //   console.log("Color updated1:", color);
  // }, [color]);


  var bgColor = useMemo(
    () => (typeof color === "string" ? color : '#EA8933'),
    [color]
  );
  
  if(storeFrontSetting !==null){
  
  var btnStyle = {
    backgroundColor: color,
    width: "75px",
  };
  
  var bannerStyle = {
    backgroundColor: color,
    paddingBottom: "20px",
    borderRadius: "10px",
  };

}


  console.log("apiData====>>", apiData);

  function convertStringToArray(jsonString) {
    try {
      const array = JSON.parse(jsonString);
      if (Array.isArray(array)) {
        return array;
      } else {
        throw new Error("Parsed value is not an array");
      }
    } catch (error) {
      console.error("Error converting string to array:", error.message);
      return null;
    }
  }

  const BannerImageArray = convertStringToArray(apiData?.banner_image);


  const handleOptionChange = (e) => {
    console.log("handleOptionChange", e.target.value);
    setScreenSize(e.target.value);
    setApiData({ ...apiData, banner_style: e.target.value });
  };


  const handleCheckboxChange = (e) => {
    setShowProfessionals(e.target.checked);
    setApiData({ ...apiData, show_professionals: Number(e.target.checked) });
  };

  console.log("preview====>", preview);

  const circleStyle = {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    cursor: "pointer",
    border: "2px solid transparent",
  };

  const handleSaveSubmit = async () => {
    console.log("Hello");

    const dataObj = {
      logo: preview,
      banner_images: previews,
      token: userDetails?.token,
      user_id: userDetails.userId,
      banner_style: screenSize,
      theme_color: bgColor,
      show_professionals: Number(showProfessionals),
    };
    console.log("handle Submit Save Button dataObj===>", dataObj, toggleValue);

    if (toggleValue == 1) {
      vendorSettingsService({
        ...dataObj,
        cancellation_policy: "service_cancellation",
        free_cancellation_until: String(items1[hours].value),
        refund_policy: String(items2[percentage].value),
      });
    } else if (toggleValue == 2) {
      vendorSettingsService({
        ...dataObj,
        cancellation_policy: "no_cancellation",
      });
    } else {
      alert("Please Select chackbox");
    }
  };

  const handleMenuClick1 = (e) => {
    console.log("handleMenuClick", e);
    setHours(e.key);
    // setHoursValue(items1[e.key].value);
  };

  const handleMenuClick2 = (e) => {
    console.log("handleMenuClick1", e);
    setPercentage(e.key);
    // setPercentageValue(items2[e.key].value);
  };


  const handleScreenSize = (e) => {
    setScreenSize(e);
    setApiData({ ...apiData, banner_style: e });
  };

  const items1 = [
    {
      label: "12",
      key: 0,
      value: 12,
    },
    {
      label: "24",
      key: 1,
      value: 24,
    },
    {
      label: "48",
      key: 2,
      value: 48,
    },
    {
      label: "72",
      key: 3,
      value: 72,
    },
    {
      label: "96",
      key: 4,
      value: 96,
    },
  ];

  const menuProps1 = {
    items:items1,
    onClick: handleMenuClick1,
  };

  const items2 = [
    {
      label: "10",
      key: 0,
      value: 10,
    },
    {
      label: "20",
      key: 1,
      value: 20,
    },
    {
      label: "50",
      key: 2,
      value: 50,
    },
    {
      label: "70",
      key: 3,
      value: 70,
    },
    {
      label: "90",
      key: 4,
      value: 90,
    },
  ];

  const menuProps2 = {
    items: items2,
    onClick: handleMenuClick2,
  };

  const onChange = (e) => {
    // console.log("onChange", e.target.value);
    // if (e.target.value === 1) {
    //   setToggleValue(e.target.value);
    //   setHoursValue(items[hours].value);
    //   setPercentageValue(items2[percentage].value);
    // } else if (e.target.value === 2) {
      setToggleValue(e.target.value);
    // }
  };

  const handelImageChange1 = (e) => {
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
        } else {
          image.onload = () => {
            if (image.width >= 200) {
              if (file.size / 1024 / 1024 < 2) {
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
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const carousalImageChange = (e) => {
    const files = Array.from(e.target.files);
    console.log("e.target.files===>", files);
    if (BannerImageArray.length + files.length > 5) {
      InfoModal({
        type: "error",
        title: "Error",
        text: "You can only select up to 5 images.",
      });
      return;
    }
    const newImages = [];
    const newPreviews = [];

    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const image = new Image();
          image.src = e.target.result;
          console.log("file.type", file.type);
          const isJpgOrPng =
            file.type === "image/jpeg" || file.type === "image/png";

          if (!isJpgOrPng) {
            InfoModal({
              type: "error",
              title: "warning",
              text: "Image must be in JPEG or PNG format.",
            });
          } else {
            image.onload = () => {
              if (image.width >= 200) {
                if (file.size / 1024 / 1024 < 2) {
                  newImages.push(file);
                  newPreviews.push(e.target.result);
                  resolve();
                } else {
                  InfoModal({
                    type: "error",
                    title: "warning",
                    text: "Image size must be less than 2MB.",
                  });
                  reject();
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
          }
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises)
      .then(() => {
        setImages((prevImages) => [...prevImages, ...newImages]);
        setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
      })
      .catch((error) => {
        console.error("Error processing some files", error);
      });
  };

  const handleDelete = async (preview, index) => {
    console.log("index===>", preview);
    const userId = localStorage.getItem("userId");
    const userToken = localStorage.getItem("token");
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    await Remove_Banner_Image({
      user_id: userId,
      token: userToken,
      banner_image_name: preview,
    });
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    const userToken = localStorage.getItem("token");
    console.log("image==============>>>>>>>>>>>>", image);
    if (image) {
      const body = {
        logo: image,
        user_id: userId,
        token: userToken,
      };
      await Add_Update_Logo_Image(body);
    } else {
      InfoModal({
        type: "error",
        title: "Error",
        text: "Please select an image to upload.",
      });
    }
  };
  const handleSubmit2 = async (e) => {
    console.log("images==============>>>>>>>>>>>>", images);
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    const userToken = localStorage.getItem("token");

    if ([...images].length !== 0) {
      const body = {
        banner_images: previews,
        user_id: userId,
        token: userToken,
      };
      await Add_Banner_Image(body);
    } else {
      InfoModal({
        type: "error",
        title: "Error",
        text: "Please select an image to upload.",
      });
    }
  };

  return (
    <>  
      {isLoading?(
        <div style={{display:'flex', justifyContent:'center',alignItems:'center', height:'100vh'}}>
            <Spin size="large"/>
          </div>
      ):(
      <>
      <Row>
        <Col xl={24}>
          <Row>
            <Col style={{ padding: "10px" }} xl={24}>
              <BodyDemi style={{ color: "#72959A", fontSize: "24px" }}>
                Cancellation Policy
              </BodyDemi>
            </Col>
            <Col style={{ padding: "15px" }} xl={24}>
              <div
                style={{
                  border: "1px solid #72959A",
                  borderRadius: "10px",
                  height: "100%",
                }}
              >
                <Row style={{ padding: "15px", fontSize: "18px" }}>
                  <span>Service Cancellation & Refunds Conditions *</span>
                </Row>

                <Radio.Group
                  onChange={onChange}
                  value={toggleValue}
                  style={{ padding: "10px" }}
                >
                  <Row gutter={[16, 16]} align="middle">
                    <Col span={24}>
                      <Row align="middle">
                        <Col>
                          <Radio value={1} />
                        </Col>
                        <Col>
                          <span>Free Cancellation Until</span>
                        </Col>
                        <Col>
                          <Dropdown menu={menuProps1}>
                            <Button style={{ margin: "0 10px" }}>
                              <Space key={items1[hours]?.key}>
                                {items1[hours]?.label}
                                {"  "}<DownOutlined />
                              </Space>
                            </Button>
                          </Dropdown>
                        </Col>
                        <Col>
                          <span>
                            {" "}
                            <span
                              style={{
                                fontWeight: "bold",
                                textDecoration: "underline",
                              }}
                            >
                              hours
                            </span>{" "}
                            before confirmed appointment
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col offset={2}>
                          <ul
                            style={{
                              padding: "10px",
                              color: "red",
                              marginLeft: "-50px",
                            }}
                          >
                            <li>
                              Buyer gets{" "}
                              <span style={{ fontWeight: "bold" }}>
                                Full refund less processing
                              </span>{" "}
                              fee if cancellation made before hours indicated.
                            </li>
                            <li>
                              Buyer will only get a refund of
                              <Dropdown menu={menuProps2}>
                                <Button style={{ margin: "0 10px" }} >
                                  <Space key={items2[percentage]?.key}>
                                    {items2[percentage]?.label}%
                                    {"  "}<DownOutlined />
                                  </Space>
                                </Button>
                              </Dropdown>
                              if condition is{" "}
                              <span
                                style={{
                                  textDecoration: "underline",
                                  fontWeight: "bold",
                                }}
                              >
                                not
                              </span>{" "}
                              met.
                            </li>
                          </ul>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={24}>
                      <Radio value={2}>
                        No Cancellation & non-refundable service after
                        confirmation by buyer
                      </Radio>
                    </Col>
                  </Row>
                </Radio.Group>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px",
                    color: "red",
                  }}
                >
                  <div
                    style={{ textDecoration: "underline", fontWeight: "bold" }}
                  >
                    Important :{" "}
                  </div>
                  <div style={{ marginLeft: "1.5rem" }}>
                    <p>Vender agrees that :- </p>
                    <p>
                      1. Customer can re-schedule services or appointments
                      anytime.
                    </p>
                    <p>
                      2. ALL Platform Processing & Stripe fees will NOT be
                      refunded to Buyer for all refunds.
                    </p>
                  </div>
                </div>

                <Row style={{ padding: "15px" }}>
                  <CustomButton
                    onClick={handleSaveSubmit}
                    style={{ width: "auto" }}
                  >
                    Apply
                  </CustomButton>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {apiData?.plan_name !== "Starter" && storeFrontSetting !== null ? (
        <Row>
          <Col xl={24}>
            <Row>
              <Col style={{ padding: "15px" }} xl={24}>
                <Row>
                  <H4>My Storefront</H4>
                </Row>
                <Row
                  style={{
                    border: "1px solid #72959A",
                    borderRadius: "10px",
                    height: "100%",
                    marginTop: "20px",
                  }}
                >
                  <Col xl={10} style={{ padding: "15px" }}>
                    <Row
                      style={{ display: "flex", flexDirection: "column" }}
                      gutter={[0, 10]}
                    >
                      <Col>
                        <H5>Hero section (Banner)</H5>{" "}
                      </Col>

                      <Col
                        style={{
                          border: "1px solid #72959A",
                          alignItems: "center",
                          padding: "10px 10px 20px 10px",
                          borderRadius: "10px",
                        }}
                      >
                        <div style={{ display: "flex" }}>
                          <div style={{ padding: "10px", width: "60%" }}>
                            <p
                              style={{
                                fontWeight: 600,
                                fontSize: "14px",
                                color: "#72959A",
                              }}
                            >
                              Upload Logo picture
                            </p>
                            <p
                              style={{
                                fontWeight: 400,
                                fontSize: "10px",
                                color: "#72959A",
                              }}
                            >
                              Please upload logo with background for better
                              visibility
                            </p>
                            <span style={{ fontWeight: 400, fontSize: "12px" }}>
                              <p>Min. resolution is 300px 300px </p>
                              <p>file format must be .jpg or .png</p>
                            </span>
                          </div>
                          <form
                            style={{
                              width: "40%",
                              display: "flex",
                              alignItems: "center",
                            }}
                            onSubmit={handleSubmit1}
                          >
                            <label
                              style={{
                                display: "inline-block",
                                cursor: "pointer",
                                width: "50%",
                              }}
                            >
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handelImageChange1}
                                style={{ display: "none" }}
                              />
                              <span
                                style={{
                                  // border: "1px solid #9C9C9C",
                                  // padding: "20px",
                                  color: "red",
                                  // borderRadius: "5px",
                                }}
                              >
                                <IoCloudUploadOutline size={30} />
                              </span>
                            </label>

                            <div style={{ width: "50%" }}>
                              <button
                                type="submit"
                                style={{
                                  color: "white",
                                  border: "none",
                                  cursor: "pointer",
                                  backgroundColor: "black",
                                  padding: "5px",
                                  borderRadius: "5px",
                                }}
                              >
                                Save
                              </button>
                            </div>
                          </form>
                        </div>

                        <div
                          className="banner-image"
                          style={{
                            textAlign: "left",
                            padding: "10px",
                            height: "60px",
                            lineHeight: "60px",
                          }}
                        >
                          {preview !== "" ? (
                            <img src={preview} width={"60px"} height={"60px"} />
                          ) : (
                            <></>
                          )}
                        </div>
                      </Col>

                      <Col
                        style={{
                          border: "1px solid #72959A",
                          padding: "20px 10px 30px 20px",
                          borderRadius: "10px",
                        }}
                      >
                        <div
                          style={{
                            alignItems: "center !important",
                            display: "flex",

                            // padding: "20px",
                          }}
                        >
                          <div style={{ paddingRight: "10px", width: "60%" }}>
                            <p
                              style={{
                                fontWeight: 600,
                                fontSize: "14px",
                                color: "#72959A",
                              }}
                            >
                              Upload Banner images
                            </p>
                            <p
                              style={{
                                fontWeight: 400,
                                fontSize: "10px",
                                color: "#72959A",
                              }}
                            >
                              Please upload high quality images
                            </p>
                            <span style={{ fontWeight: 400, fontSize: "12px" }}>
                              <p>file format must be .jpg or .png</p>
                              <p style={{ fontSize: "0.7rem" }}>
                                (you can only select up to 5 images)
                              </p>
                            </span>
                          </div>

                          <form
                            onSubmit={handleSubmit2}
                            style={{
                              display: "flex",
                              width: "40%",
                              alignItems: "center",
                            }}
                          >
                            <label
                              style={{
                                display: "inline-block",
                                cursor: "pointer",
                                width: "50%",
                              }}
                            >
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={carousalImageChange}
                                style={{ display: "none" }}
                                disabled={images.length >= 5}
                              />
                              <span
                                style={{
                                  color: "red",
                                  //borderRadius: "5px",
                                }}
                              >
                                <IoCloudUploadOutline size={30} />
                              </span>
                            </label>
                            <div style={{ width: "50%" }}>
                              <button
                                type="submit"
                                style={{
                                  color: "white",
                                  border: "none",
                                  cursor: "pointer",
                                  backgroundColor: "black",
                                  padding: "5px",
                                  borderRadius: "5px",
                                }}
                              >
                                Save
                              </button>
                            </div>
                          </form>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                          }}
                        >
                          {apiData?.banner_image === null ||
                          apiData?.banner_image === "[]"
                            ? previews?.map((preview, index) => (
                                <div
                                  style={{
                                    marginRight: "15px",
                                  }}
                                >
                                  <div className="delete-carousal-image"></div>
                                  <button
                                    style={{
                                      float: "right",
                                      border: "none",
                                    }}
                                    onClick={() => handleDelete(preview, index)}
                                  >
                                    X
                                  </button>
                                  <div
                                    key={index}
                                    className="banner-image"
                                    style={{
                                      textAlign: "center",
                                      height: "60px",
                                      lineHeight: "60px",
                                      // background: "#364d79",
                                    }}
                                  >
                                    <img
                                      src={preview}
                                      width={"60px"}
                                      height={"60px"}
                                      alt={`preview-${index}`}
                                    />
                                  </div>
                                </div>
                              ))
                            : BannerImageArray?.map((preview, index) => (
                                <div
                                  style={{
                                    marginTop: "25px",
                                    marginRight: "15px",
                                  }}
                                >
                                  <div className="delete-carousal-image"></div>
                                  <button
                                    style={{
                                      float: "right",
                                      border: "none",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => handleDelete(preview, index)}
                                  >
                                    X
                                  </button>
                                  <div
                                    key={index}
                                    className="banner-image"
                                    style={{
                                      textAlign: "center",
                                      height: "60px",
                                      lineHeight: "60px",
                                      // background: "#364d79",
                                    }}
                                  >
                                    <img
                                      src={`${
                                        STORAGE_URL +
                                        "/storefront/" +
                                        `${preview}`
                                      }`}
                                      width={"60px"}
                                      height={"60px"}
                                      alt={`preview-${index}`}
                                    />
                                  </div>
                                </div>
                              ))}
                        </div>
                      </Col>

                      <Row
                        style={{
                          border: "1px solid #72959A",
                          padding: "10px 10px 10px 20px",
                          borderRadius: "10px",
                        }}
                      >
                        <Col xl={24}>
                          <Row>
                            {" "}
                            <BodyDemi style={{ color: "#72959A" }}>
                              Header Section
                            </BodyDemi>{" "}
                          </Row>
                          <Radio.Group
                            onChange={handleOptionChange}
                            value={apiData?.banner_style}
                          >
                            <Radio
                              value="split_screen"
                              onClick={() => handleScreenSize("split_screen")}
                            >
                              Divided screen
                            </Radio>
                            <Radio
                              value="full_screen"
                              onClick={() => handleScreenSize("full_screen")}
                            >
                              Full screen
                            </Radio>
                          </Radio.Group>
                        </Col>

                        <Col xl={24}>
                          <Row>
                            {" "}
                            <BodyDemi style={{ color: "#72959A" }}>
                              Professionals section
                            </BodyDemi>{" "}
                          </Row>
                          <Checkbox
                            onChange={handleCheckboxChange}
                            checked={apiData?.show_professionals}
                          >
                            Show professionals
                          </Checkbox>
                        </Col>

                        <Col xl={24}>
                          <BodyDemi style={{ color: "#72959A" }}>
                            Choose Custom color
                          </BodyDemi>
                          <br></br>
                          <div
                            style={{
                              border: "1px solid black",
                              padding: "2px",
                              marginTop: "5px",
                              display: "inline-block",
                              borderRadius: "5px",
                            }}
                          >
                            <div>
                              {isLoading ? (
                                <p>Loading...</p>
                              ) : (
                                <ColorPicker value={color} onChange={handleColorChange}>
                                  <Button type="success" style={btnStyle}>
                                    {" "}
                                    Color{" "}
                                  </Button>
                                </ColorPicker>
                              )}
                            </div>
                          </div>
                          <br></br>
                          <button
                            onClick={handleSaveSubmit}
                            style={{
                              backgroundColor: "black",
                              fontFamily: '"poppins",sans-serif',
                              padding: "10px",
                              border: "none",
                              borderRadius: "5px",
                              color: "white",
                              marginTop: "20px",
                              fontWeight: 700,
                              cursor: "pointer",
                            }}
                          >
                            Save
                          </button>
                        </Col>
                      </Row>
                    </Row>
                  </Col>

                  <Col xl={14} style={{ padding: "10px" }}>
                    <Row style={{ borderLeft: "1px solid #72959A" }}>
                      <Col span={24}>
                        {" "}
                        <BodyDemi
                          style={{ color: "#72959A", marginLeft: "50px" }}
                        >
                          Preview
                        </BodyDemi>{" "}
                      </Col>
                      {screenSize === "split_screen" ? (
                        <Col xl={24}>
                          <div
                            style={{
                              margin: " 20px 20px ",
                              borderLeft: "1px solid #DCB013 ",
                              borderRadius: "10px",
                            }}
                          >
                            <div
                              style={bannerStyle}
                              className="setting-service"
                            >
                              <Row style={{ padding: "20px" }}>
                                <Col
                                  md={11}
                                  sm={24}
                                  span={24}
                                  style={{ paddingRight: "10px" }}
                                >
                                  {apiData?.logo === null ? (
                                    <img
                                      src={preview}
                                      className="logo"
                                      width={"40px"}
                                      height={"40px"}
                                    />
                                  ) : (
                                    <img
                                      src={`${
                                        STORAGE_URL +
                                        "/storefront/" +
                                        `${apiData?.logo}`
                                      }`}
                                      className="logo"
                                      width={"40px"}
                                      height={"40px"}
                                    />
                                  )}

                                  <p
                                    style={{
                                      marginBottom: "7px",
                                      marginTop: "7px",
                                    }}
                                    className=" premium"
                                  ></p>
                                  <p
                                    style={{
                                      marginBottom: "7px",
                                      backgroundColor: "white",
                                      borderRadius: "50px",
                                      padding: "5px 12px",
                                      width: "70%",
                                    }}
                                  >
                                    {" "}
                                  </p>
                                  <p
                                    style={{ marginBottom: "7px" }}
                                    className="white-text"
                                  ></p>
                                  <p
                                    style={{ marginBottom: "7px" }}
                                    className="white-text"
                                  ></p>
                                  <p
                                    style={{ marginBottom: "7px" }}
                                    className="white-text"
                                  ></p>
                                  <p
                                    className="icons-preview"
                                    style={{ marginBottom: "7px" }}
                                  >
                                    <span className="wid"> </span> <span></span>{" "}
                                    <span></span>
                                  </p>
                                </Col>
                                <Col md={1}></Col>
                                <Col md={12} sm={24}>
                                  <div style={{ marginBottom: "10px" }}>
                                    <Carousel autoplay className="carousal-img">
                                      {apiData?.banner_image === null ||
                                      apiData?.banner_image === "[]"
                                        ? previews?.map((preview, index) => (
                                            <div
                                              key={index}
                                              style={{
                                                textAlign: "center",
                                                height: "150px",
                                                lineHeight: "150px",
                                                background: "#364d79",
                                              }}
                                            >
                                              <img
                                                src={preview}
                                                width={"100%"}
                                                height={"150px"}
                                                alt={`preview-${index}`}
                                              />
                                            </div>
                                          ))
                                        : BannerImageArray?.map(
                                            (preview, index) => (
                                              <div
                                                key={index}
                                                style={{
                                                  textAlign: "center",
                                                  height: "150px",
                                                  lineHeight: "150px",
                                                  background: "#364d79",
                                                }}
                                              >
                                                <img
                                                  src={`${STORAGE_URL}/storefront/${preview}`}
                                                  width={"100%"}
                                                  height={"150px"}
                                                  alt={`preview-${index}`}
                                                />
                                              </div>
                                            )
                                          )}
                                    </Carousel>
                                  </div>
                                </Col>

                                <Col md={24} sm={24}></Col>
                              </Row>
                              <Row style={{ padding: "0px 20px" }}>
                                {showProfessionals === true ? (
                                  <Col
                                    md={16}
                                    style={{
                                      margin: "auto",
                                      display: "flex",
                                      gap: "5%",
                                      marginTop: "10px",
                                      marginBottom: "10px",
                                    }}
                                  >
                                    <div className="professional-container">
                                      <div className="image-container "></div>
                                    </div>
                                    <div className="professional-container">
                                      <div className="image-container "></div>
                                    </div>
                                    <div className="professional-container">
                                      <div className="image-container "></div>
                                    </div>
                                    <div className="professional-container">
                                      <div className="image-container "></div>
                                    </div>
                                    <div className="professional-container">
                                      <div className="image-container "></div>
                                    </div>
                                    <div className="professional-container">
                                      <div className="image-container "></div>
                                    </div>
                                  </Col>
                                ) : (
                                  <></>
                                )}

                                <Col
                                  md={24}
                                  style={{ marginTop: "20px", margin: "auto" }}
                                >
                                  <div style={{ display: "flex", gap: "3%" }}>
                                    <div className="professional-detail"></div>
                                    <div className="professional-detail"></div>
                                    <div className="professional-detail"></div>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                            <div
                              style={{
                                backgroundColor: "#F8F8F8",
                                padding: "20px 50px",
                                borderRadius: "10px",
                              }}
                              className="setting-service"
                            >
                              <Row>
                                <Col md={6} style={{ padding: "10px" }}>
                                  <div className="service-content"></div>
                                </Col>
                                <Col md={6} style={{ padding: "10px" }}>
                                  <div className="service-content"></div>
                                </Col>
                                <Col md={6} style={{ padding: "10px" }}>
                                  <div className="service-content"></div>
                                </Col>
                                <Col md={6} style={{ padding: "10px" }}>
                                  <div className="service-content"></div>
                                </Col>
                                <Col md={6} style={{ padding: "10px" }}>
                                  <div className="service-content"></div>
                                </Col>
                                <Col md={6} style={{ padding: "10px" }}>
                                  <div className="service-content"></div>
                                </Col>
                                <Col md={6} style={{ padding: "10px" }}>
                                  <div className="service-content"></div>
                                </Col>
                                <Col md={6} style={{ padding: "10px" }}>
                                  <div className="service-content"></div>
                                </Col>
                                <Col md={6} style={{ padding: "10px" }}>
                                  <div className="service-content"></div>
                                </Col>
                                <Col md={6} style={{ padding: "10px" }}>
                                  <div className="service-content"></div>
                                </Col>
                                <Col md={6} style={{ padding: "10px" }}>
                                  <div className="service-content"></div>
                                </Col>
                                <Col md={6} style={{ padding: "10px" }}>
                                  <div className="service-content"></div>
                                </Col>
                              </Row>
                            </div>
                          </div>
                        </Col>
                      ) : (
                        <Col xl={24}>
                          <div
                            style={{
                              margin: " 20px 20px ",
                              borderLeft: "1px solid #DCB013 ",
                              borderRadius: "10px",
                            }}
                          >
                            <div
                              style={bannerStyle}
                              className="setting-service"
                            >
                              <Row>
                                <Col md={24} sm={24}>
                                  <div
                                    style={{
                                      marginBottom: "10px",
                                      height: "250px",
                                    }}
                                  >
                                    <Carousel
                                      autoplay
                                      style={{ position: "relative" }}
                                      className="carousal-img"
                                    >
                                      {apiData?.banner_image === null ||
                                      apiData?.banner_image === "[]"
                                        ? previews?.map((preview, index) => (
                                            <div
                                              key={index}
                                              style={{
                                                textAlign: "center",
                                                height: "250px",
                                                lineHeight: "150px",
                                                background: "#364d79",
                                              }}
                                            >
                                              <img
                                                src={preview}
                                                width={"100%"}
                                                height={"250px"}
                                                style={{
                                                  maxWidth: "100%",
                                                  maxHeight: "100%",
                                                  objectFit: "cover",
                                                }}
                                                alt={`preview-${index}`}
                                              />
                                            </div>
                                          ))
                                        : BannerImageArray?.map(
                                            (preview, index) => (
                                              <div
                                                key={index}
                                                style={{
                                                  textAlign: "center",
                                                  height: "250px",
                                                  lineHeight: "150px",
                                                  display: "flex",
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                                }}
                                              >
                                                <img
                                                  src={`${STORAGE_URL}/storefront/${preview}`}
                                                  width={"100%"}
                                                  height={"250px"}
                                                  style={{
                                                    maxWidth: "100%",
                                                    maxHeight: "100%",
                                                    objectFit: "cover",
                                                  }}
                                                  alt={`preview-${index}`}
                                                />
                                              </div>
                                            )
                                          )}
                                    </Carousel>

                                    <div
                                      style={{
                                        position: "absolute",
                                        top: "10%",
                                        left: "5%",
                                      }}
                                    >
                                      <Row>
                                        <Col
                                          md={17}
                                          sm={24}
                                          span={24}
                                          style={{ paddingRight: "10px" }}
                                        >
                                          {apiData?.logo === null ? (
                                            <img
                                              src={preview}
                                              className="logo"
                                              width={"40px"}
                                              height={"40px"}
                                            />
                                          ) : (
                                            <img
                                              src={`${
                                                STORAGE_URL +
                                                "/storefront/" +
                                                `${apiData?.logo}`
                                              }`}
                                              className="logo"
                                              width={"40px"}
                                              height={"40px"}
                                            />
                                          )}
                                          <p
                                            style={{
                                              marginBottom: "7px",
                                              marginTop: "7px",
                                            }}
                                            className=" premium"
                                          ></p>
                                          <p
                                            style={{
                                              marginBottom: "7px",
                                              backgroundColor: "white",
                                              borderRadius: "50px",
                                              padding: "5px 12px",
                                              width: "90px",
                                            }}
                                          >
                                            {" "}
                                          </p>
                                          <p
                                            style={{
                                              marginBottom: "7px",
                                              width: "130px",
                                            }}
                                            className="white-text"
                                          ></p>
                                          <p
                                            style={{
                                              marginBottom: "7px",
                                              width: "130px",
                                            }}
                                            className="white-text"
                                          ></p>
                                          <p
                                            style={{
                                              marginBottom: "7px",
                                              width: "130px",
                                            }}
                                            className="white-text"
                                          ></p>
                                          <p
                                            className="icons-preview"
                                            style={{ marginBottom: "7px" }}
                                          >
                                            <span className="wid"> </span>{" "}
                                            <span></span> <span></span>
                                          </p>
                                        </Col>
                                      </Row>
                                      {showProfessionals === true ? (
                                        <Row>
                                          <Col
                                            md={24}
                                            style={{
                                              margin: "auto",
                                              display: "flex",
                                              gap: "4%",
                                              marginTop: "15px",
                                              marginBottom: "10px",
                                              left: "32%",
                                            }}
                                          >
                                            <div
                                              className="professional-container"
                                              style={{ width: "50px" }}
                                            >
                                              <div className="image-container "></div>
                                            </div>
                                            <div
                                              className="professional-container"
                                              style={{ width: "50px" }}
                                            >
                                              <div className="image-container "></div>
                                            </div>
                                            <div
                                              className="professional-container"
                                              style={{ width: "50px" }}
                                            >
                                              <div className="image-container "></div>
                                            </div>
                                            <div
                                              className="professional-container"
                                              style={{ width: "50px" }}
                                            >
                                              <div className="image-container "></div>
                                            </div>
                                            <div
                                              className="professional-container"
                                              style={{ width: "50px" }}
                                            >
                                              <div className="image-container "></div>
                                            </div>
                                            <div
                                              className="professional-container"
                                              style={{ width: "50px" }}
                                            >
                                              <div className="image-container "></div>
                                            </div>
                                          </Col>
                                        </Row>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col
                                  md={20}
                                  style={{ marginTop: "20px", margin: "auto" }}
                                >
                                  <div style={{ display: "flex", gap: "3%" }}>
                                    <div className="professional-detail"></div>
                                    <div className="professional-detail"></div>
                                    <div className="professional-detail"></div>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                            <div
                              style={{
                                backgroundColor: "#F8F8F8",
                                padding: "20px 50px",
                                borderRadius: "10px",
                              }}
                              className="setting-service"
                            >
                              <Row>
                                <Col md={6} style={{ padding: "10px" }}>
                                  <div className="service-content"></div>
                                </Col>
                                <Col md={6} style={{ padding: "10px" }}>
                                  <div className="service-content"></div>
                                </Col>
                                <Col md={6} style={{ padding: "10px" }}>
                                  <div className="service-content"></div>
                                </Col>
                                <Col md={6} style={{ padding: "10px" }}>
                                  <div className="service-content"></div>
                                </Col>
                                <Col md={6} style={{ padding: "10px" }}>
                                  <div className="service-content"></div>
                                </Col>
                                <Col md={6} style={{ padding: "10px" }}>
                                  <div className="service-content"></div>
                                </Col>
                                <Col md={6} style={{ padding: "10px" }}>
                                  <div className="service-content"></div>
                                </Col>
                                <Col md={6} style={{ padding: "10px" }}>
                                  <div className="service-content"></div>
                                </Col>
                                <Col md={6} style={{ padding: "10px" }}>
                                  <div className="service-content"></div>
                                </Col>
                                <Col md={6} style={{ padding: "10px" }}>
                                  <div className="service-content"></div>
                                </Col>
                                <Col md={6} style={{ padding: "10px" }}>
                                  <div className="service-content"></div>
                                </Col>
                                <Col md={6} style={{ padding: "10px" }}>
                                  <div className="service-content"></div>
                                </Col>
                              </Row>
                            </div>
                          </div>
                        </Col>
                      )}
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : (
        <></>
      )}
      </>
    )}
    </>
  );
};

export default VendorSettings;
