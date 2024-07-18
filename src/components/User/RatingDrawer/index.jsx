import React, { useState } from 'react';
import { Button, Col, Form, Input, Drawer, Space, Row, Rate, message } from 'antd';
import {BodySmallReg, BodyTiny, H5, SubmitButton, ButtonSmall} from '../../../styles/styledComponent'
import { CheckCircleTwoTone, HeartTwoTone, SmileTwoTone, StarOutlined, StarFilled } from '@ant-design/icons';
import { CustVendFormTxt, CustomVendorFormRow } from "@/components/vendor-details/styledComponent";
import { CustomCol } from "@/styles/styledComponent";
import { RateBookingServices } from '@/Services/sidebar.service';
import InfoModal from '@/lib/commonComponent/ConfirmModal';


const RatingDrawer = ({ open, setOpen, reviewData, userId, userToken }) => {
  console.log("data ==>>", reviewData);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState({
    serviceRating: 0,
    vendorRating: 0,
    resourceRating: 0,
  });

  const [ rating, setRating ] = useState({
    serviceRating: 0,
    vendorRating: 0,
    resourceRating: 0,
  });
  
  const handleSubmit = async () => {
    function hasValueGreaterThanZero(rating) {
      for (const key in rating) {
          if (rating.hasOwnProperty(key) && rating[key] > 0) {
              return true;
          }
      }
      return false;
    }
  
    if (!hasValueGreaterThanZero(rating)) {
        message.error('At least one rating must be required');
    } else {
        const dataObj = {
          "vendor_rating": rating.vendorRating,
          "service_rating": rating?.serviceRating,
          "resource_rating": rating?.resourceRating,
          "comment": comment,
          "token": userToken,
          "user_id": userId,
          "vendor_id": reviewData?.vendor_id,
          "location_id": reviewData?.location_id,
          "service_id": reviewData?.service_id,
          "resource_id": reviewData?.resource_id,
        }
        const response = await RateBookingServices(dataObj)

        setComment('');
        setRating({
          serviceRating: 0,
          vendorRating: 0,
          resourceRating: 0,
        });
        setOpen(false);
    }
  }

  const handleRateChange = (value, type) => {
    if (value && type === 'service') {
      setRating((prevRates) => ({
        ...prevRates,
        serviceRating: value,
      }));
    }

    if (value && type === 'vendor') {
      setRating((prevRates) => ({
        ...prevRates,
        vendorRating: value,
      }));
    }

    if (value && type === 'resource') {
      setRating((prevRates) => ({
        ...prevRates,
        resourceRating: value,
      }));
    }
  };

  const handleRateHover = (value, type) => {
    if (value && type === 'service') {
      setHoverRating((prevRates) => ({
        ...prevRates,
        serviceRating: value,
      }));
    } else {
      setHoverRating((prevRates) => ({
        ...prevRates,
        serviceRating: 0,
      }));
    }

    if ( value && type === 'vendor') {
      setHoverRating((prevRates) => ({
        ...prevRates,
        vendorRating: value,
      }));
    } else {
      setHoverRating((prevRates) => ({
        ...prevRates,
        vendorRating: 0,
      }));
    }

    if (value && type === 'resource') {
      setHoverRating((prevRates) => ({
        ...prevRates,
        resourceRating: value,
      }));
    } else {
      setHoverRating((prevRates) => ({
        ...prevRates,
        resourceRating: 0,
      }));
    }
  };

  const onClose = () => {
    setOpen(false);
  };
  
  return (
    <>
      <Drawer style={{paddingTop:'70px'}}
        title={ `Review ${reviewData?.service_name || 'no data'}` }
        placement="right"
        size={'large'}
        onClose={onClose}
        open={open}
      >
        <Col style={{display:'flex', alignItems:'center',  gap:'.5rem'}}>
          <H5>Rate Service</H5>
            <BodyTiny>{`Booking #${reviewData?.id}`}</BodyTiny>
          </Col>

          <Col style={{display:'flex', flexDirection:'column', margin:'20px 0', gap:'.6rem'}}>
            <BodySmallReg>{`Rate ${reviewData?.service_name}`}</BodySmallReg>
            <Row style={{gap:'.6rem'}}>
              <Rate
                defaultValue={0}
                character={({ index }) => {
                  if (index < hoverRating.serviceRating) {
                    return <StarFilled style={{color:'#EA8933', fontSize:'20px'}} />;
                  }
                  if (index < rating.serviceRating) {
                    return <StarFilled style={{color:'#EA8933', fontSize:'20px'}} />;
                  }
                  return <StarOutlined style={{color:'#72959A', fontSize:'20px'}} />;
                }}
                onChange={ (value) => handleRateChange(value, "service")}
                onHoverChange={(value)=> handleRateHover(value, "service")}
              />
            </Row>
          </Col>

          <Col style={{display:'flex', flexDirection:'column', margin:'20px 0', gap:'.6rem'}}>
            <BodySmallReg>{`Rate ${reviewData?.vendor_name}`}</BodySmallReg>
            <Row style={{gap:'.6rem'}}>
              <Rate
                defaultValue={0}
                character={({ index }) => {
                  if (index < hoverRating.vendorRating) {
                    return <StarFilled style={{color:'#EA8933', fontSize:'20px'}} />;
                  }
                  if (index < rating.vendorRating) {
                    return <StarFilled style={{color:'#EA8933', fontSize:'20px'}} />;
                  }
                  return <StarOutlined style={{color:'#72959A', fontSize:'20px'}} />;
                }}
                onChange={ (value) => handleRateChange(value, "vendor")}
                onHoverChange={(value)=> handleRateHover(value, "vendor")}
              />
            </Row>
          </Col>

          { (reviewData?.resource_name != null) ? <Col style={{display:'flex', flexDirection:'column', margin:'20px 0', gap:'.6rem'}}>
            <BodySmallReg>{`Rate ${reviewData?.resource_name}`}</BodySmallReg>
            <Row style={{gap:'.6rem'}}>
              <Rate
                defaultValue={0}
                character={({ index }) => {
                  if (index < hoverRating.resourceRating) {
                    return <StarFilled style={{color:'#EA8933', fontSize:'20px'}} />;
                  }
                  if (index < rating.resourceRating) {
                    return <StarFilled style={{color:'#EA8933', fontSize:'20px'}} />;
                  }
                  return <StarOutlined style={{color:'#72959A', fontSize:'20px'}} />;
                }}
                onChange={ (value) => handleRateChange(value, "resource")}
                onHoverChange={(value)=> handleRateHover(value, "resource")}
              />
            </Row>
          </Col> : ''}

          <CustomVendorFormRow>
                    <CustomCol span={24}>
                        <CustVendFormTxt>{(reviewData?.booking_engine == 5) ? "Comment on your appointment" : "Comment on your service"}</CustVendFormTxt>
                        <Form.Item>
                          <Input.TextArea 
                            value={comment}
                            style={{height:'3rem !important'}}
                            onChange={(e) => { setComment(e.target.value)}}
                          />
                          </Form.Item>
                        </CustomCol>
            </CustomVendorFormRow>
        <Space style={{justimargin:'20px 0'}}>
            <ButtonSmall onClick={handleSubmit}>Submit</ButtonSmall>
            {/* <Button type="primary" onClick={onClose}>
              cancel
            </Button> */}
          </Space>
      </Drawer>
    </>
  );
};
export default RatingDrawer;