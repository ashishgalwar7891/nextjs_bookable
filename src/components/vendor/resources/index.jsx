import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/lib/commonComponent/PageHeader";
import {
  CustomBlkButton,
  CustomGreyText,
  TableRow,
  CustomRegCol,
  CustomTitle,
  CustomWhtButton,
} from "../styledComponent";
import { PlusSquareOutlined } from "@ant-design/icons";
import CustomTable from "@/lib/commonComponent/CustomTable";
import {
  EllipsisOutlined,
  DownOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Col, Dropdown, Space, Menu, Row, Spin, Button, Modal } from "antd";
import ResourceForm from "./addResource";
import {
  GetResourceVendService,
  DeleteVenderResourceByIdService,
  getVenderResourceStatusService,
} from "@/Services/vendorResource.services";
import { useEffect } from "react";
import InfoModal from "@/lib/commonComponent/ConfirmModal";
import { CloseOutlined } from "@ant-design/icons";
import { BsInfoCircleFill } from "react-icons/bs";

const VendorResource = () => {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [apiData, setApiData] = useState();
  const [userId, setUserId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const user_token = localStorage.getItem("token");
    setUserToken(user_token);
    fetchVendorResource(userId);
    setUserId(userId);
  }, [showForm]);

  const handleMenuClick = async (e, record) => {
    if (e.key === "edit") {
      router.push(
        `/vendor/resources/edit?resourceId=${encodeURIComponent(record?.id)}`
      );
    } else if (e.key === "delete") {
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
              Are you sure you want to delete?
            </span>
          </div>
        ),
        onOk: () => {
          let base64 = btoa(String(record.id));
          getVenderResourceStatusService({
            user_id: userId,
            id: base64,
            token: userToken,
          })
            .then((res) => {
              console.log("getVenderResourceStatusService--------->", res);
              if (res.response.data.status === false) {
                InfoModal({
                  text: "Resource cannot be delete because Service is Active",
                  title: "Information",
                  type: "error",
                });
              } else {
                DeleteVenderResourceByIdService({
                  user_id: userId,
                  id: base64,
                  token: userToken,
                })
                  .then(() => {
                    window.location.reload();
                  })
                  .catch((err) => {
                    console.error("Error during delete service:", err);
                  });
              }
            })
            .catch((err) => {
              console.log(err);
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
    }
  };

  const handleButtonClick = async (record) => {
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
            Are you sure you want to change the Status?
          </span>
        </div>
      ),
      onOk: () => {
        let base64 = btoa(String(record.id));
        getVenderResourceStatusService({
          user_id: userId,
          id: base64,
          token: userToken,
        })
          .then((res) => {
            console.log("res.response===>>", res);
            if (res.response.data.status === true) {
              window.location.reload();
            } else {
              InfoModal({
                text: "Status cannot be change because service is active",
                title: "Information",
                type: "error",
              });
            }
          })
          .catch((err) => {
            console.log(err);
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
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a?.id - b?.id,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      align: "center",
    },
    {
      title: "Experience",
      dataIndex: "experience",
      key: "experience",
      // width:'40%',
      sorter: (a, b) => a?.experience - b?.experience,
      align: "center",
      render: (text, record) => {
        return <span> {text + " yrs"}</span>;
      },
    },
    {
      title: "Contact",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: "Start Time",
      dataIndex: "start_time",
      key: "start_time",
      align: "center",
    },
    {
      title: "End Time",
      dataIndex: "end_time",
      key: "end_time",
      align: "center",
    },
    {
      title: "Location",
      dataIndex: "location_name",
      key: "location_name",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (text, record) => (
        <span>
          {record.status === 1 ? (
            <Button
              type="primary"
              danger
              onClick={() => handleButtonClick(record)}
            >
              Active
            </Button>
          ) : (
            <Button
              type="dashed"
              danger
              onClick={() => handleButtonClick(record)}
            >
              Inactive
            </Button>
          )}
        </span>
      ),
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

  const fetchVendorResource = async (id) => {
    try {
      setIsLoading(true);
      const response = await GetResourceVendService(id);
      if (response?.response?.status === 200) {
        const data = response?.response?.data?.data?.resourcesInfo;
        if (data.length > 0) {
          setShowTable(true);
          setApiData(data);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddResource = () => {
    router.push("/vendor/resources/create");
    // setShowForm(true)
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
      <Row>
        <Spin fullscreen spinning={isLoading} />
        <Col span={24} style={{ padding: "0 20px" }}>
          {!showForm && (
            <>
              <CustomTitle>My Resources</CustomTitle>
              {/* <CustomGreyText>You have only 2 resources with starter plan</CustomGreyText> */}
            </>
          )}

          {!showForm && showTable && (
            <Row>
              <CustomGreyText style={{ paddingTop: "15px" }}>
                Your Resources
              </CustomGreyText>
              <CustomWhtButton
                onClick={handleAddResource}
                style={{ marginLeft: "15px" }}
              >
                Add Resource <PlusSquareOutlined />
              </CustomWhtButton>
            </Row>
          )}

          {!showForm && showTable && (
            <>
              <TableRow style={{ width: "100%" }} className="destop-table">
                <CustomTable data={apiData} columns={columns} />
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
                    <th scope="col">Location</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {apiData.map((record, index) => (
                    <tr key={index}>
                      <td>
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
                      </td>
                      <td data-label="#">{record.id}</td>
                      <td data-label="Name">{record.name}</td>
                      <td data-label="Designation">{record.designation}</td>
                      <td data-label="Experience">{record.experience}</td>
                      <td data-label="Contact">{record.phone}</td>
                      <td data-label="Time">
                        {record.start_time.slice(0, 5)} -{" "}
                        {record.end_time.slice(0, 5)}
                      </td>
                      <td data-label="Location">{record.location_name}</td>
                      <td
                        data-label="Status"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {" "}
                        {record.status === 1 ? (
                          <Button
                            style={{ width: "20%", justifyContent: "center" }}
                            type="primary"
                            danger
                            onClick={() => handleButtonClick(record)}
                          >
                            Active
                          </Button>
                        ) : (
                          <Button
                            style={{ width: "20%", justifyContent: "center" }}
                            type="dashed"
                            danger
                            onClick={() => handleButtonClick(record)}
                          >
                            Inactive
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {!showForm && !showTable && (
            <CustomRegCol>
              <CustomTitle>
                You have not registered any resource yet.
              </CustomTitle>
              <CustomBlkButton onClick={handleAddResource}>
                Add a Resource
              </CustomBlkButton>
            </CustomRegCol>
          )}

          {showForm && <ResourceForm setShowForm={setShowForm} />}
        </Col>
      </Row>
    </Fragment>
  );
};

export default VendorResource;
