"use client"
import { useRouter } from 'next/navigation';
import MyBookings from '../../components/User/user-sidebar/myBookings';
import { useEffect, useState } from 'react';
import { Spin } from 'antd';

const Index = () => {
    const router = useRouter();
    const [loader, set_loader] = useState(true);
    useEffect(() => {
        if (localStorage.getItem('role') !== 'user') {
            router.replace('/login');
        } else {
            set_loader(false);
        }
    }, []);
    return (
        <>
            {loader ? <>
                <div style={{ textAlign: "center", padding: "120px" }}>
                    <Spin tip="Loading" size="large">
                        <div className="content" />
                    </Spin>
                </div>
            </> : <>
                <MyBookings />
            </>}


        </>
    );
};

export default Index;