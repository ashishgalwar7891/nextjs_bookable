import styled from '@emotion/styled';
import {Button, Layout } from 'antd';
import { Typography, Row, Col } from 'antd';

export const CustomColumn = styled(Col)`
    width: 100%;
    background-color: #F2F1F0;
    padding: 0 20px;
    margin: 8px 0;
`;
export const CustomCol = styled(Col)`
    margin-right: 20px;
`;

export const CustomTextCol = styled(Col)`
    @media (max-width: 766px) {
        font-size: 20px !important;
        justify-content: unset;
        font-style: normal;
        font-weight: 700 !important;
        line-height: 111.1%;
    }
`;

export const CustomRow = styled(Row)`
    display: flex;
    margin: 12px 0;
    @media (max-width: 700px) {
        display: block;
    }
`;

export const MainRow = styled(Row)`
    border:1px solid #72959A; 
    borderRadius:5px;
    @media (max-width: 700px) {
        border:none;
    }
`;
export const TableRow = styled(Row)`
    @media (max-width: 700px) {
        .ant-table-thead{
            display: none;
        }

        .ant-table-thead>tr{
            text-align: left !important;
            border-bottom: 1px solid #E0E0E0;
            padding: 8px 0px!important;
            margin: 0px 25px;
            // display:flex;
            flex-direction:column;
        }
        .ant-table-thead>tr>td{
            text-align: left !important;
            border-bottom: 1px solid #E0E0E0;
            padding: 8px 0px!important;
            margin: 0px 25px;
        }
        .ant-table-thead>tr>td:nth-last-child(5) {
            position: absolute;
            top: 0px;
            bottom: 0;
            right: 0;
        }

        .ant-table-row-level-0{
            display: flex;
            flex-direction: column;
            position: relative;
            // margin: 0px 26px;
        }

        .css-1nd7iaw .ant-table-tbody>tr>td{
            text-align: left !important;
            border-bottom: 1px solid #E0E0E0;
            padding: 8px 0px!important;
            margin: 0px 25px;
        }

        .css-1nd7iaw .ant-table-tbody>tr>td:nth-last-child(1) {
            position: absolute;
            top: 0px;
            bottom: 0;
            right: 0;
        }

        .css-1nd7iaw .ant-table-tbody>tr>td:nth-last-child(4) {
            position: absolute;
            top: 38px;
            bottom: 0;
            right: 0;
        }
        
        .css-1nd7iaw .ant-table-tbody>tr>td:nth-last-child(6) {
            font-weight: 700;
        }

        .css-1nd7iaw .ant-table-tbody{
            // background-color: #F2F1F0!important;
            border-radius: 10px;
            background:none !important;
            // border: 1px solid #E0E0E0;
        }

        .css-1nd7iaw .ant-table-tbody>tr>td:nth-last-child(7) {
            display: none;
        }

        .anticon[tabindex]{
            transform: rotate(92deg);
        }

        .ant-table-wrapper table{
            display: flex;
            flex-direction: column;
        }
        .ant-table-row{
            margin-bottom:10px;
            background-color: #F2F1F0!important;
            border-radius: 10px;
            border: 1px solid #E0E0E0;
        }
    }
`;

export const TablesRow = styled(Row)`
    @media (max-width: 700px) {

        .ant-table-thead{
            display: none;
        }

        .ant-table-row-level-0{
            display: flex;
            flex-direction: column;
            position: relative;
            margin:0 0 10px 0 !important;
            background-color: #F2F1F0!important;
            border-radius: 10px;
            border: 1px solid #E0E0E0;
        }

        .css-1nd7iaw .ant-table-tbody{
            // background-color: #F2F1F0!important;
            background :none !important;
            // border-radius: 10px;
            // border: 1px solid #E0E0E0;
        }

        .css-1nd7iaw .ant-table-tbody>tr>td{
            text-align: left !important;
            border-bottom: 1px solid #E0E0E0;
            padding: 8px 0px!important;
            margin: 0px 25px;
        }

        .css-1nd7iaw .ant-table-tbody>tr>td:nth-last-child(1) {
            position: absolute;
            top: 0px;
            bottom: 0;
            right: 0;
        }

        .css-1nd7iaw .ant-table-tbody>tr>td:nth-last-child(6) {
            font-weight: 700;
            padding: 15px 0px!important;
            padding-top: 23px !important;
        }

        .css-1nd7iaw .ant-table-tbody>tr>td:nth-last-child(5) {
            position: absolute;
            top: -1px;
            bottom: 0;
            left: 0;
        }

        .css-1nd7iaw .ant-table-tbody>tr>td:nth-last-child(7) {
            display: none;
        }

        .anticon[tabindex]{
            transform: rotate(92deg);
        }

        .ant-table-wrapper table{
            display: flex;
            flex-direction: column;
        }
        
    }
`;

export const ExcludRow = styled(Row)`
    @media (max-width: 700px) {
        display: block;
    }
`;

export const CustomTitle = styled('h3')`
    color: #2C2C2C;
    font-weight: 500;
    font-size: 18px;
    padding: 8px 0;
    @media (max-width: 700px) {
        padding: 20px;
        padding-left: 11px;
        font-size: 15px;
    }

    @media (max-width: 576px) {
        font-size: 20px;
        padding-left: 0px;
    }
`;

export const CustomHeading = styled('h2')`
    color: #ED510C;
    font-weight: 500;
    font-size: 16px;
    padding: 8px 0;
`;

export const CustomText = styled(Typography.Text)`
    font-weight: 400;
    font-size: 16px;
    color:#72959A;
`;

export const CustomSmText = styled(Typography.Text)`
    color: #000000;
    font-weight: 400;
    font-size: 12px;
`;

export const CustomMedText = styled(Typography.Text)`
    color: #000000;
    font-weight: 400;
    font-size: 16px;
    ma
`;

export const CustomDetailsText = styled(Typography.Text)`
    color: #ED510C;
    font-weight: 500;
    font-size: 14px;
    width:100%
`;

export const CustomButton = styled(Button)`
    &:hover { 
        background-color: #ED510C; !important;
        color: #F2F1F0 !important;
        border:none
    }
    width: 55px;
    color: #F2F1F0;
    font-size: 16px;
    font-weight: 600;
    background-color: #EA8933;
    height: 33px;
    border:none;
    border-radius: 5px;
    display:flex;
    justify-content:center;
    align-items:center;

    @media (max-width: 700px) {
        width: 100%;
        margin-top: 20px;
    }

`;
export const Custom1Button = styled(Button)`
   
`;
export const CustomRegCol = styled(Col)`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px 0px;
    height: 120px;
    background-color: #F2F1F0;
    @media (max-width: 576px) {
        height: 190px;
        display: flex;
        text-align: center;
        border-radius: 5px;
        border: 1px solid var(--logo-grey, #72959A);
        background: var(--white-dark, #F2F1F0);
    }
`;

export const CustomBlkButton = styled(Button)`
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
    margin: 12px 0;
`;

export const CustomGreyText = styled(Typography.Text)`
    color: #000000;
    font-weight: 600;
    font-size: 16px;
    color: #72959A;
    @media (max-width: 700px) {
        padding: 0px 0px;
    }
`;

export const CustomWhtButton = styled(Button)`
    &:hover { 
        background-color: #F2F1F0; !important;
        color: #ED510C !important;
        border:none
    }
    width: auto;
    color: #72959A;
    font-size: 16px;
    font-weight: 600;
    background-color: #F2F1F0;
    height: 33px;
    border-radius: 5px;
    margin: 12px 0;
`;

export const CustomBookHeadText = styled(Typography.Text)`
    color: #000000;
    font-weight: 600;
    font-size: 18px;
    width:100%
`;
export const CustomBookText = styled(Typography.Text)`
    color: #72959A;
    font-weight: 600;
    font-size: 14px;
    width:100%
`;
export const CustomTabPayText = styled(Col)`
    font-weight: 400;
    font-size: 10px;
    line-height: 13px;
`;
