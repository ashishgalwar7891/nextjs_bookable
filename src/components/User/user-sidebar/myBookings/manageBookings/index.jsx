import { Col, Row, Form, Button, Spin } from "antd";
import { Fragment, useState, useEffect } from "react";
import {
  CustTitleText,
  CustomGreyText,
  CustomText,
  StyledText,
} from "../styledComponent";
import {
  EnvironmentOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { RegisterButton } from "@/styles/styledComponent";
import {
  StyledAmtText,
  StyledDateText,
  StyledTitleText,
} from "@/components/User/booking/styledComponent";
import { CancelMyBookingsByIdServices } from "@/Services/sidebar.service";
import { getVendorSettingsService } from "@/Services/vendor.settings";
import BookingModal from "@/lib/commonComponent/BookingModal/BookingModal";
import { useRouter } from "next/navigation";
import RescheduleModal from "@/lib/commonComponent/RescheduleModal";
import BookingCancelModal from "@/lib/commonComponent/BookingModal";
import { usePathname } from "next/navigation";
import { STORAGE_URL } from "@/Services/vendorService.services";
import { SERVICE_DETAILS } from "@/Services/frontend";

const ManageBookings = ({ bookData, setShowManageBookings }) => {
  const pathname = usePathname();
  const [userData, setUserData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mahesh code Here

  console.log("bookData====>>>", bookData.store_front_setting);

  const [bookingDate, setBookingDate] = useState();
  const [cancelCharge, setCancelCharge] = useState();
  const [cancelation, setCancelation] = useState(false);

  useEffect(() => {
    (async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      setUserData({ user_id: userId, token: token });
      var date1 = new Date(bookData?.booking_date); // Replace with your first date
      var date2 = new Date(); // Replace with your second date
      // const hours = Number(bookData.store_front_setting.cancellation_details.substring(28,30));
      // const percentage = Number(bookData.store_front_setting.cancellation_details.substring(49,51));
      // console.log("bookData===cancellation_details===>>>",Number(bookData.store_front_setting.cancellation_details.substring(28,30)));
      // console.log("bookData===cancellation_details===>>>",Number(bookData.store_front_setting.cancellation_details.substring(49,51)));

      // var timeDifference = date1.getTime() - date2.getTime();
      // var daysDifference = parseInt(timeDifference / (1000 * 60 * 60 * 24));
      // console.log('daysDifference', bookData);
      // console.log("bookData===sddfdg>>>",bookData.store_front_setting);

      if (bookData.store_front_setting === null) {
        setCancelCharge(false);
      } else if (
        bookData.store_front_setting.cancellation_policy === "no_cancellation"
      ) {
        setCancelCharge(false);
      } else if (
        bookData.store_front_setting.cancellation_policy ===
        "service_cancellation"
      ) {
        const hours = Number(
          bookData.store_front_setting.cancellation_details.substring(28, 30)
        );
        const percentage = Number(
          bookData.store_front_setting.cancellation_details.substring(49, 51)
        );
        const adjustedDate = new Date(date1.getTime() - hours * 60 * 60 * 1000);

        if (date2 <= adjustedDate) {
          console.log("inside date2 <= adjustedDate")
          setCancelation(true);
          setCancelCharge(1);
        } else if (date2 > adjustedDate) {
          console.log("inside date2 > adjustedDate")
          setCancelation(true);
          setCancelCharge(percentage / 100);
        } else {
          console.log("inside else")
          setCancelation(false);
        }
      }
    })();
  }, []);

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleOk = async () => {
    try {
      setIsLoading(true);
      const dataObj = {
        token: userData?.token,
        user_id: userData?.user_id,
        booking_id: bookData?.id,
        cancelCharge:
          parseFloat(bookData?.price_detail?.totalPrice) * cancelCharge,
        order_id: bookData?.order_id,
        vendor_id: bookData?.vendor_id,
        service_id: bookData?.service_id,
        booking_date: bookData?.booking_date,
        booking_intent_id: bookData?.booking_intent_id,
      };

      const response = await CancelMyBookingsByIdServices(dataObj);
      if (response?.response?.status === 200) {
        setShowModal(false);
        BookingModal(bookData);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    setShowManageBookings(false);
  };
  const convertDate = (inputDate) => {
    const dateObj = new Date(inputDate);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return dateObj.toLocaleDateString("en-US", options).split(",").join("");
  };
  return (
    <>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        {isLoading ? (
          <>
            {" "}
            <Spin spinning={isLoading} />
          </>
        ) : (
          <>
            <BookingCancelModal
              title="Title"
              open={showModal}
              onOk={handleOk}
              onCancel={handleCancel}
              modelText={bookData}
              cancelCharge={cancelCharge}
            />

            <RescheduleModal
              open={showModal2}
              modelText={bookData}
              cancelCharge={cancelCharge}
              order_id={bookData?.order_id}
              setOpen={setShowModal2}
            />

            <Col span={24} style={{ marginBottom: "10px" }}>
              <LeftOutlined style={{ color: "#EA8933" }} />
              <span
                onClick={handleBack}
                style={{ color: "#EA8933", cursor: "pointer" }}
              >
                Go Back{" "}
              </span>
            </Col>

            <Col lg={20} style={{ background: "#ffffff", padding: "20px" }}>
              <Row
                style={{ color: "#72959A", fontWeight: 600, fontSize: "18px" }}
              >
                {pathname == "/mybookings"
                  ? "Manage your booking"
                  : "Manage your Appointment"}
              </Row>

              <Row style={{ display: "flex", padding: "10px" }} gutter={24}>
                <Col lg={4} md={7} sm={8} xs={12}>
                  <img
                    style={{
                      objectFit: "cover",
                      maxWidth: "100%",
                      borderRadius: "6px",
                    }}
                    src={
                      STORAGE_URL + "/images/" + bookData?.feature_image ||
                      "no data"
                    }
                  />
                </Col>
                <Col lg={12} md={12} sm={16} xs={24}>
                  <Row>
                    <span
                      style={{ fontSize: "12px", fontWeight: 600 }}
                    >{`Booking #${bookData?.id}`}</span>

                    <Col
                      span={24}
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      {bookData?.booking_engine == 1 ||
                        (bookData?.booking_engine == 6 && (
                          <CustomText>
                            {`
                                                Booking #${
                                                  bookData?.id || "no data"
                                                } 
                                                ${
                                                  bookData?.booking_date ||
                                                  "no data"
                                                }, 
                                                ${
                                                  bookData?.booking_start_time ||
                                                  "no data"
                                                }
                                            `}
                          </CustomText>
                        ))}
                      {bookData?.booking_engine == 2 && (
                        <CustomText>
                          {`
                                                Booking #${
                                                  bookData?.id || "no data"
                                                } 
                                                ${
                                                  bookData?.booking_date ||
                                                  "no data"
                                                } -  ${
                            bookData?.end_date || "no data"
                          } 
                                                ${
                                                  bookData?.booking_start_time ||
                                                  "no data"
                                                }
                                            `}
                        </CustomText>
                      )}
                      {bookData?.booking_engine == 3 &&
                        bookData.session_details !== null &&
                        bookData.session_details.map((val, ind) => {
                          return (
                            <>
                              <CustomText>
                                {`
                                                        Booking #${
                                                          bookData?.id ||
                                                          "no data"
                                                        } 
                                                        ${
                                                          convertDate(
                                                            val?.date
                                                          ) || "no data"
                                                        }, 
                                                        ${
                                                          val?.start_time ||
                                                          "no data"
                                                        }
                                                    `}
                              </CustomText>
                            </>
                          );
                        })}
                      {bookData?.booking_engine == 5 && (
                        <CustomText>
                          {`
                                                Booking #${
                                                  bookData?.id || "no data"
                                                } 
                                                ${
                                                  bookData?.booking_date ||
                                                  "no data"
                                                }, 
                                                ${
                                                  bookData?.booking_start_time ||
                                                  "no data"
                                                }
                                            `}
                        </CustomText>
                      )}

                      <span style={{ fontSize: "18px", fontWeight: 600 }}>
                        {bookData?.service_name || "No data"}
                      </span>

                      <CustomText>
                        {bookData?.vendor_name || "No data"}
                      </CustomText>
                      <CustomText
                        style={{ margin: "8px 0 2px 0", color: "#2C2C2C" }}
                      >
                        {" "}
                        <EnvironmentOutlined />{" "}
                        {bookData?.location_name || "no data"}
                      </CustomText>
                      <CustomText
                        style={{ margin: "0px 0 8px 0", color: "#2C2C2C" }}
                      >
                        {" "}
                        {bookData?.location_address || "no data"}
                      </CustomText>
                      {pathname == "/mybookings" && (
                        <>
                          <CustomGreyText>
                            Paid Via Credit/Debit card
                          </CustomGreyText>
                          {parseInt(bookData?.price_detail?.discount) > 0 && (
                            <>
                              <span>
                                {`$ ${
                                  bookData?.price_detail?.price || "no data"
                                }`}{" "}
                                (Discount -{" "}
                                {`${
                                  bookData?.price_detail?.discount || "no data"
                                }`}
                                %)
                              </span>
                            </>
                          )}
                          {parseInt(bookData?.booking_engine) !== 6 && (
                            <>
                              <StyledText>
                                You have paid{" "}
                                <StyledAmtText
                                  style={{ paddingLeft: "10px" }}
                                >{`$ ${
                                  bookData?.price_detail?.totalPrice ||
                                  "no data"
                                }`}</StyledAmtText>{" "}
                              </StyledText>
                              <StyledText>
                                You have paid{" "}
                                <StyledAmtText
                                  style={{ paddingLeft: "10px" }}
                                >{`$ ${
                                  bookData?.price_detail?.totalPrice ||
                                  "no data"
                                }`}</StyledAmtText>{" "}
                              </StyledText>
                            </>
                          )}
                        </>
                      )}
                    </Col>
                    <Col
                      style={{
                        display: "flex",
                        justifyContent: "end",
                        gap: "15px",
                      }}
                    >
                      {cancelation ? (
                        <>
                          <RegisterButton
                            style={{ height: "33px", width: "125px" }}
                            onClick={() => {
                              setShowModal2(true);
                            }}
                          >
                            Reschedule
                          </RegisterButton>
                          <Button
                            style={{
                              height: "33px",
                              width: "auto",
                              color: "#000",
                              border: "1px solid #000",
                            }}
                            onClick={() => {
                              setShowModal(true);
                            }}
                            disabled={isLoading}
                          >
                            {pathname == "/mybookings" ? (
                              <b>Cancel Booking </b>
                            ) : (
                              <b>Cancel Appointment</b>
                            )}
                          </Button>
                        </>
                      ) : (
                        <>
                          <div>
                            <RegisterButton
                              style={{ height: "33px", width: "125px" }}
                              onClick={() => {
                                setShowModal2(true);
                              }}
                            >
                              Reschedule
                            </RegisterButton>
                            <Button
                              style={{
                                height: "33px",
                                width: "auto",
                                color: "#000",
                                border: "1px solid #000",
                                cursor: "not-allowed",
                                margin: "10px",
                              }}
                            >
                              {pathname == "/mybookings" ? (
                                <b>
                                  Cancel booking not allowed
                                </b>
                              ) : (
                                <b>
                                  Cancel appointment not allowed
                                </b>
                              )}
                            </Button>
                            <p
                              style={{
                                color:"red",
                                marginTop: "10px",
                                fontStyle: "italic",
                              }}
                            >
                              Your booking is scheduled in less than 48 hrs. You
                              cannot cancel or reschedule from here. Please
                              contact the Business Owner.
                            </p>
                          </div>
                        </>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </>
        )}
      </Row>
    </>
  );
};

export default ManageBookings;
