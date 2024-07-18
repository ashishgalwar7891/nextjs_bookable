import { Col, Row, Button, Dropdown } from "antd";
import { Fragment, useState, useEffect } from "react";
import { UserOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { GetServiceById, GetBookedSlotsDetailsforaDate } from "@/Services/userService.services";
import { CalenText } from "@/components/User/serviceDetails/styledComponent";
import { usePathname } from "next/navigation";

const Reschedulebooking = (props) => {
    const format = 'HH:mm';
    const pathname = usePathname()
    const [ apiData, setApiData ] = useState();
    const [ slideIndex, setSlideIndex ] = useState(0);
    const [ slideLength, setSlideLength ] = useState(0);
    const [ showDates, setShowDates ] = useState([]);
    const [ allSlotsData, setallSlotsData ] = useState();
    const [ allResourceList, setAllResourceList ] = useState();
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [clickedRes, setClickedRes] = useState([]);
    const [selectedDate , setSelectedDate] = useState();
    const [carouselImages, setCaroselImages] = useState();
    const [selectedTime, setSelectedTime] = useState([]);
    const [ userId, setUserId ] = useState();
    const [ userToken, setUserToken ] = useState();
    const [ userRole, setUserRole ] = useState();
    // const [ cartData, setCartData ] = useState([]);
    const [isCartVisible, setIsCartVisible ] = useState(false);
    const [isResourceRequired, setIsResourceRequired ] = useState(false); 
    const [ openEndDate, setOpenEndDate ] = useState(false);
    const [endDate, setEndDate ] = useState();
    const [closeSubArray, setCloseSubArray] = useState([]);
    const [closeSubsDates, setCloseSubsDates] = useState([]);
    const [closeSubCartArray, setCloseSubCartArray] = useState([]);
    const [selectedSessionDate, setSelectedSessionDate] = useState();
    const[calltype, setCalltype] =useState();
    const ID = props.serviceId;
    const lID = props.locationId;
    const BookingDate = props.bookingDate;
    const BookingPrice = props.bookingPrice;
    const { cartData, setCartData } = props;
    

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const userToken = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');
        setUserId(userId);
        setUserToken(userToken);
        setUserRole(userRole);
    }, [])

    useEffect(() => {
        (async() => {
            let serviceId = ID; 
            let locationId = lID; 

            const response = await GetServiceById(serviceId,locationId);
            
            const output = response?.response?.data;
            console.log("API data serv Det ==>>", output )
            setApiData(output)

            let endDate = output?.["slots-meta-array"]?.[0]?.[lID]?.end_date;

            let startDate = output?.["slots-meta-array"]?.[0]?.[lID]?.start_date;

            let givenDate = new Date(startDate);

            if(output?.booking_engine_name === 'Open subscription') {
                let days = output?.data?.[0]?.days
                let month = output?.data?.[0]?.month
                let year = output?.data?.[0]?.year


                if (year && month && days) {
                    givenDate.setFullYear(givenDate.getFullYear() + Number(year) );
                    givenDate.setUTCMonth(givenDate.getUTCMonth() + Number(month) );
                    givenDate.setUTCDate(givenDate.getUTCDate() + Number(days) );
                    endDate = givenDate.toISOString();
                    let convertedEndDate = convertDate(endDate)
                    setOpenEndDate(convertedEndDate)
                }
            }

            
            const dateArray = generateDateObjects(startDate, endDate);

            setSlideLength(dateArray.length / 6)
            const datesArrays = splitArrayIntoSubarrays(dateArray, 6);
            setShowDates(datesArrays)

            const cardImages = []; 
            cardImages.push(output?.["feature-image"]);
            output?.["gallery-array"]?.[0] && cardImages.push(output?.["gallery-array"]?.[0]);
            setCaroselImages(cardImages)

            let slotStartTime = output?.service_time?.[0]?.[lID]?.start_time
            let slotEndTime = output?.service_time?.[0]?.[lID]?.end_time

            const slotBuffer = output?.["slots-meta-array"]?.["0"]?.[lID]?.buffer;
            const slotDuration = output?.["slots-meta-array"]?.["0"]?.[lID]?.duration;

            const resourceRequired = output?.["resource-required"];

            if (resourceRequired === 'Yes') { 

                setIsResourceRequired(true)

            let earliest_resource_available_time = '23:59';
            let last_resource_available_time = '00:00' ; 
            var items = output?.resources.map((item, index) => {
                let tempObj = {
                        label: item?.name,
                        start_time: item?.start_time,
                        end_time: item?.end_time,
                        image: item?.image?.url, 
                        key: index,
                    }
                    if ( item?.start_time < earliest_resource_available_time  )
                    {earliest_resource_available_time =  item?.start_time}

                    if ( item?.end_time >last_resource_available_time )
                    {last_resource_available_time = item?.end_time}
                
                return tempObj
            })
            
            var items = output?.resources.map((item, index) => {
                let tempObj = {
                        label: item?.name,
                        start_time: item?.start_time,
                        end_time: item?.end_time,
                        image: item?.image?.url, 
                        key: index,
                    }
                return tempObj
            })

            if (items.length >1) {

                const addAnyone = [{label:'anyone', start_time: earliest_resource_available_time ,
                end_time: last_resource_available_time, key:items.length}];
    
                items.push(...addAnyone);

            }
                setAllResourceList(items);
                setClickedRes(items[items?.length-1]?.label); 
            }


        const slotsResult = createSlots(slotStartTime, slotEndTime, slotDuration, slotBuffer, clickedRes,allResourceList);

        let startDate1 = new Date(startDate.slice(0,10))
        let currDate = new Date();

        if (currDate < startDate1) {
            currDate = startDate1 ; 
            }

        const dateOptions = { day: '2-digit', month: 'short', year: 'numeric' };
        let dateString = currDate.toLocaleDateString('en-US', dateOptions).split(',').join('');

            if ( resourceRequired === 'Yes') { 
                let key = 0
                if (items?.length == 1) {
                    key = 0
                }
                else {
                    key = items?.length-1
                }

                const response = await GetBookedSlotsDetailsforaDate({
                    "service_id": serviceId, 
                    "location_id": locationId,
                    "date": dateString,  
                });


                const output2 = response?.response?.data;

                const slotsResult1 = updateSlots(slotsResult, items?.[key], output2, 'onLoad');
                setallSlotsData(slotsResult1)
            }
            else {
                setallSlotsData(slotsResult)
            }

            if (output?.booking_engine == 1 || output?.booking_engine == 2) { 

                let preSelectedDate = {'date' : BookingDate}
                let preSelectedSlot = {
                    "key": 1,
                    "startTime": props?.bookingStartTime ,
                    "endTime": props?.bookingEndTime,
                    "resFlagDisable": "no"
                }
                console.log("preSelectedDate ==>>", preSelectedDate, typeof(BookingDate), preSelectedSlot);
    
                setSelectedDate(preSelectedDate);
                // setSelectedTime(slot);
            }

            if (output?.booking_engine == 3) {

                const resultedSessionArray = checkCallType(output, currDate, "onLoad" );
                setCloseSubArray(resultedSessionArray)
                setCalltype('onLoad')
            }
    
        const dateObjects = [];
        })();

    }, [])

    useEffect(() => {

        function findFirstActiveSlot(slot) {
            return slot.resFlagDisable === "no"
        }
        
        let firstActiveSlot = allSlotsData?.find(slot => findFirstActiveSlot(slot));

        if ( calltype == 'onLoad' || calltype == 'calenderclick' ) {
        
            let cartObj = {
                "token":userToken || null, 
                "booking_engine": apiData?.booking_engine,
                "user_id":userId || null, 
                "service_id":apiData?.id, 
                "location_id":lID, 
                "price":apiData?.amount, 
                "start_date": selectedSessionDate,
                "end_date": '14 Oct',
                "slot_start_time": firstActiveSlot?.startTime, 
                "slot_end_time": firstActiveSlot?.endTime, 
                "tax":0,
                "discount":0
            }
            
            setCartData((prevValues) => ({
                ...prevValues,
                [selectedSessionDate]: cartObj })
            );

            setIsCartVisible(true); 
            }

    }, [selectedSessionDate, calltype])
    

    const convertDate = (inputDate) => {
        const dateObj = new Date(inputDate);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return dateObj.toLocaleDateString('en-US', options).split(',').join('');
    };

    const createSlots = (startTimeStr, endTimeStr, slotDuration, buffer) => {
        
        const startTime = new Date(`2023-09-04T${startTimeStr}`);
        const endTime = new Date(`2023-09-04T${endTimeStr}`);
        const nextDate = new Date(`2023-09-05T${'00:00'}`);
        const endtimeMargin = 10;
        const endSlotlimit = endTime;
        endSlotlimit.setMinutes(endTime.getMinutes() + endtimeMargin);

        const slots = [];
        let currentTime = new Date(startTime);

        let counter = 0;


        while (currentTime -endTime <= 0) {
        const slotStart = currentTime.toTimeString().slice(0, 5);
    
        const slotEnd = new Date(currentTime);
        slotEnd.setMinutes(currentTime.getMinutes() + slotDuration);
        const slotEndTime = slotEnd.toTimeString().slice(0, 5);
    
        slots.push({   
            key:counter,
            startTime: slotStart,
            endTime: slotEndTime,
            resFlagDisable: 'no'

        });

        // Add buffer time to the start time
        currentTime = new Date(slotEnd);
        currentTime.setMinutes(currentTime.getMinutes() + buffer);
        slotEnd.setMinutes(currentTime.getMinutes() + slotDuration);

          if (slotEnd > endSlotlimit) { break; }

          if (currentTime >= nextDate) { break; }


        counter++;

        } // end of While loop
        
        return slots;
    };

    const formatDate = (date) => {
        const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    const generateDateObjects = (startdate, enddate) => {
        
        const startDate = new Date(startdate.slice(0,10))
        const endDate = new Date(enddate.slice(0,10))
        let currentDate = new Date();
        
        const dateObjects = [];
        
        if (currentDate < startDate) {
        currentDate = startDate ; 
        }
    
        while (currentDate <= endDate) {
            const formattedDate = formatDate(currentDate);
            const day = formattedDate.split(',')[0].trim(); // Extract day
            const date = formattedDate.split(',')[1].trim(); // Extract date
            const month = currentDate.toLocaleString('en-US', { month: 'long' });
            const year = currentDate.getFullYear();
            const dayOfMonth = currentDate.getDate();

            dateObjects.push({ day, date : `${month.slice(0,3)} ${dayOfMonth < 10 ? '0' : ''}${dayOfMonth} ${year}` });
            
            currentDate.setDate(currentDate.getDate() + 1);
        }
    
        return dateObjects;
    }

    const splitArrayIntoSubarrays = (arr, subarraySize) => {
        const result = [];
        for (let i = 0; i < arr.length; i += subarraySize) {
            result.push(arr.slice(i, i + subarraySize));
        }
        return result;
    }

    const handleScrollLeft = () => {
        if (slideIndex > 0 ) {
            setSlideIndex(slideIndex - 1)
        }
    };

    const handleScrollRight = () => {
        if (slideIndex <= slideLength-1 ) {
            setSlideIndex(slideIndex + 1)
        }
    };

    const items = allResourceList

    const updateSlots = (allSlotsData, item, bookedSlotsData, callfrom) => {

        const updatedSlotsData = allSlotsData 
        const callFrom = callfrom; 

        if(bookedSlotsData.length < 1 || bookedSlotsData == undefined){
            console.log("empty array of booked slots")
        }

        const number_of_slots = allSlotsData?.length 

        const res_name = item?.label

        const res_start_time = new Date(`2023-09-04T${item?.start_time}`) 

        const res_end_time = new Date(`2023-09-04T${item?.end_time}`)
        
        const resEndtimeMargin = 10;

        res_end_time.setMinutes(res_end_time.getMinutes() + resEndtimeMargin);
        
        const first_slot_start_time = updatedSlotsData?.[0]?.start_time 

        const last_slot_end_time = updatedSlotsData?.[number_of_slots - 1]?.end_time

        const serv_start_time =  new Date(`2023-09-04T${updatedSlotsData?.[0]?.startTime}`) 

        const serv_end_time = new Date(`2023-09-04T${updatedSlotsData?.[number_of_slots - 1]?.endTime}`) 

        if (serv_start_time >= res_start_time){

            const servres_start_time = serv_start_time; 

        }

        else {

            const servres_start_time = res_start_time

        }

        if (serv_end_time < res_end_time || serv_end_time == res_end_time ){

            const servres_end_time = serv_end_time

        }

        else {


            const servres_end_time = res_end_time

        }

        var slot_start_time; 

        var slot_end_time; 
        
        for (let i = 0; i < updatedSlotsData?.length; i++) {
            
            slot_start_time =  new Date(`2023-09-04T${updatedSlotsData?.[i]?.startTime}`) 

            slot_end_time =  new Date(`2023-09-04T${updatedSlotsData[i]?.endTime}`) 


            if (slot_start_time < res_start_time) {
                updatedSlotsData[i].resFlagDisable = 'yes'
            } else {
                if (slot_end_time > res_end_time) {
                    updatedSlotsData[i].resFlagDisable = 'yes'
            } else {
                updatedSlotsData[i].resFlagDisable = 'no'
            }
        }
        }
        return updatedSlotsData 

    }

    const handleMenuClick = (e) => {
        // message.info('Click on menu item.');
        setClickedRes(items[e.key]?.label); 
        let bookedSlotsData=[];
        setSelectedDate();
        setSelectedTime([]);            
        const slotsResult = updateSlots(allSlotsData, items[e.key], bookedSlotsData,'resClick' );
        setallSlotsData(slotsResult)
    };

    const excludedDays = apiData?.["slots-meta-array"]?.["0"]?.[lID]?.excluded_days;

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    const UpdateOpenSubsEndDate = (givenDate) => {
        let days = apiData?.data?.[0]?.days
        let month = apiData?.data?.[0]?.month
        let year = apiData?.data?.[0]?.year


        if (year && month && days) {
            givenDate.setFullYear(givenDate.getFullYear() + Number(year) );
            givenDate.setUTCMonth(givenDate.getUTCMonth() + Number(month) );
            givenDate.setUTCDate(givenDate.getUTCDate() + Number(days) );
            let newendDate = givenDate.toISOString();
            let convertedEndDate = convertDate(newendDate)
            setOpenEndDate(convertedEndDate)
        }
    }

    const handleDateSelect = async (obj) => {
        setSelectedDate(obj)
        setSelectedTime([])

        let dte = obj.date

        let slotsData = apiData?.['slots-meta-array']?.[0]?.[lID]?.exclude_slots;

        const keys =  (slotsData !== null) && Object.keys(slotsData);


        if ( slotsData !== null && keys.includes(dte)) {
            const selectedKeyObject = slotsData[dte];
            setSelectedSlots(selectedKeyObject)
        } else {
            setSelectedSlots([]); 
        }

        let givenDate = new Date(dte);
        if(apiData?.booking_engine_name === 'Open subscription') {
            UpdateOpenSubsEndDate(givenDate)
        }


        // ===================== session Dates ============
        setCartData([])
        setSelectedTime([])
        setSelectedSessionDate()
       // const formattedDate = formatStrDate(obj.date);
        checkCallType(apiData, dte, "click");
        setCalltype('calenderclick')

    }

    const isSlotDisabled = (startTime) => {
        const res = selectedSlots.some(slot => slot.startTime === startTime);
        return res
    }

    const closeSubFunc = (outData, date, type) => {
        outData?.data?.[0]?.[lID]?.interval

        const subArray = []; 

        let interval_in_days;
        
        switch (outData?.data?.[0]?.[lID]?.session_interval) {
            case 'Daily':
            interval_in_days = outData?.data?.[0]?.[lID]?.interval
            break;
            case 'Weekly':
            interval_in_days = (outData?.data?.[0]?.[lID]?.interval)*7
            break;
            case 'Monthly':
            interval_in_days = (outData?.data?.[0]?.[lID]?.interval)*30
            break;
        }

        let sessionDates = [];

        for (let i = 0; i < outData?.data?.[0]?.[lID]?.no_of_sessions; i++) {
            if (date && interval_in_days) {
                let givenDate = new Date(date);
                givenDate.setUTCDate(givenDate.getUTCDate() + (i * interval_in_days) );
                let nextSessionDate  = convertDate(givenDate)
                sessionDates.push(nextSessionDate)
                if(i==0){
                    setSelectedSessionDate(nextSessionDate)
                }
            }
        }
        setCloseSubsDates(sessionDates);
        setCloseSubCartArray([])
        setCalltype('click')

    }

    const handleSlotClick = (slot) => {
        setSelectedTime(slot);
        if (apiData?.booking_engine == 1 || apiData?.booking_engine == 5 ) {
            let cartObj = {
                "token":userToken || null, 
                "booking_engine": apiData?.booking_engine,
                "user_id":userId || null, 
                "service_id":apiData?.id, 
                "location_id":lID, 
                "price":apiData?.amount, 
                "start_date": selectedDate?.date,
                "end_date": null,
                "slot_start_time": slot?.startTime, 
                "slot_end_time": slot?.endTime, 
                "tax":0,
                "discount":0
            }

            setEndDate(selectedDate?.date)
            setCartData(cartObj);
            setIsCartVisible(true);
        }

        if (apiData?.booking_engine == 2){
            let cartObj = {
                "token":userToken || null, 
                "user_id":userId || null,
                "booking_engine": 2, 
                "service_id":apiData?.id, 
                "location_id":lID, 
                "price":apiData?.amount, 
                "start_date": selectedDate?.date,
                "end_date": openEndDate,
                "slot_start_time": slot?.startTime, 
                "slot_end_time": slot?.endTime, 
                "tax":0,
                "discount":0
            }

            setEndDate(openEndDate)
            setCartData(cartObj);
            setIsCartVisible(true);
        }

        if (apiData?.booking_engine == 3 ) {

            let cartObj = {
                "token":userToken || null, 
                "user_id":userId || null, 
                "booking_engine":3,
                "service_id":apiData?.id, 
                "location_id":lID, 
                "price":apiData?.amount, 
                "start_date": selectedSessionDate,
                "end_date": endDate,
                "slot_start_time": slot?.startTime, 
                "slot_end_time": slot?.endTime, 
                "tax":0,
                "discount":0
            }

            if (selectedSessionDate in cartData) {

                const copy = cartData;
                
                setCartData(copy) 
    
                setCartData((prevValues) => ({
                    ...prevValues,
                    [selectedSessionDate]: cartObj })
                );
            } else {
                setCartData((prevValues) => ({
                    ...prevValues,
                    [selectedSessionDate]: cartObj })
                );
                
            }  

            setIsCartVisible(true);
        }
    }  

    const checkCallType = (dataArr, date, type ) => {
        if (type === "onLoad") {
            closeSubFunc(dataArr, date, type)
        }
        if (type === "click") {
            closeSubFunc(dataArr, date, type)
        }
    }

    const HandleSessionDateClick = (value) => {
        setSelectedSessionDate(value)
    }
    console.log("Cart Data ==>>", cartData);

    return(
        <Fragment>
                <Row>
                    <Col span={24}>
                        <Row style={{width:'100%', display:'flex',  gap:'2rem', justifyContent:'center'}}>
                            <Col style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                                <h4 style={{ fontSize:'20px', fontWeight:700 }} >Choose another date and slot for Rescheduling</h4>

                                <span style={{ fontSize:'16px', fontWeight:600, color:'#72959A' }} >{`Rescheduling from ${BookingDate} - ${props?.bookingStartTime} 
                                    ${ (selectedDate && selectedTime) ? `To ${selectedDate?.date || ''} - ${selectedTime.startTime || ''}` : ''} `}
                                </span>

                                { (pathname == '/mybookings') &&
                                    <>
                                        <span style={{ fontSize:'16px', fontWeight:600, color:'#72959A' }} >{`Booked Price: $${BookingPrice}`}</span>

                                        { (props?.rescheduleStatus == 10 ) && <span style={{ fontSize:'16px', fontWeight:600, color:'#72959A' }} >{`Reschedule Charges 10% of $${BookingPrice}`}</span>}
                                    
                                        { (props?.rescheduleStatus == 10) && <span style={{ fontSize:'16px', fontWeight:600, color:'#72959A' }} >{`Rescheduling charges: $${ (props?.rescheduleStatus == 10 ) ? (BookingPrice * 0.1).toFixed(2) : (props?.rescheduleStatus == 0) ? 0 : null }`}</span>}
                                    </>
                                }
                            </Col>

                            <Col span={24}>
                                <Row justify="center" align="middle">
                                    <Col>
                                        <CalenText>{`${showDates?.[slideIndex]?.["0"]?.date.split(' ')[0]} ${showDates?.[slideIndex]?.["0"]?.date.split(' ')[2]} `}</CalenText>

                                        <Row style={{  display:'flex', justifyContent:'center', alignItems:'center', gap: '3rem', padding: '11px 0px' }}>
                                            <LeftOutlined onClick={handleScrollLeft} style={{ color: '#000' }} />

                                                { showDates?.[slideIndex]?.map((item, index) => {
                                                    return (
                                                        <Button style={{ display:'flex', alignItems:'center', justifyContent:'center', borderRadius: '11px',border: '1px solid #7B7B7B',color: '#2C2C2C',
                                                            fontSize: '16px',fontWeight: 400, height:'90px',  width:"4rem", 
                                                            background: (selectedDate && selectedDate == item) ? ('#EA8933') : (( excludedDays && excludedDays.includes(item?.day)) ? 'rgba(0, 0, 0, 0.04)' : ((!selectedDate && (index ===0)) ? '#ED510C' : 'white')), 
                                                            color:(selectedDate == item) ? '#F2F1F0' : '#2C2C2C'
                                                        }}
                                                            disabled={( excludedDays && excludedDays.includes(item?.day)) ? true : false }
                                                            onClick={() =>  handleDateSelect(item)}
                                                        >
                                                            <span>{item?.day.slice(0,3)}<br/> {item?.date.split(' ')[1]}</span>
                                                        </Button>
                                                    )
                                                })}

                                            <RightOutlined onClick={handleScrollRight} style={{ color: '#000' }} />
                                        </Row>
                                    </Col>
                                </Row>

                                <CalenText>Choose slots</CalenText>

                                { closeSubsDates && closeSubsDates.length > 0 &&
                                    (
                                        <Row style={{ marginBottom: '40px', background:'#72959A', width:'fit-content', display:'flex', padding:'3px', borderRadius:'5px' }}>
                                            {
                                                closeSubsDates.map((item, index) => {
                                                    const [month, day, year] = item.split(" ");
                                                    const formattedDate = `${day} ${month}`;
                                                    return (
                                                        <Col key={index} style={{ margin:'0 5px' }}>

                                                            <Button key={index}
                                                                onClick={ () => { HandleSessionDateClick(item) } }
                                                                style={{ height:'25px', width:'60px', padding:'0',
                                                                    color: (index ===0) ? 'white' : 'black', 
                                                                    // background: (index ===0) ? '#ED510C' : 'white', 
                                                                    background: (selectedSessionDate ) ? ((selectedSessionDate  == item) ? '#ED510C' : 'white') : ((index ===0) ? '#ED510C' : 'white'),
                                                                    color:(selectedSessionDate == item) ? '#F2F1F0' : '#2C2C2C',
                                                                    fontSize:'14px', fontWeight: 400 
                                                                }}
                                                            >
                                                                {formattedDate}
                                                            </Button>

                                                        </Col>
                                                    )
                                                })
                                            }
                                        </Row>
                                    )
                                }
                                
                                <Row style={{ justifyContent:'center', gap: '20px' }}>
                                    <Col style={{ display:'contents', justifyContent:'center', gap: '35px' }}>
                                        { 
                                        
                                        ((apiData?.booking_engine == 3) ? (allSlotsData && selectedSessionDate) : allSlotsData ) &&
                                        
                                        allSlotsData.map((item, index) => {
                                            var isDisabled = isSlotDisabled(item.startTime);

                                            if (item.resFlagDisable == 'yes') { 
                                                isDisabled = new Boolean(true); 
                                            }

                                            return (
                                                <Button 
                                                    style={{ background: (selectedTime?.startTime == item.startTime) ? '#EA8933' :  ((isDisabled)  ? 'rgba(0, 0, 0, 0.04)' : ((!selectedTime?.startTime && index ===0) ? '#ED510C' : 'white')),
                                                            color:  (selectedTime?.startTime == item.startTime) ? 'white' : 'black'
                                                        }}
                                                    disabled={isDisabled} 
                                                    onClick={() => handleSlotClick(item)} 
                                                >
                                                    {item?.startTime}</Button>
                                            )
                                        })
                                        }
                                    </Col>
                                </Row>
                                
                                { isResourceRequired && 
                                <Row style={{ background: '#72959A', marginTop: '20px', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderRadius: '5px' }}>
                                    <Col style={{ color: '#F2F1F0', fontSize: '16px', fontWeight: 400 }}>
                                    <UserOutlined /> {clickedRes}
                                    </Col>
                                { (allResourceList.length > 1) &&
                                    <Col>
                                        {/* <Button>Change</Button> */}
                                        <Dropdown
                                            menu={menuProps}
                                            trigger={['click']}
                                            placement="bottom"
                                            arrow
                                        >   
                                            <a>
                                                <Button  style={{ border: 'none', background: '#2C2C2C', color: '#fff', borderRadius: '5px' }}>
                                                    Change
                                                </Button>
                                            </a>
                                            
                                        </Dropdown>
                                    </Col>
                                }
                                </Row>
                                }

                            </Col>
                        </Row>
                    </Col>
                    {/* <Button onClick={handleClickReschedule} style={{ background:'rgb(234, 137, 51)' }} >Reschedule</Button> */}
                </Row>
        </Fragment>
    )
}

export default Reschedulebooking;