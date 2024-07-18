import styled from '@emotion/styled';
import {Col, Layout, Typography, Row } from 'antd';


const { Header, Content } = Layout;

export const HeadRow = styled(Row)`
    display:flex;
    flex-direction:column;
    width:100%;
    align-items:center;
    align-content:space-between;
    justify-content:center;
    .Nav{
        justify-content:flex-end;
    }
`;

export const CustomHeader = styled(Header)`

// height:100px !important;
width:100% !important;
position:sticky;
z-index:9999;
width:100%;
padding: 0 0px;
top: 0;
left: 0;
.BurgerMenu{
    display: none;
}

.menuButton{
   display:flex;
   justify
}
.Nav{
    display:flex;
    justify-content: flex-end;
}
.LogoMark{
    display :none;
}
.MobileNav{
    display:none;
    // line-height: 100%;
}
@media only screen and (max-width: 1075px) {
    padding:15px;
}
@media only screen and (max-width: 576px) {
    .Logo{
        width:70% !important;
        height: auto;
    }
    .HeadRow{
        // margin:0px -18px; 
        // width: 110% !important;
        justify-content:center;
        align-items:center;

       }

       .LogoMark{
        height: 50px !important;
        width: auto !important;
    }
}

// @media only screen and (max-width: 768px) {
    
// }  


 @media only screen and (max-width: 1075px) {
    .LogoMark{
        width:30px;
        height: auto;
        display:inline;
    }
    // .LogoMark{
    //     height: 50px !important;
    // }

    .menuButton{
       display: none;
    }

    .Logo{
        display :none;
    }
    .BurgerMenu{
        display:inline;
    }
    
    .MobileNav{
        display:inline;
        line-height: 100%;
    }
}  


@media only screen and (max-width: 1075px) {
    
    .Nav{
        justify-content: flex-end;
    }
    .NavLinks{
        display: none;
     } 
}  
`;

export const StyledCol = styled(Col)`
.ant-layout-header {
    line-height: 0;
}
`;

export const StyledMenuTitle = styled(Typography.Text)`
    font-size: 16px;
    font-weight: 700
`;

export const StyledSideBarText = styled(Typography.Text)`
    font-size: 16px;
    font-weight: 400;
    color: #72959A;
    cursor: pointer;
    margin: 10px 10px; 
    `;



