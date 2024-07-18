"use client"
import { useSearchParams } from 'next/navigation';
import ResourceForm from '../../../../components/vendor/resources/addResource';

const Index = () => {
    const searchParams = useSearchParams()
    const resourceId = searchParams.get('resourceId');

    let params = { resourceId: resourceId }
    console.log("Params: ", params);
return (
    <>
        <ResourceForm params={params} />
    </>
);
};

export default Index;