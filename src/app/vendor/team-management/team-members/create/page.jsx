"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AddNewMembers from '@/components/vendor/team-management/team-members/addNewMembers/index.jsx';

const Index = () =>{
    const router = useRouter();
    useEffect(() =>{
        if(localStorage.getItem('role') !== 'vendor'){
            router.back();
        }
    },[]);
    console.log("router===>",router)
    return(
        <>
            <AddNewMembers/>
        </>
    )
}

export default Index;