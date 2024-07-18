import React, { useEffect, useState } from "react";
import "./style.css";
import Link from "next/link";
import { Carousel, Spin, Dropdown, Menu, Button, message } from "antd";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaRegHeart, FaFacebook, FaRegCopy } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { STORAGE_URL } from "@/Services/vendorService.services";
import Favorite from "../biz-buttons/Favorite";
import { useSearchParams } from "next/navigation";
import { SERVICE_DETAILS } from "@/Services/frontend";
import { IoIosShareAlt } from "react-icons/io";
function Banner({
  publicServiceResponse,
  publicBookableLocation,
  checkUserLogin,
  user_id,
}) {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("serviceId");
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const price = parseFloat(
    publicServiceResponse?.checkout_price_array.price
  ).toFixed(2);
  const discount =
    publicServiceResponse?.checkout_price_array.discount &&
    publicServiceResponse?.checkout_price_array.discount != "null"
      ? parseInt(publicServiceResponse?.checkout_price_array.discount)
      : 0;
  const priceDiscount = price * (discount / 100).toFixed(2);
  const finalPrice = price - priceDiscount.toFixed(2);

  const VenderId = searchParams.get("VenderId");
  const url = `/store-front/?VendorId=${encodeURIComponent(VenderId)}`;
  const handleShareClick = (platform) => {
    const url1 = window.location.href;

    if (platform === "facebook") {
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url1
      )}`;
      window.open(shareUrl, "_blank", "width=600,height=400");
    } else if (platform === "twitter") {
      const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url1
      )}`;
      window.open(shareUrl, "_blank", "width=600,height=400");
    } else if (platform === "copy") {
      navigator.clipboard
        .writeText(url1)
        .then(() => {
          message.success("URL copied successfully");
        })
        .catch((error) => {
          message.error("Failed to copy URL: " + error);
        });
    }
  };
  const menu = (
    <Menu>
      <Menu.Item key="facebook" onClick={() => handleShareClick("facebook")}>
        <Button type="link">
          <FaFacebook size={25} />
        </Button>
      </Menu.Item>
      <Menu.Item key="twitter" onClick={() => handleShareClick("twitter")}>
        <Button type="link">
          <FaXTwitter size={25} color="black" />
        </Button>
      </Menu.Item>
      <Menu.Item key="copy" onClick={() => handleShareClick("copy")}>
        <Button type="link">
          <FaRegCopy size={25} color="black" />
        </Button>
      </Menu.Item>
    </Menu>
  );

  console.log("public service id-------", publicServiceResponse);
  return (
    <>
      {publicServiceResponse?.title ? (
        <>
          <div
            className="biz-full-container"
            style={{ backgroundColor: "rgb(44, 44, 44)", position: "relative" }}
          >
            <div className="position-top">
              <div className="biz-container">
                <div className="biz-col-6">
                  <div className="banner-content">
                    {parseInt(publicServiceResponse.engine) === 2 && (
                      <>
                        <span
                          className="biz-service-tag"
                          style={{
                            position: "relative",
                            top: "-5px",
                            right: "0px",
                          }}
                        >
                          SUBSCRIPTION
                        </span>
                      </>
                    )}
                    {parseInt(publicServiceResponse.engine) === 3 && (
                      <>
                        <span
                          className="biz-service-tag"
                          style={{
                            position: "relative",
                            top: "-5px",
                            right: "0px",
                          }}
                        >
                          SUBSCRIPTION
                        </span>
                      </>
                    )}
                    {parseInt(publicServiceResponse.engine) === 5 && (
                      <>
                        <span
                          className="biz-service-tag"
                          style={{
                            position: "relative",
                            top: "-5px",
                            right: "0px",
                          }}
                        >
                          APPOINTMENT
                        </span>
                      </>
                    )}
                    {parseInt(publicServiceResponse.engine) === 4 && (
                      <>
                        <span
                          className="biz-service-tag"
                          style={{
                            position: "relative",
                            top: "-5px",
                            right: "0px",
                          }}
                        >
                          PACKAGE
                        </span>
                      </>
                    )}
                    <h1>{publicServiceResponse?.title}</h1>
                    <h4>{publicBookableLocation?.duration} Min.</h4>
                    <Link href={url}>
                      {" "}
                      <div
                        style={{
                          cursor: "pointer",
                          fontSize: "20px",
                          color: isHovered ? "#ED510C" : "rgb(237, 101, 15)",
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        {" "}
                        {publicServiceResponse?.vendor_details?.name}
                      </div>{" "}
                    </Link>
                    {/* <Link href={url} style={{color:"#a6a6a6", fontSize:'20px' }}>{publicServiceResponse?.vendor_details?.name}</Link> */}
                    <h6>
                      <FaMapMarkerAlt />{" "}
                      {publicServiceResponse?.location_meta?.city}
                    </h6>
                    <ul>
                      {publicServiceResponse?.features?.feature1 !== "null" && (
                        <>
                          <li style={{ color: "#a6a6a6" }}>
                            <FaCheck />{" "}
                            {publicServiceResponse?.features?.feature1}
                          </li>
                        </>
                      )}
                      {publicServiceResponse?.features?.feature2 !== "null" && (
                        <>
                          <li style={{ color: "#a6a6a6" }}>
                            <FaCheck />{" "}
                            {publicServiceResponse?.features?.feature2}
                          </li>
                        </>
                      )}
                      {publicServiceResponse?.features?.feature3 !== "null" && (
                        <>
                          <li style={{ color: "#a6a6a6" }}>
                            <FaCheck />{" "}
                            {publicServiceResponse?.features?.feature3}
                          </li>
                        </>
                      )}
                      {publicServiceResponse?.features?.feature4 !== "null" && (
                        <>
                          <li style={{ color: "#a6a6a6" }}>
                            <FaCheck />{" "}
                            {publicServiceResponse?.features?.feature4}
                          </li>
                        </>
                      )}
                      {publicServiceResponse?.features?.feature5 !== "null" && (
                        <>
                          <li style={{ color: "#a6a6a6" }}>
                            <FaCheck />{" "}
                            {publicServiceResponse?.features?.feature5}
                          </li>
                        </>
                      )}
                    </ul>
                    <p>{publicServiceResponse?.about}</p>
                    <ul>
                      {publicServiceResponse?.benefits?.benefit1 !== "null" && (
                        <>
                          <li style={{ color: "#a6a6a6" }}>
                            <FaCheck />{" "}
                            {publicServiceResponse?.benefits?.benefit1}
                          </li>
                        </>
                      )}
                      {publicServiceResponse?.benefits?.benefit2 !== "null" && (
                        <>
                          <li style={{ color: "#a6a6a6" }}>
                            <FaCheck />{" "}
                            {publicServiceResponse?.benefits?.benefit2}
                          </li>
                        </>
                      )}
                      {publicServiceResponse?.benefits?.benefit3 !== "null" && (
                        <>
                          <li style={{ color: "#a6a6a6" }}>
                            <FaCheck />{" "}
                            {publicServiceResponse?.benefits?.benefit3}
                          </li>
                        </>
                      )}
                      {publicServiceResponse?.benefits?.benefit4 !== "null" && (
                        <>
                          <li style={{ color: "#a6a6a6" }}>
                            <FaCheck />{" "}
                            {publicServiceResponse?.benefits?.benefit4}
                          </li>
                        </>
                      )}
                      {publicServiceResponse?.benefits?.benefit5 !== "null" && (
                        <>
                          <li style={{ color: "#a6a6a6" }}>
                            <FaCheck />{" "}
                            {publicServiceResponse?.benefits?.benefit5}
                          </li>
                        </>
                      )}
                    </ul>
                    {publicServiceResponse?.checkout_price_array.discount &&
                    publicServiceResponse?.checkout_price_array.discount !=
                      "0" ? (
                      <>
                        {" "}
                        <h2 style={{ marginBottom: "10px" }}>
                          SGD {finalPrice.toFixed(2)}{" "}
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: "500",
                              padding: "0px 4px",
                              background: "rgb(255, 203, 181)",
                              color: "rgb(237, 81, 12)",
                              lineHeight: "15px",
                              border: "none",
                              borderRadius: "3px",
                            }}
                          >
                            {discount}% OFF
                          </span>{" "}
                          <span
                            style={{
                              color: "rgb(242, 241, 240)",
                              marginRight: "10px",
                              fontSize: "18px",
                              textDecoration: "line-through",
                            }}
                          >
                            {price}
                          </span>
                        </h2>
                        <p style={{ fontWeight: "bold", marginBottom: "20px" }}>
                          Save{" "}
                          <span style={{ color: "rgb(237, 81, 12)" }}>
                            {(parseFloat(price) - finalPrice).toFixed(2)}
                          </span>{" "}
                          with this service
                        </p>
                        <Dropdown overlay={menu} placement="bottomCenter" arrow>
                          <button
                            onClick={handleShareClick}
                            style={{
                              marginRight: "10px",
                              backgroundColor: "#EA8933",
                              padding: "7px 10px",
                              borderRadius: "5px ",
                              color: "white",
                              fontSize: "1rem",
                              cursor: "pointer",
                            }}
                          >
                            Share
                            <IoIosShareAlt />
                          </button>
                        </Dropdown>
                      </>
                    ) : (
                      <>
                        <h2 style={{ marginBottom: "10px" }}>
                          SGD {finalPrice.toFixed(2)}
                        </h2>
                        <Dropdown overlay={menu} placement="bottomCenter" arrow>
                          <button
                            onClick={handleShareClick}
                            style={{
                              marginRight: "10px",
                              backgroundColor: "#EA8933",
                              padding: "7px 10px",
                              borderRadius: "5px ",
                              color: "white",
                              fontSize: "1rem",
                              cursor: "pointer",
                            }}
                          >
                            Share
                            <IoIosShareAlt />
                          </button>
                        </Dropdown>

                        {/* <button >Share data</button> */}
                      </>
                    )}

                    {checkUserLogin && (
                      <>
                        <Favorite
                          favorite={
                            publicServiceResponse?.favorite == true ? 1 : 0
                          }
                          service_id={serviceId}
                          package_id={null}
                          location_id={publicBookableLocation?.location_id}
                          user_id={user_id}
                          vendor_id={publicServiceResponse?.vendor_details?.id}
                          type="button"
                        />{" "}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="biz-row">
              <div className="biz-col-6" style={{ color: "#013120" }}>
                blank
              </div>
              <div className="biz-col-6">
                {publicServiceResponse?.images.length > 1 ? (
                  <>
                    <Carousel
                      dotPosition={"right"}
                      effect="scrollx"
                      autoplay={true}
                      autoplaySpeed={3000}
                    >
                      {publicServiceResponse?.images?.map((image) => (
                        <>
                          <div>
                            <div
                              className="service-detail-slide"
                              style={{
                                backgroundImage:
                                  "url(" +
                                  STORAGE_URL +
                                  "/images/" +
                                  image +
                                  ")",
                              }}
                            ></div>
                          </div>
                        </>
                      ))}
                    </Carousel>
                  </>
                ) : (
                  <>
                    <div>
                      <div
                        className="service-detail-slide"
                        style={{
                          backgroundImage:
                            "url(" +
                            STORAGE_URL +
                            "/images/" +
                            publicServiceResponse?.feature_image +
                            ")",
                        }}
                      ></div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div style={{ textAlign: "center", padding: "120px" }}>
            <Spin tip="Loading" size="large">
              <div className="content" />
            </Spin>
          </div>
        </>
      )}
    </>
  );
}

export default Banner;
