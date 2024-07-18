"use client"

import { useRouter } from 'next/navigation.js';
import VendorBookings from '../../../components/vendor/bookings/index.jsx';
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
        <VendorBookings/>
    </>
);
};

export default Index;