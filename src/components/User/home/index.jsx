import { Fragment, useState, useEffect, useRef } from "react";
import {
  CustomText1Col,
  CustomUserButton,
  SearchCol,
  CustomTextCol,
  BackgroundImage,
  CustomRow,
  CustomBoxText,
  CustomBoldText,
  SpanText,
  CusText,
  CustomTitle,
  CustomInput,
  ResultRow,
} from "./styledComponent";
import {
  Select,
  Row,
  Col,
  Empty,
  ConfigProvider,
  Carousel,
  Button,
} from "antd";
import Link from "next/link";
import { IoMdPin } from "react-icons/io";
import {
  CheckOutlined,
  EnvironmentOutlined,
  SearchOutlined,
  LockOutlined,
  ArrowLeftOutlined,
  ToolOutlined,
  ShoppingCartOutlined,
  ArrowRightOutlined,
  PartitionOutlined,
} from "@ant-design/icons";
import BookableBizLogo from "../../../assets/imgs/banner.png";
import BookableBiz from "../../../assets/imgs/FirstAidKit.svg";
import BookableBizicon from "../../../assets/imgs/scissors.svg";
import BookableBizicon1 from "../../../assets/imgs/Tree.svg";
import BookableBizicon2 from "../../../assets/imgs/Dog.svg";
import BookableBizicon3 from "../../../assets/imgs/Barbell.svg";
import BookableBizicon4 from "../../../assets/imgs/PianoKeys.svg";
import BookableBizicon5 from "../../../assets/imgs/book-open.svg";
import Image from "next/image";
import { debounce } from "lodash";
import {
  GetAllPackagesServices,
  GetUserAddressService,
  getAllNearByServices,
  getAllPopularServices,
  getDataBySearchingLocation,
  getDataBySearchingServices,
  my_cart_bookings_packages,
} from "@/Services/userService.services";
import { useRouter } from "next/navigation";
import ListingCard from "@/lib/commonComponent/CustomUserCard";
import { StyledText } from "../serviceDetails/styledComponent";
import PromotionCard from "@/lib/commonComponent/CustomPromoCard";
import UserPackageCard from "@/lib/commonComponent/UserPackageCard";
import ServicePackageBox from "@/widgets/service-package-box/ServicePackageBox";
import { CMS_Services } from "@/Services/auth.services";
import { STORAGE_URL } from "@/Services/vendorService.services";
import style from "./style.css";

const HomePage = () => {
  const ref = useRef(null);
  const router = useRouter();
  const [isSearchDataVisible, setIsSearchDataVisible] = useState("");
  const [serviceSearchResult, setServiceSearchResult] = useState([]);
  const [locationSearchResult, setLocationSearchResult] = useState([]);
  const [locSearchLabel, setLocSearchLabel] = useState("");
  const [servSearchLabel, setServSearchLabel] = useState("");
  const [inputValues, setInputValues] = useState({});
  const [inputLocationVals, setInputLocationVals] = useState({
    location: null,
  });
  const [popularApiData, setPopularApiData] = useState();
  const [featuredList, setFeaturedList] = useState();
  const [nearApiData, setNearApiData] = useState();
  const [userDetails, setUserDetails] = useState({});
  const [packageApiData, setPackageApiData] = useState();
  const [checkUserLogin, setCheckUserLogin] = useState(false);
  const [cms, setCms] = useState([]);

  const [mycart, setMycart] = useState([]);
  const [myBooking, setMyBooking] = useState([]);
  const [myPackage, setMyPackage] = useState([]);

  console.log("featuredList====>", popularApiData);
  useEffect(() => {
    (async () => {
      const userId = localStorage.getItem("userId");
      const userToken = localStorage.getItem("token");
      const userRole = localStorage.getItem("role");
      setUserDetails({
        user_Id: userId,
        user_token: userToken,
        user_role: userRole,
      });

      const response = await getAllPopularServices({
        user_id: userId,
        token: userToken,
        role: userRole,
      });
      let output = response?.response?.data;

      const featuredData = output?.filter((item) => item["featured"] === "yes");
      setFeaturedList(featuredData);

      output = output?.filter((item) => item["featured"] !== "yes");
      setPopularApiData(output);

      const fetchedPackageData = await GetAllPackagesServices();
      let packageData = fetchedPackageData?.response?.data;
      setPackageApiData(packageData);

      if (userId && userToken && userRole) {
        setCheckUserLogin(true);
        const CityData = await GetUserAddressService({
          user_id: userId,
          token: userToken,
        });
        const fetchedCity = CityData?.response?.data?.data.city;

        // ============= Near By ===============
        const result = await getAllNearByServices(userId, fetchedCity);
        let resultData = result?.response?.data;
        if (resultData) {
          setNearApiData(resultData.slice(0, 8));
        }
      }
      const res = await CMS_Services();
      setCms(res.response.data.data);

      if (userRole === "user") {
        const res1 = await my_cart_bookings_packages({
          token: userToken,
          user_id: userId,
        });
        if (
          res1.response.data.carts !== undefined ||
          res1.response.data.carts !== null
        ) {
          const ValueArray = Object.values(res1.response.data.carts);
          setMycart(ValueArray);
        }
        setMyBooking(res1.response.data.upcomingBookings);
        setMyPackage(res1.response.data.myPackages);
      }
    })();
  }, []);

  const contentStyle = {
    height: "350px",
    lineHeight: "160px",
    position: "relative",
  };

  console.log("myCart===>", mycart);

  console.log("myPackage", myPackage);

  const findAsPerSearchedValue = debounce(async (e, type) => {
    setServiceSearchResult([]);
    setLocationSearchResult([]);

    if (type === "typed") {
      const response = await getDataBySearchingServices(e);
      let result = response?.response?.data?.data;

      if (
        result?.business_names.length != 0 ||
        result?.labels.length != 0 ||
        result?.service_names.length != 0
      ) {
        setServiceSearchResult(result);
        setServSearchLabel("Suggestions..");
      } else {
        const response = await getDataBySearchingServices("a");
        let result = response?.response?.data?.data;
        setServiceSearchResult(result);
        setServSearchLabel("No Matches Found.., Showing Popular Searches");
      }
    } else {
      if (type === "location") {
        const response = await getDataBySearchingLocation(e);
        let result = response?.response?.data?.data;

        const filteredData =
          result &&
          result.cities &&
          result.cities
            .map((item) => item.toLowerCase())
            .filter((item) => item.includes(e))
            .sort();

        if (filteredData.length != 0) {
          setLocationSearchResult(filteredData);

          setIsSearchDataVisible("location");
          setLocSearchLabel("Suggesting Cities...");
        } else {
          setLocationSearchResult(result.cities);
          setIsSearchDataVisible("location");
          setLocSearchLabel("Suggesting Popular Cities..");
        }
      }
    }
  }, 500);

  const callingOnChange = async (e, type) => {
    e.stopPropagation();
    var value = e.target.value;
    if (value?.length > 0) {
      findAsPerSearchedValue(value, type);
    } else {
      findAsPerSearchedValue("a", type);
    }

    if (
      type === "service" ||
      type === "vendor" ||
      type === "typed" ||
      type === "label"
    ) {
      const newInputValues = { [type]: value };
      setInputValues(newInputValues);
      setIsSearchDataVisible("service");
    }
  };

  const callingOnChangeLoc = async (e) => {
    e.stopPropagation();

    var value = e.target.value;

    if (value?.length > 0) {
      findAsPerSearchedValue(value, "location");
    } else {
      findAsPerSearchedValue("a", "location");
    }

    const newInputValues = { [location]: value };
    setInputLocationVals(newInputValues);
    setIsSearchDataVisible("location");
  };

  const handleItemClick = (value, type) => {
    if (type === "location") {
      const newInputValues = { location: value };
      setInputLocationVals(newInputValues);
    } else {
      const newInputValues = { [type]: value };
      setInputValues(newInputValues);
    }
  };

  const handleOnSubmit = (data, place) => {
    const { location } = place;
    const keys = Object.keys(data);
    const queryParams = keys
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join("&");
    router.push(
      `/search?${queryParams}&locationId=${encodeURIComponent(location || "")}`
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsSearchDataVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);
  const openSearch = () => {
    router.push("/search");
  };

  const isImage = (filename) => {
    return /\.(jpg|jpeg|png|gif)$/i.test(filename);
  };

  const isVideo = (filename) => {
    return /\.(mp4|webm|ogg)$/i.test(filename);
  };

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  }

  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(320.93deg, #EA8933 6.95%, #ED510C 95.13%)",
          width: "100%",
        }}
      >
        <CustomRow>
          <CustomTextCol
            className="banner-container"
            style={{ paddingBottom: "10%" }}
          >
            <CustomBoldText>
              <Carousel
                autoplay
                dots={false}
                style={{ width: "100%", overflow: "hidden" }}
              >
                {cms?.cms_main_titles?.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "80%",
                    }}
                  >
                    <h1
                      style={{
                        fontSize: "32px",
                        height: "80%",
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {item.title}
                    </h1>
                  </div>
                ))}
              </Carousel>
            </CustomBoldText>

            <CustomBoxText>
              <CusText onClick={() => openSearch()}>
                <Image
                  className="logo"
                  src={BookableBiz}
                  alt="Home-icon"
                ></Image>
                Medical
              </CusText>
              <CusText onClick={() => openSearch()}>
                <Image
                  className="logo"
                  src={BookableBizicon}
                  alt="Home-icon"
                ></Image>
                Salon
              </CusText>
              <CusText onClick={() => openSearch()}>
                <ToolOutlined style={{ fontSize: "25px" }} />
                Repairs
              </CusText>
              <CusText onClick={() => openSearch()}>
                <Image
                  className="logo"
                  src={BookableBizicon2}
                  alt="Home-icon"
                ></Image>
                Pet
              </CusText>
              <CusText onClick={() => openSearch()}>
                <Image
                  className="logo"
                  src={BookableBizicon3}
                  alt="Home-icon"
                ></Image>
                Fitness
              </CusText>
              <CusText onClick={() => openSearch()}>
                <Image
                  className="logo"
                  src={BookableBizicon4}
                  alt="Home-icon"
                ></Image>
                Music
              </CusText>
              <CusText onClick={() => openSearch()}>
                <Image
                  className="logo"
                  src={BookableBizicon5}
                  alt="Home-icon"
                ></Image>
                Education
              </CusText>
            </CustomBoxText>

            <CustomTitle style={{ marginTop: "0px" }}>
              <SearchCol
                style={{
                  maxWidth: "100%",
                  borderRadius: "10px",
                  overflow: "hidden",
                  padding: 0,
                  height: "auto",
                }}
              >
                <Row style={{ width: "100%" }}>
                  <CustomInput
                    value={
                      inputValues?.service ||
                      inputValues?.vendor ||
                      inputValues?.label ||
                      inputValues?.tpyed
                    }
                    className="SerarchInputs biz-search-input"
                    placeholder="Search Service"
                    prefix={<SearchOutlined />}
                    style={{ borderRadius: "0" }}
                    onClick={(e) => callingOnChange(e, "typed")}
                    onChange={(e) => callingOnChange(e, "typed")}
                  />
                </Row>

                <Row style={{ width: "100%" }}>
                  <CustomInput
                    placeholder="City/Town"
                    value={inputLocationVals?.location}
                    className="SerarchInputs"
                    prefix={<EnvironmentOutlined />}
                    style={{
                      zIndex: "999",
                      marginLeft: "-1%",
                      borderRadius: "0",
                    }}
                    onClick={(e) => callingOnChangeLoc(e)}
                    onChange={(e) => callingOnChangeLoc(e)}
                  />
                </Row>

                <CustomUserButton
                  onClick={() => handleOnSubmit(inputValues, inputLocationVals)}
                  className="SearchButton"
                  style={{
                    width: "auto",
                    color: "#fff",
                    minWidth: "120px",
                    fontWeight: "bold",
                    background: "rgb(125 42 5)",
                    border: "none",
                    borderRadius: "0px 0px 10px 0px",
                    height: "auto",
                    marginLeft: "-4%",
                    zIndex: "1000",
                  }}
                >
                  Search
                </CustomUserButton>
              </SearchCol>

              <ResultRow
                style={{ width: "100%", position: "absolute", zIndex: "999" }}
              >
                <Col xl={24} style={{ display: "flex", width: "100%" }}>
                  {isSearchDataVisible == "service" ? (
                    serviceSearchResult &&
                    serviceSearchResult?.service_names ? (
                      <Row
                        ref={ref}
                        style={{
                          background: "white",
                          height: "320px",
                          overflow: "auto",
                          width: "100%",
                          display: "flex",
                          padding: "8px",
                          margin: "2px 0 0 0",
                          borderRadius: "8px",
                        }}
                      >
                        <Col
                          span={24}
                          style={{
                            fontSize: "12px",
                            fontWeight: 400,
                            margin: "5px 0",
                          }}
                        >
                          <span style={{ padding: "8px 0" }}>
                            {" "}
                            {servSearchLabel}{" "}
                          </span>{" "}
                          <br />
                          <br />
                          <span
                            style={{ padding: "8px 0", fontWeight: "bold" }}
                          >
                            POPULAR SERVICES
                          </span>{" "}
                          <br />
                          <Row
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              marginTop: "5px",
                            }}
                          >
                            {serviceSearchResult &&
                              serviceSearchResult?.service_names &&
                              serviceSearchResult?.service_names.map(
                                (item, index) => {
                                  return (
                                    <span
                                      onClick={() =>
                                        handleItemClick(item, "service")
                                      }
                                      className="search-span"
                                    >
                                      {item}
                                    </span>
                                  );
                                }
                              )}
                          </Row>
                        </Col>

                        <Col
                          span={24}
                          style={{
                            fontSize: "12px",
                            fontWeight: 400,
                            margin: "5px 0",
                          }}
                        >
                          {" "}
                          <span
                            style={{ padding: "8px 0", fontWeight: "bold" }}
                          >
                            CATEGORIES{" "}
                          </span>{" "}
                          <br />
                          <Row
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              marginTop: "5px",
                            }}
                          >
                            {serviceSearchResult &&
                              serviceSearchResult?.labels &&
                              serviceSearchResult?.labels.map((item, index) => {
                                return (
                                  <span
                                    onClick={() =>
                                      handleItemClick(item, "label")
                                    }
                                    className="search-span"
                                  >
                                    {item}
                                  </span>
                                );
                              })}
                          </Row>
                        </Col>

                        <Col
                          span={24}
                          style={{
                            fontSize: "12px",
                            fontWeight: 400,
                            margin: "5px 0",
                          }}
                        >
                          {" "}
                          <span
                            style={{ padding: "8px 0", fontWeight: "bold" }}
                          >
                            VENDORS{" "}
                          </span>{" "}
                          <br />
                          <Row
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              marginTop: "5px",
                            }}
                          >
                            {serviceSearchResult &&
                              serviceSearchResult?.business_names &&
                              serviceSearchResult?.business_names.map(
                                (item, index) => {
                                  return (
                                    <span
                                      onClick={() =>
                                        handleItemClick(item, "vendor")
                                      }
                                      className="search-span"
                                    >
                                      {item}
                                    </span>
                                  );
                                }
                              )}
                          </Row>
                        </Col>
                      </Row>
                    ) : isSearchDataVisible ? (
                      <Row
                        style={{
                          background: "white",
                          height: "auto",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: "2px 0 0 11px",
                          borderRadius: "8px",
                        }}
                      >
                        {" "}
                        <Empty />{" "}
                      </Row>
                    ) : null
                  ) : null}

                  {isSearchDataVisible == "location" ? (
                    locationSearchResult ? (
                      <Row
                        ref={ref}
                        style={{
                          background: "white",
                          height: "auto",
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          padding: "8px",
                          margin: "2px 0 0 0",
                          borderRadius: "8px",
                        }}
                      >
                        <Col
                          span={24}
                          style={{
                            fontSize: "12px",
                            fontWeight: 400,
                            margin: "5px 0",
                          }}
                        >
                          {" "}
                          <span style={{ padding: "8px 0" }}>
                            {locSearchLabel}{" "}
                          </span>{" "}
                          <br />
                          <Row
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "row",
                              marginTop: "5px",
                            }}
                          >
                            {locationSearchResult &&
                              locationSearchResult?.map((item, index) => {
                                return (
                                  <span
                                    onClick={() =>
                                      handleItemClick(item, "location")
                                    }
                                    className="search-span"
                                  >
                                    {item}
                                  </span>
                                );
                              })}
                          </Row>
                        </Col>
                      </Row>
                    ) : isSearchDataVisible ? (
                      <Row
                        style={{
                          background: "white",
                          height: "auto",
                          width: "46%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: "2px 0 0 0px",
                          borderRadius: "8px",
                        }}
                      >
                        {" "}
                        <Empty />{" "}
                      </Row>
                    ) : null
                  ) : null}
                </Col>
              </ResultRow>
            </CustomTitle>
          </CustomTextCol>
          <CustomText1Col className="home-carousal">
            <div style={{ maxWidth: "80%", margin: "0 auto" }}>
              <Carousel autoplay className="home-banner-img">
                {cms?.cms_sliders?.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      position: "relative",
                      width: "100%",
                      borderRadius: "10px",
                    }}
                  >
                    {isImage(item.image_video) && (
                      <div
                        style={{
                          ...contentStyle,
                          backgroundImage: `linear-gradient(rgba(1, 1, 1, 0.5),rgba(1, 1, 1, 0.5)),url('${STORAGE_URL}/cms/${item.image_video}')`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "20px",
                          zIndex: 999,
                          borderRadius: "10px",
                          height: "100%",
                        }}
                      >
                        <h1
                          style={{
                            color: "white",
                            zIndex: 1,
                            textAlign: "center",
                            margin: "0 50px",
                            lineHeight: "1.2",
                            textShadow: "3.54pt 3.54pt 5pt rgba(0, 0, 0, 0.5)",
                          }}
                        >
                          {item.title}
                        </h1>

                        {item?.is_cta === 1 && item.cta_redirect_link && (
                          <Link
                            href={item.cta_redirect_link}
                            className="button-link"
                          >
                            {item.cta_title}
                          </Link>
                        )}
                      </div>
                    )}
                    {isVideo(item.image_video) && (
                      <div
                        style={{
                          ...contentStyle,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                          height: "350px",
                          borderRadius: "10px",
                          overflow: "hidden",
                        }}
                      >
                        <video
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                          autoPlay
                          controls
                          src={`${STORAGE_URL}/cms/${item.image_video}`}
                        />
                        <div
                          style={{
                            position: "absolute",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "20px",
                            zIndex: 1,
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            pointerEvents: "none",
                          }}
                        >
                          <h1
                            style={{
                              color: "white",
                              textAlign: "center",
                              margin: "0 50px",
                              lineHeight: "1.2",
                              textShadow:
                                "3.54pt 3.54pt 5pt rgba(0, 0, 0, 0.5)",
                              pointerEvents: "auto",
                            }}
                          >
                            {item.title}
                          </h1>
                          {item?.is_cta === 1 && item.cta_redirect_link && (
                            <Link
                              href={item.cta_redirect_link}
                              className="button-link"
                              style={{
                                position: "relative",
                                color: "white",
                                fontSize: "15px",
                                pointerEvents: "auto",
                              }}
                            >
                              {item.cta_title}
                            </Link>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </Carousel>
            </div>
          </CustomText1Col>
        </CustomRow>
      </div>
      <div className="biz-container">
        {userDetails.user_token !== null && userDetails.user_role === "user" ? (
          <Row className="row1" style={{ padding: "0 20px", marginTop: "5%" }}>
            {mycart?.length !== 0 ? (
              <Col
              md={10}
              xs={24}
              sm={24}
              style={{
                marginBottom: "20px",
                marginTop: "20px",
                paddingLeft: "13px",
              }}
            >
              <h3 className="h3" >
                  <span className="linear-gradient1" style={{ display: "flex", alignItems: "center" }}>        
                    <ShoppingCartOutlined />
                  </span>
                  Cart Calling: Don't Forget Your Picks!{" "}
                  <span style={{ paddingLeft: "7px",color:'black' }}>
                    <ArrowRightOutlined />
                  </span>
                </h3>
              <div className="first-container"
                  style={{cursor: "pointer"}}                        
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
                  }}
                  onClick={() => router.push(`/user-cart`)}
                  >
                <div className="Coupns-div1">
                  <p style={{ color: "#4E39B7" }}>{mycart[0].vendor_name}</p>
                  {mycart[0].slice(-3).map((item, index) => (
                    <h3 key={index}>
                      <b>{item.service.name}</b>
                    </h3>
                  ))}
                </div>
                <div
                  className="Coupns-div2"
                  style={{ marginTop: "5%", textAlign: "right" }}
                >
                  <h3 style={{ fontSize: "14px" }}>Total</h3>
                  <h3>${mycart[0].reduce((sum, item) => sum + parseFloat(item?.price_detail?.totalPrice), 0).toFixed(2)}</h3>
                  <Button>Checkout now</Button>
                </div>
              </div>
            </Col>
            ) : null}

            {myBooking?.length !== 0 ? (
              <Col
                md={14}
                xs={24}
                sm={24}
                span={12}
                style={{ marginBottom: "20px", marginTop: "20px" }}
              >
                <h3 className="h3" >
                  <span className="linear-gradient1" style={{ display: "flex", alignItems: "center" }}>        
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ color: "white", marginRight: "10px" }}
                      width="32"
                      height="32"
                      fill="#000000"
                      viewBox="0 0 256 256"
                    >
                      <path d="M184,72H40A16,16,0,0,0,24,88V200a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V88A16,16,0,0,0,184,72Zm0,128H40V88H184V200ZM232,56V176a8,8,0,0,1-16,0V56H64a8,8,0,0,1,0-16H216A16,16,0,0,1,232,56Z"></path>
                    </svg>
                  </span>
                  Upcoming bookings and appointments
                  <span style={{ paddingLeft: "7px",color:'black' }}>
                    <ArrowRightOutlined />
                  </span>
                </h3>
                <Row>
                  {myBooking?.slice(-2).map((item, index) => (
                    <Col
                      key={item.id}
                      md={12}
                      xs={24}
                      sm={12}
                      span={12}
                      className="Coupns-column1"
                      style={{ padding: "10px" }}
                    >
                      <div
                        className="Coupns-div1"
                        style={{
                          borderRadius: "8px",
                          padding: "20px",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                          transition: "transform 0.3s, box-shadow 0.3s",
                          cursor: "pointer"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.05)";
                          e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.5)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
                        }}
                        onClick={() => router.push(`/mybookings`)}
                      >
                        <div>
                          <p style={{ margin: "0 0 10px", fontWeight: "bold" }}>{item?.service_name}</p>
                          <p style={{ margin: "0 0 10px" }}>{item?.booking_date}</p>
                          <p style={{ margin: "0 0 10px" }}>{item?.vendor_name}</p>
                          <span style={{ display: 'flex', alignItems: 'center' }}>
                            <IoMdPin size={20} color="#f67740" />
                            <span style={{ marginLeft: "5px" }}>{item?.location_name}</span>
                          </span>
                        </div>
                        <div>
                          <ArrowRightOutlined style={{ fontSize: "16px" }} />
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Col>
            ) : null}

            {myPackage[0]?.length > 0 ? (
              <Col
                md={14}
                xs={24}
                sm={24}
                span={12}
                style={{ marginTop: "20px", marginBottom: "20px" }}
              >
                <h3 className="h3" >
                  <span className="linear-gradient1" style={{ display: "flex", alignItems: "center" }}>        
                  <PartitionOutlined />
                  </span>
                  Tap into Your Package Perks
                  <span style={{ paddingLeft: "7px",color:'black' }}>
                    <ArrowRightOutlined />
                  </span>
                </h3>
                <Row>
                  {myPackage[0]?.slice(-2).map((item, index) => (
                    <Col
                      md={12}
                      xs={24}
                      sm={12}
                      span={12}
                      className="Coupns-column1"
                    >
                      <div className="Coupns-div1"
                      style={{cursor: "pointer"}}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.05)";
                            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.5)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
                          }}>
                        <div className="Coupns-div1-1">
                          <span>PACKAGE</span>
                          <p style={{ marginTop: "10px" }}>
                            <b>{item?.package_details?.package_name}</b>
                          </p>
                          <span>
                            Valid upto
                            <b style={{ color: "#f67740" }}>
                              {" "}
                              {formatDate(item?.package_details?.end_date)}
                            </b>
                          </span>
                          <p style={{ marginTop: "7px" }}>
                            {item?.package_details?.business_name}
                          </p>
                          <span
                            style={{ display: "flex", alignContent: "center" }}
                          >
                            <IoMdPin size={20} color="#f67740" />
                            {item?.package_details?.location_title}
                          </span>
                        </div>
                        <div style={{cursor:'pointer'}}>
                          <ArrowRightOutlined />
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Col>
            ) : null}
          </Row>
        ) : (
          <></>
        )}
        <Row>
          <Col span={24}>
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Col md={24} xs={22} sm={22} style={{ margin: "2rem 0px" }}>
                <span className="home-page-heading">Popular services</span>

                <Row gutter={10}>
                  {featuredList?.map((item) => {
                    return (
                      <>
                        <Col xl={12} xs={24} style={{ margin: "8px 0" }}>
                          <PromotionCard featuredData={item} />
                        </Col>
                      </>
                    );
                  })}
                </Row>
                <div className="biz-flex">
                  {popularApiData && popularApiData.length > 0
                    ? popularApiData?.map((item, key) => {
                        return (
                          <>
                            <ServicePackageBox
                              engine={item.engine}
                              service_id={item.id}
                              location_id={item.location_id}
                              service_title={item.service_name}
                              service_vendor_id={item.vendor_id}
                              service_vendor_name={item.vendor_name}
                              service_labels={item.label}
                              feature_image={item.feature_image}
                              price={item?.price_array?.price}
                              location_title={item.location}
                              location_meta={item.location_meta}
                              currency_name={item?.price_array?.currency_name}
                              currency_symbol={
                                item?.price_array?.currency_symbol
                              }
                              discount={item?.price_array?.discount}
                              favorite={item.isFavorite}
                              checkUserLogin={checkUserLogin}
                              user_id={localStorage.getItem("userId")}
                            />
                          </>
                        );
                      })
                    : ""}
                </div>
                {packageApiData && packageApiData.length > 0 ? (
                  <>
                    <div style={{ display: "block" }}>
                      <span className="home-page-heading">Packages</span>
                    </div>
                    <div className="biz-flex">
                      {packageApiData?.map((item, key) => {
                        return (
                          <>
                            <UserPackageCard cardData={item} />
                          </>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  ""
                )}
              </Col>
              {/* ------------------------------- Packages ------------------ */}

              {/* ----------------------------- Near me ------------------------------ */}
              {userDetails?.user_Id &&
                userDetails?.user_token &&
                userDetails?.user_role === "user" && (
                  <Col md={24} xs={22} sm={22} style={{ margin: "1rem" }}>
                    <span className="home-page-heading">Near you</span>
                    <div className="biz-flex">
                      {nearApiData && nearApiData.length > 0
                        ? nearApiData?.map((item, key) => {
                            return (
                              <>
                                {"package_service_array" in item ? (
                                  <>
                                    <UserPackageCard
                                      nearBy={true}
                                      cardData={item}
                                    />
                                  </>
                                ) : (
                                  <>
                                    <ServicePackageBox
                                      engine={item.engine}
                                      service_id={item.id}
                                      location_id={item.location_id}
                                      service_title={item.service_name}
                                      service_vendor_id={item.vendor_id}
                                      service_vendor_name={item.vendor_name}
                                      service_labels={item.label}
                                      feature_image={item.feature_image}
                                      price={item?.price_array?.price}
                                      location_title={item.location}
                                      location_meta={item.location_meta}
                                      currency_name={
                                        item?.price_array?.currency_name
                                      }
                                      currency_symbol={
                                        item?.price_array?.currency_symbol
                                      }
                                      discount={item?.price_array?.discount}
                                      favorite={item.isFavorite}
                                      checkUserLogin={checkUserLogin}
                                      user_id={localStorage.getItem("userId")}
                                    />
                                  </>
                                )}
                              </>
                            );
                          })
                        : ""}
                    </div>
                  </Col>
                )}
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default HomePage;
