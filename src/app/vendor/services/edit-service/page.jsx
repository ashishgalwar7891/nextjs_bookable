"use client"
import ServiceEditForm from '@/components/vendor/services/editService';
import EditVendorServices from '../../../../components/vendor/EditService';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const Index = () => {
    const searchParams = useSearchParams()
    const id = searchParams.get('id');
    const type = searchParams.get('type');
    const router = useRouter();
    useEffect(() =>{
        if(localStorage.getItem('role') !== 'vendor'){
            router.back();
        }
    },[]);
    return (
    <>
        <ServiceEditForm editId={id} type={type} />
    </>
);
};

export default Index;