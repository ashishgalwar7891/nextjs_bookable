
import { Fragment, useState } from "react";
import { Col } from 'antd';
import { CustomCol, CustomRow, CustomCard, CustomTag, 
    StyledBoldText, StyledText, CustomText, CustomGeryText, PackagesTag, OrgNumText } from "../CustomUserCard/styledComponent";
import { EnvironmentOutlined, HeartOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { AmtGreyCardTxt, BodyBold, BodyTextBold, DiscountTag, H2Bold, OrgPriceCardTxt } from "@/styles/styledComponent";
import { useEffect } from "react";
import { STORAGE_URL } from "@/Services/vendorService.services";

const UserPackageCard = (props) => {
    const {cardData, nearBy} = props;
    const router = useRouter();
    const [packageSum, setPackageSum ] = useState(0);
    const [payableAmt, setPayableAmt] = useState(0);

useEffect(
    () => {
        const sum = cardData?.package_service_array.reduce((acc, item) => acc + (item.amount * parseInt(item.count)), 0);
        setPackageSum(sum)
        
        const payAmt = cardData.amount * ( 100 - cardData.discount) / 100
        setPayableAmt(payAmt)
    }, [])

    function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const CardStyle = {
        backgroundColor: '#F7F6F5',
        color: 'white',
        border: '1px solid #EA8933',
        borderRadius: '5px',
        margin: '5px',
        cursor: 'pointer',
        display: 'grid',
        padding: '0px',
    };

    const handleCardClick = () => {
        router.push(`/package-detail?serviceId=${cardData?.id}&locationId=${cardData?.package_service_array?.[0]?.["location_id"]}`)
    }
    
    return (
        <Fragment>
                <CustomRow onClick={handleCardClick}>
                        <CustomCol span={24} style={CardStyle}>
                            <CustomCard hoverable style={{padding:'4px 5px', background: '#F2F1F0',border:'#EA8933' }}>

                                <Col> <p style={{fontSize:'12px',lineHeight: '130%'}}>{cardData?.["vendor-name"] ??  'No data available'}</p>
                                <StyledBoldText style={{ color: '#2C2C2C' }}> {cardData?.["package-name"] ??  'No data available'} </StyledBoldText> </Col>

                                <Col style={{ paddingBottom:'10px' }}>
                                    
                                </Col>

                                <Col>
                                    <PackagesTag>PACKAGE</PackagesTag>
                                    <img style={{ width: '100%', height: '160px', borderRadius: '6px', objectFit:'cover'}}
                                        alt={cardData?.["service-name"]}
                                        src={ STORAGE_URL +'/images/'+ cardData?.["feature-image"]}
                                    />
                                </Col>

                                <Col style={{ padding:'0 .3rem', display:'flex', flexDirection:'column' }}>
                                    <Col style={{ margin:'1% 0' }}>
                                        { (cardData?.label) ? cardData?.label?.slice(0, 3).map((item, key) => {
                                        return (<CustomTag>{item}</CustomTag>)
                                        }) : 'No data available'}
                                    </Col>
                                        
                                        { cardData?.["average-rating"] > 0 && <Col style={{display:'flex', margin:'5px 0'}}>
                                                { 
                                                    cardData?.["average-rating"] &&
                                                    <div style={{display:'flex', marginLeft:'10px', alignItems:'center'}}>
                                                        <span>
                                                            {cardData?.["average-rating"] ?? 'No'}
                                                        </span>

                                                        {/* { (cardData?.["average-rating"] > 0) && 
                                                        Array(Math.round(Number(cardData?.["average-rating"]) ?
                                                            Number(cardData?.["average-rating"])
                                                                : 0)).fill().map((rate) => (  */}
                                                                {/* <Image src={Star}></Image> */}
                                                        {/* ))
                                                        }  */}
                                                        <span style={{ }}> { `(${cardData?.["total-users-rated"]})` ?? 'No' + ' Ratings'} <HeartOutlined /> </span>
                                                </div>
                                                }  
                                            </Col>
                                        }

                                        <Col style={{ padding: '5px 0' }}>
                                            {
                                                cardData && cardData?.package_service_array && cardData?.package_service_array.map((item, index) => {
                                                    return (
                                                        <>
                                                            <OrgNumText>{item.count}</OrgNumText> <BodyTextBold>{item.service_name}</BodyTextBold> {(index !== (cardData?.package_service_array.length -1)) ? ' | ' : null}
                                                        </>
                                                    )
                                                })
                                            }
                                        </Col>

                                    <CustomText style={{fontSize:'12px', margin:'5px 0'}}> <EnvironmentOutlined style={{ marginRight:'3px' }} />{capitalize(cardData?.package_service_array?.[0]?.location_city) ?? 'No data'}</CustomText>

                                    <text  style={{  display:'flex', gap:'2px', alignItems: 'center' }}>
                                        {/* <p style={{color: '#ED510C', fontWeight: 700, fontSize: "21px" }}>{cardData?.price ?? 'No data'}</p> */}
                                        <Col> <OrgPriceCardTxt>{`$${payableAmt.toFixed(2)}` || 'no data'}</OrgPriceCardTxt> </Col>
                                        { (cardData?.discount && cardData.discount > 0) ? <DiscountTag>{`${cardData?.discount }% OFF`}</DiscountTag> : ''}
                                        { (cardData?.discount && cardData.discount > 0) ? <Col> <AmtGreyCardTxt>{cardData.amount}</AmtGreyCardTxt> </Col> : ""}
                                    </text>
                                    
                                    <CustomGeryText style={{ color: '#7B7B7B' }}>Save $<span style={{ fontSize:'12px', fontWeight: 700, color: '#ED510C' }} >{(cardData.total_service_price - payableAmt.toFixed(2)).toFixed(2)}</span> with this package</CustomGeryText>
                                </Col>
                            </CustomCard>
                        </CustomCol>
                </CustomRow>
        </Fragment>
    )
}

export default UserPackageCard;