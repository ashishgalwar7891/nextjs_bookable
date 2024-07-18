import ListingCard from "@/lib/commonComponent/CustomUserCard";
import SearchHeader from "@/lib/commonComponent/SearchHeader";
import { Col, Row, Select, Carousel, Button, Spin } from "antd";
import { Fragment, useEffect, useState } from "react";

import {
  H2,
  H2Bold,
  H3,
  H4,
  H5,
  BodyDemi,
  BodyBold,
  BodyReg,
  BodySmallReg,
  BodySmallBold,
  BodyTiny,
  BodyTinyBold,
  BodyMicro,
  BodyMicroBold,
  OrangeBright,
  BackgroundImage,
} from "../../styles/styledComponent";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Xicon from "../../assets/imgs/icon/x-circle.svg";
import DeviceMobileCamera from "../../assets/imgs/icon/DeviceMobileCamera.svg";
import VendorLogo from "../../assets/imgs/icon/vendor-logo.png";
import ProfileImage from "../../assets/imgs/store-front.jpg";
import LocationIcon from "../../assets/imgs/icon/map-pin.svg";
import CallIcon from "../../assets/imgs/icon/Call.svg";
import YTicon from "../../assets/imgs/icon/youtube.svg";
import FBicon from "../../assets/imgs/icon/fb.svg";
import InstaIcon from "../../assets/imgs/icon/insta.svg";
import { GetVendorAllDetailsByIdService } from "@/Services/frontStore.service";
import { STORAGE_URL } from "@/Services/vendorService.services";
import {
  GetVendorDetailsService,
  GetVendorProfileDetailsService,
} from "@/Services/vendorProfile.services";
import { TbAward } from "react-icons/tb";
import { LuMapPin } from "react-icons/lu";
import { FiFacebook } from "react-icons/fi";
import { FiYoutube } from "react-icons/fi";
import { useParams, useSearchParams } from "next/navigation";
import { IoStar, IoCall } from "react-icons/io5";
import { FaRegHeart, FaFacebookF } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { AiOutlineInstagram } from "react-icons/ai";
import style from "./style.css";
import { images } from "../../../next.config";
import InfoModal from "@/lib/commonComponent/ConfirmModal";

const StoreFront = ({ params, VenderId }) => {
  const { Option } = Select;
  const router = useRouter();
  const [apiData, setApiData] = useState();
  // const [apiData1, setApiData1] = useState();
  const [listData, setListData] = useState();
  const [showAppointment, setshowAppointment] = useState(false);
  const [appointmentData, setAppointmentData] = useState();
  const [filterData, setFilterData] = useState({
    price: "",
    star: "",
    sortby: "",
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [premiumCurrentIndex, setPremiumCurrentIndex] = useState(0);
  const [premiumCurrentIndex1, setPremiumCurrentIndex1] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [loader, set_loader] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const phoneNumber = apiData?.phone || "no data";

  const handleClick = () => {
    if (phoneNumber !== "no data") {
      window.location.href = `tel:+65${phoneNumber}`;
    }
  };

  useEffect(() => {
    (async () => {
      if (params !== null) {
        try {
          const response = await GetVendorAllDetailsByIdService(params);
          let output = response?.response?.data.data;
          if (output !== null || output !== undefined) {
            setApiData(output);
          }
        } catch (err) {
          console.log(err);
        } finally {
          set_loader(false);
        }
      } else {
        set_loader(false);
      }
    })();
  }, [params]);

  useEffect(() => {
    window.addEventListener("resize", updateScreenWidth);
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  console.log("first1111===>>", apiData);

  const handleCardClick = (id) => {
    // console.log("apiData?.similar_businesses?.user_id",id)
    router.push(`/store-front?VendorId=${id}`);
  };

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

  // console.log("apiData?.banner_image===>",apiData?.banner_image)

  const handlePriceClick = (item) => {
    if (item) {
      setFilterData({ ...filterData, price: item });
    } else {
      setFilterData({ ...filterData, price: "" });
    }
  };

  const handleStarsClick = (item) => {
    if (item) {
      setFilterData({ ...filterData, star: item });
    } else {
      setFilterData({ ...filterData, star: "" });
    }
  };

  const handleSortByClick = (item) => {
    if (item) {
      setFilterData({ ...filterData, sortby: item });
    } else {
      setFilterData({ ...filterData, sortby: "" });
    }
  };

  const handleClearClick = (type) => {
    setFilterData({ ...filterData, type: "" });
  };

  const showAllAppointments = () => {
    setFilterData({
      price: "",
      star: "",
      location: "",
      category: "",
      sortby: "",
      service: "",
      label: "",
      vendor: "",
      typed: "",
    });
    setshowAppointment(!showAppointment);
  };

  const imageUrl =
    "https://th.bing.com/th?id=OIP.eh5RRJ5l1pqHQDN1ubb1VAHaEx&w=311&h=200&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2";

  const textStyle = {
    position: "absolute",
    top: "10px",
    fontSize: "2em",
    borderRadius: " 5px",
    width: "100%",
    // display: 'flex',
    // justifyContent: 'center',
    //alignItems: 'center',
    marginTop: "70px",

    // marginBottom: '70px'
  };

  const CardStyle = {
    // backgroundColor: "#F7F6F5",
    color: "white",
    border: "none",
    borderRadius: "5px",
    margin: "5px",
    cursor: "pointer",
    // display: 'grid',
    padding: "0px",
    height: "100%",
  };
  const totalSlides = apiData?.resources?.length * 2 || 0;
  const slideWidthPercentage = 100 / totalSlides;
  const totalSlides1 = apiData?.resources?.length || 0;
  const slideWidthPercentage1 = 100 / totalSlides1;
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalSlides - 1 ? totalSlides - 1 : prevIndex + 1
    );
  };
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  //const slideWidthPercentage1 = 100 / apiData?.resources.length;
  const premiumNextSlide = () => {
    setPremiumCurrentIndex((prevIndex) =>
      // (prevIndex) => (prevIndex + 1) % apiData.resources.length
      prevIndex === totalSlides - 1 ? totalSlides - 1 : prevIndex + 1
    );
  };

  const premiumPrevSlide = () => {
    setPremiumCurrentIndex((prevIndex) =>
      //(prevIndex - 1 + apiData.resources.length) % apiData.resources.length
      prevIndex === 0 ? 0 : prevIndex - 1
    );
  };
  const slidesToShow = () => {
    if (screenWidth > 1080) {
      return 8; // Number of slides to show on large screens
    } else if (screenWidth > 768) {
      return 6; // Number of slides to show on medium screens
    } else {
      return 2; // Number of slides to show on small screens
    }
  };
  const showSlider = apiData?.resources.length > slidesToShow();

  console.log("apiData?.plan_namer===>", apiData);

  const description = apiData?.description || "no data";
  const words = description.split(" ");
  const isLongDescription = words.length > 25;
  const displayedText =
    isExpanded || !isLongDescription
      ? description
      : words.slice(0, 25).join(" ") + "...";

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handlePrevSlide = () => {
    const newIndex =
      currentIndex === 0 ? apiData?.resources.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleNextSlide = () => {
    const newIndex =
      currentIndex === apiData?.resources.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "No Data";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <Fragment>
      {loader ? (
        <>
          <div style={{ textAlign: "center", padding: "120px" }}>
            <Spin tip="Loading" size="large">
              <div className="content" />
            </Spin>
          </div>
        </>
      ) : (
        <>
          {apiData?.plan_name === "Starter" ? (
            <Row style={{ width: "100%" }}>
              
                <Col xl={24} md={24} sm={24}>
                  <SearchHeader />
                </Col>
                <div
                style={{
                  backgroundImage:`url(${`${STORAGE_URL}/images/${apiData?.service_image}`})`,
                    // STORAGE_URL + "/images/" + `${apiData?.service_image}`,
                    backgroundSize: 'cover', // Ensure the image covers the entire div
                    backgroundPosition: 'center', // Center the image
                    width: '100%', // Full width of the parent container
                    height: '100vh', // Full height of the viewport
                }}
              >
                <Col xl={24} md={24} sm={24} lg={24} style={{ height: "80vh" }}>
                  <Row style={{ position: "relative", height: "98%" }}>
                    <div>
                      {/* <Col xl={24} md={24} sm={24} lg={24}>
                       
                  
                        <img
                          src={
                            STORAGE_URL +
                            "/images/" +
                            `${apiData?.service_image}`
                          }
                          style={{
                            position: "relative",
                            color: "transparent",
                            height: "90vh",
                            width: "99vw",
                          }}
                        />
                      </Col> */}

                      <Col
                        xl={24}
                        md={24}
                        sm={24}
                        lg={24}
                        style={{
                           position: "absolute",
                          //bottom: "-30%",
                          // left: "5%",
                          width: "100%",
                        }}
                        className=" stater-card"
                      >
                        <Row className="biz-container">
                          <Col
                            xl={10}
                            lg={12}
                            md={12}
                            sm={24}
                            style={{
                              background: "rgba(255, 255, 255, 0.93)",
                              width: "100%",
                              boxShadow:
                                "0px 0px 24px 0px rgba(0, 0, 0, 0.25) inset",
                              borderRadius: "25px",
                              padding: "1rem 2rem",
                              height: "50%",
                            }}
                          >
                            {/* VENDOR LOGO */}
                            <Row style={{ marginBottom: "1rem" }}>
                              <Col style={{ borderRadius: "50%" }}>
                                <img
                                  src={
                                    STORAGE_URL +
                                    "/images/" +
                                    `${apiData?.image?.filename}`
                                  }
                                  style={{
                                    width: "100px",
                                    height: "100px",
                                    borderRadius: "50%",
                                  }}
                                />
                              </Col>
                            </Row>

                            {/* VENDOR CONTACT */}
                            <Row
                              style={{
                                display: "flex",
                                alignItems: "flex-end",
                                marginBottom: "1rem",
                              }}
                            >
                              <Col xl={16} lg={16} md={16}>
                                <Row style={{ width: "100%" }}>
                                  <H2Bold>{apiData?.title || "no data"}</H2Bold>
                                </Row>
                                <Row
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                  }}
                                >
                                  <Col xl={24} md={24}>
                                    <Image src={LocationIcon}></Image>
                                    {apiData &&
                                      apiData?.locations &&
                                      apiData?.locations.length > 0 &&
                                      apiData?.locations?.map((item, index) => {
                                        return (
                                          <>
                                            {index > 0 && " | "} {item.name}
                                          </>
                                        );
                                      })}
                                  </Col>
                                </Row>
                              </Col>
                              <Col xl={8} lg={8} md={8}>
                                {/* <Row
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                gap: "4px",
                                marginBottom: "6px",
                              }}
                            >
                              <Image src={CallIcon}></Image>
                              <BodySmallBold>
                                +65 {apiData?.phone || "no data"}{" "}
                              </BodySmallBold>
                            </Row> */}
                                <Row
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                    gap: "4px",
                                    marginBottom: "6px",
                                  }}
                                >
                                  <Image src={CallIcon} alt="Call Icon" />
                                  <BodySmallBold
                                    onClick={handleClick}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <a
                                      href={`tel:+65${phoneNumber}`}
                                      style={{
                                        color: "inherit",
                                        textDecoration: "none",
                                      }}
                                    >
                                      +65 {phoneNumber}
                                    </a>
                                  </BodySmallBold>
                                </Row>

                                <Row
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                    gap: "10px",
                                    justifyContent: 'flex-end'
                                  }}
                                >
                                  <Image src={YTicon}></Image>
                                  <Image src={FBicon}></Image>
                                  <Image src={InstaIcon}></Image>
                                </Row>
                              </Col>
                            </Row>

                            {/* VENDOR INFO */}
                            {/* <Row style={{ marginBottom: "1rem" }}>
                          <BodySmallReg>
                            {apiData?.description || "no data"}
                            <BodySmallBold style={{ color: "#EA8933" }}>
                              Read more
                            </BodySmallBold>
                          </BodySmallReg>
                        </Row> */}
                            <Row style={{ marginBottom: "1rem" }}>
                              <BodySmallReg>
                                {displayedText}
                                {isLongDescription && !isExpanded && (
                                  <BodySmallBold
                                    onClick={toggleExpand}
                                    style={{
                                      color: "#EA8933",
                                      cursor: "pointer",
                                    }}
                                  >
                                    Read more
                                  </BodySmallBold>
                                )}
                                {isExpanded && (
                                  <BodySmallBold
                                    onClick={toggleExpand}
                                    style={{
                                      color: "#EA8933",
                                      cursor: "pointer",
                                    }}
                                  >
                                    Show less
                                  </BodySmallBold>
                                )}
                              </BodySmallReg>
                            </Row>
                            {/* Resources  */}
                            <Row>
                              <div
                                className="slider-container"
                                style={{
                                  position: "relative",
                                  width: "100%",
                                  overflow: "hidden",
                                }}
                              >
                                <div
                                  className="card-slider"
                                  style={{
                                    display: "flex",
                                    transition: "transform 0.3s ease-in-out",
                                    transform: `translateX(-${
                                      currentIndex * 25
                                    }%)`,
                                  }}
                                >
                                  {apiData?.resources.map((item, index) => (
                                    <div
                                      key={index}
                                      className="card"
                                      style={{
                                        minWidth: "30%",
                                        padding: "10px",
                                        boxSizing: "border-box",
                                      }}
                                    >
                                      <Col
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "center",
                                          background: "#F7F6F5",
                                          padding: "15px",
                                          borderRadius: "10px",
                                        }}
                                      >
                                        <img
                                          src={`${STORAGE_URL}/images/${item?.feature_image?.filename}`}
                                          style={{
                                            width: "50px",
                                            height: "50px",
                                            objectFit: "cover",
                                            borderRadius: "50%",
                                            marginBottom: "10px",
                                          }}
                                          alt="No Image Preview"
                                        />
                                        <h5>{truncateText(item?.name, 12)}</h5>
                                        <p>
                                          {truncateText(item?.designation, 12)}
                                        </p>
                                      </Col>
                                    </div>
                                  ))}
                                </div>
                                <Button
                                  className="prev"
                                  onClick={handlePrevSlide}
                                  style={{
                                    cursor: "pointer",
                                    position: "absolute",
                                    left: "-5px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "black",
                                    backgroundColor: "#e7e7e7",
                                    border: "none",
                                    padding: "10px",
                                    zIndex: "1000",
                                    height: "8rem",
                                  }}
                                >
                                  &#10094;
                                </Button>
                                <Button
                                  className="next"
                                  onClick={handleNextSlide}
                                  style={{
                                    cursor: "pointer",
                                    position: "absolute",
                                    right: "-5px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "black",
                                    backgroundColor: "#e7e7e7",
                                    border: "none",
                                    padding: "10px",
                                    zIndex: "1000",
                                    height: "8rem",
                                  }}
                                >
                                  &#10095;
                                </Button>
                              </div>
                            </Row>
                          </Col>
                        </Row>
                      </Col>  
                    </div>
                  </Row>
                </Col>
                </div>
                <Col xl={24}>
                  <div className="biz-container">
                    <Row
                      style={{
                        width: "100%",
                        display: "flex",
                        //justifyContent: "center",
                        alignItems: "center",
                        marginTop: "100px",
                        // padding:'0 5px'
                      }}
                    >
                      {apiData &&
                      apiData?.services &&
                      apiData?.services.length > 0 ? (
                        <>
                          <Col xl={24} style={{ padding: "0 5px" }}>
                            <H4 style={{ color: "#72959A" }}>Our services</H4>
                            <Row>
                              <Col xl={24}>
                                <Row
                                  xl={24}
                                  style={{
                                    marginTop: "12px",
                                    gap: "10px",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Col xl={12}>
                                    <Select
                                      value={filterData?.price}
                                      onChange={handlePriceClick}
                                      allowClear
                                      onClear={() => handleClearClick("price")}
                                      style={{
                                        width: "120px",
                                        marginRight: "10px",
                                      }}
                                    >
                                      <Option value="">Price</Option>
                                      {[
                                        "Under $20",
                                        "$20 - $40",
                                        "$40 - $60",
                                        "$60 - $80",
                                        "Above $80",
                                      ].map((item) => (
                                        <Option key={item} value={item}>
                                          {item}
                                        </Option>
                                      ))}
                                    </Select>

                                    <Select
                                      value={filterData?.star}
                                      onChange={handleStarsClick}
                                      allowClear
                                      onClear={() => handleClearClick("star")}
                                      style={{
                                        width: "120px",
                                        marginRight: "10px",
                                      }}
                                    >
                                      <Option value="">Rating</Option>
                                      {[
                                        "5⭐only",
                                        "4⭐& above",
                                        "3⭐& above",
                                        "2⭐& above",
                                        "1⭐& above",
                                      ].map((item, index) => (
                                        <Option
                                          key={5 - index}
                                          value={5 - index}
                                        >
                                          {item}
                                        </Option>
                                      ))}
                                    </Select>
                                  </Col>
                                  <Col
                                    xl={8}
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      gap: "10px",
                                    }}
                                  >
                                    <Col
                                      xl={10}
                                      style={{
                                        display: "flex",
                                        justifyContent: "end",
                                      }}
                                    >
                                      <Select
                                        value={filterData?.sortby}
                                        onChange={handleSortByClick}
                                        allowClear
                                        style={{ width: "150px" }}
                                      >
                                        <Option value="">Sort By</Option>
                                        {[
                                          "Lowest priced first",
                                          "Highest priced first",
                                        ].map((item) => (
                                          <Option key={item} value={item}>
                                            {item}
                                          </Option>
                                        ))}
                                      </Select>
                                    </Col>

                                    <Col
                                      xl={10}
                                      style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        height: "100%",
                                        cursor: "pointer",
                                      }}
                                      onClick={showAllAppointments}
                                    >
                                      {!showAppointment ? (
                                        <Row
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: "16px",
                                            background: "#D3CBF8",
                                            padding: "6px 10px",
                                          }}
                                        >
                                          <Col span={24}>
                                            {" "}
                                            <BodyDemi
                                              style={{
                                                fontSize: "12px",
                                                color: "#ED510C",
                                              }}
                                            >
                                              Appointments only
                                            </BodyDemi>{" "}
                                          </Col>
                                        </Row>
                                      ) : (
                                        <Row
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: "16px",
                                            background:
                                              "linear-gradient(180deg, #4E39B7 0%, #322477 100%)",
                                            padding: "6px 10px",
                                          }}
                                        >
                                          <Col span={24}>
                                            {" "}
                                            <BodyDemi
                                              style={{
                                                fontSize: "12px",
                                                color: "#F2F1F0",
                                              }}
                                            >
                                              Show All
                                            </BodyDemi>{" "}
                                          </Col>
                                        </Row>
                                      )}
                                    </Col>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </Col>

                          <Col xl={24}>
                            <Row gutter={28}>
                              {apiData &&
                                apiData?.services &&
                                apiData?.services.length > 0 &&
                                apiData?.services?.map((item, key) => {
                                  return (
                                    <>
                                      <Col
                                        xl={6}
                                        lg={8}
                                        sm={12}
                                        xs={24}
                                        style={{ display: "flex" }}
                                      >
                                        <ListingCard cardData={item} />
                                      </Col>
                                    </>
                                  );
                                })}
                            </Row>
                          </Col>
                        </>
                      ) : (
                        <></>
                      )}
                    </Row>

                    <Row
                      style={{
                        width: "100%",
                        display: "flex",
                        //justifyContent: "center",
                        alignItems: "center",
                        marginTop: "70px",
                      }}
                    >
                      <Col xl={24} style={{ paddingBottom: "20px" }}>
                        <H4 style={{ color: "#72959A" }}>
                          More
                          <span style={{ color: "#ed510c" }}>
                            {" "}
                            {apiData?.industry}{" "}
                          </span>{" "}
                          service providers you may consider
                        </H4>
                        {apiData &&
                        apiData.similar_businesses &&
                        apiData.similar_businesses.length > 0 ? (
                          <>
                            <Col xl={24}>
                              <Row gutter={0}>
                                {apiData &&
                                  apiData?.similar_businesses &&
                                  apiData?.similar_businesses.length > 0 &&
                                  apiData?.similar_businesses?.map(
                                    (item, key) => {
                                      return (
                                        <>
                                          <Col
                                            xl={6}
                                            lg={6}
                                            sm={12}
                                            xs={24}
                                            style={{
                                              display: "flex",
                                              padding: "0 -20px",
                                            }}
                                          >
                                            <div
                                              style={{
                                                width: "100%",
                                                margin: "8px 0",
                                              }}
                                            >
                                              <div
                                                span={24}
                                                style={CardStyle}
                                                onClick={() =>
                                                  handleCardClick(item.user_id)
                                                }
                                              >
                                                <div
                                                  hoverable
                                                  style={{ height: "100%" }}
                                                >
                                                  <Col>
                                                    <img
                                                      style={{
                                                        width: "100%",
                                                        height: "160px",
                                                        borderRadius: "6px",
                                                        objectFit: "cover",
                                                      }}
                                                      src={
                                                        STORAGE_URL +
                                                        "/images/" +
                                                        JSON.parse(
                                                          item?.service_image
                                                        )[0]
                                                      }
                                                    />
                                                  </Col>

                                                  <Col
                                                    style={{
                                                      color: "black",
                                                      display: "flex",
                                                      justifyContent: "center",
                                                      alignItems: "center",
                                                      position: "relative",
                                                      // top: "-3rem",
                                                    }}
                                                  >
                                                    <div
                                                      style={{
                                                        // backgroundColor:
                                                        // "rgb(225,225,225,0.7)",
                                                        width:
                                                          "calc(100% - 0%)",
                                                        borderRadius: "15px",
                                                        padding: "5px",
                                                        display: "flex",
                                                        justifyContent: "left",
                                                        alignItems:
                                                          "flex-start",
                                                      }}
                                                    >
                                                      <div
                                                        style={{
                                                          paddingRight: "5px",
                                                        }}
                                                      >
                                                        <img
                                                          style={{
                                                            borderRadius: "50%",
                                                          }}
                                                          src={
                                                            STORAGE_URL +
                                                            "/images/" +
                                                            item?.logo_image
                                                              ?.filename
                                                          }
                                                          className="logo"
                                                          width={"50px"}
                                                          height={"50px"}
                                                        ></img>
                                                      </div>
                                                      <div>
                                                        <h2>
                                                          {item?.title ||
                                                            "no data"}
                                                        </h2>

                                                        <Col
                                                          xl={24}
                                                          md={24}
                                                          style={{
                                                            padding: "0",
                                                            paddingTop: ".2rem",
                                                          }}
                                                        >
                                                          <Image
                                                            src={LocationIcon}
                                                          ></Image>
                                                          {item &&
                                                            item?.locations &&
                                                            item?.locations
                                                              .length > 0 &&
                                                            item?.locations?.map(
                                                              (itm, index) => {
                                                                return (
                                                                  <>
                                                                    {index >
                                                                      0 &&
                                                                      " | "}{" "}
                                                                    {itm.name}
                                                                  </>
                                                                );
                                                              }
                                                            )}
                                                        </Col>
                                                      </div>
                                                    </div>
                                                  </Col>
                                                </div>
                                              </div>
                                            </div>
                                          </Col>
                                        </>
                                      );
                                    }
                                  )}
                              </Row>
                            </Col>
                          </>
                        ) : (
                          <></>
                        )}
                      </Col>
                    </Row>
                  </div>
                </Col>
              
            </Row>
          ) : (
            <>
              {apiData?.banner_style === "split_screen" ? (
                <Row style={{ width: "100%" }}>
                  <Col xl={24} md={24} sm={24}>
                    <SearchHeader />
                  </Col>

                  <Col
                    style={{
                      width: "100%",
                      height: "fit-content",

                      backgroundColor: `${apiData?.theme_color}`,
                    }}
                  >
                    <div className="biz-container">
                      <Row style={{ justifyContent: "space-between" }}>
                        <Col
                          md={11}
                          sm={24}
                          span={24}
                          style={{ paddingTop: "2rem" }}
                        >
                          {apiData?.logo === null ? (
                            <img
                              style={{ borderRadius: "50%" }}
                              src={`${
                                STORAGE_URL +
                                "/images/" +
                                apiData?.image?.filename
                              }`}
                              className="logo"
                              width={"100px"}
                              height={"100px"}
                            ></img>
                          ) : (
                            <img
                              style={{ borderRadius: "50%" }}
                              src={`${
                                STORAGE_URL + "/storefront/" + apiData?.logo
                              }`}
                              className="logo"
                              width={"100px"}
                              height={"100px"}
                            ></img>
                          )}
                          <div>
                            <h2 style={{ marginBottom: "15px" }}>
                              {apiData?.title || "no data"}
                            </h2>
                            <p
                              style={{
                                marginBottom: "15px",
                                backgroundColor: "#ED510C",
                                width: "fit-content",
                                padding: "7px 13px",
                                borderRadius: "50px",
                                display: "flex",
                                alignContent: "center",
                                fontSize: "12px",
                                color: "white",
                              }}
                              className="premium-p premium"
                            >
                              <TbAward size={20} style={{ color: "white" }} />{" "}
                              {apiData?.plan_name} vendor
                            </p>
                            <p
                              style={{ marginBottom: "15px" }}
                              className="location-text-call"
                            >
                              <LuMapPin className="icons" />
                              {apiData &&
                                apiData?.locations &&
                                apiData?.locations.length > 0 &&
                                apiData?.locations?.map((item, index) => {
                                  return (
                                    <>
                                      {index > 0 && " | "} {item.name}
                                    </>
                                  );
                                })}
                            </p>
                            <p
                              style={{ marginBottom: "15px" }}
                              className="premium-p"
                            >
                              4.8 <IoStar className="icons" />{" "}
                              <IoStar className="icons" />{" "}
                              <IoStar className="icons" />{" "}
                              <IoStar className="icons" />{" "}
                              <IoStar className="icons" /> 376 Ratings{" "}
                              <FaRegHeart />{" "}
                            </p>
                            <p
                              style={{ marginBottom: "15px" }}
                              className="location-text-call"
                            >
                              {apiData?.description || "no data"}
                            </p>
                            <p
                              style={{
                                marginBottom: "15px",
                                fontWeight: 600,
                                fontSize: "14px",
                              }}
                              className="location-text-call"
                            >
                              {/* <IoCall className="icons" /> +65{" "}
                              {apiData?.phone || "no data"} */}
                              <Image src={CallIcon} alt="Call Icon" />
                              <BodySmallBold
                                onClick={handleClick}
                                style={{ cursor: "pointer" }}
                              >
                                <a
                                  href={`tel:+65${phoneNumber}`}
                                  style={{
                                    color: "inherit",
                                    textDecoration: "none",
                                  }}
                                >
                                  +65 {phoneNumber}
                                </a>
                              </BodySmallBold>
                            </p>
                            <p style={{ marginBottom: "15px" }}>
                              <AiOutlineInstagram
                                style={{
                                  backgroundColor: "#ED510C",
                                  margin: "3px",
                                  padding: "5px",
                                  width: "30px",
                                  height: "30px",
                                  borderRadius: "10px",
                                  color: "white",
                                }}
                              />
                              <FiFacebook
                                style={{
                                  backgroundColor: "#ED510C",
                                  margin: "3px",
                                  padding: "5px",
                                  width: "30px",
                                  height: "30px",
                                  borderRadius: "10px",
                                  color: "white",
                                }}
                              />
                              <FiYoutube
                                style={{
                                  backgroundColor: "#ED510C",
                                  margin: "3px",
                                  padding: "5px",
                                  width: "30px",
                                  height: "30px",
                                  borderRadius: "10px",
                                  color: "white",
                                }}
                              />
                            </p>
                          </div>
                        </Col>
                        <Col
                          md={11}
                          sm={24}
                          span={24}
                          style={{ position: "relative", top: "4rem" }}
                        >
                          {apiData?.banner_image !== null ? (
                            <Carousel autoplay>
                              {BannerImageArray?.map((preview, index) => (
                                <div
                                  key={index}
                                  style={{
                                    textAlign: "center",
                                    height: "150px",
                                    lineHeight: "150px",
                                    background: "#364d79",
                                    borderRadius: "10px",
                                  }}
                                >
                                  <img
                                    src={`${
                                      STORAGE_URL +
                                      "/storefront/" +
                                      `${preview}`
                                    }`}
                                    width={"100%"}
                                    height={"350px"}
                                    alt={`preview-${index}`}
                                    style={{
                                      borderRadius: "10px",
                                      objectFit: "cover",
                                    }}
                                  />
                                </div>
                              ))}
                            </Carousel>
                          ) : (
                            <div
                              key={index}
                              style={{
                                textAlign: "center",
                                height: "150px",
                                lineHeight: "150px",
                                background: "#364d79",
                                borderRadius: "10px",
                              }}
                            >
                              <img
                                src={
                                  STORAGE_URL +
                                  "/images/" +
                                  `${apiData?.service_image}`
                                }
                                width={"100%"}
                                height={"350px"}
                                alt={`preview-${index}`}
                                style={{
                                  borderRadius: "10px",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          )}
                        </Col>
                      </Row>
                      <Row
                        style={{
                          paddingBottom: "20px",
                          //marginRight: "110px",
                          marginTop: "20px",
                          display: "block ",
                          padding: "10px 0px",
                        }}
                      >
                        <div className="split-slider">
                          <H2 style={{ color: "white" }}>Our Professionals</H2>
                          <br />

                          {apiData &&
                            apiData.resources &&
                            apiData.resources.length > 0 && (
                              <Row
                                style={{
                                  display: "flex",
                                  gap: ".5rem",
                                  // justifyContent: "center",
                                }}
                              >
                                <div
                                  className="slider"
                                  style={{
                                    position: "relative",
                                    width: "100%",
                                    overflow: "hidden",
                                    // display: "flex",

                                    // justifyContent: "center",
                                  }}
                                >
                                  {showSlider ? (
                                    <>
                                      <div
                                        className="slides"
                                        style={{
                                          display: "flex",
                                          //justifyContent: "center",
                                          transition:
                                            "transform 0.5s ease-in-out",
                                          transform: `translateX(-${
                                            premiumCurrentIndex *
                                            slideWidthPercentage
                                          }%)`,
                                          padding: "0 20px",
                                        }}
                                      >
                                        {apiData.resources.map(
                                          (item, index) => (
                                            <div
                                              className="slide"
                                              key={index}
                                              style={{
                                                minWidth: "180px",
                                                width: "100%",
                                                paddingLeft: "10px",
                                                paddingRight: "10px",
                                              }}
                                            >
                                              <Col
                                                style={{
                                                  textAlign: "center",
                                                  background:
                                                    "rgb(247 246 245 / 50%)",
                                                  padding: "10px 5px",
                                                  borderRadius: "5px",
                                                }}
                                              >
                                                <Image
                                                  src={
                                                    STORAGE_URL +
                                                    "/images/" +
                                                    item?.["feature_image"]
                                                      ?.filename
                                                  }
                                                  width={55}
                                                  height={55}
                                                  style={{
                                                    objectFit: "cover",
                                                    borderRadius: "50%",
                                                  }}
                                                  alt="No Image Preview"
                                                ></Image>
                                                <BodySmallBold
                                                  style={{ fontSize: "0.8rem" }}
                                                >
                                                  {item?.name
                                                    ? item?.name.length > 16
                                                      ? item.name.slice(0, 12) +
                                                        "..."
                                                      : item.name
                                                    : "no data"}
                                                </BodySmallBold>
                                                <BodyTiny>
                                                  {item?.designation
                                                    ? item?.designation.length >
                                                      17
                                                      ? item.designation.slice(
                                                          0,
                                                          14
                                                        ) + "..."
                                                      : item.designation
                                                    : "no data"}
                                                </BodyTiny>
                                              </Col>
                                            </div>
                                          )
                                        )}
                                        {apiData.resources.map(
                                          (item, index) => (
                                            <div
                                              className="slide"
                                              key={index}
                                              style={{
                                                minWidth: "180px",
                                                width: "100%",
                                                paddingLeft: "10px",
                                                paddingRight: "10px",
                                              }}
                                            >
                                              <Col
                                                style={{
                                                  textAlign: "center",
                                                  background:
                                                    "rgb(247 246 245 / 50%)",
                                                  padding: "10px 5px",
                                                  borderRadius: "5px",
                                                }}
                                              >
                                                <Image
                                                  src={
                                                    STORAGE_URL +
                                                    "/images/" +
                                                    item?.["feature_image"]
                                                      ?.filename
                                                  }
                                                  width={55}
                                                  height={55}
                                                  style={{
                                                    objectFit: "cover",
                                                    borderRadius: "50%",
                                                  }}
                                                  alt="No Image Preview"
                                                ></Image>
                                                <BodySmallBold
                                                  style={{ fontSize: "0.8rem" }}
                                                >
                                                  {item?.name
                                                    ? item?.name.length > 16
                                                      ? item.name.slice(0, 12) +
                                                        "..."
                                                      : item.name
                                                    : "no data"}
                                                </BodySmallBold>
                                                <BodyTiny>
                                                  {item?.designation
                                                    ? item?.designation.length >
                                                      17
                                                      ? item.designation.slice(
                                                          0,
                                                          14
                                                        ) + "..."
                                                      : item.designation
                                                    : "no data"}
                                                </BodyTiny>
                                              </Col>
                                            </div>
                                          )
                                        )}
                                      </div>
                                      <button
                                        className="prev"
                                        onClick={premiumPrevSlide}
                                        style={{
                                          position: "absolute",
                                          left: "0px",
                                          top: "40%",
                                          color: "rgb(237, 81, 12)",
                                        }}
                                      >
                                        &#10094;
                                      </button>
                                      <button
                                        className="next"
                                        onClick={premiumNextSlide}
                                        style={{
                                          position: "absolute",
                                          right: "0",
                                          top: "40%",
                                          color: "rgb(237, 81, 12)",
                                        }}
                                      >
                                        &#10095;
                                      </button>
                                    </>
                                  ) : (
                                    <div
                                      className="slides"
                                      style={{
                                        display: "flex",
                                        // justifyContent: "center",
                                        transition:
                                          "transform 0.5s ease-in-out",
                                        transform: `translateX(-${
                                          premiumCurrentIndex * 100
                                        }%)`,
                                      }}
                                    >
                                      {apiData.resources.map((item, index) => (
                                        <div
                                          className="slide"
                                          key={index}
                                          style={{
                                            maxWidth: "180px",
                                            width: "100%",
                                            //  paddingLeft: "10px",

                                            paddingRight: "10px",
                                          }}
                                        >
                                          <Col
                                            style={{
                                              textAlign: "center",
                                              background:
                                                "rgb(241 246 245 / 50%)",
                                              padding: "10px 5px",
                                              borderRadius: "5px",
                                              display: "flex",
                                              flexDirection: " column",
                                              justifyContent: "center",
                                              alignItems: "center",
                                            }}
                                          >
                                            <Image
                                              src={
                                                STORAGE_URL +
                                                "/images/" +
                                                item?.["feature_image"]
                                                  ?.filename
                                              }
                                              width={55}
                                              height={55}
                                              style={{
                                                objectFit: "cover",
                                                borderRadius: "50%",
                                              }}
                                              alt="No Image Preview"
                                            ></Image>
                                            <BodySmallBold
                                              style={{ fontSize: "0.8rem" }}
                                            >
                                              {item?.name
                                                ? item?.name.length > 16
                                                  ? item.name.slice(0, 12) +
                                                    "..."
                                                  : item.name
                                                : "no data"}
                                            </BodySmallBold>
                                            <BodyTiny>
                                              {item?.designation
                                                ? item?.designation.length > 17
                                                  ? item.designation.slice(
                                                      0,
                                                      14
                                                    ) + "..."
                                                  : item.designation
                                                : "no data"}
                                            </BodyTiny>
                                          </Col>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </Row>
                            )}

                          {/* {apiData &&
                          apiData?.resources &&
                          apiData?.resources.length > 0 && (
                            <Row
                              style={{
                                display: "flex",
                                gap: ".5rem",
                                justifyContent: "center",
                              }}
                            >
                              {apiData?.resources.length > 3 ? (
                                <div
                                  className="slider"
                                  style={{
                                    position: "relative",
                                    width: "100%",
                                    overflow: "hidden",
                                  }}
                                >
                                  <div
                                    className="slides"
                                    style={{
                                      display: "flex",
                                      transition: "transform 0.3s ease-in-out",
                                      transform: `translateX(-${
                                        premiumCurrentIndex *100
                                      }%)`,
                                    }}
                                  >
                                    {apiData.resources.map((item, index) => (
                                      <div
                                        className="slide"
                                        key={index}
                                        style={{
                                          minWidth: "140px",
                                          paddingLeft: "10px",
                                          paddingRight: "10px",
                                        }}
                                      >
                                        <Col
                                          style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            flexDirection: "column",
                                            background: "#F7F6F5",
                                            padding: "5px",
                                            borderRadius: "5px",
                                          }}
                                        >
                                          <Image
                                            src={
                                              STORAGE_URL +
                                              "/images/" +
                                              item?.["feature_image"]?.filename
                                            }
                                            width={45}
                                            height={45}
                                            style={{
                                              objectFit: "cover",
                                              borderRadius: "50%",
                                            }}
                                            alt="No Image Preview"
                                          ></Image>
                                          <BodySmallBold
                                            style={{ fontSize: "0.8rem" }}
                                          >
                                            {item?.name || "no data"}
                                          </BodySmallBold>
                                          <BodyTiny>
                                            {item?.designation || "no data"}
                                          </BodyTiny>
                                        </Col>
                                      </div>
                                    ))}
                                    
                                  </div>
                                  <button
                                    className="prev"
                                    onClick={premiumPrevSlide}
                                    style={{
                                      cursor: "pointer",
                                      position: "absolute",
                                      left: "0",
                                      top: "0",
                                      bottom: "0",
                                      height: "100%",
                                      width: "20px",
                                      color: "red",
                                      border: "none",
                                      backgroundColor: "transparent",
                                    }}
                                  >
                                    &#10094;
                                  </button>
                                  <button
                                    className="next"
                                    onClick={premiumNextSlide}
                                    style={{
                                      cursor: "pointer",
                                      position: "absolute",
                                      right: "0",
                                      top: "0",
                                      bottom: "0",
                                      height: "100%",
                                      width: "20px",
                                      color: "red",
                                      border: "none",
                                      backgroundColor: "transparent",
                                    }}
                                  >
                                    &#10095;
                                  </button>
                                </div>
                              ) : (
                                apiData.resources.map((item, index) => (
                                  <div
                                    className="slide"
                                    key={index}
                                    style={{
                                      minWidth: "220px",
                                      paddingLeft: "10px",
                                      paddingRight: "10px",
                                    }}
                                  >
                                    <Col
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "column",
                                        background: "#F7F6F5",
                                        padding: "5px",
                                        borderRadius: "5px",
                                      }}
                                    >
                                      <Image
                                        src={
                                          STORAGE_URL +
                                          "/images/" +
                                          item?.["feature_image"]?.filename
                                        }
                                        width={80}
                                        height={80}
                                        style={{ objectFit: "cover" }}
                                        alt="No Image Preview"
                                      ></Image>
                                      <BodySmallBold>
                                        {item?.name || "no data"}
                                      </BodySmallBold>
                                      <BodyTiny>
                                        {item?.designation || "no data"}
                                      </BodyTiny>
                                    </Col>
                                  </div>
                                ))
                              )}
                            </Row>
                          )} */}
                        </div>
                      </Row>
                    </div>
                  </Col>

                  <Col xl={24}>
                    <div className="biz-container">
                      <Row
                        style={{
                          width: "100%",
                          display: "flex",
                          // justifyContent: "center",
                          alignItems: "center",
                          marginTop: "70px",
                        }}
                      >
                        {apiData &&
                        apiData?.services &&
                        apiData?.services.length > 0 ? (
                          <>
                            <Col xl={24}>
                              <H4 style={{ color: "#72959A" }}>Our services</H4>
                              <Row>
                                <Col xl={24}>
                                  <Row
                                    xl={24}
                                    style={{
                                      marginTop: "12px",
                                      gap: "10px",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Col xl={12}>
                                      <Select
                                        value={filterData?.price}
                                        onChange={handlePriceClick}
                                        allowClear
                                        onClear={() =>
                                          handleClearClick("price")
                                        }
                                        style={{
                                          width: "120px",
                                          marginRight: "10px",
                                        }}
                                      >
                                        <Option value="">Price</Option>
                                        {[
                                          "Under $20",
                                          "$20 - $40",
                                          "$40 - $60",
                                          "$60 - $80",
                                          "Above $80",
                                        ].map((item) => (
                                          <Option key={item} value={item}>
                                            {item}
                                          </Option>
                                        ))}
                                      </Select>

                                      <Select
                                        value={filterData?.star}
                                        onChange={handleStarsClick}
                                        allowClear
                                        onClear={() => handleClearClick("star")}
                                        style={{
                                          width: "120px",
                                          marginRight: "10px",
                                        }}
                                      >
                                        <Option value="">Rating</Option>
                                        {[
                                          "5⭐only",
                                          "4⭐& above",
                                          "3⭐& above",
                                          "2⭐& above",
                                          "1⭐& above",
                                        ].map((item, index) => (
                                          <Option
                                            key={5 - index}
                                            value={5 - index}
                                          >
                                            {item}
                                          </Option>
                                        ))}
                                      </Select>
                                    </Col>
                                    <Col
                                      xl={8}
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: "10px",
                                        justifyContent: 'flex-end'
                                      }}
                                    >
                                      <Col
                                        xl={10}
                                        style={{
                                          display: "flex",
                                          justifyContent: "end",
                                        }}
                                      >
                                        <Select
                                          value={filterData?.sortby}
                                          onChange={handleSortByClick}
                                          allowClear
                                          style={{ width: "150px" }}
                                        >
                                          <Option value="">Sort By</Option>
                                          {[
                                            "Lowest priced first",
                                            "Highest priced first",
                                          ].map((item) => (
                                            <Option key={item} value={item}>
                                              {item}
                                            </Option>
                                          ))}
                                        </Select>
                                      </Col>

                                      <Col
                                        xl={10}
                                        style={{
                                          display: "flex",
                                          justifyContent: "flex-end",
                                          height: "100%",
                                          cursor: "pointer",
                                        }}
                                        onClick={showAllAppointments}
                                      >
                                        {!showAppointment ? (
                                          <Row
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "center",
                                              borderRadius: "16px",
                                              background: "#D3CBF8",
                                              padding: "6px 10px",
                                            }}
                                          >
                                            <Col span={24}>
                                              {" "}
                                              <BodyDemi
                                                style={{
                                                  fontSize: "12px",
                                                  color: "#ED510C",
                                                }}
                                              >
                                                Appointments only
                                              </BodyDemi>{" "}
                                            </Col>
                                          </Row>
                                        ) : (
                                          <Row
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "center",
                                              borderRadius: "16px",
                                              background:
                                                "linear-gradient(180deg, #4E39B7 0%, #322477 100%)",
                                              padding: "6px 10px",
                                            }}
                                          >
                                            <Col span={24}>
                                              {" "}
                                              <BodyDemi
                                                style={{
                                                  fontSize: "12px",
                                                  color: "#F2F1F0",
                                                }}
                                              >
                                                Show All
                                              </BodyDemi>{" "}
                                            </Col>
                                          </Row>
                                        )}
                                      </Col>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>

                            <Col xl={24}>
                              <Row gutter={28}>
                                {apiData &&
                                  apiData?.services &&
                                  apiData?.services.length > 0 &&
                                  apiData?.services?.map((item, key) => {
                                    return (
                                      <>
                                        <Col
                                          xl={6}
                                          lg={8}
                                          sm={12}
                                          xs={24}
                                          style={{ display: "flex" }}
                                        >
                                          <ListingCard cardData={item} />
                                        </Col>
                                      </>
                                    );
                                  })}
                              </Row>
                            </Col>
                          </>
                        ) : (
                          <></>
                        )}
                      </Row>

                      <Row
                        style={{
                          width: "100%",
                          display: "flex",
                          //justifyContent: "center",
                          alignItems: "center",
                          marginTop: "70px",
                        }}
                      >
                        <Col xl={24} style={{ paddingBottom: "20px" }}>
                          <H4 style={{ color: "#72959A" }}>
                            More
                            <span style={{ color: "#ed510c" }}>
                              {" "}
                              {apiData?.industry}{" "}
                            </span>{" "}
                            service providers you may consider
                          </H4>
                          {apiData &&
                          apiData.similar_businesses &&
                          apiData.similar_businesses.length > 0 ? (
                            <>
                              <Col xl={24}>
                                <Row gutter={0}>
                                  {apiData &&
                                    apiData?.similar_businesses &&
                                    apiData?.similar_businesses.length > 0 &&
                                    apiData?.similar_businesses?.map(
                                      (item, key) => {
                                        return (
                                          <>
                                            <Col
                                              xl={6}
                                              lg={6}
                                              sm={12}
                                              xs={24}
                                              style={{
                                                display: "flex",
                                                padding: "0 -20px",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  width: "100%",
                                                  margin: "8px 0",
                                                }}
                                              >
                                                <div
                                                  span={24}
                                                  style={CardStyle}
                                                  onClick={() =>
                                                    handleCardClick(
                                                      item.user_id
                                                    )
                                                  }
                                                >
                                                  <div
                                                    hoverable
                                                    style={{ height: "100%" }}
                                                  >
                                                    <Col>
                                                      <img
                                                        style={{
                                                          width: "100%",
                                                          height: "160px",
                                                          borderRadius: "6px",
                                                          objectFit: "cover",
                                                        }}
                                                        src={
                                                          STORAGE_URL +
                                                          "/images/" +
                                                          JSON.parse(
                                                            item?.service_image
                                                          )[0]
                                                        }
                                                      />
                                                    </Col>

                                                    <Col
                                                      style={{
                                                        color: "black",
                                                        display: "flex",
                                                        justifyContent:
                                                          "center",
                                                        alignItems: "center",
                                                        position: "relative",
                                                        // top: "-3rem",
                                                      }}
                                                    >
                                                      <div
                                                        style={{
                                                          // backgroundColor:
                                                          // "rgb(225,225,225,0.7)",
                                                          width:
                                                            "calc(100% - 0%)",
                                                          borderRadius: "15px",
                                                          padding: "5px",
                                                          display: "flex",
                                                          justifyContent:
                                                            "left",
                                                          alignItems:
                                                            "flex-start",
                                                        }}
                                                      >
                                                        <div
                                                          style={{
                                                            paddingRight: "5px",
                                                          }}
                                                        >
                                                          <img
                                                            style={{
                                                              borderRadius:
                                                                "50%",
                                                            }}
                                                            src={
                                                              STORAGE_URL +
                                                              "/images/" +
                                                              item?.logo_image
                                                                ?.filename
                                                            }
                                                            className="logo"
                                                            width={"50px"}
                                                            height={"50px"}
                                                          ></img>
                                                        </div>
                                                        <div>
                                                          <h2>
                                                            {item?.title ||
                                                              "no data"}
                                                          </h2>

                                                          <Col
                                                            xl={24}
                                                            md={24}
                                                            style={{
                                                              padding: "0",
                                                              paddingTop:
                                                                ".2rem",
                                                            }}
                                                          >
                                                            <Image
                                                              src={LocationIcon}
                                                            ></Image>
                                                            {item &&
                                                              item?.locations &&
                                                              item?.locations
                                                                .length > 0 &&
                                                              item?.locations?.map(
                                                                (
                                                                  itm,
                                                                  index
                                                                ) => {
                                                                  return (
                                                                    <>
                                                                      {index >
                                                                        0 &&
                                                                        " | "}{" "}
                                                                      {itm.name}
                                                                    </>
                                                                  );
                                                                }
                                                              )}
                                                          </Col>
                                                        </div>
                                                      </div>
                                                    </Col>
                                                  </div>
                                                </div>
                                              </div>
                                            </Col>
                                          </>
                                        );
                                      }
                                    )}
                                </Row>
                              </Col>
                            </>
                          ) : (
                            <></>
                          )}
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col>
                    <Row style={{ height: "600px" }}>
                      {/* <div className="biz-container"> */}
                      <div
                        style={{
                          width: "100%",
                          hight: "300px",
                          display: "block",
                        }}
                      >
                        {apiData?.banner_image !== null ? (
                          <Carousel autoplay style={{ objectFit: "cover" }}>
                            {BannerImageArray?.map((preview, index) => (
                              <div
                                key={index}
                                style={{
                                  textAlign: "center",
                                  height: "300px",
                                  lineHeight: "150px",
                                }}
                              >
                                <img
                                  src={`${
                                    STORAGE_URL + "/storefront/" + preview
                                  }`}
                                  width={"100%"}
                                  height={"690px"}
                                  style={{
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                    objectFit: "cover",
                                  }}
                                  alt={`preview-${index}`}
                                />
                                <div
                                  style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    background:
                                      "linear-gradient(to bottom, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05))",
                                    zIndex: 2,
                                  }}
                                ></div>
                              </div>
                            ))}
                          </Carousel>
                        ) : (
                          <div
                            style={{
                              textAlign: "center",
                              height: "90vh",
                              width: "99vw",
                              lineHeight: "150px",
                              background: "#364d79",
                              borderRadius: "10px",
                            }}
                          >
                            <img
                              src={
                                STORAGE_URL +
                                "/images/" +
                                `${apiData?.service_image}`
                              }
                              width={"100%"}
                              height={"100%"}
                              style={{
                                borderRadius: "10px",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        )}
                      </div>
                      <div style={textStyle}>
                        <div className="biz-container">
                          <Col
                            md={11}
                            sm={24}
                            span={24}
                            style={{ paddingTop: "1rem" }}
                          >
                            {apiData?.logo === null ? (
                              <img
                                style={{ borderRadius: "50%" }}
                                src={`${
                                  STORAGE_URL +
                                  "/images/" +
                                  apiData?.image?.filename
                                }`}
                                className="logo"
                                width={"100px"}
                                height={"100px"}
                              ></img>
                            ) : (
                              <img
                                style={{ borderRadius: "50%" }}
                                src={`${
                                  STORAGE_URL + "/storefront/" + apiData?.logo
                                }`}
                                className="logo"
                                width={"100px"}
                                height={"100px"}
                              ></img>
                            )}
                            <div>
                              <h2
                                style={{
                                  marginBottom: "15px",
                                  paddingLeft: "-15px",
                                  color: "white",
                                }}
                              >
                                {apiData?.title || "no data"}
                              </h2>
                              <p
                                style={{
                                  marginBottom: "15px",
                                  backgroundColor: "#ED510C",
                                  width: "fit-content",
                                  padding: "7px 13px",
                                  borderRadius: "50px",
                                  display: "flex",
                                  alignContent: "center",
                                  fontSize: "12px",
                                  color: "white",
                                }}
                                className="premium-p premium"
                              >
                                <TbAward size={20} /> {apiData?.plan_name}{" "}
                                vendor
                              </p>
                              <p
                                style={{ marginBottom: "15px", color: "white" }}
                                className="location-text-call"
                              >
                                <LuMapPin className="icons" />
                                {apiData &&
                                  apiData?.locations &&
                                  apiData?.locations.length > 0 &&
                                  apiData?.locations?.map((item, index) => {
                                    return (
                                      <>
                                        {index > 0 && " | "} {item.name}
                                      </>
                                    );
                                  })}
                              </p>
                              <p
                                style={{ marginBottom: "15px", color: "white" }}
                                className="premium-p"
                              >
                                4.8 <IoStar className="icons" />{" "}
                                <IoStar className="icons" />{" "}
                                <IoStar className="icons" />{" "}
                                <IoStar className="icons" />{" "}
                                <IoStar className="icons" /> 376 Ratings{" "}
                                <FaRegHeart />{" "}
                              </p>
                              <p
                                style={{ marginBottom: "15px", color: "white" }}
                                className="location-text-call"
                              >
                                {apiData?.description || "no data"}
                              </p>
                              <p
                                style={{
                                  marginBottom: "15px",
                                  fontWeight: 600,
                                  fontSize: "14px",
                                  color: "white",
                                }}
                                className="location-text-call"
                              >
                                {/* <IoCall className="icons" /> +65{" "}
                                {apiData?.phone || "no data"} */}
                                <Image src={CallIcon} alt="Call Icon" />
                                <BodySmallBold
                                  onClick={handleClick}
                                  style={{ cursor: "pointer" }}
                                >
                                  <a
                                    href={`tel:+65${phoneNumber}`}
                                    style={{
                                      color: "inherit",
                                      textDecoration: "none",
                                    }}
                                  >
                                    +65 {phoneNumber}
                                  </a>
                                </BodySmallBold>
                              </p>
                              <p style={{ marginBottom: "15px" }}>
                                <AiOutlineInstagram
                                  style={{
                                    backgroundColor: "#ED510C",
                                    margin: "3px",
                                    padding: "5px",
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "10px",
                                    color: "white",
                                  }}
                                />
                                <FiFacebook
                                  style={{
                                    backgroundColor: "#ED510C",
                                    margin: "3px",
                                    padding: "5px",
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "10px",
                                    color: "white",
                                  }}
                                />
                                <FiYoutube
                                  style={{
                                    backgroundColor: "#ED510C",
                                    margin: "3px",
                                    padding: "5px",
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "10px",
                                    color: "white",
                                  }}
                                />
                              </p>
                            </div>
                            <br />
                          </Col>
                          <Col
                            md={11}
                            sm={24}
                            span={24}
                            style={{ paddingTop: "1rem" }}
                          ></Col>
                          {apiData?.show_professionals === 1 ? (
                            <div
                              style={{ padding: "10px 0px", maxWidth: "100%" }}
                            >
                              {apiData &&
                                apiData.resources &&
                                apiData.resources.length > 0 && (
                                  <Row
                                    style={{
                                      display: "flex",
                                      gap: ".5rem",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <div
                                      className="slider"
                                      style={{
                                        position: "relative",
                                        width: "100%",
                                        overflow: "hidden",
                                        //justifyContent: "center",
                                        display: "flex",
                                      }}
                                    >
                                      {showSlider ? (
                                        <>
                                          <div
                                            className="slides"
                                            style={{
                                              display: "flex",
                                              transition:
                                                "transform 0.5s ease-in-out",
                                              transform: `translateX(-${
                                                currentIndex *
                                                slideWidthPercentage
                                              }%)`,
                                              padding: "0 20px",
                                            }}
                                          >
                                            {apiData.resources.map(
                                              (item, index) => (
                                                <div
                                                  className="slide"
                                                  key={index}
                                                  style={{
                                                    minWidth: "180px",
                                                    width: "100%",
                                                    paddingLeft: "10px",
                                                    paddingRight: "10px",
                                                  }}
                                                >
                                                  <Col
                                                    style={{
                                                      textAlign: "center",
                                                      background:
                                                        "rgb(247 246 245 / 50%)",
                                                      // opacity: '0.5',
                                                      padding: "10px 5px",
                                                      borderRadius: "5px",
                                                      display: "flex",
                                                      flexDirection: " column",
                                                      justifyContent: "center",
                                                      alignItems: "center",
                                                    }}
                                                  >
                                                    <Image
                                                      src={
                                                        STORAGE_URL +
                                                        "/images/" +
                                                        item?.["feature_image"]
                                                          ?.filename
                                                      }
                                                      width={55}
                                                      height={55}
                                                      style={{
                                                        objectFit: "cover",
                                                        borderRadius: "50%",
                                                      }}
                                                      alt="No Image Preview"
                                                    ></Image>
                                                    <BodySmallBold
                                                      style={{
                                                        fontSize: "0.8rem",
                                                      }}
                                                    >
                                                      {item?.name
                                                        ? item?.name.length > 16
                                                          ? item.name.slice(
                                                              0,
                                                              12
                                                            ) + "..."
                                                          : item.name
                                                        : "no data"}
                                                    </BodySmallBold>
                                                    <BodyTiny>
                                                      {/* {item?.designation || "no data"} */}
                                                      {item?.designation
                                                        ? item?.designation
                                                            .length > 17
                                                          ? item.designation.slice(
                                                              0,
                                                              14
                                                            ) + "..."
                                                          : item.designation
                                                        : "no data"}
                                                    </BodyTiny>
                                                  </Col>
                                                </div>
                                              )
                                            )}
                                            {apiData.resources.map(
                                              (item, index) => (
                                                <div
                                                  className="slide"
                                                  key={index}
                                                  style={{
                                                    minWidth: "180px",
                                                    width: "100%",
                                                    paddingLeft: "10px",
                                                    paddingRight: "10px",
                                                  }}
                                                >
                                                  <Col
                                                    style={{
                                                      textAlign: "center",
                                                      background:
                                                        "rgb(247 246 245 / 50%)",
                                                      padding: "10px 5px",
                                                      borderRadius: "5px",
                                                      display: "flex",
                                                      flexDirection: " column",
                                                      justifyContent: "center",
                                                      alignItems: "center",
                                                    }}
                                                  >
                                                    <Image
                                                      src={
                                                        STORAGE_URL +
                                                        "/images/" +
                                                        item?.["feature_image"]
                                                          ?.filename
                                                      }
                                                      width={55}
                                                      height={55}
                                                      style={{
                                                        objectFit: "cover",
                                                        borderRadius: "50%",
                                                      }}
                                                      alt="No Image Preview"
                                                    ></Image>
                                                    <BodySmallBold
                                                      style={{
                                                        fontSize: "0.8rem",
                                                      }}
                                                    >
                                                      {item?.name
                                                        ? item?.name.length > 16
                                                          ? item.name.slice(
                                                              0,
                                                              12
                                                            ) + "..."
                                                          : item.name
                                                        : "no data"}
                                                    </BodySmallBold>
                                                    <BodyTiny>
                                                      {/* {item?.designation || "no data"} */}
                                                      {item?.designation
                                                        ? item?.designation
                                                            .length > 17
                                                          ? item.designation.slice(
                                                              0,
                                                              14
                                                            ) + "..."
                                                          : item.designation
                                                        : "no data"}
                                                    </BodyTiny>
                                                  </Col>
                                                </div>
                                              )
                                            )}
                                          </div>
                                          <button
                                            className="prev"
                                            onClick={prevSlide}
                                            style={{
                                              position: "absolute",
                                              left: "0px",
                                              top: "40%",
                                              color: "rgb(237, 81, 12)",
                                            }}
                                          >
                                            &#10094;
                                          </button>
                                          <button
                                            className="next"
                                            onClick={nextSlide}
                                            style={{
                                              position: "absolute",
                                              right: "0",
                                              top: "40%",
                                              color: "rgb(237, 81, 12)",
                                            }}
                                          >
                                            &#10095;
                                          </button>
                                        </>
                                      ) : (
                                        <div
                                          className="slides"
                                          style={{
                                            display: "flex",
                                            transition:
                                              "transform 0.5s ease-in-out",
                                            transform: `translateX(-${
                                              premiumCurrentIndex * 100
                                            }%)`,
                                          }}
                                        >
                                          {apiData.resources.map(
                                            (item, index) => (
                                              <div
                                                className="slide"
                                                key={index}
                                                style={{
                                                  minWidth: "180px",
                                                  width: "100%",
                                                  //  paddingLeft: "10px",
                                                  paddingRight: "10px",
                                                }}
                                              >
                                                <Col
                                                  style={{
                                                    textAlign: "center",
                                                    background:
                                                      "rgb(247 246 245 / 50%)",
                                                    padding: "10px 5px",
                                                    borderRadius: "5px",
                                                    display: "flex",
                                                    flexDirection: " column",
                                                    // justifyContent: 'space-between',
                                                    alignItems: "center",
                                                  }}
                                                >
                                                  <Image
                                                    src={
                                                      STORAGE_URL +
                                                      "/images/" +
                                                      item?.["feature_image"]
                                                        ?.filename
                                                    }
                                                    width={55}
                                                    height={55}
                                                    style={{
                                                      objectFit: "cover",
                                                      borderRadius: "50%",
                                                    }}
                                                    alt="No Image Preview"
                                                  ></Image>
                                                  <BodySmallBold
                                                    style={{
                                                      fontSize: "0.8rem",
                                                    }}
                                                  >
                                                    {item?.name
                                                      ? item?.name.length > 16
                                                        ? item.name.slice(
                                                            0,
                                                            12
                                                          ) + "..."
                                                        : item.name
                                                      : "no data"}
                                                  </BodySmallBold>
                                                  <BodyTiny>
                                                    {/* {item?.designation || "no data"} */}
                                                    {item?.designation
                                                      ? item?.designation
                                                          .length > 17
                                                        ? item.designation.slice(
                                                            0,
                                                            14
                                                          ) + "..."
                                                        : item.designation
                                                      : "no data"}
                                                  </BodyTiny>
                                                </Col>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </Row>
                                )}
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      {/* //</div> */}
                    </Row>
                    <div className="biz-container">
                      <Row
                        style={{
                          width: "100%",
                          display: "flex",
                          // justifyContent: "center",
                          alignItems: "center",
                          marginTop: "150px",
                          // padding:'0 10px',
                        }}
                      >
                        {apiData &&
                        apiData?.services &&
                        apiData?.services.length > 0 ? (
                          <>
                            <Col xl={24} style={{ padding: "0 5px" }}>
                              <H4 style={{ color: "#72959A" }}>Our services</H4>
                              <Row>
                                <Col xl={24}>
                                  <Row
                                    xl={24}
                                    style={{
                                      marginTop: "12px",
                                      gap: "10px",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Col xl={12}>
                                      <Select
                                        value={filterData?.price}
                                        onChange={handlePriceClick}
                                        allowClear
                                        onClear={() =>
                                          handleClearClick("price")
                                        }
                                        style={{
                                          width: "120px",
                                          marginRight: "10px",
                                        }}
                                      >
                                        <Option value="">Price</Option>
                                        {[
                                          "Under $20",
                                          "$20 - $40",
                                          "$40 - $60",
                                          "$60 - $80",
                                          "Above $80",
                                        ].map((item) => (
                                          <Option key={item} value={item}>
                                            {item}
                                          </Option>
                                        ))}
                                      </Select>

                                      <Select
                                        value={filterData?.star}
                                        onChange={handleStarsClick}
                                        allowClear
                                        onClear={() => handleClearClick("star")}
                                        style={{
                                          width: "120px",
                                          marginRight: "10px",
                                        }}
                                      >
                                        <Option value="">Rating</Option>
                                        {[
                                          "5⭐only",
                                          "4⭐& above",
                                          "3⭐& above",
                                          "2⭐& above",
                                          "1⭐& above",
                                        ].map((item, index) => (
                                          <Option
                                            key={5 - index}
                                            value={5 - index}
                                          >
                                            {item}
                                          </Option>
                                        ))}
                                      </Select>
                                    </Col>
                                    <Col
                                      xl={8}
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: "10px",
                                        justifyContent: 'flex-end'
                                      }}
                                    >
                                      <Col
                                        xl={10}
                                        style={{
                                          display: "flex",
                                          justifyContent: "end",
                                        }}
                                      >
                                        <Select
                                          value={filterData?.sortby}
                                          onChange={handleSortByClick}
                                          allowClear
                                          style={{ width: "150px" }}
                                        >
                                          <Option value="">Sort By</Option>
                                          {[
                                            "Lowest priced first",
                                            "Highest priced first",
                                          ].map((item) => (
                                            <Option key={item} value={item}>
                                              {item}
                                            </Option>
                                          ))}
                                        </Select>
                                      </Col>

                                      <Col
                                        xl={10}
                                        style={{
                                          display: "flex",
                                          justifyContent: "flex-end",
                                          height: "100%",
                                          cursor: "pointer",
                                        }}
                                        onClick={showAllAppointments}
                                      >
                                        {!showAppointment ? (
                                          <Row
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "center",
                                              borderRadius: "16px",
                                              background: "#D3CBF8",
                                              padding: "6px 10px",
                                            }}
                                          >
                                            <Col span={24}>
                                              {" "}
                                              <BodyDemi
                                                style={{
                                                  fontSize: "12px",
                                                  color: "#ED510C",
                                                }}
                                              >
                                                Appointments only
                                              </BodyDemi>{" "}
                                            </Col>
                                          </Row>
                                        ) : (
                                          <Row
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "center",
                                              borderRadius: "16px",
                                              background:
                                                "linear-gradient(180deg, #4E39B7 0%, #322477 100%)",
                                              padding: "6px 10px",
                                            }}
                                          >
                                            <Col span={24}>
                                              {" "}
                                              <BodyDemi
                                                style={{
                                                  fontSize: "12px",
                                                  color: "#F2F1F0",
                                                }}
                                              >
                                                Show All
                                              </BodyDemi>{" "}
                                            </Col>
                                          </Row>
                                        )}
                                      </Col>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Col>

                            <Col xl={24}>
                              <Row gutter={28}>
                                {apiData &&
                                  apiData?.services &&
                                  apiData?.services.length > 0 &&
                                  apiData?.services?.map((item, key) => {
                                    return (
                                      <>
                                        <Col
                                          xl={6}
                                          lg={8}
                                          sm={12}
                                          xs={24}
                                          style={{ display: "flex" }}
                                        >
                                          <ListingCard cardData={item} />
                                        </Col>
                                      </>
                                    );
                                  })}
                              </Row>
                            </Col>
                          </>
                        ) : (
                          <></>
                        )}
                      </Row>

                      <Row
                        style={{
                          width: "100%",
                          display: "flex",
                          //justifyContent: "center",
                          alignItems: "center",
                          marginTop: "70px",
                        }}
                      >
                        <Col xl={24} style={{ paddingBottom: "20px" }}>
                          <H4 style={{ color: "#72959A" }}>
                            More
                            <span style={{ color: "#ed510c" }}>
                              {" "}
                              {apiData?.industry}{" "}
                            </span>{" "}
                            service providers you may consider
                          </H4>
                          {apiData &&
                          apiData.similar_businesses &&
                          apiData.similar_businesses.length > 0 ? (
                            <>
                              <Col xl={24}>
                                <Row gutter={0}>
                                  {apiData &&
                                    apiData?.similar_businesses &&
                                    apiData?.similar_businesses.length > 0 &&
                                    apiData?.similar_businesses?.map(
                                      (item, key) => {
                                        return (
                                          <>
                                            <Col
                                              xl={6}
                                              lg={6}
                                              sm={12}
                                              xs={24}
                                              style={{
                                                display: "flex",
                                                padding: "0 -20px",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  width: "100%",
                                                  margin: "8px 0",
                                                }}
                                              >
                                                <div
                                                  span={24}
                                                  style={CardStyle}
                                                  onClick={() =>
                                                    handleCardClick(
                                                      item.user_id
                                                    )
                                                  }
                                                >
                                                  <div
                                                    hoverable
                                                    style={{ height: "100%" }}
                                                  >
                                                    <Col>
                                                      <img
                                                        style={{
                                                          width: "100%",
                                                          height: "160px",
                                                          borderRadius: "6px",
                                                          objectFit: "cover",
                                                        }}
                                                        src={
                                                          STORAGE_URL +
                                                          "/images/" +
                                                          JSON.parse(
                                                            item?.service_image
                                                          )[0]
                                                        }
                                                      />
                                                    </Col>

                                                    <Col
                                                      style={{
                                                        color: "black",
                                                        display: "flex",
                                                        justifyContent:
                                                          "center",
                                                        alignItems: "center",
                                                        position: "relative",
                                                        // top: "-3rem",
                                                      }}
                                                    >
                                                      <div
                                                        style={{
                                                          // backgroundColor:
                                                          // "rgb(225,225,225,0.7)",
                                                          width:
                                                            "calc(100% - 0%)",
                                                          borderRadius: "15px",
                                                          padding: "5px",
                                                          display: "flex",
                                                          justifyContent:
                                                            "left",
                                                          alignItems:
                                                            "flex-start",
                                                        }}
                                                      >
                                                        <div
                                                          style={{
                                                            paddingRight: "5px",
                                                          }}
                                                        >
                                                          <img
                                                            style={{
                                                              borderRadius:
                                                                "50%",
                                                            }}
                                                            src={
                                                              STORAGE_URL +
                                                              "/images/" +
                                                              item?.logo_image
                                                                ?.filename
                                                            }
                                                            className="logo"
                                                            width={"50px"}
                                                            height={"50px"}
                                                          ></img>
                                                        </div>
                                                        <div>
                                                          <h2>
                                                            {item?.title ||
                                                              "no data"}
                                                          </h2>

                                                          <Col
                                                            xl={24}
                                                            md={24}
                                                            style={{
                                                              padding: "0",
                                                              paddingTop:
                                                                ".2rem",
                                                            }}
                                                          >
                                                            <Image
                                                              src={LocationIcon}
                                                            ></Image>
                                                            {item &&
                                                              item?.locations &&
                                                              item?.locations
                                                                .length > 0 &&
                                                              item?.locations?.map(
                                                                (
                                                                  itm,
                                                                  index
                                                                ) => {
                                                                  return (
                                                                    <>
                                                                      {index >
                                                                        0 &&
                                                                        " | "}{" "}
                                                                      {itm.name}
                                                                    </>
                                                                  );
                                                                }
                                                              )}
                                                          </Col>
                                                        </div>
                                                      </div>
                                                    </Col>
                                                  </div>
                                                </div>
                                              </div>
                                            </Col>
                                          </>
                                        );
                                      }
                                    )}
                                </Row>
                              </Col>
                            </>
                          ) : (
                            <></>
                          )}
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              )}
            </>
          )}
        </>
      )}
    </Fragment>
  );
};
export default StoreFront;
