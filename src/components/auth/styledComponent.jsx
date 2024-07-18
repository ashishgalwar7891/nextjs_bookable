import styled from '@emotion/styled';
import { Row, Col, Typography, Form, Button } from 'antd';



export const CustomAuthRow = styled(Row)`
    margin-left:9%;
    display:flex;
    gap:1%;
    justify-content: center;
    @media only screen and (max-width: 992px) {
        margin-left:5%;
        margin: 5%;
     }  
`;

export const CustomAuthCol = styled(Col)`
    min-height:100vh;
    width: 30%;
    background-size: cover;
    background-position: center;
    z-index:1000;
    @media only screen and (max-width: 992px) {
        width:auto !important;
        align-items: center;
    } 
`;

export const CustomSliderCol = styled(Col)`
    max-height: 100vh;
    width: 100%;
    background-image: url(${props => props?.image?.src});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;display:block;
    `;
export const CustomTypography = styled(Typography.Text)`
    color: #72959A;
    font-weight: 600;
    font-size: 0.8rem;
    text-align: center;
    display: flex;
    justify-content: center;
    height: 52px;
    padding: 8px 0;
    text-align: center;
`;

export const CustomHeadTitle = styled('h3')`
    font-size: 1.5rem;
    font-weight: 700;
    color:#2C2C2C;
    line-height: 26.66px;
`;

export const CustomTypographyText = styled(Typography.Text)`
    color: #2C2C2C;
`;

export const CustomCheckText = styled(Typography.Text)`
    color: rgba(0, 0, 0, 0.6);
`;

export const CustomPasswordText = styled(Typography.Text)`
    font-weight: 400;
    font-size: 16px;
`;

export const CustomAgreText = styled(Typography.Text)`
    font-size: 12px;
    font-weight: 400;
    color: #72959A;
    display: flex;
    justify-content: center;
    // height: 52px;
    padding: 8px 0;
    text-align: center;
`;
export const CustomText = styled(Typography.Text)`
    font-size: 14px;
    font-weight: 600;
    color: #72959A;
    display: flex;
    justify-content: center;
    height: 52px;
    padding: 8px 0;
    text-align: center;
`;

export const CustomContentCol = styled(Col)`
    padding: 5rem 0 ;
`;

export const CustomHomeForm = styled(Form)`
    @media (max-width: 991px) {
        max-width: 100%;
        width: 100% !important;
    }
`;

export const SliderCol = styled(Col)`
    width:65%;
    position: relative;
    right:0;
    height:100vh;
    overflow:hidden;
    
    // @media only screen and (max-width: 576px) { }

    @media only screen and (max-width: 768px) { }  


    @media only screen and (max-width: 992px) {
        display:none;
   
     }  


    //  @media only screen and (min-width: 1200px) { }  
`;