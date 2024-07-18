import styled from '@emotion/styled';
import { Col, Button, Row, Typography, Table, Input } from 'antd';

export const CustomText = styled(Typography.Text) `
    color: #000;
    font-size: 12px;
    font-weight: 400;
`;

export const CustomGreyText = styled(Typography.Text) `
    color: #72959A;
    font-size: 12px;
    font-weight: 400;
`;

export const CustomTitleText = styled(Typography.Text) `
    color: #72959A;
    font-size: 16px;
    font-weight: 600;
    margin: 8px 0
`;

export const CustTitleText = styled(Typography.Text) `
    color: #000;
    font-size: 16px;
    font-weight: 600;
    margin: 8px 0
`;

export const StyledText = styled(Typography.Text) `
    color: #000;
    font-size: 16px;
    font-weight: 700;
    margin: 8px 0
`;


export const BookingRow = styled(Row)`
    @media (max-width: 768px) {
        flex-direction: row;
        wrap : nowrap
        max-width: 100%;
        margin: 31px;
        gap: 20px !important;
        height: auto !important;
    }
    .BookingImage{
       
    }

`;