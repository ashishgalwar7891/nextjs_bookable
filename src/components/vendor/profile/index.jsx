import { Row, Col, Image, Avatar, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { GetVendorDetailsService } from '@/Services/vendorProfile.services';
import { PostVendorPaymentDetails } from "@/Services/payment.service";
import { StyledHr } from '@/components/vendor-payment/styledComponent';
import { CustomButton, CustomCol, CustomColumn, 
    CustomDetailsText, CustomHeading, CustomMedText, 
    CustomRow, CustomSmText, Custom1Button, CustomText, CustomTitle } from '../styledComponent';
import { useSearchParams, useRouter} from 'next/navigation';
import VendorPaymentInfoDrawer from "../VendorPaymentInfoDrawer";
import { STORAGE_URL } from '@/Services/vendorService.services';


const VendorProfile = (props) => {

    const searchParams = useSearchParams()
    const reDirstatus = searchParams.get('redirect_status');
    const clientSecret = searchParams.get('setup_intent_client_secret');
    const paymentIntent = searchParams.get('setup_intent');
    const [apiData, setApiData] = useState();
    const [apiSubscriptionData, setApiSubscriptionData] = useState();
    const [open, setOpen] = useState(false);
    const [paymentData, setPaymentData] = useState();
    const [appointmentpayData, setAppointmentPayData] = useState();
    const [drawerFlag, setDrawerFlag] = useState();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        let data = {
          //  "token": token, 
            "user_id": userId,
            redirect_status: reDirstatus,
            intent_id: paymentIntent,
            client_secret: clientSecret,
        }
        if(reDirstatus === 'succeeded') {
            handleSubscriptionPaymentSuccess(data);
        }
    }, [])

    useEffect(() => {
        const userId = localStorage.getItem('userId')
        fetchVendorDetails(userId);
    }, [apiSubscriptionData])

    const handleSubscriptionPaymentSuccess = async (data) => {
        const result = await PostVendorPaymentDetails(data);
        const detailsData = result?.response?.data;
        setApiSubscriptionData(detailsData);
    };

    const fetchVendorDetails = async (id) => {
        try {
            setIsLoading(true);
            const response = await GetVendorDetailsService(id);
            if (response?.response?.status === 200) {
                const data = response?.response?.data?.data;
                setApiData(data);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    const onClickEdit = (type) => {
        if (type === 'business') router.push('/vendor/profile/edit/business-info');
        if (type === 'personal') router.push('/vendor/profile/edit/personal');
    }

    return(
        <>
            <Row style={{ margin: '20px' }}>
                <Spin fullscreen spinning={isLoading} />
                <VendorPaymentInfoDrawer open={open} setOpen={setOpen} paymentData={paymentData} />
                <CustomColumn span={24} style={{  borderRadius: '5px', border: '1px solid #72959A', background: '#F2F1F0'}} >
                    <CustomTitle>Personal  information</CustomTitle>
                    {
                        (apiData?.persInfo?.first_name && apiData?.persInfo?.last_name) &&
                        <CustomHeading>
                            {`${apiData?.persInfo?.first_name || 'no data' } ${apiData?.persInfo?.middle_name || '' } ${apiData?.persInfo?.last_name || 'no data' }`}
                        </CustomHeading>
                    }
                    <CustomRow>
                        <CustomCol style={{marginRight:'20px'}}> 
                            <CustomSmText>Personal Mobile number</CustomSmText> <br></br>
                            <CustomDetailsText>{apiData?.persInfo?.personal_mobile || 'Not Found' }</CustomDetailsText>
                        </CustomCol>
                        <CustomCol style={{marginRight:'20px'}}> 
                            <CustomSmText>Personal Fixed line number</CustomSmText> <br></br>
                            <CustomDetailsText>{apiData?.persInfo?.personalInfo?.personal_phone || 'Not Found'}</CustomDetailsText>
                        </CustomCol>
                        <CustomCol style={{marginRight:'20px'}}> 
                            <CustomSmText>Personal email id</CustomSmText> <br></br>
                            <CustomDetailsText>{apiData?.persInfo?.personalInfo?.personal_email || 'Not Found' }</CustomDetailsText>
                        </CustomCol>
                    </CustomRow>

                    <Row>
                        <CustomButton onClick={ () => onClickEdit("personal")}>Edit</CustomButton>
                    </Row>
                    <br></br>
                </CustomColumn>

                <CustomColumn span={24} style={{ padding:'20px ', borderRadius: '5px', border: '1px solid #72959A', background: '#F2F1F0'}}>
                    <CustomTitle>Business  information</CustomTitle>
                        <CustomRow style={{ display:'flex', alignItems:'center'}}>
                            <Col style={{ textAlign: 'center' }}> <Avatar size={60} src={ STORAGE_URL+ '/images/' + apiData?.businessInfo?.image?.filename} alt="Image Not Found" /> </Col>
                            <CustomHeading style={{ paddingLeft:'15px' }} >{apiData?.businessInfo?.business_name}</CustomHeading>
                        </CustomRow>
                        <CustomText>{apiData?.businessInfo?.description}</CustomText>

                        <CustomRow>
                            <CustomCol style={{marginRight:'20px'}} >
                                <CustomSmText>Registration UEN number</CustomSmText> <br></br>
                                <CustomDetailsText>{apiData?.businessInfo?.business_registration_number || 'Not Found' }</CustomDetailsText>
                            </CustomCol>
                            <CustomCol style={{marginRight:'20px'}} > 
                                <CustomSmText>Business contact number</CustomSmText> <br></br>
                                <CustomDetailsText>{apiData?.businessInfo?.phone || 'Not Found' }</CustomDetailsText>
                            </CustomCol>
                            <CustomCol style={{marginRight:'20px'}} >
                                <CustomSmText span={24}>Business email id</CustomSmText> <br></br>
                                <CustomDetailsText span={24}>{apiData?.businessInfo?.email || 'Not Found' }</CustomDetailsText>
                            </CustomCol>
                        </CustomRow>

                    <Col style={{margin:'15px 0'}} >
                    <CustomSmText>Address</CustomSmText> <br></br>
                        <CustomMedText>{`${apiData?.businessInfo?.address},  ${apiData?.businessInfo?.city} ${apiData?.businessInfo?.postal_code}, ${apiData?.businessInfo?.country}` || 'Not Found' }</CustomMedText>
                    </Col>

                    <Row>
                        <CustomButton onClick={ () => onClickEdit("business")}>Edit</CustomButton>
                    </Row> 

                    <StyledHr/>

                    <CustomRow>
                        <CustomCol style={{marginRight:'20px'}}> 
                            <CustomSmText>Industry</CustomSmText> <br></br>
                            <CustomDetailsText>{apiData?.businessInfo?.industry || 'Not Found'}</CustomDetailsText>
                        </CustomCol>
                        <CustomCol style={{marginRight:'20px'}}> 
                            <CustomSmText>category</CustomSmText> <br></br>
                            <CustomDetailsText>{apiData?.businessInfo?.category || 'Not Found' }</CustomDetailsText>
                        </CustomCol>
                    </CustomRow>

                    <CustomRow>
                        <CustomCol style={{marginRight:'20px'}}> 
                            <CustomSmText>Business Plan</CustomSmText> <br></br>
                            <CustomDetailsText>{apiData?.plansInfo?.plan_name || 'Not Found'}</CustomDetailsText><br></br>
                            <CustomSmText style={{color:'#212121', fontSize:'14px', fontWeight:'700'}}> {apiData?.plansInfo?.plan_name !== 'Starter' ? '$' : ''} {apiData?.plansInfo?.amount || 'Not Found'}</CustomSmText>
                        </CustomCol>

                        {/* { (apiData?.plansInfo?.plan_name != 'Professional') &&  */}

                        <CustomCol style={{marginRight:'20px'}} >
                            <CustomButton onClick={() => { router.push(
                                '/vendor/changePlan' )
                        
                        }} style={{display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', width:'100%', backgroundColor: '#2C2C2C'}}> Change Plan</CustomButton>
                    
                        </CustomCol>

                        {/*  } */}
                    </CustomRow>

                    <CustomRow style={{alignItems: 'center', alignItems: 'end'}}>
                        <CustomCol style={{marginRight:'20px'}} >
                            <CustomSmText>Validaty Untill</CustomSmText> <br></br>
                            <CustomDetailsText>{apiData?.plansInfo?.validity || 'Not Found'}</CustomDetailsText>
                        </CustomCol>
                        <CustomCol style={{marginRight:'20px'}} > 
                            <CustomSmText>Next billing date</CustomSmText> <br></br>
                            <CustomDetailsText>{apiData?.plansInfo?.validity || 'Not Found'}</CustomDetailsText>
                        </CustomCol>
                        {apiData?.plansInfo?.plan_name !== 'Starter' ? 
                        <CustomCol style={{marginRight:'20px'}} >
                            <CustomButton onClick={() => { setOpen(true); setPaymentData(apiData?.subscriptionPaymentDetails); }} style={{display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', width:'100%', backgroundColor: '#2C2C2C'}}>View Payment details</CustomButton>
                        </CustomCol>
                        : <></>}
                    </CustomRow>





                        
                    <Col style={{ width:'fit-content', borderRadius: '5px', border: '1px solid #72959A', background: '#F2F1F0', padding:'10px'}}>
                        <Col style={{fontSize:'16px', padding: '6px 10px', fontWeight:'700', borderRadius:'8px', width:'fit-content', height:'auto', backgroundColor: '#4532a3', color:'#ed510c', marginBottom:'5px'}}>Appointments <Col style={{color:'#ffffff', fontSize:'10px', fontWeight:'400'}}>{(apiData?.appointments?.status == 1) ? 'Active' : 'Inactive' || 'Not Found'}</Col></Col> 
                        <CustomSmText style={{color:'#212121', fontSize:'14px', fontWeight:'700'}}>$ {apiData?.appointments?.amount || 'Not Found'}</CustomSmText>
                        <CustomRow style={{display:'flex', alignItems: 'end'}}>
                            <CustomCol style={{marginRight:'20px'}} >
                                <CustomSmText>Validaty</CustomSmText> <br></br>
                                <CustomDetailsText>{apiData?.appointments?.validity || 'Not Found'}</CustomDetailsText>
                            </CustomCol>
                            <CustomCol style={{marginRight:'20px'}} > 
                                <CustomSmText>Next billing date</CustomSmText> <br></br>
                                <CustomDetailsText>{apiData?.appointments?.validity || 'Not Found'}</CustomDetailsText>
                            </CustomCol>
                            <CustomCol style={{marginRight:'20px'}} >
                            <CustomButton onClick={() => { setOpen(true); setPaymentData(apiData?.appointmentPaymentDetails); }} style={{display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', width:'100%', backgroundColor: '#2C2C2C'}}>View Payment details</CustomButton>
                            </CustomCol>
                        </CustomRow>
                    </Col>
                </CustomColumn>
            </Row>
        </>
    )
}

export default VendorProfile