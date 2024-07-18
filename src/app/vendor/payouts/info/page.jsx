"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import VendorPayOutDetails from '../../../../components/vendor/Payouts/payoutDetail';
import { useEffect } from 'react';


const Index = () => {
    const searchParams = useSearchParams();
    console.log("Search params: " + searchParams);
    const bookId = searchParams.get('bookId');
    const tid = searchParams.get('tid');

    const params = { bookId : bookId , tid: tid};
    const router = useRouter();
    useEffect(() =>{
        if(localStorage.getItem('role') !== 'vendor'){
            router.back();
        }
    },[]);
return (
    <>
        <VendorPayOutDetails params={ params } />
    </>
);
};

export default Index;
