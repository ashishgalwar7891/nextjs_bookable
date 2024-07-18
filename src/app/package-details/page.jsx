"use client"
export const dynamic = 'force-dynamic';
import PackageDetails from "@/components/User/package-details";
import { useSearchParams } from "next/navigation";

const Index = () => {
    const searchParams = useSearchParams()
    const packageId = searchParams.get('package-id');
    const locationId = searchParams.get('location-id');
    const params = {packageId: packageId, locationId: locationId}

return (
    <>
        <PackageDetails params={params} />
    </>
)};

export default Index;