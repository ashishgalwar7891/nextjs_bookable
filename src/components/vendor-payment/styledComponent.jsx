import styled from '@emotion/styled';
import { Col, Button, Row, Typography, Table, Input } from 'antd';

export const CustomVendorCol = styled(Col)`
padding: 50px 3rem;
height:100vh;
width:100%;
@media (max-width: 576px) {
    padding: 50px 1rem;
}
`;

export const ContentRow = styled(Row)`
    display:flex;
    width: 100%;
    justify-content:center;
    gap:20px;
// max-width:'1024px';
@media (max-width: 992px) {
    flex-direction: column;
}
`;
export const BbCol = styled(Col)`
    width:50%;
    height: 100%;
    padding:1rem;
    // border: 1px solid #72959A;
    border-radius: 5px;
    box-shadow:rgb(204, 204, 204) 0px 0px 5px 0px;
    @media (max-width: 992px) {
        width:100%;
    }`;
export const StrCol = styled(Col)`
width:40%;
    #payment-form{
        padding:1rem;
    }
@media (max-width: 992px) {
    width:100%;
}`;
export const CustomVendorRow = styled(Row)``;

export const CustomCol = styled(Col)``;

export const CustomPayCol = styled(Col)`
background-color: #72959A;
height: 8vh;
width: 100%;
color: white; 
display: flex; 
justify-content: space-between; 
align-items: center;
// border-radius: 0 
border-radius: 5px 5px 0 0 ;  
`;

export const CustomPayGreyRow = styled(Row)`
    background-color:#4E39B7;
    height: auto; 
    width: 100%;  
    display: flex; 
    gap:1rem;
    padding:2rem 0;
    justify-content: space-between; 
    align-items: center; 
    border-radius: 0 0 5px 5px;
    color:#dbdbdb !important;
    
`;

export const CustomPayBoldCol = styled(Col)`
    width:100%;
    display: flex;
    justify-content: space-between; 
    align-items: center;  
`;

export const CustomExtraSmText = styled(Typography.Text)`
    color: #2C2C2C;
    font-weight: 400;
    font-size: 12px;
    padding-left: 5px;
`;
export const CustomText = styled(Typography.Text)`
    color: #2C2C2C;
    font-weight: 400;
    font-size: 16px;
`;

export const CustomBoldText = styled(Typography.Text)`
    color: #2C2C2C;
    font-weight: 600;
    font-size: 16px;
    @media (max-width: 576px) {
        // font-size:13px !important;
        max-width:150px;
    }
`;

export const CustomInput = styled(Input)`
    margin: 10px 0;
`;

export const StyledHr = styled.hr`
    border: none;
    border-top: 1px solid #333;
    margin: 20px 0;
    opacity: 0.2
`;

export const CartCol = styled(Col)`
    @media (max-width: 940px) {
        margin-top: 0px !important;
    }
`;