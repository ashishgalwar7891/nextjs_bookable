import { Col, Row, Spin } from "antd";
import { Fragment, useState, useEffect } from "react";
import { StyledTitleText, StyledDateText, StyledPayText, StyledAmtText } from "./styledComponent";
import { CustomText, OrgNumText, PackagesTag } from "@/lib/commonComponent/CustomUserCard/styledComponent";
import { EnvironmentOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { GetStripePaymentDetails, PostStripePaymentDetails } from "@/Services/payment.service";
import { useSearchParams, useRouter } from 'next/navigation';
import { round } from "lodash";
import { CardTitalText, SmallText } from "../user-cart/styledComponent";
import { STORAGE_URL } from "@/Services/vendorService.services";
import Image from "next/image";
import { useCart } from "@/components/Layout";



const ServicePayment = (props) => {
    // const { status } = props;
    const { setCartRefresh } = useCart();
    const router = useRouter();
    const searchParams = useSearchParams()
    const [apiData, setApiData] = useState()
    const [paymentStatus, setPaymentStatus] = useState(0);

    const clientSecret = searchParams.get('payment_intent_client_secret');
    const paymentIntent = searchParams.get('payment_intent');
    const status = searchParams.get('redirect_status');

    const [pageLoader, setPageLoader] = useState(true);

    // console.log("Redirect Status -->>", status, paymentIntent, clientSecret);

    useEffect(() => {
        (async () => {
            const CustomerId = localStorage.getItem('CustomerId')
            const token = localStorage.getItem('token')

            let data = {
                "token": token,
                "user_id": CustomerId,
                payment_status: status,
                intent_id: paymentIntent,
                client_secret: clientSecret
            }

            handlePaymentSuccess(data);

        })();
    }, []);

    const handlePaymentSuccess = async (data) => {
        const response = await PostStripePaymentDetails(data);
        console.log("Out ==>>   ", response);

        data.order_id = response?.response?.data?.order_id;
        data.status = response?.response?.data?.status; 
        setPaymentStatus(data.status)
        const result = await GetStripePaymentDetails(data);
        console.log("Response 11 ==>>", result);

        const detailsData = result?.response?.data;
        console.log("Response details ==>>", detailsData);
        setApiData(detailsData);
        setCartRefresh(true);
        setPageLoader(false);
    };

    const handleClickMyBook = () => {
        if(localStorage.getItem('role')==='user'){
            router.push('/mybookings')
        }else{
            router.push('/vendor/bookings')
        }
    }

    const handleClickMyCart = () => {
        router.push('/user_cart')
    }

    const convertDate = (inputDate) => {
        const dateObj = new Date(inputDate);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return dateObj.toLocaleDateString('en-US', options).split(',').join('');
    };
    

    console.log('apiData---->', apiData)
    return (
        <>
            <Fragment>
                <div className="biz-container">
                    <Row style={{ width: '100%' }}>
                        <Col span={24}>

                            {apiData && apiData?.packageDetails &&
                                <Row>
                                    <Col span={24}>
                                        <LeftOutlined style={{ color: '#EA8933' }} />
                                        <span onClick={handleClickMyBook} style={{ color: '#EA8933', cursor: 'pointer' }}> Go to My Bookings </span>
                                    </Col>
                                </Row>
                            }
                            {pageLoader ? <> <div style={{ textAlign: "center", padding: "120px" }}>
                                <Spin tip="Loading" size="large">
                                    <div className="content" />
                                </Spin>
                            </div></> : <>
                                <Row style={{ height: "100%", width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                    <Col span={20} style={{}}>

                            { apiData && (paymentStatus == 1) &&

                            <Row style={{display:'block'}}> 

                               <h1 style={{ color: 'green', textAlign: 'center', fontSize: '1.5rem', marginTop: "20px" }}>Congratulations Payment Success</h1>

                               <h5 style={{ color: 'green', textAlign: 'center', fontSize: '1rem', marginBottom: "20px" }}> Order Id: {(apiData?.orderDetails?.[0]?.order_id) ?
                                 apiData?.orderDetails?.[0]?.order_id : (apiData?.packageDetails?.[0]?.order_id) ?
                                 apiData?.packageDetails?.[0]?.order_id : 'No data'}
                               </h5>
                               
                               <span onClick={handleClickMyBook} style={{
                                color: '#EA8933', cursor: 'pointer', fontSize: '20px',
                                marginBottom: '15px', display: 'inline-block'
                                }}> Go to My Bookings </span>
                                
                                      {apiData && apiData?.orderDetails && apiData?.orderDetails.map((item, index) => {
                                              return (
                                                   <> 
                                                    <Row key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "100%", width: '100%', marginBottom: "30px", background: '#F2F1F0', padding: "20px 10px" }} gutter={24} >

                                                    <Col span={5}>
                                                     <Image style={{ objectFit: 'cover', maxWidth: '100%', borderRadius: '6px 0 0 6px' }}
                                                      src={STORAGE_URL + '/images/' + item?.feature_image}
                                                      width={200}
                                                      height={200}
                                                      alt="No Preview"
                                                    />
                              </Col>

                                         <Col span={19} style={{ display: "flex", flexDirection: "column" }}>

                                         <StyledTitleText>Booking ID: {`#${item?.id}`}</StyledTitleText>

                                       {item.session_details === null && <StyledDateText>{` ${item?.booking_date || "No data"} | ${item?.booking_start_time || "No data"} | ${item?.booking_end_time || "No data"}`} </StyledDateText>}
                                       {item.session_details !== null && item?.session_details.map((val, ind) => {
                                       return (
                                     <StyledDateText>{` ${convertDate(val?.date) || "No data"} | ${val?.start_time || "No data"} | ${val?.end_time || "No data"}`} </StyledDateText>
                                      )
                                    })}

                    {/* <StyledDateText>{item?.booking_start_time || "No data"}</StyledDateText> */}

                    <StyledTitleText>{item?.service_name || "No data"}</StyledTitleText>

                    <StyledDateText>{item?.vendor_name || "No data"}</StyledDateText>

                    <CustomText style={{ margin: '8px 0', color: '#2C2C2C' }}> <EnvironmentOutlined /> {item?.location_name}, {item?.location_meta.address}, {item?.location_meta.city}, {item?.location_meta.postal_code}, {item?.location_meta.country}</CustomText>
                    {parseInt(JSON.parse(item?.price_detail)?.discount) > 0 && <>
                        <span>{`$ ${JSON.parse(item?.price_detail)?.price || "no data"}`} (Discount - {`${JSON.parse(item?.price_detail)?.discount || "no data"}`}%)</span>
                    </>}
                    <StyledPayText>You have paid <StyledAmtText>{`$${JSON.parse(item?.price_detail)?.totalPrice}` || "No data"}</StyledAmtText>  </StyledPayText>
                </Col>
                   </Row>
               </>
                   )
                 })
       }
                            {apiData && apiData?.packageDetails && apiData?.packageDetails.map((item, index) => {
                               return (
                                     <>
            <Row key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "100%", width: '100%', background: '#F2F1F0', marginBottom:"20px", padding:"20px" }} gutter={24} >

                <Col span={5}>
                    <Image style={{ objectFit: 'cover', maxWidth: '100%', borderRadius: '6px 0 0 6px' }}
                        src={STORAGE_URL + '/images/' + item?.package_details?.feature_image}
                        alt="No Preview"
                        width={200}
                        height={200}
                    />
                </Col>

                <Col style={{ flexGrow: '4', flexDirection: 'column' }}>
                    <StyledTitleText style={{ display: 'flex', flexDirection: 'row' }} >{item?.package_details?.package_name || "No data"}
                        <Col style={{ marginTop: '10px' }}>
                            <PackagesTag style={{ position: 'relative', height: '21px', position:'relative', top:"0px" }}>PACKAGE</PackagesTag>
                        </Col>
                    </StyledTitleText>

                    <StyledDateText>{item?.package_details?.business_name || "No data"}</StyledDateText> <br />
                    <CustomText style={{ margin: '8px 0', color: '#2C2C2C' }}> <EnvironmentOutlined /> {item?.package_details.location_name}, {item?.package_details.location_meta.address}, {item?.package_details.location_meta.city}, {item?.package_details.location_meta.postal_code}, {item?.package_details.location_meta.country}</CustomText>

                    <StyledPayText>You have paid <StyledAmtText>$ {`${item?.package_details?.price || "No data"}`}</StyledAmtText> </StyledPayText>

                    {/* {   
            item?.package_details?.package && item?.package_details?.package?.package_services && item?.package_details?.package?.package_services.map((item, index) => {
                return (
                    <>
                        <OrgNumText style={{ fontSize:'14PX' }}>{item.count}</OrgNumText> <SmallText>{item.service_name}</SmallText> {(index !== (values?.package?.package_services.length -1)) ?  <SmallText>{' | '}</SmallText>  : null}
                    </>
                )
            })
                 } */}
                </Col>
            </Row><br></br>
         </>
         )
         })
         }



                            </Row> 

                            }

                            { apiData && (paymentStatus == 0) &&

                               <Row>

                                  <Col> 

                                   <h1 style={{ color: 'green', textAlign: 'center', fontSize: '1.5rem', marginTop: "20px" }}>Sorry, Your Payment did no go through, Plz retry again from Cart Page</h1>
                                   </Col>
                               </Row> 
                        




                            }

                                       

                                    
                                    </Col>
                                </Row>
                            </>}
                        </Col>   
                    </Row>
                </div>
            </Fragment>
        </>
    )
}

export default ServicePayment;