import { Row, Col, Image, Avatar } from 'antd';
import { useState, useEffect, useContext } from 'react';
import { PostVendorPaymentDetails } from '@/Services/payment.service';
import { StyledHr } from '@/components/vendor-payment/styledComponent';
import { CustomButton, CustomCol, CustomColumn, CustomDetailsText, CustomHeading, CustomMedText, 
    CustomRow, CustomSmText, CustomText, CustomTitle } from '../styledComponent';
import { useSearchParams, useRouter} from 'next/navigation';
import { AuthContext } from "@/app/layout";


const SubscriptionSetup = (props) => {
    
    const searchParams = useSearchParams()
    const status = searchParams.get('redirect_status');
    const clientSecret = searchParams.get('setup_intent_client_secret');
    const paymentIntent = searchParams.get('setup_intent');
    const [apiData, setApiData] = useState();


    useEffect(() => {  
        (async() => {
            const userId = localStorage.getItem('userId')
          //  const token = localStorage.getItem('token')

            let data = {
                user_id: userId,
                redirect_status:status,
                intent_id: paymentIntent,
            }

            const res = handlePaymentSuccess(data);

        })();
    }, []);

    const handlePaymentSuccess = async (data) => {
        const result = await PostVendorPaymentDetails(data);
        console.log("Out ==>>   ", result);
        const detailsData = result?.response?.data;
        console.log("Response details ==>>", detailsData);
        setApiData(detailsData);

    };

    return(
        <>
            <Row style={{ margin: '20px' }}>
                <CustomColumn span={24} style={{ borderRadius: '5px', border: '1px solid #72959A', background: '#F2F1F0'}} >
                    <CustomTitle>My Account  information</CustomTitle>
                    <CustomHeading>{apiData?.persInfo?.name}</CustomHeading>
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
                        <CustomButton >Edit</CustomButton>
                    </Row>
                    <br></br>
                </CustomColumn>

                <CustomColumn span={24} style={{ borderRadius: '5px', border: '1px solid #72959A', background: '#F2F1F0'}}>
                    <CustomTitle>My Plan  information</CustomTitle>
                        <CustomRow style={{ display:'flex', alignItems:'center'}}>
                            <Col style={{ textAlign: 'center' }}> <Avatar size={60} src={apiData?.businessInfo?.image?.url} alt="Image Not Found" /> </Col>
                            <CustomHeading style={{ paddingLeft:'15px' }} >{apiData?.businessInfo?.title}</CustomHeading>
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
                        <CustomMedText>{`${apiData?.businessInfo?.address}, ${apiData?.businessInfo?.city} ${apiData?.businessInfo?.postal_code}, ${apiData?.businessInfo?.country}` || 'Not Found' }</CustomMedText>
                    </Col>

                    <Row>
                        <CustomButton>Edit</CustomButton>
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
                            <CustomDetailsText>{apiData?.plansInfo?.plan_name || 'Not Found'}</CustomDetailsText>
                        </CustomCol>
                    </CustomRow>

                </CustomColumn>
            </Row>
        </>
    )
}


export default SubscriptionSetup