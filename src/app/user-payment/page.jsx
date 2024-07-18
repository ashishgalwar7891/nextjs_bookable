"use client"

import { USER_PAYMENT_LIST } from "@/Services/frontend";
import { Spin, Space, Dropdown, Table } from "antd";
import { DownOutlined, CalendarOutlined } from "@ant-design/icons";
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from "react";

const Index = () => {
    const router = useRouter();
    const [payments, setPayments] = useState();
    const [loader, setLoader] = useState(true);
    const [dataSource, setDataSource] = useState();
    const [columns, setColumns] = useState([
        {
            title: 'Booking ID',
            dataIndex: 'booking_id',
            key: 'booking_id',
        },
        {
            title: 'Service Name',
            dataIndex: 'service_title',
            key: 'service_title',
        },
        {
            title: 'Txn ID ',
            dataIndex: 'balancetrx_id',
            key: 'balancetrx_id',
        },
        {
            title: 'Charge ID',
            dataIndex: 'payment_intent',
            key: 'payment_intent',
        },
        {
            title: 'Location',
            dataIndex: 'location_title',
            key: 'location_title',
        },
        {
            title: 'Paid',
            dataIndex: 'amount_paid',
            key: 'amount_paid',
        }
    ]);

    const USER_PAYMENT_LIST_FETCH = async (l_user_id, type) => {
        setLoader(true);
        const FORM_DATA = new FormData();
        FORM_DATA.append('user_id', l_user_id);
        FORM_DATA.append('type', type)
        const result = await USER_PAYMENT_LIST(FORM_DATA);
        setDataSource(result.response.data);
        setLoader(false)

    }
    useEffect(() => {
        if (localStorage.getItem('role') !== 'user') {
            router.replace('/login');
        } else {
            if (localStorage.getItem('userId') !== null) {
                USER_PAYMENT_LIST_FETCH(localStorage.getItem('userId'), 'service_booking');
            }
        }


    }, [])

    const getCancelBooking = () => {

        USER_PAYMENT_LIST_FETCH(localStorage.getItem('userId'), 'service_booking');
    }

    const removeCalenderActiveClass = () => {
        var calendarClass = document.querySelectorAll('.payment-tab li');
        for (let index = 0; index < calendarClass.length; index++) {
            calendarClass[index].classList.remove('active');
        }
    }

    const items = [
        {
          label: <a>1st menu item</a>,
          key: '0',
        },
        {
          label: <a>2nd menu item</a>,
          key: '1',
        },
        {
          type: 'divider',
        },
        
      ];

      const items1 = [
        {
          label: <a>1st menu item</a>,
          key: '0',
        },
        {
          label: <a>2nd menu item</a>,
          key: '1',
        },
        {
          type: 'divider',
        },
        
      ];

      const items2 = [
        {
          label: <a>1st menu item</a>,
          key: '0',
        },
        {
          label: <a>2nd menu item</a>,
          key: '1',
        },
        {
          type: 'divider',
        },
        
      ];

    return (
        <>
            <Fragment>
                {loader ? <>
                    <div style={{ textAlign: "center", padding: "120px" }}>
                        <Spin tip="Loading" size="large">
                            <div className="content" />
                        </Spin>
                    </div>
                </> : <>
                    <div className="biz-container" style={{padding:'0px 10px'}}>
                        <h3 className="user-common-heading" style={{ marginTop: "20px" }}>Payment Detail</h3>
                        <ul className="payment-tab">
                            <li id="payment-tab-service" className="active" onClick={() => {
                                setColumns([
                                    {
                                        title: 'Booking ID',
                                        dataIndex: 'booking_id',
                                        key: 'booking_id',
                                    },
                                    {
                                        title: 'Service Name',
                                        dataIndex: 'service_title',
                                        key: 'service_title',
                                    },
                                    {
                                        title: 'Txn ID ',
                                        dataIndex: 'balancetrx_id',
                                        key: 'balancetrx_id',
                                    },
                                    {
                                        title: 'Charge ID',
                                        dataIndex: 'payment_intent',
                                        key: 'payment_intent',
                                    },
                                    {
                                        title: 'Location',
                                        dataIndex: 'location_title',
                                        key: 'location_title',
                                    },
                                    {
                                        title: 'Paid',
                                        dataIndex: 'amount_paid',
                                        key: 'amount_paid',
                                    }
                                ])
                                removeCalenderActiveClass();
                                document.getElementById("payment-tab-service").classList.add("active");
                                USER_PAYMENT_LIST_FETCH(localStorage.getItem('userId'), 'service_booking');
                            }}>Service Payout</li>
                            <li id="payment-tab-reschedule" onClick={() => {
                                setColumns([
                                    {
                                        title: 'Booking ID',
                                        dataIndex: 'booking_id',
                                        key: 'booking_id',
                                    },
                                    {
                                        title: 'Service Name',
                                        dataIndex: 'service_title',
                                        key: 'service_title',
                                    },
                                    {
                                        title: 'Txn ID ',
                                        dataIndex: 'balancetrx_id',
                                        key: 'balancetrx_id',
                                    },
                                    {
                                        title: 'Charge ID',
                                        dataIndex: 'payment_intent',
                                        key: 'payment_intent',
                                    },
                                    {
                                        title: 'Location',
                                        dataIndex: 'location_title',
                                        key: 'location_title',
                                    },
                                    {
                                        title: 'Paid',
                                        dataIndex: 'amount_paid',
                                        key: 'amount_paid',
                                    }
                                ])
                                removeCalenderActiveClass();
                                document.getElementById("payment-tab-reschedule").classList.add("active");
                                USER_PAYMENT_LIST_FETCH(localStorage.getItem('userId'), 'rescheduled_booking');
                            }}>Rescheduled Payout</li>
                            
                            <li id="payment-tab-cancel" onClick={() => {
                                setColumns([
                                    {
                                        title: 'Booking ID',
                                        dataIndex: 'booking_id',
                                        key: 'booking_id',
                                    },
                                    {
                                        title: 'Service Name',
                                        dataIndex: 'service_title',
                                        key: 'service_title',
                                    },
                                    {
                                        title: 'Cancel ID',
                                        dataIndex: 'payment_intent',
                                        key: 'payment_intent',
                                    },
                                    {
                                        title: 'Location',
                                        dataIndex: 'location_title',
                                        key: 'location_title',
                                    },
                                    {
                                        title: 'Refund',
                                        dataIndex: 'amount_paid',
                                        key: 'amount_paid',
                                    }
                                ])
                                removeCalenderActiveClass();
                                document.getElementById("payment-tab-cancel").classList.add("active");
                                USER_PAYMENT_LIST_FETCH(localStorage.getItem('userId'), 'cancel_booking');
                            }}>Cancelled Payout</li>
                            
                        </ul>
                        {loader ? <>
                            <div style={{ textAlign: "center", padding: "120px", width: "100%" }}>
                                <Spin tip="Loading" size="large">
                                    <div className="content" />
                                </Spin>
                            </div>
                        </> : <>
                            <Table className="cutomer-table destop-tables" dataSource={dataSource} columns={columns} />
                            <table className="responsive-mobile-table">
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">NAME</th>
                                    <th scope="col">Booking engine</th>
                                    <th scope="col">Experience</th>
                                    <th scope="col">CONTACT</th>
                                    <th scope="col">START TIME	</th>
                                    <th scope="col">END TIME</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataSource.map((record, index) => (
                                    <tr key={index}>
                                        <td data-label="Booking ID">{record.booking_id}</td>
                                        <td data-label="Service Name">{record.service_title}</td>
                                        <td data-label="Txn ID">{record.balancetrx_id}</td>
                                        <td data-label="Charge ID">{record.payment_intent}</td>
                                        <td data-label="Locations">{record.location_title}</td>
                                        <td data-label="Paid">{record.amount_paid}</td>
                                    </tr>))}
                                </tbody>
                            </table>
                        </>}

                    </div>
                </>}

            </Fragment>
        </>
    );
};

export default Index;