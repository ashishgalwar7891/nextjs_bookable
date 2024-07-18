import styled from '@emotion/styled';
import { Col, Button, Row, Typography, Table, Radio, Form } from 'antd';

export const CustomVendorRow = styled(Row)``;

export const CustomRow = styled(Row)`
    border-radius: 5px;
    border: 1px solid var(--logo-grey, #72959A);
    background: var(--gradient-1, linear-gradient(180deg, #4E39B7 0%, #322477 100%));
    padding: 30px;
`;

export const CustomBoldText = styled(Typography.Text)`
    color: var(--purple-4, #D7B8FF);
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 111.1%; 
`;

export const CusText = styled(Typography.Text)`
    color: var(--purple-4, #D7B8FF);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 170%; 
    letter-spacing: 0.4px;
    display: block;
    margin: 20px 0px;
`;

export const CustomBoxText = styled(Typography.Text)`
    margin: 20px;
    @media (max-width: 576px) {
        display: contents;
      }
`;

export const SpanText = styled(Typography.Text)`
    color: var(--orange-bright, #ED510C);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 170%; 
    letter-spacing: 0.4px;
`;

export const CustomTitle = styled(Typography.Title)`
    color: var(--purple-4, #D7B8FF) !important;
    font-size: 24px !important;
    font-style: normal !important;
    font-weight: 600 !important;
    line-height: 111.1% !important; 
    text-transform: capitalize !important;
    
`;

export const CustomButton = styled(Button)`
    border-radius: 5px;
    background: #EA8933;
    padding: 10px 16px;
    color: var(--gray-100, #FFF);
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    // line-height: 111.1%;
    text-transform: capitalize;
    border: none;
    display: flex;
    align-items: center;
    height: 42px;
    @media (max-width: 576px) {
        font-size: 15px;
        width: 100%;
        text-align: center;
        display: flex;
        justify-content: center;
    }
    &:hover{
        color: #fff !important;
    }
`;
