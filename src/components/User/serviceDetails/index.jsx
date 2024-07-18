import CardsCarousel from "@/lib/commonComponent/CardsCarousel";
import {
  Col,
  Row,
  Button,
  Carousel,
  Dropdown,
  message,
  Input,
  Avatar,
  Rate,
} from "antd";
import { Fragment, useState, useEffect, useRef } from "react";
import {
  ButtonText,
  CalenText,
  CustomCol,
  CustomRow,
  CustomText,
  CustomTitleText,
  SpanText,
  StyledFeatureText,
  StyledListText,
  StyledLocText,
  StyledOrgTitle,
  StyledPriceText,
  StyledText,
  StyledTextNew,
  StyledTitle,
  styledTextNew,
  SelectedCol,
  Servic1Col,
  SloteRow,
  ServicCol,
  ServiceRow,
  SmallText,
  CardTitalText,
  StyledDateCol,
} from "./styledComponent";
import {
  CheckOutlined,
  EnvironmentOutlined,
  UserOutlined,
  ArrowRightOutlined,
  UploadOutlined,
  ArrowLeftOutlined,
  LeftOutlined,
  RightOutlined,
  HeartOutlined,
  StarFilled,
  HeartFilled,
} from "@ant-design/icons";
import { CustomTag } from "@/lib/commonComponent/CustomUserCard/styledComponent";
import {
  GetServiceById,
  addToCartUserServices,
  GetBookedSlotsDetailsforaDate,
  BookAnPackageService,
  BookAppointmentService,
  GetPackageStatusService,
  addToFavouritiesUserServices,
  checkIsFavoriteService,
} from "@/Services/userService.services";
import ListingCard from "@/lib/commonComponent/CustomUserCard";
import dayjs from "dayjs";
import Image from "next/image";
import Xicon from "../../../assets/imgs/icon/x-circle.svg";
import DeviceMobileCamera from "../../../assets/imgs/icon/DeviceMobileCamera.svg";
import {
  BodyBold,
  BodyDemi,
  BodyReg,
  BodySmallReg,
  BodyTiny,
  H5,
  RegisterButton,
  TitleBold,
} from "@/styles/styledComponent";
import InfoModal from "@/lib/commonComponent/ConfirmModal";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const ServiceDetails = ({ params }) => {
  const format = "HH:mm";
  const router = useRouter();
  const [apiData, setApiData] = useState();
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideLength, setSlideLength] = useState(0);
  const [showDates, setShowDates] = useState([]);
  const [allSlotsData, setallSlotsData] = useState();
  const [allResourceList, setAllResourceList] = useState();
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [clickedRes, setClickedRes] = useState([]);
  const [clickedItem, setClickedItem] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [carouselImages, setCaroselImages] = useState();
  const [selectedTime, setSelectedTime] = useState([]);
  const [userId, setUserId] = useState();
  const [userToken, setUserToken] = useState();
  const [userRole, setUserRole] = useState();
  const [cartData, setCartData] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isResourceRequired, setIsResourceRequired] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [endDate, setEndDate] = useState();
  const [closeSubArray, setCloseSubArray] = useState([]);
  const [closeSubsDates, setCloseSubsDates] = useState([]);
  const [closeSubCartArray, setCloseSubCartArray] = useState([]);
  const [selectedSessionDate, setSelectedSessionDate] = useState();
  const [count, setCount] = useState(0);
  const [calltype, setCalltype] = useState();
  const [appointMessage, setAppointMessage] = useState();
  const searchParams = useSearchParams();
  const [verifyPackge, setVerifyPackge] = useState();
  const [isFavorite, setIsFavorite] = useState();

  const packageIdByRoute = searchParams.get("packageId");
  const orderIdByRoute = searchParams.get("orderId");

  const ServiceId = params?.serviceId;
  const ServicePlaceId = params?.locationId;


  useEffect(() => {
    (async () => {
      let serviceId = ServiceId;
      let locationId = ServicePlaceId;
      let userId = localStorage.getItem("userId");
      let userToken = localStorage.getItem("token");
      let userRole = localStorage.getItem("role");

      setUserId(userId);
      setUserToken(userToken);
      setUserRole(userRole);

      const response = await GetServiceById(serviceId, locationId);

      const output = response?.response?.data;
      console.log("API data serv Det ==>>", output);

      if (userRole && userRole == "user" && userToken && userId) {
        const DataObj = {
          token: userToken,
          user_id: userId,
          vendor_id: output?.["vendor-id"],
          location_id: ServicePlaceId,
          service_id: ServiceId,
        };
        await CheckFavoritServiceStatus(DataObj);
      }

      CheckPackageStatus(
        userId,
        userToken,
        serviceId,
        locationId,
        output?.["vendor-id"]
      );

      setApiData(output);

      let endDate =
        output?.["slots-meta-array"]?.[0]?.[ServicePlaceId]?.end_date;

      let startDate =
        output?.["slots-meta-array"]?.[0]?.[ServicePlaceId]?.start_date;

      let givenDate = new Date(startDate);

      if (output?.booking_engine_name === "Open subscription") {
        let days = output?.data?.[0]?.days;
        let month = output?.data?.[0]?.month;
        let year = output?.data?.[0]?.year;

        if (year && month && days) {
          givenDate.setFullYear(givenDate.getFullYear() + Number(year));
          givenDate.setUTCMonth(givenDate.getUTCMonth() + Number(month));
          givenDate.setUTCDate(givenDate.getUTCDate() + Number(days));
          endDate = givenDate.toISOString();
          let convertedEndDate = convertDate(endDate);
          setOpenEndDate(convertedEndDate);
        }
      }

      const dateArray = generateDateObjects(startDate, endDate);

      setSlideLength(dateArray.length / 6);
      const datesArrays = splitArrayIntoSubarrays(dateArray, 6);
      setShowDates(datesArrays);

      const cardImages = [];
      cardImages.push(output?.["feature-image"]);
      output?.["gallery-array"]?.[0] &&
        cardImages.push(output?.["gallery-array"]?.[0]);
      setCaroselImages(cardImages);

      let slotStartTime =
        output?.service_time?.[0]?.[ServicePlaceId]?.start_time;
      let slotEndTime = output?.service_time?.[0]?.[ServicePlaceId]?.end_time;

      const slotBuffer =
        output?.["slots-meta-array"]?.["0"]?.[ServicePlaceId]?.buffer;
      const slotDuration =
        output?.["slots-meta-array"]?.["0"]?.[ServicePlaceId]?.duration;

      const resourceRequired = output?.["resource-required"];

      if (resourceRequired == "true") {
        setIsResourceRequired(true);

        let earliest_resource_available_time = "23:59";
        let last_resource_available_time = "00:00";
        var items = output?.resources.map((item, index) => {
          let tempObj = {
            resId: item?.id,
            label: item?.name,
            start_time: item?.start_time,
            end_time: item?.end_time,
            image: item?.image?.url,
            key: index,
          };

          if (item?.start_time < earliest_resource_available_time) {
            earliest_resource_available_time = item?.start_time;
          }

          if (item?.end_time > last_resource_available_time) {
            last_resource_available_time = item?.end_time;
          }

          return tempObj;
        });

        if (items.length > 1) {
          const addAnyone = [
            {
              resId: null,
              label: "anyone",
              start_time: earliest_resource_available_time,
              end_time: last_resource_available_time,
              key: items.length,
            },
          ];
          items.push(...addAnyone);
        }

        setAllResourceList(items);
        setClickedRes([
          items[items?.length - 1]?.label,
          items[items?.length - 1]?.resId,
        ]);
      }

      const slotsResult = createSlots(
        slotStartTime,
        slotEndTime,
        slotDuration,
        slotBuffer,
        clickedRes,
        allResourceList
      );

      let startDate1 = new Date(startDate);
      let currDate = new Date();

      if (currDate < startDate1) {
        currDate = startDate1;
      }

      const dateOptions = { day: "2-digit", month: "short", year: "numeric" };
      let dateString = currDate
        .toLocaleDateString("en-US", dateOptions)
        .split(",")
        .join("");

      const Slotresponse = await GetBookedSlotsDetailsforaDate({
        service_id: serviceId,
        location_id: locationId,
        date: dateString,
      });

      const output2 = Slotresponse?.response?.data;

      if (resourceRequired === "true") {
        let key = 0;
        if (items?.length == 1) {
          key = 0;
        } else {
          key = items?.length - 1;
        }

        setClickedItem(items?.[key]);
        const slotsResult1 = updateSlots(slotsResult, items?.[key], "onLoad");
        const slotResult2 = bookedSlotsupdate(slotsResult1, output2);
        setallSlotsData(slotsResult1); // need to update this to later on slotResult2
      } else {
        setClickedItem(items?.[0]);
        const slotsResult1 = bookedSlotsupdate(slotsResult, output2);
        setallSlotsData(slotsResult); // need to update this to later on slotResult1
      }

      if (
        output?.booking_engine == 1 ||
        output?.booking_engine == 2 ||
        output?.booking_engine == 5
      ) {
        function findFirstActiveSlot(slot) {
          return slot.resFlagDisable === "no";
        }

        let firstActiveSlot = slotsResult?.find((slot) =>
          findFirstActiveSlot(slot)
        );

        let cartObj = {
          token: userToken || null,
          booking_engine: output?.booking_engine,
          user_id: userId || null,
          service_id: output?.id,
          location_id: ServicePlaceId,
          resource_id: items?.[items?.length - 1]?.resId,
          price: output?.amount,
          start_date: dateString,
          end_date: dateString,
          slot_start_time: firstActiveSlot?.startTime,
          slot_end_time: firstActiveSlot?.endTime,
          tax: 0,
          discount: 0,
          vendor_id: output?.["vendor-id"],
        };

        let selDate = { date: dateString };
        let slot = {
          key: 1,
          startTime: firstActiveSlot?.startTime,
          endTime: firstActiveSlot?.endTime,
          resFlagDisable: "no",
        };
        setSelectedDate(selDate);
        setSelectedTime(slot);
        setCartData(cartObj);
        setIsCartVisible(true);
      }

      if (output?.booking_engine == 3) {
        const resultedSessionArray = checkCallType(output, currDate, "onLoad");
        setCloseSubArray(resultedSessionArray);
        setCalltype("onLoad");
      }
    })();
  }, []);

  const CheckFavoritServiceStatus = async (data) => {
    const GetFavoriteServiceData = await checkIsFavoriteService(data);
    const isFavorite = GetFavoriteServiceData?.response.data?.isFavorite;
    setIsFavorite(isFavorite);
  };

  const CheckPackageStatus = async (
    userId,
    userToken,
    serviceId,
    locationId,
    vendorId
  ) => {
    const ObjData = {
      user_id: userId,
      token: userToken,
      service_id: serviceId,
      location_id: locationId,
      vendor_id: vendorId,
    };

    if (orderIdByRoute && packageIdByRoute) {
      (ObjData.order_id = orderIdByRoute),
        (ObjData.package_id = packageIdByRoute);
    }

    const response = await GetPackageStatusService(ObjData);
    const output = response?.response?.data;
    setVerifyPackge(output);
  };

  useEffect(() => {
    function findFirstActiveSlot(slot) {
      return slot.resFlagDisable === "no";
    }

    let firstActiveSlot = allSlotsData?.find((slot) =>
      findFirstActiveSlot(slot)
    );

    if (apiData?.booking_engine == 3) {
      if (calltype == "onLoad" || calltype == "calenderclick") {
        let cartObj = {
          token: userToken || null,
          booking_engine: apiData?.booking_engine,
          user_id: userId || null,
          service_id: apiData?.id,
          location_id: ServicePlaceId,
          resource_id: clickedRes[1],
          price: apiData?.amount,
          start_date: selectedSessionDate,
          end_date: "14 Oct",
          slot_start_time: firstActiveSlot?.startTime,
          slot_end_time: firstActiveSlot?.endTime,
          tax: 0,
          discount: 0,
          vendor_id: apiData?.["vendor-id"],
        };

        setCartData((prevValues) => ({
          ...prevValues,
          [selectedSessionDate]: cartObj,
        }));
      }

      setIsCartVisible(true);
    }
  }, [selectedSessionDate, calltype]);

  useEffect(() => {
    (async () => {
      const selDate = selectedDate?.date;
      if (selDate) {
        const Slotresponse = await GetBookedSlotsDetailsforaDate({
          service_id: ServiceId,
          location_id: ServicePlaceId,
          date: selDate,
        });

        const output2 = Slotresponse?.response?.data;

        const slotsResult1 = updateSlots(allSlotsData, clickedItem, "resClick");
        if (output2?.length > 0) {
          const slotResult2 = bookedSlotsupdate(slotsResult1, output2);
          setallSlotsData(slotResult2);
        } else {
          setallSlotsData(slotsResult1);
        }
      }
    })();
  }, [selectedDate, allSlotsData]);

  const convertDate = (inputDate) => {
    const dateObj = new Date(inputDate);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return dateObj.toLocaleDateString("en-US", options).split(",").join("");
  };

  const UpdateOpenSubsEndDate = (givenDate) => {
    let days = apiData?.data?.[0]?.days;
    let month = apiData?.data?.[0]?.month;
    let year = apiData?.data?.[0]?.year;

    if (year && month && days) {
      givenDate.setFullYear(givenDate.getFullYear() + Number(year));
      givenDate.setUTCMonth(givenDate.getUTCMonth() + Number(month));
      givenDate.setUTCDate(givenDate.getUTCDate() + Number(days));
      let newendDate = givenDate.toISOString();
      let convertedEndDate = convertDate(newendDate);
      setOpenEndDate(convertedEndDate);
    }
  };

  const createSlots = (startTimeStr, endTimeStr, slotDuration, buffer) => {
    const startTime = new Date(`2023-09-04T${startTimeStr}`);
    const endTime = new Date(`2023-09-04T${endTimeStr}`);
    const nextDate = new Date(`2023-09-05T${"00:00"}`);
    const endtimeMargin = 10;
    const endSlotlimit = endTime;
    endSlotlimit.setMinutes(endTime.getMinutes() + endtimeMargin);

    const slots = [];
    let currentTime = new Date(startTime);
    let counter = 0;

    while (currentTime - endTime <= 0) {
      const slotStart = currentTime.toTimeString().slice(0, 5);

      const slotEnd = new Date(currentTime);
      slotEnd.setMinutes(currentTime.getMinutes() + slotDuration);
      const slotEndTime = slotEnd.toTimeString().slice(0, 5);

      slots.push({
        key: counter,
        startTime: slotStart,
        endTime: slotEndTime,
        resFlagDisable: "no",
      });

      // Add buffer time to the start time
      currentTime = new Date(slotEnd);
      currentTime.setMinutes(currentTime.getMinutes() + buffer);
      slotEnd.setMinutes(currentTime.getMinutes() + slotDuration);

      if (slotEnd > endSlotlimit) {
        break;
      }

      if (currentTime >= nextDate) {
        break;
      }

      counter++;
    } // end of While loop

    return slots;
  };

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const generateDateObjects = (startdate, enddate) => {
    const startDate = new Date(startdate);
    const endDate = new Date(enddate);
    let currentDate = new Date();

    const dateObjects = [];

    if (currentDate < startDate) {
      currentDate = startDate;
    }

    while (currentDate <= endDate) {
      const formattedDate = formatDate(currentDate);
      const day = formattedDate.split(",")[0].trim(); // Extract day
      const date = formattedDate.split(",")[1].trim(); // Extract date
      const month = currentDate.toLocaleString("en-US", { month: "long" });
      const year = currentDate.getFullYear();
      const dayOfMonth = currentDate.getDate();

      dateObjects.push({
        day,
        date: `${month.slice(0, 3)} ${
          dayOfMonth < 10 ? "0" : ""
        }${dayOfMonth} ${year}`,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateObjects;
  };

  const splitArrayIntoSubarrays = (arr, subarraySize) => {
    const result = [];
    for (let i = 0; i < arr.length; i += subarraySize) {
      result.push(arr.slice(i, i + subarraySize));
    }
    return result;
  };

  const handleScrollLeft = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    }
  };

  const handleScrollRight = () => {
    if (slideIndex <= slideLength - 1) {
      setSlideIndex(slideIndex + 1);
    }
  };

  const items = allResourceList;

  const updateSlots = (allSlotsData, item, callfrom) => {
    const updatedSlotsData = allSlotsData;
    const callFrom = callfrom;

    const number_of_slots = allSlotsData?.length;

    const res_name = item?.label;

    const res_start_time = new Date(`2023-09-04T${item?.start_time}`);

    const res_end_time = new Date(`2023-09-04T${item?.end_time}`);

    const resEndtimeMargin = 10;

    res_end_time.setMinutes(res_end_time.getMinutes() + resEndtimeMargin);

    const first_slot_start_time = updatedSlotsData?.[0]?.start_time;

    const last_slot_end_time =
      updatedSlotsData?.[number_of_slots - 1]?.end_time;

    const serv_start_time = new Date(
      `2023-09-04T${updatedSlotsData?.[0]?.startTime}`
    );

    const serv_end_time = new Date(
      `2023-09-04T${updatedSlotsData?.[number_of_slots - 1]?.endTime}`
    );

    if (serv_start_time >= res_start_time) {
      const servres_start_time = serv_start_time;
    } else {
      const servres_start_time = res_start_time;
    }
    if (serv_end_time < res_end_time || serv_end_time == res_end_time) {
      const servres_end_time = serv_end_time;
    } else {
      const servres_end_time = res_end_time;
    }

    var slot_start_time;

    var slot_end_time;

    for (let i = 0; i < updatedSlotsData?.length; i++) {
      slot_start_time = new Date(
        `2023-09-04T${updatedSlotsData?.[i]?.startTime}`
      );
      slot_end_time = new Date(`2023-09-04T${updatedSlotsData[i]?.endTime}`);

      if (slot_start_time < res_start_time) {
        updatedSlotsData[i].resFlagDisable = "yes";
      } else {
        if (slot_end_time > res_end_time) {
          updatedSlotsData[i].resFlagDisable = "yes";
        } else {
          updatedSlotsData[i].resFlagDisable = "no";
        }
      }
    }

    return updatedSlotsData;
  };

  const bookedSlotsupdate = (allSlotsData, bookedSlotsData) => {
    const updatedSlotsData = allSlotsData;

    if (bookedSlotsData == undefined) {
      return updatedSlotsData;
    } else {
      for (let i = 0; i < updatedSlotsData?.length; i++) {
        var slot_start_time = new Date(
          `2023-09-04T${updatedSlotsData?.[i]?.startTime}`
        );
        for (let j = 0; j < bookedSlotsData?.length; j++) {
          if (
            bookedSlotsData[j]?.start_time ==
              updatedSlotsData?.[i]?.startTime &&
            bookedSlotsData[j].remaining_booking_count < 1
          ) {
            updatedSlotsData[i].resFlagDisable = "yes";
          }
        }
      }
    }
    return updatedSlotsData;
  };

  const handleMenuClick = (e) => {
    setClickedRes([items[e.key]?.label, items[e.key]?.resId]);
    setClickedItem(items[e.key]);
    setSelectedDate();
    setSelectedTime([]);
    let bookedSlotsData = [];
    const slotsResult = updateSlots(allSlotsData, items[e.key], "resClick");
    setallSlotsData(slotsResult);
  };

  const excludedDays =
    apiData?.["slots-meta-array"]?.["0"]?.[ServicePlaceId]?.excluded_days;

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const handleDateSelect = (obj) => {
    setSelectedDate(obj);
    setSelectedTime([]);

    let dte = obj.date;

    let slotsData =
      apiData?.["slots-meta-array"]?.[0]?.[ServicePlaceId]?.exclude_slots;

    if (slotsData && slotsData.length > 0) {
      const selectedKeyObject = slotsData[dte];
      setSelectedSlots(slotsData);
    } else {
      setSelectedSlots([]);
    }

    let givenDate = new Date(dte);
    if (apiData?.booking_engine_name === "Open subscription") {
      UpdateOpenSubsEndDate(givenDate);
    }

    // ===================== session Dates ============
    setCartData([]);
    setSelectedSessionDate();
    checkCallType(apiData, dte, "click");
    setCalltype("calenderclick");
  };

  const fetchbookedSlots = async (date, slotsResult) => {
    const Slotresponse = await GetBookedSlotsDetailsforaDate({
      service_id: ServiceId,
      location_id: ServicePlaceId,
      date: date,
    });

    if (Slotresponse?.response?.status === 200) {
      const output2 = Slotresponse?.response?.data;
      const slotsResult1 = await bookedSlotsupdate(slotsResult, output2);
      setallSlotsData(slotsResult1);
    }
  };

  const isSlotDisabled = (startTime, date) => {
    for (const entry of selectedSlots) {
      const entryDate = Object.keys(entry)[0];
      const entryData = entry[entryDate];

      if (entryDate == date && entryData.startTime == startTime) {
        return true;
      }
    }

    return false;
  };

  const closeSubFunc = (outData, date, type) => {
    outData?.data?.[0]?.[ServicePlaceId]?.interval;

    const subArray = [];

    let interval_in_days;
    const checkSwitch =
      outData?.data?.[0]?.[ServicePlaceId]?.session_interval.toLowerCase();

    switch (checkSwitch) {
      case "daily":
        interval_in_days = outData?.data?.[0]?.[ServicePlaceId]?.interval;
        break;
      case "weekly":
        interval_in_days = outData?.data?.[0]?.[ServicePlaceId]?.interval * 7;
        break;
      case "monthly":
        interval_in_days = outData?.data?.[0]?.[ServicePlaceId]?.interval * 30;
        break;
    }

    let sessionDates = [];

    for (
      let i = 0;
      i < outData?.data?.[0]?.[ServicePlaceId]?.no_of_sessions;
      i++
    ) {
      if (date && interval_in_days) {
        let givenDate = new Date(date);
        givenDate.setUTCDate(givenDate.getUTCDate() + i * interval_in_days);
        let nextSessionDate = convertDate(givenDate);
        sessionDates.push(nextSessionDate);
        if (i == 0) {
          setSelectedSessionDate(nextSessionDate);
        }
      }
    }
    setCloseSubsDates(sessionDates);
    setCloseSubCartArray([]);
    setCalltype("click");
  };

  const handleSlotClick = (slot) => {
    setSelectedTime(slot);
    if (apiData?.booking_engine == 1) {
      let cartObj = {
        token: userToken || null,
        booking_engine: 1,
        user_id: userId || null,
        service_id: apiData?.id,
        location_id: ServicePlaceId,
        resource_id: clickedRes[1],
        price: apiData?.amount,
        start_date: selectedDate?.date,
        end_date: null,
        slot_start_time: slot?.startTime,
        slot_end_time: slot?.endTime,
        tax: 0,
        discount: 0,
        vendor_id: apiData?.["vendor-id"],
      };

      setEndDate(selectedDate?.date);
      setCartData(cartObj);
      setIsCartVisible(true);
    }

    if (apiData?.booking_engine == 2) {
      let cartObj = {
        token: userToken || null,
        user_id: userId || null,
        booking_engine: 2,
        service_id: apiData?.id,
        location_id: ServicePlaceId,
        resource_id: clickedRes[1],
        price: apiData?.amount,
        start_date: selectedDate?.date,
        end_date: openEndDate,
        slot_start_time: slot?.startTime,
        slot_end_time: slot?.endTime,
        tax: 0,
        discount: 0,
        vendor_id: apiData?.["vendor-id"],
      };

      setEndDate(openEndDate);
      setCartData(cartObj);
      setIsCartVisible(true);
    }

    if (apiData?.booking_engine == 3) {
      let cartObj = {
        token: userToken || null,
        user_id: userId || null,
        booking_engine: 3,
        service_id: apiData?.id,
        location_id: ServicePlaceId,
        resource_id: clickedRes[1],
        price: apiData?.amount,
        start_date: selectedSessionDate,
        end_date: endDate,
        slot_start_time: slot?.startTime,
        slot_end_time: slot?.endTime,
        tax: 0,
        discount: 0,
        vendor_id: apiData?.["vendor-id"],
      };

      if (selectedSessionDate in cartData) {
        const copy = cartData;
        setCartData(copy);
        setCartData((prevValues) => ({
          ...prevValues,
          [selectedSessionDate]: cartObj,
        }));
      } else {
        setCartData((prevValues) => ({
          ...prevValues,
          [selectedSessionDate]: cartObj,
        }));
      }
      setIsCartVisible(true);
    }

    if (apiData?.booking_engine == 5) {
      let cartObj = {
        token: userToken || null,
        user_id: userId || null,
        booking_engine: 5,
        service_id: apiData?.id,
        location_id: ServicePlaceId,
        resource_id: clickedRes[1],
        price: apiData?.amount,
        start_date: selectedDate?.date,
        end_date: openEndDate,
        slot_start_time: slot?.startTime,
        slot_end_time: slot?.endTime,
        tax: 0,
        discount: 0,
      };

      setCartData(cartObj);
      setIsCartVisible(true);
    }
  };

  const handleClearCartItem = () => {
    setSelectedTime([]);
    setSelectedDate();
    setCartData();
    setIsCartVisible(false);
  };

  const formatSessionData = (dataObj, clickedRes) => {
    var temp = Object.keys(dataObj);
    if (temp.length === apiData?.data?.[0]?.[ServicePlaceId]?.no_of_sessions) {
      const extractedData = [];

      for (const key in dataObj) {
        if (dataObj.hasOwnProperty(key)) {
          const { slot_start_time, slot_end_time, start_date } = dataObj[key];
          extractedData.push({ slot_start_time, slot_end_time, start_date });
        }
      }

      const output = dataObj?.[temp[0]];

      output.subscription_details = extractedData;
      output.resource_id = clickedRes[1];
      output.resource_name = clickedRes[0];
      return output;
    } else {
      return [];
      InfoModal({
        type: "error",
        title: "Warning",
        text: "Please select all the slots",
      });
    }
  };

  const HandleAddCart = async (data, clickedRes) => {
    console.log("data",data)
    console.log("clickedRes",clickedRes)
    try {
      if (userRole === "user") {
        if (data && verifyPackge?.is_part_of_package) {
          data.message = appointMessage;
          data.vendor_id = apiData?.["vendor-id"];
          data.package_id = packageIdByRoute
            ? packageIdByRoute
            : verifyPackge?.order_details?.package_details?.package_ids;
          data.order_id = orderIdByRoute
            ? orderIdByRoute
            : verifyPackge?.order_details?.id;
          data.count = verifyPackge?.order_details?.package_details?.count;
          data.booking_engine = apiData?.booking_engine;
          data.booking_intent_id =
            verifyPackge?.order_details?.package_details?.booking_intent_id;

          const response = await BookAnPackageService(data);
          if (response?.response?.status == 200) {
            CheckPackageStatus(
              userId,
              userToken,
              ServiceId,
              ServicePlaceId,
              apiData?.["vendor-id"],
              apiData?.booking_intent_id
            );
            setAppointMessage();
            setSelectedTime([]);
            setSelectedDate();
            setCartData();
            setIsCartVisible(false);
          }
        } else if (
          data &&
          (data.booking_engine == 1 || data.booking_engine == 2)
        ) {
          data.resource_id = clickedRes[1];
          data.resource_name = clickedRes[0];

          if (data) {
            const response = await addToCartUserServices(data);
            if (response?.response?.status == 200) {
              setSelectedTime([]);
              setSelectedDate();
              setCartData();
              setIsCartVisible(false);
            }
          }
        } else if (data && apiData?.booking_engine == 3) {
          const formatedDataOut = formatSessionData(data, clickedRes);

          const response = await addToCartUserServices(formatedDataOut);
          if (response?.response?.status == 200) {
            setSelectedTime([]);
            setSelectedDate();
            setCartData();
            setIsCartVisible(false);
          }
        } else if (data && apiData?.booking_engine == 5) {
          data.message = appointMessage;
          data.vendor_id = apiData?.["vendor-id"];

          const response = await BookAppointmentService(data);
          if (response?.response?.status == 200) {
            setAppointMessage();
            setSelectedTime([]);
            setSelectedDate();
            setCartData();
            setIsCartVisible(false);
          }
        } else {
          InfoModal({
            type: "error",
            title: "Warning",
            text: "Something went wrong",
          });
        }
      } else {
        InfoModal({
          type: "error",
          title: "Warning",
          text: "Please login to add into cart",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkCallType = (dataArr, date, type) => {
    if (type === "onLoad") {
      closeSubFunc(dataArr, date, type);
    }
    if (type === "click") {
      closeSubFunc(dataArr, date, type);
    }
  };

  const HandleSessionDateClick = (value) => {
    setSelectedSessionDate(value);
  };

  const url = `/store-front/?vendorId=${encodeURIComponent(
    apiData?.business_id
  )}`;

  const handleAddToFavourites = async (isFavorite) => {
    if (userRole && userRole == "user" && userToken && userId) {
      const DataObj = {
        token: userToken,
        user_id: userId,
        vendor_id: apiData?.["vendor-id"],
        location_id: ServicePlaceId,
        service_id: ServiceId,
        isFavorite: !isFavorite,
      };
      const response = await addToFavouritiesUserServices(DataObj);
      if (response.response.status == 200) {
        const updatedStatus = await CheckFavoritServiceStatus(DataObj);
      }
    } else {
      localStorage.setItem("previous_route", true);
      router.push("/login");
    }
  };

  return (
    <Fragment>
      <Row>
        <Col span={24}>
          <ServiceRow>
            <ServicCol
              span={10}
              style={{
                backgroundColor: "#4E39B7",
                minHeight: "100%",
                maxWidth: "100%",
              }}
            >
              <Row style={{ display: "flex", justifyContent: "start" }}>
                <Col
                  span={24}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <StyledTitle>
                    {apiData?.["service-name"] ?? "No data"}
                  </StyledTitle>

                  <StyledText>
                    {apiData?.["slots-meta-array"]?.["0"]?.[ServicePlaceId]
                      ?.duration + " mins" ?? "No data"}
                  </StyledText>
                  <StyledText>
                    {apiData?.booking_engine === 3 && (
                      <StyledText>{`${apiData?.data?.[0]?.[ServicePlaceId]?.no_of_sessions} Sessions ${apiData?.data?.[0]?.[ServicePlaceId]?.interval} ${apiData?.data?.[0]?.[ServicePlaceId]?.session_interval}`}</StyledText>
                    )}
                  </StyledText>

                  <Link href={url}>
                    {" "}
                    <div
                      style={{
                        cursor: "pointer",
                        color: isHovered ? "red" : "inherit",
                      }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {" "}
                      {apiData?.["vendor-name"]}
                    </div>{" "}
                  </Link>

                  <StyledLocText>
                    {" "}
                    <EnvironmentOutlined />
                    {apiData?.city ?? "No data"}
                  </StyledLocText>

                  <Row
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      margin: "3px 0",
                    }}
                  >
                    {apiData?.features_arr &&
                      apiData?.features_arr.map((item, index) => {
                        return (
                          item &&
                          item !== "" && (
                            <StyledFeatureText>
                              {" "}
                              <CheckOutlined
                                style={{ color: "#ED510C" }}
                              />{" "}
                              {item}
                            </StyledFeatureText>
                          )
                        );
                      })}
                  </Row>

                  <CustomText>{apiData?.about ?? "No data"}</CustomText>
                  <Col
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      wrap: "wrap",
                    }}
                  >
                    <Col
                      style={{
                        margin: "15px 0",
                        display: "flex",
                        flexDirection: "row",
                        wrap: "wrap",
                      }}
                    >
                      {apiData?.benefits_arr &&
                        apiData?.benefits_arr.map((item, key) => {
                          return (
                            item &&
                            item !== "" && (
                              <CustomTag
                                style={{
                                  borderRadius: "4px",
                                  marginRight: "10px",
                                }}
                              >
                                {item}
                              </CustomTag>
                            )
                          );
                        })}
                    </Col>
                  </Col>

                  {apiData?.booking_engine == 2 && (
                    <Col style={{ display: "flex", gap: "5px" }}>
                      {apiData?.data?.[0]?.year > 0 && (
                        <StyledText>{`${apiData?.data?.[0]?.year} Year`}</StyledText>
                      )}
                      {apiData?.data?.[0]?.month > 0 && (
                        <StyledText>{`${apiData?.data?.[0]?.month} Month`}</StyledText>
                      )}
                      {apiData?.data?.[0]?.days > 0 && (
                        <StyledText>{`${apiData?.data?.[0]?.days} Days`}</StyledText>
                      )}
                    </Col>
                  )}

                  <StyledPriceText style={{ fontSize: "32px" }}>{`SGD ${
                    apiData?.amount.toFixed(2) ?? "No data"
                  }`}</StyledPriceText>

                  {apiData?.booking_engine == 5 && (
                    <ul style={{ color: "#F2F1F0", margin: "7px 0px 0 15px" }}>
                      <li>
                        {" "}
                        <BodyTiny style={{ color: "#F2F1F0" }}>
                          Consultation price will be charged which will be paid
                          at the location{" "}
                        </BodyTiny>{" "}
                      </li>
                      <li>
                        {" "}
                        <BodyTiny style={{ color: "#F2F1F0" }}>
                          No consultation charges if you take a service at the
                          the location
                        </BodyTiny>
                      </li>
                    </ul>
                  )}

                  <RegisterButton
                    onClick={() => handleAddToFavourites(isFavorite)}
                    style={{
                      height: "33px",
                      width: "fit-content",
                      border: "none",
                      fontSize: "16px",
                      fontWeight: 600,
                      margin: "15px 0",
                    }}
                    icon={isFavorite ? <HeartFilled /> : <HeartOutlined />}
                  >
                    {` ${
                      isFavorite
                        ? "Remove from favourites"
                        : "Add to favourites"
                    }`}
                  </RegisterButton>
                </Col>
              </Row>
            </ServicCol>

            {carouselImages && carouselImages.length > 0 && (
              <Servic1Col
                span={14}
                style={{
                  maxHeight: "auto",
                  overflow: "hidden",
                  objectFit: "cover",
                }}
              >
                <CardsCarousel galleries={carouselImages} />
              </Servic1Col>
            )}
          </ServiceRow>

          <Row
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <Col span={20}>
              <SloteRow
                style={{
                  width: "100%",
                  display: "flex",
                  msFlexDirection: "row",
                  gap: "1rem",
                  justifyContent: "center",
                }}
              >
                <CustomCol>
                  <Row justify="center" align="middle">
                    <Col>
                      <CalenText>{`${
                        showDates?.[slideIndex]?.["0"]?.date.split(" ")[0]
                      } ${
                        showDates?.[slideIndex]?.["0"]?.date.split(" ")[2]
                      } `}</CalenText>

                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "1rem",
                          padding: "11px 0px",
                        }}
                      >
                        <LeftOutlined
                          onClick={handleScrollLeft}
                          style={{ color: "#000" }}
                        />

                        {showDates?.[slideIndex]?.map((item, index) => {
                          return (
                            <Button
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "11px",
                                border: "1px solid #7B7B7B",
                                color: "#2C2C2C",
                                fontSize: "16px",
                                fontWeight: 400,
                                height: "90px",
                                width: "4rem",
                                background:
                                  selectedDate?.date &&
                                  selectedDate?.date == item?.date
                                    ? "#EA8933"
                                    : excludedDays &&
                                      excludedDays.includes(item?.day)
                                    ? "rgba(0, 0, 0, 0.04)"
                                    : !selectedDate && index === 0
                                    ? "#ED510C"
                                    : "white",
                                color:
                                  selectedDate?.date == item?.date
                                    ? "#F2F1F0"
                                    : "#2C2C2C",
                              }}
                              disabled={
                                excludedDays && excludedDays.includes(item?.day)
                                  ? true
                                  : false
                              }
                              onClick={() => handleDateSelect(item)}
                            >
                              <span>
                                {item?.day.slice(0, 3)}
                                <br /> {item?.date.split(" ")[1]}
                              </span>
                            </Button>
                          );
                        })}

                        <RightOutlined
                          onClick={handleScrollRight}
                          style={{ color: "#000" }}
                        />
                      </Row>
                    </Col>
                  </Row>

                  <CalenText>Choose slots</CalenText>

                  {closeSubsDates && closeSubsDates.length > 0 && (
                    <Row
                      style={{
                        marginBottom: "40px",
                        background: "#72959A",
                        width: "fit-content",
                        display: "flex",
                        padding: "3px",
                        borderRadius: "5px",
                      }}
                    >
                      {closeSubsDates.map((item, index) => {
                        const [month, day, year] = item.split(" ");
                        const formattedDate = `${day} ${month}`;
                        return (
                          <Col key={index} style={{ margin: "0 5px" }}>
                            <Button
                              key={index}
                              onClick={() => {
                                HandleSessionDateClick(item);
                              }}
                              style={{
                                height: "25px",
                                width: "60px",
                                padding: "0",
                                color: index === 0 ? "white" : "black",
                                // background: (index ===0) ? '#ED510C' : 'white',
                                background: selectedSessionDate
                                  ? selectedSessionDate == item
                                    ? "#ED510C"
                                    : "white"
                                  : index === 0
                                  ? "#ED510C"
                                  : "white",
                                color:
                                  selectedSessionDate == item
                                    ? "#F2F1F0"
                                    : "#2C2C2C",
                                fontSize: "14px",
                                fontWeight: 400,
                              }}
                            >
                              {formattedDate}
                            </Button>
                          </Col>
                        );
                      })}
                    </Row>
                  )}

                  <Row style={{ justifyContent: "center", gap: "20px" }}>
                    <Col
                      style={{
                        display: "contents",
                        justifyContent: "center",
                        gap: "35px",
                      }}
                    >
                      {(apiData?.booking_engine == 3
                        ? allSlotsData && selectedSessionDate
                        : allSlotsData) &&
                        allSlotsData.map((item, index) => {
                          var isDisabled = isSlotDisabled(
                            item.startTime,
                            selectedDate?.date
                          );

                          if (item.resFlagDisable == "yes") {
                            isDisabled = new Boolean(true);
                          }

                          return (
                            <Button
                              style={{
                                background:
                                  selectedTime?.startTime == item?.startTime
                                    ? "#EA8933"
                                    : isDisabled
                                    ? "rgba(0, 0, 0, 0.04)"
                                    : !selectedTime?.startTime && index === 0
                                    ? "#ED510C"
                                    : "white",
                                color:
                                  selectedTime?.startTime == item?.startTime
                                    ? "white"
                                    : "black",
                              }}
                              disabled={isDisabled}
                              onClick={() => handleSlotClick(item)}
                            >
                              {item?.startTime}
                            </Button>
                          );
                        })}
                    </Col>
                  </Row>
                  {isResourceRequired && (
                    <Row
                      style={{
                        background: "#72959A",
                        marginTop: "20px",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px 20px",
                        borderRadius: "5px",
                      }}
                    >
                      <Col
                        style={{
                          color: "#F2F1F0",
                          fontSize: "16px",
                          fontWeight: 400,
                        }}
                      >
                        <UserOutlined /> {clickedRes[0]}
                      </Col>
                      {allResourceList.length > 1 && (
                        <Col>
                          {/* <Button>Change</Button> */}
                          <Dropdown
                            menu={menuProps}
                            trigger={["click"]}
                            placement="bottom"
                            arrow
                          >
                            <a>
                              <Button
                                style={{
                                  border: "none",
                                  background: "#2C2C2C",
                                  color: "#fff",
                                  borderRadius: "5px",
                                }}
                              >
                                Change
                              </Button>
                            </a>
                          </Dropdown>
                        </Col>
                      )}
                    </Row>
                  )}
                </CustomCol>

                {/* =========== Cart ============= */}
                {
                  <SelectedCol style={{ padding: "1rem" }}>
                    {isCartVisible &&
                      !(
                        apiData?.booking_engine == 5 ||
                        verifyPackge?.is_part_of_package
                      ) && (
                        <>
                          <Row
                            style={{
                              display: "flex",
                              gap: ".7rem",
                              borderBottom: "1px solid #CDCDCD",
                              paddingBottom: "1rem",
                            }}
                          >
                            <Col
                              style={{
                                width: "20px",
                                display: "flex",
                                alignItems: "start",
                                paddingTop: ".3rem",
                              }}
                            >
                              <Image
                                src={Xicon}
                                style={{
                                  width: "20px",
                                  display: "flex",
                                  alignItems: "start",
                                }}
                                onClick={handleClearCartItem}
                              />
                            </Col>

                            {apiData && apiData.booking_engine == 1 && (
                              <Col style={{ flexGrow: "4" }}>
                                <CardTitalText>
                                  {apiData?.["service-name"] || "No Data"}
                                </CardTitalText>
                                <SmallText>
                                  {selectedDate?.date
                                    ? `${selectedDate?.date || ""} | ${
                                        selectedTime?.startTime || ""
                                      } - ${selectedTime?.endTime || ""} | ${
                                        apiData?.["slots-meta-array"]?.["0"]?.[
                                          ServicePlaceId
                                        ]?.duration + " mins" ?? "No data"
                                      } `
                                    : ""}
                                </SmallText>

                                {isResourceRequired && (
                                  <Row
                                    style={{
                                      display: "flex",
                                      gap: ".7rem",
                                      padding: ".5rem 0",
                                    }}
                                  >
                                    <Col style={{ flexGrow: "4" }}>
                                      <SmallText>
                                        <strong>Selected Resource</strong>
                                      </SmallText>
                                    </Col>
                                    <SmallText>
                                      <strong>{clickedRes[0] || ""}</strong>
                                    </SmallText>
                                  </Row>
                                )}
                              </Col>
                            )}
                            {apiData && apiData.booking_engine == 2 && (
                              <Col style={{ flexGrow: "4" }}>
                                <CardTitalText>
                                  {apiData?.["service-name"] || "No Data"}
                                </CardTitalText>
                                <SmallText>
                                  {selectedTime?.startTime
                                    ? `${selectedTime?.startTime || ""} - ${
                                        selectedTime?.endTime || ""
                                      } | ${
                                        apiData?.["slots-meta-array"]?.["0"]?.[
                                          ServicePlaceId
                                        ]?.duration + " mins" ?? "No data"
                                      } `
                                    : ""}
                                </SmallText>
                                <StyledDateCol>
                                  <p style={{ fontSize: "12px" }}>
                                    Subscription Period
                                  </p>
                                  <SmallText style={{ fontSize: "14px" }}>
                                    {selectedDate?.date && openEndDate
                                      ? `${selectedDate?.date || ""} - ${
                                          openEndDate || ""
                                        }`
                                      : ""}
                                  </SmallText>{" "}
                                  <br />
                                </StyledDateCol>
                                {isResourceRequired && (
                                  <Row
                                    style={{
                                      display: "flex",
                                      gap: ".7rem",
                                      padding: ".5rem 0",
                                    }}
                                  >
                                    <Col style={{ flexGrow: "4" }}>
                                      <SmallText>
                                        <strong>Selected Resource</strong>
                                      </SmallText>
                                    </Col>
                                    <SmallText>
                                      <strong>{clickedRes[0] || ""}</strong>
                                    </SmallText>
                                  </Row>
                                )}
                              </Col>
                            )}
                            {apiData && apiData.booking_engine == 3 && (
                              <Col style={{ flexGrow: "4" }}>
                                <CardTitalText>
                                  {apiData?.["service-name"] || "No Data"}
                                </CardTitalText>
                                {cartData &&
                                  [cartData].length > 0 &&
                                  Object.keys(cartData)
                                    .sort()
                                    ?.map((item, index) => {
                                      let slotData = cartData[item];
                                      return (
                                        <>
                                          <Col>
                                            <SmallText key={index}>
                                              {slotData &&
                                                `${slotData.start_date} | `}
                                            </SmallText>
                                            <SmallText key={index}>
                                              {" "}
                                              {slotData &&
                                                `${
                                                  slotData.slot_start_time
                                                } - ${
                                                  slotData.slot_end_time
                                                } | ${
                                                  apiData?.[
                                                    "slots-meta-array"
                                                  ]?.["0"]?.[ServicePlaceId]
                                                    ?.duration + " mins" ??
                                                  "No data"
                                                } `}{" "}
                                            </SmallText>
                                          </Col>
                                        </>
                                      );
                                    })}

                                {isResourceRequired && (
                                  <Row
                                    style={{
                                      display: "flex",
                                      gap: ".7rem",
                                      padding: ".5rem 0",
                                    }}
                                  >
                                    <Col style={{ flexGrow: "4" }}>
                                      <SmallText>
                                        <strong>Selected Resource</strong>
                                      </SmallText>
                                    </Col>
                                    <SmallText>
                                      <strong>{clickedRes[0] || ""}</strong>
                                    </SmallText>
                                  </Row>
                                )}
                              </Col>
                            )}
                            <CardTitalText>
                              {apiData?.price || ""}
                            </CardTitalText>
                          </Row>

                          {/*                <Row style={{display:'flex', gap:'.7rem', padding:'.5rem 0' }}>
                                                    <Col style={{flexGrow: '4'}}> 
                                                        <SmallText><strong>Total</strong></SmallText>
                                                    </Col>
                                                    <SmallText><strong>{apiData?.price || ''}</strong></SmallText>
                                                </Row>

                                                <Row style={{display:'flex', gap:'.7rem', padding:'.5rem 0' }}>
                                                    <Col style={{flexGrow: '4'}}> 
                                                        <SmallText>Discount</SmallText>
                                                    </Col>
                                                    <SmallText><strong>$ 00.00</strong></SmallText>
                                                </Row>

                                                <Row style={{display:'flex', gap:'.7rem', borderBottom:'1px solid #CDCDCD', padding:'.5rem 0' }}>
                                                    
                                                    <Col style={{flexGrow: '4'}}> 
                                                        <SmallText>Tax(2%)</SmallText>
                                                    </Col>
                                                    <SmallText><strong>$ 00.00</strong></SmallText>
                                                </Row>  */}

                          <Row
                            style={{
                              display: "flex",
                              gap: ".7rem",
                              padding: "1rem 0",
                            }}
                          >
                            <Col style={{ flexGrow: "4" }}>
                              <CardTitalText>Total</CardTitalText>
                              <SmallText
                                style={{
                                  margin: "0px 0 8px 0",
                                  fontSize: "12px",
                                }}
                              >
                                Inclusive of applicable GST
                              </SmallText>
                            </Col>
                            <CardTitalText>
                              {apiData?.price || ""}
                            </CardTitalText>
                          </Row>
                        </>
                      )}

                    {(apiData?.booking_engine == 5 ||
                      verifyPackge?.is_part_of_package) && (
                      <SelectedCol span={24}>
                        {!(apiData?.booking_engine == 5) && (
                          <Row style={{ width: "100%", marginBottom: "5px" }}>
                            <Col
                              span={24}
                              style={{
                                background: "#72959A",
                                padding: "22px 39px",
                              }}
                            >
                              <BodyBold style={{ color: "#FFFFFF" }}>
                                {" "}
                                {`This service is in your ${
                                  verifyPackge?.order_details?.package_details
                                    ?.package_name || "no data"
                                }`}{" "}
                              </BodyBold>{" "}
                              <br />
                              <BodyReg
                                style={{ color: "#FFFFFF" }}
                              >{`You have ${
                                verifyPackge?.order_details?.package_details
                                  ?.count || "no data"
                              } ${
                                apiData?.["service-name"] || "no data"
                              } available`}</BodyReg>
                            </Col>
                          </Row>
                        )}

                        <Row style={{ display: "flex" }}>
                          <Col span={21}>
                            <H5>{apiData?.["service-name"] || "no data"}</H5>{" "}
                            <br />
                            <SmallText>
                              {selectedDate?.date
                                ? `${selectedDate?.date || ""} | ${
                                    selectedTime?.startTime || ""
                                  } - 
                                                            ${
                                                              selectedTime?.endTime ||
                                                              ""
                                                            } | ${
                                    apiData?.["slots-meta-array"]?.["0"]?.[
                                      ServicePlaceId
                                    ]?.duration + " mins" ?? "No data"
                                  } `
                                : ""}
                            </SmallText>
                            {isResourceRequired && (
                              <>
                                <Row
                                  style={{
                                    display: "flex",
                                    gap: ".7rem",
                                    padding: ".5rem 0",
                                  }}
                                >
                                  <Col style={{ flexGrow: "4" }}>
                                    <SmallText>
                                      <strong>Selected Resource</strong>
                                    </SmallText>
                                  </Col>
                                  <SmallText>
                                    <strong>{clickedRes[0] || ""}</strong>
                                  </SmallText>
                                </Row>
                              </>
                            )}
                            {apiData?.booking_engine == 5 && (
                              <>
                                <Row style={{ width: "100%", height: "100px" }}>
                                  <br />{" "}
                                  <BodySmallReg>Type a message</BodySmallReg>{" "}
                                  <br />
                                  <Input.TextArea
                                    allowClear
                                    value={appointMessage}
                                    maxLength={150}
                                    style={{ width: "100%", height: "100%" }}
                                    placeholder="Enter text here..."
                                    autoSize={{ minRows: 2, maxRows: 6 }}
                                    onChange={(e) => {
                                      setAppointMessage(e.target.value);
                                    }}
                                  />
                                </Row>

                                <Row
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginTop: "10px",
                                  }}
                                >
                                  <BodyDemi>Consultation price</BodyDemi>
                                  <BodyDemi>{apiData?.price}</BodyDemi>
                                </Row>
                              </>
                            )}
                          </Col>
                          {verifyPackge?.is_part_of_package && (
                            <Col>
                              <CardTitalText>
                                {apiData?.amount.toFixed(2) || ""}
                              </CardTitalText>
                            </Col>
                          )}
                        </Row>

                        {apiData?.booking_engine == 5 && (
                          <Row>
                            <BodyTiny>
                              Consultation price will be paid at the location{" "}
                              <br />
                              No consultation charges if you take a service at
                              the the location
                            </BodyTiny>
                          </Row>
                        )}

                        {verifyPackge?.is_part_of_package && (
                          <Row
                            style={{
                              display: "flex",
                              gap: ".7rem",
                              paddingTop: "1rem",
                            }}
                          >
                            <Col style={{ flexGrow: "4" }}>
                              <CardTitalText>Total</CardTitalText>
                            </Col>
                            <CardTitalText>{"$0.00"}</CardTitalText>
                          </Row>
                        )}
                      </SelectedCol>
                    )}

                    <Row>
                      <a style={{ width: "100%" }}>
                        <Button
                          onClick={() => HandleAddCart(cartData, clickedRes)}
                          style={{
                            padding: ".6rem 1rem",
                            height: "auto",
                            width: "100%",
                            border: "none",
                            background: "#2C2C2C",
                            color: "#F2F1F0",
                            borderRadius: "5px",
                          }}
                        >
                          <BodyDemi style={{ color: "#F2F1F0" }}>
                            {verifyPackge?.is_part_of_package
                              ? "Book Now"
                              : apiData?.booking_engine == 5
                              ? "Book Appointment"
                              : "Add to cart"}
                          </BodyDemi>
                        </Button>{" "}
                      </a>
                    </Row>

                    <Row
                      style={{
                        display: "flex",
                        gap: ".7rem",
                        borderBottom: "1px solid #CDCDCD",
                        padding: "1rem",
                        alignItems: "center",
                      }}
                    >
                      <Col
                        style={{
                          width: "20px",
                          display: "flex",
                          alignItems: "start",
                        }}
                      >
                        <Image
                          src={DeviceMobileCamera}
                          style={{
                            width: "20px",
                            display: "flex",
                            alignItems: "start",
                          }}
                        />
                      </Col>
                      <Col style={{ flexGrow: "4" }}>
                        <CardTitalText style={{ fontSize: "1rem" }}>
                          {apiData?.vendor_phone || "No Data"}
                        </CardTitalText>
                      </Col>
                      <a>
                        {" "}
                        <Button
                          style={{
                            height: "auto",
                            width: "100%",
                            border: "none",
                            background: "none",
                            color: "#2C2C2C",
                            border: "1px solid #2C2C2C",
                            borderRadius: "5px",
                          }}
                        >
                          <strong>Call</strong>{" "}
                        </Button>{" "}
                      </a>
                    </Row>
                  </SelectedCol>
                }
              </SloteRow>

              <Row>
                <Col span={24} style={{ margin: "10px 0" }}>
                  <CustomTitleText>
                    Popular services by {apiData?.["vendor-name"]}
                  </CustomTitleText>
                  <Row gutter={28}>
                    {apiData &&
                      apiData?.["similar-services"] &&
                      apiData?.["similar-services"]?.map((item, key) => {
                        return (
                          <>
                            <Col
                              xl={6}
                              lg={8}
                              sm={12}
                              xs={24}
                              style={{ display: "flex" }}
                            >
                              <ListingCard cardData={item} />
                            </Col>
                          </>
                        );
                      })}
                  </Row>
                </Col>
              </Row>

              {apiData &&
                apiData?.rating_review &&
                apiData?.rating_review.length > 0 && (
                  <Row style={{ margin: "60px 0" }}>
                    <Col xl={24} lg={24}>
                      <Row style={{ width: "100%", marginBottom: "15px" }}>
                        <TitleBold style={{ color: "#7B7B7B" }}>
                          Reviews
                        </TitleBold>{" "}
                      </Row>
                      {apiData?.rating_review &&
                        apiData?.rating_review.map((item) => {
                          return (
                            <>
                              <Row
                                gutter={20}
                                style={{ width: "100%", marginBottom: "30px" }}
                              >
                                <Col
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  {/* <Avatar><Image src={item?.profile_image} height={80} width={80} alt="No Preview"/></Avatar> */}
                                  <Avatar size="large" icon={<UserOutlined />}>
                                    {/* <Image height={100} width={100} alt="No Preview"/> */}
                                  </Avatar>
                                  <BodyReg>
                                    {item?.userName.slice(0, 10) || "no data"}
                                  </BodyReg>
                                </Col>
                                <Col
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                  }}
                                >
                                  {/* <Row> { <StarFilled style={{color:'#EA8933', fontSize:'20px'}} /> }</Row> */}
                                  <Row>
                                    {" "}
                                    {
                                      <Rate
                                        disabled
                                        allowHalf
                                        defaultValue={Number(
                                          item?.serviceRating
                                        )}
                                        style={{
                                          color: "#EA8933",
                                          fontSize: "10px",
                                        }}
                                      />
                                    }
                                  </Row>
                                  <Row>
                                    <BodyReg> {item?.comment}</BodyReg>
                                  </Row>
                                </Col>
                              </Row>
                            </>
                          );
                        })}
                    </Col>
                  </Row>
                )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ServiceDetails;
