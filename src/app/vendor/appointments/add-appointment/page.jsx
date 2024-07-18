"use client"
import ServiceEditForm from '@/components/vendor/services/editService';
import EditVendorServices from '../../../../components/vendor/EditService';
import { useRouter, useSearchParams } from 'next/navigation';
import AppointmentForm from '@/components/vendor/Appointment/addAppointment';
import { useEffect } from 'react';

const Index = () => {
   
    return (
    <>
        <AppointmentForm  />
    </>
);
};

export default Index;