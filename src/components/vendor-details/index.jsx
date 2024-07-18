"use client"
import { useState, createContext, useEffect } from 'react';
import { Checkbox, Form, Input, Typography, Row, Col, Radio } from 'antd';
import { CustomVendorAuthContent, PersonaCol, PersonaformCol, CustomPersonalRow } from '../vendor-auth/styledComponent';
import { CustomVendorFormCol } from './styledComponent'
import BusinessDetailsForm from "./BusinessForm";
import PersonalDetailsForm from "./PersonalForm";
import PlanDetailsForm from "./Plan";
import DocumentsForm from "./documentForm";
import { GetPageStatusVendorService } from '@/Services/vendorForms.services';
import { useCart } from '../Layout';

export const FormContext = createContext();

const VendorDetails = () => {
    const {setCartRefresh} = useCart();
    const [radioValue, setRadioValue] = useState(true);
    const [selectedRadio, setSelectedRadio] = useState();
    const [userEmail, setUserEmail] = useState();
    const [radioCheck, setRadioCheck] = useState({
        radio1: false,
        radio2: false,
        radio3: false,
        radio4: false,
    });

    useEffect(() => {
        let encryptedUserId = localStorage.getItem('userId')
        updateRadio(localStorage.getItem('redirect'))
        setSelectedRadio(localStorage.getItem('redirect'))
       // checkPageStatus(encryptedUserId)
        setCartRefresh(true);
    }, [selectedRadio, userEmail]);

    const checkPageStatus = async (userId) => {
        const response = await GetPageStatusVendorService(userId);
        if (response.response.status === 200) {
            const currentPage = response?.response?.data?.next_step;
            const userEmail = response?.response?.data?.user_email;
            setSelectedRadio(currentPage);
            setUserEmail(userEmail);
        }
    };

    const updateRadio = (selectedRadio) => {
        if (selectedRadio == 'personal-info') {
        }
        else if (selectedRadio == 'business-info') {
            setRadioCheck(prevState => ({
                ...prevState,
                radio1: true,
            }));
        }
        else if (selectedRadio == 'select-plan') {
            setRadioCheck(prevState => ({
                ...prevState,
                radio1: true,
                radio2: true,
            }));
        }
        else if (selectedRadio == 'docsInfo') {
            setRadioCheck(prevState => ({
                ...prevState,
                radio1: true,
                radio2: true,
                radio3: true,
            }));
        }
    }

    return (
        <>
            <div style={{ padding: "40px 0px" }}>
                <div className='biz-container'>
                    <div className='biz-row'>
                        <div className='biz-col-3'>
                            <div style={{ border: '1px solid #F2F1F0', borderRadius: '5px' }}>

                                <Radio.Group value={radioValue}
                                    style={{ display: 'flex', flexDirection: 'column', padding: '8px' }}
                                >
                                    <Radio value={radioCheck?.radio1} >Personal information</Radio>
                                </Radio.Group>

                                <Radio.Group value={radioValue}
                                    style={{ display: 'flex', flexDirection: 'column', padding: '8px' }}
                                >
                                    <Radio value={radioCheck?.radio2} disabled={(radioCheck?.radio2 || selectedRadio == 'business-info') ? false : true} >Business information</Radio>
                                </Radio.Group>

                                <Radio.Group value={radioValue}
                                    style={{ display: 'flex', flexDirection: 'column', padding: '8px' }}
                                >
                                    <Radio value={radioCheck?.radio3} disabled={(radioCheck?.radio3 || selectedRadio == 'select-plan') ? false : true} >Choose a plan</Radio>
                                </Radio.Group>

                                <Radio.Group value={radioValue}
                                    style={{ display: 'flex', flexDirection: 'column', padding: '8px' }}
                                >
                                    <Radio value={radioCheck?.radio4} disabled={!radioCheck?.radio4} >Documents</Radio>
                                </Radio.Group>
                            </div>
                        </div>
                        <div className='biz-col-9'>
                            {selectedRadio === 'personal-info' && <div><PersonalDetailsForm setSelectedRadio={setSelectedRadio} /></div>}
                            {selectedRadio === 'add-info' && <div><PersonalDetailsForm setSelectedRadio={setSelectedRadio} /></div>}
                            {selectedRadio === 'business-info' && <div><BusinessDetailsForm setSelectedRadio={setSelectedRadio} userEmail={userEmail} /></div>}
                            {selectedRadio === 'select-plan' && <div><PlanDetailsForm  setSelectedRadio={setSelectedRadio} /></div>}
                            {selectedRadio === 'docsInfo' && <div><DocumentsForm  setSelectedRadio={setSelectedRadio}  /></div>}
                        </div>
                    </div>
                </div>
            </div>
            {/* <FormContext.Provider value={{ setSelectedRadio }} >
            <Row>
                <CustomVendorFormCol >
                    <CustomVendorAuthContent>
                        <CustomPersonalRow>
                            <PersonaCol span={6} style={{ padding:'5rem 2rem 0 6rem' }}>
                               
                            </PersonaCol>

                            <PersonaformCol span={18}>
                               
                            </PersonaformCol>
                        </CustomPersonalRow>
                    </CustomVendorAuthContent>
                </CustomVendorFormCol>
            </Row>
        </FormContext.Provider> */}
        </>
    )
}

export default VendorDetails;