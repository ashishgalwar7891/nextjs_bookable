import styled from '@emotion/styled';
import { Col, Button, Row, Typography, Table, Radio, Form } from 'antd';

export const CustomVendorRow = styled(Row)``;

export const CustomCol = styled(Col)`
    @media (max-width: 700px) {
        width: 100% !important;
        max-width: 100%;
    }
`;

export const CustomBoldText = styled(Typography.Text)`
    color: #2C2C2C;
    font-weight: 600;
    font-size: 16px;
`;

export const CustomForm = styled(Form)`
    @media (max-width: 700px) {
        width: 100% !important;
        padding: 0px;
    }
`;


export const CustomButton = styled(Button)`
    &:hover { 
        background-color: #565656 !important;
        color: #F2F1F0 !important;
        border:none
    }
    width: fit-content;
    color: #F2F1F0;
    font-size: 16px;
    font-weight: 600;
    background-color: #2C2C2C;
    height: 33px;
    border-radius: 5px;
`;