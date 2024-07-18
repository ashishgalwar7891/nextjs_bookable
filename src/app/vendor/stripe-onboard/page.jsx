"use client";
import StripeOnboard from '@/components/vendor/StripeOnboard';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Index = () => {
    const router = useRouter();
    useEffect(() =>{
        if(localStorage.getItem('role') !== 'vendor'){
            router.back();
        }
        // if(localStorage.getItem('redirect') === 'stripe-onboard'){
        //     router.push('/vendor/stripe-onboard');
        // }
    },[]);
return (
    <>
        <StripeOnboard />
    </>
);
};

export default Index;