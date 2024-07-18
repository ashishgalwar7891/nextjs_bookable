
import styled from '@emotion/styled';
import {Col, Row, Layout, Input, Button} from 'antd';
import Image from 'next/image';


export const CustomRow = styled(Row)`
    background: #72959A;
    height: 72px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 576px) {
        justify-content: space-around;
    }
`;
export const SearchImage = styled(Image)`
    display:none;
    @media only screen and (max-width: 576px) {
        display:block;
    }
`;
export const FilterRow = styled(Row)`
    background: #72959A;
    height: 100%;
    width:20%;
    display: none;
    color: #ffffff;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 576px) {
        justify-content: space-around;
        display: flex;
    }
`;
export const FilterImage = styled(Image)`
`;

export const RowVerticalBreak = styled(Row)`
    display: none;
    width: 0px;
    height: 100%;
    border-left: 1px solid #8ba9ae;
    @media only screen and (max-width: 576px) {
        display:block;
    }
`;

export const SearchColMobile = styled(Col)`
// display:none;
@media only screen and (max-width: 576px) {
    z-index:1000;
    width: 100%;
    // padding:.2rem;
    backgroun: red;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

// @media only screen and (max-width: 768px) {
    
// }  

`;

export const SearchCol = styled(Col)`
    width: auto ;
    height: 200px;
    display:flex;
    width: fix-content;
    @media only screen and (max-width: 576px) {
        display: none; 
    }

// @media only screen and (max-width: 768px) {
    
// }  

`;
export const CustomInput = styled(Input)`
    width: fit-content;
    border: none; 
    padding: 9px;
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

export const CustomUserButton = styled(Button)`
width:auto;
background:'#EA8933;
border:"none;
borderRadius: 20px;
height:100%;
zIndex:1000;

`;