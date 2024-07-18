"use client"
import { useParams, useSearchParams } from 'next/navigation';
import StoreFront from '../../components/StoreFront';

const Index = () => {
    const searchParams = useSearchParams()
    const vendorId = searchParams.get('VendorId');

return (
    <>
        <StoreFront params={vendorId} VenderId={vendorId}/>
    </>
);
};
export default Index;