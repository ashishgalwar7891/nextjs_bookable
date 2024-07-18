"use client";
export const dynamic = "force-dynamic";
import SericeDetails from "@/components/User/serviceDetails";
import { useParams, useSearchParams } from "next/navigation";
import head from "next/head";
import "./style.css";
import { Metadata } from "next";
import { Fragment, useEffect, useState } from "react";
import Banner from "@/widgets/service-banner/Banner";
import ServiceSlotCart from "@/widgets/service-slots-cart/ServiceSlotCart";
import ServicePackageBox from "@/widgets/service-package-box/ServicePackageBox";
import { SERVICE_DETAILS } from "@/Services/frontend";
import ReactHtmlParser from "react-html-parser";
import {
  Spin,
  Col,
  Row,
  Button,
  Carousel,
  Dropdown,
  message,
  Input,
  Avatar,
  Rate,
} from "antd";
import { STORAGE_URL } from "@/Services/vendorService.services";

const Index = () => {
  const searchParams = useSearchParams();
  const [loader, set_loader] = useState(true);
  const serviceId = searchParams.get("serviceId");
  console.log("serviceid--------",serviceId)
  const locationId = searchParams.get("locationId");
  const params = { serviceId: serviceId, locationId: locationId };
  const [checkUserLogin, setCheckUserLogin] = useState(false);
  const [user_id, set_user_id] = useState();
  const [pageLoader, setPageLoader] = useState(true);
  // State
  const [publicServiceResponse, setPublicServiceResponse] = useState();
  const [publicBookableLocation, setPublicBookableLocation] = useState();
  const [publicVendorPopularServices, setPublicVendorPopularServices] =
    useState();
  const [
    descriptionPublicServiceResponse,
    setDescriptionPublicServiceResponse,
  ] = useState();

  //  Common states
 
  const SERVICE_DETAILS_FETCH = async (l_user_id) => {
    const FORM_DATA = new FormData();
    FORM_DATA.append("id", serviceId);
    FORM_DATA.append("location_id", locationId);
    FORM_DATA.append("user_id", l_user_id);
    const result = await SERVICE_DETAILS(FORM_DATA);
    setPublicServiceResponse(result.response.data.publicServiceResponse);
    setDescriptionPublicServiceResponse(
      result.response.data.publicServiceResponse.description
    );
    setPublicBookableLocation(result.response.data.publicBookableLocation);
    setPublicVendorPopularServices(
      result.response.data.publicVendorPopularServices
    );
    set_loader(false);
  };

  useEffect(() => {
    if (localStorage.getItem("userId") !== null) {
      set_user_id(localStorage.getItem("userId"));
      setCheckUserLogin(true);
      SERVICE_DETAILS_FETCH(localStorage.getItem("userId"));
    } else {
      SERVICE_DETAILS_FETCH(null);
    }
  }, [searchParams]);

  const defaultImage =
    "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg";
  const ogImage = publicServiceResponse?.feature_image || defaultImage;

  //console.log("og:image", publicServiceResponse);
  return (
    <Fragment>
      {loader ? (
        <>
          <div
            style={{
              textAlign: "center",
              flex: "1",
              maxWidth: "100%",
              padding: "120px",
            }}
          >
            <Spin tip="Loading" size="large">
              <div className="content" />
            </Spin>
          </div>
        </>
      ) : (
        <>
          {publicServiceResponse && (
            <head>
              <title>{publicServiceResponse?.title}</title>
              <meta
                property="twitter:title"
                content={publicServiceResponse?.title}
              />

              <meta
                property="twitter:image"
                content={
                  STORAGE_URL +
                  "/images/" +
                  publicServiceResponse?.feature_image
                }
              />
              <meta
                property="twitter:url"
                content={
                  typeof window !== "undefined"
                    ? window.location.href
                    : "https://dev-web.bookablebiz.website/"
                }
              />
              <meta property="twitter:type" content="website" />
            </head>
          )}

          <Banner
            publicServiceResponse={publicServiceResponse}
            publicBookableLocation={publicBookableLocation}
            checkUserLogin={checkUserLogin}
            user_id={user_id}
          />
          <ServiceSlotCart
            serviceId={serviceId}
            locationId={locationId}
            publicServiceResponse={publicServiceResponse}
            publicBookableLocation={publicBookableLocation}
            checkUserLogin={checkUserLogin}
            user_id={user_id}
          />

          {checkUserLogin && descriptionPublicServiceResponse && (
            <div style={{ padding: "0px 0px" }}>
              <div className="biz-container">
                <div
                  className="biz-row"
                  style={{
                    padding: "0 20px 20px 20px",
                    maxWidth: "1000px",
                    lineHeight: "180%",
                  }}
                >
                  <h3 style={{ margin: "25px 0px" }} className="common-heading">
                    Service Detail
                  </h3>
                  {descriptionPublicServiceResponse &&
                    ReactHtmlParser(descriptionPublicServiceResponse)}
                </div>
              </div>
            </div>
          )}
          <div className="vendor-services">
            <div className="biz-container">
              <h3 className="common-heading">
                Popular services by{" "}
                <span style={{ color: "#EA8933" }}>
                  {publicServiceResponse?.vendor_details?.name}
                </span>
              </h3>
              <div className="biz-flex">
                {publicVendorPopularServices ? (
                  <>
                    {publicVendorPopularServices.length > 0 ? (
                      <>
                        {publicVendorPopularServices?.map((item) => (
                          <>
                            <div>
                              <ServicePackageBox
                                engine={item.engine}
                                service_id={item.service_id}
                                location_id={item.location_id}
                                service_title={item.service_title}
                                service_vendor_id={item.service_vendor_id}
                                service_vendor_name={
                                  publicServiceResponse?.vendor_details?.name
                                }
                                service_labels={item.service_labels}
                                feature_image={item.feature_image}
                                price={item.price}
                                location_title={item.location_title}
                                location_meta={item.location_meta}
                                currency_name={item?.price_array?.currency_name}
                                currency_symbol={
                                  item?.price_array?.currency_symbol
                                }
                                discount={item?.price_array?.discount}
                                favorite={item.favorite}
                                checkUserLogin={checkUserLogin}
                                user_id={user_id}
                              />
                            </div>
                          </>
                        ))}
                      </>
                    ) : (
                      <>
                        <p
                          style={{
                            textAlign: "center",
                            textAlign: "center",
                            fontSize: "27px",
                            margin: "50px 0px",
                            display: "block",
                            color: "#ea8933",
                          }}
                        >
                          No other services available from this vendor.{" "}
                        </p>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        textAlign: "center",
                        flex: "1",
                        maxWidth: "100%",
                        padding: "120px",
                      }}
                    >
                      <Spin tip="Loading" size="large">
                        <div className="content" />
                      </Spin>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};
export default Index;


