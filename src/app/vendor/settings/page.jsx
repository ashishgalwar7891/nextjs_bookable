"use client"
import { useRouter } from 'next/navigation.js';
import VendorSettings from '../../../components/vendor/settings/index.jsx';
import { useEffect } from 'react';

const Index = () => {
    const router = useRouter();
    useEffect(() =>{
        if(localStorage.getItem('role') !== 'vendor'){
            router.back();
        }
    },[]);
return (
    <>
        <VendorSettings/>
    </>
);
};

export default Index;