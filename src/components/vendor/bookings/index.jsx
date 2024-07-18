import { Children, Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Col,
  DatePicker,
  Dropdown,
  Space,
  Menu,
  Popconfirm,
  Row,
  Select,
  Spin,
  message,
  Calendar,
  Table,
} from "antd";

import CustomTable from "@/lib/commonComponent/CustomTable";
import {
  GetAllBookingsVendService,
  GetBookServicesNameService,
} from "@/Services/vendorBookings.service";
import {
  ArrowDownOutlined,
  DownOutlined,
  EllipsisOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { GetVendorLocationService } from "@/Services/vendorLocation.services";
import { CustomButton } from "@/components/User/home/styledComponent";
import {
  CustomBookHeadText,
  CustomBookText,
  TableRow,
} from "../styledComponent";
import { BodyDemi } from "@/styles/styledComponent";
import { FaCalendarAlt } from "react-icons/fa";
import { VscListFlat } from "react-icons/vsc";
import style from "./style.css";
import moment from "moment";
import { values } from "lodash";

const VendorBookings = () => {
  const { Option } = Select;
  const router = useRouter();
  const [showTable, setShowTable] = useState(false);
  const [inProgressData, setInProgressData] = useState([]);
  const [upComingData, setUpComingData] = useState([]);
  const [prevBookData, setPrevBookData] = useState([]);
  const [allSericeName, setAllServName] = useState();
  
  const [appliedTableType, setAppliedTableType] = useState("services");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState();
  const [selectedDate, setSelectedDate] = useState(
    moment().format("MMM DD YYYY")
  );
  const [location, setLocation] = useState();
  const { RangePicker } = DatePicker;
  const [filterData, setFilterData] = useState({
    service: "",
    dateRange: "",
    status: "",
    location:''
  });
  const [activeButton, setActiveButton] = useState("list");
  const [isOpen, setIsOpen] = useState(false);


  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const onSelect = (value) => {
    setSelectedDate(`${value.$d}`.substring(4, 15));
  };

  const cellRender = (current, info) => {
    const upData = upComingData.map((item) => item.booking_date);

    const map1 = new Map();
    upData.forEach((item) => {
      if (item === String(current.$d.toString().substring(4, 15))) {
        if (map1.has(item)) {
          map1.set(item, map1.get(item) + 1);
        } else {
          map1.set(item, 1);
        }
      }
    });

    const preData = prevBookData.map((item) => item.booking_date);

    const map2 = new Map();
    preData.forEach((item) => {
      if (item === String(current.$d.toString().substring(4, 15))) {
        if (map2.has(item)) {
          map2.set(item, map2.get(item) + 1);
        } else {
          map2.set(item, 1);
        }
      }
    });

    const inproData = inProgressData.map((item) => item.booking_date);

    const map3 = new Map();
    inproData.forEach((item) => {
      if (item === String(current.$d.toString().substring(4, 15))) {
        if (map3.has(item)) {
          map3.set(item, map3.get(item) + 1);
        } else {
          map3.set(item, 1);
        }
      }
    });

    return (
      <>
        {map1.get(String(current.$d.toString().substring(4, 15))) > 0 && (
          <div className="calender-div-1">
            {map1.get(String(current.$d.toString().substring(4, 15)))}
          </div>
        )}
        {map2.get(String(current.$d.toString().substring(4, 15))) > 0 && (
          <div className="calender-div-2">
            {map2.get(String(current.$d.toString().substring(4, 15)))}
          </div>
        )}
        {map3.get(String(current.$d.toString().substring(4, 15))) > 0 && (
          <div className="calender-div-3">
            {map3.get(String(current.$d.toString().substring(4, 15)))}
          </div>
        )}
      </>
    );
  };

  const columns1 = [
    {
      dataIndex: "time",
      width: 140,
    },
    {
      dataIndex: "services",
      width: 430,
      render: (text, record) => <CollapseComponent bookingData={record} />,
    },
  ];

  const generateData = () => {
    const hours = Array.from({ length: 24 }, (_, index) => {
      let hour = index % 12 === 0 ? 12 : index % 12;
      let period = index < 11 || index === 23 ? "AM" : "PM";
      return `${hour} ${period}`;
    });

    // Shift the array to start from "1 AM" and end with "12 AM"
    const shiftedHours = [
      ...hours.slice(1, 12),
      "12 PM",
      ...hours.slice(13, 24),
      "12 AM",
    ];

    const services = [upComingData, prevBookData, inProgressData];

    const data = shiftedHours.map((time, index) => ({
      key: `${index + 1}`,
      time,
      services,
    }));
    return data;
  };

  const data = generateData();

  function convertTo12HourFormat(time) {
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours, 10);
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${period}`;
  }

  function convertTo24Hour(timeStr) {
    const [time, modifier] = timeStr.split(" ");
    let hours = parseInt(time, 10);

    if (modifier === "AM") {
      if (hours === 12) {
        hours = 0;
      }
    } else {
      if (hours !== 12) {
        hours += 12;
      }
    }

    const formattedHours = hours.toString().padStart(2, "0");
    return `${formattedHours}:00`;
  }

  const CollapseItem1 = ({ item }) => {
    console.log("item===>", item);
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className="coallpse-item">
        <div className="collapse-header" onClick={toggleOpen}>
          <div
            className="customer-purchase-info-title"
            style={{
              backgroundColor: "#efc372",
              padding: "5px",
              borderRadius: "10px",
              borderLeft: "5px solid orange",
            }}
          >
            <h4>{item.service_name}</h4>
            <p>
              {convertTo12HourFormat(item.booking_start_time)} -{" "}
              {convertTo12HourFormat(item.booking_end_time)}
            </p>
          </div>
        </div>
        {isOpen && (
          <div className="collapse-content">
            <div
              className="customer-purchase-info"
              style={{ borderLeft: "5px solid orange" }}
            >
              <div style={{ paddingLeft: "5px" }}>
                <p
                  className="customer-product-title"
                  style={{ color: "orange" }}
                >
                  {item.status}
                </p>
                <h3 className="customer-service">{item.service_name}</h3>
                <p className="customer-title" style={{ color: "#2fa0ce" }}>
                  Time
                </p>
                <p className="customer-details">
                  {convertTo12HourFormat(item.booking_start_time)} -{" "}
                  {convertTo12HourFormat(item.booking_end_time)}
                </p>
                <p className="customer-title" style={{ color: "#2fa0ce" }}>
                  Customer name
                </p>
                <h3>{item.cust_name}</h3>
                <p className="customer-title" style={{ color: "#2fa0ce" }}>
                  Message
                </p>
                <p className="customer-details">
                  I need to loose weight in 2 months, and i am confused which
                  service should i choose
                </p>
                <span>
                  <Button
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      margin: "4px",
                    }}
                  >
                    Reschedule
                  </Button>
                  <Button>Cancel Booking</Button>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  const CollapseItem2 = ({ item }) => {
    console.log("item===>", item);
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className="coallpse-item">
        <div className="collapse-header" onClick={toggleOpen}>
          <div
            className="customer-purchase-info-title"
            style={{
              backgroundColor: "#7676ef",
              padding: "5px",
              borderRadius: "10px",
              borderLeft: "5px solid blue",
            }}
          >
            <h4>{item.service_name}</h4>
            <p>
              {convertTo12HourFormat(item.booking_start_time)} -{" "}
              {convertTo12HourFormat(item.booking_end_time)}
            </p>
          </div>
        </div>
        {isOpen && (
          <div className="collapse-content">
            <div
              className="customer-purchase-info"
              style={{ borderLeft: "5px solid blue" }}
            >
              <div style={{ paddingLeft: "5px" }}>
                <p
                  className="customer-product-title"
                  style={{ color: "orange" }}
                >
                  {item.status}
                </p>
                <h3 className="customer-service">{item.service_name}</h3>
                <p className="customer-title" style={{ color: "#2fa0ce" }}>
                  Time
                </p>
                <p className="customer-details">
                  {convertTo12HourFormat(item.booking_start_time)} -{" "}
                  {convertTo12HourFormat(item.booking_end_time)}
                </p>
                <p className="customer-title" style={{ color: "#2fa0ce" }}>
                  Customer name
                </p>
                <h3>{item.cust_name}</h3>
                 <p className="customer-title" style={{ color: "#2fa0ce" }}>
                  Message
                </p>
               {/* <p className="customer-details">
                  I need to loose weight in 2 months, and i am confused which
                  service should i choose
                </p> */}
                <span>
                  <Button
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      margin: "4px",
                    }}
                  >
                    Reschedule
                  </Button>
                  <Button>Cancel Booking</Button>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  const CollapseItem3 = ({ item }) => {
    console.log("item===>", item);
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className="coallpse-item">
        <div className="collapse-header" onClick={toggleOpen}>
          <div
            className="customer-purchase-info-title"
            style={{
              backgroundColor: "#a0e7b8",
              padding: "5px",
              borderRadius: "10px",
              borderLeft: "5px solid green",
            }}
          >
            <h4>{item.service_name}</h4>
            <p>
              {convertTo12HourFormat(item.booking_start_time)} -{" "}
              {convertTo12HourFormat(item.booking_end_time)}
            </p>
          </div>
        </div>
        {isOpen && (
          <div className="collapse-content">
            <div
              className="customer-purchase-info"
              style={{ borderLeft: "5px solid green" }}
            >
              <div style={{ paddingLeft: "5px" }}>
                <p
                  className="customer-product-title"
                  style={{ color: "orange" }}
                >
                  {item.status}
                </p>
                <h3 className="customer-service">{item.service_name}</h3>
                <p className="customer-title" style={{ color: "#2fa0ce" }}>
                  Time
                </p>
                <p className="customer-details">
                  {convertTo12HourFormat(item.booking_start_time)} -{" "}
                  {convertTo12HourFormat(item.booking_end_time)}
                </p>
                <p className="customer-title" style={{ color: "#2fa0ce" }}>
                  Customer name
                </p>
                <h3>{item.cust_name}</h3>
                  <p className="customer-title" style={{ color: "#2fa0ce" }}>
                  Message
                </p> 
               {/* <p className="customer-details">
                  I need to loose weight in 2 months, and i am confused which
                  service should i choose
                </p> */}
                <span>
                  <Button
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      margin: "4px",
                    }}
                  >
                    Reschedule
                  </Button>
                  <Button>Cancel Booking</Button>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const CollapseComponent = ({ bookingData }) => {
    let map1 = new Map();
    let map2 = new Map();
    let map3 = new Map();
    let map4 = new Map();
    let map5 = new Map();
    let map6 = new Map();

    const timeArray = data.map((item) => item.time);

    console.log("selectedDate===>", selectedDate);

    bookingData.services[0].forEach((ele) => {
      console.log(
        "ele.booking_date.substring(0, 11)===>",
        ele.booking_date.substring(0, 11)
      );
      if (ele.booking_date.substring(0, 11) === selectedDate) {
        const count = map1.get(ele) || 0;
        map1.set(ele, count + 1);
      }
    });

    timeArray.forEach((item, index) => {
      const convertedTime = convertTo24Hour(item).substring(0, 2);

      map1.forEach((count, value) => {
        if (convertedTime === value.booking_start_time.substring(0, 2)) {
          const upcom = { index: index + 1, data: value };
          map4.set(convertedTime, upcom);
        }
      });

      if (!map4.has(convertedTime)) {
        map4.set(convertedTime, null);
      }
    });

    bookingData.services[1].forEach((ele) => {
      if (ele.booking_date.substring(0, 11) === selectedDate) {
        const count = map2.get(ele) || 0;
        map2.set(ele, count + 1);
      }
    });

    timeArray.forEach((item, index) => {
      const convertedTime = convertTo24Hour(item).substring(0, 2);

      map2.forEach((count, value) => {
        if (convertedTime === value.booking_start_time.substring(0, 2)) {
          const prev = { index: index + 1, data: value };
          map3.set(convertedTime, prev);
        }
      });

      if (!map3.has(convertedTime)) {
        map3.set(convertedTime, null);
      }
    });

    bookingData.services[2].forEach((ele) => {
      if (ele.booking_date.substring(0, 11) === selectedDate) {
        const count = map6.get(ele) || 0;
        map6.set(ele, count + 1);
      }
    });

    timeArray.forEach((item, index) => {
      const convertedTime = convertTo24Hour(item).substring(0, 2);

      map5.forEach((count, value) => {
        if (convertedTime === value.booking_start_time.substring(0, 2)) {
          const prev = { index: index + 1, data: value };
          map6.set(convertedTime, prev);
        }
      });

      if (!map6.has(convertedTime)) {
        map6.set(convertedTime, null);
      }
    });

    const items11 = [
      {
        key: 1,
        label: generateLabel1(bookingData.key, map4),
        children: generateText1(bookingData.key, map4),
      },
    ];

    const items22 = [
      {
        key: 2,
        label: generateLabel2(bookingData.key, map3),
        children: generateText2(bookingData.key, map3),
      },
    ];

    const items33 = [
      {
        key: 3,
        label: generateLabel3(bookingData.key, map5),
        children: generateText3(bookingData.key, map5),
      },
    ];

    return (
      <>
        <div className="collapse-container">
          {items11.map((item) => (
            <CollapseItem
              key={item.key}
              label={item.label}
              children={item.children}
            />
          ))}
        </div>
        <div className="collapse-container">
          {items22.map((item) => (
            <CollapseItem
              key={item.key}
              label={item.label}
              children={item.children}
            />
          ))}
        </div>
        <div className="collapse-container">
          {items33.map((item) => (
            <CollapseItem
              key={item.key}
              label={item.label}
              children={item.children}
            />
          ))}
        </div>
      </>
    );
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a?.id - b?.id,
    },
    {
      title: "Service",
      dataIndex: "service_name",
      key: "service_name",
    },
    {
      title: "Customer",
      dataIndex: "cust_name",
      key: "cust_name",
    },
    {
      title: "Date",
      dataIndex: "booking_date",
      key: "booking_date",
      // sorter: (a, b) => a?.booking_date - b?.booking_date,
      sorter: (a, b) => {
        const dateA = new Date(a.booking_date);
        const dateB = new Date(b.booking_date);

        return dateA - dateB;
      },
    },
    {
      title: "Timings",
      dataIndex: "booking_start_time",
      key: "booking_start_time",
      align: "center",
      sorter: (a, b) => {
        const timeA = timeToMinutes(a.booking_start_time);
        const timeB = timeToMinutes(b.booking_start_time);

        return timeA - timeB;
      },
    },
    {
      title: "Locations",
      dataIndex: "location_name",
      key: "location_name",
      align: "center",
    },
    {
      title: "Resour",
      dataIndex: "resource_name",
      key: "resource_name",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      sorter: (a, b) => a?.price - b?.price,
      render: (text, record) => {
        return (
          <>
            <strong>{`$ ${text}`}</strong>
          </>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
    },
    {
      title: "",
      key: "actions",
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu onClick={(e) => handleBookingClick(e, record)}>
              <Menu.Item key="view">View</Menu.Item>
              {/* <Menu.Item key="delete">Delete</Menu.Item> */}
            </Menu>
          }
          trigger={["click"]}
          placement="bottomRight"
        >
          <EllipsisOutlined style={{ cursor: "pointer" }} />
        </Dropdown>
      ),
    },
  ];

  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  useEffect(() => {
    (async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      await FetchAllVendorBookings({ user_id: userId });
      await FetchServiceNames({ user_id: userId, token: token });
      const res = await GetVendorLocationService(userId);
      setLocation(res.response.data.data.userLocations);
    })();
  }, [filterData, appliedTableType]);

  const handleBookingClick = (e, record) => {
    if (e.key === "view") {
      router.push(
        `/vendor/booking-detail?booking_id=${encodeURIComponent(record?.id)}`
      );
    } else if (e.key === "delete") {
      console.log("Deleting record:", record);
    }
  };

  const FetchAllVendorBookings = async (data) => {
    try {
      setIsLoading(true);
      const response = await GetAllBookingsVendService(data);
      // console.log("response booking---", response);
      let result = response?.response?.data;
      console.log("result===>", result);

      if (result && result?.services && appliedTableType === "services") {
        result = result.services;
        console.log("response booking---", result);
      }

      if (
        result &&
        result?.appointments &&
        appliedTableType === "appointments"
      ) {
        result = result.appointments;
      }

      if (response?.response?.status === 200) {
        setShowTable(true);

        if (hasValues(filterData)) {
          const UpComingTableData = applyFilters(result?.upcoming, filterData);

          UpComingTableData &&
            UpComingTableData.length > 0 &&
            UpComingTableData.sort((a, b) => b?.id - a?.id);
          setUpComingData(UpComingTableData);

          const InProgressTableData = applyFilters(
            result?.inprogress,
            filterData
          );
          debugger;
          InProgressTableData &&
            InProgressTableData.length > 0 &&
            InProgressTableData.sort((a, b) => b?.id - a?.id);
          setInProgressData(InProgressTableData);

          const PreviousTableData = applyFilters(result?.previous, filterData);
          PreviousTableData &&
            PreviousTableData.length > 0 &&
            PreviousTableData.sort((a, b) => b?.id - a?.id);
          setPrevBookData(PreviousTableData);
        } else {
          result?.upcoming &&
            result?.upcoming.length > 0 &&
            result?.upcoming.sort((a, b) => b?.id - a?.id);
          setUpComingData(result?.upcoming);

          result?.inprogress &&
            result?.inprogress.length > 0 &&
            result?.inprogress.sort((a, b) => b?.id - a?.id);
          setInProgressData(result?.inprogress);

          result?.previous &&
            result?.previous.length > 0 &&
            result?.previous.sort((a, b) => b?.id - a?.id);
          setPrevBookData(result?.previous);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  function hasValues(filterData) {
    return Object.values(filterData).some((val) => val !== "");
  }

  const applyFilters = (data, filterSelectedData) => {
    let filteredData = [...data];
    console.log("filterData--------------", filteredData);
    const selectedFilters = Object.keys(filterSelectedData).filter(
      (key) => filterSelectedData[key] !== ""
    );
    console.log("selected filters", selectedFilters);
    if (selectedFilters.length > 0) {
      for (const filter of selectedFilters) {
        if (filter === "service") {
          filteredData = filteredData.filter((item) => {
            return item?.service_name === filterData?.service;
          });
        } else if (filter === "dateRange") {
          const startDate = new Date(dateRange?.date?.[0]);
          const endDate = new Date(dateRange?.date?.[1]);
          startDate.setDate(startDate.getDate() - 1);
          filteredData = filteredData.filter((item) => {
            const bookingDate = new Date(item.booking_date);
            return bookingDate >= startDate && bookingDate <= endDate;
          });
        } else if (filter === "status") {
          // filteredData = filteredData.filter(item => item.category === filter.value);
          filteredData = filteredData.filter((item) => {
            return item?.status == filterData?.status;
          });
        }
      }
      return filteredData;
    }
  };

  const FetchServiceNames = async (data) => {
    const response = await GetBookServicesNameService(data);
    const result = response?.response?.data?.service_names;
    console.log("FetchServiceNames",result)
    setAllServName(result);
  };

  const handleServiceClick = (item) => {
    if (item) {
      setFilterData({ ...filterData, service: item });
    } else {
      setFilterData({ ...filterData, service: "" });
    }
  };

  const handleDateRangeClick = (item) => {
    if (item) {
      setFilterData({ ...filterData, dateRange: item });
    } else {
      setFilterData({ ...filterData, dateRange: "" });
    }
  };

  const handleStatusClick = (item) => {
    if (item) {
      setFilterData({ ...filterData, status: item });
    } else {
      setFilterData({ ...filterData, status: "" });
    }
  };

  const handleLocationClick = (item) => {
    if (item) {
      setFilterData({ ...filterData, location: item });
    } else {
      setFilterData({ ...filterData, location: "" });
    }
  };

  const handleClearClick = (type) => {
    setFilterData({ ...filterData, type: "" });
  };

  const handleSwitchBookingTable = (type) => {
    setAppliedTableType(type);
    setFilterData({
      service: "",
      dateRange: "",
      status: "",
    });
    setDateRange();
  };



  const confirm = () => {
    if (dateRange && dateRange?.date && dateRange?.date.length == 2) {
      setFilterData({ ...filterData, dateRange: dateRange.date });
    }
  };

  const cancel = (e) => {
    setFilterData({ ...filterData, dateRange: "" });
    setDateRange();
  };

  const handleDateChange = (date) => {
    setDateRange((prevState) => ({
      ...prevState,
      date,
    }));
  };

  const items = [
    {
      label: <a>1st menu item</a>,
      key: "0",
    },
    {
      label: <a>2nd menu item</a>,
      key: "1",
    },
    {
      type: "divider",
    },
  ];

  const items1 = [
    {
      label: <a>1st menu item</a>,
      key: "0",
    },
    {
      label: <a>2nd menu item</a>,
      key: "1",
    },
    {
      type: "divider",
    },
  ];

  const items2 = [
    {
      label: <a>1st menu item</a>,
      key: "0",
    },
    {
      label: <a>2nd menu item</a>,
      key: "1",
    },
    {
      type: "divider",
    },
  ];

  const get_booking_by_time_date = (selected_date, time) => {
    const filterData = (data, CollapseItem) => {
      return data.filter((item) => {
        let date1 = new Date(selected_date);
        let date2 = new Date(item.booking_date);
        const ListTimeTwoChar = time.slice(0, 3);
        const TimeTwoChar = item.booking_start_time.slice(0, 3);
        let time1 = date1.getTime();
        let time2 = date2.getTime();

        if (time1 == time2 && ListTimeTwoChar == TimeTwoChar) {
          console.log("ListTimeTwoChar", ListTimeTwoChar);
          console.log("TimeTwoChar", TimeTwoChar);
          return item;
        }
      });
    };

    const filterDateWiseUpcoming = filterData(upComingData, CollapseItem1);
    const filterDateWiseinProgress = filterData(inProgressData, CollapseItem2);
    const filterDateWiseprevBook = filterData(prevBookData, CollapseItem3);

    const combinedResults = [
      ...filterDateWiseUpcoming,
      ...filterDateWiseinProgress,
      ...filterDateWiseprevBook,
    ];

    if (combinedResults.length > 0) {
      return (
        <>
          <div>
            {combinedResults.map((item, index) => {
              if (filterDateWiseUpcoming.includes(item)) {
                return <CollapseItem1 key={index} item={item} />;
              } else if (filterDateWiseinProgress.includes(item)) {
                return <CollapseItem2 key={index} item={item} />;
              } else {
                return <CollapseItem3 key={index} item={item} />;
              }
            })}
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <Fragment>
      <Spin fullscreen spinning={isLoading} />
      <Row style={{ position: "absolute", top: "80px", right: "20px" }}>
        <CustomButton
          style={{
            margin: "8px",
            color: activeButton === "list" ? "red" : "black",
          }}
          onClick={() => handleButtonClick("list")}
          active={activeButton === "list"}
        >
          <VscListFlat />
          List
        </CustomButton>
        <CustomButton
          style={{
            margin: "8px",
            color: activeButton === "calendar" ? "red" : "black",
          }}
          onClick={() => handleButtonClick("calendar")}
          active={activeButton === "calendar"}
        >
          <FaCalendarAlt />
          Calendar
        </CustomButton>
      </Row>
      {activeButton === "list" ? (
        <>
          <Row className="booking_range" style={{ paddingLeft: "1.5rem" }}>
            <Col>
              <Row>
                <Col style={{ border: "1px solid  #F2F1F0", padding: "8px" }}>
                  <CustomButton
                    style={{ margin: "0 4px" }}
                    onClick={() => handleSwitchBookingTable("services")}
                  >
                    <BodyDemi
                      style={{
                        color:
                          appliedTableType === "services"
                            ? "#ED510C"
                            : "#2C2C2C",
                      }}
                    >
                      Services
                    </BodyDemi>
                  </CustomButton>

                  <CustomButton
                    style={{ margin: "0 4px" }}
                    onClick={() => handleSwitchBookingTable("appointments")}
                  >
                    <BodyDemi
                      style={{
                        color:
                          appliedTableType === "appointments"
                            ? "#ED510C"
                            : "#2C2C2C",
                      }}
                    >
                      Appointments
                    </BodyDemi>
                  </CustomButton>
                </Col>
              </Row>

              <Row style={{ margin: "20px 0" }}>
                <Col span={13} style={{ display: "flex", gap: "10px" }}>
                  <Select
                    value={filterData?.service}
                    onChange={handleServiceClick}
                    allowClear
                    onClear={() => handleClearClick("service")}
                    style={{ width: "120px" }}
                  >
                    <Option value="">All</Option>
                    {allSericeName &&
                      allSericeName?.map((service) => (
                        <Option key={service} value={service}>
                          {service}
                        </Option>
                      ))}
                  </Select>

                  <Popconfirm
                    placement="bottom"
                    title="Select Date to filter data"
                    icon={null}
                    description={
                      <RangePicker
                        onChange={(value) => handleDateChange(value)}
                        value={dateRange?.date}
                      />
                    }
                    onConfirm={confirm}
                    onCancel={cancel}
                    okText="Filter"
                    cancelText={
                      dateRange &&
                      dateRange?.date &&
                      dateRange?.date.length == 2
                        ? "Reset"
                        : "Cancel"
                    }
                  >
                    <Button style={{}}>
                      Date Range <DownOutlined style={{ fontSize: "12px" }} />
                    </Button>
                  </Popconfirm>

                  <Select
                    value={filterData?.status}
                    onChange={handleStatusClick}
                    allowClear
                    onClear={() => handleClearClick("status")}
                    style={{ width: "120px" }}
                  >
                    <Option value="">Status</Option>
                    <Option value="upcoming">Upcoming</Option>
                    <Option value="completed">Completed</Option>
                    <Option value="inprogress">Inprogress</Option>
                    <Option value="cancelled">Cancelled</Option>
                  </Select>
                </Col>
              </Row>
            </Col>
          </Row>
          {appliedTableType==="services" ? (
          <Row style={{ paddingLeft: "1.5rem" }}>
            <Col>
              <Row>
                <Col span={24} style={{ padding: "15px 10px" }}>
                  <Row style={{ marginTop: "10px" }}>
                    <CustomBookHeadText>Service Bookings </CustomBookHeadText>{" "}
                  </Row>

                  {upComingData && upComingData.length > 0 && (
                    <TableRow
                      className="destop-table"
                      style={{ width: "100%", margin: "12px 0" }}
                    >
                      <Col style={{ marginBottom: "8px" }}>
                        {" "}
                        <CustomBookText>Upcoming services</CustomBookText>{" "}
                      </Col>
                      <CustomTable data={upComingData} columns={columns} />
                      <table className="responsive-mobile-table">
                        <button>
                          <a style={{ color: "#000" }}>Services</a>
                          <span className="appointment">Appointments</span>
                          <CalendarOutlined />
                        </button>
                        <caption>
                          <Dropdown menu={{ items }} trigger={["click"]}>
                            <a onClick={(e) => e.preventDefault()}>
                              <Space>
                                All
                                <DownOutlined />
                              </Space>
                            </a>
                          </Dropdown>
                          <Dropdown menu={{ items1 }} trigger={["click"]}>
                            <a onClick={(e) => e.preventDefault()}>
                              <Space>
                                Status
                                <DownOutlined />
                              </Space>
                            </a>
                          </Dropdown>
                          <Dropdown menu={{ items2 }} trigger={["click"]}>
                            <a onClick={(e) => e.preventDefault()}>
                              <Space>
                                Location
                                <DownOutlined />
                              </Space>
                            </a>
                          </Dropdown>
                        </caption>
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">NAME</th>
                            <th scope="col">Designation</th>
                            <th scope="col">Experience</th>
                            <th scope="col">CONTACT</th>
                            <th scope="col">START TIME </th>
                            <th scope="col">END TIME</th>
                          </tr>
                        </thead>
                        <tbody>
                          {upComingData.map((record, index) => (
                            <tr key={index}>
                              <td>
                                <Dropdown
                                  overlay={
                                    <Menu
                                      onClick={(e) =>
                                        handleBookingClick(e, record)
                                      }
                                    >
                                      <Menu.Item key="view">View</Menu.Item>
                                      {/* <Menu.Item key="delete">Delete</Menu.Item> */}
                                    </Menu>
                                  }
                                  trigger={["click"]}
                                  placement="bottomRight"
                                >
                                  <EllipsisOutlined
                                    style={{ cursor: "pointer" }}
                                  />
                                </Dropdown>
                              </td>
                              <td data-label="#">{record.id}</td>
                              <td data-label="Customer">{record.cust_name}</td>
                              <td data-label="Service">
                                {record.service_name}
                              </td>
                              <td data-label="Date & Timing">
                                {record.booking_date} -{" "}
                                {record.booking_start_time}
                              </td>
                              <td data-label="Locations">
                                {record.location_name}
                              </td>
                              <td data-label="Resources">
                                {record.resource_name}
                              </td>
                              <td data-label="Price">{record.price}</td>
                              <td data-label="Status">{record.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </TableRow>
                  )}

                  {inProgressData && inProgressData.length > 0 && (
                    <TableRow
                      className="destop-table"
                      style={{ width: "100%", margin: "12px 0" }}
                    >
                      <Col style={{ margin: "8px 0" }}>
                        {" "}
                        <CustomBookText>
                          In Progress services
                        </CustomBookText>{" "}
                      </Col>
                      <CustomTable data={inProgressData} columns={columns} />
                      <table className="responsive-mobile-table">
                        <button>
                          <a style={{ color: "#000" }}>Services</a>
                          <span className="appointment">Appointments</span>
                          <CalendarOutlined />
                        </button>
                        <caption>
                          <Dropdown menu={{ items }} trigger={["click"]}>
                            <a onClick={(e) => e.preventDefault()}>
                              <Space>
                                All
                                <DownOutlined />
                              </Space>
                            </a>
                          </Dropdown>
                          <Dropdown menu={{ items1 }} trigger={["click"]}>
                            <a onClick={(e) => e.preventDefault()}>
                              <Space>
                                Status
                                <DownOutlined />
                              </Space>
                            </a>
                          </Dropdown>
                          <Dropdown menu={{ items2 }} trigger={["click"]}>
                            <a onClick={(e) => e.preventDefault()}>
                              <Space>
                                Location
                                <DownOutlined />
                              </Space>
                            </a>
                          </Dropdown>
                        </caption>
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">NAME</th>
                            <th scope="col">Designation</th>
                            <th scope="col">Experience</th>
                            <th scope="col">CONTACT</th>
                            <th scope="col">START TIME </th>
                            <th scope="col">END TIME</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inProgressData.map((record, index) => (
                            <tr key={index}>
                              <td>
                                <Dropdown
                                  overlay={
                                    <Menu
                                      onClick={(e) =>
                                        handleBookingClick(e, record)
                                      }
                                    >
                                      <Menu.Item key="view">View</Menu.Item>
                                      {/* <Menu.Item key="delete">Delete</Menu.Item> */}
                                    </Menu>
                                  }
                                  trigger={["click"]}
                                  placement="bottomRight"
                                >
                                  <EllipsisOutlined
                                    style={{ cursor: "pointer" }}
                                  />
                                </Dropdown>
                              </td>
                              <td data-label="#">{record.id}</td>
                              <td data-label="Customer">{record.cust_name}</td>
                              <td data-label="Service">
                                {record.service_name}
                              </td>
                              <td data-label="Date & Timing">
                                {record.booking_date} -{" "}
                                {record.booking_start_time}
                              </td>
                              <td data-label="Locations">
                                {record.location_name}
                              </td>
                              <td data-label="Resources">
                                {record.resource_name}
                              </td>
                              <td data-label="Price">{record.price}</td>
                              <td data-label="Status">{record.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </TableRow>
                  )}

                  {prevBookData && prevBookData.length > 0 && (
                    <TableRow
                      className="destop-table"
                      style={{ width: "100%", margin: "12px 0" }}
                    >
                      <Col style={{ margin: "8px 0" }}>
                        {" "}
                        <CustomBookText>Past Service </CustomBookText>{" "}
                      </Col>
                      <CustomTable data={prevBookData} columns={columns} />
                      <table className="responsive-mobile-table">
                        {/* <button>
                                            <a style={{color:'#000'}}>Services</a>
                                            <span className="appointment">Appointments</span>
                                            <CalendarOutlined />
                                        </button>
                                        <caption>
                                            <Dropdown menu={{ items }} trigger={['click']}>
                                                <a onClick={(e) => e.preventDefault()}>
                                                <Space>
                                                    All
                                                    <DownOutlined />
                                                </Space>
                                                </a>
                                            </Dropdown>
                                            <Dropdown menu={{ items1 }} trigger={['click']}>
                                                <a onClick={(e) => e.preventDefault()}>
                                                <Space>
                                                    Status
                                                    <DownOutlined />
                                                </Space>
                                                </a>
                                            </Dropdown>
                                            <Dropdown menu={{ items2 }} trigger={['click']}>
                                                <a onClick={(e) => e.preventDefault()}>
                                                <Space>
                                                    Location
                                                    <DownOutlined />
                                                </Space>
                                                </a>
                                            </Dropdown>
                                        </caption> */}
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">NAME</th>
                            <th scope="col">Designation</th>
                            <th scope="col">Experience</th>
                            <th scope="col">CONTACT</th>
                            <th scope="col">START TIME </th>
                            <th scope="col">END TIME</th>
                          </tr>
                        </thead>
                        <tbody>
                          {prevBookData.map((record, index) => (
                            <tr key={index}>
                              <td>
                                <Dropdown
                                  overlay={
                                    <Menu
                                      onClick={(e) =>
                                        handleBookingClick(e, record)
                                      }
                                    >
                                      <Menu.Item key="view">View</Menu.Item>
                                      {/* <Menu.Item key="delete">Delete</Menu.Item> */}
                                    </Menu>
                                  }
                                  trigger={["click"]}
                                  placement="bottomRight"
                                >
                                  <EllipsisOutlined
                                    style={{ cursor: "pointer" }}
                                  />
                                </Dropdown>
                              </td>
                              <td data-label="#">{record.id}</td>
                              <td data-label="Customer">{record.cust_name}</td>
                              <td data-label="Service">
                                {record.service_name}
                              </td>
                              <td data-label="Date & Timing">
                                {record.booking_date} -{" "}
                                {record.booking_start_time}
                              </td>
                              <td data-label="Locations">
                                {record.location_name}
                              </td>
                              <td data-label="Resources">
                                {record.resource_name}
                              </td>
                              <td data-label="Price">{record.price}</td>
                              <td data-label="Status">{record.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </TableRow>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
          ):(
            <Row style={{ paddingLeft: "1.5rem" }}>
            <Col>
              <Row>
                <Col span={24} style={{ padding: "15px 10px" }}>
                  <Row style={{ marginTop: "10px" }}>
                    <CustomBookHeadText>Appointment Bookings </CustomBookHeadText>{" "}
                  </Row>
                  {upComingData && upComingData.length > 0 && (
                    <TableRow
                      className="destop-table"
                      style={{ width: "100%", margin: "12px 0" }}
                    >
                      <Col style={{ marginBottom: "8px" }}>
                        {" "}
                        <CustomBookText>Upcoming services</CustomBookText>{" "}
                      </Col>
                      <CustomTable data={upComingData} columns={columns} />
                      <table className="responsive-mobile-table">
                        <button>
                          <a style={{ color: "#000" }}>Services</a>
                          <span className="appointment">Appointments</span>
                          <CalendarOutlined />
                        </button>
                        <caption>
                          <Dropdown menu={{ items }} trigger={["click"]}>
                            <a onClick={(e) => e.preventDefault()}>
                              <Space>
                                All
                                <DownOutlined />
                              </Space>
                            </a>
                          </Dropdown>
                          <Dropdown menu={{ items1 }} trigger={["click"]}>
                            <a onClick={(e) => e.preventDefault()}>
                              <Space>
                                Status
                                <DownOutlined />
                              </Space>
                            </a>
                          </Dropdown>
                          <Dropdown menu={{ items2 }} trigger={["click"]}>
                            <a onClick={(e) => e.preventDefault()}>
                              <Space>
                                Location
                                <DownOutlined />
                              </Space>
                            </a>
                          </Dropdown>
                        </caption>
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">NAME</th>
                            <th scope="col">Designation</th>
                            <th scope="col">Experience</th>
                            <th scope="col">CONTACT</th>
                            <th scope="col">START TIME </th>
                            <th scope="col">END TIME</th>
                          </tr>
                        </thead>
                        <tbody>
                          {upComingData.map((record, index) => (
                            <tr key={index}>
                              <td>
                                <Dropdown
                                  overlay={
                                    <Menu
                                      onClick={(e) =>
                                        handleBookingClick(e, record)
                                      }
                                    >
                                      <Menu.Item key="view">View</Menu.Item>
                                      {/* <Menu.Item key="delete">Delete</Menu.Item> */}
                                    </Menu>
                                  }
                                  trigger={["click"]}
                                  placement="bottomRight"
                                >
                                  <EllipsisOutlined
                                    style={{ cursor: "pointer" }}
                                  />
                                </Dropdown>
                              </td>
                              <td data-label="#">{record.id}</td>
                              <td data-label="Customer">{record.cust_name}</td>
                              <td data-label="Service">
                                {record.service_name}
                              </td>
                              <td data-label="Date & Timing">
                                {record.booking_date} -{" "}
                                {record.booking_start_time}
                              </td>
                              <td data-label="Locations">
                                {record.location_name}
                              </td>
                              <td data-label="Resources">
                                {record.resource_name}
                              </td>
                              <td data-label="Price">{record.price}</td>
                              <td data-label="Status">{record.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </TableRow>
                  )}

                  {inProgressData && inProgressData.length > 0 && (
                    <TableRow
                      className="destop-table"
                      style={{ width: "100%", margin: "12px 0" }}
                    >
                      <Col style={{ margin: "8px 0" }}>
                        {" "}
                        <CustomBookText>
                          In Progress services
                        </CustomBookText>{" "}
                      </Col>
                      <CustomTable data={inProgressData} columns={columns} />
                      <table className="responsive-mobile-table">
                        <button>
                          <a style={{ color: "#000" }}>Services</a>
                          <span className="appointment">Appointments</span>
                          <CalendarOutlined />
                        </button>
                        <caption>
                          <Dropdown menu={{ items }} trigger={["click"]}>
                            <a onClick={(e) => e.preventDefault()}>
                              <Space>
                                All
                                <DownOutlined />
                              </Space>
                            </a>
                          </Dropdown>
                          <Dropdown menu={{ items1 }} trigger={["click"]}>
                            <a onClick={(e) => e.preventDefault()}>
                              <Space>
                                Status
                                <DownOutlined />
                              </Space>
                            </a>
                          </Dropdown>
                          <Dropdown menu={{ items2 }} trigger={["click"]}>
                            <a onClick={(e) => e.preventDefault()}>
                              <Space>
                                Location
                                <DownOutlined />
                              </Space>
                            </a>
                          </Dropdown>
                        </caption>
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">NAME</th>
                            <th scope="col">Designation</th>
                            <th scope="col">Experience</th>
                            <th scope="col">CONTACT</th>
                            <th scope="col">START TIME </th>
                            <th scope="col">END TIME</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inProgressData.map((record, index) => (
                            <tr key={index}>
                              <td>
                                <Dropdown
                                  overlay={
                                    <Menu
                                      onClick={(e) =>
                                        handleBookingClick(e, record)
                                      }
                                    >
                                      <Menu.Item key="view">View</Menu.Item>
                                      {/* <Menu.Item key="delete">Delete</Menu.Item> */}
                                    </Menu>
                                  }
                                  trigger={["click"]}
                                  placement="bottomRight"
                                >
                                  <EllipsisOutlined
                                    style={{ cursor: "pointer" }}
                                  />
                                </Dropdown>
                              </td>
                              <td data-label="#">{record.id}</td>
                              <td data-label="Customer">{record.cust_name}</td>
                              <td data-label="Service">
                                {record.service_name}
                              </td>
                              <td data-label="Date & Timing">
                                {record.booking_date} -{" "}
                                {record.booking_start_time}
                              </td>
                              <td data-label="Locations">
                                {record.location_name}
                              </td>
                              <td data-label="Resources">
                                {record.resource_name}
                              </td>
                              <td data-label="Price">{record.price}</td>
                              <td data-label="Status">{record.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </TableRow>
                  )}

                  {prevBookData && prevBookData.length > 0 && (
                    <TableRow
                      className="destop-table"
                      style={{ width: "100%", margin: "12px 0" }}
                    >
                      <Col style={{ margin: "8px 0" }}>
                        {" "}
                        <CustomBookText>Past Service </CustomBookText>{" "}
                      </Col>
                      <CustomTable data={prevBookData} columns={columns} />
                      <table className="responsive-mobile-table">
                        {/* <button>
                                            <a style={{color:'#000'}}>Services</a>
                                            <span className="appointment">Appointments</span>
                                            <CalendarOutlined />
                                        </button>
                                        <caption>
                                            <Dropdown menu={{ items }} trigger={['click']}>
                                                <a onClick={(e) => e.preventDefault()}>
                                                <Space>
                                                    All
                                                    <DownOutlined />
                                                </Space>
                                                </a>
                                            </Dropdown>
                                            <Dropdown menu={{ items1 }} trigger={['click']}>
                                                <a onClick={(e) => e.preventDefault()}>
                                                <Space>
                                                    Status
                                                    <DownOutlined />
                                                </Space>
                                                </a>
                                            </Dropdown>
                                            <Dropdown menu={{ items2 }} trigger={['click']}>
                                                <a onClick={(e) => e.preventDefault()}>
                                                <Space>
                                                    Location
                                                    <DownOutlined />
                                                </Space>
                                                </a>
                                            </Dropdown>
                                        </caption> */}
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">NAME</th>
                            <th scope="col">Designation</th>
                            <th scope="col">Experience</th>
                            <th scope="col">CONTACT</th>
                            <th scope="col">START TIME </th>
                            <th scope="col">END TIME</th>
                          </tr>
                        </thead>
                        <tbody>
                          {prevBookData.map((record, index) => (
                            <tr key={index}>
                              <td>
                                <Dropdown
                                  overlay={
                                    <Menu
                                      onClick={(e) =>
                                        handleBookingClick(e, record)
                                      }
                                    >
                                      <Menu.Item key="view">View</Menu.Item>
                                      {/* <Menu.Item key="delete">Delete</Menu.Item> */}
                                    </Menu>
                                  }
                                  trigger={["click"]}
                                  placement="bottomRight"
                                >
                                  <EllipsisOutlined
                                    style={{ cursor: "pointer" }}
                                  />
                                </Dropdown>
                              </td>
                              <td data-label="#">{record.id}</td>
                              <td data-label="Customer">{record.cust_name}</td>
                              <td data-label="Service">
                                {record.service_name}
                              </td>
                              <td data-label="Date & Timing">
                                {record.booking_date} -{" "}
                                {record.booking_start_time}
                              </td>
                              <td data-label="Locations">
                                {record.location_name}
                              </td>
                              <td data-label="Resources">
                                {record.resource_name}
                              </td>
                              <td data-label="Price">{record.price}</td>
                              <td data-label="Status">{record.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </TableRow>
                  )}
                </Col>
              </Row>
             </Col>
             </Row>
           )}
        </>
      ) : (
        <>
          <div style={{ margin: "10px" }}>
            <h1 style={{ marginTop: "5rem" }}>Bookings</h1>

            <Row style={{ margin: "20px 0" }}>
              <Col span={13} style={{ display: "flex", gap: "10px" }}>
                <Select
                  value={filterData?.service}
                  onChange={handleServiceClick}
                  allowClear
                  onClear={() => handleClearClick("service")}
                  style={{ width: "120px" }}
                >
                  <Option value="">All</Option>
                  {allSericeName &&
                    allSericeName?.map((service) => (
                      <Option key={service} value={service}>
                        {service}
                      </Option>
                    ))}
                </Select>
                <Select
                  value={filterData?.status}
                  onChange={handleStatusClick}
                  allowClear
                  onClear={() => handleClearClick("status")}
                  style={{ width: "120px" }}
                >
                  <Option value="">Status</Option>
                  <Option value="upcoming">Upcoming</Option>
                  <Option value="completed">Completed</Option>
                  <Option value="inprogress">Inprogress</Option>
                  <Option value="cancelled">Cancelled</Option>
                </Select>
                <Select
                  value={filterData?.location}
                  onChange={handleLocationClick}
                  allowClear
                  onClear={() => handleClearClick("location")}
                  style={{ width: "120px" }}
                >
                  <Option value="">Locations</Option>
                  {location &&
                    location?.map((loc, index) => (
                      <Option key={index} value={loc.name}>
                        {loc.name}
                      </Option>
                    ))}
                </Select>
              </Col>
            </Row>

            <Row>
              <Col span={16} style={{ margin: "5px" }}>
                <div
                  style={{
                    border: "2px solid #72959A",
                    borderRadius: "10px",
                    height: "100%",
                    padding: "1.5rem",
                  }}
                >
                  <Calendar onSelect={onSelect} cellRender={cellRender} />
                </div>
              </Col>
              <Col span={7} style={{ margin: "5px" }}>
                <div
                  style={{
                    border: "2px solid #72959A",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    style={{
                      color: "#72959A",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      backgroundColor: "#fafafa",
                      padding: "5% 2% 2% 2%",
                    }}
                  >
                    UpComming bookings
                    <br />
                    On{" "}
                    <sapm style={{ color: "gray", margin: "2px" }}>
                      {selectedDate}
                    </sapm>
                  </div>
                  <ul className="time-list">
                    <li>
                      12:00 AM{get_booking_by_time_date(selectedDate, "00:00")}
                    </li>
                    <li>
                      1:00 AM{get_booking_by_time_date(selectedDate, "01:00")}
                    </li>
                    <li>
                      2:00 AM{get_booking_by_time_date(selectedDate, "02:00")}
                    </li>
                    <li>
                      3:00 AM{get_booking_by_time_date(selectedDate, "03:00")}
                    </li>
                    <li>
                      4:00 AM{get_booking_by_time_date(selectedDate, "04:00")}
                    </li>
                    <li>
                      5:00 AM{get_booking_by_time_date(selectedDate, "05:00")}
                    </li>
                    <li>
                      6:00 AM{get_booking_by_time_date(selectedDate, "06:00")}
                    </li>
                    <li>
                      7:00 AM{get_booking_by_time_date(selectedDate, "07:00")}
                    </li>
                    <li>
                      8:00 AM{get_booking_by_time_date(selectedDate, "08:00")}
                    </li>
                    <li>
                      9:00 AM{get_booking_by_time_date(selectedDate, "09:00")}
                    </li>
                    <li>
                      10:00 AM{get_booking_by_time_date(selectedDate, "10:00")}
                    </li>
                    <li>
                      11:00 AM{get_booking_by_time_date(selectedDate, "11:00")}
                    </li>
                    <li>
                      12:00 PM{get_booking_by_time_date(selectedDate, "12:00")}
                    </li>
                    <li>
                      1:00 PM{get_booking_by_time_date(selectedDate, "13:00")}
                    </li>
                    <li>
                      2:00 PM{get_booking_by_time_date(selectedDate, "14:00")}
                    </li>
                    <li>
                      3:00 PM{get_booking_by_time_date(selectedDate, "15:00")}
                    </li>
                    <li>
                      4:00 PM{get_booking_by_time_date(selectedDate, "16:00")}
                    </li>
                    <li>
                      5:00 PM{get_booking_by_time_date(selectedDate, "17:00")}
                    </li>
                    <li>
                      6:00 PM{get_booking_by_time_date(selectedDate, "18:00")}
                    </li>
                    <li>
                      7:00 PM{get_booking_by_time_date(selectedDate, "19:00")}
                    </li>
                    <li>
                      8:00 PM{get_booking_by_time_date(selectedDate, "20:00")}
                    </li>
                    <li>
                      9:00 PM{get_booking_by_time_date(selectedDate, "21:00")}
                    </li>
                    <li>
                      10:00 PM{get_booking_by_time_date(selectedDate, "22:00")}
                    </li>
                    <li>
                      11:00 PM{get_booking_by_time_date(selectedDate, "23:00")}
                    </li>
                  </ul>
                  {/* <Table
                    dataSource={data}
                    columns={columns1}
                    pagination={{
                      defaultPageSize: 24,
                    }}
                    style={{
                      height: "800px",
                      overflow: "auto",
                    }}
                  /> */}
                </div>
              </Col>
            </Row>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default VendorBookings;
