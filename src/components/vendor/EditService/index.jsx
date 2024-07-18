import { Fragment, useEffect, useState } from "react";
import { UploadOutlined, CameraOutlined, CloseOutlined, DeleteOutlined, PlusSquareOutlined, AppleFilled } from '@ant-design/icons';
import { CustomButton, BoxRow, BoxCol, CustomCardButton, CustomCol, CustomForm, CustomSmText, CustomText, CustomVendorRow, StyledRow, StyledText, StyledTitleText } from "./styledComponent";
import { Col, Row, Form, Input, Select, Checkbox, Tag, Upload, Radio, TimePicker, DatePicker, Button, Space, Switch, Table, Spin, InputNumber } from 'antd';
import { CustomGreyText, CustomTitle } from "../styledComponent";
import dayjs from 'dayjs';
import { AddVendService, EditVendInfoService, EditVendService, GetAllLabelsVendService, GetServicesVendService, UpdateVendorPackageService, getPackageVendService } from "@/Services/vendorService.services";
import { StyledHr } from "@/components/vendor-payment/styledComponent";
import { CustCamIconTxt, CustVendFormTxt, CustomUploadButton, CustomVendorFormRow } from "@/components/vendor-details/styledComponent";
import { RegisterFormButton, BodySmallReg } from '@/styles/styledComponent';
import { getDaysOfWeekBetweenDates, removeUndefinedValuesFromObject } from '@/utils/commonMethods';
import moment from 'moment';
import InfoModal from '@/lib/commonComponent/ConfirmModal';
import PackageCard from '@/lib/commonComponent/CustomPackageCard';
import CustomPopconfirm from "../../vendor/services/CustomPopOver";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { SingleCol } from "../services/addServices/styledComponent";

dayjs.extend(customParseFormat);

const dateFormat = 'YYYY-MM-DD';

const { Column } = Table;

const EditServiceForm = () => {
    const router = useRouter();
    const [form] = Form.useForm();
    const searchParams = useSearchParams();
    const { Option } = Select;
    const params = useParams()
    const [userId, setUserId] = useState();
    const [selectedItems, setSelectedItems] = useState([]);
    const [imageList, setImageList] = useState([]);
    const [allLabelDetails, setAllLabelDetails] = useState();
    const [apiData, setApiData] = useState();
    const [showSlots, setShowSlots] = useState(false);
    const [selectedEngine, setSelectedEngine] = useState();
    const [selectedRadio, setSelectedRadio] = useState(true);
    const [multiBookCheck, setMultiBookCheck] = useState({"multiBook": false});
    const [selectedDuration, setSelectedDuration] = useState();
    const [selectedBuffer, setSelectedBuffer] = useState();
    const [excludedDays, setExcludedDays] = useState({});
    const [slotsLocation, setSlotLocation] = useState({});
    const [radioValues, setRadioValues] = useState({});
    const [selectedLocation, setSelectedLocation] = useState({});
    const [prevLocation, setPrevLocation] = useState({});
    const [selectedResource, setSelectedResource] = useState({});
    const [OffSlots, setOffSlots] = useState([]);
    const [customTimeValues, setCustomTimeValues] = useState({});
    const [osPeriod, setosPeriod] = useState({});
    const [sessionValues, setSessionValues] = useState({});
    const [packageLockey, setpackageLockey] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState([])
    const [dateRange, setDateRange] = useState([]);
    const [dataSource, setDataSource] = useState();
    const [appliedLoc, setAppliedLoc] = useState();
    const [appliedLocName, setAppliedLocName] = useState();
    const isDateRangeEmpty = dateRange.length === 0;
    const format = 'HH:mm';
    const durationform = Form.useWatch('duration', form);
    const bufferform = Form.useWatch('buffer_time', form);
    const dateRangeform = Form.useWatch('date_range', form);
    const excludeDaysform = Form.useWatch('exclude_days', form);
    const [showDayExcludeDate, setShowDayExcludeDate] = useState(true);
    const [dayExcludeDate, setDayExcludeDate] = useState();
    const [dates, setDates] = useState(null);
    const [value, setValue] = useState(null);
    const [daysRange, setDaysRange] = useState([0, 1, 2, 3, 4, 5, 6]);
    const [toggleStatus, setToggleStatus] = useState({ day: '', timeSlotKey: '' });
    const [userToken, setUserToken] = useState();
    const [selectedArr, setSelectedArr] = useState([])
    const [tempExSlot, setTempExSlot] = useState();
    const [testing, setTesting ] = useState({})
    const [ packagesIdCount, setPackagesIdCount] = useState([]);
    const packageIdByRoute = searchParams.get('package_id');
    const serviceIdByRoute = searchParams.get('service_id');
    const [renderStatus, setRenderStatus] = useState(true);
    
    useEffect(()=>{
        const reducedData = selectedArr.reduce((acc, item) => {
            const id = Object.keys(item)[0]; // Extracting the ID
            const dates = item[id]; // Extracting the date object
        
            // Checking each date in the object
            Object.keys(dates).forEach(date => {
                if (!acc[id]) {
                    acc[id] = {}; // Creating a new object for the ID if it doesn't exist
                }
        
                if (!acc[id][date]) {
                    acc[id][date] = []; // Creating an array for the date if it doesn't exist
                }
        
                // Adding unique keys to the array for the corresponding date
                dates[date].forEach(entry => {
                    const key = entry.key;
                    if (!acc[id][date].some(e => e.key === key)) {
                        acc[id][date].push(entry);
                    }
                });
            });
        
            return acc;
        }, {});
        
        setTempExSlot(reducedData)

    },[selectedArr])

    useEffect(() => {
        (async () => {
            const userId = localStorage.getItem('userId');
            const userToken = localStorage.getItem('token');
            setUserId(userId)
            setUserToken(userToken)

            const response = await GetServicesVendService(userId);
            const output = response?.response?.data;

            form.setFieldsValue({ category: output?.business_category });
            form.setFieldsValue({ industry: output?.business_industry });
            setApiData(output);
            const fetchLabels = await GetAllLabelsVendService();
            const labelsInfo = fetchLabels?.response?.data?.data?.Labels;
            setAllLabelDetails(labelsInfo)

            output?.locations?.map((item, index) => {
                form.setFieldsValue({
                    [`start_time${item?.location_id}`]: dayjs(item?.start_time, format)
                });
                form.setFieldsValue({
                    [`end_time${item?.location_id}`]: dayjs(item?.end_time, format)
                });
            })

            vendorEditDetails( { "user_id": userId,
                "token": userToken,
            } )

        })();
    }, []);

    useEffect(() => {
        // console.log('Testing in add serv', testing );
    }, [testing])

    const vendorEditDetails = async (data) => {
        try {
            var output;
            if (serviceIdByRoute) {
                data.service_id = serviceIdByRoute;
                const response = await EditVendInfoService(data);
                output = response?.response?.data?.service
            }

            if (packageIdByRoute) {
                data.package_id = packageIdByRoute;
                const responsePackage = await getPackageVendService(data);
                output = responsePackage?.response?.data

                output['service_name'] = output.package_name;
                delete output.package_name;
            }

            console.log("Response Out ==>>", output);

            form.setFieldsValue({ service_name: output?.service_name});
            form.setFieldsValue({ label: output?.label.split(",")});

            const bookingEngine = (output?.booking_engine_id == 1) ? "Pay_go" :
            (output?.booking_engine_id == 2) ? "Open_subscription" : 
            (output?.booking_engine_id == 3) ? "Close_Subscription" : 
            (output?.booking_engine_id == 4) ? "Choose_Packages" : "Not "
            
            setSelectedEngine(bookingEngine);
            form.setFieldsValue({ radio_button: bookingEngine });

            form.setFieldsValue({ gender: output?.gender });
            form.setFieldsValue({ age: output?.age });
            
            form.setFieldsValue({ feature_1: (output?.features_array?.[0] != 'null') ? output?.features_array?.[0] : '' })
            form.setFieldsValue({ feature_2: (output?.features_array?.[1] != 'null') ? output?.features_array?.[1] : '' })
            form.setFieldsValue({ feature_3: (output?.features_array?.[2] != 'null') ? output?.features_array?.[2] : '' })
            form.setFieldsValue({ feature_4: (output?.features_array?.[3] != 'null') ? output?.features_array?.[3] : '' })
            form.setFieldsValue({ feature_5: (output?.features_array?.[4] != 'null') ? output?.features_array?.[4] : '' })
                
            form.setFieldsValue({ benefit_1: (output?.benefits_array?.[0] != 'null') ? output?.benefits_array?.[0] : '' })
            form.setFieldsValue({ benefit_2: (output?.benefits_array?.[1] != 'null') ? output?.benefits_array?.[1] : '' })
            form.setFieldsValue({ benefit_3: (output?.benefits_array?.[2] != 'null') ? output?.benefits_array?.[2] : '' })
            form.setFieldsValue({ benefit_4: (output?.benefits_array?.[3] != 'null') ? output?.benefits_array?.[3] : '' })
            form.setFieldsValue({ benefit_5: (output?.benefits_array?.[4] != 'null') ? output?.benefits_array?.[4] : '' })

            form.setFieldsValue({ about: output?.about });
            setImageList([output?.feature_image]);
            
            if (output?.booking_engine_id != 4) {
                setSelectedRadio(true);
                output?.locations_array.map((item, ind) => {
                    setSelectedLocation((prevValues) => ({
                        ...prevValues,
                        [`location${item}`]: true,
                    }));
                })
    
                setSelectedResource(output?.resources_array);
    
                setMultiBookCheck({"multiBook" : (output?.multiple_booking != 'undefined') ? output?.multiple_booking : ""  });
                form.setFieldsValue({ multiple_booking: output?.multiple_booking });
                form.setFieldsValue({ min_per_session: ( output?.min_per_session != 'null') ?  output?.min_per_session : ""  });
                form.setFieldsValue({ max_per_session: (output?.max_per_session != 'null') ? output?.max_per_session : ""  });
                
                if (output?.booking_engine_id == 2 ) {
                    form.setFieldsValue({ year: output?.subscription_period_array?.year });
                    form.setFieldsValue({ month: output?.subscription_period_array?.month });
                    form.setFieldsValue({ days: output?.subscription_period_array?.days });
                    setosPeriod({
                        year: output?.subscription_period_array?.year,  
                        month: output?.subscription_period_array?.month,
                        days: output?.subscription_period_array?.days
                    })
                }

                if (output?.booking_engine_id == 3 ) {
                    setSessionValues(output?.sessions_array);

                    // output?.locations_array.map((locId) => {
                    //     console.log("session loc ==>>", locId, `no_of_session${locId}`, output?.sessions_array?.[locId]?.no_of_sessions);
                    //     // form.setFieldsValue({ [`no_of_session${locId}`] : output?.sessions_array?.[locId]?.no_of_sessions || 7 });
                    // })
                }
    
                const selectLocationEdit = Object.keys(output?.slots_meta_array?.[0]);
                setSlotLocation({ "location_Id": selectLocationEdit[0] });
                // setAppliedLoc(location_Info?.location_Id)
                // setAppliedLocName(location_Info?.location_name)
    
                const finalObj = {};
                output?.locations_array.map((item, index) => {
    
                    setRadioValues((prevValues) => ({
                        ...prevValues,
                        [item]: (output?.service_end_time?.[index]?.[item]?.type == 'Custom') ? "custom_hrs" : "business_hrs",
                    }));
    
                    if(output?.service_end_time?.[index]?.[item]?.type == "Custom") {
                        const custStartTime = output?.service_end_time?.[index]?.[item]?.start_time
                        const custEndTime = output?.service_end_time?.[index]?.[item]?.end_time
    
                        form.setFieldsValue({ [`start_time_office${item}`]: dayjs(custStartTime, format) });
                        form.setFieldsValue({ [`end_time_office${item}`]: dayjs(custEndTime, format) });
    
                        setCustomTimeValues((prev) => {
                            return {...prev, [`start_time_office${item}`]: custStartTime, [`end_time_office${item}`]: custEndTime }
                        })
                    }
    
                    const selectDurationEdit = output?.slots_meta_array?.[index]?.[item]?.duration;
                    setSelectedDuration(prevState => ({
                        ...prevState,
                        [item]: {
                            duration: selectDurationEdit,
                        },
                    }));
        
                    const selectBufferEdit = output?.slots_meta_array?.[index]?.[item]?.buffer;
                    setSelectedBuffer(prevState => ({
                        ...prevState,
                        [item]: {
                            Buffer: selectBufferEdit,
                        },
                    }));
                    
                    if (output?.slots_meta_array?.[index]?.[item]?.exclude_slots) {
                        finalObj[item] = output?.slots_meta_array?.[index]?.[item]?.exclude_slots
                    }
                })
                setTempExSlot(finalObj);

                let reverseExcludeSlotData = []
                Object.entries(finalObj).forEach(([id, dates]) => {
                    Object.entries(dates).forEach(([date, keys]) => {
                        const entry = {};
                        entry[id] = { [date]: keys };
                        reverseExcludeSlotData.push(entry);
                    });
                })
                setSelectedArr(reverseExcludeSlotData);
    
                const fetchedStartDates = output?.slots_meta_array?.[0]?.[selectLocationEdit?.[0]]?.start_date;
                const fetchedEndDates = output?.slots_meta_array?.[0]?.[selectLocationEdit?.[0]]?.end_date;
    
                const fetchedDates = [dayjs(fetchedStartDates, dateFormat), dayjs(fetchedEndDates, dateFormat)]
                setDateRange(prevState => ({
                    ...prevState,
                    [selectLocationEdit[0]]: {
                        "selectedDates": fetchedDates,
                    },
                }));
                
                form.setFieldsValue({ date_range: fetchedDates });
                setDates(fetchedDates)
            }

            // ************* Packages ****************
            if (output?.booking_engine_id == 4 ) {
                const packLocationArr = output?.package_service_list.map(item => {
                    const locationId = item.location_id.toString();
                    return locationId;
                })
    
                packLocationArr.map((item, ind) => {
                    setSelectedLocation((prevValues) => ({
                        ...prevValues,
                        [`location${item}`]: true,
                    }));
                })
    
                setSlotLocation({ "location_Id": packLocationArr[0] });
                setpackageLockey(packLocationArr[0]);

                form.setFieldsValue({ year: output?.validity?.year });
                form.setFieldsValue({ month: output?.validity?.month });
                form.setFieldsValue({ days: output?.validity?.days });
                setosPeriod({
                    year: output?.validity?.year,  
                    month: output?.validity?.month,
                    days: output?.validity?.days
                })

                let required_data = {};
                output?.package_service_list.forEach(location => {
                    const locationId = location.location_id.toString();
                    required_data[locationId] = [];
                
                    location.services.forEach(service => {
                        const serviceId = service.service_id;
                        const count = service.count.toString();
                
                        required_data[locationId].push({
                            "service_id": serviceId,
                            "count": count
                        });
                    });
                });

                setPackagesIdCount(required_data)
            }

            if (radioValues && selectedDuration && selectedBuffer ) { 
                // handleCreateSlots(selectLocationEdit?.[0], "onLoad");
                setShowSlots(true);
            }
            form.setFieldsValue({ amount_without_tax: output?.amount_without_tax });
            form.setFieldsValue({ currency_name: output?.currency_name });
            if (output.booking_engine_id == 4) form.setFieldsValue({ package_discount: output?.package_discount });

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        form.setFieldsValue({ duration: selectedDuration?.[slotsLocation?.location_Id]?.duration || selectedDuration?.[prevLocation?.location_Id]?.duration });
        form.setFieldsValue({ buffer_time: selectedBuffer?.[slotsLocation?.location_Id]?.Buffer || selectedBuffer?.[prevLocation?.location_Id]?.Buffer });
        form.setFieldsValue({ date_range: dateRange?.[slotsLocation?.location_Id]?.selectedDates || dateRange?.[prevLocation?.location_Id]?.selectedDates });
        form.setFieldsValue({ exclude_days: excludedDays?.[slotsLocation?.location_Id] || excludedDays?.[prevLocation?.location_Id] })

        if (!selectedDuration?.[slotsLocation?.location_Id]?.duration) {

            setSelectedDuration(prevState => ({
                ...prevState,
                [slotsLocation?.location_Id]: {
                    duration: durationform,
                },
            }));

            setSelectedBuffer(prevState => ({
                ...prevState,
                [slotsLocation?.location_Id]: {
                    Buffer: bufferform,
                },
            }));

        }

        if (!dateRange?.[slotsLocation?.location_Id]?.selectedDates) {
            setDateRange(prevState => ({
                ...prevState,
                [slotsLocation?.location_Id]: {
                    selectedDates: dateRangeform,
                },
            }));
        }

        if (!excludedDays?.[slotsLocation?.location_Id]) {
            setExcludedDays(prevState => ({
                ...prevState,
                [slotsLocation?.location_Id]: excludeDaysform,
            }));
        }

    }, [slotsLocation]);

    useEffect(() => {
        if(selectedBuffer && selectedDuration && dateRange?.[slotsLocation?.location_Id] && 
            dateRange?.[slotsLocation?.location_Id]?.selectedDates && 
            dateRange?.[slotsLocation?.location_Id]?.selectedDates.length == 2
        ) {
            console.log("Running table UE")
            handleCreateSlots(slotsLocation?.location_Id, "onLoad");
        }
    }, [ radioValues, selectedBuffer, selectedDuration, dateRange, customTimeValues, slotsLocation ]);

    const handleosPeriodchange = (value, timelabel) => {
        if (timelabel === "year") {
            setosPeriod((prevValues) => ({
                ...prevValues,
                year: value,
            }));
        } else if (timelabel === "month") {
            setosPeriod((prevValues) => ({
                ...prevValues,
                month: value,
            }));
        } else if (timelabel === "day") {
            setosPeriod((prevValues) => ({
                ...prevValues,
                day: value,
            }));
        }
    };

    const handleSessionValuesChange = (value, sessionFlag, locationId) => {
        if (sessionFlag === "no_of_sessions") {
            setSessionValues((prevValues) => ({
                ...prevValues,
                [locationId]: {
                    ...prevValues[locationId],
                    no_of_sessions: value
                },
            }));
        }

        if (sessionFlag === "frequency_daily") {
            setSessionValues((prevValues) => ({
                ...prevValues,
                ...prevValues,
                frequency: 'daily',
                [locationId]: {
                    ...prevValues[locationId],
                    interval: value
                },
            }));
        }

        if (sessionFlag === "frequency_weekly") {
            setSessionValues((prevValues) => ({
                ...prevValues,
                ...prevValues,
                frequency: 'weekly',
                [locationId]: {
                    ...prevValues[locationId],
                    interval: value
                },
            }));
        }

        if (sessionFlag === "frequency_monthly") {
            setSessionValues((prevValues) => ({
                ...prevValues,
                ...prevValues,
                frequency: 'monthly',
                [locationId]: {
                    ...prevValues[locationId],
                    interval: value
                },
            }));
        }
    };

    const handleSessionradioValuesChange = (e, sessionFlag, locationId) => {
        const { value } = e.target;
        form.setFieldValue({ [`session_interval${locationId}`]: ""})
        if (sessionFlag === "session_interval") {

            if (value === "Daily") {
                setSessionValues((prevValues) => ({
                    ...prevValues,
                    [locationId]: {
                        ...prevValues[locationId],
                        session_interval: value
                    },
                }));

            } else if (value === "Weekly") {
                setSessionValues((prevValues) => ({
                    ...prevValues,
                    [locationId]: {
                        ...prevValues[locationId],
                        session_interval: value
                    },
                }));

            } else if (value === "Monthly") {
                setSessionValues((prevValues) => ({
                    ...prevValues,
                    [locationId]: {
                        ...prevValues[locationId],
                        session_interval: value
                    },
                }));

            }
        }
    };

    const onFinish = async (values) => {
        try {
            setIsLoading(true)
            values.token = userToken
            values.user_id = userId
            
            if (selectedEngine === "Choose_Packages") {
                values.package_name = values.service_name;
                values.service_name = null;
            } 

            Object.keys(values).forEach((key) => {
                if (values[key] === "" || values[key] === undefined) {
                    values[key] = null;
                }
            });

            const formData = new FormData();
            if (images && images.length > 0) { images.map((item, index) => {
                if (index === 0) {
                    formData.append("feature_image", item);
                }
                else {
                    formData.append(`gallary_${index}`, item);
                }
            })}
                else {
                    formData.append("feature_image", undefined);
                }
            

            formData.append("user_id", userId)
            Object.keys(values)?.forEach((item) => {
                formData.append(item, values[item]);
            })

            const bookId = (selectedEngine === 'Pay_go' ? 1
                : selectedEngine === "Open_subscription" ? 2
                    : selectedEngine === 'Close_Subscription' ? 3
                        : selectedEngine === 'Choose_Packages' ? 4
                            : null);

            formData.append("booking_engine_id", bookId);

            if (bookId !== 4 ) {

                formData.append("sessions_array", [JSON.stringify(sessionValues)]);
                formData.append("multiBooking", multiBookCheck?.multiBook);

                const tableDataObj = {
                    duration: selectedDuration,
                    buffer: selectedBuffer,
                    // start_date : dateRange?.[0],
                    // end_date : dateRange?.[1],
                    excluded_days: excludedDays,
                    exclude_slots: OffSlots[0],
                }

                let result = GenerateFormData(tableDataObj);

                // const ExcludedSlots = AddDatesOnExcludedShots(result[1]);
                formData.append("locations_array", result[0]);
                formData.append("meta_data_arr", [JSON.stringify(result[1])]);
                formData.append("resources_array", [JSON.stringify(selectedResource)]);
                formData.append("time_array", [JSON.stringify(result[3])]);

                values.multiBooking = multiBookCheck?.multiBook;
                values.resources_array = selectedResource;

                const response = await EditVendService(params?.serviceId, formData);
                // console.log("Response ==>>", response);

                if (response?.response?.status == 200) {
                    setIsLoading(false)
                    router.back()
                } else if (response?.response?.status == 400) {
                    setIsLoading(false)
                }
            } else {
                values.package_services_list = packagesIdCount;
                formData.append("package_services_list", [JSON.stringify(packagesIdCount)]);

                const response = await UpdateVendorPackageService(params?.serviceId, formData);
                if (response?.response?.status == 200) {
                    setIsLoading(false)
                }
            }    
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    };

    function getdaysDates(startDate, endDate, day) {
        day = day - 1
        const days = [];
        startDate = new Date(startDate)
        endDate = new Date(endDate)
        while (startDate <= endDate) {
            if (startDate.getDay() === day) { // Sunday has day index 0
                days.push(new Date(startDate));
            }
            startDate.setDate(startDate.getDate() + 1);
        }

        return days;
    }

    const ResetFormFields = () => {
        form.resetFields();
        setOffSlots([]);
        setSelectedEngine();
        setImageList([]);
        setImages([]);
        setMultiBookCheck({});
        setDateRange([]);
        setSlotLocation({});
        setSelectedRadio();
        setRadioValues({});
        setDataSource();
        setShowSlots(false);
        setSelectedItems([])
    }

    const GenerateFormData = (data) => {
        const locationNames = apiData?.locations?.map(location => location.location_name);

        const resourceObj = {};
        // for (const key in selectedResource) {
        //     const locationIndex = parseInt(selectedResource?.[key]?.replace('location', ''));
        //     const locationName = apiData?.locations.filter(loc => {
        //         if (loc.location_id === locationIndex) {
        //             return loc?.location_name
        //         }
        //     });
        //     resourceObj[key] = locationName?.[0]?.location_name;
        //     // }
        // }

        const locations_arr = []
        for (const location in selectedLocation) {
            if (selectedLocation[location] === true) {
                let locationId = parseInt(location.match(/\d+/)[0]); // Extract the index from the location name
                // const locationId= apiData?.locations[locationIndex].location_id
                locations_arr.push(locationId)
            }
        }

        const time_arr = locations_arr?.map((item, index) => {
            let key = item
            if (hasKey(customTimeValues, `start_time_office${item}`) && (radioValues[`${item}`] === `custom_hrs`)) {
                const timeObj = {}
                timeObj[key] = {
                    type: 'Custom',
                    start_time: customTimeValues?.[`start_time_office${item}`],
                    end_time: customTimeValues?.[`end_time_office${item}`],
                }
                return timeObj
            } else {
                const timeObj = {}
                timeObj[key] = {
                    type: 'Business',
                    start_time: form.getFieldValue(`start_time${item}`).format('HH:mm'),
                    end_time: form.getFieldValue(`end_time${item}`).format('HH:mm'),
                }
                return timeObj
            }
        })

        let extractedObjects = locations_arr.map((key, i) => {
            const tempObj = {};

            tempObj[key] = {
                duration: data?.duration?.[key]?.duration,
                buffer: data?.buffer?.[key]?.Buffer,
                start_date: dateRange?.[key]?.selectedDates?.[0],
                end_date: dateRange?.[key]?.selectedDates?.[1],
                excluded_days: excludedDays?.[key],
                exclude_slots: (tempExSlot?.[key]) ? tempExSlot?.[key] : null,
            }
            return tempObj

        });
        return [locations_arr, extractedObjects, resourceObj, time_arr]
    }

    function hasKey(obj, key) {
        return key in obj;
    }

    const handleSwitchChange = (dayKey, timeSlotKey, timeSlot, checked, location_Id, event) => {
        setToggleStatus({ "day": dayKey, "timeSlotKey": timeSlotKey })
        const Daydates = getdaysDates(dateRange?.[slotsLocation?.location_Id]?.selectedDates?.[0], dateRange?.[slotsLocation?.location_Id]?.selectedDates?.[1], dayKey);
        
        const resultArray = Daydates.map((itm, i) => {
            const dateObj = new Date(itm);
            const year = dateObj.getFullYear();
            const month = dateObj.toLocaleString('en-US', { month: 'short' });
            const day = String(dateObj.getDate()).padStart(2, '0');
            
            return `${month} ${day} ${year}`;
        });

        setDayExcludeDate(resultArray);
        
        setShowDayExcludeDate(true);

        // handleOffSlotsData(dayKey, timeSlot, checked, location_Id);

        const updatedDataSource = dataSource?.[location_Id].map((day) => {
            if (day?.key === dayKey) {
                const updatedTimeSlots = day.timeSlots.map((timeSlot) => {
                    if (timeSlot.key === timeSlotKey) {
                        return { ...timeSlot, status: !timeSlot.status };
                    }
                    return timeSlot;
                });
                return { ...day, timeSlots: updatedTimeSlots };
            }
            return day;
        });

        setDataSource({
            ...dataSource,
            [location_Id]: updatedDataSource
        });

        if (resultArray && tempExSlot) {
            const testingSeldata = CheckboxSelectedDates(resultArray, tempExSlot, timeSlotKey, location_Id, timeSlot)
            setTesting(testingSeldata);
        }

    };

    function CheckboxSelectedDates(datesArr, data, slotKey, location_Id, timeSlot) {
        const result = [];
        const filteredDates = datesArr.filter(date => {
            const currentDate = data?.[location_Id]?.[date];
            const temp = currentDate && currentDate.some(entry => entry.key === slotKey);
            return temp
        });

        const DataObj = {};
        filteredDates.forEach((item, index) => {
            const locationId = location_Id; // Assuming location_Id is defined elsewhere
            if (!DataObj[locationId]) {
                DataObj[locationId] = {};
            }
            DataObj[locationId][item] = [timeSlot];
        });

        return DataObj;
    }

    const handleAddTimeSlot = (dayKey) => {
        const updatedDataSource = dataSource?.[appliedLoc].map((day) => {
            if (day.key === dayKey) {
                const newTimeSlot = {
                    key: `${dayKey}-${day.timeSlots.length + 1}`,
                    startTime: "",
                    endTime: "",
                    status: false,
                };
                return { ...day, timeSlots: [...day.timeSlots, newTimeSlot] };
            }
            return day;
        });

        setDataSource({
            ...dataSource,
            [appliedLoc]: updatedDataSource
        });


    };

    const handleRemoveTimeSlot = (dayKey, timeSlotKey) => {
        const updatedDataSource = dataSource?.[appliedLoc].map((day) => {
            if (day.key === dayKey) {
                const updatedTimeSlots = day.timeSlots.filter(
                    (timeSlot) => timeSlot.key !== timeSlotKey
                );
                return { ...day, timeSlots: updatedTimeSlots };
            }
            return day;
        });
        // setDataSource(updatedDataSource);
        setDataSource({
            ...dataSource,
            [appliedLoc]: updatedDataSource
        });
    };

    const handleRemove = (item) => {
        setSelectedItems(selectedItems.filter((i) => i !== item));
    };

    const handleSelect = (value) => {
        setSelectedItems([...selectedItems, value]);
    };

    const handleExcludeDayRemove = (value, locationId) => {
        setExcludedDays(prevState => ({
            ...prevState,
            [locationId]: (prevState[locationId]).filter(day => day !== value),
        }));
    };

    const handleExcludeDaySelect = (value, location_Id) => {
        setExcludedDays(prevState => ({
            ...prevState,
            [location_Id]: [...(prevState[location_Id]) || [], value],
        }));
    };

    const handleRadioChange = (e, task, location_Id) => {
        const { value } = e.target;
        if (task === 'timing') {
            setRadioValues((prevValues) => ({
                ...prevValues,
                [location_Id]: value,
            }));
        } 
        
        if (task === 'resource') {
            setSelectedRadio((e.target.value === 'true') ? true : false);
            
            // Clear data on resource required 'No'
            if(e.target.value === 'false') {
                setSelectedResource({});
                setSlotLocation({})
                setDataSource();
                setShowSlots(false);
                setDateRange([]);
                setSelectedArr([]);
                setTesting({});
                setDateRange([]);
            }
        }
    };

    const beforeUpload = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const image = new Image();
                image.src = e.target.result;
                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                if (!isJpgOrPng) {
                    InfoModal({
                        type: 'error',
                        title: 'warning',
                        text: 'Image must be in JPEG or PNG format.',
                    })
                    return ''
                }
                image.onload = () => {
                    if (image.width >= 500) {
                        if (file.size / 1024 / 1024 < 2) {
                            setImageList([...imageList, e.target.result]);
                            setImages([...images, file]);
                            resolve(file);
                        } else {
                            InfoModal({
                                type: 'error',
                                title: 'warning',
                                text: 'Image size must be less than 2MB.',
                            })
                        }
                    } else {
                        InfoModal({
                            type: 'error',
                            title: 'warning',
                            text: 'Image must have a minimum width of 500px.',
                        })
                        reject();
                    }
                };
            };
            reader.readAsDataURL(file);
        });
    };

    const handleRemoveImage = (index) => {
        const updatedImageList = [...imageList];
        const updatedImages = [...images];

        updatedImageList.splice(index, 1);
        updatedImages.splice(index, 1);

        setImageList(updatedImageList);
        setImages(updatedImages);
    };

    var isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
    dayjs.extend(isSameOrBefore)

    var isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
    dayjs.extend(isSameOrAfter)


    const validateStartTime = (index, value) => {
        const StartTimeBus = form.getFieldValue(`start_time${index}`);
        const EndTimeBus = form.getFieldValue(`end_time${index}`);

        if (EndTimeBus && value && dayjs(value).isSameOrAfter(dayjs(EndTimeBus))) {
            return Promise.reject('Start time must be before end time');
        }

        if (StartTimeBus && value && dayjs(value).isBefore(dayjs(StartTimeBus))) {
            return Promise.reject('Start time must be same or after business start time');
        }

        return Promise.resolve();
    };

    const validateEndTime = (index, value) => {
        const StartTimeOffice = form.getFieldValue(`start_time_office${index}`);
        const EndTimeBus = form.getFieldValue(`end_time${index}`);

        if (EndTimeBus && value && dayjs(value).isAfter(dayjs(EndTimeBus.add(1, 'second')))) {
            return Promise.reject('Custom End time must be same or before Business End time');
        }

        if (EndTimeBus && value && dayjs(value).isBefore(dayjs(StartTimeOffice))) {
            return Promise.reject('Custom End time must be After start time');
        }

        return Promise.resolve();
    };

    const handleMultiBookCheckbox = (e, name) => {
        const { checked } = e.target;
        setMultiBookCheck({ [name]: checked });
        if (checked == false) {
            form.setFieldsValue({ min_per_session: "" });
            form.setFieldsValue({ max_per_session: "" });
        }
    };

    const handleSwitchTable = (location_Info) => {
        setPrevLocation(slotsLocation)
        setSlotLocation(location_Info)
        setAppliedLoc(location_Info?.location_Id)
        setAppliedLocName(location_Info?.location_name)

        if (dataSource) {
            if (dataSource?.[location_Info?.location_Id]) {
                setShowSlots(true);
            }
            else {
                setShowSlots(false);
            }
        }
    }

    const handleCheckboxChange = (e) => {
        setSelectedEngine(e.target?.value);
        // Clear Data on book engine change
        setMultiBookCheck({});
        setRadioValues({});
        setDataSource();
        setShowSlots(false);
        setSelectedItems([]);
        setosPeriod({});
        setSelectedDuration();
        setSelectedBuffer();
        setSlotLocation({});
        setRadioValues({});
        setSelectedLocation({});
        setSelectedResource({});
        setCustomTimeValues({});
        setPackagesIdCount({});
        setSelectedArr([]);
        setTesting({});
        setDateRange([]);
        setSessionValues({});
        form.setFieldsValue({ min_per_session: "" });
        form.setFieldsValue({ max_per_session: "" });
        form.setFieldsValue({ package_discount: "" });
        form.setFieldsValue({ year: "" });
        form.setFieldsValue({ month: "" });
        form.setFieldsValue({ days: "" });
    };

    const handleDurationChange = (value, location_Id) => {
        setSelectedDuration(prevState => ({
            ...prevState,
            [location_Id]: {
                duration: value,
            },
        }));

        // reset Table on change
        if(selectedArr.length > 0 && selectedArr.some(obj => Object.keys(obj).includes(location_Id.toString())) ) {
            delete tempExSlot[location_Id];
            setTesting({});
            setSelectedArr(selectedArr.filter((item) => {
                let key = Object.keys(item)[0]; 
                return key !== location_Id.toString(); 
            }));
        }
    }

    const handleBufferChange = (value, location_Id) => {
        setSelectedBuffer(prevState => ({
            ...prevState,
            [location_Id]: {
                Buffer: value,
            },
        }));

        // reset Table on change
        if(selectedArr.length > 0 && selectedArr.some(obj => Object.keys(obj).includes(location_Id.toString()))) {
            delete tempExSlot[location_Id];
            setTesting({});
            setSelectedArr(selectedArr.filter((item) => {
                let key = Object.keys(item)[0]; 
                return key !== location_Id.toString(); 
            }));
        }
    }

    const handleDateChange = (dates, location_Id) => {
        setDateRange(prevState => ({
            ...prevState,
            [location_Id]: {
                selectedDates: dates,
            },
        }));
        setValue(dates);

        setDaysRange(getDaysOfWeekBetweenDates(dates?.[0], dates?.[1]))

        // reset Table on change
        if(selectedArr.length > 0 && selectedArr.some(obj => Object.keys(obj).includes(location_Id.toString()))) {
            console.log("Clear Tab dat");
            delete tempExSlot[location_Id];
            setTesting({});
            setSelectedArr(selectedArr.filter((item) => {
                let key = Object.keys(item)[0]; 
                return key !== location_Id.toString(); 
            }));
        }

    };

    const handleCheckboxResource = (resId, locId) => {
        setSelectedResource(prevValues => {
            const updatedValues = { ...prevValues };
            if (!updatedValues[locId]) {
                updatedValues[locId] = [];
            }

            const index = updatedValues[locId].indexOf(resId);
            if (index !== -1) {
                updatedValues[locId].splice(index, 1);
            } else {
                updatedValues[locId].push(resId);
            }
            
            return { ...updatedValues };
        });
    }

    const handleLocationChange = (e, location_Id) => {
        const { checked, value } = e.target
        let name = `location${location_Id}`;

        setSelectedLocation((prevValues) => ({
            ...prevValues,
            [name]: checked,
        }));

        // CLear fields on location unChecked
        if (!checked) {
            Object.keys(selectedResource).forEach(key => {
                selectedResource[key] = selectedResource[key].filter(id => id !== location_Id);
            });

            delete radioValues?.[location_Id]

            const keysToDelete = [`start_time_office${location_Id}`, `end_time_office${location_Id}`];
            form.setFieldsValue({ [keysToDelete?.[0]]: "" });
            form.setFieldsValue({ [keysToDelete?.[1]]: "" });
            
            
            keysToDelete.forEach(key => {
                if (customTimeValues.hasOwnProperty(key)) {
                    delete customTimeValues[key];
                }
            });
            
            // setCustomTimeValues(delete customTimeValues?.[location_Id]);
            setAppliedLoc(location_Id);
            delete selectedDuration?.[location_Id];
            delete selectedBuffer?.[location_Id];
            delete dateRange?.[location_Id];
            setExcludedDays(delete excludedDays?.[location_Id]);
            delete tempExSlot[location_Id];
            setTesting({});
            setSelectedArr(selectedArr.filter((item) => {
                let key = Object.keys(item)[0]; // Get the key of the current object
                return key !== location_Id.toString(); // Keep objects where the key is not equal to locationId
            }));
        }
    }

    const { RangePicker } = DatePicker;


    const disabledDate = (current) => {
        if (!dates) {
            return false;
        }
        const tooLate = dates[0] && current.diff(dates[0], 'days') >= 90;
        const tooEarly = dates[1] && dates[1].diff(current, 'days') >= 90;
        return !!tooEarly || !!tooLate || (current && current < dayjs().endOf('day'));
    };

    const onOpenChange = (open) => {
        if (open) {
            setDates([null, null]);
        } else {
            setDates(null);
        }
    };

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const handleCreateSlots = async (location_Id, type) => {
        if (type == 'Click') {
            setTempExSlot(delete tempExSlot[location_Id]);
            setTesting({});
            setSelectedArr(selectedArr.filter((item) => {
                let key = Object.keys(item)[0]; // Get the key of the current object
                return key !== location_Id.toString(); // Keep objects where the key is not equal to locationId
            }));
        }

        if (radioValues?.[location_Id] == 'custom_hrs') {
            const startTime = customTimeValues?.[`start_time_office${location_Id}`];
            const endTime = customTimeValues?.[`end_time_office${location_Id}`];
            const slotDuration = selectedDuration[location_Id]?.duration;
            const buffer = selectedBuffer[location_Id]?.Buffer;
        
            let SlotsData;
            if (startTime && endTime && slotDuration && buffer ) { 
                console.log("Run 2 Cus Table");
                SlotsData = createSlots(startTime, endTime, slotDuration, buffer) ;
                setShowSlots(true);
            }

            const SlotsObj = daysRange.map((item, index) => {
                if (!excludedDays?.[slotsLocation?.location_Id]?.includes(daysOfWeek[item])) {
                    return (
                        {
                            key: (item + 1).toString(),
                            day: daysOfWeek[item],
                            timeSlots: SlotsData,
                        })
                }
            });

            const slotobj = removeUndefinedValuesFromObject(SlotsObj)
            setDataSource({
                ...dataSource,
                [slotsLocation?.location_Id]: slotobj
            });
            setAppliedLoc(slotsLocation.location_Id)
        } else {
            const startTime = apiData?.locations?.[(slotsLocation?.location_index) ? slotsLocation?.location_index : 0]?.start_time;
            const endTime = apiData?.locations?.[(slotsLocation?.location_index) ? slotsLocation?.location_index : 0]?.end_time;
            const slotDuration = selectedDuration?.[slotsLocation?.location_Id]?.duration;
            const buffer = selectedBuffer?.[slotsLocation?.location_Id]?.Buffer;
            
            let SlotsData; 
            if (startTime, endTime, slotDuration, buffer) {
                console.log("Run 2 Buss Table");
                SlotsData = createSlots(startTime, endTime, slotDuration, buffer);
                setShowSlots(true);
            } 

            const SlotsObj = daysRange.map((item, index) => {
                if (!excludedDays?.[slotsLocation?.location_Id]?.includes(daysOfWeek[item])) {
                    return (
                        {
                            key: (item + 1).toString(),
                            day: daysOfWeek[item],
                            timeSlots: SlotsData,
                        })
                }
            });

            const slotobj = removeUndefinedValuesFromObject(SlotsObj)

            setDataSource({
                ...dataSource,
                [slotsLocation?.location_Id]: slotobj
            });

            setAppliedLoc(slotsLocation?.location_Id)
        }

    }

    const createSlots = (startTimeStr, endTimeStr, slotDuration, buffer) => {
        const startTime = new Date(`2023-09-04T${startTimeStr}`);
        const endTime = new Date(`2023-09-04T${endTimeStr}`);
        const nextDate = new Date(`2023-09-05T${'00:00'}`);
        const slots = [];
        console.log("Run 3 Table -->>", startTimeStr, endTimeStr, slotDuration, buffer);

        const endtimeMargin = 10;
        const endSlotlimit = endTime;
        endSlotlimit.setMinutes(endTime.getMinutes() + endtimeMargin);

        let currentTime = new Date(startTime);
        let counter = 0;
        while (currentTime < endTime && currentTime - endTime <= 0) {
            const slotStart = currentTime.toTimeString().slice(0, 5);

            const slotEnd = new Date(currentTime);
            slotEnd.setMinutes(currentTime.getMinutes() + slotDuration);
            const slotEndTime = slotEnd.toTimeString().slice(0, 5);

            if (slotEnd > endSlotlimit) { break; }

            // if (currentTime >= nextDate) { break; }

            slots.push({
                key: counter,
                startTime: slotStart,
                endTime: slotEndTime,
            });

            // Add buffer time to the start time
            currentTime = new Date(slotEnd);
            currentTime.setMinutes(currentTime.getMinutes() + buffer);
            
            counter++;
        }

        return slots;
    };

    const handleTimeChange = (type, time) => {
        setCustomTimeValues({
            ...customTimeValues,
            [type]: time.format('HH:mm')
        });
    };

    const handlepackagelocationSwitch = (location_Info) => {
        setSlotLocation(location_Info)
        let locIdkey = location_Info?.location_Id
        setpackageLockey(locIdkey)
    }

    const checkSwitchStatus = (locationId, timeCheckKey, dateKeys, selectedExDates, dayKey) => {

        const mydates = getAllDatesOfDay(dateRange?.[slotsLocation?.location_Id]?.selectedDates?.[0], dateRange?.[slotsLocation?.location_Id]?.selectedDates?.[1], dayKey);

        if (toggleStatus?.day == dayKey) {

            for (const date of mydates) {
                if (selectedExDates?.[locationId]?.[date]) {
                    const entries = selectedExDates[locationId]?.[date];

                    const found = entries.some(entry => entry?.key === timeCheckKey);
                    if (found) {
                        return false;
                    }

                }
            }
            return true;
        } else {
            for (const date of mydates) {
                if (selectedExDates?.[locationId]?.[date]) {
                    const entries = selectedExDates[locationId]?.[date];

                    const found = entries.some(entry => entry?.key === timeCheckKey);
                    if (found) {
                        return false;
                    }
                }
            }
            return true;
        }
    };

    const getAllDatesOfDay = (startDate, endDate, dayKey) => {
        const Daydates = getdaysDates(startDate, endDate, dayKey);

        const resultArray = Daydates.map((itm, i) => {
            const dateObj = new Date(itm);
            const year = dateObj.getFullYear();
            const month = dateObj.toLocaleString('en-US', { month: 'short' });
            const day = String(dateObj.getDate()).padStart(2, '0');
            
            return `${month} ${day} ${year}`;
        });

        return resultArray
    }


    return (
        <Fragment>
            <Row>
                <Spin style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} spinning={isLoading}>
                    <Col span={24}>
                        <CustomTitle>
                            Update a Service
                        </CustomTitle>
                        <CustomForm
                            name="basic"
                            form={form}
                            onFinish={onFinish}
                            autoComplete="off"
                            style={{ width: '100%', marginTop: '10px', ppadding: "0 15px" }}
                        >
                            <CustomVendorRow>
                                <Col span={9} style={{ maxWidth: '100%' }}>
                                    <CustVendFormTxt>{ (selectedEngine != "Choose_Packages" ) ? "Service Name" : 'Package Name'} </CustVendFormTxt>
                                    <Form.Item
                                        name={"service_name"}
                                        style={{ width: '100%' }}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter service name',
                                            },
                                        ]}
                                    >
                                        <Input placeholder='Your service name' />
                                    </Form.Item>
                                </Col>
                            </CustomVendorRow>

                            <CustomVendorRow gutter={[24, 24]} style={{ display: 'flex' }}>
                                <Col span={7} style={{ maxWidth: '100%' }}>
                                    <CustVendFormTxt>Industry</CustVendFormTxt>
                                    <Form.Item
                                        name="industry"
                                        style={{ width: '100%' }}
                                    >
                                        <Input placeholder="Your Industry" disabled={true} />
                                    </Form.Item>
                                </Col>

                                <Col span={7} style={{ maxWidth: '100%' }}>
                                    <CustVendFormTxt>Category</CustVendFormTxt>
                                    <Form.Item
                                        name="category"
                                        style={{ width: '100%' }}
                                        rules={[
                                        ]}
                                    >
                                        <Input placeholder="Your Category" disabled={true} />
                                    </Form.Item>
                                </Col>
                            </CustomVendorRow>

                            {/* --------------------- Labels ---------------------- */}
                            <CustomVendorFormRow>
                                <Col span={12} style={{ maxWidth: '100%' }}>
                                    <CustVendFormTxt>Add labels</CustVendFormTxt>
                                    <Form.Item
                                        name="label"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter labels',
                                            },
                                        ]}
                                    >
                                        <Select
                                            mode="multiple"
                                            placeholder="Insert or remove items"
                                            onSelect={handleSelect}
                                            onDeselect={handleRemove}
                                            style={{
                                                width: "100%"
                                            }}
                                        >
                                            {allLabelDetails?.map((item) => (
                                                <Select.Option key={item} value={item}>
                                                    {item}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                                        {selectedItems.map((item) => (
                                            <Tag
                                                key={item}
                                                closable
                                                onClose={() => handleRemove(item)}
                                                style={{ margin: "5px" }}
                                            >
                                                {item}
                                            </Tag>
                                        ))}
                                    </div>
                                </Col>
                            </CustomVendorFormRow>

                            {/* --------------------- Choose a Booking engine ---------------------- */}
                            <Form.Item
                                name="radio_button"
                                rules={[{ required: true, message: 'Please pick a Booking Engine Type for this Service!' }]}
                            >
                                <Radio.Group onChange={handleCheckboxChange} value={selectedEngine}>
                                    <StyledRow style={{ padding: '0 8px' }}>
                                        <CustomGreyText>Choose a Booking engine</CustomGreyText>

                                        <CustomCol style={{ display: 'flex' }} span={24}>
                                            <BoxRow style={{ width: '100%', padding: '15px', gap: '20px' }}>
                                                <BoxCol span={12} style={{ height: '130px', maxWidth: '48%', border: '1px solid #F2F1F0', padding: "12px", opacity: 0.5 }}>
                                                    <CustomText>Pay & go</CustomText> <br />
                                                    <CustomSmText>Best for</CustomSmText>
                                                    <StyledHr style={{ margin: '4px 0' }} />
                                                    <Row style={{ color: '#ED510C' }}>Learn more</Row>
                                                    <CustomCardButton onClick={() => handleCheckboxChange('Pay_go')} disabled={true}>
                                                        <Radio
                                                            value="Pay_go"
                                                            style={{ marginRight: '5px' }}
                                                        > Choose Pay & go
                                                        </Radio>

                                                    </CustomCardButton>
                                                </BoxCol>

                                                <BoxCol span={12} style={{ height: '130px', maxWidth: '48%', border: '1px solid #F2F1F0', padding: "12px", opacity: 0.5 }}>
                                                    <CustomText>Open subscription</CustomText> <br />
                                                    <CustomSmText>Best for</CustomSmText>
                                                    <StyledHr style={{ margin: '4px 0' }} />
                                                    <Row style={{ color: '#ED510C' }}>Learn more</Row>
                                                    <CustomCardButton onClick={() => handleCheckboxChange('Open_subscription')} disabled={true} >
                                                        <Radio
                                                            value="Open_subscription"
                                                            style={{ marginRight: '5px' }}
                                                        > Choose Open subscription
                                                        </Radio>

                                                    </CustomCardButton>
                                                </BoxCol>
                                            </BoxRow>
                                        </CustomCol>

                                        <CustomCol style={{ display: 'flex' }} span={24}>
                                            <BoxRow style={{ width: '100%', padding: '15px', gap: '20px' }}>
                                                <BoxCol span={12} style={{ height: '130px', maxWidth: '48%', border: '1px solid #F2F1F0', padding: "12px", opacity: 0.5 }}>
                                                    <CustomText>Close Subscription (Non recurring)</CustomText> <br />
                                                    <CustomSmText>Best for</CustomSmText>
                                                    <StyledHr style={{ margin: '4px 0' }} />
                                                    <Row style={{ color: '#ED510C' }}>Learn more</Row>
                                                    <CustomCardButton onClick={() => handleCheckboxChange('Close_Subscription')} disabled={true}>
                                                        <Radio
                                                            value="Close_Subscription"
                                                            style={{ marginRight: '5px' }}> Choose Close Subscription

                                                        </Radio>

                                                    </CustomCardButton>
                                                </BoxCol>

                                                <BoxCol span={12} style={{ height:'130px', maxWidth: '100%', border:'1px solid #F2F1F0', padding:"12px", opacity: 0.5 }}>
                                                    <CustomText>Packages</CustomText> <br/>
                                                    <CustomSmText>Best for</CustomSmText>
                                                    <StyledHr style={{ margin:'4px 0' }} />
                                                    <Row style={{ color: '#ED510C'}}>Learn more</Row>
                                                    <CustomCardButton onClick={() => handleCheckboxChange('Choose_Packages')} disabled={true} >
                                                        <Radio
                                                            value="Choose_Packages"
                                                            style={{ marginRight:'5px'}}> Choose Packages
                                                        </Radio>
                                                    </CustomCardButton>
                                                </BoxCol>
                                                    </BoxRow>
                                        </CustomCol>
                                    </StyledRow>  
                                    
                                </Radio.Group>
                            </Form.Item>

                            {selectedEngine && (
                                <>
                                    {/* --------------------- Service Specifications ---------------------- */}
                                    <StyledRow style={{ padding: '0 15px', margin: '20px 0 ' }}>
                                        <CustomGreyText>{ (selectedEngine != "Choose_Packages" ) ? "Service Specifications" : 'Features'}</CustomGreyText>
                                        <CustomCol span={24} style={{ display: 'flex', columnCount: 2, gap: '25px' }} >
                                        { (selectedEngine != "Choose_Packages" ) && 
                                            <>
                                                    <Col>
                                                        <CustVendFormTxt>Gender</CustVendFormTxt>
                                                        <Form.Item
                                                            name="gender"
                                                            style={{ width: '100%', maxWidth: '190px' }}
                                                            rules={[{ required: true, message: 'Please select your gender' }]}
                                                        >
                                                            <Select placeholder="Select gender">
                                                                <Option value="all">All</Option>
                                                                <Option value="male">Male</Option>
                                                                <Option value="female">Female</Option>
                                                                <Option value="other">Other</Option>
                                                                <Option value="none">none</Option>
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>

                                                    <Col>
                                                        <CustVendFormTxt>Age</CustVendFormTxt>
                                                        <Form.Item
                                                            name="age"
                                                            style={{ width: '100%', maxWidth: '190px' }}
                                                            rules={[{ required: true, message: 'Please select your Age' }]}
                                                        >
                                                            <Select placeholder="Select age">
                                                                <Option value="0-2">0-2</Option>
                                                                <Option value="4-11">4-11</Option>
                                                                <Option value="12-18">12-18</Option>
                                                                <Option value="Below 18">Below 18</Option>
                                                                <Option value="Above 18">Above 18</Option>
                                                                <Option value="19-29">19-29</Option>
                                                                <Option value="30-44">30-44</Option>
                                                                <Option value="45-64">45-64</Option>
                                                                <Option value="65 & above">65 & above</Option>
                                                                <Option value="all">All</Option>
                                                                <Option value="none">None</Option>
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                            </>
                                        }
                                        </CustomCol>

                                        <StyledTitleText>{ (selectedEngine != "Choose_Packages" ) ? "Add product features" : "Add package features"}</StyledTitleText>
                                        <CustomCol span={24} style={{ display: 'flex', gap: '25px' }} >
                                            <Col style={{ maxWidth: '45%' }}>
                                                <CustVendFormTxt>Feature 1</CustVendFormTxt>
                                                <Form.Item
                                                    name="feature_1"
                                                    style={{ width: '100%', marginBottom: '0px' }}
                                                    rules={[{ required: true, message: 'Please enter your features' }]}
                                                >
                                                    <Input placeholder={'your features'} />
                                                </Form.Item>
                                            </Col>

                                            <Col style={{ maxWidth: '45%' }}>
                                                <CustVendFormTxt>Feature 2</CustVendFormTxt>
                                                <Form.Item
                                                    name="feature_2"
                                                    style={{ width: '100%', marginBottom: '0px' }}
                                                >
                                                    <Input placeholder={'your features'} />
                                                </Form.Item>
                                            </Col>

                                            <Col style={{ maxWidth: '45%' }}>
                                                <CustVendFormTxt>Feature 3</CustVendFormTxt>
                                                <Form.Item
                                                    name="feature_3"
                                                    style={{ width: '100%', marginBottom: '0px' }}
                                                >
                                                    <Input placeholder={'your features'} />
                                                </Form.Item>
                                            </Col>

                                            <Col style={{ maxWidth: '45%' }}>
                                                <CustVendFormTxt>Feature 4</CustVendFormTxt>
                                                <Form.Item
                                                    name="feature_4"
                                                    style={{ width: '100%', marginBottom: '0px' }}
                                                >
                                                    <Input placeholder={'your features'} />
                                                </Form.Item>
                                            </Col>

                                            <Col>
                                                <CustVendFormTxt>feature 5</CustVendFormTxt>
                                                <Form.Item
                                                    name="feature_5"
                                                    style={{ width: '100%' }}
                                                >
                                                    <Input placeholder={'your features'} />
                                                </Form.Item>
                                            </Col>
                                        </CustomCol>

                                        <StyledTitleText>{ (selectedEngine != "Choose_Packages" ) ? "Add product Benefits" : 'Add package benefits'}</StyledTitleText>
                                        <CustomCol span={24} style={{ display: 'flex', gap: '25px' }} >
                                            <Col style={{ maxWidth: '45%' }}>
                                                <CustVendFormTxt>Benefit 1</CustVendFormTxt>
                                                <Form.Item
                                                    name="benefit_1"
                                                    style={{ width: '100%', marginBottom: '0px' }}
                                                    rules={[{ required: true, message: 'Please enter your features' }]}
                                                >
                                                    <Input placeholder={'your features'} />
                                                </Form.Item>
                                            </Col>

                                            <Col style={{ maxWidth: '45%' }}>
                                                <CustVendFormTxt>Benefit 2</CustVendFormTxt>
                                                <Form.Item
                                                    name="benefit_2"
                                                    style={{ width: '100%', marginBottom: '0px' }}
                                                >
                                                    <Input placeholder={'your features'} />
                                                </Form.Item>
                                            </Col>

                                            <Col style={{ maxWidth: '45%' }}>
                                                <CustVendFormTxt>Benefit 3</CustVendFormTxt>
                                                <Form.Item
                                                    name="benefit_3"
                                                    style={{ width: '100%', marginBottom: '0px' }}
                                                >
                                                    <Input placeholder={'your features'} />
                                                </Form.Item>
                                            </Col>

                                            <Col style={{ maxWidth: '45%' }}>
                                                <CustVendFormTxt>Benefit 4</CustVendFormTxt>
                                                <Form.Item
                                                    name="benefit_4"
                                                    style={{ width: '100%', marginBottom: '0px' }}
                                                >
                                                    <Input placeholder={'your features'} />
                                                </Form.Item>
                                            </Col>

                                            <Col>
                                                <CustVendFormTxt>Benefit 5</CustVendFormTxt>
                                                <Form.Item
                                                    name="benefit_5"
                                                    style={{ width: '100%' }}
                                                >
                                                    <Input placeholder={'your features'} />
                                                </Form.Item>
                                            </Col>
                                        </CustomCol>

                                        <CustVendFormTxt>{ (selectedEngine != "Choose_Packages" ) ? "About the service" : 'About the Package'}</CustVendFormTxt>
                                        <CustomCol span={24} style={{ display: 'flex' }} >
                                            <Form.Item
                                                name={'about'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'business info required',
                                                    }
                                                ]}
                                                style={{ width: '100%' }}
                                            >
                                                <Input.TextArea
                                                    allowClear
                                                    maxLength={150}
                                                    style={{ width: '100%', height: '100px' }}
                                                    placeholder="Enter about here..."
                                                    autoSize={{ minRows: 2, maxRows: 6 }}
                                                />
                                            </Form.Item>
                                        </CustomCol>
                                    </StyledRow>

                                    {/*     --------------------- Service picture ---------------------- */}
                                    <CustomGreyText> { (selectedEngine != "Choose_Packages" ) ? "Service picture" : 'Upload Package picture'}</CustomGreyText>
                                    <StyledRow style={{ display: 'flex', padding: '0 15px', margin: '20px 0', width: '100%' }}>
                                        <Form.Item
                                            name="image"
                                            // rules={[
                                            // ]}
                                            style={{ width: '100%' }}
                                        >
                                            <Row style={{ display: 'flex', padding: '8px' }}>
                                                <Upload
                                                    multiple
                                                    name="avatar"
                                                    listType="picture-card"
                                                    className="avatar-uploader"
                                                    beforeUpload={beforeUpload}
                                                    showUploadList={false}
                                                    style={{ width: 'auto' }}
                                                >
                                                    <CameraOutlined style={{ fontSize: '40px', lineHeight: '60px' }} />
                                                </Upload>
                                                <CustomCol style={{ paddingLeft: '8px' }}>
                                                    <CustCamIconTxt>Min. resolution is 500px 500px </CustCamIconTxt> <br />
                                                    <CustCamIconTxt>file format must be .jpg or .png</CustCamIconTxt> <br />
                                                    <CustCamIconTxt>Max. file size 2 Mb</CustCamIconTxt> <br />
                                                </CustomCol>

                                                <CustomCol style={{ display: 'flex', alignItems: 'center', paddingLeft: '10px' }}>
                                                    <Form.Item
                                                        name="image"
                                                        // rules={[
                                                        //     { required: true, message: 'Feature image required' }
                                                        // ]}
                                                    >
                                                        <Upload
                                                            multiple
                                                            beforeUpload={beforeUpload}
                                                            showUploadList={false}
                                                        >
                                                            <CustomUploadButton icon={<UploadOutlined />} style={{ background: '#F2F1F0', color: '#ED510C' }} >Upload</CustomUploadButton>
                                                        </Upload>
                                                    </Form.Item>
                                                </CustomCol>
                                            </Row>
                                        </Form.Item>

                                        <Row style={{ width: '100%' }}>
                                            {imageList?.map((imageUrl, index) => (
                                                <Col key={index} style={{ height: '200px', width: '200px', margin: '10px', position: 'relative' }}>
                                                    <img src={imageUrl} alt={`Preview ${index}`} style={{ maxWidth: '100%', height: '100%', objectFit: 'cover' }} />
                                                    <button
                                                        className="remove-button"
                                                        onClick={() => handleRemoveImage(index)}
                                                        style={{ position: 'absolute', top: '5px', right: '5px', background: 'none', border: 'none' }}
                                                    >
                                                        <CloseOutlined style={{ fontSize: '18px', color: 'red' }} />
                                                    </button>
                                                </Col>
                                            ))}
                                        </Row>
                                    </StyledRow>

                                    {/*     --------------------- Booking Engine Open Subscription Period -----(Hitesh)----------------- */}
                                    {selectedEngine === "Open_subscription" && imageList.length > 0 &&
                                        <>
                                            <CustomGreyText> Booking Engine Open Subscription Specific </CustomGreyText>
                                            <StyledRow style={{ display: "flex", padding: "0 15px", margin: "20px 0", width: "100%", }} >
                                                <StyledText style={{ color: "#72959A", width: "100%" }}>
                                                    Subscription Period
                                                </StyledText>

                                                <CustomCol span={12} style={{ display: "flex", padding: "15px 0" }}>
                                                    <Col span={5}>
                                                        <CustVendFormTxt>Year</CustVendFormTxt>
                                                        <Form.Item
                                                            name="year"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message:
                                                                        "Please select number of year for Subscription of this service!",
                                                                },
                                                            ]}
                                                        >
                                                            <Select
                                                                value={osPeriod?.year || ''}
                                                                onChange={(e) => handleosPeriodchange(e, "year")}
                                                                placeholder="Select year"
                                                            >
                                                                <Option value="">Select Year</Option>
                                                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((time) => (
                                                                    <Option key={time} value={time}>
                                                                        {time}
                                                                    </Option>
                                                                ))}
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>

                                                    <Col span={5} style={{ marginLeft: "15px" }}>
                                                        <CustVendFormTxt>Month</CustVendFormTxt>
                                                        <Form.Item
                                                            name="month"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message:
                                                                        "Please select number of months for Subscription of this service!",
                                                                },
                                                            ]}
                                                        >
                                                            <Select
                                                                value={osPeriod?.month || ''}
                                                                onChange={(e) => handleosPeriodchange(e, "month")}
                                                                placeholder="Select month"
                                                            >
                                                                <Option value="">Select Month</Option>
                                                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((time) => (
                                                                    <Option key={time} value={time}>
                                                                        {time}
                                                                    </Option>
                                                                ))}
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>

                                                    <Col span={5} style={{ marginLeft: "15px" }}>
                                                        <CustVendFormTxt>Days</CustVendFormTxt>
                                                        <Form.Item
                                                            name="days"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message:
                                                                        "Please select number of days for Subscription of this service!",
                                                                },
                                                            ]}
                                                        >
                                                            <Select
                                                                value={osPeriod?.day || ''}
                                                                onChange={(e) => handleosPeriodchange(e, "day")}
                                                                placeholder="Select month"
                                                            >
                                                                <Option value="">Select Days</Option>
                                                                {[
                                                                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9
                                                                ].map((time) => (
                                                                    <Option key={time} value={time}>
                                                                        {time}
                                                                    </Option>
                                                                ))}
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                </CustomCol>
                                            </StyledRow>
                                        </>
                                    }

                                    {/*     --------------------- Assign location and resource ---------------------- */}

                                    {selectedEngine === "Choose_Packages" && imageList.length > 0 &&
                                        <>
                                            <StyledRow style={{ padding: '0 15px', margin: '20px 0' }}>
                                                <Col span={24}>
                                                    <StyledRow style={{ width:'100%', padding: '10px 12px', margin: '15px 0', background: '#F2F1F0', border:'1px solid #72959A', borderRadius:'8px' }}>
                                                        <CustomGreyText style={{ width: '100%' }}>Add Packages for</CustomGreyText>
                                                        <Fragment>
                                                            <Row style={{width:'100%', display:'flex', gap:'1rem', margin:'1rem 0'}}>
                                                                <Col span={24}>
                                                                    {apiData?.locations?.map((item, index) => {
                                                                        return (
                                                                            <>
                                                                                <Button
                                                                                    onClick={() => handlepackagelocationSwitch({ "location_index": index, "location_Id": item?.location_id })}
                                                                                    style={{ color: (slotsLocation?.location_Id == item?.location_id) ? "#ED510C" : "#A4A4A4", height: "28px", width: "auto", padding: '0 12px', }}
                                                                                    disabled={(selectedLocation[`location${index}`] === true) ? true : false}
                                                                                >
                                                                                    {item?.location_name}
                                                                                </Button>
                                                                            </>
                                                                        )
                                                                    })}
                                                                </Col>
                                                            </Row>

                                                            {typeof slotsLocation?.location_Id != 'undefined' &&
                                                                <>
                                                                    <Row>
                                                                        <Col span={24}>
                                                                            <CustomGreyText style={{ width: '100%' }}>Add Services in this package</CustomGreyText>
                                                                        </Col>
                                                                        <Col span={24}>
                                                                            <Row>
                                                                                {
                                                                                    apiData?.services[packageLockey]?.map((item, key) => {
                                                                                    return (
                                                                                        <>
                                                                                            <Col span={6} style={{ display: 'flex', width:'contentFit', padding:'.5rem' }}>
                                                                                                {<PackageCard PackageData={item} locationId={slotsLocation?.location_Id} packagesIdCount={packagesIdCount} setPackagesIdCount={setPackagesIdCount} />}
                                                                                            </Col>
                                                                                        </>
                                                                                    )
                                                                                    })
                                                                                }
                                                                            </Row>
                                                                        </Col>
                                                                    </Row>
                                                                </>
                                                            }
                                                        </Fragment>
                                                    </StyledRow>
                                                </Col>

                                                <Col span={24}> <CustomGreyText stomGreyText style={{ width: '100%' }}>Validity</CustomGreyText> </Col>
                                                <CustomCol span={12} style={{ display: "flex", padding: "15px 0" }}>
                                                    <Col span={5}>
                                                        <CustVendFormTxt>Year</CustVendFormTxt>
                                                        <Form.Item
                                                            name="year"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message:
                                                                        "Please select number of year for Subscription of this service!",
                                                                },
                                                            ]}
                                                        >
                                                            <Select
                                                                value={osPeriod}
                                                                onChange={(e) => handleosPeriodchange(e, "year")}
                                                                placeholder="Select year"
                                                            >
                                                                <Option value="">Select Year</Option>
                                                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((time) => (
                                                                    <Option key={time} value={time}>
                                                                        {time}
                                                                    </Option>
                                                                ))}
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>

                                                    <Col span={5} style={{ marginLeft: "15px" }}>
                                                        <CustVendFormTxt>Month</CustVendFormTxt>
                                                        <Form.Item
                                                            name="month"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message:
                                                                        "Please select number of months for Subscription of this service!",
                                                                },
                                                            ]}
                                                        >
                                                            <Select
                                                                value={osPeriod}
                                                                onChange={(e) => handleosPeriodchange(e, "month")}
                                                                placeholder="Select month"
                                                            >
                                                                <Option value="">Select Month</Option>
                                                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((time) => (
                                                                    <Option key={time} value={time}>
                                                                        {time}
                                                                    </Option>
                                                                ))}
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>

                                                    <Col span={5} style={{ marginLeft: "15px" }}>
                                                        <CustVendFormTxt>Days</CustVendFormTxt>
                                                        <Form.Item
                                                            name="days"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message:
                                                                        "Please select number of days for Subscription of this service!",
                                                                },
                                                            ]}
                                                        >
                                                            <Select
                                                                value={osPeriod}
                                                                onChange={(e) => handleosPeriodchange(e, "day")}
                                                                placeholder="Select month"
                                                            >
                                                                <Option value="">Select Days</Option>
                                                                {[
                                                                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9
                                                                ].map((time) => (
                                                                    <Option key={time} value={time}>
                                                                        {time}
                                                                    </Option>
                                                                ))}
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                </CustomCol>
                                            </StyledRow>
                                        </>
                                    }

                                    {selectedEngine !== "Choose_Packages" && imageList.length > 0 &&
                                        <StyledRow style={{ padding: '0 15px', margin: '20px 0' }}>
                                            <Col span={24}>
                                                <StyledRow style={{ padding: '0 12px', margin: '15px 0', background: '#F2F1F0' }}>
                                                    <CustomGreyText style={{ width: '100%' }}>Assign location and resource</CustomGreyText>
                                                    <StyledText style={{ color: '#72959A', width: '100%' }} >Is a resource required for this service?</StyledText>

                                                    <CustomCol span={24}>
                                                        <Form.Item name={`resource_required`} onChange={(e) => { handleRadioChange(e, "resource") }} style={{ margin: '5px' }}>
                                                            <Radio.Group 
                                                                name="resRadiogroup" 
                                                                defaultValue={true}
                                                            >
                                                                <Radio value={true}>Yes</Radio>
                                                                <Radio value={false}> No </Radio>
                                                            </Radio.Group>
                                                        </Form.Item>
                                                    </CustomCol>

                                                    {(apiData?.locations.length > 0) ? apiData?.locations?.map((item, index) => {
                                                        return (
                                                            <>
                                                                {(apiData?.locations?.[index]?.location_resources.length > 0 &&
                                                                    <CustomCol span={24}>
                                                                        <Form.Item name={`location${item?.location_id}`} style={{ margin: '5px' }}>
                                                                            
                                                                            {/* <Checkbox.Group style={{ display: 'flex', flexDirection: 'column' }} > */}
                                                                                <Checkbox
                                                                                    value={`location${item?.location_id}`}
                                                                                    checked={selectedLocation?.[`location${item?.location_id}`]}
                                                                                    onChange={(e) => handleLocationChange(e, item?.location_id )} >
                                                                                    {item?.location_name}
                                                                                </Checkbox>
                                                                            {/* </Checkbox.Group> */}

                                                                        </Form.Item>
                                                                    </CustomCol>)
                                                                }

                                                                {selectedLocation[`location${item?.location_id}`] &&
                                                                    <>
                                                                        {selectedRadio &&
                                                                            <CustomCol span={24}>
                                                                                <StyledText style={{ color: '#72959A', width: '100%' }} >Select resources</StyledText>
                                                                                <Form.Item name={`resources${index}`} style={{ margin: '5px' }}>
                                                                                    {/* <Checkbox.Group style={{ display: 'flex' }} > */}

                                                                                        {apiData?.locations?.[index]?.location_resources.length > 0 ? apiData?.locations?.[index]?.location_resources?.map(option => {
                                                                                            return (
                                                                                            <Checkbox
                                                                                                key={option?.resource_id}
                                                                                                checked= { selectedResource?.[item?.location_id]?.includes(option?.resource_id) }  
                                                                                                value={option?.resource_id}
                                                                                                onChange={(e) => handleCheckboxResource(option?.resource_id, item?.location_id )}
                                                                                            >
                                                                                                {option?.resource_name} <BodySmallReg> {option?.resource_start_time}-{option?.resource_end_time} </BodySmallReg>
                                                                                            </Checkbox>
                                                                                            )}) : 'No Data Available'
                                                                                        }

                                                                                    {/* </Checkbox.Group> */}
                                                                                </Form.Item>
                                                                            </CustomCol>
                                                                        }

                                                                        {selectedEngine === "Close_Subscription" &&
                                                                            <CustomCol span={24}>
                                                                                <StyledTitleText style={{ width: '100%' }} >Sessions</StyledTitleText>

                                                                                <CustomCol span={12} style={{ display: "flex", padding: "15px 0" }}>
                                                                                    <Col span={12}>
                                                                                        <StyledText style={{ color: "#72959A", width: "100%" }}>
                                                                                            Number of Sessions
                                                                                        </StyledText>
                                                                                    </Col>

                                                                                    <Col span={12} style={{ marginLeft: "15px" }}>
                                                                                        <StyledText style={{ color: "#72959A", width: "100%" }}>
                                                                                            Duration between each session
                                                                                        </StyledText>
                                                                                    </Col>
                                                                                </CustomCol>

                                                                                <CustomCol span={12} style={{ display: "flex", padding: "15px 0" }}>
                                                                                    <Col span={7}>
                                                                                        <Form.Item
                                                                                            name={`no_of_sessions${item?.location_id}`}
                                                                                            rules={[
                                                                                                {
                                                                                                    required: true,
                                                                                                    message: "Please select number of sessions for close subscription",
                                                                                                },
                                                                                            ]}
                                                                                            initialValue={sessionValues?.[item?.location_id]?.no_of_sessions || ""}
                                                                                        >
                                                                                            <Select
                                                                                                defaultValue={sessionValues?.[item?.location_id]?.no_of_sessions || ""}
                                                                                                onChange={(e) => handleSessionValuesChange(e, "no_of_sessions", item?.location_id)}
                                                                                                placeholder="Select no of Sessions"
                                                                                            >
                                                                                                {[3, 5, 7, 9].map((time) => (<Option key={time} value={time}>{time}</Option>))}
                                                                                            </Select>
                                                                                        </Form.Item>
                                                                                    </Col>

                                                                                    <Col span={15} style={{ marginLeft: "20px" }}>
                                                                                        <Form.Item
                                                                                            name={`session_frequency${item?.location_id}`}
                                                                                            onChange={(e) => {
                                                                                            }}
                                                                                            style={{ margin: "5px" }}
                                                                                        >
                                                                                            <Radio.Group 
                                                                                                onChange={(e) => { handleSessionradioValuesChange(e, "session_interval", item?.location_id) }}
                                                                                                defaultValue={sessionValues?.[item?.location_id]?.session_interval}
                                                                                            >
                                                                                                <Radio value="Daily">Daily</Radio>
                                                                                                <Radio value="Weekly">Weekly</Radio>
                                                                                                <Radio value="Monthly">Monthly</Radio>
                                                                                            </Radio.Group>
                                                                                        </Form.Item>
                                                                                    </Col>

                                                                                    {sessionValues?.[item?.location_id]?.session_interval === "Daily" &&
                                                                                        <Col span={7} style={{ marginLeft: "10px" }}>
                                                                                            <Form.Item
                                                                                                name={`session_interval${item?.location_id}`}
                                                                                                rules={[
                                                                                                    {
                                                                                                        required: true,
                                                                                                        message:
                                                                                                            "Please select number of days for close subscription",
                                                                                                    },
                                                                                                ]}
                                                                                                initialValue={sessionValues?.[item?.location_id]?.interval || ""}
                                                                                            >
                                                                                                <Select
                                                                                                    defaultValue={sessionValues?.[item?.location_id]?.interval || ""}
                                                                                                    placeholder="Select Duration"
                                                                                                    onChange={(e) => handleSessionValuesChange(e, "frequency_daily", item?.location_id)}
                                                                                                >
                                                                                                    {[1, 2, 3, 4, 5, 6].map((time) => (
                                                                                                        <Option key={time} value={time}>
                                                                                                            {time} day
                                                                                                        </Option>
                                                                                                    ))}
                                                                                                </Select>
                                                                                            </Form.Item>
                                                                                        </Col>
                                                                                    }

                                                                                    {sessionValues?.[item?.location_id]?.session_interval === "Weekly" &&
                                                                                        <Col span={7} style={{ marginLeft: "10px" }}>
                                                                                            <Form.Item
                                                                                                name={`session_interval${item?.location_id}`}
                                                                                                rules={[
                                                                                                    {
                                                                                                        required: true,
                                                                                                        message:
                                                                                                            "Please select number of days for close subscription",
                                                                                                    },
                                                                                                ]}
                                                                                                initialValue={sessionValues?.[item?.location_id]?.interval || ""}
                                                                                            >
                                                                                                <Select
                                                                                                    defaultValue={sessionValues?.[item?.location_id]?.interval || ""}
                                                                                                    placeholder="Select Duration"
                                                                                                    onChange={(e) => handleSessionValuesChange(e, "frequency_weekly", item?.location_id)}
                                                                                                >
                                                                                                    {[1, 2, 3, 4].map((time) => (
                                                                                                        <Option key={time} value={time}>
                                                                                                            {time} week
                                                                                                        </Option>
                                                                                                    ))}
                                                                                                </Select>
                                                                                            </Form.Item>
                                                                                        </Col>
                                                                                    }

                                                                                    {sessionValues?.[item?.location_id]?.session_interval === "Monthly" &&
                                                                                        <Col span={7} style={{ marginLeft: "10px" }}>
                                                                                            <Form.Item
                                                                                                name={`session_interval${item?.location_id}`}
                                                                                                rules={[
                                                                                                    {
                                                                                                        required: true,
                                                                                                        message:
                                                                                                            "Please select number of days for close subscription",
                                                                                                    },
                                                                                                ]}
                                                                                                initialValue={sessionValues?.[item?.location_id]?.interval || ""}
                                                                                            >
                                                                                                <Select
                                                                                                    defaultValue={sessionValues?.[item?.location_id]?.interval || ""}
                                                                                                    placeholder="Select Duration"
                                                                                                    onChange={(e) => handleSessionValuesChange(e, "frequency_monthly", item?.location_id)}
                                                                                                >
                                                                                                    {[1, 2, 3].map((time) => (
                                                                                                        <Option key={time} value={time}>
                                                                                                            {time} month
                                                                                                        </Option>
                                                                                                    ))}
                                                                                                </Select>
                                                                                            </Form.Item>
                                                                                        </Col>
                                                                                    }
                                                                                </CustomCol>
                                                                            </CustomCol>
                                                                        }

                                                                        {/* =================== Timings ===================== */}
                                                                        <StyledTitleText style={{ width: '100%' }}>Timings</StyledTitleText>
                                                                        <CustomCol span={24}>
                                                                            <Radio.Group
                                                                                onChange={(e) => handleRadioChange(e, "timing", item?.location_id)}
                                                                                value={radioValues[item?.location_id]}
                                                                                // defaultValue={`business_hrs${index}`}
                                                                                style={{ display: 'flex', width: '100%', padding: '10px 0' }}
                                                                            >
                                                                                <Col span={7}>
                                                                                    <Radio value={`business_hrs`}>Business hours</Radio>
                                                                                    <CustomVendorFormRow>
                                                                                    <Col span={6}  >
                                                                                <CustVendFormTxt>Start time</CustVendFormTxt>
                                                                                <Form.Item
                                                                                    name={`start_time${item?.location_id}`}
                                                                                    style={(radioValues[`work_hrs${index}`] != `custom_hrs${index}`) ? { 'background': '#ffffff' } : { 'border-style': 'none' }}
                                                                                >
                                                                                    <TimePicker format={format} disabled={true} />
                                                                                </Form.Item>
                                                                            </Col>

                                                                            <Col span={6}>
                                                                                <CustVendFormTxt>End time</CustVendFormTxt>
                                                                                <Form.Item
                                                                                    name={`end_time${item?.location_id}`}
                                                                                    style={(radioValues[`work_hrs${index}`] != `custom_hrs${index}`) ? { 'background': '#ffffff' } : { 'border-style': 'none' }}

                                                                                >
                                                                                    <TimePicker format={format} disabled={true} />
                                                                                </Form.Item>
                                                                            </Col>
                                                                                    </CustomVendorFormRow>
                                                                                </Col>
                                                                                <Col span={6}>
                                                                                    <Radio value={`custom_hrs`}>Custom time</Radio>
                                                                                </Col>
                                                                            </Radio.Group>
                                                                        </CustomCol>

                                                                        <CustomVendorFormRow gutter={[24, 24]}>
                                                                            

                                                                            <Col span={6}>
                                                                                <CustVendFormTxt>Start time</CustVendFormTxt>
                                                                                <Form.Item
                                                                                    name={`start_time_office${item?.location_id}`}
                                                                                    rules={[
                                                                                        { validator: (rule, value) => validateStartTime(`${item?.location_id}`, value) }
                                                                                    ]}
                                                                                >
                                                                                    <TimePicker
                                                                                        format={format}
                                                                                        value={( customTimeValues.start_time_office && ((radioValues[item?.location_id] === `custom_hrs`)) ) ? moment(customTimeValues.start_time_office, format) : null}
                                                                                        onChange={(time) => handleTimeChange(`start_time_office${item?.location_id}`, time)}
                                                                                        disabled={(radioValues[item?.location_id] === `custom_hrs`) ? false : true}
                                                                                    />
                                                                                </Form.Item>
                                                                            </Col>

                                                                            <Col span={6}>
                                                                                <CustVendFormTxt>End time</CustVendFormTxt>
                                                                                <Form.Item
                                                                                    name={`end_time_office${item?.location_id}`}
                                                                                    rules={[
                                                                                        { validator: (rule, value) => validateEndTime(`${item?.location_id}`, value) }
                                                                                    ]}
                                                                                >
                                                                                    <TimePicker
                                                                                        format={format}
                                                                                        value={customTimeValues.end_time_office ? moment(customTimeValues.end_time_office, format) : null}
                                                                                        onChange={(time) => handleTimeChange(`end_time_office${item?.location_id}`, time)}
                                                                                        disabled={(radioValues[item?.location_id] === `custom_hrs`) ? false : true}
                                                                                    />
                                                                                </Form.Item>
                                                                            </Col>

                                                                        </CustomVendorFormRow>
                                                                    </>
                                                                }
                                                                <StyledHr />
                                                            </>)
                                                    }) : 'No data found'
                                                    }
                                                </StyledRow>
                                            </Col>
                                        </StyledRow>
                                    }

                                    {/*     --------------------- Multiple booking ---------------------- */}
                                    {selectedEngine !== "Choose_Packages" && Object.keys(selectedLocation).length > 0 &&
                                        <StyledRow style={{ padding: '0 15px', margin: '20px 0' }} >
                                            <StyledTitleText style={{ width: '100%' }} >Multiple booking</StyledTitleText>
                                            <Col span={24}>
                                                <Checkbox name="multiple_booking" value='fixed_date' checked={multiBookCheck?.multiBook} onChange={(e) => { handleMultiBookCheckbox(e, "multiBook") }} >Multiple booking</Checkbox>
                                            </Col>

                                            <CustomCol span={12} style={{ display: 'flex', padding: '15px 0' }}>
                                                <Col span={7}>
                                                    <CustVendFormTxt>Minimum per session</CustVendFormTxt>
                                                    <Form.Item
                                                        name="min_per_session"
                                                        rules={[
                                                            {
                                                                required: multiBookCheck?.multiBook,
                                                                message: "Please select Minimum per session!",
                                                            },
                                                        ]}
                                                    >
                                                        <Select placeholder='Select minimum per session' disabled={(multiBookCheck?.multiBook) ? false : true}>
                                                            <Option value="">Select minimum per session</Option>
                                                            {[1, 2, 3, 4, 5, 6, 9].map((time) => (
                                                                <Option key={time} value={time}>
                                                                    {time}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                </Col>

                                                <Col span={7} style={{ marginLeft: '25px' }}>
                                                    <CustVendFormTxt>Maximum per session</CustVendFormTxt>
                                                    <Form.Item
                                                        name="max_per_session"
                                                        rules={[
                                                            {
                                                                required: multiBookCheck?.multiBook,
                                                                message: "Please select maximum per session!",
                                                            },
                                                            ({ getFieldValue }) => ({
                                                                validator(_, value) {
                                                                    const min_per_session = getFieldValue('min_per_session');
                                                                    if (!min_per_session || !value || min_per_session < value) {
                                                                        return Promise.resolve();
                                                                    }
                                                                    return Promise.reject('Maximum per session should be greater than minimum per session');
                                                                },
                                                            }),
                                                        ]}
                                                    >
                                                        <Select value={selectedBuffer} onChange={handleBufferChange} placeholder='Select maximum per session' disabled={(multiBookCheck?.multiBook) ? false : true}>
                                                            <Option value="">Select a maximum per session</Option>
                                                            {[5, 10, 15, 20, 50].map((time) => (
                                                                <Option key={time} value={time}>
                                                                    {time}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                            </CustomCol>
                                        </StyledRow>
                                    }

                                    {/*     --------------------- ADD SLOTS ---------------------- */}
                                    {selectedEngine !== "Choose_Packages" && Object.keys(selectedLocation).length > 0 && (
                                        <>
                                            {/*     --------------------- Location n Buttons ---------------------- */}
                                            <Row>
                                                <Col span={24}>
                                                    <CustomGreyText>Add slots for</CustomGreyText>
                                                    {
                                                        apiData?.locations?.map((item, index) => {
                                                            var loc = item?.location_id;
                                                            return (
                                                                <>
                                                                    <Button
                                                                        onClick={() => handleSwitchTable({ "location_index": index, "location_Id": item?.location_id, "location_name": item?.location_name })}
                                                                        style={{
                                                                            color: (selectedLocation.hasOwnProperty([`location${item?.location_id}`]) &&
                                                                                selectedLocation[`location${item?.location_id}`] && slotsLocation?.location_Id == item?.location_id) ? "#ED510C" : "#A4A4A4", height: "28px", width: "auto", padding: '0 12px', margin: '0 8px'
                                                                        }}
                                                                        disabled={ (selectedRadio) ?
                                                                            (
                                                                                selectedResource?.[loc] && selectedResource?.[loc].length > 0 && 
                                                                                selectedLocation.hasOwnProperty([`location${item?.location_id}`]) &&
                                                                                selectedLocation[`location${item?.location_id}`] ? false : true
                                                                            ) :
                                                                            (
                                                                                selectedLocation.hasOwnProperty([`location${item?.location_id}`]) &&
                                                                                selectedLocation[`location${item?.location_id}`] ? false : true
                                                                            )
                                                                        }
                                                                    >
                                                                        {item?.location_name}
                                                                    </Button>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </Col>
                                            </Row>

                                            {/*     --------------------- Duration n Buffter---------------------- */}
                                            <Row>
                                                <CustomCol span={12} style={{ display: 'flex', padding: '15px 0' }}>
                                                    <Col span={7}>
                                                        <CustVendFormTxt>Duration per service</CustVendFormTxt>
                                                        <Form.Item
                                                            name="duration"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Please select duration!",
                                                                },
                                                            ]}
                                                        >
                                                            <Select
                                                                Value={selectedDuration?.[slotsLocation?.location_Id]?.duration || ""}
                                                                onChange={(value) => handleDurationChange(value, slotsLocation?.location_Id)}
                                                                placeholder='Select duration'
                                                                disabled={(slotsLocation?.location_Id) ? false : true}
                                                            >
                                                                <Option value="">Select a duration</Option>
                                                                {[15, 30, 60, 90].map((time) => (
                                                                    <Option key={time} value={time}>
                                                                        {`${time} mins`}
                                                                    </Option>
                                                                ))}
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>

                                                    <Col span={7} style={{ marginLeft: '25px' }}>
                                                        <CustVendFormTxt>Buffer time</CustVendFormTxt>
                                                        <Form.Item
                                                            name="buffer_time"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Please select buffer time!",
                                                                },
                                                            ]}
                                                        >
                                                            <Select
                                                                onChange={(value) => handleBufferChange(value, slotsLocation?.location_Id)}
                                                                placeholder='Select buffer'
                                                                disabled={(slotsLocation?.location_Id) ? false : true}
                                                                // value={selectedBuffer?.[slotsLocation?.location_Id]?.Buffer}
                                                                defaultValue={selectedBuffer?.[slotsLocation?.location_Id]?.Buffer || ""}
                                                            >
                                                                <Option value="">Select buffer</Option>
                                                                {[5, 10, 15].map((time) => (
                                                                    <Option key={time} value={time}>
                                                                        {`${time} mins`}
                                                                    </Option>
                                                                ))}
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                </CustomCol>
                                            </Row>

                                            {/*     --------------------- Date Range n ExcludeDays---------------------- */}
                                            <Row>
                                                <Col span={7} style={{ paddingTop: '22px' }} >
                                                    <Form.Item
                                                        name="date_range"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "Please select date range!",
                                                            },
                                                        ]}
                                                    >
                                                        <RangePicker
                                                            onChange={(value) => handleDateChange(value, slotsLocation?.location_Id)}
                                                            value={dates || value}
                                                            disabledDate={disabledDate}
                                                            onCalendarChange={(val) => {
                                                                setDates(val);
                                                            }}

                                                            onOpenChange={onOpenChange}
                                                            changeOnBlur
                                                            disabled={!(selectedDuration?.[slotsLocation?.location_Id]?.duration && selectedBuffer?.[slotsLocation?.location_Id]?.Buffer)}
                                                            format={dateFormat}
                                                        />

                                                    </Form.Item>
                                                </Col>

                                                <Col span={7}>
                                                    <CustVendFormTxt>Exclude days</CustVendFormTxt>
                                                    <Form.Item
                                                        name="exclude_days"

                                                    >
                                                        <Select
                                                            mode="multiple"
                                                            placeholder="Select excluded days"
                                                            onSelect={(value) => handleExcludeDaySelect(value, slotsLocation?.location_Id)}
                                                            onDeselect={(value) => handleExcludeDayRemove(value, slotsLocation?.location_Id)}
                                                            style={{
                                                                width: "100%"
                                                            }}
                                                            disabled={(slotsLocation?.location_Id) ? false : true}

                                                        >
                                                            {daysRange?.map((item) => (
                                                                <Select.Option key={item} value={daysOfWeek[item]}>
                                                                    {daysOfWeek[item]}
                                                                </Select.Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <RegisterFormButton
                                                style={{ height: '35px', width: '100px' }}
                                                onClick={() => handleCreateSlots(slotsLocation?.location_Id, "Click")}
                                                disabled={ !( dateRange?.[slotsLocation?.location_Id]?.selectedDates?.[0] && 
                                                    dateRange?.[slotsLocation?.location_Id]?.selectedDates?.[1] ) 
                                                }
                                            >
                                                Apply
                                            </RegisterFormButton>

                                            {showSlots && [appliedLoc == slotsLocation?.location_Id] &&
                                                <StyledRow style={{ padding: '0 15px', margin: '20px 0' }}>
                                                    <Col span={24}>
                                                        <StyledRow style={{ padding: '0 12px', margin: '15px 0', background: '#F2F1F0' }}>
                                                            <CustomGreyText>Slots for {appliedLocName} </CustomGreyText>
                                                            <Table dataSource={dataSource?.[appliedLoc]} pagination={false} style={{ width: '100%' }} >
                                                                <Column 
                                                                    title="Day" 
                                                                    dataIndex="day" 
                                                                    key="day" 
                                                                    width={200}
                                                                />

                                                                <Column
                                                                    title="Start Time"
                                                                    dataIndex="timeSlots"
                                                                    key="startTime"
                                                                    width={150}
                                                                    align="center"
                                                                    render={(timeSlots, record) => (
                                                                        <>
                                                                            {timeSlots?.map((timeSlot) => (
                                                                                <Input
                                                                                    key={timeSlot.key}
                                                                                    value={timeSlot.startTime}
                                                                                    style={{ margin:'5px 0' }}
                                                                                    onChange={(e) => {
                                                                                        const updatedDataSource = dataSource?.[appliedLoc].map((day) => {
                                                                                            if (day.key === record.key) {
                                                                                                const updatedTimeSlots = day.timeSlots?.map((ts) =>
                                                                                                    ts.key === timeSlot.key
                                                                                                        ? { ...ts, startTime: e.target.value }
                                                                                                        : ts
                                                                                                );
                                                                                                return { ...day, timeSlots: updatedTimeSlots };
                                                                                            }
                                                                                            return day;
                                                                                        });

                                                                                        setDataSource({
                                                                                            ...dataSource,
                                                                                            [appliedLoc]: SlotsObj
                                                                                        });
                                                                                    }}
                                                                                />
                                                                            ))}
                                                                        </>
                                                                    )}
                                                                />

                                                                <Column
                                                                    title="End Time"
                                                                    dataIndex="timeSlots"
                                                                    key="endTime"
                                                                    width={150}
                                                                    align="center"
                                                                    render={(timeSlots, record) => (
                                                                        <>
                                                                            {timeSlots?.map((timeSlot) => (
                                                                                <Input
                                                                                    key={timeSlot.key}
                                                                                    value={timeSlot.endTime}
                                                                                    style={{ margin:'5px 0' }}
                                                                                    onChange={(e) => {
                                                                                        const updatedDataSource = dataSource?.[appliedLoc].map((day) => {
                                                                                            if (day.key === record.key) {
                                                                                                const updatedTimeSlots = day.timeSlots?.map((ts) =>
                                                                                                    ts.key === timeSlot.key
                                                                                                        ? { ...ts, endTime: e.target.value }
                                                                                                        : ts
                                                                                                );
                                                                                                return { ...day, timeSlots: updatedTimeSlots };
                                                                                            }
                                                                                            return day;
                                                                                        });
                                                                                        setDataSource({
                                                                                            ...dataSource,
                                                                                            [appliedLoc]: SlotsObj
                                                                                        });
                                                                                    }}
                                                                                />
                                                                            ))}
                                                                        </>
                                                                    )}
                                                                />

                                                                <Column
                                                                    title="Slot state"
                                                                    dataIndex="timeSlots"
                                                                    key="status"
                                                                    width={'50%'}
                                                                    render={(timeSlots, record) => (
                                                                        <div style={{ display: 'flex', flexDirection: 'row', height: '100%', marginLeft:'10px' }} >
                                                                            <div style={{ display: 'flex', flexDirection: 'column' }} >

                                                                                {timeSlots?.map((timeSlot) => { 
                                                                                    const isChecked = checkSwitchStatus( appliedLoc, timeSlot.key, dayExcludeDate, tempExSlot, record.key);
                                                                                    return (
                                                                                    <Space key={timeSlot.key} size="middle">
                                                                                        <Switch
                                                                                            checked={isChecked}  
                                                                                            defaultChecked={true}
                                                                                            style={{ margin:'10px 0' }}
                                                                                            onChange={(checked, event) => handleSwitchChange(record.key, timeSlot.key, timeSlot, checked, appliedLoc, event)}
                                                                                        />
                                                                                        
                                                                                        <Row>
                                                                                            {(toggleStatus.day == record?.key && toggleStatus.timeSlotKey == timeSlot.key && testing ) &&
                                                                                                <div>
                                                                                                    <CustomPopconfirm
                                                                                                        showDayExcludeDate={showDayExcludeDate}
                                                                                                        setShowDayExcludeDate={setShowDayExcludeDate}
                                                                                                        dayExcludeDate={dayExcludeDate}
                                                                                                        rowData={record}
                                                                                                        selectedTimeSlot={timeSlot}
                                                                                                        selctedlocId={appliedLoc}
                                                                                                        selectedArr={selectedArr}
                                                                                                        setSelectedArr={setSelectedArr}
                                                                                                        tempExSlot={tempExSlot}
                                                                                                        testing={testing}
                                                                                                    />
                                                                                                </div>
                                                                                            }
                                                                                        </Row>
                                                                                        
                                                                                        <Button
                                                                                            type="link"
                                                                                            onClick={() => handleRemoveTimeSlot(record.key, timeSlot.key, appliedLoc)}
                                                                                            shape="circle"
                                                                                            style={{ width: '100px' }}
                                                                                            icon={<DeleteOutlined style={{ color: 'red' }} />}
                                                                                        />

                                                                                    </Space>
                                                                                    ) })}
                                                                            </div>

                                                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '250px' }}>
                                                                                <Button
                                                                                    type="link"
                                                                                    onClick={() => handleAddTimeSlot(record.key, appliedLoc)}
                                                                                    icon={<PlusSquareOutlined style={{ color: 'grey' }} />}
                                                                                />
                                                                            </div>
                                                                            
                                                                            {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '250px' }}>
                                                                                <Button
                                                                                    type="link"
                                                                                    // onClick={}
                                                                                    icon={<CopyOutlined style={{ color: 'grey' }} />}
                                                                                />
                                                                            </div> */}
                                                                        </div>
                                                                    )}
                                                                />
                                                            </Table>
                                                        </StyledRow>
                                                    </Col>
                                                </StyledRow>
                                            }
                                        </>
                                    )}

                                    <StyledRow style={{ padding: '10px 15px', display: 'flex', flexWrap:'wrap', gap: '25px', margin: '20px 0', border:'1px solid #72959A', borderRadius:'8px' }}>
                                        <CustomGreyText style={{ width: '100%' }}>Pricing</CustomGreyText>
                                        <SingleCol style={{ padding: ' 0' }}>
                                            <CustVendFormTxt>Currency</CustVendFormTxt>
                                            <Form.Item
                                                name="currency_name"
                                                style={{ width: '100%' }}
                                                rules={[{ required: true, message: 'Please select your curreny' }]}
                                            >
                                                <Select defaultValue={"$"}>
                                                    <Option value="$">$</Option>
                                                </Select>
                                            </Form.Item>
                                        </SingleCol>

                                        <SingleCol style={{ padding: ' 0px' }}>
                                            <CustVendFormTxt>Amount</CustVendFormTxt>
                                            <Form.Item
                                                name="amount_without_tax"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter amount',
                                                    }
                                                ]}
                                            >
                                                <InputNumber
                                                    controls={false}
                                                    placeholder='Enter Amount'
                                                    style={{ width: '100%' }}
                                                    min={0}
                                                    step={0.01}
                                                />
                                            </Form.Item>
                                        </SingleCol>
                                        
                                        { (selectedEngine === "Choose_Packages") && 
                                            <SingleCol style={{ padding: '0px' }}>
                                                <CustVendFormTxt>Discount %</CustVendFormTxt>
                                                <Form.Item
                                                    name="package_discount"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please enter discount',
                                                        },
                                                    ]}
                                                >
                                                    <InputNumber
                                                        controls={false}
                                                        placeholder='Enter discount'
                                                        style={{ width: '100%' }}
                                                        min={0}
                                                        step={0.01}
                                                    />
                                                </Form.Item>
                                            </SingleCol>
                                        }
                                    </StyledRow>
                                </>
                            )}
                            <Row style={{ marginBottom: '10px' }} >
                                <CustomButton type="primary" htmlType="submit">Update service</CustomButton>
                            </Row>
                        </CustomForm>
                    </Col>
                </Spin>
            </Row>
        </Fragment>
    )
}

export default EditServiceForm;