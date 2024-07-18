import Image from 'next/image';
import styled from '@emotion/styled';
import { Button, Col, Row, Tag, Typography, Checkbox } from 'antd';

export const CustomRow = styled(Row)``;

export const CustomCol = styled(Col)``;

export const BackgroundImage = styled(Image)`
    width: 100%;
    height: 100vh;
    object-fit: cover;
`;

export const SubmitButton = styled(Button)`
    &:hover { background-color: #565656 !important; }
    width: 100%;
    color: #F2F1F0;
    font-size: 1rem;
    font-weight: 600;
    background-color: #2C2C2C;
    height: 45px;
    margin-top: 0.2rem;
`;

export const RegisterButton = styled(Button)`
    &:hover { 
        background-color: #ED510C; !important;
        color: #F2F1F0 !important;
        border:none
    }
    width: 100%;
    color: #F2F1F0;
    font-size: 1rem;
    font-weight: 600;
    background-color: #EA8933;
    height: 45px;
`;
export const ButtonSmall = styled(Button)`
    &:hover { 
        background-color: #565656; !important;
        color: #F2F1F0 !important;
        border:none
    }
    width: 100%;
    color: #F2F1F0;
    font-weight: 400;
    background-color: #2C2C2C;
    // height: 45px;
    padding: 6px 12px !important;
    font-size:12px !important;
    border:none
`;

export const RegisterFormButton = styled(Button)`
    &:hover { 
        background-color: #2C2C2C; !important;
        color: #F2F1F0 !important;
        border:none
    }
    border:1px solid #2C2C2C;
    width: 100%;
    color: #2C2C2C;
    font-size: 1rem;
    font-weight: 600;
    height: 45px;
    margin: 1.5rem 0;
`;

export const LoginFormButton = styled(Button)`
    &:hover { 
        background-color: #ED510C; !important;
        color: #F2F1F0 !important;
        border:none
    }
    border:none
    background-color: #F2F1F0; 
    width: 100%;
    color: #ED510C;
    font-size: 1rem;
    font-weight: 600;
    height: 45px;
    margin: 1.5rem 0;
`;

export const PageRow = styled(Row)``;

export const PageCol = styled(Col)``;

export const BgGreyButton = styled(Button)`
    &:hover { 
        background-color: #F2F1F0; !important;
        color: #ED510C !important;
        border:none
    }
    width: 100%;
    color: #ED510C;
    font-size: 1rem;
    font-weight: 600;
    background-color: #F2F1F0;
    height: 45px;
`;

// *****************  STYLES CREATED BY ANKUR  ************
export const CustomCheckbox = styled(Checkbox)`
    .ant-checkbox-checked  .ant-checkbox-inner {
        background:#EA8933;
        border:#EA8933;
    }
    .ant-checkbox-checked:hover .ant-checkbox-inner:hover{
        background:#EA8933 !important;
        border:#EA8933 !important;
    }
    
    .ant-checkbox-checked:after { 
        border: none !important;
    }
`;
export const H1 = styled(Typography.Text)`
    color: #000;
    font-size:48px;
    font-weight:700;
`;
export const H2 = styled(Typography.Text)`
    font-size:24px;
    font-weight:500;
`;
export const H2Bold = styled(Typography.Text)`
    font-size:32px;
    font-weight:700;
`;
export const H3 = styled(Typography.Text)`
    color: #000;
    font-size:24px;
    font-weight:600;
`;
export const H4 = styled(Typography.Text)`
    color: #000;
    font-size:24px;
    font-weight:700;
`;
export const H5 = styled(Typography.Text)`
    color: #000;
    font-size:18px;
    font-weight:600;
`;
export const BodyBold = styled(Typography.Text)`
    color: #000;
    font-size:16px;
    font-weight:700;
`;
export const BodyDemi = styled(Typography.Text)`
    color: #000;
    font-size:16px;
    font-weight:600;
`;
export const BodyReg = styled(Typography.Text)`
    color: #000;
    font-size:16px;
    font-weight:400;
`;
export const BodySmallReg = styled(Typography.Text)`
    color: #000;
    font-size:14px;
    font-weight:400;
`;
export const BodySmallBold = styled(Typography.Text)`
    color: #000;
    font-size:14px;
    font-weight:600;
`;
export const BodyTiny = styled(Typography.Text)`
    color: #000;
    font-size:12px;
    font-weight:400;
`;

export const BodyTextBold = styled(Typography.Text)`
    color: #000;
    font-size:12px;
    font-weight:600;
`;

export const BodyTinyBold = styled(Typography.Text)`
    color: #000;
    font-size:14px;
    font-weight:600;
`;
export const BodyMicro = styled(Typography.Text)`
    color: #000;
    font-size:11px;
    font-weight:600;
`;
export const BodyMicroBold = styled(Typography.Text)`
    color: #000;
    font-size:11px;
    font-weight:600;
`;
export const TitleBold = styled(Typography.Text)`
    color: #000;
    font-size:20px;
    font-weight:700;
`;
// COLORS

export const OrangeBright = styled(Typography.Text)`
color: #ED510C;
`;
export const OrgPriceCardTxt = styled(Typography.Text)`
    color: #ED510C;
    font-weight: 700;
    font-size: 18px;
`;

export const TitleBoldGrey = styled(Typography.Text)`
    color: #7B7B7B;
    font-size:20px;
    font-weight:700;
`;

export const AmtGreyCardTxt = styled(Typography.Text)`
    color: #7B7B7B;
    font-size:12px;
    font-weight:400;
    text-decoration: line-through;
`;

// All Tags 
export const DiscountTag = styled(Tag)`
    font-size:12px;
    font-weight:500;
    padding: 0 4px;
    background: #FFCBB5;
    color: #ED510C;
    heigth: 1px;
    line-height: 15px;
    border:none;
    border-radius: 3px;
`;

export const TableTag = styled(Tag)`
height: 22px;
width: auto;
background: #72959A;
color: #F2F1F0;
border-radius: 3px;
margin: 0 2px;
padding: 0 5px'
`;

