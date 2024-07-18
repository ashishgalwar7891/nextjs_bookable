import { Fragment, useEffect, useRef, useState } from "react";
import {
  UploadOutlined,
  CameraOutlined,
  CloseOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
  AppleFilled,
  CopyOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  RightOutlined,
  InfoCircleFilled,
  SmileOutlined,
} from "@ant-design/icons";
import {
  CustomButton,
  BoxRow,
  BoxCol,
  CustomCardButton,
  CustomCol,
  CustomForm,
  CustomSmText,
  CustomText,
  CustomVendorRow,
  StyledRow,
  StyledText,
  StyledTitleText,
  SingleCol,
} from "./styledComponent";
import {
  Popover,
  Col,
  Row,
  Form,
  Input,
  Select,
  Checkbox,
  Tag,
  Upload,
  Radio,
  TimePicker,
  DatePicker,
  Button,
  Space,
  Switch,
  Table,
  Spin,
  InputNumber,
  Typography,
  Flex,
  Divider,
  notification,
  Popconfirm,
  Modal,
} from "antd";
import { CustomGreyText, CustomTitle } from "../../styledComponent";
import dayjs from "dayjs";
import {
  AddVendPackageService,
  AddVendService,
  GetAllLabelsVendService,
  GetServicesVendService,
  VENDOR_LOCATIONS_AND_RESOURCES,
  CREATE_SLOTS_API,
  BIZ_ADD_SERVICE,
  BIZ_VENDOR_SERVICES_LIST,
  ALLOW_FOR_PACKAGE,
  STORAGE_URL,
} from "@/Services/vendorService.services";
import { StyledHr } from "@/components/vendor-payment/styledComponent";
import {
  CustCamIconTxt,
  CustVendFormTxt,
  CustomUploadButton,
  CustomVendorFormRow,
} from "@/components/vendor-details/styledComponent";
import {
  RegisterFormButton,
  BodySmallReg,
  CustomCheckbox,
} from "@/styles/styledComponent";
import {
  getDaysOfWeekBetweenDates,
  removeUndefinedValuesFromObject,
} from "@/utils/commonMethods";
import moment, { duration, localeData } from "moment";
import InfoModal from "@/lib/commonComponent/ConfirmModal";
import PackageCard from "@/lib/commonComponent/CustomPackageCard";
import CustomPopconfirm from "../CustomPopOver";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Content } from "antd/es/layout/layout";
import { escape, remove } from "lodash";
import { useRouter } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";
import {GetAllPlansService} from '@/Services/vendorForms.services';
import {GetVendorDetailsService} from '@/Services/vendorProfile.services';

const { RangePicker } = DatePicker;
const ServiceForm = () => {
  const router = new useRouter();
  const editorRef = useRef(null);
  const [api, contextHolder] = notification.useNotification();
  const daysOfWeek = [
    { value: "Sunday", label: "Sunday" },
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
  ];

  const dailySessionDuration = [
    { value: "1", label: "1 Day" },
    { value: "2", label: "2 Day" },
    { value: "3", label: "3 Day" },
    { value: "4", label: "4 Day" },
    { value: "5", label: "5 Day" },
    { value: "6", label: "6 Day" },
  ];
  const weeklySessionDuration = [
    { value: "1", label: "1 Week" },
    { value: "2", label: "2 Week" },
    { value: "3", label: "3 Week" },
    { value: "4", label: "4 Week" },
  ];
  const monthlySessionDuration = [
    { value: "1", label: "1 Month" },
    { value: "2", label: "2 Month" },
    { value: "3", label: "3 Month" },
  ];

  // LOADER

  const [pageLoader, setPageLoader] = useState(true);
  const [packageLoader, setPackageLoader] = useState(false);
  const [buttonLoader, setButtonLoaders] = useState(false);
  const [draftbuttonLoader, setDraftButtonLoaders] = useState(false);
  const [previewbuttonLoader, setPreviewButtonLoaders] = useState(false);

  const [slotLoader, setSlotLoader] = useState(false);

  // Error
  const [apiErrors, setApiErrors] = useState("");
  const [API_DATA, SET_API_DATA] = useState([]);
  const [minDate, setMinDate] = useState("");

  // Api State
  const [locationsAndResources, setLocationsAndResources] = useState([]);
  const [serviceLabels, setServiceLabels] = useState();
  const [vendorServices, setVendorServices] = useState();

  // Show Hidden div
  const [show_service_specifications, set_show_service_specifications] =
    useState(false);
  const [
    show_assign_location_and_resource,
    set_show_assign_location_and_resource,
  ] = useState(false);
  const [show_multiple_booking, set_show_multiple_booking] = useState(false);
  const [show_slots_table, set_show_slots_table] = useState(false);
  const [show_open_subscription_specific, set_show_open_subscription_specific] =
    useState(false);
  const [show_price_box, set_show_price_box] = useState(false);
  const [show_image_box, set_show_image_box] = useState(false);

  // Booking Class
  const [firstEngineClass, setFirstEngineClass] = useState("engine-box");
  const [secondEngineClass, setSecondEngineClass] = useState("engine-box");
  const [thirdEngineClass, setThirdEngineClass] = useState("engine-box");
  const [fourthEngineClass, setFourthEngineClass] = useState("engine-box");
  //  const [fifthEngineClass, setFifthEngineClass] = useState('engine-box');
  const [sixthEngineClass, setSixthEngineClass] = useState("engine-box");

  // set state for API data
  const [title, setTitle] = useState("");
  const [industry, setIndustry] = useState();
  const [category, setCategory] = useState("");
  const [labels, setLabels] = useState([]);
  const [engine, setEngine] = useState("");
  const [serviceSpecifications, setServiceSpecifications] = useState({
    gender: "",
    age: "",
  });
  const [features, setFeatures] = useState({
    feature1: "",
    feature2: "",
    feature3: "",
    feature4: " ",
    feature5: "",
  });
  const [benefits, setBenefits] = useState({
    benefit1: "",
    benefit2: "",
    benefit3: "",
    benefit4: "",
    benefit5: "",
  });
  const [about, setAbout] = useState("");
  const [description, set_description] = useState("");
  const [openSubscriptionSpecific, setOpenSubscriptionSpecific] = useState({
    year: "",
    month: "",
    days: "",
  });
  const [locationData, setLocationData] = useState([]);
  const [resourceRequired, setResourceRequired] = useState(1);
  const [slotsData, setSlotsData] = useState("");
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const [disabledPreview, setDisabledPreview] = useState(true);

  const [discount, setDiscount] = useState(0);
  const [packages, setPackages] = useState([]);
  const [packagesValid, setPackagesValid] = useState({
    year: "",
    month: "",
    days: "",
  });
  const [multipleBooking, setMultipleBooking] = useState(false);
  const [multipleBookingData, setMultipleBookingData] = useState({
    min: "",
    max: "",
  });
  const [pricing, setPricing] = useState({
    name: "SGD",
    symbol: "$",
    price: null,
  });
  const [ADD_SERVICE_FORM_DATA_RESPONSE, SET_ADD_SERVICE_FORM_DATA_RESPONSE] =
    useState("");
  const [CHECK_PACKAGE_ALLOW, SET_CHECK_PACKAGE_ALLOW] = useState(false);
  const [servicePublicStatus, setServicePublicStatus] = useState("public");
  const [status, setStatus] = useState(1);
  const [plan, setPlan] = useState('');
  const [numOfEngine, SetNumOfEngine] = useState('');

  console.log("locationsAndResources====>>>", locationsAndResources);

  // Api Data data()
  const getServiceLabels = async () => {
    const fetchLabels = await GetAllLabelsVendService();
    const labelsInfo = fetchLabels?.response?.data?.data?.Labels;
    setServiceLabels(labelsInfo);
  };

  const getLocationsAndResources = async () => {
    const VENDOR_LOCATIONS_AND_RESOURCES_FORM_DATA = new FormData();
    VENDOR_LOCATIONS_AND_RESOURCES_FORM_DATA.append(
      "user_id",
      localStorage.getItem("userId")
    );
    const result = await VENDOR_LOCATIONS_AND_RESOURCES(
      VENDOR_LOCATIONS_AND_RESOURCES_FORM_DATA
    );
    console.log("VENDOR_LOCATIONS_AND_RESOURCES", result);
    setLocationsAndResources(result.response.data);
  };
  const getVendorServicesByLocation = async (location_id) => {
    const VENDOR_SERVICES_DATA_FORM = new FormData();
    VENDOR_SERVICES_DATA_FORM.append("user_id", localStorage.getItem("userId"));
    VENDOR_SERVICES_DATA_FORM.append("location_id", location_id);
    const result = await BIZ_VENDOR_SERVICES_LIST(VENDOR_SERVICES_DATA_FORM);

    //  console.log(result);
    const AllSERVICES = result.response.data;
    if (AllSERVICES.length > 0) {
      //alert()
      const packageData = {
        location_id: location_id,
        locationServices: AllSERVICES,
        services_selected: [],
        services_count: [],
      };
      setPackages([...packages, packageData]);
    }
    //console.log(result);
    // setVendorServices(result.response.data);
  };
  const getVendorServicesByLocationCheck = async (location_id) => {
    const VENDOR_SERVICES_DATA_FORM = new FormData();
    VENDOR_SERVICES_DATA_FORM.append("user_id", localStorage.getItem("userId"));
    VENDOR_SERVICES_DATA_FORM.append("location_id", location_id);
    const result = await BIZ_VENDOR_SERVICES_LIST(VENDOR_SERVICES_DATA_FORM);

    //console.log('AllSERVICES', result);
    const AllSERVICES = result.response.data;
    if (AllSERVICES.length > 0) {
      SET_CHECK_PACKAGE_ALLOW(true);
    }
    //console.log(result);
    setVendorServices(result.response.data);
  };
  const getLocationSlots = async (data, location_id) => {
    var elements = document.querySelectorAll(".unchecked-checkbox");
    elements.forEach(function (element) {
      element.checked = false;
    });
    const result = await CREATE_SLOTS_API(data);
    // const getLocation = locationData.find(obj => obj.hasOwnProperty('location_id') && obj['location_id'] === location_id);
    //delete getLocation['slots'];
    // console.log(result.response.data);
    if (result?.response?.data?.status !== 422) {
      const findIndex = locationData.findIndex(
        (obj) =>
          obj.hasOwnProperty("location_id") &&
          obj["location_id"] === location_id
      );
      setLocationData((prevArray) => {
        const newArray = [...prevArray];
        newArray[findIndex]["slots"] = result.response.data;
        return newArray;
      });
    }
  };
  const checkAllowForPackage = async () => {
    const ALLOW_FOR_PACKAGE_DATA_FORM = new FormData();
    ALLOW_FOR_PACKAGE_DATA_FORM.append(
      "user_id",
      localStorage.getItem("userId")
    );
    const result = await ALLOW_FOR_PACKAGE(ALLOW_FOR_PACKAGE_DATA_FORM);
    const data = result.response.data;
    if (data.count > 0) {
      SET_CHECK_PACKAGE_ALLOW(true);
    }
  };
  const getMinDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; // January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    today = yyyy + "-" + mm + "-" + dd;
    setMinDate(today);
  };
  // Use effect
  useEffect(() => {
    const userId = localStorage.getItem('userId')
    getServiceLabels();
    checkPageStatus(userId);
    getLocationsAndResources();
    setIndustry(localStorage.getItem("v_industry"));
    setCategory(localStorage.getItem("v_category"));
    getMinDate();
    setPageLoader(false);
    checkAllowForPackage();
  }, []);
  
  
  const checkPageStatus = async (userId) => {
    const response = await GetAllPlansService();
    console.log("GetAllPlansService",response)
    const data = response?.response?.data?.$vendorPlans.map((item) => {
      const meta = JSON.parse(item.meta);
      return { ...item, meta };
    });
    setPlan(data);
    GetVendorDetailsService(userId)
    .then((res)=>{
      SET_API_DATA(res?.response?.data?.data?.plansInfo)
      checkVendorPlanAndShowEngines(res?.response?.data?.data?.plansInfo?.plan_name,data)
    }).catch((err)=>{
      console.log(err)
    })
  };

  // Handle labels
  const removeLabels = (item) => {
    setLabels(labels.filter((i) => i !== item));
  };
  const handleLabels = (value) => {
    setLabels([...labels, value]);
  };

  // Handle Booking Engine
  const handleBookingEngine = (value) => {
    setPackageLoader(true);
    setEngine(value);
    if (value === 1 || value === 6) {
      if (value === 6) {
        setSixthEngineClass("engine-box engine-active");
        set_show_price_box(false);
        setDisabledSubmit(false);
        setPricing({ ...pricing, price: 0 });
      } else {
        setSixthEngineClass("engine-box");
      }
      if (value === 1) {
        setFirstEngineClass("engine-box engine-active");
      } else {
        setFirstEngineClass("engine-box");
      }

      setSecondEngineClass("engine-box");
      setThirdEngineClass("engine-box");
      setFourthEngineClass("engine-box");
      set_show_open_subscription_specific(false);
      set_show_image_box(true);
      set_show_service_specifications(true);
    }

    if (value === 2) {
      setFirstEngineClass("engine-box");
      setSecondEngineClass("engine-box engine-active");
      setThirdEngineClass("engine-box");
      setFourthEngineClass("engine-box");
      setSixthEngineClass("engine-box");
      set_show_open_subscription_specific(true);
      set_show_image_box(true);
      set_show_service_specifications(true);
    }
    if (value === 3) {
      setFirstEngineClass("engine-box");
      setSecondEngineClass("engine-box");
      setSixthEngineClass("engine-box");
      setThirdEngineClass("engine-box engine-active");
      setFourthEngineClass("engine-box");
      set_show_open_subscription_specific(false);
      set_show_image_box(true);
      set_show_service_specifications(true);
    }
    if (value === 4) {
      if (CHECK_PACKAGE_ALLOW) {
        setFirstEngineClass("engine-box");
        setSecondEngineClass("engine-box");
        setSixthEngineClass("engine-box");
        setThirdEngineClass("engine-box");
        setFourthEngineClass("engine-box engine-active");
        set_show_open_subscription_specific(false);
        set_show_image_box(true);
        set_show_service_specifications(true);
      } else {
        setFirstEngineClass("engine-box");
        setSixthEngineClass("engine-box");
        setSecondEngineClass("engine-box");
        setThirdEngineClass("engine-box");
        setFourthEngineClass("engine-box engine-active");
        set_show_open_subscription_specific(false);
        set_show_image_box(false);
        set_show_service_specifications(false);
        set_show_price_box(false);
      }
    }
    setLocationData([]);
    setPackageLoader(false);
  };

  // Images upload
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const handleImageChange = (e) => {
    const files = e.target.files;
    if (
      (files[0].type === "image/jpeg" ||
        files[0].type === "image/jpg" ||
        files[0].type === "image/png") &&
      files[0].size < 2000001
    ) {
      for (let i = 0; i < files.length; i++) {
        setImages([...images, files[i]]);
      }
      set_show_assign_location_and_resource(true);
      document.getElementById("images-error").innerHTML = "";

      if (engine !== 6) {
        set_show_price_box(true);
      }

      set_show_slots_table(true);
      set_show_multiple_booking(true);
      console.log(selectedImages);
    } else {
      document.getElementById("images-error").innerHTML =
        "Image is not valid,Please check type and size of image.";
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setSelectedImages((prevSelectedImages) =>
      prevSelectedImages.filter((_, i) => i !== index)
    );
  };

  // Handle Location

  const handleMultipleBooking = (value, type) => {
    if (type === "min") {
      setMultipleBookingData({ ...multipleBooking, min: value });
    }
    if (type === "max") {
      setMultipleBookingData({ ...multipleBooking, max: value });
    }
  };

  const handleLocationChange = (location_id, timing, location_name) => {
    if (
      locationData.find(
        (obj) =>
          obj.hasOwnProperty("location_id") &&
          obj["location_id"] === location_id
      )
    ) {
      const filterLocationData = locationData.filter(
        (obj) =>
          !(
            obj.hasOwnProperty("location_id") &&
            obj["location_id"] === location_id
          )
      );
      setLocationData("filterLocationData==>", filterLocationData);
      document
        .getElementById("location-checked-" + location_id)
        .setAttribute("checked", "");
      //  document.getElementById("locationData-table-heading-" + location_id).innerHTML = '';
      //  document.getElementById("location-" + location_id + "-resource").style.display = "none";
    } else {
      const LocationData = {
        location_id: location_id,
        location_title: location_name,
        timing: timing,
      };

      setLocationData([...locationData, LocationData]);
      document
        .getElementById("location-checked-" + location_id)
        .setAttribute("checked", "checked");
      // document.getElementById("location-" + location_id + "-resource").style.display = "block";
    }
  };

  const handlePackageLocationChange = (e, location_id) => {
    if (e.target.checked) {
      getVendorServicesByLocation(location_id);
    } else {
      if (
        packages.find(
          (obj) =>
            obj.hasOwnProperty("location_id") &&
            obj["location_id"] === location_id
        )
      ) {
        const filterData = packages.filter(
          (obj) =>
            !(
              obj.hasOwnProperty("location_id") &&
              obj["location_id"] === location_id
            )
        );
        setPackages(filterData);
      }
    }
  };
  const handlePackageServiceChange = (e, location_id, service_id) => {
    if (
      packages.find(
        (obj) =>
          obj.hasOwnProperty("location_id") &&
          obj["location_id"] === location_id
      )
    ) {
      const findIndex = packages.findIndex(
        (obj) =>
          obj.hasOwnProperty("location_id") &&
          obj["location_id"] === location_id
      );
      setPackages((prevArray) => {
        const newArray = [...prevArray];
        if (
          newArray[findIndex]["services_selected"].indexOf(service_id) !== -1
        ) {
          var newIndex =
            newArray[findIndex]["services_selected"].indexOf(service_id);
          newArray[findIndex]["services_selected"].splice(newIndex, 1);
          newArray[findIndex]["services_count"].splice(newIndex, 1);
          return newArray;
        } else {
          newArray[findIndex]["services_selected"].push(service_id);
          newArray[findIndex]["services_count"].push(1);
          return newArray;
        }
      });
    }
  };
  const handlePackageCountChange = (e, location_id, service_id) => {
    if (
      packages.find(
        (obj) =>
          obj.hasOwnProperty("location_id") &&
          obj["location_id"] === location_id
      )
    ) {
      const findIndex = packages.findIndex(
        (obj) =>
          obj.hasOwnProperty("location_id") &&
          obj["location_id"] === location_id
      );
      setPackages((prevArray) => {
        const newArray = [...prevArray];
        var newIndex =
          newArray[findIndex]["services_selected"].indexOf(service_id);
        newArray[findIndex]["services_count"][newIndex] = e.target.value;
        return newArray;
      });
    }
  };

  const handleResources = (value, location_id) => {
    var elements = document.querySelectorAll(".slot-box");
    elements.forEach(function (element) {
      element.style.display = "none";
    });
    if (value.length > 0) {
      if (
        locationData.find(
          (obj) =>
            obj.hasOwnProperty("location_id") &&
            obj["location_id"] === location_id
        )
      ) {
        const getLocation = locationData.find(
          (obj) =>
            obj.hasOwnProperty("location_id") &&
            obj["location_id"] === location_id
        );
        getLocation["resources"] = value;
        getLocation["slots"] = "";
        const filterLocationData = locationData.filter(
          (obj) =>
            !(
              obj.hasOwnProperty("location_id") &&
              obj["location_id"] === location_id
            )
        );
        setLocationData([...filterLocationData, getLocation]);
      }
    } else {
      if (
        locationData.find(
          (obj) =>
            obj.hasOwnProperty("location_id") &&
            obj["location_id"] === location_id
        )
      ) {
        const getLocation = locationData.find(
          (obj) =>
            obj.hasOwnProperty("location_id") &&
            obj["location_id"] === location_id
        );
        delete getLocation.resources;
        delete getLocation.slots;
        const filterLocationData = locationData.filter(
          (obj) =>
            !(
              obj.hasOwnProperty("location_id") &&
              obj["location_id"] === location_id
            )
        );
        setLocationData([...filterLocationData, getLocation]);
      }
    }
  };
  const handleTiming = (value, location_id, timing) => {
    var elements = document.querySelectorAll(".slot-box");
    elements.forEach(function (element) {
      element.style.display = "none";
    });
    if (
      locationData.find(
        (obj) =>
          obj.hasOwnProperty("location_id") &&
          obj["location_id"] === location_id
      )
    ) {
      const getLocation = locationData.find(
        (obj) =>
          obj.hasOwnProperty("location_id") &&
          obj["location_id"] === location_id
      );
      getLocation["timing"] = timing;
      getLocation["slots"] = "";
      if (value === 1) {
        document
          .getElementById("custom-start-time-" + location_id)
          .setAttribute("disabled", true);
        document
          .getElementById("custom-end-time-" + location_id)
          .setAttribute("disabled", true);
        document.getElementById("custom-start-time-" + location_id).value = "";
        document.getElementById("custom-end-time-" + location_id).value = "";
        document
          .getElementById("custom-checkbox-span-custom-" + location_id)
          .classList.remove("active");
        document
          .getElementById("custom-checkbox-span-business-" + location_id)
          .classList.add("active");
      } else {
        document
          .getElementById("custom-start-time-" + location_id)
          .removeAttribute("disabled");
        document
          .getElementById("custom-end-time-" + location_id)
          .removeAttribute("disabled");
        document
          .getElementById("custom-checkbox-span-custom-" + location_id)
          .classList.add("active");
        document
          .getElementById("custom-checkbox-span-business-" + location_id)
          .classList.remove("active");
      }
      const filterLocationData = locationData.filter(
        (obj) =>
          !(
            obj.hasOwnProperty("location_id") &&
            obj["location_id"] === location_id
          )
      );
      setLocationData([...filterLocationData, getLocation]);
    }
  };
  const customTimingStart = (event, location_id, start_time, end_time) => {
    if (event.target.value < start_time) {
      document.getElementById("custom-start-time-" + location_id).value = "";
      InfoModal({
        type: "error",
        title: "Selected Time Error",
        text: "Start time must be big to business start time.",
      });
    } else {
      var elements = document.querySelectorAll(".slot-box");
      elements.forEach(function (element) {
        element.style.display = "none";
      });
      if (
        locationData.find(
          (obj) =>
            obj.hasOwnProperty("location_id") &&
            obj["location_id"] === location_id
        )
      ) {
        const getLocation = locationData.find(
          (obj) =>
            obj.hasOwnProperty("location_id") &&
            obj["location_id"] === location_id
        );
        getLocation["timing"] = { hoursType: 0, startTime: event.target.value };
        getLocation["slots"] = "";
        const filterLocationData = locationData.filter(
          (obj) =>
            !(
              obj.hasOwnProperty("location_id") &&
              obj["location_id"] === location_id
            )
        );
        setLocationData([...filterLocationData, getLocation]);
      }
    }
  };
  const customTimingEnd = (event, location_id, start_time, end_time) => {
    if (event.target.value > end_time) {
      document.getElementById("custom-end-time-" + location_id).value = "";
      InfoModal({
        type: "error",
        title: "Selected Time Error",
        text: "End time must be small to business end time.",
      });
    } else {
      var elements = document.querySelectorAll(".slot-box");
      elements.forEach(function (element) {
        element.style.display = "none";
      });
      if (
        locationData.find(
          (obj) =>
            obj.hasOwnProperty("location_id") &&
            obj["location_id"] === location_id
        )
      ) {
        const getLocation = locationData.find(
          (obj) =>
            obj.hasOwnProperty("location_id") &&
            obj["location_id"] === location_id
        );
        getLocation["timing"] = {
          ...getLocation["timing"],
          endTime: event.target.value,
        };
        getLocation["slots"] = "";
        const filterLocationData = locationData.filter(
          (obj) =>
            !(
              obj.hasOwnProperty("location_id") &&
              obj["location_id"] === location_id
            )
        );
        setLocationData([...filterLocationData, getLocation]);
      }
    }
  };
  const openSlotBox = (e, location_id, title) => {
    var elements = document.querySelectorAll(".slot-box");
    var spans = document.querySelectorAll(".slot-location-list-heading");
    elements.forEach(function (element) {
      element.style.display = "none";
    });
    spans.forEach(function (element) {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
    document.getElementById("slot-box-" + location_id).style.display = "block";
    //document.getElementById("locationData-table-heading-" + location_id).innerHTML = title;
  };

  const handleDuration = (value, location_id) => {
    //  console.log("handleDuration...", value);
    if (value > 0) {
      if (
        locationData.find(
          (obj) =>
            obj.hasOwnProperty("location_id") &&
            obj["location_id"] === location_id
        )
      ) {
        const findIndex = locationData.findIndex(
          (obj) =>
            obj.hasOwnProperty("location_id") &&
            obj["location_id"] === location_id
        );
        setLocationData((prevArray) => {
          const newArray = [...prevArray];
          newArray[findIndex]["duration"] = value;
          return newArray;
        });
      }
    }
  };
  const handleBufferTime = (value, location_id) => {
    if (value > 0) {
      if (
        locationData.find(
          (obj) =>
            obj.hasOwnProperty("location_id") &&
            obj["location_id"] === location_id
        )
      ) {
        const findIndex = locationData.findIndex(
          (obj) =>
            obj.hasOwnProperty("location_id") &&
            obj["location_id"] === location_id
        );
        setLocationData((prevArray) => {
          const newArray = [...prevArray];
          newArray[findIndex]["buffer"] = value;
          return newArray;
        });
      }
    }
  };
  const handleExcludeDays = (value, location_id) => {
    if (value.length > 0) {
      if (
        locationData.find(
          (obj) =>
            obj.hasOwnProperty("location_id") &&
            obj["location_id"] === location_id
        )
      ) {
        const findIndex = locationData.findIndex(
          (obj) =>
            obj.hasOwnProperty("location_id") &&
            obj["location_id"] === location_id
        );
        setLocationData((prevArray) => {
          const newArray = [...prevArray];
          newArray[findIndex]["exclude_days"] = value;
          return newArray;
        });
      }
    }
  };
  const removeExcludeDays = (value, location_id) => {
    if (
      locationData.find(
        (obj) =>
          obj.hasOwnProperty("location_id") &&
          obj["location_id"] === location_id
      )
    ) {
      const findIndex = locationData.findIndex(
        (obj) =>
          obj.hasOwnProperty("location_id") &&
          obj["location_id"] === location_id
      );
      setLocationData((prevArray) => {
        const newArray = [...prevArray];
        newArray[findIndex]["exclude_days"].filter((i) => i !== value);
        return newArray;
      });
    }
  };
  const handleStartDate = (e, location_id) => {
    if (
      locationData.find(
        (obj) =>
          obj.hasOwnProperty("location_id") &&
          obj["location_id"] === location_id
      )
    ) {
      const findIndex = locationData.findIndex(
        (obj) =>
          obj.hasOwnProperty("location_id") &&
          obj["location_id"] === location_id
      );
      setLocationData((prevArray) => {
        const newArray = [...prevArray];
        newArray[findIndex]["start_date"] = e.target.value;
        return newArray;
      });
      var maxDate = new Date(e.target.value);
      maxDate.setDate(maxDate.getDate() + 90);

      var maxDd = maxDate.getDate();
      var maxMm = maxDate.getMonth() + 1; // January is 0!
      var maxYyyy = maxDate.getFullYear();

      if (maxDd < 10) {
        maxDd = "0" + maxDd;
      }

      if (maxMm < 10) {
        maxMm = "0" + maxMm;
      }
      var maxDateFormatted = maxYyyy + "-" + maxMm + "-" + maxDd;
      document
        .getElementById("end-date-" + location_id)
        .setAttribute("min", e.target.value);
      document
        .getElementById("end-date-" + location_id)
        .setAttribute("max", maxDateFormatted);
      document
        .getElementById("end-date-" + location_id)
        .removeAttribute("disabled");
    }
  };
  const handleEndDate = (e, location_id) => {
    if (
      locationData.find(
        (obj) =>
          obj.hasOwnProperty("location_id") &&
          obj["location_id"] === location_id
      )
    ) {
      const findIndex = locationData.findIndex(
        (obj) =>
          obj.hasOwnProperty("location_id") &&
          obj["location_id"] === location_id
      );
      setLocationData((prevArray) => {
        const newArray = [...prevArray];
        newArray[findIndex]["end_date"] = e.target.value;
        return newArray;
      });
    }
  };

  const getSlots = (location_id) => {
    setSlotLoader(true);
    setSlotsData("");
    if (
      locationData.find(
        (obj) =>
          obj.hasOwnProperty("location_id") &&
          obj["location_id"] === location_id
      )
    ) {
      const getLocation = locationData.find(
        (obj) =>
          obj.hasOwnProperty("location_id") &&
          obj["location_id"] === location_id
      );
      const FORM_DATA = new FormData();
      if (getLocation?.duration) {
        FORM_DATA.append("duration", getLocation?.duration);
        document.getElementById("duration-error-" + location_id).innerHTML = "";
      } else {
        document.getElementById("duration-error-" + location_id).innerHTML =
          "Please enter a duration";
      }
      if (getLocation?.buffer) {
        FORM_DATA.append("buffer", getLocation?.buffer);
        document.getElementById("buffer-error-" + location_id).innerHTML = "";
      } else {
        document.getElementById("buffer-error-" + location_id).innerHTML =
          "Please enter a duration";
      }
      if (getLocation?.start_date) {
        FORM_DATA.append("start_date", getLocation?.start_date);
        document.getElementById("start_date-error-" + location_id).innerHTML =
          "";
      } else {
        document.getElementById("start_date-error-" + location_id).innerHTML =
          "Please enter a duration";
      }
      if (getLocation?.end_date) {
        FORM_DATA.append("end_date", getLocation?.end_date);
        document.getElementById("end_date-error-" + location_id).innerHTML = "";
      } else {
        document.getElementById("end_date-error-" + location_id).innerHTML =
          "Please enter a duration";
      }
      // console.log('ddd',getLocation);
      FORM_DATA.append("start_time", getLocation?.timing.startTime);
      FORM_DATA.append("end_time", getLocation?.timing.endTime);
      FORM_DATA.append("exclude_days", getLocation?.exclude_days);
      getLocationSlots(FORM_DATA, location_id);
      setSlotLoader(false);
    }
  };

  const removeTimeSlot = (location_id, slot_row_index, slot_time_index) => {
    if (
      locationData.find(
        (obj) =>
          obj.hasOwnProperty("location_id") &&
          obj["location_id"] === location_id
      )
    ) {
      const getLocation = locationData.find(
        (obj) =>
          obj.hasOwnProperty("location_id") &&
          obj["location_id"] === location_id
      );
      getLocation["slots"][slot_row_index]["allSlots"].splice(
        slot_time_index,
        1
      );
      const filterLocationData = locationData.filter(
        (obj) =>
          !(
            obj.hasOwnProperty("location_id") &&
            obj["location_id"] === location_id
          )
      );
      setLocationData([...filterLocationData, getLocation]);
    }
  };

  const setBlackOutDateForSlotTime = (
    putDate,
    location_id,
    slot_row_index,
    slot_time_index
  ) => {
    if (
      locationData.find(
        (obj) =>
          obj.hasOwnProperty("location_id") &&
          obj["location_id"] === location_id
      )
    ) {
      const findIndex = locationData.findIndex(
        (obj) =>
          obj.hasOwnProperty("location_id") &&
          obj["location_id"] === location_id
      );
      setLocationData((prevArray) => {
        const newArray = [...prevArray];
        if (
          newArray[findIndex]["slots"][slot_row_index]["allSlots"][
            slot_time_index
          ]["blackList"].includes(putDate)
        ) {
          const valueIndex =
            newArray[findIndex]["slots"][slot_row_index]["allSlots"][
              slot_time_index
            ]["blackList"].indexOf(putDate);
          newArray[findIndex]["slots"][slot_row_index]["allSlots"][
            slot_time_index
          ]["blackList"].splice(valueIndex, 1);
        } else {
          newArray[findIndex]["slots"][slot_row_index]["allSlots"][
            slot_time_index
          ]["blackList"].push(putDate);
        }
        return newArray;
      });
    }
  };

  const openBizModel = (id) => {
    document.getElementById(id).style.display = "block";
  };
  const closeBizModel = (id) => {
    document.getElementById(id).style.display = "none";
  };

  const handleSession = (value, location_id) => {
    // console.log(e);
    if (
      locationData.find(
        (obj) =>
          obj.hasOwnProperty("location_id") &&
          obj["location_id"] === location_id
      )
    ) {
      const getLocation = locationData.find(
        (obj) =>
          obj.hasOwnProperty("location_id") &&
          obj["location_id"] === location_id
      );
      getLocation["sessions"] = value;
      delete getLocation["sessions_type"];
      delete getLocation["sessions_type_time"];
      const filterLocationData = locationData.filter(
        (obj) =>
          !(
            obj.hasOwnProperty("location_id") &&
            obj["location_id"] === location_id
          )
      );
      setLocationData([...filterLocationData, getLocation]);
    }
  };
  const handleSessionType = (e, location_id) => {
    console.log(e);
    if (
      locationData.find(
        (obj) =>
          obj.hasOwnProperty("location_id") &&
          obj["location_id"] === location_id
      )
    ) {
      const getLocation = locationData.find(
        (obj) =>
          obj.hasOwnProperty("location_id") &&
          obj["location_id"] === location_id
      );
      getLocation["sessions_type"] = e.target.value;
      delete getLocation["sessions_type_time"];
      const filterLocationData = locationData.filter(
        (obj) =>
          !(
            obj.hasOwnProperty("location_id") &&
            obj["location_id"] === location_id
          )
      );
      setLocationData([...filterLocationData, getLocation]);
    }
  };
  const handleSessionTypeTime = (value, location_id) => {
    //console.log(e);
    if (
      locationData.find(
        (obj) =>
          obj.hasOwnProperty("location_id") &&
          obj["location_id"] === location_id
      )
    ) {
      const getLocation = locationData.find(
        (obj) =>
          obj.hasOwnProperty("location_id") &&
          obj["location_id"] === location_id
      );
      getLocation["sessions_type_time"] = value;
      const filterLocationData = locationData.filter(
        (obj) =>
          !(
            obj.hasOwnProperty("location_id") &&
            obj["location_id"] === location_id
          )
      );
      setLocationData([...filterLocationData, getLocation]);
    }
  };

  // Add Service as Draft

  const add_service_draft = async () => {
    setButtonLoaders(true);
    console.log(locationData);
    setServicePublicStatus("draft");

    const ADD_SERVICE_DRAFT_FORM_DATA = new FormData();
    ADD_SERVICE_DRAFT_FORM_DATA.append("title", title);
    ADD_SERVICE_DRAFT_FORM_DATA.append("about", about);
    ADD_SERVICE_DRAFT_FORM_DATA.append("labels", labels);
    ADD_SERVICE_DRAFT_FORM_DATA.append("engine", engine);
    ADD_SERVICE_DRAFT_FORM_DATA.append(
      "user_id",
      localStorage.getItem("userId")
    );
    ADD_SERVICE_DRAFT_FORM_DATA.append("status", status);
    ADD_SERVICE_DRAFT_FORM_DATA.append("service_public_status", "draft");
    ADD_SERVICE_DRAFT_FORM_DATA.append(
      "category",
      localStorage.getItem("v_category")
    );
    ADD_SERVICE_DRAFT_FORM_DATA.append(
      "industry",
      localStorage.getItem("v_industry")
    );
    ADD_SERVICE_DRAFT_FORM_DATA.append("resource_required", resourceRequired);
    ADD_SERVICE_DRAFT_FORM_DATA.append("gender", serviceSpecifications.gender);
    ADD_SERVICE_DRAFT_FORM_DATA.append("age", serviceSpecifications.age);
    ADD_SERVICE_DRAFT_FORM_DATA.append("feature1", features?.feature1);
    ADD_SERVICE_DRAFT_FORM_DATA.append("feature2", features?.feature2);
    ADD_SERVICE_DRAFT_FORM_DATA.append("feature3", features?.feature3);
    ADD_SERVICE_DRAFT_FORM_DATA.append(
      "description",
      editorRef?.current?.getContent()
    );
    ADD_SERVICE_DRAFT_FORM_DATA.append("feature4", features?.feature4);
    ADD_SERVICE_DRAFT_FORM_DATA.append("feature5", features?.feature5);
    ADD_SERVICE_DRAFT_FORM_DATA.append("benefit1", benefits?.benefit1);
    ADD_SERVICE_DRAFT_FORM_DATA.append("benefit2", benefits?.benefit2);
    ADD_SERVICE_DRAFT_FORM_DATA.append("benefit3", benefits?.benefit3);
    ADD_SERVICE_DRAFT_FORM_DATA.append("benefit4", benefits?.benefit4);
    ADD_SERVICE_DRAFT_FORM_DATA.append("benefit5", benefits?.benefit5);
    ADD_SERVICE_DRAFT_FORM_DATA.append(
      "locations_data",
      JSON.stringify(locationData)
    );
    ADD_SERVICE_DRAFT_FORM_DATA.append("multiple_booking", multipleBooking);
    ADD_SERVICE_DRAFT_FORM_DATA.append("multiple_booking_min", [
      multipleBookingData.min,
    ]);
    ADD_SERVICE_DRAFT_FORM_DATA.append("multiple_booking_max", [
      multipleBookingData.max,
    ]);
    ADD_SERVICE_DRAFT_FORM_DATA.append(
      "open_subscription_specific_year",
      openSubscriptionSpecific.year
    );
    ADD_SERVICE_DRAFT_FORM_DATA.append(
      "open_subscription_specific_month",
      openSubscriptionSpecific.month
    );
    ADD_SERVICE_DRAFT_FORM_DATA.append(
      "open_subscription_specific_days",
      openSubscriptionSpecific.days
    );
    ADD_SERVICE_DRAFT_FORM_DATA.append("discount", discount);
    ADD_SERVICE_DRAFT_FORM_DATA.append("currency_name", pricing.name);
    ADD_SERVICE_DRAFT_FORM_DATA.append("currency_symbol", pricing.symbol);
    ADD_SERVICE_DRAFT_FORM_DATA.append("price", pricing.price);
    ADD_SERVICE_DRAFT_FORM_DATA.append("package_year", packagesValid.year);
    ADD_SERVICE_DRAFT_FORM_DATA.append("package_month", packagesValid.month);
    ADD_SERVICE_DRAFT_FORM_DATA.append("package_days", packagesValid.days);
    ADD_SERVICE_DRAFT_FORM_DATA.append("packages", JSON.stringify(packages));
    if (images.length > 0) {
      for (let index = 0; index < images.length; index++) {
        ADD_SERVICE_DRAFT_FORM_DATA.append("images[]", images[index]);
      }
    }
    const result = await BIZ_ADD_SERVICE(ADD_SERVICE_DRAFT_FORM_DATA);
    // const serviceId = result?.response?.data?.id;    // this id to be used when services table removed
    const serviceId = result?.response?.data?.master_id;

    if (result.response.data.status === 422) {
      console.log("BIZ_ADD_SERVICE BIZ_ADD_SERVICE", result.response.data);
      setApiErrors(result.response.data.errors);
      setButtonLoaders(false);
    } else {
      // setButtonLoaders(false);
      //   router.push("/vendor/services");
      router.push(`/vendor/services/edit-service?type=service&id=${serviceId}`);
    }
    f;
  };

  // Add Cart Error
  const add_service = async (service_status, service_public_status) => {
    if (title !== "") {
      setButtonLoaders(true);

      console.log("service_status===>", service_status);
      console.log("service_public_status===>", service_public_status);
      console.log("locationData===>", locationData);
      setServicePublicStatus("public");
      const ADD_SERVICE_FORM_DATA = new FormData();
      ADD_SERVICE_FORM_DATA.append("title", title);
      ADD_SERVICE_FORM_DATA.append("about", about);
      ADD_SERVICE_FORM_DATA.append("labels", labels);
      ADD_SERVICE_FORM_DATA.append("engine", engine);
      ADD_SERVICE_FORM_DATA.append("user_id", localStorage.getItem("userId"));
      ADD_SERVICE_FORM_DATA.append("status", service_status);
      ADD_SERVICE_FORM_DATA.append(
        "service_public_status",
        service_public_status
      );
      ADD_SERVICE_FORM_DATA.append(
        "category",
        localStorage.getItem("v_category")
      );
      ADD_SERVICE_FORM_DATA.append(
        "industry",
        localStorage.getItem("v_industry")
      );
      ADD_SERVICE_FORM_DATA.append("resource_required", resourceRequired);
      ADD_SERVICE_FORM_DATA.append("gender", serviceSpecifications.gender);
      ADD_SERVICE_FORM_DATA.append("age", serviceSpecifications.age);
      ADD_SERVICE_FORM_DATA.append("feature1", features?.feature1);
      ADD_SERVICE_FORM_DATA.append("feature2", features?.feature2);
      ADD_SERVICE_FORM_DATA.append("feature3", features?.feature3);
      ADD_SERVICE_FORM_DATA.append(
        "description",
        editorRef?.current?.getContent()
      );
      ADD_SERVICE_FORM_DATA.append("feature4", features?.feature4);
      ADD_SERVICE_FORM_DATA.append("feature5", features?.feature5);
      ADD_SERVICE_FORM_DATA.append("benefit1", benefits?.benefit1);
      ADD_SERVICE_FORM_DATA.append("benefit2", benefits?.benefit2);
      ADD_SERVICE_FORM_DATA.append("benefit3", benefits?.benefit3);
      ADD_SERVICE_FORM_DATA.append("benefit4", benefits?.benefit4);
      ADD_SERVICE_FORM_DATA.append("benefit5", benefits?.benefit5);
      ADD_SERVICE_FORM_DATA.append(
        "locations_data",
        JSON.stringify(locationData)
      );
      ADD_SERVICE_FORM_DATA.append("multiple_booking", multipleBooking);
      ADD_SERVICE_FORM_DATA.append("multiple_booking_min", [
        multipleBookingData.min,
      ]);
      ADD_SERVICE_FORM_DATA.append("multiple_booking_max", [
        multipleBookingData.max,
      ]);
      ADD_SERVICE_FORM_DATA.append(
        "open_subscription_specific_year",
        openSubscriptionSpecific.year
      );
      ADD_SERVICE_FORM_DATA.append(
        "open_subscription_specific_month",
        openSubscriptionSpecific.month
      );
      ADD_SERVICE_FORM_DATA.append(
        "open_subscription_specific_days",
        openSubscriptionSpecific.days
      );
      ADD_SERVICE_FORM_DATA.append("discount", discount);
      ADD_SERVICE_FORM_DATA.append("currency_name", pricing.name);
      ADD_SERVICE_FORM_DATA.append("currency_symbol", pricing.symbol);
      ADD_SERVICE_FORM_DATA.append("price", pricing.price);
      ADD_SERVICE_FORM_DATA.append("package_year", packagesValid.year);
      ADD_SERVICE_FORM_DATA.append("package_month", packagesValid.month);
      ADD_SERVICE_FORM_DATA.append("package_days", packagesValid.days);
      ADD_SERVICE_FORM_DATA.append("packages", JSON.stringify(packages));
      if (images.length > 0) {
        for (let index = 0; index < images.length; index++) {
          ADD_SERVICE_FORM_DATA.append("images[]", images[index]);
        }
      }
      const result = await BIZ_ADD_SERVICE(ADD_SERVICE_FORM_DATA);
      if (result.response.data.status === 422) {
        console.log("BIZ_ADD_SERVICE BIZ_ADD_SERVICE", result.response.data);
        setApiErrors(result.response.data.errors);
        setButtonLoaders(false);
      } else {
        // setButtonLoaders(false);
        router.push("/vendor/services");
      }
    } else {
      notification.open({
        message: "Error",
        description: "For Draft Service Name  is required",
        icon: <SmileOutlined style={{ color: "red" }} />,
        duration: 3,
      });
    }
  };

  const handleBack = () => {
    router.back();
  };

  // Model Code
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const removeCalenderActiveClass = () => {
    var add_service_package_button = document.querySelectorAll(
      ".add-service-package-button"
    );
    var vendor_service_list_box = document.querySelectorAll(
      ".vendor-service-list-box"
    );
    for (let index = 0; index < vendor_service_list_box.length; index++) {
      add_service_package_button[index].classList.remove("active");
      vendor_service_list_box[index].style.display = "none";
    }
  };
  const showPackageBox = (e, location_id) => {
    removeCalenderActiveClass();
    e.target.classList.add("active");
    document.getElementById(
      "vendor-service-list-box-" + location_id
    ).style.display = "block";
  };


  function checkVendorPlanAndShowEngines(planName,plan) {
    // Find the vendor plan by name
    const plan1 = plan.find(item => item.name === planName);
    console.log("plan1",plan1)

    if (plan1) {
        const numberOfEngines = plan1?.meta?.number_of_engine;
       SetNumOfEngine(numberOfEngines)
    } else {
        console.log('Plan not found');
    }
}

  // console.log("plan===================>",plan)

  return (
    <>
      <Fragment>
        {pageLoader ? (
          <>
            <div style={{ textAlign: "center", padding: "120px" }}>
              <Spin tip="Loading" size="large">
                <div className="content" />
              </Spin>
            </div>
          </>
        ) : (
          <>
            <Content>
              <Modal
                title={modalTitle}
                open={isModalOpen}
                onOk={handleOk}
                okText="Okay"
                onCancel={handleCancel}
              >
                <div dangerouslySetInnerHTML={{ __html: modalContent }} />
              </Modal>

              {/* Page Title */}

              <div
                className="biz-row"
                style={{ marginTop: "15px", padding: "0 15px" }}
              >
                You are here:
                <span
                  onClick={handleBack}
                  style={{ color: "#EA8933", cursor: "pointer" }}
                >
                  {" "}
                  My Services{" "}
                </span>
                <RightOutlined style={{ color: "#EA8933" }} />
                <span style={{ color: "#EA8933" }}>{"Add Service"}</span>
              </div>

              <div className="biz-row" style={{ marginTop: "15px" }}>
                <div className="biz-col-12">
                  <h2>Add a Service</h2>
                </div>
              </div>

              {/* Page Title */}
              <div className="biz-row">
                <div className="biz-col-6">
                  <label for="title" className="biz-label">
                    Service Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <Input
                    placeholder="Please enter service name"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  {apiErrors?.title && (
                    <>
                      <span className="red-para">{apiErrors?.title[0]}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Industry and Category */}
              <div className="biz-row">
                <div className="biz-col-6">
                  <label for="industry" className="biz-label">
                    Industry<span style={{ color: "red" }}>*</span>
                  </label>
                  <Input
                    name="industry"
                    id="industry"
                    value={industry}
                    disabled
                  />
                </div>
                <div className="biz-col-6">
                  <label for="category" className="biz-label">
                    Category<span style={{ color: "red" }}>*</span>
                  </label>
                  <Input
                    name="category"
                    id="category"
                    value={category}
                    disabled
                  />
                </div>
              </div>

              {/* Services Label */}
              <div className="biz-row">
                <div className="biz-col-6">
                  <label for="title" className="biz-label">
                    Add labels<span style={{ color: "red" }}>*</span>
                    <span style={{ paddingLeft: "8px" }}>
                      <Popover
                        content={
                          <p>Relevant labels help to find services better.</p>
                        }
                        title=""
                        trigger="hover"
                      >
                        <InfoCircleFilled style={{ color: "#2c2c2c" }} />
                      </Popover>
                    </span>
                  </label>
                  <Select
                    mode="multiple"
                    placeholder="Insert or remove items"
                    onSelect={handleLabels}
                    onDeselect={removeLabels}
                    style={{ width: "100%" }}
                  >
                    {serviceLabels?.map((item) => (
                      <Select.Option key={item} value={item}>
                        {" "}
                        {item}{" "}
                      </Select.Option>
                    ))}
                  </Select>
                  {apiErrors?.labels && (
                    <>
                      <span className="red-para">{apiErrors?.labels[0]}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Booking Engine */}
              <div className="outline-box">
                <div className="biz-row">
                  <div className="biz-col-12">
                    <h3 style={{ color: "#72959A", fontWeight: "500" }}>
                      Choose a Booking engine
                      <span style={{ color: "red" }}>*</span>
                    </h3>
                  </div>
                </div>
                  
                <div className="biz-row">
                  {numOfEngine.includes("1") ?
                  <div className="biz-col-6">
                    <div className={firstEngineClass}>
                      <h4>
                        Pay & go
                        <span style={{ paddingLeft: "8px" }}>
                          <Popover
                            content={
                              <p>
                                Data will come from engine description added by
                                Admin on backend.
                              </p>
                            }
                            title="Important notice"
                            trigger="hover"
                          >
                            <InfoCircleFilled style={{ color: "#2c2c2c" }} />
                          </Popover>
                        </span>
                      </h4>
                      <h5>Best For</h5>
                      <ul>
                        <li
                          style={{
                            border: "1px solid #72959A",
                            backgroundColor: "#E0E0E0",
                          }}
                        >
                          Single Session Services
                        </li>
                      </ul>
                      {/* <span className="red-link" onClick={() => {
                                            setModalTitle('Pay & Go');
                                            setModalContent('<p>Use pay & go booking engine to create straight forward services which can be booked and utilise in one sitting. These services have a specific date and slot time, on which a customer wants to visit to consume your service.</p>');
                                            showModal()
                                        }}>Learn more 
                                        </span> */}
                      <span
                        className="engine-button"
                        onClick={() => handleBookingEngine(1)}
                      >
                        {" "}
                        <span className="check-box">
                          <CheckOutlined />
                        </span>
                        Choose Pay & go
                      </span>
                    </div>
                  </div> : null }
                  {numOfEngine.includes("2") ?
                  <div className="biz-col-6">
                    <div className={secondEngineClass}>
                      <h4>
                        Open subscription
                        <span style={{ paddingLeft: "8px" }}>
                          <Popover
                            content={
                              <p>
                                Data will come from engine description added by
                                Admin on backend.
                              </p>
                            }
                            title="Important notice"
                            trigger="hover"
                          >
                            <InfoCircleFilled style={{ color: "#2c2c2c" }} />
                          </Popover>
                        </span>
                      </h4>
                      <h5>Best For</h5>
                      <ul>
                        <li
                          style={{
                            border: "1px solid #72959A",
                            backgroundColor: "#E0E0E0",
                          }}
                        >
                          Long term recurring Subscription
                        </li>
                      </ul>
                      {/* <span className="red-link" onClick={() => {
                                            setModalTitle('Open Subscription');
                                            setModalContent('<p>Open Subscription are good for the services which is paid once for a service which is on for a long term. Customer can visit vendor’s facility for multiple times. These service can be as fitness centres services.</p> <h5>Subscription period</h5><p>Open Subscription booking engine has required subscription period which can be years, months and days. This period set the time limit of the service availability for the customers.</p>');
                                            showModal()
                                        }}>Learn more
                                        
                                        </span> */}
                      <span
                        className="engine-button"
                        onClick={() => handleBookingEngine(2)}
                      >
                        {" "}
                        <span className="check-box">
                          <CheckOutlined />
                        </span>
                        Open subscription
                      </span>
                    </div>
                  </div> : null }
                  {numOfEngine.includes("3") ?
                  <div className="biz-col-6">
                    <div className={thirdEngineClass}>
                      <h4>
                        Close Subscription (Non recurring){" "}
                        <span style={{ paddingLeft: "8px" }}>
                          <Popover
                            content={
                              <p>
                                Data will come from engine description added by
                                Admin on backend.
                              </p>
                            }
                            title="Important notice"
                            trigger="hover"
                          >
                            <InfoCircleFilled style={{ color: "#2c2c2c" }} />
                          </Popover>
                        </span>
                      </h4>
                      <h5>Best For</h5>
                      <ul>
                        <li
                          style={{
                            border: "1px solid #72959A",
                            backgroundColor: "#E0E0E0",
                          }}
                        >
                          Fixed No of Multiple Sessions/Classes
                        </li>
                      </ul>
                      {/* <span className="red-link" onClick={() => {
                                            setModalTitle('Close Subscription');
                                            setModalContent('<p>Close subscription engine are for the services which have multiple set number of sessions such as classes, medical service with multiple sitting.</p> <h5>Number of sessions</h5><p>This sets a number of sessions or sittings available in one booking which also has the duration between each session (Daily, weekly and monthly).</p>');
                                            showModal()
                                        }}>Learn more</span> */}
                      <span
                        className="engine-button"
                        onClick={() => handleBookingEngine(3)}
                      >
                        {" "}
                        <span className="check-box">
                          <CheckOutlined />
                        </span>
                        Close Subscription (Non recurring)
                      </span>
                    </div>
                  </div> : null }
                  {numOfEngine.includes("4") ?
                  <div className="biz-col-6">
                    <div className={fourthEngineClass}>
                      <h4>
                        Packages
                        <span style={{ paddingLeft: "8px" }}>
                          <Popover
                            content={
                              <p>
                                Data will come from engine description added by
                                Admin on backend.
                              </p>
                            }
                            title="Important notice"
                            trigger="hover"
                          >
                            <InfoCircleFilled style={{ color: "#2c2c2c" }} />
                          </Popover>
                        </span>
                      </h4>
                      <h5>Best For</h5>
                      <ul>
                        <li
                          style={{
                            border: "1px solid #72959A",
                            backgroundColor: "#E0E0E0",
                          }}
                        >
                          Offering existing services as a bundled package
                        </li>
                      </ul>
                      {/* <span className="red-link" onClick={() => {
                                            setModalTitle('Packages');
                                            setModalContent('<p>Packages have a bunch of your created services at a certain location. Packages give an opportunity to vendors and customer to connect multiple time and buy services with less price. </p> <h5>Service count</h5><p>All the service created at a location will be visible as a location is selected. Vendor chooses the services and the count(Number of bookings allowed) into each service card.</p><h5>Validity</h5><p>Validity sets the expiry date of the package for a customer. A customer has to consume all the services until package expires.</p>');
                                            showModal()
                                        }}>Learn more</span> */}
                      <span
                        className="engine-button"
                        onClick={() => handleBookingEngine(4)}
                      >
                        {" "}
                        <span className="check-box">
                          <CheckOutlined />
                        </span>
                        Packages
                      </span>
                    </div>
                  </div> : null }
                  {numOfEngine.includes("6") ?
                  <div className="biz-col-6">
                    <div className={sixthEngineClass}>
                      <h4>
                        {" "}
                        Book for Free
                        <span style={{ paddingLeft: "8px" }}>
                          <Popover
                            content={
                              <p>
                                Data will come from engine description added by
                                Admin on backend.
                              </p>
                            }
                            title="Important notice"
                            trigger="hover"
                          >
                            <InfoCircleFilled style={{ color: "#2c2c2c" }} />
                          </Popover>
                        </span>
                      </h4>
                      <h5>Best For</h5>
                      <ul>
                        <li
                          style={{
                            border: "1px solid #72959A",
                            backgroundColor: "#E0E0E0",
                          }}
                        >
                          Single Session Book For Free Services
                        </li>
                      </ul>

                      <span
                        className="engine-button"
                        onClick={() => handleBookingEngine(6)}
                      >
                        {" "}
                        <span className="check-box">
                          <CheckOutlined />
                        </span>
                        Choose Book for free
                      </span>
                    </div>
                  </div> : null }

                </div>

                {apiErrors?.engine && (
                  <>
                    <span className="red-para">{apiErrors?.engine[0]}</span>
                  </>
                )}
              </div>

              {/* Service Specifications */}

              {show_service_specifications && (
                <>
                  <div className="outline-box">
                    {engine !== 4 && (
                      <>
                        <div className="biz-row">
                          <div className="biz-col-12">
                            <h3 style={{ color: "#72959A", fontWeight: "500" }}>
                              Service Specifications
                            </h3>
                          </div>
                        </div>
                        <div className="biz-row">
                          <div className="biz-col-2">
                            <label for="title" className="biz-label">
                              Gender<span style={{ color: "red" }}>*</span>
                            </label>
                            <Select
                              placeholder="Select gender"
                              onSelect={(value) =>
                                setServiceSpecifications({
                                  ...serviceSpecifications,
                                  gender: value,
                                })
                              }
                              style={{ width: "100%" }}
                            >
                              <Option value="all">All</Option>
                              <Option value="male">Male</Option>
                              <Option value="female">Female</Option>
                              <Option value="other">Other</Option>
                              <Option value="none">none</Option>
                            </Select>
                            {apiErrors?.gender && (
                              <>
                                <span className="red-para">
                                  {apiErrors?.gender[0]}
                                </span>
                              </>
                            )}
                          </div>
                          <div className="biz-col-2">
                            <label for="title" className="biz-label">
                              Age<span style={{ color: "red" }}>*</span>
                            </label>

                            <Select
                              placeholder="Select age"
                              onSelect={(value) =>
                                setServiceSpecifications({
                                  ...serviceSpecifications,
                                  age: value,
                                })
                              }
                              style={{ width: "100%" }}
                            >
                              <Option value="all">All</Option>
                              <Option value="none">None</Option>
                              <Option value="0-2">0-2</Option>
                              <Option value="4-11">4-11</Option>
                              <Option value="12-18">12-18</Option>
                              <Option value="Below 18">Below 18</Option>
                              <Option value="Above 18">Above 18</Option>
                              <Option value="19-29">19-29</Option>
                              <Option value="30-44">30-44</Option>
                              <Option value="45-64">45-64</Option>
                              <Option value="65 & above">65 & above</Option>
                            </Select>
                            {apiErrors?.age && (
                              <>
                                <span className="red-para">
                                  {apiErrors?.age[0]}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                    <div className="biz-row">
                      <div className="biz-col-12">
                        <h3 style={{ color: "#72959A", fontWeight: "500" }}>
                          Add product features
                        </h3>
                      </div>
                    </div>
                    <div className="biz-row">
                      <div className="biz-col-2">
                        <label for="title" className="biz-label">
                          Feature 1<span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                          placeholder="Please enter service name"
                          onChange={(e) =>
                            setFeatures({
                              ...features,
                              feature1: e.target.value,
                            })
                          }
                        />
                        {apiErrors?.feature1 && (
                          <>
                            <span className="red-para">
                              {apiErrors?.feature1[0]}
                            </span>
                          </>
                        )}
                      </div>
                      <div className="biz-col-2">
                        <label for="title" className="biz-label">
                          Feature 2
                        </label>
                        <Input
                          placeholder="Please enter service name"
                          onChange={(e) =>
                            setFeatures({
                              ...features,
                              feature2: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="biz-col-2">
                        <label for="title" className="biz-label">
                          Feature 3
                        </label>
                        <Input
                          placeholder="Please enter service name"
                          onChange={(e) =>
                            setFeatures({
                              ...features,
                              feature3: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="biz-col-2">
                        <label for="title" className="biz-label">
                          Feature 4
                        </label>
                        <Input
                          placeholder="Please enter service name"
                          onChange={(e) =>
                            setFeatures({
                              ...features,
                              feature4: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="biz-col-2">
                        <label for="title" className="biz-label">
                          Feature 5
                        </label>
                        <Input
                          placeholder="Please enter service name"
                          onChange={(e) =>
                            setFeatures({
                              ...features,
                              feature5: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="biz-row">
                      <div className="biz-col-12">
                        <h3 style={{ color: "#72959A", fontWeight: "500" }}>
                          Add product Benefits
                        </h3>
                      </div>
                    </div>
                    <div className="biz-row">
                      <div className="biz-col-2">
                        <label for="title" className="biz-label">
                          Benefit 1<span style={{ color: "red" }}>*</span>
                        </label>
                        <Input
                          placeholder="Please enter service name"
                          onChange={(e) =>
                            setBenefits({
                              ...benefits,
                              benefit1: e.target.value,
                            })
                          }
                        />
                        <span className="red-para" id="benefit-error"></span>
                        {apiErrors?.benefit1 && (
                          <>
                            <span className="red-para">
                              {apiErrors?.benefit1[0]}
                            </span>
                          </>
                        )}
                      </div>
                      <div className="biz-col-2">
                        <label for="title" className="biz-label">
                          Benefit 2
                        </label>
                        <Input
                          placeholder="Please enter service name"
                          onChange={(e) =>
                            setBenefits({
                              ...benefits,
                              benefit2: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="biz-col-2">
                        <label for="title" className="biz-label">
                          Benefit 3
                        </label>
                        <Input
                          placeholder="Please enter service name"
                          onChange={(e) =>
                            setBenefits({
                              ...benefits,
                              benefit3: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="biz-col-2">
                        <label for="title" className="biz-label">
                          Benefit 4
                        </label>
                        <Input
                          placeholder="Please enter service name"
                          onChange={(e) =>
                            setBenefits({
                              ...benefits,
                              benefit4: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="biz-col-2">
                        <label for="title" className="biz-label">
                          Benefit 5
                        </label>
                        <Input
                          placeholder="Please enter service name"
                          onChange={(e) =>
                            setBenefits({
                              ...benefits,
                              benefit5: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="biz-row">
                      <div className="biz-col-12">
                        <label for="title" className="biz-label">
                          Short Description
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <Input.TextArea
                          allowClear
                          style={{ width: "100%", height: "500px" }}
                          onChange={(e) => setAbout(e.target.value)}
                          placeholder="Enter about here..."
                          autoSize={{ minRows: 4, maxRows: 6 }}
                        />
                        {apiErrors?.about && (
                          <>
                            <span className="red-para">
                              {apiErrors?.about[0]}
                            </span>
                          </>
                        )}
                      </div>
                      <div className="biz-col-12">
                        <label for="title" className="biz-label">
                          Long Description
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <Editor
                          apiKey="wplr2n0gq2sfmmw5kys5hdfa2fzcbf5g923bqaukxtquaw56"
                          onInit={(evt, editor) => (editorRef.current = editor)}
                          initialValue={description}
                          init={{
                            height: 500,
                            menubar: false,
                            plugins:
                              "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount imagetools",
                            toolbar:
                              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image code media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                            content_style:
                              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                          }}
                        />
                        {apiErrors?.description && (
                          <>
                            <span style={{ color: "red" }}>
                              {apiErrors?.description[0]}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* show_open_subscription_specific */}
              {show_open_subscription_specific && (
                <>
                  {" "}
                  <h3
                    style={{
                      color: "#72959A",
                      fontWeight: "500",
                      marginLeft: "15px",
                      marginBottom: "15px",
                    }}
                  >
                    Booking Engine Open Subscription Specific
                  </h3>
                  {/* Subscription Period */}
                  <div className="outline-box">
                    <div className="biz-row">
                      <div
                        className="biz-col-12"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <h3 style={{ color: "#72959A", fontWeight: "500" }}>
                          Subscription Period
                        </h3>
                        <span style={{ paddingLeft: "8px" }}>
                          <Popover
                            content={
                              <p>
                                Validity for this subscription<br></br>
                              </p>
                            }
                            title=""
                            trigger="hover"
                          >
                            <InfoCircleFilled style={{ color: "#2c2c2c" }} />
                          </Popover>
                        </span>
                      </div>
                    </div>
                    <div className="biz-row">
                      <div className="biz-col-2">
                        <label>Year</label>
                        <Select
                          placeholder="Select year"
                          style={{ width: "100%" }}
                          onSelect={(value) =>
                            setOpenSubscriptionSpecific({
                              ...openSubscriptionSpecific,
                              year: value,
                            })
                          }
                        >
                          <Option selected>Select Year</Option>
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((time) => (
                            <Option key={time} value={time}>
                              {time}
                            </Option>
                          ))}
                        </Select>
                        {apiErrors?.open_subscription_specific_year && (
                          <>
                            <span className="red-para">
                              {apiErrors?.open_subscription_specific_year[0]}
                            </span>
                          </>
                        )}
                      </div>
                      <div className="biz-col-2">
                        <label>Select Month</label>
                        <Select
                          placeholder="Select Month"
                          style={{ width: "100%" }}
                          onSelect={(value) =>
                            setOpenSubscriptionSpecific({
                              ...openSubscriptionSpecific,
                              month: value,
                            })
                          }
                        >
                          <Option selected>Select Month</Option>
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                            (time) => (
                              <Option key={time} value={time}>
                                {time}
                              </Option>
                            )
                          )}
                        </Select>
                        {apiErrors?.open_subscription_specific_month && (
                          <>
                            <span className="red-para">
                              {apiErrors?.open_subscription_specific_month[0]}
                            </span>
                          </>
                        )}
                      </div>
                      <div className="biz-col-2">
                        <label>Days</label>
                        <Select
                          placeholder="Select Days"
                          style={{ width: "100%" }}
                          onSelect={(value) =>
                            setOpenSubscriptionSpecific({
                              ...openSubscriptionSpecific,
                              days: value,
                            })
                          }
                        >
                          <Option selected>Select Days</Option>
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((time) => (
                            <Option key={time} value={time}>
                              {time}
                            </Option>
                          ))}
                        </Select>
                        {apiErrors?.open_subscription_specific_days && (
                          <>
                            <span className="red-para">
                              {apiErrors?.open_subscription_specific_days[0]}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    {apiErrors?.sub_per && (
                      <>
                        <span className="red-para">
                          {apiErrors?.sub_per[0]}
                        </span>
                      </>
                    )}
                  </div>
                </>
              )}

              {/* Service picture */}
              {show_image_box && (
                <>
                  <div className="outline-box">
                    <div className="biz-row">
                      <div className="biz-col-12">
                        <h3 style={{ color: "#72959A", fontWeight: "500" }}>
                          Service picture<span style={{ color: "red" }}>*</span>
                        </h3>
                      </div>
                    </div>

                    <div className="biz-row">
                      <div className="biz-col-6">
                        <label for="upload-images" className="camera-box">
                          <CameraOutlined />
                        </label>
                        <div
                          style={{
                            display: "inline-block",
                            marginLeft: "10px",
                          }}
                        >
                          <p>Min. Resolution in 400px, 300px</p>
                          <p>File format must be .jpg or .png</p>
                          <p>Max. file size 2 Mb</p>
                        </div>
                        <input
                          type="file"
                          id="upload-images"
                          accept="image/*"
                          multiple
                          style={{ height: "0px", overflow: "hidden" }}
                          onChange={handleImageChange}
                        />
                        <span className="red-para" id="image-error"></span>
                      </div>
                    </div>

                    <div className="biz-row">
                      {images.length > 0 &&
                        images.map((image, index) => (
                          <div key={index} className="biz-col-2">
                            <div className="gallery-box">
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Image ${index + 1}`}
                              />
                              <button onClick={() => handleRemoveImage(index)}>
                                <CloseOutlined />
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>

                    <span className="red-para" id="images-error"></span>
                  </div>
                </>
              )}

              {engine === 4 ? (
                <>
                  {CHECK_PACKAGE_ALLOW ? (
                    <>
                      {" "}
                      <div className="outline-box">
                        <div className="biz-row">
                          <div className="biz-col-12">
                            <h3 style={{ color: "#72959A", fontWeight: "500" }}>
                              Add Packages for
                            </h3>
                          </div>
                        </div>
                        <div className="biz-row">
                          {locationsAndResources?.map((location, index) => (
                            <>
                              <div className="biz-col-2">
                                <span
                                  className="add-service-package-button"
                                  onClick={(e) =>
                                    showPackageBox(e, location.id)
                                  }
                                >
                                  {location.name}
                                </span>
                              </div>
                            </>
                          ))}
                        </div>

                        {locationsAndResources?.map((location, index) => (
                          <>
                            <div
                              className="vendor-service-list-box"
                              id={"vendor-service-list-box-" + location.id}
                            >
                              <div className="biz-package-flex">
                                <div>
                                  <div
                                    className="vendor-service-box"
                                    id={"location-" + location.id}
                                  >
                                    <Checkbox
                                      style={{
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                      }}
                                      id={"location-checked-" + location.id}
                                      onChange={(e) =>
                                        handlePackageLocationChange(
                                          e,
                                          location.id
                                        )
                                      }
                                    >
                                      {location.name}
                                    </Checkbox>
                                  </div>
                                </div>
                                {packages?.map((item, index) => (
                                  <>
                                    {item?.location_id === location.id && (
                                      <>
                                        {item?.locationServices?.map(
                                          (service, index) => (
                                            <>
                                              <div>
                                                <div className="service-box-vendor">
                                                  <div>
                                                    <Checkbox
                                                      onChange={(e) =>
                                                        handlePackageServiceChange(
                                                          e,
                                                          location.id,
                                                          service.id
                                                        )
                                                      }
                                                    >
                                                      {service.title}
                                                    </Checkbox>
                                                  </div>
                                                  <div
                                                    style={{
                                                      maxHeight: "110px",
                                                      overflow: "hidden",
                                                    }}
                                                  >
                                                    {" "}
                                                    <img
                                                      src={
                                                        STORAGE_URL +
                                                        "/images/" +
                                                        service.image
                                                      }
                                                    />
                                                  </div>
                                                  <div>
                                                    {" "}
                                                    {service?.labels?.map(
                                                      (label, index) => (
                                                        <>
                                                          <span className="service-box-vendor-span">
                                                            {label}
                                                          </span>
                                                        </>
                                                      )
                                                    )}
                                                  </div>
                                                  <div
                                                    style={{
                                                      minHeight: "80px",
                                                    }}
                                                  >
                                                    <label>Count</label>
                                                    <select
                                                      onChange={(e) =>
                                                        handlePackageCountChange(
                                                          e,
                                                          location.id,
                                                          service.id
                                                        )
                                                      }
                                                      className="biz-select"
                                                      disabled={
                                                        packages.find(
                                                          (obj) =>
                                                            obj.hasOwnProperty(
                                                              "services_selected"
                                                            ) &&
                                                            obj[
                                                              "services_selected"
                                                            ].indexOf(
                                                              service.id
                                                            ) !== -1
                                                        )
                                                          ? ""
                                                          : "disabled"
                                                      }
                                                    >
                                                      <option value={1}>
                                                        1
                                                      </option>
                                                      <option value={2}>
                                                        2
                                                      </option>
                                                      <option value={3}>
                                                        3
                                                      </option>
                                                      <option value={4}>
                                                        4
                                                      </option>
                                                      <option value={5}>
                                                        5
                                                      </option>
                                                      <option value={6}>
                                                        6
                                                      </option>
                                                      <option value={7}>
                                                        7
                                                      </option>
                                                    </select>
                                                  </div>
                                                </div>
                                              </div>
                                            </>
                                          )
                                        )}
                                      </>
                                    )}
                                  </>
                                ))}
                              </div>
                            </div>
                          </>
                        ))}
                        {apiErrors?.package && (
                          <>
                            <span className="red-para">
                              {apiErrors?.package[0]}
                            </span>
                          </>
                        )}
                        <div className="biz-row">
                          <h4 style={{ color: "#72959A", fontWeight: "500" }}>
                            Validity
                            <span style={{ paddingLeft: "8px" }}>
                              <Popover
                                content={<p>Validity of this package.</p>}
                                title=""
                                trigger="hover"
                              >
                                <InfoCircleFilled
                                  style={{ color: "#2c2c2c" }}
                                />
                              </Popover>
                            </span>
                          </h4>
                          <div className="biz-col-2">
                            <label>Year</label>
                            <Select
                              placeholder="Select year"
                              style={{ width: "100%" }}
                              onSelect={(value) =>
                                setPackagesValid({
                                  ...packagesValid,
                                  year: value,
                                })
                              }
                            >
                              <Option value="">Select Year</Option>
                              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                                (time) => (
                                  <Option key={time} value={time}>
                                    {time}
                                  </Option>
                                )
                              )}
                            </Select>
                            {apiErrors?.package_year && (
                              <>
                                <span className="red-para">
                                  {apiErrors?.package_year[0]}
                                </span>
                              </>
                            )}
                          </div>
                          <div className="biz-col-2">
                            <label>Select Month</label>
                            <Select
                              placeholder="Select Month"
                              style={{ width: "100%" }}
                              onSelect={(value) =>
                                setPackagesValid({
                                  ...packagesValid,
                                  month: value,
                                })
                              }
                            >
                              <Option value="">Select Month</Option>
                              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                                (time) => (
                                  <Option key={time} value={time}>
                                    {time}
                                  </Option>
                                )
                              )}
                            </Select>
                            {apiErrors?.package_month && (
                              <>
                                <span className="red-para">
                                  {apiErrors?.package_month[0]}
                                </span>
                              </>
                            )}
                          </div>
                          <div className="biz-col-2">
                            <label>Days</label>
                            <Select
                              placeholder="Select Days"
                              style={{ width: "100%" }}
                              onSelect={(value) =>
                                setPackagesValid({
                                  ...packagesValid,
                                  days: value,
                                })
                              }
                            >
                              <Option value="">Select Days</Option>
                              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((time) => (
                                <Option key={time} value={time}>
                                  {time}
                                </Option>
                              ))}
                            </Select>
                            {apiErrors?.package_days && (
                              <>
                                <span className="red-para">
                                  {apiErrors?.package_days[0]}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="big-center-error">
                        Note - First Add Service then you can make your own
                        package.
                      </p>
                    </>
                  )}
                </>
              ) : (
                <>
                  {/* Multiple booking */}
                  {show_multiple_booking && (
                    <>
                      {" "}
                      <div className="outline-box">
                        <div className="biz-row">
                          <div className="biz-col-12">
                            <h3 style={{ color: "#72959A", fontWeight: "500" }}>
                              Multiple booking
                              <span style={{ paddingLeft: "8px" }}>
                                <Popover
                                  content={
                                    <p>
                                      To allow more than one bookings for a slot
                                      <br></br>Good for a group classes or
                                      session
                                    </p>
                                  }
                                  title=""
                                  trigger="hover"
                                >
                                  <InfoCircleFilled
                                    style={{ color: "#2c2c2c" }}
                                  />
                                </Popover>
                              </span>
                            </h3>
                            <p style={{ marginBottom: "10px" }}></p>
                            <Checkbox
                              style={{ fontSize: "18px", fontWeight: "bold" }}
                              value={1}
                              onChange={(e) => {
                                e.target.checked
                                  ? setMultipleBooking(true)
                                  : setMultipleBooking(false);
                              }}
                            >
                              Yes
                            </Checkbox>
                          </div>
                          {multipleBooking && (
                            <>
                              <div
                                className="biz-col-2"
                                style={{ paddingTop: "15px" }}
                              >
                                <Select
                                  placeholder="Select minimum per session"
                                  style={{ width: "100%" }}
                                  onChange={(value) => {
                                    setMultipleBookingData({
                                      ...multipleBookingData,
                                      min: value,
                                    });
                                  }}
                                >
                                  <Option value="">
                                    Select minimum per session
                                  </Option>
                                  {[1, 2, 3, 4, 5, 6, 9].map((time) => (
                                    <Option key={time} value={time}>
                                      {time}
                                    </Option>
                                  ))}
                                </Select>
                                {apiErrors?.multiple_booking_min && (
                                  <>
                                    <span className="red-para">
                                      {apiErrors?.multiple_booking_min[0]}
                                    </span>
                                  </>
                                )}
                              </div>
                              <div
                                className="biz-col-2"
                                style={{ paddingTop: "15px" }}
                              >
                                <Select
                                  placeholder="Select a maximum per session"
                                  style={{ width: "100%" }}
                                  onChange={(value) => {
                                    setMultipleBookingData({
                                      ...multipleBookingData,
                                      max: value,
                                    });
                                  }}
                                >
                                  <Option value="">
                                    Select a maximum per session
                                  </Option>
                                  {[5, 10, 15, 20, 50].map((time) => (
                                    <Option key={time} value={time}>
                                      {time}
                                    </Option>
                                  ))}
                                </Select>
                                {apiErrors?.multiple_booking_max && (
                                  <>
                                    <span className="red-para">
                                      {apiErrors?.multiple_booking_max[0]}
                                    </span>
                                  </>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Assign location and resource */}
                  {show_assign_location_and_resource && (
                    <>
                      {" "}
                      <div
                        className="outline-box"
                        style={{ backgroundColor: "#f5f5f5" }}
                      >
                        <div className="biz-row">
                          <div className="biz-col-12">
                            <h3 style={{ color: "#72959A", fontWeight: "500" }}>
                              Assign location and resource
                              <span style={{ color: "red" }}>*</span>
                            </h3>
                            <p style={{ marginBottom: "10px" }}>
                              Is a resource required for this service?
                            </p>
                            <Radio.Group
                              value={resourceRequired}
                              onChange={(e) => {
                                setResourceRequired(e.target.value);
                                setLocationData([]);
                              }}
                            >
                              <Radio value={1}>Yes</Radio>
                              <Radio value={0}>No</Radio>
                            </Radio.Group>
                          </div>
                        </div>
                        <div className="biz-row">
                          {locationsAndResources?.map((location, index) => (
                            <>
                              <div className="biz-col-5">
                                {resourceRequired ? (
                                  <>
                                    {location?.resources?.length > 0 ? (
                                      <>
                                        <div
                                          className="vendor-service-box"
                                          id={"location-" + location.id}
                                        >
                                          <Checkbox
                                            checked={
                                              locationData.find(
                                                (obj) =>
                                                  obj.hasOwnProperty(
                                                    "location_id"
                                                  ) &&
                                                  obj["location_id"] ===
                                                    location.id
                                              )
                                                ? true
                                                : false
                                            }
                                            style={{
                                              fontSize: "18px",
                                              fontWeight: "bold",
                                            }}
                                            id={
                                              "location-checked-" + location.id
                                            }
                                            onChange={() =>
                                              handleLocationChange(
                                                location.id,
                                                {
                                                  hoursType: 1,
                                                  startTime:
                                                    location?.start_time,
                                                  endTime: location?.end_time,
                                                },
                                                location.name
                                              )
                                            }
                                          >
                                            {location.name}
                                          </Checkbox>
                                          {locationData.find(
                                            (obj) =>
                                              obj.hasOwnProperty(
                                                "location_id"
                                              ) &&
                                              obj["location_id"] === location.id
                                          ) && (
                                            <>
                                              <div
                                                style={{ margin: "20px 25px" }}
                                                id={
                                                  "location-" +
                                                  location.id +
                                                  "-resource"
                                                }
                                              >
                                                {resourceRequired ? (
                                                  <>
                                                    <p
                                                      style={{
                                                        padding: "10px 0px",
                                                      }}
                                                    >
                                                      Select resources
                                                    </p>
                                                    <Checkbox.Group
                                                      onChange={(value) =>
                                                        handleResources(
                                                          value,
                                                          location.id
                                                        )
                                                      }
                                                      options={
                                                        location?.resources
                                                          ? location?.resources
                                                          : []
                                                      }
                                                    />{" "}
                                                  </>
                                                ) : (
                                                  ""
                                                )}
                                                {engine === 3 ? (
                                                  <>
                                                    <p
                                                      style={{
                                                        padding: "10px 0px",
                                                        borderTop:
                                                          "1px solid #ccc",
                                                        marginTop: "10px",
                                                      }}
                                                    >
                                                      Sessions
                                                    </p>
                                                    <div
                                                      className="biz-row"
                                                      style={{
                                                        margin: "0px -15px",
                                                      }}
                                                    >
                                                      <div className="biz-col-12">
                                                        <label>
                                                          Number of Sessions
                                                          <span
                                                            style={{
                                                              paddingLeft:
                                                                "8px",
                                                            }}
                                                          >
                                                            <Popover
                                                              content={
                                                                <p>
                                                                  <br></br>
                                                                </p>
                                                              }
                                                              title="Number of sessions/sittings for this service."
                                                              trigger="hover"
                                                            >
                                                              <InfoCircleFilled
                                                                style={{
                                                                  color:
                                                                    "#2c2c2c",
                                                                }}
                                                              />
                                                            </Popover>
                                                          </span>
                                                        </label>

                                                        <div
                                                          className="biz-row"
                                                          style={{
                                                            margin: "0px -15px",
                                                          }}
                                                        >
                                                          <div className="biz-col-4">
                                                            <Select
                                                              placeholder="Select No of Sessions"
                                                              style={{
                                                                width: "100%",
                                                              }}
                                                              onChange={(
                                                                value
                                                              ) =>
                                                                handleSession(
                                                                  value,
                                                                  location.id
                                                                )
                                                              }
                                                            >
                                                              {[3, 5, 7, 9].map(
                                                                (time) => (
                                                                  <Option
                                                                    key={time}
                                                                    value={time}
                                                                  >
                                                                    {time}
                                                                  </Option>
                                                                )
                                                              )}
                                                            </Select>
                                                          </div>
                                                          <div className="biz-col-8">
                                                            <Radio.Group
                                                              onChange={(e) =>
                                                                handleSessionType(
                                                                  e,
                                                                  location.id
                                                                )
                                                              }
                                                            >
                                                              <Radio
                                                                value={"daily"}
                                                              >
                                                                Daily
                                                              </Radio>
                                                              <Radio
                                                                value={"weekly"}
                                                              >
                                                                Weekly
                                                              </Radio>
                                                              <Radio
                                                                value={
                                                                  "monthly"
                                                                }
                                                              >
                                                                Monthly
                                                              </Radio>
                                                            </Radio.Group>
                                                            <div
                                                              style={{
                                                                display: "flex",
                                                                alignItems:
                                                                  "center",
                                                                marginTop:
                                                                  "10px",
                                                                maxWidth:
                                                                  "230px",
                                                              }}
                                                              id={
                                                                "session-select-daily-" +
                                                                location.id
                                                              }
                                                            >
                                                              {locationData.find(
                                                                (obj) =>
                                                                  obj.hasOwnProperty(
                                                                    "location_id"
                                                                  ) &&
                                                                  obj[
                                                                    "location_id"
                                                                  ] ===
                                                                    location.id &&
                                                                  obj.hasOwnProperty(
                                                                    "sessions_type"
                                                                  )
                                                              ) && (
                                                                <>
                                                                  {locationData.find(
                                                                    (obj) =>
                                                                      obj[
                                                                        "location_id"
                                                                      ] ===
                                                                        location.id &&
                                                                      obj[
                                                                        "sessions_type"
                                                                      ] ===
                                                                        "daily"
                                                                  ) && (
                                                                    <>
                                                                      <span
                                                                        style={{
                                                                          paddingRight:
                                                                            "8px",
                                                                        }}
                                                                      >
                                                                        <Popover
                                                                          content={
                                                                            <p>
                                                                              1
                                                                              Day
                                                                              =
                                                                              The
                                                                              very
                                                                              next
                                                                              day
                                                                              <br></br>
                                                                              2
                                                                              Day
                                                                              =
                                                                              The
                                                                              day
                                                                              after
                                                                            </p>
                                                                          }
                                                                          title="Days gap between each session."
                                                                          trigger="hover"
                                                                        >
                                                                          <InfoCircleFilled
                                                                            style={{
                                                                              color:
                                                                                "#2c2c2c",
                                                                            }}
                                                                          />
                                                                        </Popover>
                                                                      </span>
                                                                      <Select
                                                                        onChange={(
                                                                          value
                                                                        ) =>
                                                                          handleSessionTypeTime(
                                                                            value,
                                                                            location.id
                                                                          )
                                                                        }
                                                                        placeholder="Select a duration"
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                        options={
                                                                          dailySessionDuration
                                                                        }
                                                                      />
                                                                    </>
                                                                  )}
                                                                  {locationData.find(
                                                                    (obj) =>
                                                                      obj[
                                                                        "location_id"
                                                                      ] ===
                                                                        location.id &&
                                                                      obj[
                                                                        "sessions_type"
                                                                      ] ===
                                                                        "weekly"
                                                                  ) && (
                                                                    <>
                                                                      <span
                                                                        style={{
                                                                          paddingRight:
                                                                            "8px",
                                                                        }}
                                                                      >
                                                                        <Popover
                                                                          content={
                                                                            <p>
                                                                              1
                                                                              Week
                                                                              =
                                                                              The
                                                                              very
                                                                              next
                                                                              week
                                                                              <br></br>
                                                                              2
                                                                              Week
                                                                              =
                                                                              The
                                                                              week
                                                                              after
                                                                            </p>
                                                                          }
                                                                          title="Week gap between each session."
                                                                          trigger="hover"
                                                                        >
                                                                          <InfoCircleFilled
                                                                            style={{
                                                                              color:
                                                                                "#2c2c2c",
                                                                            }}
                                                                          />
                                                                        </Popover>
                                                                      </span>
                                                                      <Select
                                                                        onChange={(
                                                                          value
                                                                        ) =>
                                                                          handleSessionTypeTime(
                                                                            value,
                                                                            location.id
                                                                          )
                                                                        }
                                                                        placeholder="Select a duration"
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                        options={
                                                                          weeklySessionDuration
                                                                        }
                                                                      />
                                                                    </>
                                                                  )}
                                                                  {locationData.find(
                                                                    (obj) =>
                                                                      obj[
                                                                        "location_id"
                                                                      ] ===
                                                                        location.id &&
                                                                      obj[
                                                                        "sessions_type"
                                                                      ] ===
                                                                        "monthly"
                                                                  ) && (
                                                                    <>
                                                                      <span
                                                                        style={{
                                                                          paddingRight:
                                                                            "8px",
                                                                        }}
                                                                      >
                                                                        <Popover
                                                                          content={
                                                                            <p>
                                                                              1
                                                                              Month
                                                                              =
                                                                              The
                                                                              very
                                                                              next
                                                                              month
                                                                              <br></br>
                                                                              2
                                                                              Month
                                                                              =
                                                                              The
                                                                              month
                                                                              after
                                                                            </p>
                                                                          }
                                                                          title="Month gap between each session."
                                                                          trigger="hover"
                                                                        >
                                                                          <InfoCircleFilled
                                                                            style={{
                                                                              color:
                                                                                "#2c2c2c",
                                                                            }}
                                                                          />
                                                                        </Popover>
                                                                      </span>
                                                                      <Select
                                                                        onChange={(
                                                                          value
                                                                        ) =>
                                                                          handleSessionTypeTime(
                                                                            value,
                                                                            location.id
                                                                          )
                                                                        }
                                                                        placeholder="Select a duration"
                                                                        style={{
                                                                          width:
                                                                            "100%",
                                                                        }}
                                                                        options={
                                                                          monthlySessionDuration
                                                                        }
                                                                      />
                                                                    </>
                                                                  )}
                                                                </>
                                                              )}
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </>
                                                ) : (
                                                  ""
                                                )}
                                                <p
                                                  style={{
                                                    padding: "10px 0px",
                                                    borderTop: "1px solid #ccc",
                                                    marginTop: "10px",
                                                  }}
                                                >
                                                  Timings
                                                </p>
                                                <div
                                                  className="biz-row"
                                                  style={{
                                                    margin: "0px -15px",
                                                    width: "100%",
                                                  }}
                                                >
                                                  <div
                                                    className="biz-col-6"
                                                    style={{ display: "flex" }}
                                                  ></div>
                                                  <div
                                                    className="biz-col-6"
                                                    style={{
                                                      paddingLeft: "30px",
                                                      alignItems: "center",
                                                    }}
                                                  ></div>
                                                </div>
                                                <div
                                                  className="biz-row"
                                                  style={{
                                                    margin: "0px -15px",
                                                  }}
                                                >
                                                  <div className="biz-col-6">
                                                    <div
                                                      className="biz-row"
                                                      style={{
                                                        margin: "0px -15px",
                                                      }}
                                                    >
                                                      <span
                                                        id={
                                                          "custom-checkbox-span-business-" +
                                                          location.id
                                                        }
                                                        onClick={() =>
                                                          handleTiming(
                                                            1,
                                                            location.id,
                                                            {
                                                              hoursType: 1,
                                                              startTime:
                                                                location?.start_time,
                                                              endTime:
                                                                location?.end_time,
                                                            }
                                                          )
                                                        }
                                                        className="custom-checkbox-span active"
                                                      >
                                                        Business hours{" "}
                                                        <Popover
                                                          content={
                                                            <p>
                                                              Location's
                                                              business working
                                                              hours.
                                                            </p>
                                                          }
                                                          trigger="hover"
                                                        >
                                                          <InfoCircleFilled
                                                            style={{
                                                              color: "#2c2c2c",
                                                            }}
                                                          />
                                                        </Popover>
                                                      </span>

                                                      <div
                                                        className="biz-col-6"
                                                        style={{
                                                          marginBottom: "10px",
                                                        }}
                                                      >
                                                        {" "}
                                                        <TimePicker
                                                          format={"HH:mm"}
                                                          defaultValue={dayjs(
                                                            location?.start_time,
                                                            "HH:mm"
                                                          )}
                                                          disabled
                                                        />
                                                      </div>
                                                      <div className="biz-col-6">
                                                        <TimePicker
                                                          format={"HH:mm"}
                                                          defaultValue={dayjs(
                                                            location?.end_time,
                                                            "HH:mm"
                                                          )}
                                                          disabled
                                                        />
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="biz-col-6">
                                                    <div
                                                      className="biz-row"
                                                      style={{
                                                        margin: "0px -15px",
                                                      }}
                                                    >
                                                      <span
                                                        onClick={() =>
                                                          handleTiming(
                                                            0,
                                                            location.id,
                                                            { hoursType: 1 }
                                                          )
                                                        }
                                                        id={
                                                          "custom-checkbox-span-custom-" +
                                                          location.id
                                                        }
                                                        className="custom-checkbox-span"
                                                      >
                                                        {" "}
                                                        Custom hours{" "}
                                                        <Popover
                                                          content={
                                                            <p>
                                                              Any time period
                                                              between location's
                                                              business time.
                                                            </p>
                                                          }
                                                          trigger="hover"
                                                        >
                                                          <InfoCircleFilled
                                                            style={{
                                                              color: "#2c2c2c",
                                                            }}
                                                          />
                                                        </Popover>
                                                      </span>

                                                      <div
                                                        className="biz-col-6"
                                                        style={{
                                                          marginBottom: "10px",
                                                          marginTop: "10px",
                                                        }}
                                                      >
                                                        {" "}
                                                        <input
                                                          type="time"
                                                          onChange={(e) =>
                                                            customTimingStart(
                                                              e,
                                                              location.id,
                                                              location?.start_time,
                                                              location?.end_time
                                                            )
                                                          }
                                                          class="biz-input"
                                                          id={
                                                            "custom-start-time-" +
                                                            location.id
                                                          }
                                                          format={"HH:mm"}
                                                          disabled
                                                        />
                                                      </div>
                                                      <div className="biz-col-6">
                                                        <input
                                                          type="time"
                                                          onChange={(e) =>
                                                            customTimingEnd(
                                                              e,
                                                              location.id,
                                                              location?.start_time,
                                                              location?.end_time
                                                            )
                                                          }
                                                          class="biz-input"
                                                          id={
                                                            "custom-end-time-" +
                                                            location.id
                                                          }
                                                          min="09:00"
                                                          max="18:00"
                                                          format={"HH:mm"}
                                                          disabled
                                                        />
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </>
                                          )}
                                        </div>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <div
                                      className="vendor-service-box"
                                      id={"location-" + location.id}
                                    >
                                      <Checkbox
                                        checked={
                                          locationData.find(
                                            (obj) =>
                                              obj.hasOwnProperty(
                                                "location_id"
                                              ) &&
                                              obj["location_id"] === location.id
                                          )
                                            ? true
                                            : false
                                        }
                                        style={{
                                          fontSize: "18px",
                                          fontWeight: "bold",
                                        }}
                                        id={"location-checked-" + location.id}
                                        onChange={() =>
                                          handleLocationChange(
                                            location.id,
                                            {
                                              hoursType: 1,
                                              startTime: location?.start_time,
                                              endTime: location?.end_time,
                                            },
                                            location.name
                                          )
                                        }
                                      >
                                        {location.name}
                                      </Checkbox>
                                      {locationData.find(
                                        (obj) =>
                                          obj.hasOwnProperty("location_id") &&
                                          obj["location_id"] === location.id
                                      ) && (
                                        <>
                                          <div
                                            style={{ margin: "20px 25px" }}
                                            id={
                                              "location-" +
                                              location.id +
                                              "-resource"
                                            }
                                          >
                                            {resourceRequired ? (
                                              <>
                                                <p
                                                  style={{
                                                    padding: "10px 0px",
                                                  }}
                                                >
                                                  Select resources
                                                </p>
                                                <Checkbox.Group
                                                  onChange={(value) =>
                                                    handleResources(
                                                      value,
                                                      location.id
                                                    )
                                                  }
                                                  options={
                                                    location?.resources
                                                      ? location?.resources
                                                      : []
                                                  }
                                                />{" "}
                                              </>
                                            ) : (
                                              ""
                                            )}
                                            {engine === 3 ? (
                                              <>
                                                <p
                                                  style={{
                                                    padding: "10px 0px",
                                                    borderTop: "1px solid #ccc",
                                                    marginTop: "10px",
                                                  }}
                                                >
                                                  Sessions
                                                </p>
                                                <div
                                                  className="biz-row"
                                                  style={{
                                                    margin: "0px -15px",
                                                  }}
                                                >
                                                  <div className="biz-col-12">
                                                    <label>
                                                      Number of Sessions
                                                    </label>
                                                    <div
                                                      className="biz-row"
                                                      style={{
                                                        margin: "0px -15px",
                                                      }}
                                                    >
                                                      <div className="biz-col-4">
                                                        <Select
                                                          placeholder="Select No of Sessions"
                                                          style={{
                                                            width: "100%",
                                                          }}
                                                          onChange={(value) =>
                                                            handleSession(
                                                              value,
                                                              location.id
                                                            )
                                                          }
                                                        >
                                                          {[3, 5, 7, 9].map(
                                                            (time) => (
                                                              <Option
                                                                key={time}
                                                                value={time}
                                                              >
                                                                {time}
                                                              </Option>
                                                            )
                                                          )}
                                                        </Select>
                                                      </div>
                                                      <div className="biz-col-8">
                                                        <Radio.Group
                                                          onChange={(e) =>
                                                            handleSessionType(
                                                              e,
                                                              location.id
                                                            )
                                                          }
                                                        >
                                                          <Radio
                                                            value={"daily"}
                                                          >
                                                            Daily
                                                          </Radio>
                                                          <Radio
                                                            value={"weekly"}
                                                          >
                                                            Weekly
                                                          </Radio>
                                                          <Radio
                                                            value={"monthly"}
                                                          >
                                                            Monthly
                                                          </Radio>
                                                        </Radio.Group>
                                                        <div
                                                          style={{
                                                            marginTop: "10px",
                                                            maxWidth: "230px",
                                                          }}
                                                          id={
                                                            "session-select-daily-" +
                                                            location.id
                                                          }
                                                        >
                                                          {locationData.find(
                                                            (obj) =>
                                                              obj.hasOwnProperty(
                                                                "location_id"
                                                              ) &&
                                                              obj[
                                                                "location_id"
                                                              ] ===
                                                                location.id &&
                                                              obj.hasOwnProperty(
                                                                "sessions_type"
                                                              )
                                                          ) && (
                                                            <>
                                                              {locationData.find(
                                                                (obj) =>
                                                                  obj[
                                                                    "location_id"
                                                                  ] ===
                                                                    location.id &&
                                                                  obj[
                                                                    "sessions_type"
                                                                  ] === "daily"
                                                              ) && (
                                                                <>
                                                                  <Select
                                                                    onChange={(
                                                                      value
                                                                    ) =>
                                                                      handleSessionTypeTime(
                                                                        value,
                                                                        location.id
                                                                      )
                                                                    }
                                                                    placeholder="Select a duration"
                                                                    style={{
                                                                      width:
                                                                        "100%",
                                                                    }}
                                                                    options={
                                                                      dailySessionDuration
                                                                    }
                                                                  />
                                                                </>
                                                              )}
                                                              {locationData.find(
                                                                (obj) =>
                                                                  obj[
                                                                    "location_id"
                                                                  ] ===
                                                                    location.id &&
                                                                  obj[
                                                                    "sessions_type"
                                                                  ] === "weekly"
                                                              ) && (
                                                                <>
                                                                  <Select
                                                                    onChange={(
                                                                      value
                                                                    ) =>
                                                                      handleSessionTypeTime(
                                                                        value,
                                                                        location.id
                                                                      )
                                                                    }
                                                                    placeholder="Select a duration"
                                                                    style={{
                                                                      width:
                                                                        "100%",
                                                                    }}
                                                                    options={
                                                                      weeklySessionDuration
                                                                    }
                                                                  />
                                                                </>
                                                              )}
                                                              {locationData.find(
                                                                (obj) =>
                                                                  obj[
                                                                    "location_id"
                                                                  ] ===
                                                                    location.id &&
                                                                  obj[
                                                                    "sessions_type"
                                                                  ] ===
                                                                    "monthly"
                                                              ) && (
                                                                <>
                                                                  <Select
                                                                    onChange={(
                                                                      value
                                                                    ) =>
                                                                      handleSessionTypeTime(
                                                                        value,
                                                                        location.id
                                                                      )
                                                                    }
                                                                    placeholder="Select a duration"
                                                                    style={{
                                                                      width:
                                                                        "100%",
                                                                    }}
                                                                    options={
                                                                      monthlySessionDuration
                                                                    }
                                                                  />
                                                                </>
                                                              )}
                                                            </>
                                                          )}
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                            <p
                                              style={{
                                                padding: "10px 0px",
                                                borderTop: "1px solid #ccc",
                                                marginTop: "10px",
                                              }}
                                            >
                                              Timings
                                            </p>
                                            <div
                                              className="biz-row"
                                              style={{
                                                margin: "0px -15px",
                                                width: "100%",
                                              }}
                                            >
                                              <div
                                                className="biz-col-6"
                                                style={{ display: "flex" }}
                                              >
                                                <span
                                                  id={
                                                    "custom-checkbox-span-business-" +
                                                    location.id
                                                  }
                                                  onClick={() =>
                                                    handleTiming(
                                                      1,
                                                      location.id,
                                                      {
                                                        hoursType: 1,
                                                        startTime:
                                                          location?.start_time,
                                                        endTime:
                                                          location?.end_time,
                                                      }
                                                    )
                                                  }
                                                  className="custom-checkbox-span active"
                                                >
                                                  Business hours
                                                </span>
                                                <span
                                                  style={{ paddingLeft: "8px" }}
                                                >
                                                  <Popover
                                                    content={
                                                      <p>
                                                        Location's business
                                                        working hours.
                                                      </p>
                                                    }
                                                    trigger="hover"
                                                  >
                                                    <InfoCircleFilled
                                                      style={{
                                                        color: "#2c2c2c",
                                                      }}
                                                    />
                                                  </Popover>
                                                </span>
                                              </div>
                                              <div
                                                className="biz-col-6"
                                                style={{ paddingLeft: "30px" }}
                                              >
                                                <span
                                                  onClick={() =>
                                                    handleTiming(
                                                      0,
                                                      location.id,
                                                      { hoursType: 1 }
                                                    )
                                                  }
                                                  id={
                                                    "custom-checkbox-span-custom-" +
                                                    location.id
                                                  }
                                                  className="custom-checkbox-span"
                                                >
                                                  {" "}
                                                  Custom hours
                                                </span>
                                                <span
                                                  style={{ paddingLeft: "8px" }}
                                                >
                                                  <Popover
                                                    content={
                                                      <p>
                                                        Any time period between
                                                        location's business
                                                        time.
                                                      </p>
                                                    }
                                                    trigger="hover"
                                                  >
                                                    <InfoCircleFilled
                                                      style={{
                                                        color: "#2c2c2c",
                                                      }}
                                                    />
                                                  </Popover>
                                                </span>
                                              </div>
                                            </div>
                                            <div
                                              className="biz-row"
                                              style={{ margin: "0px -15px" }}
                                            >
                                              <div className="biz-col-6">
                                                <div
                                                  className="biz-row"
                                                  style={{
                                                    margin: "0px -15px",
                                                  }}
                                                >
                                                  <div
                                                    className="biz-col-6"
                                                    style={{
                                                      marginBottom: "10px",
                                                    }}
                                                  >
                                                    {" "}
                                                    <TimePicker
                                                      format={"HH:mm"}
                                                      defaultValue={dayjs(
                                                        location?.start_time,
                                                        "HH:mm"
                                                      )}
                                                      disabled
                                                    />
                                                  </div>
                                                  <div
                                                    className="biz-col-6"
                                                    style={{
                                                      marginBottom: "10px",
                                                    }}
                                                  >
                                                    <TimePicker
                                                      format={"HH:mm"}
                                                      defaultValue={dayjs(
                                                        location?.end_time,
                                                        "HH:mm"
                                                      )}
                                                      disabled
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="biz-col-6">
                                                <div
                                                  className="biz-row"
                                                  style={{
                                                    margin: "0px -15px",
                                                  }}
                                                >
                                                  <div
                                                    className="biz-col-6"
                                                    style={{
                                                      marginBottom: "10px",
                                                    }}
                                                  >
                                                    {" "}
                                                    <input
                                                      type="time"
                                                      onChange={(e) =>
                                                        customTimingStart(
                                                          e,
                                                          location.id,
                                                          location?.start_time,
                                                          location?.end_time
                                                        )
                                                      }
                                                      class="biz-input"
                                                      id={
                                                        "custom-start-time-" +
                                                        location.id
                                                      }
                                                      format={"HH:mm"}
                                                      disabled
                                                    />
                                                  </div>
                                                  <div
                                                    className="biz-col-6"
                                                    style={{
                                                      marginBottom: "10px",
                                                    }}
                                                  >
                                                    <input
                                                      type="time"
                                                      onChange={(e) =>
                                                        customTimingEnd(
                                                          e,
                                                          location.id,
                                                          location?.start_time,
                                                          location?.end_time
                                                        )
                                                      }
                                                      class="biz-input"
                                                      id={
                                                        "custom-end-time-" +
                                                        location.id
                                                      }
                                                      min="09:00"
                                                      max="18:00"
                                                      format={"HH:mm"}
                                                      disabled
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </>
                                )}
                              </div>
                            </>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                  {apiErrors?.slots && (
                    <>
                      <span className="red-para-slot">
                        {apiErrors?.slots[0]}
                      </span>
                    </>
                  )}

                  {/* Add slots for */}
                  {show_slots_table && (
                    <>
                      {" "}
                      <div className="outline-box">
                        <div className="biz-row">
                          <div
                            className="biz-col-12"
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <h3 style={{ color: "#72959A", fontWeight: "500" }}>
                              Add slots for
                            </h3>
                            <span style={{ paddingLeft: "8px" }}>
                              <Popover
                                content={
                                  <p>
                                    This duration allows your service visibilty
                                    to customers.<br></br>You can set the slots
                                    for maximum 3 months.<br></br>Make sure you
                                    keep updating this duration accordingly.
                                  </p>
                                }
                                trigger="hover"
                              >
                                <InfoCircleFilled
                                  style={{ color: "#2c2c2c" }}
                                />
                              </Popover>
                            </span>
                          </div>
                        </div>
                        <div className="biz-row">
                          {engine === 3 ? (
                            <>
                              {locationData
                                ? locationData?.map((location, index) => (
                                    <>
                                      {resourceRequired === 1 ? (
                                        <>
                                          {location?.resources &&
                                          location?.timing.startTime &&
                                          location?.timing.endTime &&
                                          location?.sessions &&
                                          location?.sessions_type &&
                                          location?.sessions_type_time ? (
                                            <>
                                              <div className="biz-col-2">
                                                <span
                                                  className="slot-location-list-heading"
                                                  onClick={(e) =>
                                                    openSlotBox(
                                                      e,
                                                      location?.location_id,
                                                      location?.location_title
                                                    )
                                                  }
                                                  size={"large"}
                                                >
                                                  {" "}
                                                  {
                                                    location?.location_title
                                                  }{" "}
                                                </span>
                                              </div>
                                            </>
                                          ) : (
                                            <> </>
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          {location?.timing.startTime &&
                                          location?.timing.endTime &&
                                          location?.sessions &&
                                          location?.sessions_type &&
                                          location?.sessions_type_time ? (
                                            <>
                                              <div className="biz-col-2">
                                                <span
                                                  className="slot-location-list-heading"
                                                  onClick={(e) =>
                                                    openSlotBox(
                                                      e,
                                                      location?.location_id,
                                                      location?.location_title
                                                    )
                                                  }
                                                  size={"middle"}
                                                >
                                                  {" "}
                                                  {
                                                    location?.location_title
                                                  }{" "}
                                                </span>
                                              </div>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </>
                                      )}
                                    </>
                                  ))
                                : ""}
                              {locationData
                                ? locationData?.map((location, index) => (
                                    <>
                                      {resourceRequired === 1 ? (
                                        <>
                                          {location?.resources &&
                                          location?.timing.startTime &&
                                          location?.timing.endTime &&
                                          location?.sessions &&
                                          location?.sessions_type &&
                                          location?.sessions_type_time ? (
                                            <>
                                              <div
                                                className="biz-row slot-box"
                                                id={
                                                  "slot-box-" +
                                                  location.location_id
                                                }
                                              >
                                                {/* <div className="biz-col-12"> <h4 id={"locationData-table-heading-" + location.location_id}></h4></div> */}
                                                <div className="biz-col-12">
                                                  <div
                                                    className="biz-row"
                                                    style={{
                                                      margin: "5px -15px",
                                                    }}
                                                  >
                                                    <div className="biz-col-2">
                                                      <label>
                                                        Duration per service
                                                      </label>
                                                      <Select
                                                        value={
                                                          location.hasOwnProperty(
                                                            "duration"
                                                          )
                                                            ? location.duration
                                                            : 0
                                                        }
                                                        placeholder="Select Duration Time"
                                                        style={{
                                                          width: "100%",
                                                        }}
                                                        onChange={(value) =>
                                                          handleDuration(
                                                            value,
                                                            location.location_id
                                                          )
                                                        }
                                                        options={[
                                                          {
                                                            value: 0,
                                                            label:
                                                              "Select Duration Time",
                                                          },
                                                          {
                                                            value: 15,
                                                            label: "15 Min",
                                                          },
                                                          {
                                                            value: 30,
                                                            label: "30 Min",
                                                          },
                                                          {
                                                            value: 60,
                                                            label: "60 Min",
                                                          },
                                                          {
                                                            value: 90,
                                                            label: "90 Min",
                                                          },
                                                        ]}
                                                      />
                                                      <span
                                                        className="red-para"
                                                        id={
                                                          "duration-error-" +
                                                          location.location_id
                                                        }
                                                      ></span>
                                                    </div>
                                                    <div className="biz-col-2">
                                                      <label>Buffer time</label>
                                                      <Select
                                                        placeholder="Buffer time"
                                                        style={{
                                                          width: "100%",
                                                        }}
                                                        value={
                                                          location.hasOwnProperty(
                                                            "buffer"
                                                          )
                                                            ? location.buffer
                                                            : 0
                                                        }
                                                        onChange={(value) =>
                                                          handleBufferTime(
                                                            value,
                                                            location.location_id
                                                          )
                                                        }
                                                        options={[
                                                          {
                                                            value: 0,
                                                            label:
                                                              "Select Buffer Time",
                                                          },
                                                          {
                                                            value: 5,
                                                            label: 5,
                                                          },
                                                          {
                                                            value: 10,
                                                            label: 10,
                                                          },
                                                          {
                                                            value: 15,
                                                            label: 15,
                                                          },
                                                        ]}
                                                      />
                                                      <span
                                                        className="red-para"
                                                        id={
                                                          "buffer-error-" +
                                                          location.location_id
                                                        }
                                                      ></span>
                                                    </div>
                                                    <div className="biz-col-2">
                                                      <label>Start Date</label>
                                                      <input
                                                        type="date"
                                                        min={minDate}
                                                        value={
                                                          location.hasOwnProperty(
                                                            "start_date"
                                                          )
                                                            ? location.start_date
                                                            : ""
                                                        }
                                                        onChange={(e) =>
                                                          handleStartDate(
                                                            e,
                                                            location.location_id
                                                          )
                                                        }
                                                        className="biz-input"
                                                        style={{
                                                          width: "100%",
                                                        }}
                                                      />
                                                      <span
                                                        className="red-para"
                                                        id={
                                                          "start_date-error-" +
                                                          location.location_id
                                                        }
                                                      ></span>
                                                    </div>
                                                    <div className="biz-col-2">
                                                      <label>End Date</label>
                                                      <input
                                                        type="date"
                                                        value={
                                                          location.hasOwnProperty(
                                                            "end_date"
                                                          )
                                                            ? location.end_date
                                                            : ""
                                                        }
                                                        id={
                                                          "end-date-" +
                                                          location.location_id
                                                        }
                                                        onChange={(e) =>
                                                          handleEndDate(
                                                            e,
                                                            location.location_id
                                                          )
                                                        }
                                                        className="biz-input"
                                                        style={{
                                                          width: "100%",
                                                        }}
                                                        disabled
                                                      />
                                                      <span
                                                        className="red-para"
                                                        id={
                                                          "end_date-error-" +
                                                          location.location_id
                                                        }
                                                      ></span>
                                                    </div>

                                                    <div className="biz-col-3">
                                                      <label>
                                                        Exclude days
                                                      </label>
                                                      <Select
                                                        mode="multiple"
                                                        placeholder="Select a duration"
                                                        style={{
                                                          width: "100%",
                                                        }}
                                                        onChange={(value) =>
                                                          handleExcludeDays(
                                                            value,
                                                            location.location_id
                                                          )
                                                        }
                                                        options={daysOfWeek}
                                                      />
                                                      <span
                                                        className="red-para"
                                                        id={
                                                          "exclude_days-error-" +
                                                          location.location_id
                                                        }
                                                      ></span>
                                                    </div>
                                                    <div
                                                      className="biz-col-1"
                                                      style={{
                                                        paddingTop: "15px",
                                                      }}
                                                    >
                                                      <span
                                                        onClick={() =>
                                                          getSlots(
                                                            location.location_id
                                                          )
                                                        }
                                                      >
                                                        <Button
                                                          size={"middle"}
                                                          type="primary"
                                                          style={{
                                                            marginTop: "8px",
                                                          }}
                                                        >
                                                          {" "}
                                                          Apply{" "}
                                                        </Button>
                                                      </span>
                                                    </div>
                                                  </div>
                                                  {slotLoader ? (
                                                    <>
                                                      <div
                                                        style={{
                                                          textAlign: "center",
                                                          padding: "120px",
                                                        }}
                                                      >
                                                        <Spin
                                                          tip="Loading"
                                                          size="large"
                                                        >
                                                          <div className="content" />
                                                        </Spin>
                                                      </div>
                                                    </>
                                                  ) : (
                                                    <>
                                                      <div className="slots-list">
                                                        <div className="biz-row slots-head">
                                                          <div className="biz-col-2">
                                                            Day
                                                          </div>
                                                          <div className="biz-col-2">
                                                            Start Time
                                                          </div>
                                                          <div className="biz-col-2">
                                                            End Time
                                                          </div>
                                                          <div className="biz-col-2">
                                                            Slot state
                                                          </div>
                                                          <div className="biz-col-2">
                                                            Action
                                                          </div>
                                                        </div>
                                                        {location?.slots ? (
                                                          location.slots.map(
                                                            (slot, index) => (
                                                              <>
                                                                <div
                                                                  className="biz-row border-bottom"
                                                                  id={
                                                                    "slot-row-" +
                                                                    location.location_id +
                                                                    "-index-" +
                                                                    index
                                                                  }
                                                                >
                                                                  <div className="biz-col-2">
                                                                    {slot.day}
                                                                  </div>
                                                                  <div className="biz-col-2">
                                                                    {slot?.allSlots?.map(
                                                                      (
                                                                        currentTimeArray,
                                                                        currentTimeIndex
                                                                      ) => (
                                                                        <>
                                                                          <Input
                                                                            id={
                                                                              "slot-row-" +
                                                                              location.location_id +
                                                                              "-index-" +
                                                                              index +
                                                                              "-currentTimeIndex-" +
                                                                              currentTimeIndex
                                                                            }
                                                                            value={
                                                                              currentTimeArray.currentTime
                                                                            }
                                                                            style={{
                                                                              marginBottom:
                                                                                "5px",
                                                                            }}
                                                                          />
                                                                        </>
                                                                      )
                                                                    )}
                                                                  </div>
                                                                  <div className="biz-col-2">
                                                                    {slot?.allSlots?.map(
                                                                      (
                                                                        endTimeSlotArray,
                                                                        endTimeSlotIndex
                                                                      ) => (
                                                                        <>
                                                                          <Input
                                                                            id={
                                                                              "slot-row-" +
                                                                              location.location_id +
                                                                              "-index-" +
                                                                              index +
                                                                              "-endTimeSlotIndex-" +
                                                                              endTimeSlotIndex
                                                                            }
                                                                            value={
                                                                              endTimeSlotArray.endTimeSlot
                                                                            }
                                                                            style={{
                                                                              marginBottom:
                                                                                "5px",
                                                                            }}
                                                                          />
                                                                        </>
                                                                      )
                                                                    )}
                                                                  </div>
                                                                  <div className="biz-col-2">
                                                                    {slot?.allSlots?.map(
                                                                      (
                                                                        endTimeSlotArray,
                                                                        endTimeSlotIndex
                                                                      ) => (
                                                                        <>
                                                                          <div className="box-for-same-height">
                                                                            <label className="biz-toggle-switch">
                                                                              {endTimeSlotArray
                                                                                .blackList
                                                                                .length >
                                                                              0 ? (
                                                                                <>
                                                                                  <span
                                                                                    className="biz-slider"
                                                                                    id={
                                                                                      "checkbox-switch-" +
                                                                                      location.location_id +
                                                                                      "-index-" +
                                                                                      index +
                                                                                      "-endTimeSlotIndex-" +
                                                                                      endTimeSlotIndex +
                                                                                      "-" +
                                                                                      slot.day
                                                                                    }
                                                                                  ></span>
                                                                                </>
                                                                              ) : (
                                                                                <>
                                                                                  <span
                                                                                    className="biz-slider active"
                                                                                    id={
                                                                                      "checkbox-switch-" +
                                                                                      location.location_id +
                                                                                      "-index-" +
                                                                                      index +
                                                                                      "-endTimeSlotIndex-" +
                                                                                      endTimeSlotIndex +
                                                                                      "-" +
                                                                                      slot.day
                                                                                    }
                                                                                  ></span>
                                                                                </>
                                                                              )}
                                                                            </label>
                                                                            <Popconfirm
                                                                              title={
                                                                                "Offline " +
                                                                                endTimeSlotArray.currentTime +
                                                                                "-" +
                                                                                endTimeSlotArray.endTimeSlot
                                                                              }
                                                                              description={
                                                                                <ul className="disabled-date-list">
                                                                                  {slot?.all_dates.map(
                                                                                    (
                                                                                      item
                                                                                    ) => (
                                                                                      <>
                                                                                        <li>
                                                                                          <label>
                                                                                            <input
                                                                                              type="checkbox"
                                                                                              className="unchecked-checkbox"
                                                                                              onChange={() =>
                                                                                                setBlackOutDateForSlotTime(
                                                                                                  item,
                                                                                                  location.location_id,
                                                                                                  index,
                                                                                                  endTimeSlotIndex
                                                                                                )
                                                                                              }
                                                                                              value={
                                                                                                item
                                                                                              }
                                                                                            />{" "}
                                                                                            {
                                                                                              item
                                                                                            }
                                                                                          </label>
                                                                                        </li>
                                                                                      </>
                                                                                    )
                                                                                  )}
                                                                                </ul>
                                                                              }
                                                                              okText="Apply"
                                                                            >
                                                                              <Button className="hidden-button">
                                                                                Delete
                                                                              </Button>
                                                                            </Popconfirm>
                                                                          </div>
                                                                        </>
                                                                      )
                                                                    )}
                                                                  </div>
                                                                  <div className="biz-col-2">
                                                                    {slot?.allSlots?.map(
                                                                      (
                                                                        endTimeSlotArray,
                                                                        endTimeSlotIndex
                                                                      ) => (
                                                                        <>
                                                                          <div className="box-for-same-height">
                                                                            {" "}
                                                                            <span
                                                                              onClick={() =>
                                                                                removeTimeSlot(
                                                                                  location.location_id,
                                                                                  index,
                                                                                  endTimeSlotIndex
                                                                                )
                                                                              }
                                                                            >
                                                                              <DeleteOutlined
                                                                                style={{
                                                                                  color:
                                                                                    "red",
                                                                                  fontSize:
                                                                                    "20px",
                                                                                }}
                                                                              />
                                                                            </span>
                                                                          </div>
                                                                        </>
                                                                      )
                                                                    )}
                                                                  </div>
                                                                </div>
                                                              </>
                                                            )
                                                          )
                                                        ) : (
                                                          <></>
                                                        )}
                                                      </div>
                                                    </>
                                                  )}
                                                </div>
                                              </div>
                                            </>
                                          ) : (
                                            <> </>
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          {location?.timing.startTime &&
                                          location?.timing.endTime &&
                                          location?.sessions &&
                                          location?.sessions_type &&
                                          location?.sessions_type_time ? (
                                            <>
                                              <div
                                                className="biz-row slot-box"
                                                id={
                                                  "slot-box-" +
                                                  location.location_id
                                                }
                                              >
                                                {/* <div className="biz-col-12"> <h4 id={"locationData-table-heading-" + location.location_id}></h4></div> */}
                                                <div className="biz-col-12">
                                                  <div
                                                    className="biz-row"
                                                    style={{
                                                      margin: "5px -15px",
                                                    }}
                                                  >
                                                    <div className="biz-col-2">
                                                      <label>
                                                        Duration per service
                                                      </label>
                                                      <Select
                                                        value={
                                                          location.hasOwnProperty(
                                                            "duration"
                                                          )
                                                            ? location.duration
                                                            : 0
                                                        }
                                                        placeholder="Select Duration Time"
                                                        style={{
                                                          width: "100%",
                                                        }}
                                                        onChange={(value) =>
                                                          handleDuration(
                                                            value,
                                                            location.location_id
                                                          )
                                                        }
                                                        options={[
                                                          {
                                                            value: 0,
                                                            label:
                                                              "Select Duration Time",
                                                          },
                                                          {
                                                            value: 15,
                                                            label: "15 Min",
                                                          },
                                                          {
                                                            value: 30,
                                                            label: "30 Min",
                                                          },
                                                          {
                                                            value: 60,
                                                            label: "60 Min",
                                                          },
                                                          {
                                                            value: 90,
                                                            label: "90 Min",
                                                          },
                                                        ]}
                                                      />
                                                      <span
                                                        className="red-para"
                                                        id={
                                                          "duration-error-" +
                                                          location.location_id
                                                        }
                                                      ></span>
                                                    </div>
                                                    <div className="biz-col-2">
                                                      <label>Buffer time</label>
                                                      <Select
                                                        placeholder="Buffer time"
                                                        style={{
                                                          width: "100%",
                                                        }}
                                                        value={
                                                          location.hasOwnProperty(
                                                            "buffer"
                                                          )
                                                            ? location.buffer
                                                            : 0
                                                        }
                                                        onChange={(value) =>
                                                          handleBufferTime(
                                                            value,
                                                            location.location_id
                                                          )
                                                        }
                                                        options={[
                                                          {
                                                            value: 0,
                                                            label:
                                                              "Select Buffer Time",
                                                          },
                                                          {
                                                            value: 5,
                                                            label: 5,
                                                          },
                                                          {
                                                            value: 10,
                                                            label: 10,
                                                          },
                                                          {
                                                            value: 15,
                                                            label: 15,
                                                          },
                                                        ]}
                                                      />
                                                      <span
                                                        className="red-para"
                                                        id={
                                                          "buffer-error-" +
                                                          location.location_id
                                                        }
                                                      ></span>
                                                    </div>
                                                    <div className="biz-col-2">
                                                      <label>Start Date</label>
                                                      <input
                                                        type="date"
                                                        min={minDate}
                                                        value={
                                                          location.hasOwnProperty(
                                                            "start_date"
                                                          )
                                                            ? location.start_date
                                                            : ""
                                                        }
                                                        onChange={(e) =>
                                                          handleStartDate(
                                                            e,
                                                            location.location_id
                                                          )
                                                        }
                                                        className="biz-input"
                                                        style={{
                                                          width: "100%",
                                                        }}
                                                      />
                                                      <span
                                                        className="red-para"
                                                        id={
                                                          "start_date-error-" +
                                                          location.location_id
                                                        }
                                                      ></span>
                                                    </div>
                                                    <div className="biz-col-2">
                                                      <label>End Date</label>
                                                      <input
                                                        type="date"
                                                        value={
                                                          location.hasOwnProperty(
                                                            "end_date"
                                                          )
                                                            ? location.end_date
                                                            : ""
                                                        }
                                                        id={
                                                          "end-date-" +
                                                          location.location_id
                                                        }
                                                        onChange={(e) =>
                                                          handleEndDate(
                                                            e,
                                                            location.location_id
                                                          )
                                                        }
                                                        className="biz-input"
                                                        style={{
                                                          width: "100%",
                                                        }}
                                                        disabled
                                                      />
                                                      <span
                                                        className="red-para"
                                                        id={
                                                          "end_date-error-" +
                                                          location.location_id
                                                        }
                                                      ></span>
                                                    </div>

                                                    <div className="biz-col-3">
                                                      <label>
                                                        Exclude days
                                                      </label>
                                                      <Select
                                                        mode="multiple"
                                                        placeholder="Select a duration"
                                                        style={{
                                                          width: "100%",
                                                        }}
                                                        onChange={(value) =>
                                                          handleExcludeDays(
                                                            value,
                                                            location.location_id
                                                          )
                                                        }
                                                        options={daysOfWeek}
                                                      />
                                                      <span
                                                        className="red-para"
                                                        id={
                                                          "exclude_days-error-" +
                                                          location.location_id
                                                        }
                                                      ></span>
                                                    </div>
                                                    <div
                                                      className="biz-col-1"
                                                      style={{
                                                        paddingTop: "15px",
                                                      }}
                                                    >
                                                      <span
                                                        onClick={() =>
                                                          getSlots(
                                                            location.location_id
                                                          )
                                                        }
                                                      >
                                                        <Button
                                                          size={"middle"}
                                                          type="primary"
                                                          style={{
                                                            marginTop: "8px",
                                                          }}
                                                        >
                                                          {" "}
                                                          Apply{" "}
                                                        </Button>
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="slots-list">
                                                    <div className="biz-row slots-head">
                                                      <div className="biz-col-2">
                                                        Day
                                                      </div>
                                                      <div className="biz-col-2">
                                                        Start Time
                                                      </div>
                                                      <div className="biz-col-2">
                                                        End Time
                                                      </div>
                                                      <div className="biz-col-2">
                                                        Slot state
                                                      </div>
                                                      <div className="biz-col-2">
                                                        Action
                                                      </div>
                                                    </div>
                                                    {location?.slots ? (
                                                      location.slots.map(
                                                        (slot, index) => (
                                                          <>
                                                            <div
                                                              className="biz-row border-bottom"
                                                              id={
                                                                "slot-row-" +
                                                                location.location_id +
                                                                "-index-" +
                                                                index
                                                              }
                                                            >
                                                              <div className="biz-col-2">
                                                                {slot.day}
                                                              </div>
                                                              <div className="biz-col-2">
                                                                {slot?.allSlots?.map(
                                                                  (
                                                                    currentTimeArray,
                                                                    currentTimeIndex
                                                                  ) => (
                                                                    <>
                                                                      <Input
                                                                        id={
                                                                          "slot-row-" +
                                                                          location.location_id +
                                                                          "-index-" +
                                                                          index +
                                                                          "-currentTimeIndex-" +
                                                                          currentTimeIndex
                                                                        }
                                                                        value={
                                                                          currentTimeArray.currentTime
                                                                        }
                                                                        style={{
                                                                          marginBottom:
                                                                            "5px",
                                                                        }}
                                                                      />
                                                                    </>
                                                                  )
                                                                )}
                                                              </div>
                                                              <div className="biz-col-2">
                                                                {slot?.allSlots?.map(
                                                                  (
                                                                    endTimeSlotArray,
                                                                    endTimeSlotIndex
                                                                  ) => (
                                                                    <>
                                                                      <Input
                                                                        id={
                                                                          "slot-row-" +
                                                                          location.location_id +
                                                                          "-index-" +
                                                                          index +
                                                                          "-endTimeSlotIndex-" +
                                                                          endTimeSlotIndex
                                                                        }
                                                                        value={
                                                                          endTimeSlotArray.endTimeSlot
                                                                        }
                                                                        style={{
                                                                          marginBottom:
                                                                            "5px",
                                                                        }}
                                                                      />
                                                                    </>
                                                                  )
                                                                )}
                                                              </div>
                                                              <div className="biz-col-2">
                                                                {slot?.allSlots?.map(
                                                                  (
                                                                    endTimeSlotArray,
                                                                    endTimeSlotIndex
                                                                  ) => (
                                                                    <>
                                                                      <div className="box-for-same-height">
                                                                        <label className="biz-toggle-switch">
                                                                          {endTimeSlotArray
                                                                            .blackList
                                                                            .length >
                                                                          0 ? (
                                                                            <>
                                                                              <span
                                                                                className="biz-slider"
                                                                                id={
                                                                                  "checkbox-switch-" +
                                                                                  location.location_id +
                                                                                  "-index-" +
                                                                                  index +
                                                                                  "-endTimeSlotIndex-" +
                                                                                  endTimeSlotIndex +
                                                                                  "-" +
                                                                                  slot.day
                                                                                }
                                                                              ></span>
                                                                            </>
                                                                          ) : (
                                                                            <>
                                                                              <span
                                                                                className="biz-slider active"
                                                                                id={
                                                                                  "checkbox-switch-" +
                                                                                  location.location_id +
                                                                                  "-index-" +
                                                                                  index +
                                                                                  "-endTimeSlotIndex-" +
                                                                                  endTimeSlotIndex +
                                                                                  "-" +
                                                                                  slot.day
                                                                                }
                                                                              ></span>
                                                                            </>
                                                                          )}
                                                                        </label>
                                                                        <Popconfirm
                                                                          title={
                                                                            "Offline " +
                                                                            endTimeSlotArray.currentTime +
                                                                            "-" +
                                                                            endTimeSlotArray.endTimeSlot
                                                                          }
                                                                          description={
                                                                            <ul className="disabled-date-list">
                                                                              {slot?.all_dates.map(
                                                                                (
                                                                                  item
                                                                                ) => (
                                                                                  <>
                                                                                    <li>
                                                                                      <label>
                                                                                        <input
                                                                                          type="checkbox"
                                                                                          className="unchecked-checkbox"
                                                                                          onChange={() =>
                                                                                            setBlackOutDateForSlotTime(
                                                                                              item,
                                                                                              location.location_id,
                                                                                              index,
                                                                                              endTimeSlotIndex
                                                                                            )
                                                                                          }
                                                                                          value={
                                                                                            item
                                                                                          }
                                                                                        />{" "}
                                                                                        {
                                                                                          item
                                                                                        }
                                                                                      </label>
                                                                                    </li>
                                                                                  </>
                                                                                )
                                                                              )}
                                                                            </ul>
                                                                          }
                                                                          okText="Apply"
                                                                        >
                                                                          <Button className="hidden-button">
                                                                            Delete
                                                                          </Button>
                                                                        </Popconfirm>
                                                                      </div>
                                                                    </>
                                                                  )
                                                                )}
                                                              </div>
                                                              <div className="biz-col-2">
                                                                {slot?.allSlots?.map(
                                                                  (
                                                                    endTimeSlotArray,
                                                                    endTimeSlotIndex
                                                                  ) => (
                                                                    <>
                                                                      <div className="box-for-same-height">
                                                                        {" "}
                                                                        <span
                                                                          onClick={() =>
                                                                            removeTimeSlot(
                                                                              location.location_id,
                                                                              index,
                                                                              endTimeSlotIndex
                                                                            )
                                                                          }
                                                                        >
                                                                          <DeleteOutlined
                                                                            style={{
                                                                              color:
                                                                                "red",
                                                                              fontSize:
                                                                                "20px",
                                                                            }}
                                                                          />
                                                                        </span>
                                                                      </div>
                                                                    </>
                                                                  )
                                                                )}
                                                              </div>
                                                            </div>
                                                          </>
                                                        )
                                                      )
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </>
                                      )}
                                    </>
                                  ))
                                : ""}
                            </>
                          ) : (
                            <>
                              {locationData
                                ? locationData?.map((location, index) => (
                                    <>
                                      {resourceRequired === 1 ? (
                                        <>
                                          {location?.resources &&
                                          location?.timing.startTime &&
                                          location?.timing.endTime ? (
                                            <>
                                              <div className="biz-col-2">
                                                <span
                                                  className="slot-location-list-heading"
                                                  onClick={(e) =>
                                                    openSlotBox(
                                                      e,
                                                      location?.location_id,
                                                      location?.location_title
                                                    )
                                                  }
                                                  size={"large"}
                                                >
                                                  {" "}
                                                  {
                                                    location?.location_title
                                                  }{" "}
                                                </span>
                                              </div>
                                            </>
                                          ) : (
                                            <> </>
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          {location?.timing.startTime &&
                                          location?.timing.endTime ? (
                                            <>
                                              <div className="biz-col-2">
                                                <span
                                                  className="slot-location-list-heading"
                                                  onClick={(e) =>
                                                    openSlotBox(
                                                      e,
                                                      location?.location_id,
                                                      location?.location_title
                                                    )
                                                  }
                                                  size={"middle"}
                                                >
                                                  {" "}
                                                  {
                                                    location?.location_title
                                                  }{" "}
                                                </span>
                                              </div>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </>
                                      )}
                                    </>
                                  ))
                                : ""}
                              {locationData
                                ? locationData?.map((location, index) => (
                                    <>
                                      {resourceRequired === 1 ? (
                                        <>
                                          {location?.resources &&
                                          location?.timing.startTime &&
                                          location?.timing.endTime ? (
                                            <>
                                              <div
                                                className="biz-row slot-box"
                                                id={
                                                  "slot-box-" +
                                                  location.location_id
                                                }
                                              >
                                                {/* <div className="biz-col-12"> <h4 id={"locationData-table-heading-" + location.location_id}></h4></div> */}
                                                <div className="biz-col-12">
                                                  <div
                                                    className="biz-row"
                                                    style={{
                                                      margin: "5px -15px",
                                                    }}
                                                  >
                                                    <div className="biz-col-2">
                                                      <label>
                                                        Duration per service
                                                      </label>
                                                      <Select
                                                        value={
                                                          location.hasOwnProperty(
                                                            "duration"
                                                          )
                                                            ? location.duration
                                                            : 0
                                                        }
                                                        placeholder="Select Duration Time"
                                                        style={{
                                                          width: "100%",
                                                        }}
                                                        onChange={(value) =>
                                                          handleDuration(
                                                            value,
                                                            location.location_id
                                                          )
                                                        }
                                                        options={[
                                                          {
                                                            value: 0,
                                                            label:
                                                              "Select Duration Time",
                                                          },
                                                          {
                                                            value: 15,
                                                            label: "15 Min",
                                                          },
                                                          {
                                                            value: 30,
                                                            label: "30 Min",
                                                          },
                                                          {
                                                            value: 60,
                                                            label: "60 Min",
                                                          },
                                                          {
                                                            value: 90,
                                                            label: "90 Min",
                                                          },
                                                        ]}
                                                      />
                                                      <span
                                                        className="red-para"
                                                        id={
                                                          "duration-error-" +
                                                          location.location_id
                                                        }
                                                      ></span>
                                                    </div>
                                                    <div className="biz-col-2">
                                                      <label>Buffer time</label>
                                                      <Select
                                                        placeholder="Buffer time"
                                                        style={{
                                                          width: "100%",
                                                        }}
                                                        value={
                                                          location.hasOwnProperty(
                                                            "buffer"
                                                          )
                                                            ? location.buffer
                                                            : 0
                                                        }
                                                        onChange={(value) =>
                                                          handleBufferTime(
                                                            value,
                                                            location.location_id
                                                          )
                                                        }
                                                        options={[
                                                          {
                                                            value: 0,
                                                            label:
                                                              "Select Buffer Time",
                                                          },
                                                          {
                                                            value: 5,
                                                            label: 5,
                                                          },
                                                          {
                                                            value: 10,
                                                            label: 10,
                                                          },
                                                          {
                                                            value: 15,
                                                            label: 15,
                                                          },
                                                        ]}
                                                      />
                                                      <span
                                                        className="red-para"
                                                        id={
                                                          "buffer-error-" +
                                                          location.location_id
                                                        }
                                                      ></span>
                                                    </div>
                                                    <div className="biz-col-2">
                                                      <label>Start Date</label>
                                                      <input
                                                        type="date"
                                                        min={minDate}
                                                        value={
                                                          location.hasOwnProperty(
                                                            "start_date"
                                                          )
                                                            ? location.start_date
                                                            : ""
                                                        }
                                                        onChange={(e) =>
                                                          handleStartDate(
                                                            e,
                                                            location.location_id
                                                          )
                                                        }
                                                        className="biz-input"
                                                        style={{
                                                          width: "100%",
                                                        }}
                                                      />
                                                      <span
                                                        className="red-para"
                                                        id={
                                                          "start_date-error-" +
                                                          location.location_id
                                                        }
                                                      ></span>
                                                    </div>
                                                    <div className="biz-col-2">
                                                      <label>End Date</label>
                                                      <input
                                                        type="date"
                                                        value={
                                                          location.hasOwnProperty(
                                                            "end_date"
                                                          )
                                                            ? location.end_date
                                                            : ""
                                                        }
                                                        id={
                                                          "end-date-" +
                                                          location.location_id
                                                        }
                                                        onChange={(e) =>
                                                          handleEndDate(
                                                            e,
                                                            location.location_id
                                                          )
                                                        }
                                                        className="biz-input"
                                                        style={{
                                                          width: "100%",
                                                        }}
                                                        disabled
                                                      />
                                                      <span
                                                        className="red-para"
                                                        id={
                                                          "end_date-error-" +
                                                          location.location_id
                                                        }
                                                      ></span>
                                                    </div>

                                                    <div className="biz-col-3">
                                                      <label>
                                                        Exclude days
                                                      </label>
                                                      <Select
                                                        mode="multiple"
                                                        placeholder="Select a duration"
                                                        style={{
                                                          width: "100%",
                                                        }}
                                                        onChange={(value) =>
                                                          handleExcludeDays(
                                                            value,
                                                            location.location_id
                                                          )
                                                        }
                                                        options={daysOfWeek}
                                                        //onDeselect={(value) => removeExcludeDays(value, location.location_id)}
                                                      />
                                                      <span
                                                        className="red-para"
                                                        id={
                                                          "exclude_days-error-" +
                                                          location.location_id
                                                        }
                                                      ></span>
                                                    </div>
                                                    <div
                                                      className="biz-col-1"
                                                      style={{
                                                        paddingTop: "15px",
                                                      }}
                                                    >
                                                      <span
                                                        onClick={() =>
                                                          getSlots(
                                                            location.location_id
                                                          )
                                                        }
                                                      >
                                                        <Button
                                                          size={"middle"}
                                                          type="primary"
                                                          style={{
                                                            marginTop: "8px",
                                                          }}
                                                        >
                                                          {" "}
                                                          Apply{" "}
                                                        </Button>
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="slots-list">
                                                    <div className="biz-row slots-head">
                                                      <div className="biz-col-2">
                                                        Day
                                                      </div>
                                                      <div className="biz-col-2">
                                                        Start Time
                                                      </div>
                                                      <div className="biz-col-2">
                                                        End Time
                                                      </div>
                                                      <div className="biz-col-2">
                                                        Slot state
                                                      </div>
                                                      <div className="biz-col-2">
                                                        Action
                                                      </div>
                                                    </div>
                                                    {location?.slots ? (
                                                      location.slots.map(
                                                        (slot, index) => (
                                                          <>
                                                            <div
                                                              className="biz-row border-bottom"
                                                              id={
                                                                "slot-row-" +
                                                                location.location_id +
                                                                "-index-" +
                                                                index
                                                              }
                                                            >
                                                              <div className="biz-col-2">
                                                                {slot.day}
                                                              </div>
                                                              <div className="biz-col-2">
                                                                {slot?.allSlots?.map(
                                                                  (
                                                                    currentTimeArray,
                                                                    currentTimeIndex
                                                                  ) => (
                                                                    <>
                                                                      <Input
                                                                        id={
                                                                          "slot-row-" +
                                                                          location.location_id +
                                                                          "-index-" +
                                                                          index +
                                                                          "-currentTimeIndex-" +
                                                                          currentTimeIndex
                                                                        }
                                                                        value={
                                                                          currentTimeArray.currentTime
                                                                        }
                                                                        style={{
                                                                          marginBottom:
                                                                            "5px",
                                                                        }}
                                                                      />
                                                                    </>
                                                                  )
                                                                )}
                                                              </div>
                                                              <div className="biz-col-2">
                                                                {slot?.allSlots?.map(
                                                                  (
                                                                    endTimeSlotArray,
                                                                    endTimeSlotIndex
                                                                  ) => (
                                                                    <>
                                                                      <Input
                                                                        id={
                                                                          "slot-row-" +
                                                                          location.location_id +
                                                                          "-index-" +
                                                                          index +
                                                                          "-endTimeSlotIndex-" +
                                                                          endTimeSlotIndex
                                                                        }
                                                                        value={
                                                                          endTimeSlotArray.endTimeSlot
                                                                        }
                                                                        style={{
                                                                          marginBottom:
                                                                            "5px",
                                                                        }}
                                                                      />
                                                                    </>
                                                                  )
                                                                )}
                                                              </div>
                                                              <div className="biz-col-2">
                                                                {slot?.allSlots?.map(
                                                                  (
                                                                    endTimeSlotArray,
                                                                    endTimeSlotIndex
                                                                  ) => (
                                                                    <>
                                                                      <div className="box-for-same-height">
                                                                        <label className="biz-toggle-switch">
                                                                          {endTimeSlotArray
                                                                            .blackList
                                                                            .length >
                                                                          0 ? (
                                                                            <>
                                                                              <span
                                                                                className="biz-slider"
                                                                                id={
                                                                                  "checkbox-switch-" +
                                                                                  location.location_id +
                                                                                  "-index-" +
                                                                                  index +
                                                                                  "-endTimeSlotIndex-" +
                                                                                  endTimeSlotIndex +
                                                                                  "-" +
                                                                                  slot.day
                                                                                }
                                                                              ></span>
                                                                            </>
                                                                          ) : (
                                                                            <>
                                                                              <span
                                                                                className="biz-slider active"
                                                                                id={
                                                                                  "checkbox-switch-" +
                                                                                  location.location_id +
                                                                                  "-index-" +
                                                                                  index +
                                                                                  "-endTimeSlotIndex-" +
                                                                                  endTimeSlotIndex +
                                                                                  "-" +
                                                                                  slot.day
                                                                                }
                                                                              ></span>
                                                                            </>
                                                                          )}
                                                                        </label>
                                                                        <Popconfirm
                                                                          title={
                                                                            "Offline " +
                                                                            endTimeSlotArray.currentTime +
                                                                            "-" +
                                                                            endTimeSlotArray.endTimeSlot
                                                                          }
                                                                          description={
                                                                            <ul className="disabled-date-list">
                                                                              {slot?.all_dates.map(
                                                                                (
                                                                                  item
                                                                                ) => (
                                                                                  <>
                                                                                    <li>
                                                                                      <label>
                                                                                        <input
                                                                                          type="checkbox"
                                                                                          className="unchecked-checkbox"
                                                                                          onChange={() =>
                                                                                            setBlackOutDateForSlotTime(
                                                                                              item,
                                                                                              location.location_id,
                                                                                              index,
                                                                                              endTimeSlotIndex
                                                                                            )
                                                                                          }
                                                                                          value={
                                                                                            item
                                                                                          }
                                                                                        />{" "}
                                                                                        {
                                                                                          item
                                                                                        }
                                                                                      </label>
                                                                                    </li>
                                                                                  </>
                                                                                )
                                                                              )}
                                                                            </ul>
                                                                          }
                                                                          okText="Apply"
                                                                        >
                                                                          <Button className="hidden-button">
                                                                            Delete
                                                                          </Button>
                                                                        </Popconfirm>
                                                                      </div>
                                                                    </>
                                                                  )
                                                                )}
                                                              </div>
                                                              <div className="biz-col-2">
                                                                {slot?.allSlots?.map(
                                                                  (
                                                                    endTimeSlotArray,
                                                                    endTimeSlotIndex
                                                                  ) => (
                                                                    <>
                                                                      <div className="box-for-same-height">
                                                                        {" "}
                                                                        <span
                                                                          onClick={() =>
                                                                            removeTimeSlot(
                                                                              location.location_id,
                                                                              index,
                                                                              endTimeSlotIndex
                                                                            )
                                                                          }
                                                                        >
                                                                          <DeleteOutlined
                                                                            style={{
                                                                              color:
                                                                                "red",
                                                                              fontSize:
                                                                                "20px",
                                                                            }}
                                                                          />
                                                                        </span>
                                                                      </div>
                                                                    </>
                                                                  )
                                                                )}
                                                              </div>
                                                            </div>
                                                          </>
                                                        )
                                                      )
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            </>
                                          ) : (
                                            <> </>
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          {location?.timing.startTime &&
                                          location?.timing.endTime ? (
                                            <>
                                              <div
                                                className="biz-row slot-box"
                                                id={
                                                  "slot-box-" +
                                                  location.location_id
                                                }
                                              >
                                                {/* <div className="biz-col-12"> <h4 id={"locationData-table-heading-" + location.location_id}></h4></div> */}
                                                <div className="biz-col-12">
                                                  <div
                                                    className="biz-row"
                                                    style={{
                                                      margin: "5px -15px",
                                                    }}
                                                  >
                                                    <div className="biz-col-2">
                                                      <label>
                                                        Duration per service
                                                      </label>
                                                      <Select
                                                        value={
                                                          location.hasOwnProperty(
                                                            "duration"
                                                          )
                                                            ? location.duration
                                                            : 0
                                                        }
                                                        placeholder="Select Duration Time"
                                                        style={{
                                                          width: "100%",
                                                        }}
                                                        onChange={(value) =>
                                                          handleDuration(
                                                            value,
                                                            location.location_id
                                                          )
                                                        }
                                                        options={[
                                                          {
                                                            value: 0,
                                                            label:
                                                              "Select Duration Time",
                                                          },
                                                          {
                                                            value: 15,
                                                            label: "15 Min",
                                                          },
                                                          {
                                                            value: 30,
                                                            label: "30 Min",
                                                          },
                                                          {
                                                            value: 60,
                                                            label: "60 Min",
                                                          },
                                                          {
                                                            value: 90,
                                                            label: "90 Min",
                                                          },
                                                        ]}
                                                      />
                                                      <span
                                                        className="red-para"
                                                        id={
                                                          "duration-error-" +
                                                          location.location_id
                                                        }
                                                      ></span>
                                                    </div>
                                                    <div className="biz-col-2">
                                                      <label>Buffer time</label>
                                                      <Select
                                                        placeholder="Buffer time"
                                                        style={{
                                                          width: "100%",
                                                        }}
                                                        value={
                                                          location.hasOwnProperty(
                                                            "buffer"
                                                          )
                                                            ? location.buffer
                                                            : 0
                                                        }
                                                        onChange={(value) =>
                                                          handleBufferTime(
                                                            value,
                                                            location.location_id
                                                          )
                                                        }
                                                        options={[
                                                          {
                                                            value: 0,
                                                            label:
                                                              "Select Buffer Time",
                                                          },
                                                          {
                                                            value: 5,
                                                            label: 5,
                                                          },
                                                          {
                                                            value: 10,
                                                            label: 10,
                                                          },
                                                          {
                                                            value: 15,
                                                            label: 15,
                                                          },
                                                        ]}
                                                      />
                                                      <span
                                                        className="red-para"
                                                        id={
                                                          "buffer-error-" +
                                                          location.location_id
                                                        }
                                                      ></span>
                                                    </div>
                                                    <div className="biz-col-2">
                                                      <label>Start Date</label>
                                                      <input
                                                        type="date"
                                                        min={minDate}
                                                        value={
                                                          location.hasOwnProperty(
                                                            "start_date"
                                                          )
                                                            ? location.start_date
                                                            : ""
                                                        }
                                                        onChange={(e) =>
                                                          handleStartDate(
                                                            e,
                                                            location.location_id
                                                          )
                                                        }
                                                        className="biz-input"
                                                        style={{
                                                          width: "100%",
                                                        }}
                                                      />
                                                      <span
                                                        className="red-para"
                                                        id={
                                                          "start_date-error-" +
                                                          location.location_id
                                                        }
                                                      ></span>
                                                    </div>
                                                    <div className="biz-col-2">
                                                      <label>End Date</label>
                                                      <input
                                                        type="date"
                                                        value={
                                                          location.hasOwnProperty(
                                                            "end_date"
                                                          )
                                                            ? location.end_date
                                                            : ""
                                                        }
                                                        id={
                                                          "end-date-" +
                                                          location.location_id
                                                        }
                                                        onChange={(e) =>
                                                          handleEndDate(
                                                            e,
                                                            location.location_id
                                                          )
                                                        }
                                                        className="biz-input"
                                                        style={{
                                                          width: "100%",
                                                        }}
                                                        disabled
                                                      />
                                                      <span
                                                        className="red-para"
                                                        id={
                                                          "end_date-error-" +
                                                          location.location_id
                                                        }
                                                      ></span>
                                                    </div>

                                                    <div className="biz-col-3">
                                                      <label>
                                                        Exclude days
                                                      </label>
                                                      <Select
                                                        mode="multiple"
                                                        placeholder="Select a duration"
                                                        style={{
                                                          width: "100%",
                                                        }}
                                                        onChange={(value) =>
                                                          handleExcludeDays(
                                                            value,
                                                            location.location_id
                                                          )
                                                        }
                                                        options={daysOfWeek}
                                                      />
                                                      <span
                                                        className="red-para"
                                                        id={
                                                          "exclude_days-error-" +
                                                          location.location_id
                                                        }
                                                      ></span>
                                                    </div>
                                                    <div
                                                      className="biz-col-1"
                                                      style={{
                                                        paddingTop: "15px",
                                                      }}
                                                    >
                                                      <span
                                                        onClick={() =>
                                                          getSlots(
                                                            location.location_id
                                                          )
                                                        }
                                                      >
                                                        <Button
                                                          size={"middle"}
                                                          type="primary"
                                                          style={{
                                                            marginTop: "8px",
                                                          }}
                                                        >
                                                          {" "}
                                                          Apply{" "}
                                                        </Button>
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="slots-list">
                                                    <div className="biz-row slots-head">
                                                      <div className="biz-col-2">
                                                        Day
                                                      </div>
                                                      <div className="biz-col-2">
                                                        Start Time
                                                      </div>
                                                      <div className="biz-col-2">
                                                        End Time
                                                      </div>
                                                      <div className="biz-col-2">
                                                        Slot state
                                                      </div>
                                                      <div className="biz-col-2">
                                                        Action
                                                      </div>
                                                    </div>
                                                    {location?.slots ? (
                                                      location.slots.map(
                                                        (slot, index) => (
                                                          <>
                                                            <div
                                                              className="biz-row border-bottom"
                                                              id={
                                                                "slot-row-" +
                                                                location.location_id +
                                                                "-index-" +
                                                                index
                                                              }
                                                            >
                                                              <div className="biz-col-2">
                                                                {slot.day}
                                                              </div>
                                                              <div className="biz-col-2">
                                                                {slot?.allSlots?.map(
                                                                  (
                                                                    currentTimeArray,
                                                                    currentTimeIndex
                                                                  ) => (
                                                                    <>
                                                                      <Input
                                                                        id={
                                                                          "slot-row-" +
                                                                          location.location_id +
                                                                          "-index-" +
                                                                          index +
                                                                          "-currentTimeIndex-" +
                                                                          currentTimeIndex
                                                                        }
                                                                        value={
                                                                          currentTimeArray.currentTime
                                                                        }
                                                                        style={{
                                                                          marginBottom:
                                                                            "5px",
                                                                        }}
                                                                      />
                                                                    </>
                                                                  )
                                                                )}
                                                              </div>
                                                              <div className="biz-col-2">
                                                                {slot?.allSlots?.map(
                                                                  (
                                                                    endTimeSlotArray,
                                                                    endTimeSlotIndex
                                                                  ) => (
                                                                    <>
                                                                      <Input
                                                                        id={
                                                                          "slot-row-" +
                                                                          location.location_id +
                                                                          "-index-" +
                                                                          index +
                                                                          "-endTimeSlotIndex-" +
                                                                          endTimeSlotIndex
                                                                        }
                                                                        value={
                                                                          endTimeSlotArray.endTimeSlot
                                                                        }
                                                                        style={{
                                                                          marginBottom:
                                                                            "5px",
                                                                        }}
                                                                      />
                                                                    </>
                                                                  )
                                                                )}
                                                              </div>
                                                              <div className="biz-col-2">
                                                                {slot?.allSlots?.map(
                                                                  (
                                                                    endTimeSlotArray,
                                                                    endTimeSlotIndex
                                                                  ) => (
                                                                    <>
                                                                      <div className="box-for-same-height">
                                                                        <label className="biz-toggle-switch">
                                                                          {endTimeSlotArray
                                                                            .blackList
                                                                            .length >
                                                                          0 ? (
                                                                            <>
                                                                              <span
                                                                                className="biz-slider"
                                                                                id={
                                                                                  "checkbox-switch-" +
                                                                                  location.location_id +
                                                                                  "-index-" +
                                                                                  index +
                                                                                  "-endTimeSlotIndex-" +
                                                                                  endTimeSlotIndex +
                                                                                  "-" +
                                                                                  slot.day
                                                                                }
                                                                              ></span>
                                                                            </>
                                                                          ) : (
                                                                            <>
                                                                              <span
                                                                                className="biz-slider active"
                                                                                id={
                                                                                  "checkbox-switch-" +
                                                                                  location.location_id +
                                                                                  "-index-" +
                                                                                  index +
                                                                                  "-endTimeSlotIndex-" +
                                                                                  endTimeSlotIndex +
                                                                                  "-" +
                                                                                  slot.day
                                                                                }
                                                                              ></span>
                                                                            </>
                                                                          )}
                                                                        </label>
                                                                        <Popconfirm
                                                                          title={
                                                                            "Offline " +
                                                                            endTimeSlotArray.currentTime +
                                                                            "-" +
                                                                            endTimeSlotArray.endTimeSlot
                                                                          }
                                                                          description={
                                                                            <ul className="disabled-date-list">
                                                                              {slot?.all_dates.map(
                                                                                (
                                                                                  item
                                                                                ) => (
                                                                                  <>
                                                                                    <li>
                                                                                      <label>
                                                                                        <input
                                                                                          type="checkbox"
                                                                                          className="unchecked-checkbox"
                                                                                          onChange={() =>
                                                                                            setBlackOutDateForSlotTime(
                                                                                              item,
                                                                                              location.location_id,
                                                                                              index,
                                                                                              endTimeSlotIndex
                                                                                            )
                                                                                          }
                                                                                          value={
                                                                                            item
                                                                                          }
                                                                                        />{" "}
                                                                                        {
                                                                                          item
                                                                                        }
                                                                                      </label>
                                                                                    </li>
                                                                                  </>
                                                                                )
                                                                              )}
                                                                            </ul>
                                                                          }
                                                                          okText="Apply"
                                                                        >
                                                                          <Button className="hidden-button">
                                                                            Delete
                                                                          </Button>
                                                                        </Popconfirm>
                                                                      </div>
                                                                    </>
                                                                  )
                                                                )}
                                                              </div>
                                                              <div className="biz-col-2">
                                                                {slot?.allSlots?.map(
                                                                  (
                                                                    endTimeSlotArray,
                                                                    endTimeSlotIndex
                                                                  ) => (
                                                                    <>
                                                                      <div className="box-for-same-height">
                                                                        {" "}
                                                                        <span
                                                                          onClick={() =>
                                                                            removeTimeSlot(
                                                                              location.location_id,
                                                                              index,
                                                                              endTimeSlotIndex
                                                                            )
                                                                          }
                                                                        >
                                                                          <DeleteOutlined
                                                                            style={{
                                                                              color:
                                                                                "red",
                                                                              fontSize:
                                                                                "20px",
                                                                            }}
                                                                          />
                                                                        </span>
                                                                      </div>
                                                                    </>
                                                                  )
                                                                )}
                                                              </div>
                                                            </div>
                                                          </>
                                                        )
                                                      )
                                                    ) : (
                                                      <></>
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </>
                                      )}
                                    </>
                                  ))
                                : ""}
                            </>
                          )}
                        </div>
                        {/* {locationData ? locationData?.map((location, index) => (<>

                          
                        </>)) : ''} */}
                      </div>
                    </>
                  )}
                  {apiErrors?.slots_date && (
                    <>
                      <span className="red-para-slot">
                        {apiErrors?.slots_date[0]}
                      </span>
                    </>
                  )}
                </>
              )}

              {/*  booking Price*/}
              {show_price_box && engine !== 6 && (
                <>
                  <div className="outline-box">
                    <div className="biz-row">
                      <div
                        className="biz-col-12"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <h3 style={{ color: "#72959A", fontWeight: "500" }}>
                          Pricing
                        </h3>
                        <span style={{ paddingLeft: "8px" }}>
                          <Popover
                            content={
                              <p>
                                Please ensure that the price you set accounts
                                for:<br></br>
                                1.Inclusion of GST or Taxes applicable by local
                                law payable by each vendor.<br></br>
                                2.The Stripe payment processing fees.<br></br>
                                3.The platform fees and commissions chargeable.
                              </p>
                            }
                            title="Important notice"
                            trigger="hover"
                          >
                            <InfoCircleFilled style={{ color: "#2c2c2c" }} />
                          </Popover>
                        </span>

                        {/* <div style={{ backgroundColor: '#F2F1F0', color: '#2c2c2c', border: '1px solid #72959A', fontSize: '12px', width: 'fit-content', margin: '10px 0', padding: '5px', borderRadius: '5px', lineHeight: '160%' }}>
                                            <p><strong></strong></p>
                                            <p>Please ensure that the price you set accounts for:</p>
                                            <p> 1.Inclusion of GST or Taxes applicable by local law payable by each vendor.</p>
                                            <p> 2.The Stripe payment processing fees.</p>
                                            <p> 3.The platfom fees and commissions chargable.</p>
                                        </div> */}
                      </div>
                      <div
                        className="biz-col-24"
                        style={{ paddingTop: "15px" }}
                      >
                        <div
                          style={{
                            display: "inline-block",
                            marginRight: "20px",
                          }}
                        >
                          {" "}
                          <label style={{ display: "block" }}>
                            Currency<span style={{ color: "red" }}>*</span>
                          </label>
                          <Select defaultValue="$">
                            <Option value="$">$</Option>
                          </Select>
                        </div>
                        <div style={{ display: "inline-block" }}>
                          {" "}
                          <label style={{ display: "block" }}>
                            Amount (inclusive of applicable GST)
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <InputNumber
                            controls={false}
                            placeholder="Enter Amount"
                            style={{ width: "100%" }}
                            onChange={(value) => {
                              // console.log(e);
                              setPricing({ ...pricing, price: value });
                              setDisabledSubmit(false);
                            }}
                            min={0}
                            step={0.01}
                          />
                        </div>
                        <div
                          style={{
                            display: "inline-block",
                            marginLeft: "15px",
                          }}
                        >
                          {" "}
                          <label style={{ display: "block" }}>
                            Discount(%)
                          </label>
                          <InputNumber
                            controls={false}
                            placeholder="Discount"
                            style={{ width: "100%" }}
                            onChange={(value) => {
                              setDiscount(value);
                            }}
                            min={0}
                          />
                        </div>
                        {apiErrors?.price && (
                          <>
                            <span className="red-para">
                              {apiErrors?.price[0]}
                            </span>
                          </>
                        )}
                      </div>
                      <div
                        className="biz-col-2"
                        style={{ paddingTop: "15px" }}
                      ></div>
                    </div>
                  </div>
                </>
              )}

              {buttonLoader ? (
                <>
                  <Button
                    type="primary"
                    size={"large"}
                    style={{ marginLeft: "10px", marginBottom: "50px" }}
                    disabled
                  >
                    {" "}
                    <Spin tip="Loading"></Spin> Save & Publish{" "}
                  </Button>
                  <Button
                    type="primary"
                    size={"large"}
                    style={{ marginLeft: "10px", marginBottom: "50px" }}
                    disabled
                  >
                    {" "}
                    <Spin tip="Loading"></Spin> Save AS Draft{" "}
                  </Button>
                </>
              ) : (
                <>
                  {disabledSubmit ? (
                    <>
                      <Button
                        type="primary"
                        size={"large"}
                        style={{ marginLeft: "10px", marginBottom: "50px" }}
                        disabled
                      >
                        {" "}
                        Save & Publish{" "}
                      </Button>
                      <span onClick={() => add_service(0, "draft")}>
                        <Button
                          type="primary"
                          size={"large"}
                          style={{ marginLeft: "10px", marginBottom: "50px" }}
                        >
                          {" "}
                          Save As Draft{" "}
                        </Button>
                      </span>
                    </>
                  ) : (
                    <>
                      <span onClick={() => add_service(1, "publish")}>
                        <Button
                          type="primary"
                          size={"large"}
                          style={{ marginLeft: "10px", marginBottom: "50px" }}
                        >
                          {" "}
                          Save & Publish{" "}
                        </Button>
                      </span>

                      <span onClick={() => add_service(0, "draft")}>
                        <Button
                          type="primary"
                          size={"large"}
                          style={{ marginLeft: "10px", marginBottom: "50px" }}
                        >
                          {" "}
                          Save AS Draft{" "}
                        </Button>
                      </span>
                    </>
                  )}
                </>
              )}
            </Content>
          </>
        )}
      </Fragment>
    </>
  );
};
export default ServiceForm;
