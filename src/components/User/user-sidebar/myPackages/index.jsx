import { Fragment, useState, styled } from "react";
import { Col, Row, Form, Button, Avatar } from 'antd';
import { useRouter } from 'next/navigation';
import { BodyDemi, BodySmallBold, BodySmallReg, BodyTiny, CustomCol, H5, RegisterButton, BodyBold } from "@/styles/styledComponent";
import { GetMyPackagesService, GetMySinglePackageService } from "@/Services/userService.services";
import { useEffect } from "react";
import profileLogo from '../../../../assets/imgs/icon/profile.svg';
import { PackagesTag } from "@/lib/commonComponent/CustomUserCard/styledComponent";
import Image from "next/image";
import { StyledHr } from "@/components/vendor-payment/styledComponent";
import { EnvironmentOutlined } from "@ant-design/icons";
import { PackServRow } from "./styled"
import { GET_PACKAGE_DETAILS, STORAGE_URL } from "@/Services/vendorService.services";



const UserPackages = ({ setOpen }) => {
    const router = useRouter();
    const [form] = Form.useForm();
    const [userId, setUserId] = useState();
    const [userToken, setUserToken] = useState();
    const [apiData, setApiData] = useState();
    const [cardClicked, setCardClicked] = useState(false);
    const [cardData, setCardData] = useState()
    const [serviceApiData, setServiceApiData] = useState()

    useEffect(() => {
        (async () => {
            const userId = localStorage.getItem('userId')
            const userToken = localStorage.getItem('token')
            setUserId(userId)
            setUserToken(userToken)

            const userData = { "user_id": userId, "token": userToken }
            const response = await GetMyPackagesService(userData)
            const output = response?.response?.data?.orders;
            setApiData(output)

            if (cardClicked) {
                const FORM_DATA = new FormData();
                FORM_DATA.append('user_id', userId);
                FORM_DATA.append('order_id', cardData?.orderId);
                FORM_DATA.append('package_id', cardData?.packageId);
                const response = await GET_PACKAGE_DETAILS(FORM_DATA);
                const output = response?.response?.data?.data;
                setServiceApiData(output)
            }

        })();
    }, [cardClicked]);

    const ExtractValidityDate = (givenDate, validityTime) => {
        const date = new Date(givenDate);
        const year = validityTime?.year;
        const month = validityTime?.month;
        const days = validityTime?.days;

        const expiryDate = new Date(date);
        if (expiryDate && year && month && days) {
            expiryDate.setFullYear(expiryDate.getFullYear() + parseInt(year, 10));
            expiryDate.setMonth(expiryDate.getMonth() + parseInt(month, 10));
            expiryDate.setDate(expiryDate.getDate() + parseInt(days, 10));
            let ExDate = expiryDate.toISOString();
            let convertedExDate = convertDate(ExDate)
            return convertedExDate
        }
        return 'date not found'
    }

    const convertDate = (inputDate) => {
        const dateObj = new Date(inputDate);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return dateObj.toLocaleDateString('en-US', options).split(',').join('');
    };

    const handleCardClicked = (val) => {
        setCardClicked(true);
        setCardData({ orderId: val?.order_id, packageId: val?.package_details?.package_id });
    }

    const handleBookClick = (itm, order_id) => {
        router.push(`/servicedetails/${itm?.service_id}/${itm?.location_id}?orderId=${order_id}&packageId=${serviceApiData?.package_details?.package_id}`)
        setOpen(false);
    }

    return (
        <Fragment>
            <Row style={{ width: '100%', height: '100vh' }}>
                <Col span={24} style={{ padding: '0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Row style={{ fontSize: '16px', fontWeight: 400, color: '#72959A', gap: '10px', alignItems: 'center' }}>
                        <Col>
                            <Image src={profileLogo} />
                        </Col>
                        <H5 style={{ marginTop: '-4px', color: '#72959A' }} >
                            My packages
                        </H5>

                    </Row>


                    {!cardClicked ?
                        <>
                            <BodyDemi style={{ margin: '4px 0px 0px 15px', color: '#72959A' }} >
                                Active Packages
                            </BodyDemi>
                            <div className="biz-row">
                                {apiData && apiData.map((item, index) => {
                                    return (
                                        <>
                                            <div className="biz-col-6" onClick={() => { handleCardClicked(item) }}>
                                                <Row style={{ display: 'flex', flexDirection: 'row', padding: '12px', background: '#F2F1F0', borderRadius: '5px', }}>
                                                    <Col span={12} style={{ background: '#EA8933', padding: '28px 5px 0 10px', display: "flex", flexDirection: 'column', borderRight: '1.5px dashed #ffffff', borderRadius: '3px 6px 6px 3px' }} >
                                                        <Row> <PackagesTag style={{ left: '.4rem' }} >PACKAGE</PackagesTag> </Row>
                                                        <BodyDemi>{item?.package_details?.package_name}</BodyDemi>
                                                        <BodyTiny style={{ color: '#FFF' }}>{item?.package_details?.business_name}</BodyTiny>
                                                        <BodyTiny>Valid Upto</BodyTiny>

                                                        <BodySmallBold>{ExtractValidityDate(item?.created_date, item?.package_details?.validity)}</BodySmallBold>
                                                        {/* <BodySmallBold>{ item?.package_details?.validity }</BodySmallBold> */}
                                                    </Col>

                                                    <Col span={12} style={{ width: 'auto', height: '140px', display: 'flex', justifyContent: 'center', borderRadius: '6px 3px 3px 6px', overflow: 'hidden', objectFit: 'cover' }}>
                                                        <img src={STORAGE_URL + '/images/' + item?.package_details?.feature_image} style={{ height: '100%', width: 'auto', }} />
                                                    </Col>

                                                </Row>
                                            </div>

                                        </>

                                    )
                                })
                                }
                            </div>
                        </>
                        :

                        <>
                            <Row style={{ display: 'flex', flexDirection: 'row', padding: '12px', background: '#F2F1F0', display: 'flex', gap: '0px' }}>
                                {serviceApiData && <>
                                    <Col span={11} style={{ background: '#EA8933', padding: '28px 5px 5px 15px ', display: "flex", flexDirection: 'column', borderRight: '2px dashed #ffffff', borderRadius: '3px 6px 6px 3px', gap: '5px' }} >
                                        <Row> <PackagesTag style={{ left: '.7rem' }} >PACKAGE</PackagesTag> </Row>
                                        <H5>{serviceApiData?.package_data?.package_name || 'no data'}</H5>
                                        <BodySmallReg style={{ color: '#FFF' }}>{serviceApiData?.package_data?.business_name || 'no data'}</BodySmallReg>

                                        <Col style={{ display: "flex", flexDirection: 'column', }}>
                                            <BodyTiny>Valid Upto</BodyTiny>
                                            <BodyBold>{ExtractValidityDate(serviceApiData?.package_data?.created_date, serviceApiData?.package_data?.validity)}</BodyBold>
                                        </Col>
                                    </Col>

                                    <Col span={13} style={{ height: '150px', borderRadius: '6px 3px 3px 6px', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                                            <img src={STORAGE_URL + '/images/' + serviceApiData?.package_data?.feature_image} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                                        </div>
                                    </Col>
                                </>}
                            </Row>

                            <StyledHr />

                            {serviceApiData && serviceApiData?.used_services && serviceApiData?.used_services?.map((item, index) => {
                                return (
                                    <>
                                        <div className="biz-row" style={{ border: "1px solid #ccc", borderRadius: "10px", overflow: "hidden" }}>
                                            <div className="biz-col-4 packge-side-image" style={{ backgroundImage: "url(" + STORAGE_URL + '/images/' + item?.service_detail?.feature_image + ")" }}>
                                                <p style={{ opacity: "0" }}>Image Box</p>
                                            </div>
                                            <div className="biz-col-8" style={{ position: "relative", padding: "10px 15px" }}>
                                                <h3 style={{ fontSize: '15px', fontWeight: 600 }} >{item?.service_detail?.title || 'no data'}</h3>
                                                <h4>{item?.service_detail?.vendor_details?.name || 'no data'} </h4>
                                                <h5 style={{ margin: '8px 0' }}> <EnvironmentOutlined /> {serviceApiData?.location_meta?.city || 'no data'}</h5>
                                                {parseInt(item?.count) > 0 ? <>
                                                    <strong style={{ height: 'auto', width: '62px', background: '#F2F1F0', color: '#ED510C', padding: "6px 10px", marginRight: '10px', cursor: "pointer", display: "inline-block", marginTop: "10px" }} onClick={() => {
                                                    setOpen(false)
                                        router.push('/service-detail?serviceId=' + item?.service_detail?.master_id + '&locationId=' + serviceApiData?.location_id)
                                    }}>Book</strong>
                                                </> :<>
                                                <strong style={{ height: 'auto', width: '85px', opacity:".5", background: '#F2F1F0', color: '#ED510C', padding: "6px 10px", marginRight: '10px', cursor: "not-allowed", display: "inline-block", marginTop: "10px" }}>Booked</strong>
                                                </>}
                                               
                                                <p className="count-package">Services left <span> {item?.count < 10 &&  item?.count != 0 ? `0${item?.count}` : item?.count} </span></p>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                            }

                        </>
                    }
                </Col>
            </Row>
        </Fragment>
    )
}

export default UserPackages;