import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/lib/commonComponent/PageHeader";
import LocationForm from "./addLocation";
import {
  CustomBlkButton,
  TablesRow,
  CustomGreyText,
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
import {
  Col,
  Dropdown,
  Space,
  Menu,
  Row,
  Button,
  message,
  Modal,
  Image,
  Spin
} from "antd";
import {
  GetVendorLocationService,
  DeleteVenderLocationByIdService,
  getVenderLocationStatusService,
} from "@/Services/vendorLocation.services";
import { GetVendorDetailsService } from "@/Services/vendorProfile.services";
import { GetAllPlansService } from "@/Services/vendorForms.services";
import { BodyReg } from "@/styles/styledComponent";
import InfoModal from "@/lib/commonComponent/ConfirmModal";
import { typescript } from "../../../../next.config";
import { CloseOutlined } from "@ant-design/icons";
import { BsInfoCircleFill } from "react-icons/bs";

const VendorLocation = () => {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [userId, setUserId] = useState();
  const [userToken, setUserToken] = useState();
  const [loading,setLoading] = useState(false);
  console.log("apiData-12345 ==>>", apiData);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const user_token = localStorage.getItem("token");
    setUserToken(user_token);
    setUserId(userId);
    fetchVendorLocations(userId);
  }, [showForm]);

  const handleMenuClick = async (e, record) => {
    console.log("record===>", record.id);
    if (e.key === "edit") {
      router.push(
        `/vendor/location/edit?locationId=${encodeURIComponent(record?.id)}`
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
          Modal.destroyAll(); // Close all modals after confirming
          let base64 = btoa(String(record.id));
          getVenderLocationStatusService({
            user_id: userId,
            id: base64,
            token: userToken,
          })
            .then((res) => {
              if (res.response.data.status === false) {
                InfoModal({
                  text: "Location cannot be delete because Resource is Active",
                  title: "Information",
                  type: "error",
                });
              } else if (res.response.data.status === true) {
                DeleteVenderLocationByIdService({
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
        getVenderLocationStatusService({
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
                text: "Status cannot be change because Resources is active",
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
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Location code",
      dataIndex: "postal_code",
      key: "postal_code",
      align: "center",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      align: "center",
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
      render: (text, record) => {
        return text.slice(0, 5);
      },
    },
    {
      title: "End Time",
      dataIndex: "end_time",
      key: "end_time",
      align: "center",
      render: (text, record) => {
        return text.slice(0, 5);
      },
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

  const fetchVendorLocations = async (id) => {
    setLoading(true)
    try{
        const response = await GetVendorLocationService(id);
        console.log("response123==>", response);
        if (response?.response?.status === 200) {
          const data = response?.response?.data?.data?.userLocations;
          if (data.length > 0) {
            setShowTable(true);
            setApiData(data);
          }
        }
      }
      catch(err){
        console.error("error", err);
      }
      finally{
        setLoading(false);
      }
  };

  const handleAddLocation = async () => {
    const response = await GetVendorDetailsService(userId);
    console.log("response===>", response);
    const outcome = await GetAllPlansService();
    const vendorPlansData = outcome.response.data.$vendorPlans;
    console.log("outcome==>", outcome);
    console.log(
      "number_of_stores",
      response.response.data.data.plansInfo.plan_name
    );
    if (
      response.response.data.data.plansInfo.plan_name.toLowerCase() == "starter"
    ) {
      if (apiData.length <= vendorPlansData[0].number_of_stores - 1) {
        router.push("/vendor/location/create");
        setShowForm(true);
      } else {
        InfoModal({
          type: "error",
          title: "Information",
          text: "Upgrade your Plan For Add More Location",
        });
      }
    } else if (
      response.response.data.data.plansInfo.plan_name.toLowerCase() == "premium"
    ) {
      if (apiData.length <= vendorPlansData[1].number_of_stores - 1) {
        router.push("/vendor/location/create");
        setShowForm(true);
      } else {
        InfoModal({
          type: "error",
          title: "Information",
          text: "Upgrade your Plan For Add More Location",
        });
      }
    } else if (
      response.response.data.data.plansInfo.plan_name.toLowerCase() ==
      "professional"
    ) {
      if (apiData.length <= vendorPlansData[2].number_of_stores - 1) {
        router.push("/vendor/location/create");
        setShowForm(true);
      } else {
        InfoModal({
          type: "error",
          title: "Information",
          text: "Upgrade your Plan For Add More Location",
        });
      }
    } else {
      console.log("something wrong");
    }
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
        <Col span={24} style={{ padding: "0 20px" }}>
          {/* <PageHeader/> */}
          {/* { showForm && <>
                        <LocationForm setShowForm={setShowForm} />
                    </> } */}
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <Spin size="large" />
            </div>
          ) :(<>
          {!showForm && (
            <>
              <CustomTitle>My Location</CustomTitle>
              {/*  <CustomGreyText>You have only 1 Product/Service with starter plan</CustomGreyText> */}
            </>
          )}

          {!showForm && showTable && (
            <Row>
              <CustomWhtButton onClick={handleAddLocation}>
                Add Location <PlusSquareOutlined />
              </CustomWhtButton>
            </Row>
          )}

          {!showForm && showTable && (
            <TablesRow className="destop-table" style={{ width: "100%" }}>
              <CustomTable data={apiData} columns={columns} />
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
                {/* <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">NAME</th>
                                <th scope="col">LOCATION CODE</th>
                                <th scope="col">ADDRESS</th>
                                <th scope="col">CONTACT</th>
                                <th scope="col">START TIME	</th>
                                <th scope="col">END TIME</th>
                                </tr>
                            </thead> */}
                {/* <tbody>
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
                                        trigger={['click']}
                                        placement="bottomRight"
                                        >
                                        <EllipsisOutlined style={{ cursor: 'pointer'    }} />
                                    </Dropdown>
                                    </td>
                                    <td data-label="#"> {record.id}</td>
                                    <td data-label="Name">{record.name}</td>
                                    <td data-label="Location code">{record.postal_code}</td>
                                    <td data-label="Location">{record.address}</td>
                                    <td data-label="Contact">{record.phone}</td>
                                    <td data-label="Time">{record.start_time.slice(0, 5)} - {record.end_time.slice(0, 5)}</td>
                                    <td></td>
                                </tr>))}
                            </tbody> */}
              </table>
            </TablesRow>
          )}

          {!showForm && !showTable && (
            <CustomRegCol>
              <CustomTitle>
                You have not registered any location yet.
              </CustomTitle>
              <CustomBlkButton onClick={handleAddLocation}>
                Add a Location
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

export default VendorLocation;
