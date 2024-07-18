import { Fragment, useEffect, useState } from "react";
import { Row, Col, Button, Grid, Card, Space, } from 'antd';
import { CustomCol, CustomRow, CustomCard, CustomTag, StyledBoldText, StyledText, CustomText, CustomGeryText, AppointmentTag, VendorCol} from "./styledComponent";
import { EnvironmentOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons";
import Image from "next/image";
import Star from '../../../assets/imgs/icon/Star.svg';
import { useRouter } from 'next/navigation';
import { addToFavouritiesUserServices, checkIsFavoriteService } from "@/Services/userService.services";
import { STORAGE_URL } from "@/Services/vendorService.services";


const ListingCard = (props) => {
    const {cardData} = props;
    const router = useRouter();
    const [ userId, setUserId ] = useState();
    const [ userToken, setUserToken ] = useState();
    const [ userRole, setUserRole ] = useState();
    const [ isFavorite, setIsFavorite] = useState();

    console.log("cardData==>",cardData)

    const CardStyle = {
        backgroundColor: '#F7F6F5',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        margin: '5px',
        cursor: 'pointer',
        // display: 'grid',
        padding: '0px',
        height:"100%",
    };

    const handleCardClick = () => {
         router.push(`/service-detail?serviceId=${parseInt(cardData?.["id"])}&locationId=${parseInt(cardData?.["location_id"])}&VendorId=${cardData?.vendor_id}`);
    //    const link = `/service-detail?serviceId=${encodeURIComponent(cardData?.["id"])}&locationId=${encodeURIComponent(cardData?.["location_id"])}`
      //  window.location.href = link
    }
    
    function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    useEffect(() => {
        (async() => {
            let user_id = localStorage.getItem('userId');
            setUserId(user_id);
            let token = localStorage.getItem('token');
            setUserToken(token);
            let userRole = localStorage.getItem('role');
            setUserRole(userRole);

            setIsFavorite(cardData?.isFavorite);
            
        })();

    }, []);

    const HandleCardFavIconClick = async (data, isFavorite) => {
        console.log("Is Favorite on Click ==>>", isFavorite, data);
        if (userRole && userRole == 'user' && userToken && userId) {
            const DataObj = {
                "token": userToken,
                "user_id": userId,
                "vendor_id": data?.vendor_id,
                "location_id": data?.location_id,
                "service_id": data?.id,
                "isFavorite": !isFavorite
            }
            const response = await addToFavouritiesUserServices(DataObj);
            if (response.response.status == 200) {
                const updatedStatus = await CheckFavoritServiceStatus(DataObj);
            }
        } else {
            localStorage.setItem('previous_route', true);
            router.push('/login');
        }
    }

    const CheckFavoritServiceStatus = async (data) => {        
        const GetFavoriteServiceData = await checkIsFavoriteService(data);
        console.log("isFavorite API ==>>", GetFavoriteServiceData?.response.data?.isFavorite);
        const isFavorite = GetFavoriteServiceData?.response.data?.isFavorite
        setIsFavorite(isFavorite);
    }

    return (
        <Fragment>
                <CustomRow style={{ width : '100%', margin:'8px 0' }}>
                        <CustomCol span={24} style={CardStyle}>
                            <CustomCard hoverable style={{height:'100%' }}>

                                <Col onClick={handleCardClick} >
                                    <img style={{ width: '100%', height: '160px', borderRadius: '6px', objectFit:'cover'}}
                                        alt={cardData?.["service_name"]}
                                        src={STORAGE_URL+'/images/'+cardData.feature_image}
                                    />
                                </Col>

                                { (cardData?.appointment == 'yes') && 
                                    <Col>
                                        <AppointmentTag>APPOINTMENT</AppointmentTag>
                                    </Col>
                                }

                                <Col style={{ padding:'0 .5rem', display:'flex', flexDirection:'column' }}>
                                    <Col onClick={handleCardClick} style={{ margin:'1% 0',display:'flex', flexWrap:'wrap', gap:'1%', flexDirection:'Row' }}>
                                        { (cardData?.label) ? cardData?.label?.slice(0, 3).map((item, key) => {
                                        return (<CustomTag>{item}</CustomTag>)
                                        }) : 'No data available'}
                                    </Col>

                                    <StyledBoldText onClick={handleCardClick} style={{ color: '#2C2C2C' }}>
                                        {cardData?.["service_name"] ??  'No data available'}
                                    </StyledBoldText>

                                    <VendorCol style={{display:'flex',  margin:'5px 0'}}>
                                        
                                        <StyledText onClick={handleCardClick}>{cardData?.["vendor_name"] ??  'No data available'}</StyledText> 

                                            {
                                                cardData?.["average-rating"] && cardData?.["average-rating"] > 0 ?
                                                <Col style={{display:'flex', alignItems:'center'}}>
                                                    <Col onClick={handleCardClick} style={{marginRight:'10px', gap:'2px',  alignItems:'center', display:'flex'}}>
                                                        <Image src={Star}></Image>
                                                        <span>
                                                            {cardData?.["average-rating" ] ?? 'No'}
                                                        </span>
                                                        <span style={{ }}> { `(${cardData?.["total-users-rated"]})` ?? 'No' + ' Ratings'}</span>
                                                    </Col>
                                                </Col> : null
                                            }  
                                            <Col  onClick={() => { HandleCardFavIconClick(cardData, isFavorite) }}>
                                                <span>{(isFavorite) ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}</span>
                                            </Col>
                                    </VendorCol>

                                    <CustomText onClick={handleCardClick} style={{margin:'5px 0'}}> <EnvironmentOutlined style={{ marginRight:'3px' }}  />{ capitalize(cardData?.city) ?? 'No data'}</CustomText>

                                    { !(cardData?.appointment == 'yes') && 
                                        <>
                                            {/* <CustomGeryText style={{ color: '#7B7B7B' }}> starts from</CustomGeryText> */}

                                            <text onClick={handleCardClick} style={{  display:'flex', gap: '15px', alignItems: 'center' }}>
                                                <p style={{color: '#ED510C', fontWeight: 700, fontSize: "18px" }}>{cardData?.price ?? 'No data'}</p>
                                            </text>
                                        </>
                                    }

                                </Col>
                            </CustomCard>
                        </CustomCol>
                </CustomRow>
        </Fragment>
    )
}

export default ListingCard;