import React, { useEffect, useState } from 'react';
import './style.css'
import { Carousel, Spin } from 'antd';
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { LeftOutlined, LoadingOutlined, RightOutlined, UserOutlined } from '@ant-design/icons';
import { FaRegTrashAlt } from "react-icons/fa";
import { ADD_TO_CART, LOCATION_SLOT_BY_RESOURCE, SESSION_DATE_SLOTS } from '@/Services/frontend';
import { parseInt } from 'lodash';
import { useRouter } from 'next/navigation';
import InfoModal from '@/lib/commonComponent/ConfirmModal';
import { eslint } from '../../../next.config';
import { BiCheckCircle } from "react-icons/bi";
import { STORAGE_URL } from '@/Services/vendorService.services';
import { useCart } from '@/components/Layout';
function BizPackageCard({ publicServiceResponse,location_id, service_id, route_location_id, publicPackageResponseData, checkUserLogin, user_id }) {
    const router = useRouter();
    const { setCartRefresh } = useCart();
    // Show Hidden 
    const [showCart, setShowCart] = useState(false);
    const [showSlots, setShowSlots] = useState(false);
    const [buttonLoader, setButtonLoader] = useState(false);
    const [slotResourceLoader, setSlotResourceLoader] = useState(false);
    const [slotLoader, setSlotLoader] = useState(false);
    const [apiErrors, setApiErrors] = useState();
    const [successMsg, setSuccessMsg] = useState(false);
    const price = parseFloat(publicServiceResponse?.checkout_price_array.price).toFixed(2);
    const discount = publicServiceResponse?.checkout_price_array.discount !== 'null' && publicServiceResponse?.checkout_price_array.discount ? parseInt(publicServiceResponse?.checkout_price_array.discount) : 0;
    const priceDiscount = price * (discount / 100).toFixed(2);
    const finalPrice = price - priceDiscount.toFixed(2)
    const add_to_cart = async (e) => {
        if (localStorage.getItem('role') !== 'vendor') {
            setButtonLoader(true);
            const FORM_DATA = new FormData();
            FORM_DATA.append('engine', publicServiceResponse?.engine);
            FORM_DATA.append('location_id', location_id);
            FORM_DATA.append('service_id', 0);
            FORM_DATA.append('package_id', service_id);
            FORM_DATA.append('user_id', user_id);
            FORM_DATA.append('price', price);
            FORM_DATA.append('discount', discount);
            FORM_DATA.append('feature_image', publicServiceResponse?.images[0]);
            FORM_DATA.append('price_detail', JSON.stringify({ price: price, discount: discount, discountPrice: priceDiscount, totalPrice: finalPrice }))
            FORM_DATA.append('totalPrice', finalPrice);
            FORM_DATA.append('vendor_id', publicServiceResponse?.vendor_id);
            const result = await ADD_TO_CART(FORM_DATA);
            if (result.response.data.status === 422) {
                console.log("ADD_TO_CART-1",result);
                setApiErrors(result.response.data.errors);
                setButtonLoader(false);

                //alert('Hey Mahesh');
            } else {
                if (result.response.data.error) {
                    InfoModal({
                        type: 'error',
                        title: 'Alert',
                        text: result.response.data.error
                    })
                    setButtonLoader(false);
                    //alert('Hey Mahesh');
                } else {

                    setSuccessMsg(true);
                    setButtonLoader(false);
                    setCartRefresh(true)

                }

            }
        } else {
            InfoModal({
                type: 'error',
                title: 'Error',
                text: ' Hey! You are logged in as a Vendor. Only Customer Users are allowed to book a service. Login/Register as a User. '
            })
        }


    }
    return (
        <>
            {publicServiceResponse?.title ? <>
                <div style={{ padding: "30px 0px" }}>
                    <div className='biz-container'>
                        <div className='biz-row'>
                            {checkUserLogin ? <>
                                {successMsg ? <>
                                    <div className='login-para'>
                                        <BiCheckCircle style={{ fontSize: "60px", color: "green" }} />
                                        <h2 style={{ color: "green" }}>Package successfully added in the cart. Thanks</h2>
                                        <p style={{ marginBottom: "15px" }}><span className='red-link' onClick={() => router.push('user-services')}>Continue with booking</span> or <span className='red-link' onClick={() => router.push('user-cart')}>go to cart page</span></p>
                                        {/* <span className='biz-orange-btn' onClick={() => {
                                        router.push('/login?route=service&service_id=' + publicServiceResponse?.master_id + '&location_id=' + publicBookableLocation?.location_id)
                                    }}>Login </span> */}
                                    </div>
                                </> : <>
                                    <div className='biz-col-7'>
                                        <div className='package-box'>
                                            <h2>Services in this Package</h2>
                                            <div className='service-box'>
                                                <ul className='list-for-package-cart'>
                                                    {publicPackageResponseData?.package_details?.map((item) => (<>
                                                        <li>
                                                            <div className='biz-row'>
                                                                <div className='biz-col-2'>
                                                                    <div className='service-detail-slide' style={{ backgroundImage: 'url(' + STORAGE_URL  + '/images/' + item.feature_image + ')', minHeight:"106px", borderRadius:"6px" }}></div>

                                                                </div>
                                                                <div className='biz-col-4 package-list'>
                                                                <h2>{item?.title}</h2>
                                                                <h3>{item?.vendor_details?.name}</h3>
                                                                <h4><FaMapMarkerAlt /> {item?.location_meta.city}</h4>
                                                                <h5>Stand alone price <span>$ {item?.checkout_price_array.price}</span></h5>

                                                                </div>
                                                                <div className='biz-col-6'  style={{color:"#000", textAlign:"right"}}>
                                                                        <p style={{textTransform:"uppercase"}}>NUMBER OF "{item?.title}" IN THE PACKAGE</p>
                                                                        <p className='css-heading-count'>{item?.services_count}</p>

                                                                </div>
                                                            </div>
                                                        </li>
                                                    </>))}
                                                </ul>


                                            </div>
                                        </div>
                                    </div>
                                    <div className='biz-col-5'>
                                        <div className='bg-color-box'>
                                        <ul className='list-for-package-cart-2'>
                                                    {publicPackageResponseData?.package_details?.map((item) => (<>
                                                        <li>
                                                            <div className='biz-row'>
                                                                <div className='biz-col-6 package-list'>
                                                                <h2>{item?.title}</h2>
                                                                <h3>Count <span style={{color:"rgb(237, 81, 12)"}}>{item?.services_count}</span></h3>

                                                                </div>
                                                                <div className='biz-col-6'  style={{color:"#000", textAlign:"right"}}>
                                                                        <p className='css-heading-count' style={{fontSize:"18px", color:"#000"}}>$ {item?.checkout_price_array.price}</p>

                                                                </div>
                                                            </div>
                                                        </li>
                                                    </>))}
                                                    <li>
                                                    <div className='biz-row'>
                                                                <div className='biz-col-6 package-list'>
                                                                <h2 style={{color:"#72959A"}}>Services Total</h2>
                                                                </div>
                                                                <div className='biz-col-6'  style={{color:"#000", textAlign:"right"}}>
                                                                        <p className='css-heading-count' style={{fontSize:"18px", color:"#000"}}>$ {parseFloat(publicPackageResponseData.services_price_with_count)}</p>

                                                                </div>
                                                            </div>
                                                    </li>
                                                    <li className='g-list'>
                                                    <div className='biz-row'>
                                                                <div className='biz-col-6 package-list'>
                                                                <h2 style={{color:"#000"}}>Package Price</h2>
                                                                </div>
                                                                <div className='biz-col-6'  style={{color:"#000", textAlign:"right"}}>
                                                                        <p className='css-heading-count' style={{fontSize:"18px", color:"#000"}}>$ {finalPrice}</p>

                                                                </div>
                                                            </div>
                                                    </li>
                                                </ul>
                                                <div className='biz-row' style={{ margin: "0px -15px" }}>
                                                        <div className='biz-col-12'>
                                                            {buttonLoader ? <>
                                                                <span className='biz-black-btn'><Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> Add to cart</span>
                                                            </> : <>
                                                                <span className='biz-black-btn' onClick={(e) => add_to_cart(e)}>Add to cart</span>
                                                            </>}
                                                            {successMsg && <>
                                                                <p style={{ color: "green", fontSize: "18px", fontWeight: "bold" }}>{successMsg}</p>
                                                            </>}
                                                        </div>

                                                    </div>

                                                <div className='biz-row call-cart' style={{ margin: "0px -15px" }}>
                                                    <div className='biz-col-6'>
                                                        +65 {publicServiceResponse?.vendor_details?.phone}
                                                    </div>
                                                    <div className='biz-col-6' style={{ textAlign: "right" }}>
                                                        <span className='biz-black-outline-btn' onClick={() => { window.location = "tel:65" + publicServiceResponse?.vendor_details?.phone }}>Call</span>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                </>}

                            </> : <>
                                <div className='login-para'>
                                    <h2>Login Account</h2>
                                    <p style={{ marginBottom: "15px" }}>Please login or create your account to book a service. Thanks</p>
                                    <span className='biz-orange-btn' onClick={() => {
                                        router.push('/login?route=package-detail&service_id=' + publicServiceResponse?.master_package_id + '&location_id=' + location_id)
                                    }}>Login </span>
                                </div>

                            </>}
                        </div>

                    </div>
                </div>
            </> :
                <>
                    <div style={{ textAlign: "center", padding: "120px" }}>
                        <Spin tip="Loading" size="large">
                            <div className="content" />
                        </Spin>
                    </div>

                </>}
        </>
    );
}

export default BizPackageCard;