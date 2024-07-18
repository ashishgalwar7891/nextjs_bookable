"use client"
import { useEffect } from 'react';
import VendorDetails from '../../../components/vendor-details/index';
import { useRouter } from 'next/navigation';

const Index = () => {
    const router = useRouter();
    useEffect(() =>{
        if(localStorage.getItem('role') !== 'vendor'){
            router.back();
        }
        if (localStorage.getItem('redirect') === 'stripe-onboard') {
            router.replace('/vendor/stripe-onboard');
        }
    },[]);
return (
    <>
        <VendorDetails />
    </>
);
};

export default Index;