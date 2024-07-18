import React, { useEffect, useState } from 'react';
import './style.css'
import { Carousel, Spin } from 'antd';
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { CloseOutlined, LeftOutlined, LoadingOutlined, RightOutlined, UserOutlined } from '@ant-design/icons';
import { FaRegTrashAlt } from "react-icons/fa";
import { RESCHEDULE_REQUEST, LOCATION_SLOT_BY_RESOURCE, SESSION_DATE_SLOTS, BOOK_APPOINTMENT } from '@/Services/frontend';
import { parseInt } from 'lodash';
import { useRouter } from 'next/navigation';
import InfoModal from '@/lib/commonComponent/ConfirmModal';
import { eslint } from '../../../next.config';
import { BiCheckCircle } from "react-icons/bi";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
function Reschedule({ publicServiceResponse, publicBookableLocation, setOpen, checkUserLogin, user_id, rescheduleCharge ,order_id, booking_id}) {
    const router = useRouter();
    // Show Hidden 
    const [showCart, setShowCart] = useState(false);
    const [showSlots, setShowSlots] = useState(false);
    const [buttonLoader, setButtonLoader] = useState(false);
    const [slotResourceLoader, setSlotResourceLoader] = useState(false);
    const [slotLoader, setSlotLoader] = useState(false);
    const [apiErrors, setApiErrors] = useState();
    const [successMsg, setSuccessMsg] = useState(false);
    const [note, setNote] = useState(false);

    // Selected
    const [selected_date, set_selected_date] = useState();

    const [end_date, set_end_date] = useState();
    const [sub_start_date, set_sub_start_date] = useState();

    const [selected_slot, set_selected_slot] = useState([]);
    const [location_id, set_location_id] = useState();
    const [service_id, set_service_id] = useState();
    const [resource_required, set_resource_required] = useState(0);
    const [resource_id, set_resource_id] = useState(0);
    const [slots, set_slots] = useState([]);
    const [feature_image, set_feature_image] = useState();

    const [sessionDataDetails, setSessionDataDetails] = useState();
    const [priceBox, setPriceBox] = useState();
    const [slideLeftIndex, setSlideLeftIndex] = useState(0);
    const [slideRightIndex, setSlideRightIndex] = useState(8);
    const [price, setPrice] = useState();
    const [discount, setDiscount] = useState();
    const [discountPrice, setDiscountPrice] = useState();
    const [totalPrice, setTotalPrice] = useState();




    // Css Function remove active calendar class 
    const removeCalenderActiveClass = () => {
        var calendarClass = document.querySelectorAll('.cal-date');
        for (let index = 0; index < calendarClass.length; index++) {
            calendarClass[index].classList.remove('active');
        }
    }
    const convertDate = (inputDate) => {
        const dateObj = new Date(inputDate);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return dateObj.toLocaleDateString('en-US', options).split(',').join('');
    };

    const getSubPlanDates = (selected_date, open_subscription_specific_year, open_subscription_specific_month, open_subscription_specific_days) => {

        var format_date = convertDate(selected_date);
        var subscription = new Date(selected_date);
        subscription.setFullYear(subscription.getFullYear() + parseInt(open_subscription_specific_year));
        subscription.setMonth(subscription.getMonth() + parseInt(open_subscription_specific_month));
        subscription.setDate(subscription.getDate() + parseInt(open_subscription_specific_days));
        let convertedEndDate = convertDate(selected_date);
        let lastDate = convertDate(subscription.toDateString());
        set_end_date(lastDate);
        set_sub_start_date(format_date);
    }
    const LOCATION_SLOT_BY_RESOURCE_FETCH = async (data) => {
        setSlotResourceLoader(true);
        const FORM_DATA = new FormData();
        FORM_DATA.append('id', publicServiceResponse.biz_service_id);
        FORM_DATA.append('location_id', data.location_id);
        if (data?.resource_id) {
            FORM_DATA.append('resource_id', data.resource_id);
           
        }
        FORM_DATA.append('start_date', data.selected_date);
        const result = await LOCATION_SLOT_BY_RESOURCE(FORM_DATA);
        if(selected_slot?.find(obj => obj.hasOwnProperty('date') && obj['date'] === data.selected_date)){
            set_resource_id(data.resource_id);
            set_selected_slot(prevArray => {
                for (let index = 0; index < result?.response?.data?.slots.slot.length; index++) {
                    if (result?.response?.data?.slots.slot[index].enable === true) {
                        const newArray = [{ "date": data.selected_date, 'start_time': result?.response?.data?.slots.slot[index].start_time, 'end_time': result?.response?.data?.slots.slot[index].end_time }];
                        return newArray;
                        break;
                    }

                }

            });
            set_slots(result?.response?.data?.slots);
            setSessionDataDetails(result?.response?.data?.sessionDataDetails);
            set_location_id(data.location_id);
            set_feature_image(publicServiceResponse?.images[0])
            set_service_id(data.service_id);
            var price = parseFloat(publicServiceResponse?.checkout_price_array.price);
            var discount = publicServiceResponse?.checkout_price_array.discount != "null" && publicServiceResponse?.checkout_price_array.discount ? parseInt(publicServiceResponse?.checkout_price_array.discount) : 0;
            var priceDiscount = price * (discount / 100);
            var finalPrice = price - priceDiscount;
            setPrice(price);
            setDiscount(discount);
            setDiscountPrice(priceDiscount);
            setTotalPrice(finalPrice.toFixed(2))
            setPriceBox(publicServiceResponse?.checkout_price_array);
        }else{
            for (let index = 0; index < result?.response?.data?.slots.slot.length; index++) {
                if (result?.response?.data?.slots.slot[index].enable === true) {
                    set_selected_slot([{ "date": data.selected_date, 'start_time': result?.response?.data?.slots.slot[index].start_time, 'end_time': result?.response?.data?.slots.slot[index].end_time }]);
                    break;
                }
            }
            set_slots(result?.response?.data?.slots);
            setSessionDataDetails(result?.response?.data?.sessionDataDetails);
            set_location_id(data.location_id);
            if (publicBookableLocation?.resourcesDetails.length > 0) {
                set_resource_id(publicBookableLocation?.resourcesDetails[0].id);
            }
            set_feature_image(publicServiceResponse?.images[0])
            set_service_id(data.service_id);
            var price = parseFloat(publicServiceResponse?.checkout_price_array.price);
            var discount = publicServiceResponse?.checkout_price_array.discount != "null" && publicServiceResponse?.checkout_price_array.discount ? parseInt(publicServiceResponse?.checkout_price_array.discount) : 0;
            var priceDiscount = price * (discount / 100);
            var finalPrice = price - priceDiscount;
            setPrice(price);
            setDiscount(discount);
            setDiscountPrice(priceDiscount);
            setTotalPrice(finalPrice.toFixed(2))
            setPriceBox(publicServiceResponse?.checkout_price_array);    
        }

        setShowSlots(true);
        if (publicServiceResponse?.engine === 3) {
            set_end_date(convertDate(result?.response?.data?.sessionDataDetails?.session_dates[result?.response?.data?.sessionDataDetails?.session_dates.length - 1].html_format));
            getSubPlanDates(data.selected_date, publicServiceResponse?.open_subscription_specific?.open_subscription_specific_year, publicServiceResponse?.open_subscription_specific?.open_subscription_specific_month, publicServiceResponse?.open_subscription_specific?.open_subscription_specific_days) 
        }
        if (publicServiceResponse?.engine === 2) {
            var open_subscription_specific_year = publicServiceResponse?.open_subscription_specific.open_subscription_specific_year;
            var open_subscription_specific_month = publicServiceResponse?.open_subscription_specific.open_subscription_specific_month;
            var open_subscription_specific_days = publicServiceResponse?.open_subscription_specific.open_subscription_specific_days;
            var currentDate = new Date(data.selected_date);
            currentDate.setFullYear(currentDate.getFullYear() + parseInt(open_subscription_specific_year));
            currentDate.setMonth(currentDate.getMonth() + parseInt(open_subscription_specific_month));
            currentDate.setDate(currentDate.getDate() + parseInt(open_subscription_specific_days));
            set_end_date(convertDate(currentDate));
            set_sub_start_date(convertDate(data.selected_date))
        }
        setSlotResourceLoader(false)
        setSlotLoader(false)


    }
    const SESSION_DATE_SLOTS_FETCH = async (data) => {
        setSlotLoader(true)
        const FORM_DATA = new FormData();
        FORM_DATA.append('id', data.service_id);
        FORM_DATA.append('location_id', data.location_id);
        FORM_DATA.append('start_date', data.selected_date);
        FORM_DATA.append('resource_id', data.resource_id);
        const result = await SESSION_DATE_SLOTS(FORM_DATA);
        set_slots(result?.response?.data?.slots);
        if (selected_slot.find(obj => obj.hasOwnProperty('date') && obj['date'] === data.selected_date)) {

        } else {
            for (let index = 0; index < result?.response?.data?.slots.slot.length; index++) {
                if (result?.response?.data?.slots.slot[index].enable === true) {
                    set_selected_slot([...selected_slot, { "date": data.selected_date, 'start_time': result?.response?.data?.slots.slot[index].start_time, 'end_time': result?.response?.data?.slots.slot[index].end_time }]);
                    break;
                }
            }
        }
        setSlotLoader(false)

    }
    // handle date click
    const handleDateCLick = (event, date_html_format, resource_required) => {
        setSlotLoader(true)
        event.preventDefault();
        removeCalenderActiveClass();
        set_selected_date(date_html_format);
        var api_resource_id = 0;
        const api_selected_date = date_html_format;
        const api_service_id = publicServiceResponse?.master_id;
        const api_location_id = publicBookableLocation?.location_id;
        if (resource_required === 1) {
            api_resource_id = publicBookableLocation?.resourcesDetails[0].id;
            set_resource_required(1);

        }
        const data = {
            service_id: api_service_id,
            location_id: api_location_id,
            selected_date: api_selected_date,
        }
        console.log('data............', data)
        LOCATION_SLOT_BY_RESOURCE_FETCH(data);

        event.target.classList.add('active');

    }
    const handleSessionDateCLick = (event, date_html_format, resource_required) => {
        const api_selected_date = date_html_format;
        const api_service_id = publicServiceResponse?.master_id;
        const api_location_id = publicBookableLocation?.location_id;
        const data = {
            service_id: api_service_id,
            location_id: api_location_id,
            selected_date: api_selected_date,
            resource_id: resource_id,
        }
        console.log('data............', data)
        SESSION_DATE_SLOTS_FETCH(data);

        event.target.classList.add('active');
    }

    const handleResourceChange = (event) => {
        set_resource_id(event.target.value);
        const data = {
            service_id: service_id,
            location_id: location_id,
            resource_id: event.target.value,
            selected_date: selected_date,
        }
        LOCATION_SLOT_BY_RESOURCE_FETCH(data);
    }
    const handleSlotCLick = (event, html_format_date, start_time, end_time) => {
        if (selected_slot.find(obj => obj.hasOwnProperty('date') && obj['date'] === html_format_date)) {
            const findIndex = selected_slot.findIndex(obj => obj.hasOwnProperty('date') && obj['date'] === html_format_date);
            set_selected_slot(prevArray => {
                const newArray = [...prevArray];
                newArray[findIndex]['start_time'] = start_time;
                newArray[findIndex]['end_time'] = end_time;
                return newArray;
            });
        }
    }



    const handleScrollLeft = () => {
        if (slideLeftIndex > 0) {
            setSlideLeftIndex(slideLeftIndex - 1);
            setSlideRightIndex(slideRightIndex - 1)
        }
        const outputDateString = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(new Date(publicBookableLocation?.slots?.dateSlider[slideRightIndex].date_html_format));
        document.getElementById('cal-header').innerHTML = outputDateString;
    };

    const handleScrollRight = () => {
        if (publicBookableLocation?.slots?.dateSlider.length > 6 && publicBookableLocation?.slots?.dateSlider.length !== slideRightIndex) {
            setSlideLeftIndex(slideLeftIndex + 1);
            setSlideRightIndex(slideRightIndex + 1)
        }

        const outputDateString = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(new Date(publicBookableLocation?.slots?.dateSlider[slideRightIndex].date_html_format));
        document.getElementById('cal-header').innerHTML = outputDateString;
    };

    const flitterDatesByIndex = (data) => {
        return data.slice(slideLeftIndex, slideRightIndex)
    }

    const reschedule_request = async (e) => {
        setButtonLoader(true);
        console.log('booking_idbooking_idbooking_idbooking_idbooking_id',booking_id)
        const FORM_DATA = new FormData();
        FORM_DATA.append('start_date', selected_date);
        FORM_DATA.append('end_date', end_date);
        FORM_DATA.append('engine', publicServiceResponse?.engine);
        FORM_DATA.append('selected_slot', JSON.stringify(selected_slot));
        FORM_DATA.append('location_id', location_id);
        FORM_DATA.append('service_id', service_id);
        FORM_DATA.append('package_id', 0);
        FORM_DATA.append('resource_id', resource_id);
        FORM_DATA.append('user_id', user_id);
        FORM_DATA.append('sessionDataDetails', sessionDataDetails);
        FORM_DATA.append('price', price);
        FORM_DATA.append('discount', discount);
        FORM_DATA.append('feature_image', feature_image);
        FORM_DATA.append('checkout_amount', rescheduleCharge)
        FORM_DATA.append('order_id', order_id)
        FORM_DATA.append('booking_id', booking_id)
        FORM_DATA.append('note', note);
        FORM_DATA.append('price_detail', JSON.stringify({ price: price, discount: discount, discountPrice: discountPrice, totalPrice: totalPrice }))
        FORM_DATA.append('totalPrice', totalPrice);
        FORM_DATA.append('vendor_id', publicServiceResponse?.vendor_id);
        if (parseInt(publicServiceResponse?.engine) === 3) {
            if (selected_slot.length === sessionDataDetails?.session_dates.length) {
                if (parseInt(publicServiceResponse?.engine) === 5) {
                    const result = await RESCHEDULE_REQUEST(FORM_DATA);
                    if (result?.response?.data?.status === 422) {
                        console.log(result);
                        setApiErrors(result?.response?.data?.errors);
                        setButtonLoader(false);

                        //alert('Hey Mahesh');
                    } else {
                        if (result?.response?.data?.error) {
                            InfoModal({
                                type: 'error',
                                title: 'Error',
                                text: result?.response?.data?.error
                            })
                            setButtonLoader(false);
                            //alert('Hey Mahesh');
                        } else {
                            if(result?.response?.data?.type == 'free'){
                                router.push('/thankyou?type=free')
                            }else{
                                router.push('/pay?request='+result?.response?.data?.rescheduleRequest)
                            }
                            
                        }

                    }
                } else {
                    const result = await RESCHEDULE_REQUEST(FORM_DATA);
                    if (result?.response?.data?.status === 422) {
                        console.log(result);
                        setApiErrors(result?.response?.data?.errors);
                        setButtonLoader(false);

                        //alert('Hey Mahesh');
                    } else {
                        if (result?.response?.data?.error) {
                            InfoModal({
                                type: 'error',
                                title: 'Alert',
                                text: result?.response?.data?.error
                            })
                            setButtonLoader(false);
                            //alert('Hey Mahesh');
                        } else {
                            
                            if(result?.response?.data?.type == 'free'){
                                router.push('/thankyou?type=free')
                            }else{
                                router.push('/pay?request='+result?.response?.data?.rescheduleRequest)
                            }
                            
                        }

                    }
                }
            } else {
                InfoModal({
                    type: 'error',
                    title: 'Alert',
                    text: 'Please select all Session Dates slots. Thanks'
                })
                setButtonLoader(false)
            }
        } else {
            if (parseInt(publicServiceResponse?.engine) === 5) {
                const result = await RESCHEDULE_REQUEST(FORM_DATA);
                if (result?.response?.data?.status === 422) {
                    console.log(result);
                    setApiErrors(result?.response?.data?.errors);
                    setButtonLoader(false);

                    //alert('Hey Mahesh');
                } else {
                    if (result?.response?.data?.error) {
                        InfoModal({
                            type: 'error',
                            title: 'Error',
                            text: result?.response?.data?.error
                        })
                        setButtonLoader(false);
                        //alert('Hey Mahesh');
                    } else {
                      
                        if(result?.response?.data?.type == 'free'){
                            router.push('/thankyou?type=free')
                        }else{
                            router.push('/pay?request='+result?.response?.data?.rescheduleRequest)
                        }
                        
                    }

                }
            } else {
                const result = await RESCHEDULE_REQUEST(FORM_DATA);
                if (result?.response?.data?.status === 422) {
                    console.log(result);
                    setApiErrors(result?.response?.data?.errors);
                    setButtonLoader(false);

                    //alert('Hey Mahesh');
                } else {
                    if (result?.response?.data?.error) {
                        InfoModal({
                            type: 'error',
                            title: 'Alert',
                            text: result?.response?.data?.error
                        })
                        setButtonLoader(false);
                        //alert('Hey Mahesh');
                    } else {
                       
                        if(result?.response?.data?.type == 'free'){
                            router.push('/thankyou?type=free')
                        }else{
                            router.push('/pay?request='+result?.response?.data?.rescheduleRequest)
                        }
                        

                    }

                }
            }
        }



    }
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    return (
        <>
            <div className='biz-popup-modal'>
                <div className='biz-popup-modal-container'>

                    {publicServiceResponse?.title && publicBookableLocation.location_id ? <>
                        {buttonLoader ? <>
                            <>
                                <div style={{ textAlign: "center", padding: "20px", width: "800px" }}>
                                    <Spin tip="Loading" size="large">
                                        <div className="content" />
                                    </Spin>
                                </div>

                            </>
                        </> : <>
                            <span className='biz-close' style={{top:"9px", right:"12px"}} onClick={() => handleCancel()}><CloseOutlined /></span>
                            <div className='biz-row'>
                                <div className='biz-col-12'>
                                    <h4 style={{ fontSize: '20px', fontWeight: 700, textAlign: "center" }} >Choose another date and slot for Rescheduling</h4>
                                    <h4 style={{ fontSize: '20px', fontWeight: 700, textAlign: "center", marginBottom: "20px" }} >Reschedule Booking Charge: <span style={{ color: "orange" }}>$  {parseInt(publicServiceResponse.engine) !== 6 ? rescheduleCharge : '0.00'}</span></h4>
                                    {selected_date && <>
                                      {publicServiceResponse.engine === 2 && <>
                                        <p  style={{ fontSize: '18px', fontWeight: 700, textAlign: "center", marginTop: "-20px", marginBottom: "20px" }}> Subscription - Start Date: {convertDate(selected_date)} to {end_date}</p>
                                      </>}
                                    </>}
                                    <div className='bg-color-box'>
                                        <div className='slot-calendar'>
                                            <h3>Select Date</h3>
                                            <div className='LeftOutlined'><LeftOutlined onClick={handleScrollLeft} style={{ color: '#000' }} /></div>
                                            <div className='cal-header' id='cal-header'>{publicBookableLocation?.slots?.dateSlider[0]?.heading}</div>
                                            <div>
                                                {publicBookableLocation?.slots?.dateSlider && flitterDatesByIndex(publicBookableLocation?.slots?.dateSlider)?.map((slide_date, index) => (<>

                                                    {slide_date?.available ? <>
                                                        <div className='cal-date' onClick={(e) => handleDateCLick(e, slide_date.date_html_format, publicServiceResponse.resource_required)}>
                                                            <span>{slide_date.print_date.d}</span>
                                                            <span>{slide_date.print_date.D}</span>
                                                        </div>
                                                    </> : <>
                                                        <div className='cal-date disabled'>
                                                            <span>{slide_date.print_date.d}</span>
                                                            <span>{slide_date.print_date.D}</span>
                                                        </div>
                                                    </>
                                                    }
                                                </>

                                                ))}
                                            </div>
                                            <div className='RightOutlined'> <RightOutlined onClick={handleScrollRight} style={{ color: '#000' }} /></div>

                                        </div>
                                        {slotResourceLoader ? <>

                                            <div style={{ textAlign: "center", padding: "255px 0px" }}>
                                                <Spin tip="Loading" size="large">
                                                    <div className="content" />
                                                </Spin>
                                            </div>
                                        </> : <>
                                            {resource_required === 1 && <>
                                                {publicServiceResponse?.resource_required === 1 && <>
                                                    <div className='selected-resource-wapper'>
                                                        <h3>Select Resource</h3>
                                                        <UserOutlined />
                                                        <select className='selected-resource' value={resource_id} onChange={(e) => handleResourceChange(e)}>
                                                            {publicBookableLocation?.resourcesDetails?.map(resource => (
                                                                <>
                                                                    <option value={resource?.id} selected={parseInt(resource?.id) === resource_id ? 'selected' : ''}>{resource.name}</option>
                                                                </>
                                                            ))}

                                                        </select>
                                                    </div>
                                                </>}
                                            </>}
                                            {slotLoader ? <>

                                                <div style={{ textAlign: "center", padding: "50px" }}>
                                                    <Spin tip="Loading" size="large">
                                                        <div className="content" />
                                                    </Spin>
                                                </div>
                                            </> : <>
                                                {showSlots && <>
                                                    {sessionDataDetails && <>
                                                        <div className='slots-wapper'>
                                                            <h3>Session Dates</h3>
                                                            <p style={{ padding: "9px 5px" }}><b>Day: </b>{slots?.day}</p>

                                                            <ul>
                                                                {sessionDataDetails?.session_dates?.map(item => (
                                                                    <>
                                                                        <li onClick={(e) => handleSessionDateCLick(e, item.html_format, publicServiceResponse.resource_required)}><span className={selected_slot?.length > 0 && selected_slot?.find(obj => obj.hasOwnProperty('date') && obj['date'] === item.html_format) && 'active'}>{item.print_format}</span></li>

                                                                    </>
                                                                ))}

                                                            </ul>

                                                        </div>
                                                    </>}
                                                    <div className='slots-wapper'>
                                                        <h3>Select Slot</h3>
                                                        <p style={{ padding: "9px 5px" }}><b>Day: </b>{slots?.day}</p>
                                                        <ul>
                                                            {slots?.slot.map(item => (
                                                                <>
                                                                    {item.enable ? <><li><span onClick={(e) => handleSlotCLick(e, slots.slot_date, item.start_time, item.end_time)} className={selected_slot.find(obj => obj.hasOwnProperty('start_time') && obj['start_time'] === item.start_time && obj['date'] === slots.slot_date) && 'active'}>{item.start_time}</span></li></> : <><li><span className='disabled'>{item.start_time}</span></li></>}
                                                                </>
                                                            ))}

                                                        </ul>
                                                    </div>
                                                </>}
                                            </>}
                                        </>}
                                    </div>
                                </div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <span className='engine-button'  onClick={() => reschedule_request()} style={{ display: "inline-block" }}>Reschedule</span>
                            </div>
                        </>}
                    </> :
                        <>
                            <div style={{ textAlign: "center", padding: "20px", width: "800px" }}>
                                <Spin tip="Loading" size="large">
                                    <div className="content" />
                                </Spin>
                            </div>

                        </>}
                </div>
            </div>
        </>
    );
}
export default Reschedule;