import { Fragment, useState, useEffect } from "react";
import SearchHeader from "@/lib/commonComponent/SearchHeader";
import { Col, Empty, Row, Spin } from "antd";
import { SelectedCol, SmallText, CartCol, CartRow, CardTitalText, CustomText } from "./styledComponent";
import { H3, H5, BodyBold, BodyTextBold } from '../../../styles/styledComponent'
import { DeleteCartItemByIdServices, GetAllCartItemUserServices, GetListAllServices, getAllLocationsServices } from "@/Services/userService.services";
import Image from "next/image";
import Xicon from '../../../assets/imgs/icon/x-circle.svg';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/lib/commonComponent/CheckoutForm";
import { StripePaymentIntentService } from "@/Services/payment.service";
import { OrgNumText, PackagesCartTag, PackagesTag } from "@/lib/commonComponent/CustomUserCard/styledComponent";
import { useCart } from '@/components/Layout';
import { EnvironmentOutlined } from "@ant-design/icons";
const UserCart = () => {
    const { setCartRefresh } = useCart();
    const [cartApiData, setCartApiData] = useState();
    const [userData, setUserData] = useState();
    const [sumTotal, setSumTotal] = useState();
    const [stripeConnect, setStripeConnect] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [pageLoader, setPageLoader] = useState(true);

    const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

    useEffect(() => {
        if(localStorage.getItem('userId')){
            fetchAllCartData()
        }else{
            setPageLoader(false)
        }
       
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    const fetchAllCartData = async () => {
        try {
            const userToken = localStorage.getItem('token')
            const userId = localStorage.getItem('userId')
            const CustomerId = localStorage.getItem('CustomerId')
            console.log('CustomerId===>',CustomerId)
            setUserData({
                "token": userToken,
                "user_id": `${CustomerId !== null ? CustomerId : userId}`
            });

            const response = await GetAllCartItemUserServices({
                "token": userToken,
                "user_id": `${CustomerId !== null ? CustomerId : userId}`
            });

            const output = response?.response?.data?.data;
            // console.log("Output -->>", output);

            if (response?.response?.status === 200) {
                setCartApiData(output);
                const items = Object.keys(output)

                const total_price = items.reduce((acc, item) => {
                    if (output[item]) {
                        output[item].forEach((service) => {
                            if (service.service && service.service.price) {
                                acc += parseFloat(service.price_detail.totalPrice);
                            } else {
                                acc += parseFloat(service.price_detail.totalPrice);
                            }
                        });
                    }
                    return acc;
                }, 0);
                setSumTotal(total_price);

                GetStripePaymentIntent(CustomerId, total_price.toFixed(2));
                setPageLoader(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const GetStripePaymentIntent = async (CustomerId, total_price) => {
        const stripeAmt = total_price * 100
        const response = await StripePaymentIntentService(CustomerId, stripeAmt);
        const clientSecret = response?.response?.data?.intent_object?.client_secret
        const stripeConnectId = response?.response?.data?.vendorConnectId

        setClientSecret(clientSecret);
        setStripeConnect(stripeConnectId);

    }


    const stripePromise = loadStripe(stripePublishableKey, {
        stripeAccount: stripeConnect,
    });

    const handleDelteItem = async (itemId) => {
        try {
            let customItemObj = {
                "cart_id": itemId,
                "token": userData?.token,
                "user_id": userData?.user_id
            }
            const response = await DeleteCartItemByIdServices(customItemObj);
            if (response.response.status === 200) {
                fetchAllCartData(userData);
                setCartRefresh(true)
            }
        } catch (error) {
            console.log("error", error);
        }
    }
    const convertDate = (inputDate) => {
        const dateObj = new Date(inputDate);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return dateObj.toLocaleDateString('en-US', options).split(',').join('');
    };
    return (
        <Fragment>
            <div>
            <SearchHeader />
            </div>
            
            <div className="biz-container">
                {pageLoader ? <>  <Spin tip="Loading" size="large">
                    <div className="content" />
                </Spin></> : <>
                    <Row style={{ height: '100%' }}>
                        <Col span={24}>

                            <CartRow style={{ height: '100%', display: 'flex', gap: '20px', }}>
                                <Col span={14} style={{ maxWidth: '100%', paddingTop: "15px" }}>
                                    {/* <Col lg={12}md={20} xs={22} sm={22}> */}
                                    <H3 style={{color: '#2c2c2c'}} >My Cart</H3>
                                    {cartApiData && Object.keys(cartApiData).length > 0 ?
                                        (<SelectedCol xl={20} lg={14} md={14} xs={14} sm={14} style={{ padding: '1rem', maxWidth: '100%', background: 'F2F1F0' }}>

                                            {cartApiData &&
                                                Object.keys(cartApiData).map((item, index) => {
                                                    console.log("Items ==>>", item);
                                                    return (
                                                        <>
                                                            <H5 style={{ color: '#ED510C' }}><span style={{ marginBottom: "15px", display: "block" }}>{item}</span></H5>
                                                            {cartApiData?.[item].map((values, index) => {
                                                                console.log("Values mapp ==>>", values);
                                                                return (
                                                                    <>
                                                                        {(values.type === "service") ?
                                                                            <>
                                                                                <Row style={{ display: 'flex', gap: '.7rem', paddingBottom: '1rem', paddingBottom: '1rem', borderBottom: "1px solid #ccc", marginBottom: "15px" }}>
                                                                                    <Col style={{ width: '20px', display: 'flex', alignItems: 'start', paddingTop: '.3rem' }}>
                                                                                        <Image src={Xicon} onClick={() => { handleDelteItem(values?.cart_id) }} style={{ width: '20px', display: 'flex', alignItems: 'start' }} />
                                                                                    </Col>

                                                                                    <Col style={{ flexGrow: '4' }}>
                                                                                        <CardTitalText style={{color: '#2c2c2c'}} >{values?.service?.name || "No data"}</CardTitalText>
                                                                                      
                                                                                        <CustomText style={{ margin: '0px 0 8px 0', color: '#2C2C2C' }}><EnvironmentOutlined /> {values?.service?.location_meta?.address}, {values?.service?.location_meta?.city}, {values?.service?.location_meta?.postal_code}, {values?.service?.location_meta?.country}</CustomText><br></br>
                                                                                        {parseInt(values?.cart_meta?.booking_engine) === 1 && <>
                                                                                        
                                                                                            <SmallText>{`${values?.start_date || "No data"} | ${values?.service?.slot_start_time || "No data"} - ${values?.service?.slot_end_time || "No data"} `}</SmallText>
                                                                                        </>}
                                                                                        {parseInt(values?.cart_meta?.booking_engine) === 2 && <>
                                                                                        
                                                                                        <SmallText>SUBSCRPTION : {`${values?.start_date || "No data"} - ${values?.cart_meta?.end_date || "No data"} | ${values?.service?.slot_start_time || "No data"} - ${values?.service?.slot_end_time || "No data"} `}</SmallText>
                                                                                        </>}
                                                                                        {parseInt(values?.cart_meta?.booking_engine) === 3 && <>
                                                                                            <SmallText style={{fontWeight:"bold"}}>SUBSCRPTION : {`${values?.start_date || "No data"} - ${values?.cart_meta?.end_date || "No data"}`}</SmallText><br></br>
                                                                                            {(values?.service?.subscription_details && values?.service?.subscription_details.length > 0) && values?.service?.subscription_details.map((val, i) => {
                                                                                            return (
                                                                                                <SmallText>{`${convertDate(val?.date) || "No data"} | ${val?.start_time || "No data"} - ${val?.end_time || "No data"} `} <br /> </SmallText>
                                                                                            )
                                                                                        })
                                                                                        }  
                                                                                      
                                                                                        </>}
                                                                                        {parseInt(values?.cart_meta?.booking_engine) === 4 && <>
                                                                                        
                                                                                        <SmallText>{`${values?.start_date || "No data"} | ${values?.service?.slot_start_time || "No data"} - ${values?.service?.slot_end_time || "No data"} `}</SmallText>
                                                                                    </>}
                                                                                    {parseInt(values?.cart_meta?.booking_engine) === 5 && <>
                                                                                        
                                                                                        <SmallText>{`${values?.start_date || "No data"} | ${values?.service?.slot_start_time || "No data"} - ${values?.service?.slot_end_time || "No data"} `}</SmallText>
                                                                                    </>}

                                                                                       
                                                                                    </Col>
                                                                                    {parseInt(values?.price_detail?.discount) > 0 ? <>
                                                                                        <div style={{ float: "right", textAlign: "right" }}>
                                                                                            <span style={{ textDecoration: "line-through", fontSize: "14px", display: "block", width: "100%" }}>{`$ ${parseFloat(values?.price_detail?.price).toFixed(2)}` || "No data"}</span>
                                                                                            <span style={{ fontSize: "10px", display: "block", width: "100%" }}>   {`Discount ${parseInt(values?.price_detail?.discount)}%` || "No data"}</span>
                                                                                            <span style={{ display: "block", width: "100%", fontSize: "18px", color: "#000", fontWeight: "600" }}>{`$ ${parseFloat(values?.price_detail?.totalPrice).toFixed(2)}` || "No data"}</span>
                                                                                        </div>
                                                                                    </> : <>
                                                                                        <CardTitalText>{`$ ${parseFloat(values?.price_detail?.totalPrice).toFixed(2)}` || "No data"}</CardTitalText>
                                                                                    </>}

                                                                                </Row>
                                                                            </> :
                                                                            <Row style={{ display: 'flex', gap: '.7rem', paddingBottom: '2rem', paddingTop:"2rem", borderBottom: "1px solid #000" }}  >
                                                                                <Col style={{ width: '20px', display: 'flex', alignItems: 'start', paddingTop: '.3rem' }}>
                                                                                    <Image src={Xicon} onClick={() => { handleDelteItem(values?.cart_id) }} style={{ width: '20px', display: 'flex', alignItems: 'start' }} />
                                                                                </Col>

                                                                                <Col style={{ flexGrow: '4' }}>
                                                                                    <CardTitalText>{values?.package?.name || "No data"} <PackagesTag style={{ position: 'relative', height: '21px', borderRadius:"5px", position:"relative", top:"3px" }}>PACKAGE</PackagesTag></CardTitalText>

                                                                                    {
                                                                                        values?.package && values?.package?.package_services && values?.package?.package_services.map((item, index) => {
                                                                                            return (
                                                                                                <>
                                                                                                    <OrgNumText style={{ fontSize: '14PX' }}>{item.count}</OrgNumText> <SmallText>{item.service_name}</SmallText> {(index !== (values?.package?.package_services.length - 1)) ? <SmallText>{' | '}</SmallText> : null}
                                                                                                </>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </Col>

                                                                                {parseInt(values?.price_detail?.discount) > 0 ? <>
                                                                                    <CardTitalText style={{ textAlign: "right" }}>{`$ ${parseFloat(values?.price_detail?.totalPrice).toFixed(2)}` || "No data"}<br></br>
                                                                                        {`Discount ${parseInt(values?.price_detail?.discount)}%` || "No data"}
                                                                                    </CardTitalText>
                                                                                </> : <>
                                                                                    <CardTitalText>{`$ ${parseFloat(values?.price_detail?.totalPrice).toFixed(2)}` || "No data"}</CardTitalText>
                                                                                </>}
                                                                            </Row>
                                                                        }
                                                                    </>
                                                                )
                                                            })
                                                            }
                                                        </>
                                                    )
                                                })
                                            }

                                            {/*             <Row style={{display:'flex', gap:'.7rem', padding:'.5rem 0', borderBottom:'1px solid #CDCDCD'}}>
                                    
                                    <Col style={{flexGrow: '4'}}> 
                                        <SmallText><strong>Total</strong></SmallText>
                                    </Col>
                                    <SmallText><strong>{'$ ' + sumTotal.toFixed(2)}</strong></SmallText>
                                </Row>

                       <Row style={{display:'flex', gap:'.7rem', padding:'.5rem 0' }}>
                                    
                                    <Col style={{flexGrow: '4'}}> 
                                        <SmallText>Discount</SmallText>
                                    </Col>
                                    <SmallText><strong>$ 00.00</strong></SmallText>
                            </Row> */ }



                                            <Row style={{ display: 'flex', gap: '.7rem', padding: '1rem 0' }}>

                                                <Col style={{ flexGrow: '4' }}>
                                                    <BodyBold>Total</BodyBold><br></br>
                                                    <SmallText style={{ margin: '0px 0 8px 0',  fontSize:'12px' }}>Inclusive of applicable GST</SmallText>
                                                </Col>
                                                <H3 style={{ color: '#ED510C' }}>{'$' + sumTotal.toFixed(2)}</H3>
                                            </Row>
                                        </SelectedCol>) : <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Col xl={24}> <Empty /> </Col></Row>
                                    }
                                </Col>
                                {clientSecret && (
                                    <CartCol span={9} style={{ marginTop: '50px', maxWidth: '100%', backgroundColor: '#F2F1F0', padding: '20px', marginTop: "15px" }}>
                                        <Elements options={options} stripe={stripePromise}>
                                            <CheckoutForm sumTotal={sumTotal.toFixed(2)} />
                                        </Elements>

                                    </CartCol >
                                )}
                            </CartRow>
                        </Col>
                    </Row>
                </>}
            </div>

        </Fragment>


    );
};
export default UserCart;