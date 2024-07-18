"use client";
import { useRouter } from 'next/navigation';
import VendorProfile from '../../../components/vendor/profile';
import { useEffect, useState } from 'react';
import { Spin } from 'antd';
const Index = () => {
    const router = useRouter();
    const [loader, setLoader] = useState(true);
    useEffect(() =>{
        if(localStorage.getItem('role') !== 'vendor'){
            router.replace('/vendor/login');
        }
        if(localStorage.getItem('redirect') !== 'dashboard'){
            router.push('/vendor/add-info');
        }else{
            setLoader(false)
        }
        
    },[]);
return (
    <>
     {loader ? <>
                <div style={{ textAlign: "center", flex: '1', maxWidth: "100%", padding: "120px" }}>
                    <Spin tip="Loading" size="large">
                        <div className="content" />
                    </Spin>
                </div>
            </> : <>
            <VendorProfile />
            </>}


       
    </>
);
};

export default Index;