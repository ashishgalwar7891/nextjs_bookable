"use client"
import { useRouter } from 'next/navigation.js';
import VendorCustomerBooking from '../../../components/vendor/Customer-Booking/index.jsx'

const Index = () => {
    const router = useRouter();
  
return (
    <>
        <VendorCustomerBooking/>
    </>
);
};

export default Index;