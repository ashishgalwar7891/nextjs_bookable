import { Fragment, useState, useEffect } from "react";
import { Col, Row, Form, Button, Spin } from 'antd';
import profileLogo from '../../../../assets/imgs/icon/profile.svg';
import Image from "next/image";
import { CalendarOutlined, EnvironmentOutlined, HeartOutlined } from "@ant-design/icons";
import { CustomText, CustomTitleText, BookingRow } from "./styledComponent";
import { BodyDemi, BodyTiny, RegisterButton, TitleBold } from "@/styles/styledComponent";
import { GetAllMyAppointmentServices, GetAllMyBookingsServices } from "@/Services/sidebar.service";
import ManageBookings from "./manageBookings";
import { StyledHr } from "@/components/vendor-payment/styledComponent";
import CircleDashed from '../../../../assets/imgs/icon/CircleDashed.svg';
import CheckTick from '../../../../assets/imgs/icon/check-tick.svg';
import { usePathname } from "next/navigation";
import RatingDrawer from "../../RatingDrawer";
import { STORAGE_URL } from "@/Services/vendorService.services";
import { useCart } from "@/components/Layout";

const UserBookings = () => {
    const [form] = Form.useForm();
    const pathname = usePathname()
    const { setCartRefresh } = useCart();
    const [reviewData, setReviewData] = useState();
    const [userId, setUserId] = useState();
    const [userToken, setUserToken] = useState();
    const [apiData, setApiData] = useState();
    const [showManageBookings, setShowManageBookings] = useState(false);
    const [bookData, setBookData] = useState();
    const [open, setOpen] = useState(false);
    const [pageLoader, setPageLoader] = useState(true);

    useEffect(() => {
        (async () => {
            const userId = localStorage.getItem('userId')
            const token = localStorage.getItem('token')
            setUserId(userId)
            setUserToken(token)
            let result;
            let response;
            if (pathname == '/mybookings') {
                response = await GetAllMyBookingsServices({ "token": token, "user_id": userId });
                result = response?.response?.data;
                console.log("GetAllMyBookingsServices====>>>", result)

            } else if (pathname == '/myappointment') {
                response = await GetAllMyAppointmentServices({ "token": token, "user_id": userId });
                result = response?.response?.data;
            }

            if (response?.response?.status === 200) {
                if (result?.upcomingBookings && result?.upcomingBookings.length > 0) {
                    const sortUpComming = result.upcomingBookings.sort(sortByDueDate);
                    result.upcomingBookings = sortUpComming;
                }

                if (result?.inProgressBookings && result?.inProgressBookings.length > 0) {
                    const sortInprogress = result.inProgressBookings.sort(sortByDueDate);
                    result.inProgressBookings = sortInprogress;
                }

                if (result?.sortPrevBook && result?.sortPrevBook.length > 0) {
                    const sortPrevBook = result.previousBookings.sort(sortByDueDate);
                    result.previousBookings = sortPrevBook;
                }

                if (result?.canceledBookings && result?.canceledBookings.length > 0) {
                    const sortCancelBook = result.canceledBookings.sort(sortByCancelDate);
                    result.canceledBookings = sortCancelBook;
                }
                setCartRefresh(true);
                setApiData(result)
                setPageLoader(false)
            }
        })();
    }, []);

    const sortByDueDate = (a, b) => {
        const dateA = new Date(a.booking_date);
        const dateB = new Date(b.booking_date);
        return dateA - dateB;
    };

    const sortByCancelDate = (a, b) => {
        const dateA = new Date(a.cancel_date);
        const dateB = new Date(b.cancel_date);
        return dateA - dateB;
    };

    const handleManageBooking = (data) => {
        console.log("handleManageBooking ====>>",data)
        setBookData(data);
        setShowManageBookings(true);
    }

    const handleRateClick = (data) => {
        setOpen(true)
        setReviewData(data);
    }

    const handleAddToFavourites = async (isFavorite) => {
        console.log("Is Favorite on Click ==>>", isFavorite);
        // const DataObj = {
        //     "token": userToken,
        //     "user_id": userId,
        //     "vendor_id": apiData?.["vendor-id"],
        //     "location_id": ServicePlaceId,
        //     "service_id": ServiceId,
        //     "isFavorite": !isFavorite
        // }
        // console.log("Data object ==>>", DataObj);
        // const response = await addToFavouritiesUserServices(DataObj);
        // console.log("Response ==>>", response);
    }
    const convertDate = (inputDate) => {
        const dateObj = new Date(inputDate);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return dateObj.toLocaleDateString('en-US', options).split(',').join('');
    };
    return (
        <Fragment>
            <div className="biz-container">
                {pageLoader ? <>  <div style={{ textAlign: "center", padding: "120px" }}>
                    <Spin tip="Loading" size="large">
                        <div className="content" />
                    </Spin>
                </div></> : <>
                    <Row style={{ width: '100%' }}>
                        <RatingDrawer open={open} setOpen={setOpen} reviewData={reviewData} userId={userId} userToken={userToken} />
                        <Col span={24} style={{ margin: '25px 0', padding: '0px 20px' }} >
                            {!showManageBookings && <Row style={{ display: 'flex', justifyContent: 'center' }}>
                                <Col span={24} >
                                    <Row style={{ fontSize: '16px', fontWeight: 400, color: '#72959A', gap: '10px' }}>
                                        <Col style={{ marginTop: '-4px' }} >
                                            <TitleBold style={{ color: (pathname == '/mybookings') ? '#021545' : '#450303' }} >{(pathname == '/mybookings') ? "My Bookings" : 'My Appointments'} </TitleBold>
                                        </Col>
                                    </Row>

                                    <Row style={{ height: '100%' }}>
                                        {/* ====================== Upcoming Bookings ============= */}
                                        {apiData && apiData?.upcomingBookings && apiData?.upcomingBookings.length > 0 &&
                                            <Col span={24}>
                                                <Row style={{ margin: '10px 0' }}>
                                                    <CustomTitleText>{(pathname == '/mybookings') ? "Upcoming bookings" : 'Upcoming Appointments'}</CustomTitleText>
                                                </Row>
                                                {apiData?.upcomingBookings.map((item, index) => {
                                                    return (
                                                        <>
                                                            <BookingRow style={{ display: 'flex', alignItems: 'start', justifyContent: 'start', width: '100%' }} gutter={24} >
                                                                <Col lg={4} md={7} sm={8} xs={12} className="BookingImage">
                                                                    <img style={{ objectFit: 'cover', maxWidth: '100%', borderRadius: '6px' }}
                                                                        src={STORAGE_URL + '/images/' + item?.feature_image || 'no data'}
                                                                    />
                                                                </Col>

                                                                <Col lg={12} md={12} sm={10} xs={24} style={{ display: "flex", flexDirection: "column" }}>
                                                                    <span style={{ fontSize: '18px', fontWeight: 600 }} >{item?.service_name || 'no data'} {item.reschedule_status === 1 && <>
                                                                        <span style={{ backgroundColor: "red", fontSize: "10px", marginLeft: "15px", color: "#fff", padding: "3px 10px" }}>Booking Rescheduled</span>
                                                                    </>}</span>

                                                                    <CustomText>{item?.vendor_name || 'no data'} </CustomText>

                                                                    {item?.booking_engine == 1 || item?.booking_engine == 6 &&
                                                                        <CustomText>
                                                                            {`
                                                                        Booking #${item?.id || 'no data'} 
                                                                        ${item?.booking_date || 'no data'}, 
                                                                        ${item?.booking_start_time || 'no data'}
                                                                    `}
                                                                        </CustomText>
                                                                    }
                                                                    {item?.booking_engine == 2 &&
                                                                        <CustomText>
                                                                            {`
                                                                        Booking #${item?.id || 'no data'} 
                                                                        ${item?.booking_date || 'no data'} -  ${item?.end_date || 'no data'} 
                                                                        ${item?.booking_start_time || 'no data'}
                                                                    `}
                                                                        </CustomText>
                                                                    }
                                                                    {item?.booking_engine == 3 && item.session_details !== null && item.session_details.map((val, ind) => {
                                                                        return (
                                                                            <>
                                                                                <CustomText>
                                                                                    {`
                                                                                Booking #${item?.id || 'no data'} , 
                                                                                ${convertDate(val?.date) || 'no data'}, 
                                                                                ${val?.start_time || 'no data'}
                                                                            `}
                                                                                </CustomText>
                                                                            </>
                                                                        )
                                                                    })
                                                                    }
                                                                    {item?.booking_engine == 5 &&
                                                                        <CustomText>
                                                                            {`
                                                                        Booking #${item?.id || 'no data'} 
                                                                        ${item?.booking_date || 'no data'}, 
                                                                        ${item?.booking_start_time || 'no data'}
                                                                    `}
                                                                        </CustomText>
                                                                    }

                                                                    <CustomText style={{ margin: '8px 0 2px 0', color: '#2C2C2C' }}> <EnvironmentOutlined /> {item?.location_name || 'no data'},  {item?.location_address || 'no data'}</CustomText>
                                                                    <Row style={{ display: 'flex', cursor: 'pointer', gap: '10px' }}>
                                                                        <span onClick={() => handleManageBooking(item)} style={{ color: '#ED510C' }}>{`Manage ${(pathname == '/mybookings') ? "booking" : 'Appointment'}`}</span>
                                                                        <span style={{ color: '#ED510C' }}>Help</span>
                                                                    </Row>
                                                                </Col>

                                                                <Col lg={8} md={4} sm={6} xs={24} style={{ display: 'flex', alignItems: 'end', flexDirection: 'column' }}>
                                                                    {
                                                                        (pathname == '/mybookings') ?
                                                                            <CustomText> Due on {convertDate(item?.booking_date)} <CalendarOutlined /> </CustomText> :
                                                                            <>
                                                                                <Row style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                                                                    <Col span={24}>
                                                                                        <BodyTiny className="appointments_span" style={{ fontSize: "18px" }}>Your message</BodyTiny> <br />
                                                                                        <BodyTiny style={{ color: '#999393' }}>{item?.message ? item?.message : "No message"}</BodyTiny>
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row>
                                                                                    <Col lg={24} style={{ display: 'flex', flexDirection: 'column' }}>
                                                                                        <BodyTiny className="appointments_span" style={{ fontSize: "18px" }}>Consultation price</BodyTiny>
                                                                                        <Row style={{ display: 'flex', flexDirection: 'column' }}>
                                                                                            <Col lg={24}>
                                                                                                <BodyTiny style={{ color: '#999393' }}>Consultation price will be paid at the location. </BodyTiny>
                                                                                                <BodyTiny style={{ color: '#999393' }}>No consultation charges if you take a service at the the location </BodyTiny>
                                                                                            </Col>
                                                                                            <Col lg={24} style={{ display: 'flex', alignItems: 'end' }}>
                                                                                                <BodyDemi>{`$ ${parseInt(item?.price)?.toFixed(2)}`}</BodyDemi>
                                                                                            </Col>
                                                                                        </Row>
                                                                                    </Col>
                                                                                </Row>
                                                                            </>
                                                                    }
                                                                </Col>

                                                            </BookingRow>
                                                            <StyledHr />
                                                        </>
                                                    )
                                                })}
                                            </Col>
                                        }

                                        {/* ====================== In Progress Bookings ============= */}
                                        {apiData && apiData?.inProgressBookings && apiData?.inProgressBookings.length > 0 &&
                                            <Col span={24}>
                                                <Row style={{ margin: '10px 0' }}>
                                                    <CustomTitleText>In progress</CustomTitleText>
                                                </Row>

                                                {apiData?.inProgressBookings?.map((item, index) => {
                                                    return (
                                                        <>
                                                            <BookingRow style={{ display: 'flex', alignItems: 'start', justifyContent: 'start', width: '100%' }} gutter={24} >
                                                                <Col lg={4} md={7} sm={8} xs={12}>
                                                                    <img style={{ objectFit: 'cover', maxWidth: '100%', borderRadius: '6px' }}
                                                                        src={STORAGE_URL + '/images/' + item?.feature_image || 'no data'}
                                                                    />
                                                                </Col>

                                                                <Col lg={12} md={12} sm={10} xs={24} style={{ display: "flex", flexDirection: "column" }}>
                                                                    <span style={{ fontSize: '18px', fontWeight: 600 }} >{item?.service_name || 'no data'} {item.reschedule_status === 1 && <>
                                                                        <span style={{ backgroundColor: "red", fontSize: "10px", marginLeft: "15px", color: "#fff", padding: "3px 10px" }}>Booking Rescheduled</span>
                                                                    </>}</span>

                                                                    <CustomText>{item?.vendor_name || 'no data'} </CustomText>

                                                                    {item?.booking_engine == 1 || item?.booking_engine == 6 &&
                                                                        <CustomText>
                                                                            {`
                                                                        Booking #${item?.id || 'no data'} 
                                                                        ${item?.booking_date || 'no data'},
                                                                        ${item?.booking_start_time || 'no data'}
                                                                    `}
                                                                        </CustomText>
                                                                    }
                                                                    {item.booking_engine == 2 &&
                                                                        <CustomText>
                                                                            {`
                                                                        Booking #${item?.id || 'no data'} 
                                                                        ${item?.booking_date || 'no data'} - ${item?.end_date || 'no data'}
                                                                        ${item?.booking_start_time || 'no data'}
                                                                    `}
                                                                        </CustomText>
                                                                    }
                                                                    {item?.booking_engine == 3 && item.session_details !== null && item.session_details.map((val, ind) => {
                                                                        return (
                                                                            <>
                                                                                <CustomText>
                                                                                    {`
                                                                                Booking #${item?.id || 'no data'} , 
                                                                                ${convertDate(val?.date) || 'no data'}, 
                                                                                ${val?.start_time || 'no data'}
                                                                            `}
                                                                                </CustomText>
                                                                            </>
                                                                        )
                                                                    })
                                                                    }

                                                                    <CustomText style={{ margin: '8px 0 2px 0', color: '#2C2C2C' }}> <EnvironmentOutlined /> {item?.location_name || 'no data'}</CustomText>
                                                                    <CustomText style={{ margin: '0px 0 82px 0', color: '#2C2C2C' }}> {item?.location_address || 'no data'}</CustomText>

                                                                    <Row style={{ display: 'flex', cursor: 'pointer', gap: '10px' }}>
                                                                        <span style={{ color: '#ED510C', marginTop: '5px' }}> View Details </span>
                                                                        <span style={{ color: '#ED510C', marginTop: '5px' }}> Help</span>
                                                                        <RegisterButton style={{ height: '33px', width: '178px', borderColor: 'transparent' }} onClick={() => { }}>
                                                                            Add to favourites <HeartOutlined />
                                                                        </RegisterButton>
                                                                    </Row>
                                                                </Col>

                                                                <Col lg={8} md={4} sm={6} xs={24} style={{ display: 'flex', alignItems: 'end', flexDirection: 'column' }}>
                                                                    <Row style={{ fontSize: '12px', fontWeight: 400, marginTop: '8px' }}> In progress <span style={{ marginLeft: '5px' }}> <Image src={CircleDashed} /> </span> </Row>
                                                                </Col>

                                                            </BookingRow>
                                                            <StyledHr />
                                                        </>
                                                    )
                                                })}
                                            </Col>
                                        }

                                        {/* ====================== Previous Bookings ============= */}
                                        {apiData && apiData?.previousBookings && apiData?.previousBookings.length > 0 &&
                                            <Col span={24}>
                                                <Row style={{ margin: '10px 0' }}>
                                                    <CustomTitleText>{(pathname == '/mybookings') ? "Previous bookings" : "Previous Appointments"}</CustomTitleText>
                                                </Row>

                                                {apiData && apiData?.previousBookings?.map((item, index) => {
                                                    return (
                                                        <>
                                                            <BookingRow style={{ display: 'flex', alignItems: 'start', justifyContent: 'start', width: '100%' }} gutter={24} >
                                                                <Col lg={4} md={7} sm={8} xs={12}>
                                                                    <img style={{ objectFit: 'cover', maxWidth: '100%', borderRadius: '6px' }}
                                                                        src={STORAGE_URL + '/images/' + item?.feature_image || 'no data'}
                                                                    />
                                                                </Col>

                                                                <Col lg={12} md={12} sm={10} xs={24} style={{ display: "flex", flexDirection: "column" }}>

                                                                    <CustomText>{item?.vendor_name || 'no data'} </CustomText>

                                                                    {item?.booking_engine == 1 || item?.booking_engine == 6 &&
                                                                        <CustomText>
                                                                            {`
                                                                            Booking #${item?.id || 'no data'} 
                                                                            ${item?.booking_date || 'no data'}, 
                                                                            ${item?.booking_start_time || 'no data'}
                                                                        `}
                                                                        </CustomText>
                                                                    }

                                                                    {item.booking_engine == 2 &&
                                                                        <CustomText>
                                                                            {`
                                                                            Booking #${item?.id || 'no data'} 
                                                                            ${item?.booking_date || 'no data'} - ${item?.end_date || 'no data'}
                                                                            ${item?.booking_start_time || 'no data'}
                                                                        `}
                                                                        </CustomText>
                                                                    }
                                                                    {item?.booking_engine == 3 && item.session_details !== null && item.session_details.map((val, ind) => {
                                                                        return (
                                                                            <>
                                                                                <CustomText>
                                                                                    {`
                                                                                Booking #${item?.id || 'no data'} , 
                                                                                ${convertDate(val?.date) || 'no data'}, 
                                                                                ${val?.start_time || 'no data'}
                                                                            `}
                                                                                </CustomText>
                                                                            </>
                                                                        )
                                                                    })
                                                                    }
                                                                    {item?.booking_engine == 5 &&
                                                                        <CustomText>
                                                                            {`
                                                                        Booking #${item?.id || 'no data'} 
                                                                        ${item?.booking_date || 'no data'}, 
                                                                        ${item?.booking_start_time || 'no data'}
                                                                    `}
                                                                        </CustomText>
                                                                    }

                                                                    <span style={{ fontSize: '18px', fontWeight: 600 }} >{item?.service_name || 'no data'}</span>

                                                                    <CustomText style={{ margin: '8px 0 2px 0', color: '#2C2C2C' }}> <EnvironmentOutlined /> {item?.location_name || 'no data'}</CustomText>
                                                                    <CustomText style={{ margin: '0px 0 82px 0', color: '#2C2C2C' }}> {item?.location_address || 'no data'}</CustomText>

                                                                    <Row style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '10px' }}>
                                                                        <span style={{ color: '#ED510C' }}> View Details </span>
                                                                        <span style={{ color: '#ED510C' }}> Help</span>
                                                                        <Button style={{ height: '33px', width: 'auto', background: '#F2F1F0', color: '#ED510C' }} onClick={() => { }}>
                                                                            <strong>Rebook</strong>
                                                                        </Button>
                                                                    </Row>
                                                                    <Row style={{ display: 'flex', cursor: 'pointer', gap: '10px', margin: '10px 0' }}>

                                                                        <Button
                                                                            style={{ height: '33px', width: 'auto', background: '#EA8933', color: '#ffffff' }}
                                                                            onClick={() => handleAddToFavourites(item?.isFavorite)}
                                                                        >
                                                                            <strong>Add to favourites</strong>
                                                                        </Button>
                                                                        <Button style={{ height: '33px', width: 'auto', background: '#F2F1F0', color: '#ED510C' }} onClick={() => { handleRateClick(item) }}>
                                                                            <strong>Rate</strong>
                                                                        </Button>
                                                                    </Row>
                                                                </Col>

                                                                <Col lg={8} md={4} sm={6} xs={24} style={{ display: 'flex', alignItems: 'end', flexDirection: 'column' }}>
                                                                    {
                                                                        (pathname == '/mybookings') ?
                                                                            <Row style={{ fontSize: '12px', fontWeight: 400, marginTop: '8px' }}> Service delivered <span style={{ marginLeft: '5px' }}> <Image src={CheckTick} /> </span> </Row> :
                                                                            <Row>
                                                                                <Col>
                                                                                    <BodyTiny style={{ color: '#999393' }}>Your message</BodyTiny> <br />
                                                                                    <BodyTiny>{item?.message}</BodyTiny>
                                                                                </Col>
                                                                            </Row>
                                                                    }
                                                                </Col>

                                                            </BookingRow>
                                                            <StyledHr />
                                                        </>
                                                    )
                                                })}
                                            </Col>
                                        }

                                        {/* ====================== Cancel Bookings ============= */}
                                        {apiData && apiData?.canceledBookings && apiData?.canceledBookings.length > 0 &&
                                            <Col span={24}>
                                                <Row style={{ margin: '10px 0' }}>
                                                    <CustomTitleText>{(pathname == '/mybookings') ? "Canceled bookings" : "Canceled Appointments"}</CustomTitleText>
                                                </Row>

                                                {apiData && apiData?.canceledBookings?.map((item, index) => {
                                                    return (
                                                        <>
                                                            <BookingRow style={{ display: 'flex', alignItems: 'start', justifyContent: 'start', width: '100%' }} gutter={24} >
                                                                <Col lg={4} md={7} sm={8} xs={12}>
                                                                    <img style={{ objectFit: 'cover', maxWidth: '100%', borderRadius: '6px' }}
                                                                        src={STORAGE_URL + '/images/' + item?.feature_image || 'no data'}
                                                                    />
                                                                </Col>

                                                                <Col lg={12} md={12} sm={10} xs={24} style={{ display: "flex", flexDirection: "column" }}>

                                                                    <CustomText>{item?.vendor_name || 'no data'} </CustomText>

                                                                    {item?.booking_engine == 1 || item?.booking_engine == 6 &&
                                                                        <CustomText>
                                                                            {`
                                                                            Booking #${item?.id || 'no data'} 
                                                                            ${item?.booking_date || 'no data'}, 
                                                                            ${item?.booking_start_time || 'no data'}
                                                                        `}
                                                                        </CustomText>
                                                                    }

                                                                    {item.booking_engine == 2 &&
                                                                        <CustomText>
                                                                            {`
                                                                            Booking #${item?.id || 'no data'} 
                                                                            ${item?.booking_date || 'no data'} - ${item?.end_date || 'no data'}
                                                                            ${item?.booking_start_time || 'no data'}
                                                                        `}
                                                                        </CustomText>
                                                                    }
                                                                    {item?.booking_engine == 3 && item.session_details !== null && item.session_details.map((val, ind) => {
                                                                        return (
                                                                            <>
                                                                                <CustomText>
                                                                                    {`
                                                                                    Booking #${item?.id || 'no data'} 
                                                                                    ${val?.start_date || 'no data'}, 
                                                                                    ${val?.slot_start_time || 'no data'}
                                                                                `}
                                                                                </CustomText>
                                                                            </>
                                                                        )
                                                                    })
                                                                    }

                                                                    {item.booking_engine == 5 &&
                                                                        <CustomText>
                                                                            {`
                                                                            Booking #${item?.id || 'no data'} 
                                                                            ${item?.booking_date || 'no data'}, 
                                                                            ${item?.booking_start_time || 'no data'}
                                                                        `}
                                                                        </CustomText>
                                                                    }

                                                                    <span style={{ fontSize: '18px', fontWeight: 600, textDecoration: 'line-through' }} >{item?.service_name || 'no data'}</span>

                                                                    <CustomText style={{ margin: '8px 0 2px 0', color: '#2C2C2C' }}> <EnvironmentOutlined /> {item?.location_name || 'no data'}</CustomText>
                                                                    <CustomText style={{ margin: '0px 0 82px 0', color: '#2C2C2C' }}> {item?.location_address || 'no data'}</CustomText>

                                                                    <Row style={{ display: 'flex', cursor: 'pointer', gap: '10px' }}>
                                                                        <Button style={{ height: '33px', width: 'auto', background: '#F2F1F0', color: '#ED510C' }} onClick={() => { }}>
                                                                            <strong>Book Again</strong>
                                                                        </Button>
                                                                        <span style={{ color: '#ED510C', marginTop: '6px' }}> View Details </span>
                                                                    </Row>
                                                                </Col>

                                                                <Col lg={8} md={4} sm={6} xs={24} style={{ display: 'flex', justifyContent: 'end' }}>
                                                                    <CustomText style={{ display: 'flex', borderRadius: '11px', background: '#FF0000', color: '#FFFFFF', padding: '2px 6px' }}>
                                                                        {`Canceled on ${(item?.cancel_date) ? item?.cancel_date.slice(0, 11) : 'no data'} `}
                                                                    </CustomText>
                                                                </Col>
                                                            </BookingRow>
                                                            <StyledHr />
                                                        </>
                                                    )
                                                })}
                                            </Col>
                                        }
                                    </Row>
                                </Col>
                            </Row>}

                            {showManageBookings && <ManageBookings bookData={bookData} setShowManageBookings={setShowManageBookings} />}

                        </Col>
                    </Row>
                </>}
            </div>
        </Fragment>
    )
}

export default UserBookings;