"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import VendorResource from '../../../components/vendor/resources';
const Index = () => {
    const router = useRouter();
    useEffect(() =>{
        if(localStorage.getItem('role') !== 'vendor'){
            router.back();
        }
    },[]);
return (
    <>
        <VendorResource />
    </>
);
};

export default Index;