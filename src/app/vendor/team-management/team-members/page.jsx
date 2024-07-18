"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Team_Members from '@/components/vendor/team-management/team-members/index.jsx';

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
            <Team_Members/>
        </>
    )
}

export default Index;