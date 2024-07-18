import { Fragment, useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/lib/commonComponent/PageHeader";
import ResourceForm from "../resources/addResource";
import {
  CustomBlkButton,
  CustomTextCol,
  CustomGreyText,
  CustomRegCol,
  CustomTitle,
  CustomWhtButton,
  TableRow,
  TablesRow,
} from "../styledComponent";
import { PlusSquareOutlined } from "@ant-design/icons";
import CustomTable from "@/lib/commonComponent/CustomTable";
import {
  EllipsisOutlined,
  DownOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Col, Dropdown, Space, Menu, Row, Spin } from "antd";
import AppointmentForm from "./addAppointment";
import AppointmentBanner from "@/lib/CustomAppointmentBanner";
import { CustomButton } from "../styledComponent";
import { getAllAppointmentVendService } from "@/Services/vendorService.services";
import { AuthContext } from "@/app/layout";

const vendorAppointment = () => {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [apiData, setApiData] = useState();
  const [isVisiblePage, setIsVisiblePage] = useState("form-page");
  const { paidPlans, setPaidPlans } = useContext(AuthContext);
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const userToken = localStorage.getItem("token");
    fetchServicesDetails(userId, userToken);
    setUserId(userId);
  }, [showForm]);

  const handleMenuClick = (e, record) => {
    if (e.key === "edit") {
      router.push(
        `/vendor/appointments/edit-appointment?type=service&id=${record.id}`
      );
    } else if (e.key === "delete") {
      console.log("Deleting record:", record);
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: "5%",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "auto",
    },
    // {
    //     title: 'Service type',
    //     dataIndex: 'service_type',
    //     key: 'service_type',
    //     align:'center',
    // },
    {
      title: "Booking engine",
      dataIndex: "booking_engine_name",
      key: "booking_engine_name",
      width: "auto",
      align: "center",
    },
    {
      title: "Start Time",
      dataIndex: "start_time",
      key: "start_time",
      width: "auto",
      align: "center",
    },
    {
      title: "End Time",
      dataIndex: "end_time",
      key: "end_time",
      width: "auto",
      align: "center",
    },

    {
      title: "Locations",
      dataIndex: "locations",
      key: "locations",
      width: "auto",
      align: "center",
    },
    {
      title: "Number of Resources",
      render: (text, record) => {
        return <>{record?.resources?.length}</>;
      },
    },
    {
      title: "",
      key: "actions",
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu onClick={(e) => handleMenuClick(e, record)}>
              <Menu.Item key="edit">Edit</Menu.Item>
              <Menu.Item key="delete">Delete</Menu.Item>
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

  const fetchServicesDetails = async (id, token) => {
    setLoading(true);
    try {
      const response = await getAllAppointmentVendService({
        user_id: id,
        token: token,
      });
      console.log("fetch app ServicesDetails", response);
      const output = response?.response?.data?.data?.serviceInfo;
      const status = response?.response?.data?.data?.status;
      console.log("Output ==>>", output);
      setApiData(output);
      setShowTable(true);
      if (status == "0") {
        setIsVisiblePage("banner");
      }
    }
    catch(err){
      console.error("error", err);
    } finally {
      setLoading(false);
    }

  };

  const handleAddAppointment = () => {
    router.push(`/vendor/appointments/add-appointment`);
    //setShowForm(true)
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

  return (
    <Fragment>
      <Row style={{ height: "100%", display: "block", padding: "20px" }}>
        <Col xl={24}>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <Spin size="large" />
            </div>
          ) : (
            <>
              {isVisiblePage === "banner" && (
                <Row>
                  <Col style={{ padding: "20px" }}>
                    <AppointmentBanner setPaidPlans={setPaidPlans} />
                  </Col>
                </Row>
              )}

              {isVisiblePage === "pay-screen" && (
                <Row style={{ height: "100%", justifyContent: "center" }}>
                  <CustomTextCol
                    xl={24}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      color: "#ED510C",
                      fontSize: "48px",
                      fontWeight: "700",
                    }}
                  >
                    Appointment Payment page
                    <CustomButton
                      onClick={() => {
                        setIsVisiblePage("form-page");
                      }}
                    >
                      Pay
                    </CustomButton>
                  </CustomTextCol>
                </Row>
              )}

              {isVisiblePage === "form-page" && (
                <Row style={{ height: "100%" }}>
                  <Col span={24} style={{ padding: "0 0px" }}>
                    {showForm && (
                      <>
                        <AppointmentForm setShowForm={setShowForm} />
                      </>
                    )}

                    {!showForm && (
                      <>
                        <CustomTitle>My Appointment</CustomTitle>
                      </>
                    )}

                    {!showForm && showTable && (
                      <Row>
                        <CustomWhtButton onClick={handleAddAppointment}>
                          Add Appointment <PlusSquareOutlined />
                        </CustomWhtButton>
                      </Row>
                    )}

                    {!showForm && showTable && (
                      <Row style={{ width: "100%" }}>
                        <TableRow
                          className="destop-table"
                          style={{ width: "100%" }}
                          gutter={[0, 18]}
                        >
                          <CustomTable data={apiData} columns={columns} />
                        </TableRow>
                        <table className="responsive-mobile-table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">NAME</th>
                              <th scope="col">LOCATION CODE</th>
                              <th scope="col">ADDRESS</th>
                              <th scope="col">CONTACT</th>
                              <th scope="col">START TIME </th>
                              <th scope="col">END TIME</th>
                            </tr>
                          </thead>
                          <tbody>
                            {apiData.map((record, index) => (
                              <tr key={index}>
                                <td>
                                  <Dropdown
                                    overlay={
                                      <Menu
                                        onClick={(e) =>
                                          handleMenuClick(e, record)
                                        }
                                      >
                                        <Menu.Item key="edit">Edit</Menu.Item>
                                        <Menu.Item key="delete">
                                          Delete
                                        </Menu.Item>
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
                                <td data-label="#"> {record.id}</td>
                                <td data-label="Name">{record.name}</td>
                                <td data-label="Booking Engine">
                                  {record.booking_engine_name}
                                </td>
                                <td data-label="Location">
                                  {record.locations}
                                </td>
                                <td data-label="Start Time End Time">
                                  {record.start_time.slice(0, 5)}{" "}
                                  {record.end_time.slice(0, 5)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </Row>
                    )}

                    {!showForm && !showTable && (
                      <CustomRegCol>
                        <CustomTitle>
                          You have not registered Appointment yet.
                        </CustomTitle>
                        <CustomBlkButton
                          style={{ width: "200px" }}
                          onClick={handleAddAppointment}
                        >
                          Add an Appointment
                        </CustomBlkButton>
                      </CustomRegCol>
                    )}
                  </Col>
                </Row>
              )}
            </>
          )}
        </Col>
      </Row>
    </Fragment>
  );
};

export default vendorAppointment;
