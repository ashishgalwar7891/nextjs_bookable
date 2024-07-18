import { Fragment, useState } from "react";
import { Col, Row, Form, Input, Select, TimePicker, Spin } from 'antd';
import { countries, cities } from '@/lib/constants';
import { CustomButton, CustomTitle } from "@/components/vendor/styledComponent";
import { CustVendFormTxt, CustomVendorFormRow } from "@/components/vendor-details/styledComponent";
import { CustomForm } from "@/components/vendor/location/addLocation/styledComponent";
import { BgGreyButton, CustomCol, RegisterButton } from "@/styles/styledComponent";
import { addUserLocationServices } from "@/Services/userService.services";
import { useEffect } from "react";
import profileLogo from '../../../../assets/imgs/icon/profile.svg';
import Image from "next/image";
import { GET_USER_PROFILE } from "@/Services/frontend";

const UserProfile = () => {

    const [loading, set_loading] = useState(true);
    const [profile_data, set_profile_data] = useState(null);

    const GET_PROFILE_DATA_API_CALL = async () => {
        const FORM_DATA = new FormData();
        FORM_DATA.append('user_id', localStorage.getItem('userId'));
        const result = await GET_USER_PROFILE(FORM_DATA);
        if (result.data.status) {
            set_profile_data(result.data.user_data);
            set_loading(false)
        }
    }

    useEffect(() => {
        GET_PROFILE_DATA_API_CALL();
    }, []);

    console.log('profile_data', profile_data);
    return (
        <Fragment>
            <Row style={{ width: '100%' }}>
                <Col span={24} style={{ padding: '0 10px' }}>
                    <Row style={{ fontSize: '18px', fontWeight: 400, color: '#72959A', gap: '10px', marginBottom: "30px" }}>
                        <Col>
                            <Image src={profileLogo} />
                        </Col>
                        <Col>
                            My profile
                        </Col>
                    </Row>
                    {loading ? <>
                        <div style={{ textAlign: "center", flex: '1', maxWidth: "100%", padding: "60px" }}>
                            <Spin tip="Loading" size="large">
                                <div className="content" />
                            </Spin>
                        </div>
                    </> : <>
                        <p className="user-heading">{profile_data.name}</p><br></br>
                        {/* Phone */}
                        <p className="small-title">Phone</p>
                        <p className="medium-title">+65 {profile_data.phone}</p><br></br>
                        {/* EMail */}
                        <p className="small-title">Email</p>
                        <p className="medium-title">{profile_data.email}</p>
                    </>}

                </Col>
            </Row>
        </Fragment>
    )
}

export default UserProfile;