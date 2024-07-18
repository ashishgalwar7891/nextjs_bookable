import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Row, Col, Typography, Input, Button } from 'antd';

export const CustomRow = styled(Row)``;

export const CustomCol = styled(Col)`
`;

export const StyledText = styled(Typography.Text)`
    font-weight: 400;
    font-size: 16px;
    color: #F2F1F0;
    line-height: 200%;
`;

export const StyledfooterText = styled(Typography.Text)`
    font-weight: 400;
    font-size: 16px;
    color: #F2F1F0;
    line-height: 200%;
`;

export const StyledBoldText = styled(Typography.Text)`
    font-weight: 700;
    font-size: 16px;
    color: #F2F1F0;
    line-height: 200%;
`;

export const CustomHr = styled.hr`
  border: none;
  border-top: 1px solid #7B7B7B;
  margin: 20px 0;
  opacity: 0.2
`;

export const CustomInput = styled(Input)`
`;

export const CustomUserButton = styled(Button)`
    &:hover { 
        color: #F2F1F0 !important;
        border:none
    }
    color: #F2F1F0;
    font-size: 1rem;
    font-weight: 600;
    background-color: #EA8933;
    height: 33px;
    border:none;
`;

export const MainCol = styled(Col)`
    .copyright{
        gap:2rem;
    }
    @media only screen and (max-width: 576px) {
        .logo{
            width:90%;
        }
        .copyright{
            flex-direction: column;
            align-items: start;
            gap: 0rem;
        }
        .styledText{
            font-size:10px;
        }

        .MailchimpSubscribe input{
            margin-bottom: 10px;
        }
    }

    // @media only screen and (max-width: 768px) {
        
    // }  


    // @media only screen and (max-width: 992px) {
            
    // }  


    //  @media only screen and (min-width: 1200px) {
            
    // }  
`;
