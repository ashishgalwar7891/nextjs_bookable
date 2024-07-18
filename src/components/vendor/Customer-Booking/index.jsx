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
import { PlusSquareOutlined } from "@ant-design/icons";
import CustomTable from "@/lib/commonComponent/CustomTable";
import {
  EllipsisOutlined,
  DownOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Popover, Col, Dropdown, Space, Menu, Row, Button, Spin } from "antd";
import {
  GetListOfAllPackageServices,
  GetListOfAllVendorServices,
} from "@/Services/vendorService.services";
import { TableTag } from "@/styles/styledComponent";

const VendorCustomerBooking = () => {
  const router = useRouter();
  const [apiData, setApiData] = useState();
  const [showTable, setShowTable] = useState(false);
  const [apiPackageData, setApiPackageData] = useState();
  const [loading, setLoading] = useState();
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

        const responsePackage = await GetListOfAllPackageServices(UserDetails);
        const dataPackage = responsePackage?.response?.data?.data?.packageInfo;
        console.log("Data Package", dataPackage);
        if (dataPackage?.length > 0) {
          setShowTable(true);
          setApiPackageData(dataPackage);
        }
      } catch (err) {
        console.log("error", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleRedirectClick = (record) => {
    console.log("handleRedirectClick", record);
    router.push(
      `/service-detail?serviceId=${record.id}&VendorId=${record.user_id}`
    );
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
            <p>Price: $ {record.price.price}</p>
            <p>
              Discount:{" "}
              {record.price.discount != "null" && record.price.discount
                ? record.price.discount
                : 0}
              %
            </p>
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
        <Button
          type="primary"
          danger
          onClick={() => handleRedirectClick(record)}
        >
          Book Now
        </Button>
      ),
    },
  ];

  return (
    <Fragment>
      <Row>
      
        <Col style={{ padding: "30px", width: "100%" }} >
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
              {showTable && (
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
                  {/* <table className="responsive-mobile-table">
                 <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Title</th>
                          <th scope="col">Booking Engine</th>
                          <th scope="col">Price</th>
                          <th scope="col">Locations & Timing</th>
                          <th scope="col">Service Status </th>
                          <th scope="col">Action</th>
                        </tr>
                </thead>
                  <tbody>
                        {apiData.map((record, index) => (
                          <tr key={index}>
                            <td>
                              <Dropdown
                                overlay={
                                  <Menu
                                    onClick={(e) => handleMenuClick(e, record)}
                                  >
                                    <Menu.Item key="edit">Edit</Menu.Item>
                                    <Menu.Item key="delete">Delete</Menu.Item>
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
                             <td data-label="Booking engine">{record.booking_engine_name}</td>
                            <td data-label="price">
                              {record.price}
                            </td>
                             <td data-label="Locations & Timing">
                              {record.locations}
                            </td>
                            <td data-label="Service status">{record.service_public_status}</td>
                             <td data-label="Action">
                            
                            <Button type="primary" danger onClick={() => handleRedirectClick(record)}>Book Now</Button>
                                  
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table> */}
                  <table className="responsive-mobile-table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Booking Engine</th>
                        <th scope="col">Price</th>
                        <th scope="col">Locations & Timing</th>
                        <th scope="col">Service Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiData.map((record, index) => (
                        <tr key={index}>
                          <td>
                            <Dropdown
                              overlay={
                                <Menu>
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
                          <td data-label="Booking engine">
                            {record.booking_engine_name}
                          </td>
                          <td data-label="price">
                            {record.price.currency_symbol} {record.price.price}
                          </td>
                          <td data-label="Locations & Timing">
                            {record.locations.map((loc, locIndex) => (
                              <p key={locIndex}>
                                {loc.location_meta.city} ( Timing:{" "}
                                {loc.timing.startTime} to {loc.timing.endTime})
                              </p>
                            ))}
                          </td>
                          <td data-label="Service status">
                            {record.service_public_status}
                          </td>
                          <td data-label="Action">
                            <Button
                              type="primary"
                              danger
                              onClick={() => handleRedirectClick(record)}
                            >
                              Book Now
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </>
          )}
        </Col>
      </Row>
    </Fragment>
  );
};

export default VendorCustomerBooking;
