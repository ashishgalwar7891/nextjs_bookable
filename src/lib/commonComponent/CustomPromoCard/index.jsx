import { Fragment } from "react";
import { Button, Grid, Card, Space, Col, Row } from 'antd';
import { CustomCol, CustomRow, CustomBox, CardButton, CustomTag, SpecialTag} from "./styledComponent";
import { CustomGeryText, CustomText, StyledBoldText, StyledText } from "../CustomUserCard/styledComponent";
import { EnvironmentOutlined, HeartOutlined } from "@ant-design/icons";
import { useRouter } from 'next/navigation';
import { STORAGE_URL } from "@/Services/vendorService.services";

const PromotionCard = (props) => {
    const {featuredData} = props;
    const router = useRouter()
    
    const CardStyle = {
        borderRadius: '6px',
        background: 'var(--purple-dark, #4E39B7)',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        color: 'white',
        border: '.2px #ccc6c6 solid',
        borderRadius:'5px',
        margin: '5px',
        cursor: 'pointer',
        display: 'flex',
        padding: '0px',
        maxHeight:'auto',
        overflow:'hidden'
    };

    function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const handleCardClick = () => {
        router.push(`/service-detail?serviceId=${featuredData?.["id"]}&locationId=${featuredData?.["location_id"]}`)
    }
    


    return (
        <Fragment>
                <CustomRow style={CardStyle} onClick={handleCardClick}>
                            <Row style={{}}>
                            <Col md={12} xl={12} sm={12} xs={12} style={{display:'flex', alignItems:'center', justifyContent:'center', maxHeight:'14rem', overflow:'hidden'}}>
                                <SpecialTag>FEATURED</SpecialTag>
                                <img style={{objectFit:'cover', maxWidth: '100%', borderRadius: '6px 0 0 6px', height: '-webkit-fill-available'}}
                                    alt={featuredData?.["service-name"]}
                                    src={STORAGE_URL + '/images/' + featuredData?.["feature-image"]}
                                />
                            </Col>
                            

                            <CustomCol md={12} sm={12} xs={12} hoverable style={{ padding: '20px 0 20px 20px', boxSizing:'border-box' }}>
                                <Col style={{  display:'flex', margin:'1% 0'  }}>
                                    {(featuredData?.label) ? featuredData?.label?.slice(0, 3).map((item, key) => {
                                        return (<CustomTag>{item}</CustomTag>)
                                    }) : "No data available"}
                                </Col>
                                
                                <StyledBoldText style={{ color: '#F2F1F0' }}>{featuredData?.["service-name"]}</StyledBoldText> <br/>

                                <StyledText style={{ color: '#F2F1F0' }}>{featuredData?.["vendor-name"]}</StyledText>

                                {featuredData?.["average-rating"]?.stars && <Col style={{display:'flex', margin:'8px 0'}}>
                                    <span style={{display:'flex' }}>
                                        <span style={{ }}>
                                            {featuredData?.["average-rating"]?.stars ?? 'Not Found'}
                                        </span>
                                        {Array(Math.round(Number(featuredData?.["average-rating"]?.stars) ? 
                                            Number(featuredData?.["average-rating"]?.stars)
                                                : 0 )).fill().map((rate) => ( <p><star></star></p> ))} 
                                                <span> {featuredData?.["average-rating"]?.rating ?? 'not found' + ' Ratings'}<HeartOutlined /> </span>
                                    </span>  
                                </Col>}

                                <CustomText style={{margin:'8px 0', color: '#F2F1F0' }}> <EnvironmentOutlined style={{ marginRight:'3px' }} /> {capitalize(featuredData?.city) ?? 'Not Found'}</CustomText>

                                <CustomGeryText style={{ color: '#CDCDCD' }}> starts from</CustomGeryText>

                                <text  style={{  display:'flex', gap: '15px', alignItems: 'center' }}>
                                    <p style={{color: '#ED510C', fontWeight: 700, fontSize: "21px" }}>{featuredData?.price}</p>
                                </text>

                            
                            </CustomCol>
                            </Row>
                </CustomRow>
        </Fragment>
    )
}

export default PromotionCard;