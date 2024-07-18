"use client"
import PaymentDashboard from '../../../components/vendor-payment';
import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import ChangePlan from '../../../components/vendor/changeplan/index.jsx';
const Index = () => {
    const router = useRouter();
    const [loader, setLoader] = useState(true);
    const searchParams = useSearchParams()
    const user_id = searchParams.get('user_id');
    const plan_id = searchParams.get('plan_id');
    useEffect(() => {
        if (localStorage.getItem('role') !== 'vendor') {
            router.back();
        } else {
            setLoader(false);
        }
    }, []);
    return (
        <>
            {loader ? <>
                <div style={{ textAlign: "center", flex: '1', maxWidth: "100%", padding: "120px" }}>
                    <Spin tip="Loading" size="large">
                        <div className="content" />
                    </Spin>
                </div>
            </> : <>
                <PaymentDashboard user_id={user_id} plan_id={plan_id} />
            </>}



        </>
    );
};

export default Index;