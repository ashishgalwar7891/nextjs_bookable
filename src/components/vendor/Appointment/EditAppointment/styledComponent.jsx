import styled from '@emotion/styled';
import { Col, Button, Row, Typography, Form } from 'antd';

export const CustomVendorRow = styled(Row)`
    @media (max-width: 768px) {
        flex-direction: column;
    }

    @media (max-width: 700px) {
        display: block !important;
    }
`;

export const RedioRow = styled(Row)`
    @media (max-width: 768px) {
        flex-flow: column;
    }
`;

export const CustomCol = styled(Col)`
    @media (max-width: 768px) {
        flex-direction: column;
        max-width: 100% !important;
    }

    @media (max-width: 576px) {
        display: block !important;
    }

    @media (max-width: 575px) {
        display: flex !important;
        flex-flow: row wrap;
        gap: 10px;
    }
`;

export const CustomBoldText = styled(Typography.Text)`
    color: #2C2C2C;
    font-weight: 600;
    font-size: 16px;
`;

export const StyledRow = styled(Row)`
    border: 1px solid #F2F1F0;
    border-radius: 2px;

    @media (max-width: 768px) {
        flex-direction: column;
    }

    @media (max-width: 768px) {
        gap: 0px;
        background: transparent !important;
        padding: 0px !important;
        border: 0px;
    }
`;

export const BoxRow = styled(Row)`
    @media (max-width: 1032px) {
        flex-direction: column;
    }

    @media (max-width: 991px) {
        display: block;
    }
`;

export const BoxCol = styled(Col)`
    @media (max-width: 991px) {
        max-width: 100% !important;
        margin-bottom: 20px !important;
        height: auto !important;
    }
`;

export const CustomText = styled(Typography.Text)`
    color: #2C2C2C;
    font-weight: 700;
    font-size: 20px;
`;

export const CustomSmText = styled(Typography.Text)`
    color: #2C2C2C;
    font-weight: 600;
    font-size: 14px;
`;

export const StyledText = styled(Typography.Text)`
    color: #ED510C;
    font-weight: 400;
    font-size: 14px;
`;

export const StyledTitleText = styled(Typography.Text)`
    color: #2C2C2C;
    font-weight: 400;
    font-size: 16px;
    text-decoration: underline;
`;

export const CustomForm = styled(Form)``;

export const CustomButton = styled(Button)`
    &:hover { 
        background-color: #565656 !important;
        color: #F2F1F0 !important;
        border:none
    }
    width: 140px;
    color: #F2F1F0;
    font-size: 16px;
    font-weight: 600;
    background-color: #2C2C2C;
    height: 33px;
    border-radius: 5px;
`;

export const CustomCardButton = styled(Button)`
    &:hover { 
        background-color: #72959A; !important;
        color: #F2F1F0 !important;
        border:none
    }
    width: 100%;
    color: #F2F1F0;
    background-color: #72959A;
    border-radius: 5px;
`;