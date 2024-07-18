"use client"

import { UPDATE_PAYMENT } from "@/Services/frontend";
import Thankyou from "@/widgets/thankyou/Thankyou";
import { Spin } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const Index = () => {
    const searchParams = useSearchParams()
    const payment_intent = searchParams.get('payment_intent');
    const type = searchParams.get('type');
    const id = searchParams.get('id');
    const [showThankyou, setShowThankyou] = useState(true)
    const UPDATE_PAYMENT_FETCH = async (l_user_id) => {
        const FORM_DATA = new FormData();
        FORM_DATA.append('id', id);
        FORM_DATA.append('payment_intent', payment_intent);
        FORM_DATA.append('type', type);
        FORM_DATA.append('user_id', l_user_id);
        const result = await UPDATE_PAYMENT(FORM_DATA);

         if(result.response.data.id){
            setShowThankyou(false);
         }
    }
    useEffect(() => {
        if (localStorage.getItem('userId') !== null) {
            if(searchParams.get('type') == 'free'){
                setShowThankyou(false);
            }else{
                UPDATE_PAYMENT_FETCH(localStorage.getItem('userId'));
            }
            
        } 
    }, [])
        return (
            <>
            {showThankyou ? <>
                <div style={{ textAlign: "center", padding: "120px 0px", width: "100%" }}>
                                <Spin tip="Do not press back button or do not close window." size="large">
                                    <div className="content" />
                                </Spin>
                            </div>
            </> : <>
            <Thankyou />
            </>}
                
            </>
        );
    };

    export default Index;