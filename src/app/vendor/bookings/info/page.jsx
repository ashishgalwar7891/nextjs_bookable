"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import VendorBookDetails from '../../../../components/vendor/bookings/bookingDetail';
import { useEffect } from 'react';

const Index = () => {
    const searchParams = useSearchParams();
    console.log("Search params: " + searchParams);
    const bookId = searchParams.get('bookId');

    const params = { bookId : bookId };
    const router = useRouter();
    useEffect(() =>{
        if(localStorage.getItem('role') !== 'vendor'){
            router.back();
        }
    },[]);
return (
    <>
        <VendorBookDetails params={ params } />
    </>
);
};

export default Index;