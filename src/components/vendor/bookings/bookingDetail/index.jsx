import { Fragment, useEffect, useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import { Col, Dropdown, Menu, Row, Select } from "antd";
import { BodyBold, BodyReg, BodySmallBold, BodySmallReg } from "@/styles/styledComponent";
import { BodyOrgBold, CustomCol, CustomRow, StyBodySmallBold, StyBodySmallReg } from "./styledComponent";
import { StyledHr } from "@/components/vendor-payment/styledComponent";
import { GetBookDetailsByIdService } from "@/Services/vendorBookings.service";

const VendorBookDetails = ({ params }) => {
    // const params = useParams()
    const [ apiData,setApiData ] =useState();

    useEffect(() => {  
        (async() => {
            const userId = localStorage.getItem('userId');
            const userToken = localStorage.getItem('token');
            // setUserId(userId)
            // setUserToken(userToken)
            const BookingId = params?.bookId

            fetchUserAddressDetails({ "user_id": userId, "token": userToken}, BookingId)
        })();
    }, []);

    const fetchUserAddressDetails = async (userData, BookingId) => {
        const response = await GetBookDetailsByIdService(userData, BookingId);
        const output = response?.response?.data;
        console.log("Response ==>>", output);
        if (response?.response?.status == 200) {
            setApiData(output);
        }
    }

  /*  let url = apiData?.receipt_url ; */


    return(
        <Fragment>
            <Row style={{ width: '100%', justifyContent:'center' }}>
                <Col xl={22} lg={22} md={22} sm={22} xs={22} style={{ marginTop: '10px' }}>
                    
                    <CustomRow gutter={[0, 10]}>
                    <Col>
                        <StyBodySmallReg style={{color: '#ED510C'}}>Go back</StyBodySmallReg>
                     </Col>
                        <CustomCol xl={6}><BodySmallBold style={{ color: '#72959A' }}> Customer Payment </BodySmallBold></CustomCol>
                        <CustomCol xl={6}> <StyBodySmallBold>Customer info</StyBodySmallBold> </CustomCol>
                        
                        
                        
                        <Col style={{ display:'flex', justifyContent: 'space-between' }} xl={6} >
                            <Row>
                            <CustomCol > 
                                <StyBodySmallReg> Customer name </StyBodySmallReg>
                                <BodySmallBold>{apiData?.user_name || 'no data'}</BodySmallBold>
                        </CustomCol>
                            </Row>
                            <Row>
                                <CustomCol>
                                    <StyBodySmallReg> Mobile number </StyBodySmallReg>
                                    <BodySmallBold>{apiData?.personal_mobile || 'no data'}</BodySmallBold>
                                </CustomCol>
                            </Row>
                            <Row>
                                <CustomCol>
                                    <StyBodySmallReg> Email id </StyBodySmallReg>
                                    <BodySmallBold>{apiData?.email || 'no data'}</BodySmallBold>
                                </CustomCol>
                            </Row>
                        </Col>                        
                    </CustomRow>

                    <Col span={7}>
                        <StyledHr/>
                    </Col>

                    <CustomRow gutter={[0, 10]}>
                        <CustomCol xl={6}> <StyBodySmallBold>Purpose info</StyBodySmallBold> </CustomCol>
                        
                        <Col style={{ display:'flex', justifyContent: 'space-between' }} xl={12} >
                            <Row>
                                <CustomCol>
                                    <StyBodySmallReg> Paid for </StyBodySmallReg>
                                    <BodySmallReg>{apiData?.payout_type || 'no data'}</BodySmallReg>
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
                                    <BodySmallReg>{`#${apiData?.order_id || 'no data' }`}</BodySmallReg>
                                </CustomCol>
                            </Row>
                        </Col>                        
                    </CustomRow>

                    <Col span={13}>
                        <StyledHr/>
                    </Col>

                    <CustomRow gutter={[0, 10]}>
                        <CustomCol xl={6}> <StyBodySmallBold>Payment info</StyBodySmallBold> </CustomCol>
                        
                        <Col style={{ display:'flex', gap:'25px' }} xl={12} >
                            <Row>
                                <CustomCol>
                                    <StyBodySmallReg> payment Intent id </StyBodySmallReg>
                                    <BodySmallReg style={{color: '#72959A'}}>{`${apiData?.trx_id || 'no data'}`}</BodySmallReg>
                                </CustomCol>
                            </Row>

                            <Row>
                                <CustomCol>
                                    <StyBodySmallReg> Transaction id </StyBodySmallReg>
                                    <BodySmallReg style={{color: '#72959A'}}>{`${apiData?.balance_transaction || 'no data'}`}</BodySmallReg>
                                </CustomCol>
                            </Row>

                            <Row>
                                <CustomCol>
                                    <StyBodySmallReg> Status </StyBodySmallReg>
                                    <span style={{display:'flex', justifyContent:'center', alignItems:'center', border:'1px solid #04AF15', borderRadius:'22px', height: '24px', width:'auto', padding:'0 8px' }} >
                                        {(apiData?.amount_refunded > 0) ? 'partial refunded' : apiData?.status}
                                    </span>
                                </CustomCol>
                            </Row>
                        </Col>                        
                    </CustomRow>

                    <Col span={13}>
                        <StyledHr/>
                    </Col>

                    <CustomRow gutter={[0, 10]}>
                        <CustomCol xl={6}> <StyBodySmallBold>Payment breakup</StyBodySmallBold> </CustomCol>
                        
                        <Col xl={8} >
                            <Row style={{ display:'flex', justifyContent:'space-between' }}>
                                <BodyReg style={{color: '#72959A'}}> Service Price </BodyReg>
                                <BodyReg style={{ color: '#72959A' }}>{`$ ${apiData?.amount_paid/100 || 'no data'}`}</BodyReg>
                            </Row>

                            <Row style={{ display:'flex', justifyContent:'space-between' }}>
                                <BodyReg style={{ color: '#72959A' }}> Discount (0%) </BodyReg>
                                <BodyReg style={{ color: '#72959A' }}>{`$ ${apiData?.discount || '00'}`}</BodyReg>
                            </Row>

                            {/* 

                            <Row style={{ display:'flex', justifyContent:'space-between' }}>
                                <BodyReg style={{ color: '#72959A' }}> Stripe/Bank Fees</BodyReg>
                                <BodyReg style={{ color: '#72959A' }}>{`$ ${apiData?.stripe_fees/100 || 'no data'}`}</BodyReg>
                            </Row>

                            <Row style={{ display:'flex', justifyContent:'space-between' }}>
                                <BodyReg style={{ color: '#72959A' }}> Bookable Platform Fees</BodyReg>
                                <BodyReg style={{ color:"#72959A" }}>{`$ ${apiData?.admin_amount_received/100 || 'no data'}`}</BodyReg>
                            </Row>  */}

                            <Col span={24}>
                                <StyledHr/>
                             </Col>
                        
                        {
                           
                            <Row style={{ display:'flex', justifyContent:'space-between' }}>
                                <BodyBold style={{ color: '#ED510C' }}> Amount Received </BodyBold>
                                <BodyBold style={{ color: '#ED510C' }}>{`$ ${apiData?.vendor_amount_received/100  || 'no data'}`}</BodyBold>
                            </Row>

                        }



                            {
                             (apiData?.amount_refunded > 0 ) &&
                            <Row style={{ display:'flex', justifyContent:'space-between' }}>
                                <BodyBold style={{ color: '#ED510C' }}> Amount Retained After Refund </BodyBold>
                                <BodyBold style={{ color: '#ED510C' }}>{`$ ${( (apiData?.vendor_amount_received/100)*.1).toFixed(2)  || 'no data'}`}</BodyBold>
                            </Row>
                            }
 


                               {/* 
                            <Col span={24}>
                                <StyledHr/>
                             </Col>
                            <Row style={{ display:'flex', justifyContent:'space-between' }}>
                                <StyBodySmallReg> Customer Receipt</StyBodySmallReg>
                                <a href={url}> Receipt URL </a>
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
        </Fragment>
    )
}

export default VendorBookDetails;