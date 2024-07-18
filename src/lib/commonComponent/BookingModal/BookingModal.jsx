import { Button, Col, Modal, Row } from 'antd';
import Image from 'next/image';
import { CloseOutlined } from '@ant-design/icons';
import successlogo from "../../../assets/imgs/check-circle.svg"
import errorlogo from "../../../assets/imgs/x-circle.svg"
import { CustomModalContent, CustomTitleText, StyledGreyText } from './styledComponent';

const BookingModal = ( bookData ) => {
    console.log("Booking Info ==>>", bookData);
    try {
            Modal.info({
                content: (
                    <Row style={{ display:'flex', justifyContent:'center', alignItems:'center', textAlign:'center' }} >
                        <Col> <CustomTitleText>{`Booking Canceled #${bookData?.id || 'no data'}`}</CustomTitleText> </Col>
                        <Col> <StyledGreyText>Your Booking for {bookData?.service_name || 'no data'} at {bookData?.vendor_name || 'no data'} has been canceled</StyledGreyText> </Col>
                        <Col> <StyledGreyText>We have sent an email to you.</StyledGreyText> </Col>
                    </Row>
                ),
                onOk() { window.location.reload() },  
                okText: 'Ok',
                okButtonProps: { style: {backgroundColor:'#EA8933', color:'#F2F1F0', fontWeight:600, marginRight:'48%' } },
                icon:null,
                closable: true,
                closeIcon: <CloseOutlined style={{ color: '#333' }} />, 
                width:610
            });
    } catch (error) {
        console.log(error);
    }
};

export default BookingModal;