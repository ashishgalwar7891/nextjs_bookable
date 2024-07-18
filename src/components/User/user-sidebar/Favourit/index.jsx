import { Fragment, useState } from "react";
import { Col, Row, Button, Spin } from 'antd';
import { BodyTiny, H5 } from "@/styles/styledComponent";
import { useEffect } from "react";
import Image from "next/image";
import { EnvironmentOutlined } from "@ant-design/icons";
import { StyledHr } from "@/components/vendor-payment/styledComponent";
import { GetAllFavouritieServices } from "@/Services/userService.services";
import { output } from "../../../../../next.config";
import { useRouter } from 'next/navigation';
import { STORAGE_URL } from "@/Services/vendorService.services";

const UserFavourites = ({ setShowContentScreen }) => {
    const router = useRouter();
    const [ userId, setUserId ] = useState();
    const [ apiData, setApiData ] = useState();

    useEffect(() => {  
        (async() => {
            const userId = localStorage.getItem('userId')
            const userToken = localStorage.getItem('token')
            setUserId(userId)

            fetchedAllFavourites(userId, userToken)
        })();
    }, []);

    const fetchedAllFavourites = async (userId, userToken) => {
        const response = await GetAllFavouritieServices({
            user_id: userId,
            token: userToken
        })
        console.log("Response -->>", response);
        const output = response?.response?.data?.data;
        console.log("Output ==>>", output);
        setApiData(output);
    }

    const handleButtonClick = (location_id, service_id, package_id) => {
        console.log();
        if (service_id != null ) {
            router.push('/service-detail?serviceId='+service_id+'&locationId='+location_id);
        }
        if (package_id != null ) {
            //router.push(`/service-detail/${encodeURIComponent(package_id)}/${encodeURIComponent(location_id)}`)
        }
        setShowContentScreen(false)
    }


    console.log("apiData======>>>",apiData)
    
    return(
        <Fragment>
            <div className="sidebar-favourites">
                {apiData ? <>
                    <H5 style={{ color: '#72959A' }} >Favourites</H5>
                    <ul>
                    { apiData && apiData.length > 0 ? apiData.map((item) => (
                        <>
                           <li>
                               <div className="biz-fav-sidebar-box">
                                        <div className="sidebar-fav-img" style={{backgroundImage:"url("+STORAGE_URL + '/images/' + item?.feature_image+")"}}></div>
                                        <div>
                                             <h4  style={{fontSize:"16px", color:"#ff5f13"}}>{item?.service_name || item?.package_name || 'no data'}</h4>
                                             <h5  style={{fontSize:"14px", color:"#8f8e8e"}}>{item?.vendor_name}</h5>
                                             <p   style={{fontSize:"14px", color:"#8f8e8e"}}><EnvironmentOutlined /> {item?.location_city || 'no data'}</p>
                                             { (item?.last_booked_on) ?  
                                                <>
                                                    <p   style={{fontSize:"12px", color:"#000"}}>Last booked on: <span   style={{fontSize:"12px", color:"#8f8e8e"}}>{item?.booking_date || 'no data'} at {item?.booking_start_time || 'no data'}</span></p>
                                                </>
                                                : 
                                                <>
                                                    <p style={{fontSize:"10px", color:"#8f8e8e"}}>Not Booked previously</p>
                                                </>
                                            }
                                            <span className="engine-button" style={{display:"inline-block",fontSize:"10px", background:"#ff5f13", padding:"4px 10px", margin:"5px 0px"}} onClick={() => { handleButtonClick(item.location_id, item?.service_id, item?.package_id) }}> Book Now</span>
                                        </div>                                  
                               </div>
                           </li>
                        </>
                    )) : <>
                          <li style={{textAlign:"center", fontSize:"20px"}}>No item</li>
                    </>}
                       
                    </ul>
                    </> : <>
                    
                    <div style={{ textAlign: "center",flex:'1',maxWidth:"100%", padding: "60px" }}>
                                <Spin tip="Loading" size="large">
                                    <div className="content" />
                                </Spin>
                            </div>
                    </>}
            </div>
        </Fragment>
    )
}

export default UserFavourites;
