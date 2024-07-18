"use client"
import { useRouter } from 'next/navigation.js';
import VendorServices from '../../../components/vendor/services/index.jsx';
import { useEffect } from 'react';

const Index = () => {
    const router = useRouter();
  
return (
    <>
        <VendorServices />
    </>
);
};

export default Index;