import CardsCarousel from "@/lib/commonComponent/CardsCarousel";
import { Col, Row, Button, Carousel, Dropdown, message } from "antd";
import { Fragment, useState, useEffect, useRef } from "react";
import {
    ButtonText, CalenText, CustomCol, CustomRow, CustomText,
    CustomTitleText, SpanText, StyledFeatureText, StyledListText, StyledLocText, StyledOrgTitle, StyledPriceText,
    StyledText, StyledTextNew, StyledTitle, styledTextNew, SelectedCol, Servic1Col, SloteRow, ServicCol, ServiceRow, SmallText, CardTitalText, StyledDateCol, PackagesTag
} from "./styledComponent";
import { CheckOutlined, EnvironmentOutlined, UserOutlined, ArrowRightOutlined, UploadOutlined, ArrowLeftOutlined, LeftOutlined, RightOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import { CustomTag, OrgNumText } from "@/lib/commonComponent/CustomUserCard/styledComponent";
import { GetServiceById, addToCartUserServices, GetBookedSlotsDetailsforaDate, GetPackageDetailsService, addToFavouritiesUserServices, checkIsFavoriteService } from "@/Services/userService.services";
import ListingCard from "@/lib/commonComponent/CustomUserCard";
import dayjs from "dayjs";
import Image from "next/image";
import Xicon from '../../../assets/imgs/icon/x-circle.svg';
import DeviceMobileCamera from '../../../assets/imgs/icon/DeviceMobileCamera.svg';
import { BodyBold, BodyReg, BodySmallBold, BodySmallReg, BodyTextBold, BodyTiny, BodyTinyBold, DiscountTag, H2Bold, H4, H5, RegisterButton, TitleBoldGrey } from "@/styles/styledComponent";
import InfoModal from "@/lib/commonComponent/ConfirmModal";
import { StyledHr } from "@/components/vendor-payment/styledComponent";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { STORAGE_URL } from "@/Services/vendorService.services";


const ServiceDetails = ({ params }) => {
    const format = 'HH:mm';
    const router = useRouter();
    const [apiData, setApiData] = useState()
    const [carouselImages, setCaroselImages] = useState();
    const [userId, setUserId] = useState();
    const [userToken, setUserToken] = useState();
    const [userRole, setUserRole] = useState();
    const [cartData, setCartData] = useState([]);
    const [isCartVisible, setIsCartVisible] = useState(true);
    const [packageSum, setPackageSum] = useState(0);
    const [payableAmt, setPayableAmt] = useState(0);
    const [isFavorite, setIsFavorite] = useState();
    const ID = params.packageId;
    const lID = params.locationId;

    useEffect(() => {
        (async () => {
            let packageId = ID;
            let locationId = lID;
            let userId = localStorage.getItem('userId');
            setUserId(userId);

            let userRole = localStorage.getItem('role');
            setUserRole(userRole);

            let userToken = localStorage.getItem('token');
            setUserToken(userToken);

            const response = await GetPackageDetailsService(packageId, locationId);

            const output = response?.response?.data;
            console.log("API data serv Det ==>>", output)
            setApiData(output)

            if (userRole && userRole == 'user' && userToken && userId) {
                const DataObj = {
                    "token": userToken,
                    "user_id": userId,
                    "vendor_id": output?.["vendor-id"],
                    "location_id": locationId,
                    "package_id": packageId,
                }
                await CheckFavoritServiceStatus(DataObj)
            }

            setCaroselImages([output?.["feature-image"]])
            // const sum = output?.package_service_array.reduce((total, item) => total + item.amount, 0);
            const sum = output?.package_service_array.reduce((acc, item) => acc + (item.amount * parseInt(item.count)), 0);
            setPackageSum(sum)

            const payAmt = output?.amount * (100 - output?.discount) / 100
            setPayableAmt(payAmt)

            const countData = output?.package_service_array.map((item, ind) => {
                let countObj = {
                    count: item?.count,
                    service_name: item?.service_name,
                    service_id: item?.service_id
                }
                return countObj
            })
            console.log("Count Data ==>>", countData);

            let cartObj = {
                "location_id": lID,
                "token": userToken || null,
                "booking_engine": 4,
                "user_id": userId || null,
                "package_id": packageId,
                "package_services": countData,
                "price": payAmt,
                "discount": output?.discount,
                "service_id": null,
                "resource_id": null,
                "start_date": null,
                "end_date": null,
                "slot_start_time": null,
                "slot_end_time": null,
                "tax": 0,
            }
            console.log("Cart Object ==>>", cartObj);
            setCartData(cartObj)
        })();

    }, []);

    const HandleAddCart = async (data) => {
        console.log("data",data)
        if (data) {
            console.log("Add Cart Data -->>", data)
            data.vendor_id = Number(apiData?.["vendor-id"]);
            const response = await addToCartUserServices(data);
            if (response?.response?.status == 200) {
                setCartData()
                setIsCartVisible(false)
            }
        } else {
            InfoModal({
                type: 'error',
                title: 'Warning',
                text: 'Please login to add into cart'
            })
        }
    }

    const url = `/store-front/?vendorId=${encodeURIComponent(apiData?.business_id)}`;

    const handleAddToFavourites = async (isFavorite) => {
        console.log("Is Favorite on Click pack ==>>", isFavorite);

        if (userRole && userRole == 'user' && userToken && userId) {
            console.log("Run 2");
            const DataObj = {
                "token": userToken,
                "user_id": userId,
                "vendor_id": apiData?.["vendor-id"],
                "location_id": lID,
                "package_id": apiData?.id,
                "isFavorite": !isFavorite
            }
            console.log("Data object ==>>", DataObj);
            const response = await addToFavouritiesUserServices(DataObj);
            console.log("Response ==>>", response);
            if (response.response.status == 200) {
                const updatedStatus = await CheckFavoritServiceStatus(DataObj);
                console.log("Updated Status ==>>", updatedStatus);
            }
        } else {
            console.log("Run 1");
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
            <Row>
                <Col span={24}>
                    <ServiceRow>
                        <ServicCol span={10} style={{ backgroundColor: '#4E39B7', height: '500px', maxWidth: '100%' }}>
                            <Row style={{ height: '100%', display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                                <Col span={20} style={{ display: 'flex', flexDirection: 'column' }}>

                                    <PackagesTag>PACKAGE</PackagesTag>

                                    <StyledTitle>{apiData?.['package-name'] ?? 'No data'}</StyledTitle>

                                    <Link href={url}> <StyledOrgTitle style={{ cursor: 'pointer' }}>{apiData?.['vendor-name']}</StyledOrgTitle> </Link>

                                    {/* <StyledText>{apiData?.["slots-meta-array"]?.['0']?.[lID]?.duration + ' mins' ?? 'No data'}</StyledText> */}

                                    <Col style={{ padding: '5px 0' }}>
                                        {
                                            apiData && apiData?.package_service_array && apiData?.package_service_array.map((item, index) => {
                                                return (
                                                    <>
                                                        <OrgNumText style={{ fontSize: '15px' }}>{item.count}</OrgNumText>
                                                        <BodyReg style={{ fontSize: '15px', color: '#ffffff' }}> {`${item.service_name} ${(index !== (apiData?.package_service_array.length - 1)) ? ' | ' : ""}`}</BodyReg>
                                                    </>
                                                )
                                            })
                                        }
                                    </Col>

                                    <StyledLocText> <EnvironmentOutlined style={{ marginRight: '3px' }} />{apiData?.city ?? 'No data'}</StyledLocText>

                                    <Row style={{ display: 'flex', flexDirection: 'row', margin: '3px 0' }}>
                                        {apiData?.features_arr && apiData?.features_arr.map((item, index) => {
                                            console.log("Item: ===>>", item);
                                            return (
                                                (item != '') && <StyledFeatureText> <CheckOutlined style={{ color: '#ED510C' }} /> {item}</StyledFeatureText>
                                            )
                                        })}
                                    </Row>

                                    <CustomText>{apiData?.about ?? 'No data'}</CustomText>

                                    <Col style={{ margin: '15px 0' }}>
                                        {apiData?.benefits_arr && apiData?.benefits_arr.map((item, key) => {
                                            return (<CustomTag style={{ borderRadius: '4px', marginRight: '10px' }} >{item}</CustomTag>)
                                        })
                                        }
                                    </Col>

                                    <Col style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
                                        <StyledPriceText style={{ fontSize: '32px' }}>{`$${payableAmt.toFixed(2)}` || 'no data'}</StyledPriceText>
                                        {(apiData?.discount && apiData?.discount > 0) ? <DiscountTag>{`${apiData?.discount}% OFF`}</DiscountTag> : ''}
                                        {(apiData?.discount && apiData?.discount > 0) ? <BodyBold style={{ color: '#F2F1F0', marginRight: '10px', textDecoration: 'line-through' }}>{apiData?.amount}</BodyBold> : ''}
                                    </Col>

                                    <BodyBold style={{ color: '#FFFF' }}> Save <BodyBold style={{ color: '#ED510C' }}>{(packageSum - payableAmt).toFixed(2)}</BodyBold> with this package </BodyBold>

                                    <RegisterButton
                                        style={{ height: '33px', width: 'fit-content', border: 'none', fontSize: '16px', fontWeight: 600, margin: '15px 0' }}
                                        onClick={() => handleAddToFavourites(isFavorite)}
                                        icon={(isFavorite) ? <HeartFilled /> : <HeartOutlined />}
                                    >
                                        {` ${(isFavorite) ? 'Remove from favourites' : 'Add to favourites'}`}
                                    </RegisterButton>
                                </Col>
                            </Row>
                        </ServicCol>

                        {carouselImages && carouselImages.length > 0 &&
                            <Servic1Col span={14}>
                                <CardsCarousel galleries={carouselImages} />
                            </Servic1Col>
                        }
                    </ServiceRow>

                    <Row style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem' }} >
                        <Col span={20}>
                            <SloteRow style={{ width: '100%', display: 'flex', msFlexDirection: 'row', gap: '1rem', justifyContent: 'center' }}>
                                <CustomCol style={{ background: '#FFFF', border: '1px solid #CDCDCD', padding: '1rem' }}>
                                    <TitleBoldGrey style={{ padding: '10px' }} >Services in this Package</TitleBoldGrey>
                                    {apiData && apiData.package_service_array.map((item, index) => {
                                        return (
                                            <>
                                                <Row key={index} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', width: '100%', padding: '10px' }} gutter={24} >
                                                    <Col span={6}>
                                                        <img style={{ objectFit: 'cover', maxWidth: '100%', borderRadius: '6px' }}
                                                            src={STORAGE_URL + '/images/' + item?.feature_image || 'no data'}
                                                        />
                                                    </Col>

                                                    <Col span={8} style={{ display: "flex", flexDirection: "column" }}>
                                                        <H5 style={{ fontSize: '18px', fontWeight: 600 }} >{item?.service_name || 'no data'}</H5>

                                                        <Link href={url}><BodySmallBold style={{ cursor: 'pointer' }} >{apiData?.["vendor-name"] || 'no data'} </BodySmallBold> </Link>

                                                        <BodySmallReg style={{ margin: '8px 0' }}> <EnvironmentOutlined /> {item?.city || 'no data'}</BodySmallReg>

                                                        <Row align={'middle'}> <BodyTiny style={{ color: '#7B7B7B', paddingRight: '5px' }}>Stand alone price</BodyTiny> <BodyReg>{`$${item?.amount}`}</BodyReg> </Row>
                                                    </Col>

                                                    <Col span={10} style={{ display: 'flex', alignItems: 'end', flexDirection: 'column' }} >
                                                        <BodyTiny>{`NUMBER OF "${item?.service_name.toUpperCase()}" IN THE PACKAGE`}</BodyTiny>
                                                        {/* <H4 style={{ color:'#ED510C' }} >{item?.count}</H4> */}
                                                        <H4 style={{ color: '#ED510C' }}>{item?.count < 10 ? `0${item?.count}` : item?.count}</H4>
                                                    </Col>
                                                </Row>

                                                {(index !== (apiData?.package_service_array.length - 1)) ? <StyledHr /> : ""}
                                            </>
                                        )
                                    })}
                                </CustomCol>

                                {/* =========== Cart ============= */}
                                <SelectedCol>
                                    {isCartVisible && (
                                        <>
                                            {
                                                <Row style={{ padding: '1rem' }} >
                                                    {apiData && apiData?.package_service_array && apiData?.package_service_array?.map((item, index) => {
                                                        return (
                                                            <>
                                                                <Col span={24} key={index} style={{ padding: '4px 0' }} >
                                                                    <Row style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                                                        <BodyBold>{item?.["service_name"]}</BodyBold>
                                                                        <BodyBold>{`$${item?.amount * item?.count || "no data"}`}</BodyBold>
                                                                    </Row>
                                                                    {/* <BodySmallReg>Count <OrgNumText style={{ fontSize:'14px' }}>{item?.count}</OrgNumText> </BodySmallReg> */}
                                                                    <BodySmallReg>Count
                                                                        <OrgNumText style={{ color: '#ED510C', fontSize: '14px', paddingLeft: '8px' }}>{item?.count < 10 ? `0${item?.count}` : item?.count}</OrgNumText>
                                                                    </BodySmallReg>
                                                                </Col>
                                                            </>
                                                        )
                                                    })}
                                                </Row>
                                            }

                                            <StyledHr />

                                            <Row>
                                                <Col style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 1rem 25px 1rem' }} >
                                                    <BodyTinyBold style={{ color: '#72959A' }}>Services Total</BodyTinyBold>
                                                    <BodyBold>{`$${packageSum}`}</BodyBold>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span={24} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: 'var(--gradient-2, linear-gradient(321deg, #EA8933 6.95%, #ED510C 95.13%))' }}>
                                                    <Row> 
                                                        <BodyBold>Package Price</BodyBold> 
                                                        <p style={{ margin: '0px 0 8px 0',  fontSize:'12px' }}>Inclusive of applicable GST</p>
                                                    </Row>
                                                    <Row style={{ display: 'flex', alignItems: 'center', }} >
                                                        {(apiData?.discount && apiData?.discount > 0) ? <DiscountTag>{`${apiData?.discount}% OFF`}</DiscountTag> : ''}
                                                        {(apiData?.discount && apiData?.discount > 0) ? <Col> <BodyBold style={{ color: '#F2F1F0', marginRight: '10px', textDecoration: 'line-through' }}>{apiData?.amount}</BodyBold> </Col> : ''}
                                                        <Col> <H2Bold>{`$${payableAmt.toFixed(2)}` || 'no data'}</H2Bold> </Col>
                                                    </Row>
                                                </Col>
                                            </Row>

                                            <Row style={{ marginTop: '8px' }} >
                                                <a style={{ width: '100%' }}>
                                                    <Button onClick={() => HandleAddCart(cartData)}
                                                        style={{ padding: '.6rem 1rem', height: 'auto', fontSize: '1.2rem', width: '100%', border: 'none', background: '#2C2C2C', color: '#F2F1F0', borderRadius: '5px' }}
                                                    >
                                                        <strong>Add to Cart</strong>
                                                    </Button> </a>
                                            </Row>

                                        </>
                                    )}
                                    <Row style={{ display: 'flex', gap: '.7rem', borderBottom: '1px solid #CDCDCD', padding: '1rem', alignItems: 'center' }}>
                                        <Col style={{ width: '20px', display: 'flex', alignItems: 'start' }}>
                                            <Image src={DeviceMobileCamera} style={{ width: '20px', display: 'flex', alignItems: 'start' }} />
                                        </Col>
                                        <Col style={{ flexGrow: '4' }}>
                                            <CardTitalText style={{ fontSize: '1rem' }}>{apiData?.vendor_phone || "No Data"}</CardTitalText>
                                        </Col>
                                        <a> <Button style={{ height: 'auto', width: '100%', border: 'none', background: 'none', color: '#2C2C2C', border: '1px solid #2C2C2C', borderRadius: '5px' }}><strong>Call</strong> </Button> </a>
                                    </Row>
                                </SelectedCol>
                            </SloteRow>
                        </Col>
                    </Row>

                </Col>
            </Row>
        </Fragment>
    )
}

export default ServiceDetails;