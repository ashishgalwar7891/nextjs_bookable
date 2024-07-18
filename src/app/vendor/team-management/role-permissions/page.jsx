"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Role_Permissions from '@/components/vendor/team-management/role-permissions/index.jsx';

const Index = () =>{
    const router = useRouter();
    useEffect(() =>{
        if(localStorage.getItem('role') !== 'vendor'){
            router.back();
        }
    },[]);
    return(
        <>
            <Role_Permissions/>
        </>
    )
}

export default Index;