"use client"
import { Col, Row } from "antd";
import { useRouter, useSearchParams } from 'next/navigation'
import ServicePayment from "@/components/User/booking";
import { LeftOutlined } from "@ant-design/icons";


const Index = ({params}) => {
    
    const searchParams = useSearchParams()
    const router = useRouter();


    // const status = searchParams.get('redirect_status');
    // console.log("Redirect Status -->>", status);

    let props = {
        // status : status
        orderId: params?.orderId    
    }

    
    return (
        <> 
        

            <Row style={{ height:'50%' }}>
                <Col span={24} >
                    <ServicePayment  {...props} />
                </Col>
            </Row>


        </>
    );
    };
    
    export default Index;