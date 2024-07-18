import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CustomBlkButton,
  CustomGreyText,
  TableRow,
  CustomRegCol,
  CustomTitle,
  CustomWhtButton,
  CustomBookHeadText,
} from "../styledComponent";
import { PlusSquareOutlined,CloseOutlined } from "@ant-design/icons";
import CustomTable from "@/lib/commonComponent/CustomTable";
import {
  EllipsisOutlined,
  DownOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Popover, Col, Dropdown, Space, Menu, Row, Spin,Modal} from "antd";
import ServiceForm from "./addServices";
import {
  GetListOfAllPackageServices,
  GetListOfAllVendorServices,
  DeleteServicesVendorService,
} from "@/Services/vendorService.services";
import { BsInfoCircleFill } from "react-icons/bs";
import { TableTag } from "@/styles/styledComponent";
import InfoModal from "@/lib/commonComponent/ConfirmModal";

const VendorServices = () => {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [apiData, setApiData] = useState();
  const [apiPackageData, setApiPackageData] = useState();
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    setUserId(userId);
    setToken(token);
  }, [showForm]);

 

  // const handleServiceMenuClick = (e, record) => {
  //   if (e.key === "edit") {
  //     //  e.preventDefault()
  //     router.push(`/vendor/services/edit-service?type=service&id=${record.id}`);
  //   } else if (e.key === "delete") {
  //     if (record.service_public_status !== "public") {
  //        DeleteServicesVendorService({service_id:record.id, user_id:userId, token})
  //           .then((resp)=>{
  //              window.location.reload();
  //           }).catch((error)=>{
  //             console.log(error)
  //           })
  //       }
  //   }
  // };
  const handleServiceMenuClick = (e, record) => {
    if (e.key === "edit") {
      router.push(`/vendor/services/edit-service?type=service&id=${record.id}`);
    } else if (e.key === "delete") {
      if (record.service_public_status !== "public") {
        Modal.confirm({
          title: (
            <div style={{ display: "flex", marginTop: "10px" }}>
              <span>
                <BsInfoCircleFill size={25} />
              </span>
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  margin: "-5px 0 0 10px",
                }}
              >
                Are you sure
              </span>
            </div>
          ),
          content: (
            <div style={{ margin: "0px 8px" }}>
              <span style={{ fontSize: "16px", fontWeight: 400 }}>
                Are you sure you want to delete this service?
              </span>
            </div>
          ),
          onOk: () => {
            DeleteServicesVendorService({
              service_id: record.id,
              user_id: userId,
              token: token,
            })
              .then((resp) => {
                window.location.reload();
              })
              .catch((error) => {
                console.log(error);
              });
            Modal.destroyAll(); // Close all modals after confirming
          },
          onCancel: () => {
            Modal.destroyAll(); // Close all modals after cancelling
          },
          okText: "Confirm",
          cancelText: "Cancel",
          okButtonProps: {
            style: {
              backgroundColor: "#EA8933",
              color: "#F2F1F0",
              fontWeight: 600,
              marginRight: "20px",
            },
          },
          cancelButtonProps: { style: { marginRight: "20px" } },
          icon: null,
          closable: true,
          closeIcon: <CloseOutlined style={{ color: "#333" }} />,
        });
      } else {
        InfoModal({
          text: "Service cannot be deleted because it is public",
          title: "Information",
          type: "error",
        });
      }
    }
  };

  const handlePackageMenuClick = (e, record) => {
    if (e.key === "edit") {
      router.push(`/vendor/services/edit-service?type=package&id=${record.id}`);
    } else if (e.key === "delete") {
      console.log("Deleting record:", record.id, record.service_id);
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
      width: "15%",
    },
    {
      title: "Booking Engine",
      dataIndex: "booking_engine_name",
      key: "booking_engine_name",
      width: "20%",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) => {
        return (
          <>
            {" "}
            {record.price.price !== "null" ? (
              <p>Price: $ {record.price.price}</p>
            ) : (
              <></>
            )}
            {record.price.discount !== "null" ? (
              <p>Discount: {record.price.discount}%</p>
            ) : (
              <></>
            )}
          </>
        );
      },
    },
    {
      title: "Locations & Timing",
      dataIndex: "locations",
      key: "locations",
      align: "Left",
      render: (text, record) => {
        return record?.locations.map((loc) => (
          <p>
            {loc.location_meta.city} ( Timing: {loc.timing.startTime} to{" "}
            {loc.timing.endTime})
          </p>
        ));
      },
    },
    {
      title: "Service Status",
      dataIndex: "service_public_status",
      key: "service_status",
      align: "Left",
    },
    {
      title: "Action",
      key: "actions",
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu onClick={(e) => handleServiceMenuClick(e, record)}>
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

  const packagesColumn = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a?.id - b?.id,
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "15%",
    },
    {
      title: "Booking engine",
      dataIndex: "booking_engine_name",
      key: "booking_engine_name",
      align: "center",
    },
    {
      title: "Services",
      dataIndex: "service_counts_by_location",
      key: "service_counts_by_location",
      align: "center",
      render: (text, record) => {
        return record?.service_counts_by_location.map((service) => (
          <TableTag>{service.service_name}</TableTag>
        ));
      },
    },
    {
      title: "Locations",
      dataIndex: "location_city",
      key: "location_city",
      align: "center",
      render: (text, record) => {
        return <TableTag>{text}</TableTag>;
      },
    },
    {
      title: "",
      key: "actions",
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu onClick={(e) => handlePackageMenuClick(e, record)}>
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

  useEffect(() => {
    (async () => {
      const userId = localStorage.getItem("userId");
      const userToken = localStorage.getItem("token");

      const UserDetails = {
        user_id: userId,
        token: userToken,
      };
      setLoading(true);
      try {
        const response = await GetListOfAllVendorServices(userId);
        const data = response?.response?.data?.data?.serviceInfo;
        console.log("GetListOfAllVendorServices", data);
        if (data?.length > 0) {
          setShowTable(true);
          setApiData(data);
        }
      } catch (err) {
        console.error("error", err);
      } finally {
        setLoading(false);
      }
      const responsePackage = await GetListOfAllPackageServices(UserDetails);
      const dataPackage = responsePackage?.response?.data?.data?.packageInfo;
      console.log("Data Package", dataPackage);
      if (dataPackage?.length > 0) {
        setShowTable(true);
        setApiPackageData(dataPackage);
      }
    })();
  }, [showForm]);

  const handleAddService = () => {
    router.push("services/add-service");
    //setShowForm(true)
  };

  const handleEditService = (id) => {
    setShowTable(false);
    setShowEditForm(true);
    setEditId(id);
  };
  console.log(apiData);

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
      <Row>
        <Col span={24} style={{ padding: "0 20px" }}>
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
              {showForm && (
                <>
                  <ServiceForm setShowForm={setShowForm} />
                </>
              )}

              {!showForm && (
                <>
                  <CustomTitle>Your Packages/ Services</CustomTitle>
                  {/*  <CustomGreyText>You have only 1 Package/Service with starter plan</CustomGreyText> */}
                </>
              )}

              {!showForm && showTable && (
                <Row>
                  <CustomWhtButton
                    style={{ width: "auto" }}
                    onClick={handleAddService}
                  >
                    Add Package/Service <PlusSquareOutlined />
                  </CustomWhtButton>
                </Row>
              )}

              {!showForm && showTable && (
                <>
                  <TableRow
                    className="destop-table"
                    style={{ width: "100%" }}
                    gutter={[0, 18]}
                  >
                    <Col span={24}>
                      <CustomTable data={apiData} columns={columns} />
                    </Col>

                    {apiPackageData && apiPackageData.length > 0 && (
                      <>
                        <Col>
                          <CustomBookHeadText>Packages</CustomBookHeadText>
                        </Col>
                        <Col span={24} style={{ marginBottom: "25px" }}>
                          <CustomTable
                            data={apiPackageData}
                            columns={packagesColumn}
                          />
                        </Col>
                      </>
                    )}
                  </TableRow>
                  <table className="responsive-mobile-table">
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
                      {apiData.map((record, index) => (
                        <tr key={index}>
                          <td>
                            <Dropdown
                              overlay={
                                <Menu
                                  onClick={(e) =>
                                    handlePackageMenuClick(e, record)
                                  }
                                >
                                  <Menu.Item key="edit">Edit</Menu.Item>
                                  <Menu.Item key="delete">Delete</Menu.Item>
                                </Menu>
                              }
                              trigger={["click"]}
                              placement="bottomRight"
                            >
                              <EllipsisOutlined style={{ cursor: "pointer" }} />
                            </Dropdown>
                          </td>
                          <td data-label="#">{record.id}</td>
                          <td data-label="Title">{record.name}</td>
                          <td data-label="Booking Engine">
                            {record.booking_engine_name}
                          </td>
                          <td data-label="Price & Discount">
                            ${record.price.price} - {record.price.discount}%
                          </td>
                          <td data-label="Locations & Timing">
                            {record.locations &&
                              record.locations[0] &&
                              record.locations[0].location_meta.city}
                            {record.locations &&
                              record.locations[0] &&
                              record.locations[0].timing &&
                              ` (Timing: ${record.locations[0].timing.startTime} to ${record.locations[0].timing.endTime})`}
                          </td>
                          <td data-label="Service Status">
                            {record.service_public_status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* <table className="responsive-mobile-table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">NAME</th>
                          <th scope="col">Booking engine</th>
                          <th scope="col">Experience</th>
                          <th scope="col">CONTACT</th>
                          <th scope="col">START TIME </th>
                          <th scope="col">END TIME</th>
                        </tr>
                      </thead>
                      <tbody>
                        {apiPackageData.map((record, index) => (
                          <tr key={index}>
                            <td data-label="#">{record.id}</td>
                            <td data-label="Name">{record.name}</td>
                            <td data-label="Booking Engine">
                              {record.booking_engine_name}
                            </td>
                            <td data-label="Services">
                              {record.service_counts_by_location.map(
                                (service, serviceIndex) => (
                                  <TableTag key={serviceIndex}>
                                    {service.service_name}
                                  </TableTag>
                                )
                              )}
                            </td>
                            <td data-label="Locations">
                              {Array.isArray(record.location_city) ? (
                                record.location_city.map((city, cityIndex) => (
                                  <TableTag key={cityIndex}>{city}</TableTag>
                                ))
                              ) : (
                                <TableTag>{record.location_city}</TableTag>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table> */}
                </>
              )}

              {!showForm && !showTable && (
                <CustomRegCol>
                  <CustomTitle>
                    You have not registered any service yet.
                  </CustomTitle>
                  <CustomBlkButton onClick={handleAddService}>
                    Add a Service
                  </CustomBlkButton>
                </CustomRegCol>
              )}
            </>
          )}
        </Col>
      </Row>
    </Fragment>
  );
};

export default VendorServices;
