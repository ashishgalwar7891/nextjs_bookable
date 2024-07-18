"use client"
import VendorProfile   from "@/components/vendor/profile";
import { useSearchParams } from 'next/navigation';
import { Col, Row } from "antd";
import { useEffect } from "react";

const Index = ({params}) => {

    const searchParams = useSearchParams()

    let props = {
        setup_intent: params?.setup_intent   
    }
  useEffect(() =>{
    localStorage.setItem('redirect', 'dashboard');
    localStorage.removeItem('plan_id');
  },[])
return (
    <>
    <Row style={{ height:'100%' }}>
        <Col span={24} >
            <VendorProfile {...props} />
        </Col>
    </Row>
   </>
);
};

export default Index;