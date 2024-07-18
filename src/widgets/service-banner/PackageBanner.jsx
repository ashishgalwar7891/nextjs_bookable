import React from 'react';
import './style.css'
import { Carousel, Spin } from 'antd';
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { STORAGE_URL } from '@/Services/vendorService.services';
function PackageBanner({ publicServiceResponse, publicPackageResponseData, checkUserLogin, user_id }) {
    const price = parseFloat(publicServiceResponse?.checkout_price_array.price).toFixed(2);
    const discount = publicServiceResponse?.checkout_price_array.discount !== 'null' && publicServiceResponse?.checkout_price_array.discount ? parseInt(publicServiceResponse?.checkout_price_array.discount) : 0;
    const priceDiscount = price * (discount / 100).toFixed(2);
    const finalPrice = price - priceDiscount.toFixed(2)
    return (
        <>
            {publicServiceResponse?.title && publicPackageResponseData?.package_details ? <>
                <div className='biz-full-container' style={{ backgroundColor: " rgb(44, 44, 44)", position: "relative" }}>
                    <div className='position-top'>
                        <div className='biz-container'>
                            <div className='biz-col-6'>
                                <div className='banner-content'>
                                    {parseInt(publicServiceResponse.engine) === 2 || parseInt(publicServiceResponse.engine) === 3 && <><span className='biz-service-tag' style={{ position: "relative", top: "-5px", right: "0px" }}>SUBSCRIPTION</span></>}
                                    {parseInt(publicServiceResponse.engine) === 5 && <><span className='biz-service-tag' style={{ position: "relative", top: "-5px", right: "0px" }}>APPOINTMENT</span></>}
                                    {parseInt(publicServiceResponse.engine) === 4 && <><span className='biz-service-tag' style={{ position: "relative", top: "-5px", right: "0px" }}>PACKAGE</span></>}
                                    <h1>{publicServiceResponse?.title}</h1>
                                    <h5>{publicServiceResponse?.vendor_details?.name}</h5>
                                    <ul className='service-package'>
                                        {publicPackageResponseData?.package_details?.map((item) => (<>
                                            <li style={{ color: "#fff", borderRight: "1px solid #fff", paddingRight: "10px" }}><b style={{ color: "#ed510c" }}>({item.services_count})</b> {item.title}</li>
                                        </>))}

                                    </ul>
                                    <h6><FaMapMarkerAlt /> {publicPackageResponseData?.location_meta?.city}</h6>
                                    <ul>
                                        {publicServiceResponse?.features?.feature1 !== 'null' && <><li><FaCheck /> {publicServiceResponse?.features?.feature1}</li></>}
                                        {publicServiceResponse?.features?.feature2 !== 'null' && <><li><FaCheck /> {publicServiceResponse?.features?.feature2}</li></>}
                                        {publicServiceResponse?.features?.feature3 !== 'null' && <><li><FaCheck /> {publicServiceResponse?.features?.feature3}</li></>}
                                        {publicServiceResponse?.features?.feature4 !== 'null' && <><li><FaCheck /> {publicServiceResponse?.features?.feature4}</li></>}
                                        {publicServiceResponse?.features?.feature5 !== 'null' && <><li><FaCheck /> {publicServiceResponse?.features?.feature5}</li></>}
                                    </ul>
                                    <p>{publicServiceResponse?.about}</p>
                                    <ul>
                                        {publicServiceResponse?.benefits?.benefit1 !== 'null' && <><li><FaCheck /> {publicServiceResponse?.benefits?.benefit1}</li></>}
                                        {publicServiceResponse?.benefits?.benefit2 !== 'null' && <><li><FaCheck /> {publicServiceResponse?.benefits?.benefit2}</li></>}
                                        {publicServiceResponse?.benefits?.benefit3 !== 'null' && <><li><FaCheck /> {publicServiceResponse?.benefits?.benefit3}</li></>}
                                        {publicServiceResponse?.benefits?.benefit4 !== 'null' && <><li><FaCheck /> {publicServiceResponse?.benefits?.benefit4}</li></>}
                                        {publicServiceResponse?.benefits?.benefit5 !== 'null' && <><li><FaCheck /> {publicServiceResponse?.benefits?.benefit5}</li></>}
                                    </ul>
                                    <h2 style={{ marginBottom: "10px" }}>SGD {finalPrice.toFixed(2)} <span style={{ fontSize: '12px', fontWeight: '500', padding: '0px 4px', background: 'rgb(255, 203, 181)', color: 'rgb(237, 81, 12)', lineHeight: '15px', border: 'none', borderRadius: '3px' }}>{discount}% OFF</span> <span style={{ color: 'rgb(242, 241, 240)', marginRight: '10px', fontSize: '18px', textDecoration: 'line-through' }}>{price}</span></h2>
                                    <p style={{ fontWeight: "bold", marginBottom: "20px" }}>Save <span style={{ color: 'rgb(237, 81, 12)' }}>{(parseFloat(publicPackageResponseData.services_price_with_count) - finalPrice).toFixed(2)}</span> with this package</p>
                                    {checkUserLogin && <><span className='biz-orange-btn'>Add to favorites <FaRegHeart /></span></>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='biz-row'>
                        <div className='biz-col-6' style={{ color: "#013120" }}>
                            blank
                        </div>
                        <div className='biz-col-6'>
                            {publicServiceResponse?.images.length > 1 ? <>
                                <Carousel dotPosition={'right'} effect="scrollx" autoplay={true} autoplaySpeed={1000}>
                                    {publicServiceResponse?.images?.map(image => (
                                        <>
                                            <div>
                                                <div className='service-detail-slide' style={{ backgroundImage: 'url(' + STORAGE_URL + '/images/' + image + ')' }}></div>
                                            </div>
                                        </>
                                    ))}
                                </Carousel>
                            </> : <>
                                <div>
                                    <div className='service-detail-slide' style={{ backgroundImage: 'url(' + STORAGE_URL + '/images/' + publicServiceResponse?.feature_image + ')' }}></div>
                                </div>
                            </>}

                        </div>
                    </div>

                </div>
            </> : <>
                <div style={{ textAlign: "center", padding: "120px" }}>
                    <Spin tip="Loading" size="large">
                        <div className="content" />
                    </Spin>
                </div>

            </>}
        </>

    );
}

export default PackageBanner;