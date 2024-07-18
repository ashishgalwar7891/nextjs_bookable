import React, { useEffect, useState } from 'react';
import './style.css'
import { Carousel, Spin, Row } from 'antd';
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { LeftOutlined, LoadingOutlined, RightOutlined, UserOutlined } from '@ant-design/icons';
import { FaRegTrashAlt } from "react-icons/fa";
import { ADD_TO_CART, LOCATION_SLOT_BY_RESOURCE, SESSION_DATE_SLOTS, BOOK_APPOINTMENT, BOOK_DIRECT } from '@/Services/frontend';
import { parseInt } from 'lodash';
import { useRouter } from 'next/navigation';
import InfoModal from '@/lib/commonComponent/ConfirmModal';
import { eslint } from '../../../next.config';
import { BiCheckCircle } from "react-icons/bi";
import { useCart } from '@/components/Layout';
function ServiceSlotCart({ publicServiceResponse, publicBookableLocation, checkUserLogin, user_id, locationId, serviceId }) {
    const router = useRouter();
   // const { setCartRefresh } = useCart();
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
    const [resource_name, set_resource_name] = useState(0);
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


    useEffect(() => {
        setShowCart(false);
        setShowSlots(false);
        setButtonLoader(false);
        setSlotResourceLoader(false);
        setSlotLoader(false);
        setApiErrors();
        setSuccessMsg(false);
        setNote(false);


        // Selected
        set_selected_date();

        set_end_date();
        set_sub_start_date();

        set_selected_slot([]);
        set_location_id();
        set_service_id();
        set_resource_required(0);
        set_resource_id(0);
        set_resource_name(0);
        set_slots([]);
        set_feature_image();

        setSessionDataDetails();
        setPriceBox();
        setSlideLeftIndex(0);
        setSlideRightIndex(8);
        setPrice();
        setDiscount();
        setDiscountPrice();
        setTotalPrice();
        removeCalenderActiveClass();
    }, [locationId, serviceId])

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
        // set_sub_start_date(format_date);
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
        if (selected_slot?.find(obj => obj.hasOwnProperty('date') && obj['date'] === data.selected_date)) {
            set_resource_id(data.resource_id);
            set_selected_slot(prevArray => {
                for (let index = 0; index < result.response.data.slots.slot.length; index++) {
                    if (result.response.data.slots.slot[index].enable === true) {
                        const newArray = [{ "date": data.selected_date, 'start_time': result.response.data.slots.slot[index].start_time, 'end_time': result.response.data.slots.slot[index].end_time }];
                        return newArray;
                        break;
                    }

                }

            });
            set_slots(result.response.data.slots);
            setSessionDataDetails(result.response.data.sessionDataDetails);
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

        } else {
            for (let index = 0; index < result.response.data.slots.slot.length; index++) {
                if (result.response.data.slots.slot[index].enable === true) {
                    set_selected_slot([{ "date": data.selected_date, 'start_time': result.response.data.slots.slot[index].start_time, 'end_time': result.response.data.slots.slot[index].end_time }]);
                    break;
                }
            }
            set_slots(result.response.data.slots);
            setSessionDataDetails(result.response.data.sessionDataDetails);
            set_location_id(data.location_id);
            if (publicBookableLocation?.resourcesDetails.length > 0) {
                set_resource_id(publicBookableLocation?.resourcesDetails[0].id);
                set_resource_name(publicBookableLocation?.resourcesDetails[0].name)
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
        if (publicServiceResponse?.engine === 3) {
            set_end_date(convertDate(result.response.data.sessionDataDetails?.session_dates[result.response.data.sessionDataDetails?.session_dates.length - 1].html_format));
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
        setShowSlots(true);

        setSlotResourceLoader(false)
        setSlotLoader(false)


    }
    const SESSION_DATE_SLOTS_FETCH = async (data) => {
        setSlotLoader(true)
        const FORM_DATA = new FormData();
        FORM_DATA.append('id', data?.service_id);
        FORM_DATA.append('location_id', data?.location_id);
        FORM_DATA.append('start_date', data?.selected_date);
        FORM_DATA.append('resource_id', data?.resource_id);
        const result = await SESSION_DATE_SLOTS(FORM_DATA);
        set_slots(result.response.data.slots);
        if (selected_slot.find(obj => obj.hasOwnProperty('date') && obj['date'] === data?.selected_date)) {

        } else {
            for (let index = 0; index < result.response.data.slots.slot.length; index++) {
                if (result.response.data.slots.slot[index].enable === true) {
                    set_selected_slot([...selected_slot, { "date": data.selected_date, 'start_time': result.response.data.slots.slot[index].start_time, 'end_time': result.response.data.slots.slot[index].end_time }]);
                    break;
                }
            }
        }
        setSlotLoader(false)

    }
    // handle date click
    const handleDateCLick = (event, date_html_format, resource_required) => {
        event.preventDefault();
        removeCalenderActiveClass();
        set_selected_date(date_html_format);
        var api_resource_id = 0;
        const api_selected_date = date_html_format;
        const api_service_id = publicServiceResponse?.master_id;
        const api_location_id = publicBookableLocation?.location_id;
        var api_resource_id = 0;
        if (resource_required === 1) {
            api_resource_id = publicBookableLocation?.resourcesDetails[0].id;
            set_resource_id(api_resource_id)
            set_resource_required(1);

        }
        const data = {
            service_id: api_service_id,
            location_id: api_location_id,
            selected_date: api_selected_date,
            resource_id: api_resource_id
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
        publicBookableLocation?.resourcesDetails?.filter(resource => {
            if (resource.id == event.target.value) {
                set_resource_name(resource.name);
            }
        })
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

    const add_to_cart = async (e) => {
        if (localStorage.getItem('role') !== 'vendor') {
            setButtonLoader(true);
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
            FORM_DATA.append('order_id', publicServiceResponse?.check_service_in_package?.order_id);
            FORM_DATA.append('package_booked_id', publicServiceResponse?.check_service_in_package?.id);
            FORM_DATA.append('note', note);
            FORM_DATA.append('price_detail', JSON.stringify({ price: price, discount: discount, discountPrice: discountPrice, totalPrice: totalPrice }))
            FORM_DATA.append('totalPrice', totalPrice);
            FORM_DATA.append('vendor_id', publicServiceResponse?.vendor_id);
            if (parseInt(publicServiceResponse?.engine) === 3) {
                if (selected_slot.length === sessionDataDetails?.session_dates.length) {
                    if (parseInt(publicServiceResponse?.engine) === 5) {
                        const result = await BOOK_APPOINTMENT(FORM_DATA);
                        if (result.response.data.status === 422) {
                            console.log(result);
                            setApiErrors(result.response.data.errors);
                            setButtonLoader(false);

                            //alert('Hey Mahesh');
                        } else {
                            if (result.response.data.error) {
                                InfoModal({
                                    type: 'error',
                                    title: 'Error',
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
                        if (publicServiceResponse?.check_service_in_package?.order_id) {
                            const result = await BOOK_DIRECT(FORM_DATA);
                            if (result.response.data.status === 422) {
                                console.log(result);
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
                            const result = await ADD_TO_CART(FORM_DATA);
                            if (result.response.data.status === 422) {
                                console.log("ADD_TO_CART-4",result);
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
                    const result = await BOOK_APPOINTMENT(FORM_DATA);
                    if (result.response.data.status === 422) {
                        console.log(result);
                        setApiErrors(result.response.data.errors);
                        setButtonLoader(false);

                        //alert('Hey Mahesh');
                    } else {
                        if (result.response.data.error) {
                            InfoModal({
                                type: 'error',
                                title: 'Error',
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
                      if (publicServiceResponse?.check_service_in_package?.order_id) {
                            const result = await BOOK_DIRECT(FORM_DATA);
                            if (result.response.data.status === 422) {
                                console.log(result);
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
                            const result = await ADD_TO_CART(FORM_DATA);
                            if (result.response.data.status === 422) {
                                console.log("ADD_TO_CART-3",result);
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
                        }
                  
                }
            }
        } else {
            InfoModal({
                type: 'error',
                title: 'Error',
                text: ' Hey! You are logged in as a Vendor. Only Customer are allowed to book a service. Login/Register as a User. '
            })
        }


    }
    return (
        <>
            {publicServiceResponse?.title && publicBookableLocation?.location_id ? <>

                <div style={{ padding: "30px 0px" }}>
                    <div className='biz-container'>
                        <div className='biz-row'>
                            {checkUserLogin ? <>
                                {successMsg ? <>
                                    <div className='login-para'>
                                        <BiCheckCircle style={{ fontSize: "50px", color: "green" }} />
                                        {publicServiceResponse?.engine == 5 ? <>
                                            <h2 style={{ color: "green" }}>Appointment successfully booked. Thanks</h2>
                                            <p style={{ marginBottom: "15px" }}><span className='red-link' onClick={() => router.push('user-services')}>Continue with booking</span></p>
                                        </> : <>
                                            {publicServiceResponse?.check_service_in_package ? <>
                                                <h2 style={{ color: "green" }}>Service successfully Booked. Thanks</h2>
                                                <p style={{ marginBottom: "15px" }}><span className='red-link' onClick={() => router.push('user-services')}>Continue with booking</span></p>
                                            </> : <>
                                                <h2 style={{ color: "green" }}>Service successfully added in the cart. Thanks</h2>
                                                <p style={{ marginBottom: "15px" }}><span className='red-link' onClick={() => router.push('user-services')}>Continue with booking</span> or <span className='red-link' onClick={() => router.push('user-cart')}>go to cart page</span></p>
                                            </>}

                                        </>}

                                    </div>

                                </> : <>
                                    <div className='biz-col-7'>

                                        <div className='bg-color-box'>
                                            <div className='slot-calendar'>
                                                <h3>Select a date</h3>
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
                                                                {/* {publicBookableLocation?.resourcesDetails?.length > 1 && <>
                                                              <option value={0} selected="selected">Any One</option>
                                                            </>} */}
                                                                {publicBookableLocation?.resourcesDetails?.map(resource => (
                                                                    <>
                                                                        <option style={{display:'flex', alignItems:'center'}} value={resource?.id} selected={parseInt(resource?.id) === resource_id ? 'selected' : ''}>{resource.name}</option>
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
                                                                    {sessionDataDetails?.session_dates.map(item => (
                                                                        <>
                                                                            <li onClick={(e) => handleSessionDateCLick(e, item.html_format, publicServiceResponse.resource_required)}><span className={selected_slot.find(obj => obj.hasOwnProperty('date') && obj['date'] === item.html_format) && 'active'}>{item.print_format}</span></li>

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
                                                                        {item.enable ? <><li style={{minWidth:'90px'}}><span onClick={(e) => handleSlotCLick(e, slots.slot_date, item.start_time, item.end_time)} className={selected_slot.find(obj => obj.hasOwnProperty('start_time') && obj['start_time'] === item.start_time && obj['date'] === slots.slot_date) && 'active'}>{item.start_time}</span></li></> : <><li style={{minWidth:'90px', display:'none'}}><span className='disabled'>{item.start_time}</span></li></>}
                                                                    </>
                                                                ))}

                                                            </ul>
                                                        </div>
                                                    </>}
                                                </>}
                                            </>}
                                        </div>
                                    </div>
                                    <div className='biz-col-5'>
                                        <div className='bg-color-box'>
                                            {selected_slot?.length > 0 ? <>
                                                {publicServiceResponse?.engine === 5 ? <>
                                                    <div className='cart-row'>
                                                        <div className='biz-row'>
                                                            <div className='biz-col-1'>
                                                                <FaRegTrashAlt />
                                                            </div>
                                                            <div className='biz-col-9'>
                                                                <h3>{publicServiceResponse?.title}</h3>
                                                                {selected_slot?.map(item => (<>
                                                                    <h6>{item.date}| {item.start_time} - {item.end_time} | {publicBookableLocation?.duration} Min.</h6>
                                                                </>))}
                                                            </div>
                                                            <div className='biz-col-2' style={{ textAlign: "right" }}>
                                                                {/* <h4>${parseInt(priceBox?.price).toFixed(2)}</h4> */}
                                                            </div>
                                                        </div>
                                                        <div className='biz-row'>
                                                            <div className='biz-col-12'>
                                                                <label style={{ margin: "5px 0px", display: "block" }}>Type a message</label>
                                                                <textarea onChange={(e) => setNote(e.target.value)} className='biz-input'></textarea>
                                                            </div>
                                                        </div>
                                                        <div className='biz-row'>

                                                            <div className='biz-col-9'>
                                                                <h3>Service/Consultation price starts from</h3>
                                                                <p>This is an appointment booking. Payment for services, consultation and/or other charges to be paid at service provider location.</p>
                                                            </div>
                                                            <div className='biz-col-3' style={{ textAlign: "right" }}>
                                                                <h4>${parseFloat(priceBox?.price).toFixed(2)}</h4>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className='biz-row' style={{ margin: "0px -15px" }}>
                                                        <div className='biz-col-12'>
                                                            {buttonLoader ? <>
                                                                <span className='biz-black-btn'><Spin indicator={<LoadingOutlined style={{ fontSize: 15 }} spin />} /> Book Appointment</span>
                                                            </> : <>
                                                                <span className='biz-black-btn' onClick={(e) => add_to_cart(e)}>Book Appointment</span>
                                                            </>}

                                                        </div>

                                                    </div>

                                                </> : <>
                                                    <div className='cart-row'>
                                                    {publicServiceResponse?.check_service_in_package &&
                                                    <div style={{backgroundColor:"#59939d", padding:"10px", margin:"15px"}}>
                                                             <p style={{color:"#fff", fontWeight:"bold"}}> This service is in your Package Added By {publicServiceResponse?.vendor_details?.name} </p>
                                                             <p style={{color:"#fff", fontWeight:"bold"}}>You have {publicServiceResponse?.check_service_in_package?.count} {publicServiceResponse?.title} available</p>
                                                              </div>
}
                                                        <div className='biz-row'>
                                                            <div className='biz-col-1'>
                                                                <FaRegTrashAlt />
                                                            </div>
                                                            <div className='biz-col-9'>
                                                            
                                                                <h3>{publicServiceResponse?.title}</h3>
                                                                {selected_slot?.map(item => (<>
                                                                    {publicServiceResponse?.engine === 3 && <>
                                                                        <h6>{item.date}| {item.start_time} - {item.end_time} | {publicBookableLocation?.duration} Min.</h6>
                                                                    </>}
                                                                    {publicServiceResponse?.engine === 1 && <>
                                                                        <h6>{item.date}| {item.start_time} - {item.end_time} | {publicBookableLocation?.duration} Min.</h6>
                                                                    </>}
                                                                    {publicServiceResponse?.engine === 2 && <>
                                                                        <h6> {item.start_time} - {item.end_time} | {publicBookableLocation?.duration} Min.</h6>
                                                                        <div style={{ display: "inline-block", backgroundColor: "#fff", padding: "15px", borderRadius: "5px", margin: "10px 0px" }}>
                                                                            <p style={{ marginBottom: "6px" }}><b>Subscription Period</b></p>
                                                                            <p>{sub_start_date} - {end_date}</p>
                                                                        </div>
                                                                    </>}

                                                                </>))}

                                                            </div>
                                                            <div className='biz-col-2' style={{ textAlign: "right" }}>
                                                                <h4>${parseFloat(priceBox?.price).toFixed(2)}</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {resource_required === 1 && <>

                                                        <div className='biz-row'>
                                                            <div className="biz-col-1" style={{ opacity: "0" }}>ff</div>
                                                            <div className="biz-col-5">
                                                                Selected Resource
                                                            </div>
                                                            <div className="biz-col-6" style={{ textAlign: "right" }}>
                                                                {resource_name}
                                                            </div>
                                                        </div>
                                                    </>}
                                                    <div className='cart-total'>
                                                        <div className='biz-row'>
                                                            <div className='biz-col-6'>
                                                                <span>Total</span>
                                                            </div>
                                                            <div className='biz-col-6' style={{ textAlign: "right" }}>
                                                                <span>${parseFloat(priceBox?.price).toFixed(2)}</span>
                                                            </div>
                                                        </div>
                                                        <div className='biz-row'>
                                                            <div className='biz-col-6'>
                                                                <span>Discount </span>
                                                            </div>
                                                            <div className='biz-col-6' style={{ textAlign: "right" }}>
                                                                <span>{publicServiceResponse?.checkout_price_array.discount != "null" && publicServiceResponse?.checkout_price_array.discount ? parseInt(publicServiceResponse?.checkout_price_array.discount) : 0}%</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='cart-final'>
                                                        <div className='biz-row'>
                                                            <div className='biz-col-6'>
                                                                <span>Total</span>
                                                                <p style={{ margin: '0px 0 8px 0', fontSize: '12px', textTransform: 'none' }}>Inclusive of applicable GST</p>
                                                            </div>
                                                            <div className='biz-col-6' style={{ textAlign: "right" }}>
                                                                <span>${totalPrice}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='biz-row' style={{ margin: "0px -15px" }}>
                                                        <div className='biz-col-12'>
                                                            {publicServiceResponse?.check_service_in_package ? <>
                                                                <span className='biz-black-btn' onClick={(e) => add_to_cart(e)}>Book Service</span>
                                                            </> : <>

                                                                {buttonLoader ? <>
                                                                    <span className='biz-black-btn'><Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> Add to cart</span>
                                                                </> : <>
                                                                    <span className='biz-black-btn'>Add to cart</span>
                                                                </>}
                                                                {successMsg && <>
                                                                    <p style={{ color: "green", fontSize: "18px", fontWeight: "bold" }}>{successMsg}</p>
                                                                </>}
                                                            </>}

                                                        </div>

                                                    </div>

                                                </>}
                                                <div className='biz-row call-cart' style={{ margin: "0px -15px" }}>
                                                    <div className='biz-col-6'>
                                                        +65 {publicServiceResponse?.vendor_details?.phone}
                                                    </div>
                                                    <div className='biz-col-6' style={{ textAlign: "right" }}>
                                                        <span className='biz-black-outline-btn' onClick={() => { window.location = "tel:65" + publicServiceResponse?.vendor_details?.phone }}>Call</span>
                                                    </div>
                                                </div>
                                            </> : <>
                                                <p style={{ margin: "30px", color: "red", textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>Please select Date First</p>
                                            </>}


                                        </div>
                                    </div>
                                </>}

                            </> : <>
                                <div className='login-para'>
                                    <h2>Login Account</h2>

                                    <p style={{ marginBottom: "15px" }}>Please login or create your account to book a service. Thanks</p>
                                    <span className='biz-orange-btn' onClick={() => {
                                        router.push('/login?route=service-detail&service_id=' + publicServiceResponse?.master_id + '&location_id=' + publicBookableLocation?.location_id)
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

export default ServiceSlotCart;