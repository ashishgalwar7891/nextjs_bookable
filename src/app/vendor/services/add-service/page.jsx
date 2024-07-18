"use client"
import ServiceEditForm from '@/components/vendor/services/editService';
import EditVendorServices from '../../../../components/vendor/EditService';
import { useRouter, useSearchParams } from 'next/navigation';
import ServiceForm from '@/components/vendor/services/addServices';
import { useEffect } from 'react';

const Index = () => {
    const router = useRouter();
    return (
    <>
        <ServiceForm  />
    </>
);
};

export default Index;