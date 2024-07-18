import { Fragment, useState, useEffect } from "react";
import { CustomButton, CustomForm, CustomRow, CustomBoxText, CustomBoldText, FeaturesRow, SpanText, CusText, CustomTitle, CustomCol } from "./styledComponent";
import { Col, Button, Row, Form, Input, Select, TimePicker, Radio, Upload } from 'antd';
import { CheckOutlined, LockOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';


const AppointmentBanner = (props) => {
    const { setPaidPlans} = props;
    const router = useRouter();

    
    const handleBtnClick = () => {

        let userId = localStorage.getItem('userId')

        setPaidPlans({"user_id": userId, "plan_id": 100});
      ///  router.push('/vendor/payment');
        router.push('/vendor/payment?user_id=' + userId + '&plan_id=' + 100);

    }

    return (
        <Fragment>
            <CustomRow style={{ display: 'block' }}>
                <Col xl={24}>
                    <CustomBoldText>Appointments bookings are flexible than a service booking</CustomBoldText>

                    <CusText>Appointments are useful when your clients are not sure about which service to choose or they just want to book a consultation with you.
                        When booking an appointment they will not pay anything at the BOOKABLEbiz platform but at your location after availing any service.
                    </CusText><br/>
                    
                    <CustomBoxText>
                        <SpanText style={{ marginRight: '20px' }}> <CheckOutlined /> Monthly or Annual subscription</SpanText>
                        <SpanText> <CheckOutlined /> Receive money as you want at your location</SpanText>
                    </CustomBoxText><br/>

                    <CustomTitle style={{ marginTop: '20px' }}>Only $25 monthly</CustomTitle><br/>

                    <CustomTitle>OR $225 Annual <Button style={{height:'25px', color: '#F2F1F0', borderRadius: '6px', border: 'none', fontSize: '14px', background: '#ED510C', marginLeft:'5px' }}>SAVE 25%</Button></CustomTitle> 
                    
                    <CustomButton onClick={handleBtnClick}>Activate Appointment Module</CustomButton>
                </Col>
            </CustomRow>
        </Fragment>
    )
}

export default AppointmentBanner;