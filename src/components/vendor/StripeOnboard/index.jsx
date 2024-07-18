"use client"
import { useRouter } from 'next/navigation';
import { CustomVendorAuthContent, PersonaCol, PersonaformCol, CustomPersonalRow, CustVendFormHeadTitle } from '../StripeOnboard/styledComponent';
import { CustomVendorFormCol, CustomVendorCol, CustVendFormTitle, CustVendFormBtnRow, CustVendFormButton } from './styledComponent'
import { CustomButton, CustomCol, CustomColumn, 
    CustomDetailsText, CustomHeading, CustomMedText, 
    CustomRow, CustomSmText, CustomText, CustomTitle } from '../styledComponent';
import { RegisterButton, SubmitButton } from "@/styles/styledComponent";
import { GetStripeAccountDetailsnURL } from '@/Services/vendorForms.services';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/app/layout';
import Link from 'next/link';
import moment from 'moment';

const StripeOnboard = () => {
    const router = useRouter();
    const [ userId, setUserId ] = useState();
    const [ apiData, setApiData ] = useState({});
    const { paidPlans, setPaidPlans } = useContext(AuthContext);


    useEffect(() => {
        let encryptedUserId = localStorage.getItem('userId')
      //  checkPageStatus(encryptedUserId)
        getStripeAccountDetailsnURL(encryptedUserId)
        setUserId(encryptedUserId)
    }, []);

    const getStripeAccountDetailsnURL = async (id) => {
        const response = await GetStripeAccountDetailsnURL(id);
        console.log("response 11 ==>>", response);
        if (response?.response?.status === 200) {
            const data = response?.response?.data?.success;
            console.log("Data -->>", data);
            setApiData(data)
        }
    }
    const openStripeUrl = () => {

        let url = apiData?.stripeURLresponse?.url;
        localStorage.clear();
        window.location = url;
    }
    
     let expireTime = apiData?.stripeURLresponse?.expires_at;
     expireTime = moment.unix(expireTime);
     expireTime = moment(expireTime).format('LTS');
    
  
    return(
        <>
      
      <CustomVendorCol span={24} >
                    
                    <CustVendFormHeadTitle>Payment gateway onboarding set up</CustVendFormHeadTitle><br/>

                    <CustVendFormTitle>Please review the below information regarding Stripe Connect Account details </CustVendFormTitle>

                    <CustomRow> 
                    <CustVendFormTitle>Click on the below URL to set up your Stripe Payment Gateway Account to receive payments</CustVendFormTitle>
                    </CustomRow>

                    <CustomRow>

                        <CustomCol style={{marginRight:'20px'}}> 

                            <CustomSmText>Stripe Onboard URL</CustomSmText> <br></br>
                            <CustomDetailsText>

                            <span onClick={() => openStripeUrl()} style={{cursor:"pointer"}}> Stripe URL </span>

                            </CustomDetailsText>

                        </CustomCol>

                    </CustomRow>

              <CustomRow>

               <CustomCol style={{marginRight:'20px'}}> 

               <CustomSmText>This URL will expire at </CustomSmText> <br></br>
                 
                   <CustomDetailsText>

                          {expireTime}

                   </CustomDetailsText>

                </CustomCol>

              </CustomRow>


    
             </CustomVendorCol>


   



        </>
    )
}

export default StripeOnboard;