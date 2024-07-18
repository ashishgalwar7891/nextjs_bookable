"use client"
import { useRouter } from 'next/navigation';
import VendorLocation from '../../../components/vendor/location';
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
        <VendorLocation />
    </>
);
};

export default Index;