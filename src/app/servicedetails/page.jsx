"use client"
export const dynamic = 'force-dynamic';
import SericeDetails from "@/components/User/serviceDetails";
import { useParams, useSearchParams } from "next/navigation";

const Index = () => {
    const searchParams = useSearchParams()
    const serviceId = searchParams.get('serviceId');
    const locationId = searchParams.get('locationId');
    const params = {serviceId: serviceId, locationId: locationId}

return (
    <>
        <SericeDetails params={params} />
    </>
);
};

export default Index;