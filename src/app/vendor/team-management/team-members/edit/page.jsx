"use client"
import { useSearchParams } from 'next/navigation';
import AddNewMembers from '@/components/vendor/team-management/team-members/addNewMembers/index.jsx';

const Index = () =>{
    const searchParams = useSearchParams()
    const StaffId = searchParams.get('StaffId');

    let params = { StaffId: StaffId }
    console.log("Params: ", params);
    return(
        <>
            <AddNewMembers params={params}/>
        </>
    )
}

export default Index;