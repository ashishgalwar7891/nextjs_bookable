"use client";
export const dynamic = "force-dynamic";
import SericeDetails from "@/components/User/serviceDetails";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import "./style.css";
import { Fragment, useEffect, useState } from "react";
import Banner from "@/widgets/service-banner/Banner";
import ServiceSlotCart from "@/widgets/service-slots-cart-preview/ServiceSlotCart";
import ServicePackageBox from "@/widgets/service-package-box/ServicePackageBox";
import { PREVIEW_SERVICE_DETAILS } from "@/Services/vendorService.services";
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

const Index = () => {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("id");
  const type = searchParams.get("type");
  const callType = "preview";
  const router = useRouter();
  const [checkUserLogin, setCheckUserLogin] = useState(false);
  const [user_id, set_user_id] = useState();

  useEffect(() => {
    if (localStorage.getItem("role") !== "vendor") {
      router.back();
    }
  }, []);

  // Service Details States to SAVE API Data

  const [publicServiceResponse, setPublicServiceResponse] = useState();
  const [publicBookableLocation, setPublicBookableLocation] = useState();
  const [publicVendorPopularServices, setPublicVendorPopularServices] =
    useState();
  const [
    descriptionPublicServiceResponse,
    setDescriptionPublicServiceResponse,
  ] = useState();

  const SERVICE_DETAILS_FETCH = async (l_user_id) => {
    const FORM_DATA = new FormData();
    FORM_DATA.append("id", serviceId);
    FORM_DATA.append("user_id", l_user_id);

    const result = await PREVIEW_SERVICE_DETAILS(FORM_DATA);
    console.log("service detail api result data", result?.response);
    setPublicServiceResponse(result?.response.data?.publicServiceResponse);
    setDescriptionPublicServiceResponse(
      result?.response?.data.publicServiceResponse?.description
    );
    setPublicBookableLocation(result?.response?.data?.publicBookableLocation);
    //  setPublicVendorPopularServices(result?.response.data?.publicVendorPopularServices);
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

  return (
    <Fragment>
      <div style={{ marginTop: "-17px" }}>
        {/*    <h1>Hello, This is from preview Service Page (page.jsx) for service id {serviceId} for type {type} </h1> */}
        {publicServiceResponse && publicBookableLocation ? (
          <>
            <Banner
            publicServiceResponse={publicServiceResponse}
            publicBookableLocation={publicBookableLocation}
            checkUserLogin={checkUserLogin}
            user_id={user_id}
          />
          <ServiceSlotCart
          serviceId={serviceId}
          locationId={publicBookableLocation?.locationId}
          publicServiceResponse={publicServiceResponse}
          publicBookableLocation={publicBookableLocation}
          checkUserLogin={checkUserLogin}
          user_id={user_id}
        />
          <div style={{ padding: "0px 0px" }}>
                    <div className='biz-container'>
                        <div className='biz-row' style={
                            {
                                padding: '0 20px 20px 20px',
                                maxWidth: '1000px',
                                lineHeight: '180%'
                            }

                        }>
                            <h3 style={{ margin: '25px 0px' }} className="common-heading">Service Detail</h3>
                            {publicServiceResponse?.description &&
                                ReactHtmlParser(publicServiceResponse?.description)
                            }
                        </div>
                    </div>
                </div>
          </>
        ) : <>
           <h3 style={{ textAlign:"center", padding:"30px"}}>Service Preview</h3>
          <p style={{ textAlign:"center",  color:"red" }}>Banner Data is Empty</p>
          <p style={{ textAlign:"center",  color:"red"  }}>Slots Data not set yet</p>
        </>}
      </div>
    </Fragment>
  );
};
export default Index;
