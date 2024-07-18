import styled from '@emotion/styled';
import { Typography, Row, Col, Card, Tag } from 'antd';

export const CustomRow = styled(Row)``;

export const CustomCol = styled(Col)``;

export const CustomCard = styled(Card)`
.ant-card-body {
    padding: 0;
}
`;
export const VendorCol = styled(Col)`
    gap:20px;
    @media screen and (max-width: 601px) {
        flex-direction:column;
        margin-left:0px !important;
        gap:10px;
    }   
`;

export const CustomTag = styled.span`
    font-size: 12px;
    font-style: normal;
    // font-weight: 400;
    line-height: 160%;
    color: #2C2C2C;
    padding: .1rem .2rem;
    // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);    
    background: #F7F6F5;
    margin: 1%;
    border: .2px #ccc6c6 solid;
    border-radius:5px;
    @media screen and (max-width: 601px) {
        font-size: .6rem;
    }
`;

export const StyledBoldText = styled(Typography.Text) `
    font-size: 18px;
    font-weight: 600;
    color: #2C2C2C;
    @media screen and (max-width: 601px) {
        font-size: .9rem;
    }
`;

export const StyledText = styled(Typography.Text) `
    font-size: 14px;
    font-weight: 600;
    color: #2C2C2C;
    width:100%;
    @media screen and (max-width: 601px) {
        font-size: .8rem;
    }
`;

export const CustomText = styled(Typography.Text) `
    font-size: 12px;
    font-weight: 400;
    color: #2C2C2C;
    display: block;
    margin: 5px 0
`;

export const CustomGeryText = styled(Typography.Text) `
    font-size: 12px;
    font-weight: 400;
    color: #7B7B7B;
    margin: 5px 0
`;

export const CardButton = styled(Typography.Text) `
    background: transparent;
    color: #fff;
    border: 1px solid #F2F1F0;
    border-radius: 5px;
`;

export const PackagesTag = styled(Tag) `
    position: absolute;
    left: 0.5rem;
    top: 0.5rem;
    color: #F2F1F0;
    background: #ED510C;
    border: 1px solid #F2F1F0;
    border-radius: 27px;
    font-weight: 40;
    font-size: 12px;
`;

export const FeaturedTag = styled(Tag) `
    position: absolute;
    left: 5px;
    top: 5px;
    color: #ED510C;
    background: #F7F6F5;
    border: 1px solid #ED510C;
    border-radius: 27px;
    font-weight: 600;
    font-size: 14px;
`;

export const AppointmentTag = styled(Tag) `
    margin-left: 8px;
    border-radius: 27px;
    background-color: #4E39B7;
    color: #F2F1F0;
`;

export const BeastSellerTag = styled(Tag) `
    position: absolute;
    left: 5px;
    top: 5px;
    color: #F2F1F0;
    background: #ED510C;
    border: 1px solid #F2F1F0;
    border-radius: 27px;
    font-weight: 400;
    font-size: 12px;
`;

export const OrgNumText = styled(Typography.Text) `
    color: #ED510C;
    font-size: 12px;
    font-weight: 600;
`;