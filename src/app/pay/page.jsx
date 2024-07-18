"use client"
import { Col, Row } from "antd";
import UserPayPage from "@/components/User/Pay";

const Index = () => {
    return (
        <>
            <Row style={{ height:'100%' }}>
                <Col span={24}>
                    <UserPayPage />
                </Col>
            </Row>
        </>
    );
    };
    
    export default Index;