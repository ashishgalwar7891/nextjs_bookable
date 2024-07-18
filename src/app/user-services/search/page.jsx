"use client"
import UserServices from '../../../components/User/user-services';
import { useSearchParams } from 'next/navigation'


const Index = () => {
    const searchParams = useSearchParams()
    
    const locationId = searchParams.get('locationId');
    const label = searchParams.get('label');
    const service = searchParams.get('service');
    const vendor = searchParams.get('vendor');
    const typed = searchParams.get('typed');
    const category = searchParams.get('category');
    const industry = searchParams.get('industry');

    let props = {
        label : label ,
        service : service,
        vendor : vendor,
        typed : typed, 
        locationId: locationId || null,
        category: category || null,
        industry: industry || null
    }
    
return (
    <>
        <UserServices {...props} />
    </>
);
};
export default Index;