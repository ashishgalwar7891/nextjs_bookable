"use client"
import SubscriptionSetup  from "@/components/vendor/subscriptionsetup";
import { useRouter, useSearchParams } from 'next/navigation';
import { Col, Row } from "antd";
import { useEffect } from "react";



const Index = ({params}) => {

    const searchParams = useSearchParams()

    let props = {
        setup_intent: params?.setup_intent   
    }
    const router = useRouter();
return (
    <>
    <Row style={{ height:'100%' }}>
        <Col span={24} >
            <SubscriptionSetup  {...props} />
        </Col>
    </Row>
</>
);
};

export default Index;