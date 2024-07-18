import styled from '@emotion/styled';
import { Col, Button, Row, Typography, Table, Input } from 'antd';

export const CustomVendorRow = styled(Row)``;

// ============ Calender Styled CSS
export const CustomRow = styled(Row)``;

export const CustomCol = styled(Col)`
    border-radius: 5px !important;
    background: #F7F6F5;
    color: white;
    margin: 20px 0px !important;
    cursor: pointer;
    display: block;
    padding: 20px;
    paddingTop: 0px;
    // width: 100%;
    flex-grow:3;
    // max-width: 750px !important;
    display:flex;
    flex-direction:column;
    justify-content:center;
    max-width: 60% !important; 
    @media (max-width: 920px) {
        max-width: 100% !important; 
    }
`;

export const SelectedCol = styled(Col)`
    // width: 25rem;
    height: auto;
    background-color: #F2F1F0;
    margin: 20px 0px;
    flex-grow:1;
    border-radius: 5px !important;

    @media (max-width: 920px) {
        max-width: 100% !important; 
        width: 100% !important;
    }
`;

export const SloteRow = styled(Row)`
    @media (max-width: 920px) {
        flex-direction: column;
    }
`;

export const ServiceRow = styled(Row)`
height:auto;
overflow:hidden;
    @media (max-width: 1075px) {
        flex-direction: column;
        max-width: 100%;
    }
`;

export const ServicCol = styled(Col)`
padding:10px 20px;
    @media (max-width: 1075px) {
        flex-direction: column;
        max-width: 100% !important;
    }
`;

export const Servic1Col = styled(Col)`
    @media (max-width: 1075px) {
        flex-direction: column;
        max-width: 100% !important;
        display: none;
    }
`;

export const CalenText = styled(Typography.Text) `
    color: #000;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 130%;
    text-align: center !important;
    margin: 20px 0px;
    display: flex;
    justify-content: center;
`;
export const CardTitalText = styled(Typography.Text) `
    color: #000;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    // line-height: 130%;
    // text-align: center !important;
    // margin: 20px 0px;
    display: flex;
    // justify-content: center;
`;
export const SmallText = styled(Typography.Text)`
    font-size: 14px;
    font-weight: 400;
    color:#72959A;
    // line-height: 18px;
    // color : #F2F1F0;
    // margin: 3px 0;
`;


export const ButtonText = styled(Typography.Text) `
    border-radius: 5px;
    border: 1px solid #72959A;
    background: #FFF;
    padding: 1px 20px;
    color: #2C2C2C;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 170%;
    letter-spacing: 0.4px;
    align-items: center;
    display: flex;
`;

export const SpanText = styled(Typography.Text) `
    border-radius: 11px;
    border: 1px solid #7B7B7B;
    /* background: #EA8933; */
    color: #2C2C2C;
    font-size: 16px;
    font-weight: 400;
    line-height: 170%;
    padding: 13px 20px;
`;

export const StyledTitle = styled(Typography.Text)`
    font-size: 28px;
    font-weight: 700;
    color: #F2F1F0;
    margin: 4px 0;
`;

export const StyledText = styled(Typography.Text)`
    font-size: 16px;
    font-weight: 700;
    line-height: 18px;
    color : #F2F1F0;
    margin: 3px 0;
`;


export const StyledOrgTitle = styled(Typography.Text)`
    font-size: 18px;
    font-weight: 600;
    line-height: 23px;
    color: #ED510C;
    margin: 3px 0;
`;

export const StyledLocText = styled(Typography.Text)`
    font-size: 16px;
    font-weight: 400;
    line-height: 27px;
    letter-spacing: 0.025em;
    color : #F2F1F0;
    margin: 3px 0;
`;

export const StyledFeatureText = styled(Typography.Text)`
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: #ED510C;
    margin:4px; 
`;

export const CustomText = styled(Typography.Text)`
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color : #F2F1F0;
    margin: 3px 0;
`;

export const StyledTextNew = styled(Typography.Text)`
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    color : #F2F1F0;
    margin: 3px 0;
`;

export const StyledPriceText = styled(Typography.Text)`
    font-size: 20px;
    font-weight: 700;
    line-height: 22px;
    color: #ED510C;
    margin: 3px 0;
`;

export const StyledListText = styled(Typography.Text)`
font-size: 12px;
font-weight: 400;
line-height: 16px;
`;

export const CustomTitleText = styled(Typography.Text)`
    font-size: 20px;
    font-weight: 700;
    line-height: 22px;
    color: #7B7B7B;
    margin-bottom: 20px;
`;

export const StyledDateCol = styled(Col)`
width: 180px;
margin-top: 8px;
border: 1px solid #72959A;
background:  #FFFFFF;
border-radius: 5px;
padding:  5px;
font-weight: 400;
color: #72959A
`;