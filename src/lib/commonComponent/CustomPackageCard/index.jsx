
import { Fragment } from "react";
import { Button, Checkbox, Col, Row, Select, Grid, Card, Space } from 'antd';
import { getImageUrl } from '../../../utils/commonMethods';
import { CustomCol, CustomRow } from "@/styles/styledComponent";
import { BoxCol, ImgCol, CardCol } from "../CustomPackageCard/styledComponent";
import Image from "next/image";
import { STORAGE_URL } from "@/Services/vendorService.services";

const PackageCard = ({ PackageData, locationId, packagesIdCount, setPackagesIdCount}) => {
    // console.log("PackageData, locationId, packagesIdCount, setPackagesIdCount ==>>", PackageData, locationId, packagesIdCount, setPackagesIdCount);
    const handleCheckboxChange = (locationId, service_id, count, checked) => {
        setPackagesIdCount(prevState => {
            const updatedCount = prevState[locationId] ? [...prevState[locationId]] : [];
            const existingServiceIndex = updatedCount.findIndex(item => item.service_id === service_id);
                if (checked) {
                    if (existingServiceIndex !== -1) {
                    updatedCount[existingServiceIndex].count = count;
                    } else {
                    updatedCount.push({ service_id, count });
                    }
                } else {
                    if (existingServiceIndex !== -1) {
                    updatedCount.splice(existingServiceIndex, 1);
                    }
                }
                
                return { ...prevState, [locationId]: updatedCount };
        });
    };
    
return (
        <Fragment>
                <CustomRow style={{ width: '100%', height:'300px', display:'flex', alignItems:'flex-start'}}>
                    <CardCol span={24}>
                    <ImgCol style={{maxWidth:'100%', height:'150px', overflow:'hidden'}}>
                            <img style={{ width: '100%', height: '-webkit-fill-available', objectFit: 'cover', }}
                                alt="example"
                                src={STORAGE_URL+'/images/'+PackageData?.feature_image}
                            />
                        </ImgCol>
                        <Row style={{ width: '100%', padding:'8px'}}>
                            <CustomCol hoverable style={{ width: '100%' }}>

                                <Checkbox
                                    checked={packagesIdCount?.[locationId]?.some(item => item.service_id === PackageData.service_id)}
                                    onChange={e => handleCheckboxChange(locationId, PackageData?.service_id, 1, e.target.checked)}
                                    style={{ color: '#2C2C2C', fontWeight: '600', fontSize: '15px', fontWeight: '600' }}
                                >
                                    {PackageData?.service_name}
                                </Checkbox>
                                
                                <Col style={{ width:'100%', display:'flex', flexWrap:'wrap', gap: '5px', padding: '11px 0px' }}>
                                    { PackageData?.label.split(",").slice(0, 3).map((item, index) => {
                                        return (
                                            <>
                                                <BoxCol>{item}</BoxCol>
                                            </>
                                        )
                                    })
                                    }
                                </Col>
                                <Col>
                                    <h3 style={{ color: '#2C2C2C', fontWeight: '400', fontSize: '16px', display:'flex', alignItems: 'center', justifyContent: 'space-between' }}>Count </h3>

                                    <Select
                                        style={{ width: '100%' }}
                                        onChange={value => handleCheckboxChange(locationId,  PackageData.service_id, value, true)}
                                        value={packagesIdCount?.[locationId]?.find(item => item.service_id === PackageData?.service_id)?.count || '1'}
                                        disabled={(!packagesIdCount?.[locationId]?.find(item => item.service_id === PackageData?.service_id))}
                                    >
                                        {[1, 2, 3, 4, 5].map(count => (
                                            <Select.Option key={count} value={count.toString()}>
                                            {count}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Col>
                            </CustomCol>
                        </Row>
                        
                    </CardCol>
                </CustomRow>
        </Fragment>
    )
}

export default PackageCard;
