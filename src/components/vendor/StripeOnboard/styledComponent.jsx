import styled from '@emotion/styled';
import { Col, Button, Row, Typography, Table, Radio } from 'antd';

export const CustomVendorFormCol = styled(Col)`
    height: 100vh;
    width: 100%;
`;

export const CustomVendorCol = styled(Col)`
    padding: 70px 0px 0px 40px;
    @media (max-width: 991px) {
        padding: 30px !important;
        padding-top: 0px !important;
    }
`;

export const CustomVendorFormRow = styled(Row)`
    display: flex;
    justify-content: space-between;
    @media (max-width: 576px) {
        display: block;
    }
`;

export const CustVendFormTxt = styled(Typography.Text)`
    color: #2C2C2C;
    font-weight: 400;
    font-size: 14px;

    :where(.css-dev-only-do-not-override-1vr7spz).ant-col-7 {
        flex: 100%;
        max-width: 100% !important;
    }
`;


export const CustCamIconTxt = styled(Typography.Text)`
    color: #000000;
    font-weight: 400;
    font-size: 12px;
`;

export const CustVendFormHeadTitle = styled('h3')`
font-size:24px;
font-weight:700;
`;

export const CustVendFormTitle = styled(Typography.Text)`
font-weight: 600;
font-size: 16px;
color: #2C2C2C;
padding: 8px 0
`;

export const CustVendFormBtnRow = styled(Row)`
    float: right;
`;

export const CustVendFormButton = styled(Button)`
&:hover { 
    color: #ED510C !important;
}
border: none;
color: #ED510C;
font-weight:700;
`;

export const CustomUploadButton = styled(Button)`
&:hover { 
    color: #2C2C2C !important;
}
font-size:16px;
color: #2C2C2C;
font-weight:600;
margin: 10px 0;
`;

export const CustomIconCol = styled(Col)`
    margi-top: 10px;
    margin-bottom: 6px;
    border: 1px solid #F2F1F0;
    height: 80px;
    width: 80px;
    display: flex;
    justify-content:  center;
    align-items: center
`;

// Plans 

export const CustomTabCol = styled(Col)`
    padding: 80px 100px 0px 40px;
    @media (max-width: 576px) {
            padding: 0px 35px 0px 40px;
        }
`;

export const FormCol = styled(Col)`
    @media (max-width: 768px) {
        :where(.css-dev-only-do-not-override-1vr7spz).ant-col-12 {
            flex: 100%;
            max-width: 100% !important;
        }
    }
`;

export const StyledTable = styled(Table)`
padding-bottom: 5vh;
.ant-table-thead > tr > .ant-table-cell {
    font-size:18px;
    font-weight:600;
    &.starter {
    background-color: #72959A;
    color: white;
    }

    &.premium {
    background-color: #450303;
    color: white;
    }

    &.professional {
    background-color: #4E39B7;
    color: white;
    }

    &.features {
    background-color: #E0E0E0;
    color: black;
    }
}

@media (max-width: 654px) {
    :where(.css-dev-only-do-not-override-1m62vyb).ant-table-wrapper table{
        table-layout: auto;
        overflow: scroll;
        display: table-caption;
        width: 350px;
    }
}

@media (max-width: 425px) {
    :where(.css-dev-only-do-not-override-1m62vyb).ant-table-wrapper table{
        table-layout: auto;
        overflow: scroll;
        display: table-caption;
        width: 275px;
    }
}

`;



export const CustomTabText = styled('h4')`
    font-size: 20px;
    font-weight: 700;
    color: #ED510C;
`;

export const CustomTabBlackText = styled('h5')`
    float: right;
    font-size: 18px;
    font-weight: 600;
    color: #2C2C2C;
`;

export const CustomTabRowButton = styled(Button)`
    &:hover { 
        background-color: #E0E0E0 !important;
        color: black !important;
        border: 1px solid black !important;
    }
    float:right;
    border:1px solid #2C2C2C;
    width: 95px;
    color: #2C2C2C;
    font-size:16px;
    font-weight: 600;
    height: 32px;
    background-color: #E0E0E0;
    margin-top: 4px;
`;

export const StyledRadio = styled(Radio)``;