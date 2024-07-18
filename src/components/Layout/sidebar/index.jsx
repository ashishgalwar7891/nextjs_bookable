import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Row, Col, Avatar } from "antd";
import Image from "next/image";
import { useAuth } from "../../../context/AuthContext";
import BookableBizLogo from "../../../assets/imgs/logo-V3.png";
import { routes } from "../../../routes";
import {
  CustomDrawerMenu,
  CustomSidebar,
  SidebarHeading,
  SidebarCol,
  CustomDrawer,
} from "./styledComponent";
import {
  CalendarOutlined,
  CloudServerOutlined,
  DownOutlined,
  LogoutOutlined,
  MessageOutlined,
  PayCircleOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  SmileOutlined,
  UserOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { IoIosArrowUp } from "react-icons/io";
import { FiUsers } from "react-icons/fi";
import { LiaIconsSolid } from "react-icons/lia";
import ChevRight from "../../../assets/imgs/icon/ChevRight.svg";
import { userLogoutService } from "@/Services/auth.services";
import { GetVendorDetailsService } from "@/Services/vendorProfile.services";
import { STORAGE_URL } from "@/Services/vendorService.services";
import "./style.css";
const keys = {
  1: "PROFILE",
  2: "LOCATION",
  3: "RESOURCES",
  4: "Team_Members",
  5: "SERVICES",
  6: "APPOINTMENTS",
  7: "BOOKINGS",
  8: "PAYOUTS",
  9: "MESSAGES",
  10: "SETTINGS",
  11: "LOGOUT",
  12: "Team_Members",
  13: "Role_Permissions",
  14: "Customer_Booking"
};

const Sidebar = ({ MobileSidebar }) => {
  const router = useRouter();
  const [userId, setUserId] = useState();
  const [profileDetails, setProfileDetails] = useState();
  const [isTeamManagementOpen, setIsTeamManagementOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);

  useEffect(() => {
    (async () => {
      const userId = localStorage.getItem("userId");
      setUserId(userId);
      fetchVendorDetails(userId);
    })();
  }, []);

  const fetchVendorDetails = async (id) => {
    console.log("Running vendor details");
    const response = await GetVendorDetailsService(id);
    console.log("response 11 ==>>", response);
    if (response?.response?.status === 200) {
      const data = response?.response?.data?.data;
      console.log("Data -->>", data);
      setProfileDetails({
        profile_Image: data?.businessInfo?.image?.filename,
        vendor_name: data?.businessInfo?.business_name,
        vendor_plan: data?.plansInfo?.plan_name,
      });
    }
  };

  const logout = async () => {
    await userLogoutService(userId);
    localStorage.clear();
    router.push("/vendor/login");
  };

  const selectChange = (key) => {
    setSelectedKey(key);
    if (key === "11") {
      logout();
    } else if (key === "4") {
      setSelectedKey('12')
      setIsTeamManagementOpen(!isTeamManagementOpen);
    }
    router.push(routes.SIDEBAR[keys[key]]);
  };
  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined style={{ paddingRight: "10px"}}/>,
      label: (
        <SidebarHeading>
          Profile{" "}
          <DownOutlined style={{ paddingRight: "30px", float: "right" }} />{" "}
        </SidebarHeading>
      ),
    },
    {
      key: "2",
      icon: <UserOutlined style={{ paddingRight: "10px"}}/>,
      label: (
        <SidebarHeading>
          Locations <DownOutlined style={{ paddingRight: "30px" }} />{" "}
        </SidebarHeading>
      ),
    },
    {
      key: "3",
      icon: <UserOutlined style={{ paddingRight: "10px"}}/>,
      label: (
        <SidebarHeading>
          Resources <DownOutlined style={{ paddingRight: "30px" }} />{" "}
        </SidebarHeading>
      ),
    },

    {
      key: "4",
      icon: <FiUsers style={{ marginRight:'10px' }}/>,
      label: (
        <SidebarHeading>
          Team Management
          {isTeamManagementOpen ? (
            <IoIosArrowUp size={20} style={{ marginLeft: "50px" }} />
          ) : (
            <DownOutlined style={{ paddingRight: "30px" }} />
          )}
        </SidebarHeading>
      ),
    },
    ...(isTeamManagementOpen
      ? [
        {
          key: "12",
          icon: <FiUsers style={{ marginBottom: "6px", marginRight:'10px' }} />,
          label: (
            <SidebarHeading style={{ marginTop: "-15px" }}>
              Team Members
            </SidebarHeading>
          ),
        },
          {
            key: "13",
            icon: <LiaIconsSolid style={{ marginBottom: "6px", marginRight:'10px' }} />,
            label: (
              <SidebarHeading style={{ marginTop: "-15px" }}>
                Role Permissions
              </SidebarHeading>
            ),
          },

        ]
      : []),
    {
      key: "5",
      icon: <CloudServerOutlined  style={{ marginRight:'10px' }}/>,
      label: (
        <SidebarHeading>
          Services <DownOutlined style={{ paddingRight: "30px" }} />{" "}
        </SidebarHeading>
      ),
    },
    {
      key: "6",
      icon: <CalendarOutlined  style={{ marginRight:'10px' }}/>,
      label: (
        <SidebarHeading>
          Appointments <DownOutlined style={{ paddingRight: "30px" }} />{" "}
        </SidebarHeading>
      ),
    },
    {
      key: "7",
      icon: <SmileOutlined  style={{ marginRight:'10px' }}/>,
      label: (
        <SidebarHeading>
          Bookings <DownOutlined style={{ paddingRight: "30px" }} />{" "}
        </SidebarHeading>
      ),
    },
    {
      key: "14",
      icon: <SmileOutlined  style={{ marginRight:'10px' }}/>,
      label: (
        <SidebarHeading>
         Book For Customer <DownOutlined style={{ paddingRight: "30px" }} />{" "}
        </SidebarHeading>
      ),
    },
    {
      key: "8",
      icon: <PayCircleOutlined  style={{ marginRight:'10px' }}/>,
      label: (
        <SidebarHeading>
          Payouts <DownOutlined style={{ paddingRight: "30px" }} />{" "}
        </SidebarHeading>
      ),
    },
    {
      key: "10",
      icon: <SettingOutlined  style={{ marginRight:'10px' }}/>,
      label: (
        <SidebarHeading>
          Setting <DownOutlined style={{ paddingRight: "30px" }} />{" "}
        </SidebarHeading>
      ),
    },
    {
      key: "11",
      icon: <LogoutOutlined  style={{ marginRight:'10px' }}/>,
      label: (
        <SidebarHeading>
          Log out <DownOutlined style={{ paddingRight: "30px" }} />{" "}
        </SidebarHeading>
      ),
    },
  ];
  return (
    <>
      <Image
        src={BookableBizLogo}
        onClick={() => router.push("/")}
        alt={"Brand Logo"}
        preview={"false"}
        style={{
          width: "220px",
          height: "65px",
          cursor: "pointer",
          marginTop: "10px",
          paddingBottom: "10px",
          marginLeft: "10px",
          borderBottom: "1px solid #555454",
          marginBottom: "10px",
        }}
      />
      <span
        style={{
          marginLeft: "10px",
          borderBottom: "1px solid #555454",
          display: "block",
          marginRight: "15px",
        }}
      >
        <Avatar
          size={60}
          src={STORAGE_URL + "/images/" + profileDetails?.profile_Image}
          alt="Image Not Found"
        />
        <span
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: "18px",
            color: "#ED510C",
            position: "relative",
            left: "8px",
            top: "-8px",
          }}
        >
          {profileDetails?.vendor_name}
        </span>
        <br></br>
        <span
          style={{
            color: "white",
            position: "relative",
            left: "68px",
            top: "-32px",
          }}
        >
          {profileDetails?.vendor_plan}
        </span>
      </span>
      <ul>
        {menuItems.map((item, index) => (
          <>
            {item.key ==='4' ? (
              <li
                onClick={() => selectChange(item.key)}
                style={{
                  backgroundColor:
                    selectedKey === item.key ? "#eb552d" : "transparent",
                  cursor: "pointer",
                  padding: "10px 15px",
                  marginBottom: "5px",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  color: "white",
                  transition: "background-color 0.3s ease",
                }}
              >
                <span>{item.icon}</span> <span>{item.label}</span>
              </li>
            ) : (
              <li
                onClick={() => selectChange(item.key)}
                style={{
                  backgroundColor:
                    selectedKey === item.key ? "#eb552d" : "transparent",
                  cursor: "pointer",
                  padding: "10px 15px",
                  marginBottom: "5px",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  color: "white",
                  transition: "background-color 0.3s ease",
                }}
              >
                <span>{item.icon}</span> <span>{item.label}</span>
              </li>
            )}
          </>
        ))}
      </ul>
    </>
  );
};

export default Sidebar;
