import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "antd";
import { CustomGreyText, CustomText, CustomTitleText, StyledText, ConfirmModal } from "./styledComponent";
import { usePathname } from "next/navigation";

const BookingCancelModal = (modalData) => {
    const { open, onOk, onCancel, modelText, cancelCharge } = modalData;
    const [isModalOpen, setIsModalOpen] = useState();
    const refundcharges = Number(modelText?.price_detail?.totalPrice) *(1-cancelCharge)
    const pathname = usePathname();

    useEffect(()=>{
        console.log("cancelCharge===>",cancelCharge);
        console.log("modelText===>",modelText);
    })
    return (
        <>
    <Row style={{ display:'flex', justifyContent: 'center', alignItems: 'center', width:'100%' }}>
        <Col>
            <ConfirmModal
                title={""}
                className={"my_cancel_modal"}
                open={open}
                onOk={onOk}
                okText= { (pathname == '/mybookings') ? 'Cancel Booking' : 'Cancel Appointment' }
                okButtonProps={{
                    style: {
                        backgroundColor: '#EA8933',
                        color: '#F2F1F0',
                        fontWeight: 600,
                        marginRight: '20px'
                    }
                }}
                onCancel={onCancel}
                cancelText= "Don't Cancel"
                cancelButtonProps={{
                    style: {
                        color: '#2C2C2C',
                        fontWeight: 600,
                        marginRight: '20px',
                        border:'1px solid #2C2C2C'
                    }
                }}
                mask
                centered
                keyboard
            >
                <Row style={{ display:'flex',  flexDirection:'column', alignItems:'start' }}>
                    <Col>
                        { pathname === '/mybookings' ? ( <CustomTitleText> Cancel booking id: {` #${modelText?.id || 'no data'}`} </CustomTitleText>) : 
                            ( <CustomTitleText> Cancel Appointment {` #${modelText?.id || 'no data'}`} </CustomTitleText> )
                        }
                    </Col>

                    {
                        (modelText?.booking_engine != 5 || modelText?.booking_engine != 6 ) &&
                        <Col style={{ display:'flex', alignItems: 'start', flexDirection: 'column', gap:'10px' }} >
                            {/* <CustomGreyText>Since your booking is less than 24 hours a fixed amount will be deducted.</CustomGreyText>                */}
                            <Row  style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                                <Col>You Paid</Col>
                                <Col><StyledText>{` $${modelText?.price_detail?.totalPrice ? modelText?.price_detail?.totalPrice : '0.00'}`}</StyledText></Col>
                            </Row>  
                            <Row  style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                                <Col>Cancelation charges</Col>
                                <Col><StyledText>{` $${refundcharges ? refundcharges.toFixed(2) : '0.00'}`}</StyledText> </Col>
                            </Row>
                            <hr style={{width:'100%'}}></hr>
                            <Row  style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                                <CustomText>Amount to be refunded</CustomText>
                                <Col><StyledText>{` $${modelText?.price_detail?.totalPrice ? (modelText?.price_detail?.totalPrice - refundcharges ).toFixed(2) : '0.00'} `}</StyledText></Col>
                            </Row> 
                            
                            <CustomGreyText>You will receive the amount in source within 7 working days.</CustomGreyText>
                        </Col>
                    }
                </Row>
            </ConfirmModal>
        </Col>
    </Row>
        </>
    );
};
export default BookingCancelModal;
