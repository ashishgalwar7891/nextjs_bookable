import React, { useEffect, useState } from "react";
import { BiHeart } from "react-icons/bi";
import { IoMdPin } from "react-icons/io";
import "./style.css";
import { STORAGE_URL } from "@/Services/vendorService.services";
import { useRouter } from "next/navigation";
import { addToFavouritiesUserServices } from "@/Services/userService.services";
import Favorite from "../biz-buttons/Favorite";

function ServicePackageBox({
  set_service_change,
  service_id,
  location_id,
  service_title,
  service_vendor_id,
  service_vendor_name,
  service_labels,
  feature_image,
  price,
  engine,
  location_title,
  location_meta,
  currency_name,
  currency_symbol,
  discount,
  favorite,
  checkUserLogin,
  user_id,
}) {
  const router = useRouter();
  const handleCardClick = (e) => {
    //alert('Card clicked');

    router.push(
      "/service-detail?serviceId=" +
        service_id +
        "&locationId=" +
        location_id +
        "&VenderId=" +
        service_vendor_id
    );
    // const link = ';
    // window.location.href = link
  };

  const PRICE_DISCOUNT = parseInt(discount);
  const PRICE_VALUE = parseFloat(price);
  const PRICE_DISCOUNT_VALUE = (PRICE_VALUE * (PRICE_DISCOUNT / 100)).toFixed(
    2
  );
  const AFTER_DISCOUNT_PRICE_VALUE = (
    PRICE_VALUE - PRICE_DISCOUNT_VALUE
  ).toFixed(2);
  

 

  return (
    <div className="biz-service-box">
      {parseInt(engine) === 2 && (
        <>
          <span className="biz-service-tag">SUBSCRIPTION</span>
        </>
      )}
      {parseInt(engine) === 3 && (
        <>
          <span className="biz-service-tag">SUBSCRIPTION</span>
        </>
      )}
      {parseInt(engine) === 5 && (
        <>
          <span className="biz-service-tag">APPOINTMENT</span>
        </>
      )}
      {parseInt(engine) === 4 && (
        <>
          <span className="biz-service-tag">PACKAGE</span>
        </>
      )}

      <div
        className="biz-service-image"
        onClick={(e) => handleCardClick(e)}
        style={{
          backgroundImage:
            "url(" + STORAGE_URL + "/images/" + feature_image + ")",
        }}
      ></div>

      <div style={{ padding: "10px" }}>
        <div className="biz-service-label">
          {service_labels?.map((item) => (
            <>
              <span>{item}</span>
            </>
          ))}
        </div>
        <div className="biz-service-heading">
          <h3 onClick={(e) => handleCardClick(e)} style={{ cursor: "pointer" }}>
            {service_title}
          </h3>
        </div>
        <div className="biz-service-vendor">
          <div className="biz-service-vendor-left">{service_vendor_name}</div>
          <div className="biz-service-vendor-right">
            {" "}
            {checkUserLogin && (
              <>
                <Favorite
                  favorite={favorite == true ? 1 : 0}
                  service_id={service_id}
                  package_id={null}
                  location_id={location_id}
                  user_id={user_id}
                  vendor_id={service_vendor_id}
                  service_title={service_title}
                  type="icon"
                />{" "}
              </>
            )}{" "}
          </div>
        </div>
        <div className="biz-service-location">
          <IoMdPin style={{ position: "relative", top: "2px" }} />{" "}
          {location_meta?.city}
        </div>
        <div className="biz-service-price">
          {PRICE_DISCOUNT > 0 ? (
            <>
              <span>
                starts from{" "}
                <b style={{ textDecoration: "line-through", color: "#ed510c" }}>
                  ${price}
                </b>{" "}
                <b
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
                </b>{" "}
                save <b>${PRICE_DISCOUNT_VALUE}</b>
              </span>
              $ {AFTER_DISCOUNT_PRICE_VALUE}
            </>
          ) : (
            <>
              <span>starts from</span>$ {parseFloat(price).toFixed(2)}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServicePackageBox;
