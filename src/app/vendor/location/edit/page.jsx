"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import LocationForm from '../../../../components/vendor/location/addLocation';
import { useEffect } from 'react';

const Index = () => {
    const searchParams = useSearchParams()
    const locationId = searchParams.get('locationId');

    let params = { locationId: locationId }
    console.log("Params: ", params);
    const router = useRouter();
 
return (
    <>
        <LocationForm params={params} />
    </>
);
};

export default Index;