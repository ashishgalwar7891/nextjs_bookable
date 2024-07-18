"use client";
import { BOOKING_DETAILS } from "@/Services/frontend";
import { Spin, Table } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
const Index = () => {
  const searchParams = useSearchParams();
  const booking_id = searchParams.get("booking_id");
  const user_id = localStorage.getItem("userId");

  const [apiResponse, setApiResponse] = useState();
  const [loader, setLoader] = useState(true);

  const BOOKING_DETAILS_FETCH = async (l_user_id, type) => {
    setLoader(true);
    const FORM_DATA = new FormData();
    FORM_DATA.append("user_id", l_user_id);
    FORM_DATA.append("booking_id", booking_id);
    const result = await BOOKING_DETAILS(FORM_DATA);
    setApiResponse(result.response.data);
    setLoader(false);
  };
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("userId") !== null) {
      BOOKING_DETAILS_FETCH(localStorage.getItem("userId"));
    }
  }, []);
  const convertDate = (inputDate) => {
    const dateObj = new Date(inputDate);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return dateObj.toLocaleDateString("en-US", options).split(",").join("");
  };
  return (
    <>
      <Fragment>
        {loader ? (
          <>
            <div
              style={{ textAlign: "center", padding: "120px", width: "100%" }}
            >
              <Spin tip="Loading" size="large">
                <div className="content" />
              </Spin>
            </div>
          </>
        ) : (
          <>
            <div style={{ padding: "20px" }}>
              <h3>
                {apiResponse.booking.service_detail.engine === 5
                  ? "Appointment"
                  : "Booking"}{" "}
                Detail
              </h3>
              <div className="three-flex">
                <div>
                  <h4 style={{ fontSize: "18px" }}>User Detail</h4>
                  <br></br>
                  <p style={{ fontSize: "14px", color: "#515151" }}>
                    <b>Name:</b> {apiResponse.user.name}
                  </p>
                  <p style={{ fontSize: "14px", color: "#515151" }}>
                    <b>Phone:</b> {apiResponse.user.personal_mobile}
                  </p>
                  <p style={{ fontSize: "14px", color: "#515151" }}>
                    <b>Email:</b> {apiResponse.user.email}
                  </p>
                </div>
                <div>
                  <h4 style={{ fontSize: "18px" }}>
                    {apiResponse.booking.service_detail.engine === 5
                      ? "Appointment"
                      : "Booking"}{" "}
                    Detail
                  </h4>
                  <br></br>
                  <p style={{ fontSize: "14px", color: "#515151" }}>
                    <b>Service Name:</b>{" "}
                    {apiResponse.booking.service_detail.title}
                  </p>
                  <p style={{ fontSize: "14px", color: "#515151" }}>
                    <b>Location Details:</b> {apiResponse.booking.location_name}
                    , {apiResponse.booking.location_meta.city},{" "}
                    {apiResponse.booking.location_meta.postal_code},{" "}
                    {apiResponse.booking.location_meta.country}
                  </p>
                  <p style={{ fontSize: "14px", color: "#515151" }}>
                    <b>Booking date:</b> {apiResponse.booking.booking_date}{" "}
                    {apiResponse.booking.service_detail.engine === 2 && (
                      <> to {apiResponse?.booking?.meta?.end_date}</>
                    )}
                  </p>
                  <p style={{ fontSize: "14px", color: "#515151" }}>
                    <b>Booking start time:</b>{" "}
                    {apiResponse.booking.booking_start_time}
                  </p>
                  <p style={{ fontSize: "14px", color: "#515151" }}>
                    <b>Booking end time:</b>{" "}
                    {apiResponse.booking.booking_end_time}
                  </p>{" "}
                  <br></br>
                  {apiResponse.booking.service_detail.engine === 3 && (
                    <>
                      <h4 style={{ fontSize: "18px" }}>Subscription Detail</h4>
                      {apiResponse?.booking?.meta?.subscription_details?.map(
                        (item) => (
                          <>
                            <p style={{ fontSize: "14px", color: "#515151" }}>
                              <b>Date:</b> {convertDate(item.date)},{" "}
                              <b>Start time:</b> {item.start_time},{" "}
                              <b>End time:</b> {item.end_time}
                            </p>
                          </>
                        )
                      )}
                    </>
                  )}
                </div>
                {apiResponse.payment && (
                  <>
                    <div>
                      <h4 style={{ fontSize: "18px" }}>Payment Detail</h4>
                      <br></br>
                      <p style={{ fontSize: "14px", color: "#515151" }}>
                        <b>Amount:</b> ${" "}
                        {(apiResponse.payment.amount / 100).toFixed(2)}
                      </p>
                      <p style={{ fontSize: "14px", color: "#515151" }}>
                        <b>Balance Transaction:</b>{" "}
                        {apiResponse.payment.balance_transaction}
                      </p>
                      <p style={{ fontSize: "14px", color: "#515151" }}>
                        <b>Check Receipt:</b>{" "}
                        <span
                          style={{ fontSize: "14px", padding: "4px 20px" }}
                          onClick={() =>
                            window.open(apiResponse.payment.receipt_url)
                          }
                          className="biz-common-btn"
                        >
                          View
                        </span>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </Fragment>
    </>
  );
};

export default Index;
