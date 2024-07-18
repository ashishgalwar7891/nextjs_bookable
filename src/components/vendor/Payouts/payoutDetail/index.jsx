import { Fragment, useEffect, useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import { Col, Dropdown, Menu, Row, Select, Spin } from "antd";
import { BodyBold, BodyReg, BodySmallBold, BodySmallReg } from "@/styles/styledComponent";
import { BodyOrgBold, CustomCol, CustomRow, StyBodySmallBold, StyBodySmallReg } from "./styledComponent";
import { StyledHr } from "@/components/vendor-payment/styledComponent";
import { GetBookDetailsByIdService } from "@/Services/vendorBookings.service";

const VendorPayoutDetails = ({ params }) => {
    // const params = useParams()
    const [apiData, setApiData] = useState();
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        (async () => {
            const userId = localStorage.getItem('userId');
            const userToken = localStorage.getItem('token');
            // setUserId(userId)
            // setUserToken(userToken)
            const BookingId = params?.bookId
            const tid = params?.tid
            const FORM_DATA = new FormData();
            FORM_DATA.append('user_id', userId);
            FORM_DATA.append('token', userToken);
            FORM_DATA.append('id', BookingId);
            FORM_DATA.append('tid', tid);

            fetchUserAddressDetails(FORM_DATA)
        })();
    }, []);

    const fetchUserAddressDetails = async (userData) => {
        const response = await GetBookDetailsByIdService(userData);
        const output = response?.response?.data;
        console.log("Response ==>>", output);
        if (response?.response?.status == 200) {
            setApiData(output);
            setLoader(false)
        }
    }

    let url = apiData?.receipt_url;


    return (
        <Fragment>
            {loader ? <>
                <div style={{ textAlign: "center", flex: '1', maxWidth: "100%", padding: "120px" }}>
                    <Spin tip="Loading" size="large">
                        <div className="content" />
                    </Spin>
                </div>
            </> : <>
                <Row style={{ width: '100%', justifyContent: 'center' }}>
                    <Col xl={22} lg={22} md={22} sm={22} xs={22} style={{ marginTop: '10px' }}>

                        <CustomRow gutter={[0, 10]}>
                            <Col>
                                <StyBodySmallReg style={{ color: '#ED510C' }}>Go back</StyBodySmallReg>
                            </Col>
                            <CustomCol xl={6}><BodySmallBold style={{ color: '#72959A' }}> Customer Payment </BodySmallBold></CustomCol>
                            <CustomCol xl={6}> <StyBodySmallBold>Customer info</StyBodySmallBold> </CustomCol>



                            <Col style={{ display: 'flex', justifyContent: 'space-between' }} xl={12} >
                                <Row>
                                    <CustomCol >
                                        <StyBodySmallReg> Customer name </StyBodySmallReg>
                                        <BodySmallBold>{apiData?.customer_name || 'no data'}</BodySmallBold>
                                    </CustomCol>
                                </Row>
                                <Row>
                                    <CustomCol>
                                        <StyBodySmallReg> Mobile number </StyBodySmallReg>
                                        <BodySmallBold>{apiData?.customer_phone || 'no data'}</BodySmallBold>
                                    </CustomCol>
                                </Row>
                                <Row>
                                    <CustomCol>
                                        <StyBodySmallReg> Email id </StyBodySmallReg>
                                        <BodySmallBold>{apiData?.customer_email || 'no data'}</BodySmallBold>
                                    </CustomCol>
                                </Row>
                            </Col>
                        </CustomRow>

                        <Col span={7}>
                            <StyledHr />
                        </Col>

                        <CustomRow gutter={[0, 10]}>
                            <CustomCol xl={6}> <StyBodySmallBold>Purpose info</StyBodySmallBold> </CustomCol>

                            <Col style={{ display: 'flex', justifyContent: 'space-between' }} xl={12} >
                                <Row>
                                    <CustomCol>
                                        <StyBodySmallReg> Paid for </StyBodySmallReg>
                                        <BodySmallReg>
                                            {apiData?.payout_type === 'service_booking' && "Service Booking"}
                                            {apiData?.payout_type === 'rescheduled_booking' && "Rescheduled Booking"}
                                            {apiData?.payout_type === 'cancel_booking' && "Cancel Booking"}

                                        </BodySmallReg>
                                    </CustomCol>
                                </Row>

                                <Row>
                                    <CustomCol>
                                        <StyBodySmallReg> Service name </StyBodySmallReg>
                                        <BodySmallReg>{apiData?.service_name || 'no data'}</BodySmallReg>
                                    </CustomCol>
                                </Row>

                                <Row>
                                    <CustomCol>
                                        <StyBodySmallReg> Booking Date/time </StyBodySmallReg>
                                        <BodySmallReg>{apiData?.booking_date || 'no data'} 11:20</BodySmallReg>
                                    </CustomCol>
                                </Row>

                                <Row>
                                    <CustomCol>
                                        <StyBodySmallReg> Order id </StyBodySmallReg>
                                        <BodySmallReg>{`#${apiData?.order_id || 'no data'}`}</BodySmallReg>
                                    </CustomCol>
                                </Row>
                            </Col>
                        </CustomRow>

                        <Col span={13}>
                            <StyledHr />
                        </Col>

                        <CustomRow gutter={[0, 10]}>
                            <CustomCol xl={6}> <StyBodySmallBold>Payment info</StyBodySmallBold> </CustomCol>

                            <Col style={{ display: 'flex', gap: '25px' }} xl={12} >
                                <Row>
                                    <CustomCol>
                                        <StyBodySmallReg> Payment Intent id </StyBodySmallReg>
                                        <BodySmallReg style={{ color: '#72959A' }}>{`${apiData?.trx_id || 'no data'}`}</BodySmallReg>
                                    </CustomCol>
                                </Row>
                                {apiData?.payout_type !== 'cancel_booking' && <>
                                
                                <Row>
                                    
                                    <CustomCol>
                                        <StyBodySmallReg> Transaction id </StyBodySmallReg>
                                        <BodySmallReg style={{ color: '#72959A' }}>{`${apiData?.balancetrx_id || 'no data'}`}</BodySmallReg>
                                    </CustomCol>
                                </Row>
                                </>}
                            

                                <Row>
                                    <CustomCol>
                                        <StyBodySmallReg> Status </StyBodySmallReg>
                                        <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #04AF15', borderRadius: '22px', height: '24px', width: 'auto', padding: '0 8px' }} >
                                            {apiData?.status || 'no data'}
                                        </span>
                                    </CustomCol>
                                </Row>
                            </Col>
                        </CustomRow>

                        <Col span={13}>
                            <StyledHr />
                        </Col>

                        <CustomRow gutter={[0, 10]}>
                            <CustomCol xl={6}> <StyBodySmallBold>Payment breakup</StyBodySmallBold> </CustomCol>

                            <Col xl={8} >

                                {apiData?.payout_type === 'service_booking' && <>
                                
                                    <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <BodyReg style={{ color: '#72959A' }}> Service Price </BodyReg>
                                        <BodyReg style={{ color: '#72959A' }}>{`$ ${parseFloat(apiData?.service_price_array?.price).toFixed(2) || 'no data'}`}</BodyReg>
                                    </Row>
                                    <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <BodyReg style={{ color: '#72959A' }}> Discount ({apiData?.service_price_array?.discount}%) </BodyReg>
                                        <BodyReg style={{ color: '#72959A' }}>{`$ ${parseFloat(parseFloat(apiData?.service_price_array?.price).toFixed(2) - parseFloat(apiData?.amount_paid).toFixed(2)).toFixed(2) || 'no data'}`}</BodyReg>
                                    </Row>
                                    <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <BodyReg style={{ color: '#72959A' }}> Paid Price </BodyReg>
                                        <BodyReg style={{ color: '#72959A' }}>{`$ ${apiData?.amount_paid || 'no data'}`}</BodyReg>
                                    </Row>
                                    
                                    <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <BodyReg style={{ color: '#72959A' }}> Bookable Platform Fees</BodyReg>
                                        <BodyReg style={{ color: "#72959A" }}>{`$ ${apiData?.stripe_fees || 'no data'}`}</BodyReg>
                                    </Row>
                                    <Col span={24}>
                                        <StyledHr />
                                    </Col>
                                    <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <BodyBold style={{ color: '#ED510C' }}> Amount Received </BodyBold>
                                        <BodyBold style={{ color: '#ED510C' }}>{`$ ${apiData?.net_amount || 'no data'}`}</BodyBold>
                                    </Row>
                                    <Col span={24}>
                                        <StyledHr />
                                    </Col>
                                    <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <StyBodySmallReg> Customer Receipt</StyBodySmallReg>
                                        <span style={{ color: '#ED510C', cursor: "pointer" }} onClick={() => window.open(url)}> Receipt URL </span>
                                    </Row>
                                </>}
                                {apiData?.payout_type === 'rescheduled_booking' && <>
                                    <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <BodyReg style={{ color: '#72959A' }}> Rescheduled Charge </BodyReg>
                                        <BodyReg style={{ color: '#72959A' }}>{`$ ${apiData?.amount_paid || 'no data'}`}</BodyReg>
                                    </Row>
                                    <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <BodyReg style={{ color: '#72959A' }}> Bookable Platform Fees</BodyReg>
                                        <BodyReg style={{ color: "#72959A" }}>{`$ ${apiData?.stripe_fees || 'no data'}`}</BodyReg>
                                    </Row>
                                    <Col span={24}>
                                        <StyledHr />
                                    </Col>
                                    <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <BodyBold style={{ color: '#ED510C' }}> Amount Received </BodyBold>
                                        <BodyBold style={{ color: '#ED510C' }}>{`$ ${apiData?.net_amount || 'no data'}`}</BodyBold>
                                    </Row>
                                    <Col span={24}>
                                        <StyledHr />
                                    </Col>
                                    <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <StyBodySmallReg> Customer Receipt</StyBodySmallReg>
                                        <span style={{ color: '#ED510C', cursor: "pointer" }} onClick={() => window.open(url)}> Receipt URL </span>
                                    </Row>
                                </>}
                                {apiData?.payout_type === 'cancel_booking' && <>
                                    <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <BodyBold style={{ color: '#ED510C' }}> Refunded Amount </BodyBold>
                                        <BodyBold style={{ color: '#ED510C' }}>{`$ ${apiData?.service_amount || 'no data'}`}</BodyBold>
                                    </Row>
                                    <Col span={24}>
                                        <StyledHr />
                                    </Col>
                                    <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <StyBodySmallReg> Customer Receipt</StyBodySmallReg>
                                        <span style={{ color: '#ED510C', cursor: "pointer" }} onClick={() => window.open(url)}> Receipt URL </span>
                                    </Row>
                                </>}
                             




                                {/* <Row style={{ display:'flex', justifyContent:'space-between' }}>
                                <BodyReg style={{ color: '#72959A' }}> Stripe/Bank Fees</BodyReg>
                                <BodyReg style={{ color: '#72959A' }}>{`$ ${apiData?.stripe_fees || 'no data'}`}</BodyReg>
                            </Row> */}


                                {/* 
                            <Row style={{ display:'flex', justifyContent:'space-between' }}>
                                <BodySmallReg style={{ color: '#72959A' }}> Total </BodySmallReg>
                                <BodySmallBold style={{ color: '#72959A' }}>{`$${apiData?.total || 'no data'}`}</BodySmallBold>
                            </Row>

                            <Row style={{ display:'flex', justifyContent:'space-between' }}>
                                <BodyReg> Platform fee (2%) </BodyReg>
                                <BodyOrgBold>{`$${apiData?.platform_fee || 'no data'}`}</BodyOrgBold>
                            </Row>

                            <Row style={{ display:'flex', justifyContent:'space-between' }}>
                                <BodySmallReg style={{ color: '#72959A' }}> Vendor’s </BodySmallReg>
                                <BodySmallBold style={{ color: '#72959A' }}>{`$${apiData?.vendor_fee || 'no data'}`}</BodySmallBold>
                            </Row>

                        */}

                            </Col>
                        </CustomRow>
                    </Col>

                </Row>

            </>}

        </Fragment>
    )
}

export default VendorPayoutDetails;
