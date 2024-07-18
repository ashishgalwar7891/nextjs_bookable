import Image from 'next/image';
import styled from '@emotion/styled';
import { Col, Button, Row, Input, Typography, Table, Radio, Form } from 'antd';

export const CustomVendorRow = styled(Row)``;

export const CustomRow = styled(Row)`
    // background: var(--gradient-1, linear-gradient(180deg, #4E39B7 0%, #322477 100%));
    display: flex;
    max-width:1500px;
    margin: 0 auto;
    flex-wrap: nowrap;
    // max-height: 80vh;
    // height: 100% !important;
    @media only screen and (max-width: 1600px) {
        max-width: 1240px;
    }
    @media only screen and (max-width: 1400px) {
        max-width:1024px;
    }
    @media only screen and (max-width: 1200px) {
        padding: 0px 20px 0px 20px;
    }
    @media only screen and (max-width: 768px) {
        padding: 0px 10px 0px 10px;
    }
    @media only screen and (max-width: 576px) {

    }
`;

export const CustomTextCol = styled(Col)`
    width: 100%;
    position: relative;
    @media only screen and (max-width: 1600px) {
        width:612px;
    }
     @media only screen and (max-width: 1400px) {
        width:500px;
    }
    @media only screen and (max-width: 1200px) {
        width:478px;
    }
    @media only screen and (max-width:1075px) {
        width:70%;
        margin: 0 auto;
    }
    @media only screen and (max-width:576px) {
        width:80%;
        margin: 0 auto;
    }
    @media only screen and (max-width:500px) {
        width:100% !important;
        // maxWidth:478px;
        margin: 0 auto;
    }
`;

export const CustomText1Col = styled(Col)`
    width: 100%;
    position: relative;
    img{
        max-width:100%;
    }
    @media only screen and (max-width: 1075px) {
        display: none;
    }
`;

export const BackgroundImage = styled(Image)`
    width: 100%;
    height: 100vh;
    position: absolute;
    right: 0px;
    width: auto;
    max-width: 710px;
    @media only screen and (max-width: 991px) {
        display: none;
    }
`;

export const CustomBoldText = styled(Typography.Text)`
    color: #fff;
    font-size: 48px;
    font-style: normal;
    font-weight: 700;
    line-height: 111.1%;
    @media only screen and (max-width: 1600px) {
        font-size: 40px;
    }
     @media only screen and (max-width: 1400px) {
        font-size: 36px;
    }
    @media only screen and (max-width: 1200px) {
        font-size: 33px;
    }
      @media only screen and (max-width: 768px) {
        font-size: 30px;
    }
    @media only screen and (max-width: 576px) {
        font-size: 24px;
    }
`;

export const CusText = styled(Typography.Text)`
    color: #FFF;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%;
    display: flex;
    width: 80%;
    height: 80px;
    cursor: pointer;
    padding: 5px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 1px solid #fff;
    background: transparent;
    
    @media only screen and (max-width: 1600px) {
        font-size: 10px;
        width: 69px;
        height: 63px;
    }
   
    @media only screen and (max-width: 768px) {
        font-size: 9px;
        width: 60px;
        height: 60px;
        &img{
            width: 24px;
        }
    }
    @media only screen and (max-width: 576px) {
        font-size: 8px;
        width: 54px;
        height: 54px;
        img{
            width: 20px;
        }
    }
`;

export const CustomBoxText = styled(Typography.Text)`
    display: flex;
    // justify-content: space-between;
    margin-top: 39px;
    gap: 20px;
    @media only screen and (max-width: 1400px) {
        
        gap: 5px;
    }
    @media only screen and (max-width: 576px) {
        gap:7px;
    }
`;

export const SpanText = styled(Typography.Text)`
    color:#fff;
    font-size: 48px;
    font-style: normal;
    font-weight: 700;
    line-height: 111.1%;
    @media only screen and (max-width: 768px) {
        font-size: 30px;
    }
    @media only screen and (max-width: 576px) {
        font-size: 24px;
    }
`;

export const CustomInput = styled(Input)`
    width: -webkit-fill-available;
    border: none; 
    padding: 9px;
    height: 100%;
    border-radius:9px;
    border-color:#fffff;
    .SerarchInputs:hover{
        border:none;
        border-color:#fffff;
    };
    .SerarchInputs:focus{
        border:none;
        border-color:#fffff;
    };
    @media only screen and (max-width: 576px) {
        width:100%;
        margin-left:0 !important;
    }
`;

export const SearchCol = styled(Col)`
    width: auto ;
    height: 200px;
    display:flex;
    width: fix-content;
    margin-top: 30px;
    @media only screen and (max-width: 576px) {
        height: auto !important; 
    } 

`;
export const ResultRow = styled(Row)`
@media only screen and (max-width: 576px) {
  //  height: auto !important; 
    top: 17.5rem;
} 

`;

export const CustomUserButton = styled(Button)`
width:auto;
background:'#ED510C;
border:"none;
borderRadius: 20px;
height:100%;
zIndex:1000;

`;

export const CustomTitle = styled(Typography.Title)`
    @media only screen and (max-width: 576px) {
        display: flex;
        flex-direction: column-reverse;
        margin-top: 0px;
    }
`;

export const CustomButton = styled(Button)`
`;
