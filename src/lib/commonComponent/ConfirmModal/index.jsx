import { Button, Col, Modal, Row } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Image from 'next/image';
import successlogo from "../../../assets/imgs/check-circle.svg"
import errorlogo from "../../../assets/imgs/x-circle.svg"


const InfoModal = (modalData) => {
    const {text, title, type} = modalData;
    try {
        if (text && title && type) {
            type.toLowerCase()
            Modal.info({
            title: 
                <div style={{ display:'flex', marginTop: "10px" }} >
                    <span> <Image src={(type === 'error')  ? errorlogo : successlogo} alt={'Brand Logo'} width={25} preview={false} /> </span>
                    <span style={{ fontSize:'20px', fontWeight:700, margin: '-5px 0 0 20px', }} >{title}</span>
                </div>,
        
            content: (
                <div style={{ margin:' -12px 5px 0 45px' }} >
                    <span style={{fontSize:'16px', fontWeight:400}}>{text}</span>
                </div>
            ),
        
            onOk() {},  
            okText: 'Okay',
            okButtonProps: { style: { backgroundColor:'#EA8933', color:'#F2F1F0', fontWeight:600, marginRight:'20px' } },
            icon:null,
            closable: true,
            closeIcon: <CloseOutlined style={{ color: '#333' }} />, 
            });
        }
    } catch (error) {
        console.log(error);
    }

};

export default InfoModal;