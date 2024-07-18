import React, { useState } from 'react';
import { Button, Col, Drawer, Space, Row } from 'antd';
import {BodySmallReg, BodyTiny, BodyBold, H5, SubmitButton, ButtonSmall} from '../../../styles/styledComponent'
import { CheckCircleTwoTone, HeartTwoTone, SmileTwoTone, StarOutlined, StarFilled, DownloadOutlined } from '@ant-design/icons';
import {CustomSmText, CustomDetailsText} from "../../vendor/styledComponent"
import moment from 'moment';

const VendorPaymentInfoDrawer = ({ open, setOpen, paymentData}) => {
  const showDefaultDrawer = () => {
    setSize('default');
    setOpen(true);
  };

  const showLargeDrawer = () => {
    setSize('large');
    setOpen(true);
  };
  

  const onClose = () => {
    setOpen(false);
  };

  // let expireTime = apiData?.stripeURLresponse?.expires_at;
 // expireTime = moment.unix(expireTime);
 // expireTime = moment(expireTime).format('LTS');
  
  return (
    <>
      <Drawer style={{paddingTop:'70px'}}
        title={`Payment Details`}
        placement="right"
        size={'large'}
        onClose={onClose}
        open={open}
        // extra={
         
        // }
      >
          {/* <Col style={{display:'flex', alignItems:'center',  gap:'1rem'}}>
            <H5>Payment Details</H5>
           </Col> */}

          <Col style={{display:'flex', flexDirection:'column', margin:'20px 0'}}>
            <span>
             <CustomSmText>Invoice Id </CustomSmText>
            </span>
            <span>
               <CustomDetailsText> {paymentData?.data[0]?.lines?.data[0]?.id}</CustomDetailsText>
            </span>

          </Col>

          <Col style={{display:'flex', flexDirection:'column', margin:'20px 0'}}> 
          <span>
             <CustomSmText>Invoice Period Start Date   </CustomSmText>
            </span>
            <span>
               <CustomDetailsText> { moment.unix(paymentData?.data[0]?.lines?.data[0]?.period?.start).format('MMMM Do YYYY')}</CustomDetailsText>
            </span>
          </Col>

          <Col style={{display:'flex', flexDirection:'column', margin:'20px 0'}}>
            <span>
              <CustomSmText>Invoice Period End Date  </CustomSmText>
              </span>
              <span>
                <CustomDetailsText style={{fontSize:'14px'}}> {moment.unix(paymentData?.data[0]?.lines?.data[0]?.period?.end).format('MMMM Do YYYY')}</CustomDetailsText>
              </span>
          </Col>
        

          
          <Col style={{display:'flex', flexDirection:'column', margin:'20px 0'}}>
           {/* <Button type='Primary'>Invoice pdf url {paymentData?.data[0]?.invoice_pdf} </Button> */}

           <Button type='link' icon={<DownloadOutlined />}  style={{border:'1px solid #ED510C', width:'fit-content', color: '#ED510C'}} > <a href={paymentData?.data[0]?.invoice_pdf} >
                Download invoice
            </a></Button>

            {/* <Button 
              type='Primary' icon={<DownloadOutlined />} size={100}
              onClick={(e) => {
                  e.preventDefault();
                  window.location.href={paymentData?.data[0]?.invoice_pdf}
                  }}
                  > 
                Download invoice
            </Button> */}
            
          </Col>
        
      </Drawer>
    </>
  );
};
export default VendorPaymentInfoDrawer;