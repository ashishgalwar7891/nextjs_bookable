import { Fragment, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Button, Col, DatePicker, Dropdown, Menu, Popconfirm, Row, Select, Spin, message } from "antd";
import CustomTable from "@/lib/commonComponent/CustomTable";
import { ArrowDownOutlined, ArrowUpOutlined, DownOutlined, EllipsisOutlined } from "@ant-design/icons";
import { CustomButton } from "@/components/User/home/styledComponent";
import { CustomBookHeadText, CustomBookText, CustomTabPayText, TableRow, MainRow } from "../styledComponent";
import { BodyTiny, H5 } from "@/styles/styledComponent";
import { FetchAllPayoutsForVendor } from "@/Services/vendorBookings.service";

const VendorPayouts = () => {
    const router = useRouter();
    const { Option } = Select;
    const [ showForm, setShowForm ] = useState(false);
    const [ showTable, setShowTable ] = useState(false);
    const [ inProgressData, setInProgressData ] = useState([]);
    const [ tableData, setTableData ] = useState([]);
    const [ availableBalance, setAvailableBalance ] = useState([]);
    const [ pendingBalance, setPendingBalance ] = useState([]);
    const [ prevBookData, setPrevBookData ] = useState([]);
    const [ allSericeName, setAllServName ] = useState();
    const [ isLoading, setIsLoading ] = useState(false);
    const { RangePicker } = DatePicker;
    const [ dateRange, setDateRange ] = useState();
    const [filterData, setFilterData] = useState({
        dateRange: '',
        status: ''
    });
    
    const columns = [
     /*   {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => {
                return (`${(index + 1).toString().padStart(2, '0')}`)}
        }, */
        {
            title: 'Bookable Trx ID',
            dataIndex: 'id',
            key: 'id',
        },
        // {
        //     title: 'Stripe Intent ID',
        //     dataIndex: 'id',
        //     key: 'id',
        // },
        // {
        //     title: 'Stripe Charge ID',
        //     dataIndex: 'id',
        //     key: 'id',
        // },
        // {
        //     title: 'Stripe Trx ID',
        //     dataIndex: 'id',
        //     key: 'id',
        // },
        {
            title: 'Booking ID',
            dataIndex: 'booking_id',
            key: 'id',
        },
        {
            title: 'Service/Package',
            dataIndex: 'service_name',
            key: 'service_name',
        },
        {
            title: 'Customer',
            dataIndex: 'user_name',
            key: 'user_name',
        },
        {
            title: 'Date',
            dataIndex: 'booking_date',
            key: 'booking_date',
        },
        {
            title: 'Payout Type',
            dataIndex: 'payout_type',
            key: 'payout_type',
            align:'center',
        },
        {
            title: 'Credited',
            dataIndex: 'credited',
            key: 'credited',
            align:'center',
        },
        /*    render: (text, record) => {
                return (
                <Row style={{ display:'flex', flexDirection:'column' }}>  
                    <CustomTabPayText style={{ color:'#04AF15'}} >Received</CustomTabPayText>
                    <Col><strong>{`$ ${text}`}</strong> </Col>
                </Row>
            )} */
        

        {
            title: 'Debited',
            dataIndex: 'debited',
            key: 'debited',
            align:'center',
        },

        {/*
        {
            title: 'Stripe/Bank Charges',
            dataIndex: 'stripe_fees',
            key: 'amount_paid',
            align:'center',
        },
        // {
        //     title: 'Stripe Refund Id',
        //     dataIndex: 'id',
        //     key: 'id',
        //     align:'center',
        // },
      
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align:'center'
        }, */},

        {
            title: 'more..',
            key: 'actions',
            render: (text, record) => (
            <Dropdown
                overlay={
                <Menu onClick={(e) => handleBookingClick(e, record)}>
                    <Menu.Item key="view">View </Menu.Item>
                </Menu>
                }
                trigger={['click']}
                placement="bottomRight"
            >
                <EllipsisOutlined style={{ cursor: 'pointer'    }} />
            </Dropdown>
            ),
        },
    ];

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        GetAllPayoutsForVendor({ "user_id": userId, token: token });
    }, [filterData]);

    const handleBookingClick = (e, record) => {
        if (e.key === 'view') {
            router.push(`/vendor/payouts/info?bookId=${encodeURIComponent(record?.booking_id)}`);
            
        } else if (e.key === 'delete') {
            console.log('Deleting record:', record);
            
        }
    }; 

    const GetAllPayoutsForVendor = async (data) => {
        try {
            setIsLoading(true);
            const response = await FetchAllPayoutsForVendor(data);
            const result = response?.response?.data?.paymentInfos;
            const stripeAvailableBalance = response?.response?.data?.availableBalance;
            const stripependingBalance = response?.response?.data?.pendingBalance;


            console.log("166", result)
            if (response?.response?.status === 200) {
                setShowTable(true)

                if(hasValues(filterData)) {
                    const TableData = applyFilters(result, filterData);
                    setTableData(TableData);

                } else {
                    setTableData(result);
                }

                setAvailableBalance(stripeAvailableBalance);
                setPendingBalance(stripependingBalance);

            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    function hasValues(filterData) {
        return Object.values(filterData).some(val => val !== '');
    }

    const applyFilters = (data, filterSelectedData) => {
        let filteredData = [...data]
    
            const selectedFilters = Object.keys(filterSelectedData).filter(key => filterSelectedData[key] !== '');
            if(selectedFilters.length > 0) {
                for (const filter of selectedFilters) {
                    if (filter === 'dateRange') {
                        const startDate = new Date(dateRange?.date?.[0]);
                        const endDate = new Date(dateRange?.date?.[1]);
                        startDate.setDate(startDate.getDate() - 1);
                        filteredData = filteredData.filter(item => {
                            const bookingDate = new Date(item.booking_date);
                            return bookingDate >= startDate && bookingDate <= endDate;
                        });
                    
                    } else if (filter === 'status') {
                        // filteredData = filteredData.filter(item => item.category === filter.value);
                        filteredData = filteredData.filter(item => {
                            return item?.status == filterData?.status;
                        });
                    }
                }
                return filteredData;
            } 
    };

    const handleServiceClick = (item) => {
        if (item) {
            setFilterData({ ...filterData, service: item });
        } else { 
            setFilterData({ ...filterData, service: '' });
        }
    };

    const handleDateRangeClick = (item) => {
        if (item) {
            setFilterData({ ...filterData, dateRange: item });
        } else {
            setFilterData({ ...filterData, dateRange: '' });
        }
    };

    const handleStatusClick = (item) => {
        if (item) {
            setFilterData({ ...filterData, status: item });
        } else {
            setFilterData({ ...filterData, status: '' });
        }
    };

    const handleClearClick = (type) => {
        setFilterData({ ...filterData, type: '' });
    }
        
    const confirm = () => {
        if (dateRange && dateRange?.date && dateRange?.date.length == 2) {
            setFilterData({ ...filterData, dateRange: dateRange.date });
        } else {
            setFilterData({ ...filterData, dateRange: '' });
        }
    };
    
    const cancel = (e) => {
        setFilterData({ ...filterData, dateRange: '' });
        setDateRange()
    };

    const handleDateChange = (date) => {
        setDateRange(prevState => ({
            ...prevState, date,
            }
        ));
    };
    console.log("Date Range ==>>", dateRange);

    return(
        <Fragment>
            <Spin fullscreen spinning={isLoading} />
            <Row style={{ width: '100%', justifyContent:'center' }}>
                <Col span={22} style={{ marginTop: '25px' }}>
                    
                    <MainRow style={{  }} >

                        <Col span={24} style={{padding: '15px 10px'}} >
                            <Row style={{ marginTop: '10px' }} ><H5>Payments</H5> </Row>

                            <Row style={{ margin: '20px 0', display:'flex', alignItems:'center', gap:'5px' }} >
                            {/* <Col span={13} style={{ display:'flex' }} > */}
                            
                                <Col> <BodyTiny style={{ color:'#72959A' }}>Filter</BodyTiny></Col>

                                <Col> <Button icon={ <ArrowDownOutlined rotate={320} />}>Credited</Button></Col>
                                
                                <Col> <Button icon={<ArrowUpOutlined rotate={50} />}>Debited</Button></Col>
                                
                                <Col><Button>All</Button></Col>

                            {/* </Col> */}

                            </Row>

                            <Row>
 
                                 <Col> <BodyTiny style={{ color:'#72959A' }}>Stripe Available Balance :----sgd-----  </BodyTiny>   </Col>

                                 <Col> {availableBalance/100}  </Col>

                            </Row>

                            <Row>
 
                                 <Col> <BodyTiny style={{ color:'#72959A' }}>Stripe Pending Balance :---- sgd----  </BodyTiny>   </Col>

                                 <Col> {pendingBalance/100}  </Col>

                            </Row>

                            <Row style={{width:'100%', margin: '20px 0' }} >
                                <Col span={24} style={{ display:'flex', alignItems:'center', gap:'5px' }} >
                                    <BodyTiny style={{ wordBreak:'normal', color:'#72959A' }}> Sort by </BodyTiny>
                                    
                                    <Popconfirm
                                        placement="bottom"
                                        title="Select Date to filter data"
                                        description={
                                            <RangePicker 
                                                onChange={(value) => handleDateChange(value)}
                                                value={dateRange?.date}
                                            />
                                        }
                                        onConfirm={confirm}
                                        onCancel={cancel}
                                        okText="Filter"
                                        cancelText="Cancel"
                                    >
                                        <Button>
                                            Date Range <DownOutlined style={{ fontSize:'12px' }} />
                                        </Button>
                                    </Popconfirm>

                                    <Select
                                        value={filterData?.status}
                                        onChange={handleStatusClick}
                                        allowClear
                                        onClear={() => handleClearClick("status")}
                                        style={{ width:'120px' }}
                                    >
                                        <Option value="">Status</Option>
                                    </Select>

                                </Col>
                            </Row>
                                                        
                            <TableRow style={{width:'100%', margin:'12px 0' }}>
                                <CustomTable 
                                    data={tableData} 
                                    columns={columns} 
                                />
                            </TableRow>
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
                                <th scope="col">LOCATION CODE</th>
                                <th scope="col">ADDRESS</th>
                                <th scope="col">CONTACT</th>
                                <th scope="col">START TIME	</th>
                                <th scope="col">END TIME</th>
                                </tr>
                            </thead>
                            <tbody>
                            {apiData.map((record, index) => (
                                <tr key={index}>
                                                        <td>
                                                        <Dropdown
                                                    overlay={
                                                        <Menu onClick={(e) => handlePackageMenuClick(e, record)}>
                                                        <Menu.Item key="edit">Edit</Menu.Item>
                                                        <Menu.Item key="delete">Delete</Menu.Item>
                                                    </Menu>
                                                    }
                                                    trigger={['click']}
                                                    placement="bottomRight"
                                                >
                                                    <EllipsisOutlined style={{ cursor: 'pointer' }} />
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
                            </tbody>
                        </table>
                        </Col>
                    </MainRow>
                </Col>
            </Row>

        </Fragment>
    )
}

export default VendorPayouts;