"use client"
import { useRouter } from 'next/navigation';
import LocationForm from '../../../../components/vendor/location/addLocation';
import { useEffect } from 'react';
const Index = () => {
    const router = useRouter();
    useEffect(() =>{
        if(localStorage.getItem('role') !== 'vendor'){
            router.back();
        }
    },[]);
return (
    <>
        <LocationForm params={{locationId:null}} />
    </>
);
};

export default Index;