"use client"
import ServiceEditForm from '@/components/vendor/services/editService';
import EditVendorServices from '../../../../components/vendor/EditService';
import { useRouter, useSearchParams } from 'next/navigation';
import EditAppointmentForm from '@/components/vendor/Appointment/EditAppointment';

const Index = () => {
    const searchParams = useSearchParams()
    const id = searchParams.get('id');
    const type = searchParams.get('type');
    return (
    <>
        <EditAppointmentForm editId={id} type={type} />
    </>
);
};

export default Index;