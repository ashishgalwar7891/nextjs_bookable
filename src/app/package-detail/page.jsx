"use client"
export const dynamic = 'force-dynamic';
import SericeDetails from "@/components/User/serviceDetails";
import { useParams, useSearchParams } from "next/navigation";
import './style.css'
import { Fragment, useEffect, useState } from "react";
import Banner from "@/widgets/service-banner/Banner";
import ServiceSlotCart from "@/widgets/service-slots-cart/ServiceSlotCart";
import ServicePackageBox from "@/widgets/service-package-box/ServicePackageBox";
import { PACKAGE_DETAILS, SERVICE_DETAILS } from "@/Services/frontend";
import { Spin } from "antd";
import PackageBanner from "@/widgets/service-banner/PackageBanner";
import BizPackageCard from "@/widgets/package-cart/BizPackageCard";
const Index = () => {
    const searchParams = useSearchParams()
    const serviceId = searchParams.get('serviceId');
    const locationId = searchParams.get('locationId');
    const params = { serviceId: serviceId, locationId: locationId }
    const [checkUserLogin, setCheckUserLogin] = useState(false);
    const [user_id, set_user_id] = useState();

    // State 
    const [publicServiceResponse, setPublicServiceResponse] = useState();
    const [publicBookableLocation, setPublicBookableLocation] = useState();
    const [publicVendorPopularServices, setPublicVendorPopularServices] = useState();
    const [publicPackageResponseData, setPublicPackageResponseData] = useState();
    //  Common states 
    const PACKAGE_DETAILS_FETCH = async () => {
        const FORM_DATA = new FormData();
        FORM_DATA.append('id', serviceId);
        FORM_DATA.append('location_id', locationId);
        const result = await PACKAGE_DETAILS(FORM_DATA);
        setPublicPackageResponseData(result.response.data.publicPackageResponseData);
        setPublicServiceResponse(result.response.data.publicServiceResponse);
        console.log('PACKAGE_DETAILS----------------------------------', result)
    }
    useEffect(() => {
        PACKAGE_DETAILS_FETCH();
        if (localStorage.getItem('userId') !== null) {
            set_user_id(localStorage.getItem('userId'));
            setCheckUserLogin(true);
        }
    }, [])

    return (
        <Fragment>
             <PackageBanner publicServiceResponse={publicServiceResponse} publicPackageResponseData={publicPackageResponseData} checkUserLogin={checkUserLogin} user_id={user_id} />
             <BizPackageCard publicServiceResponse={publicServiceResponse} route_location_id={parseInt(locationId)} publicPackageResponseData={publicPackageResponseData} location_id={locationId} service_id={serviceId} checkUserLogin={checkUserLogin} user_id={user_id} />
        </Fragment>
    );

};

export default Index;