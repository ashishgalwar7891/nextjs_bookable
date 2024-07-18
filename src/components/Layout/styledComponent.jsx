import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Drawer, Layout, Spin, Col } from 'antd';
// import { routes } from '../../routes';
const { Header, Content, Sider } = Layout;

export const CustomHeader = styled(Header)`
  padding: 0;
`;

export const CustomSideBar = styled(Drawer)`
    .ant-drawer-body {
    padding: 58px 0 0 0 !important;
}
`;

export const CustomContent = styled(({ screen, ...other }) => (
  <Content {...other} />
))`
`;


export const CustomSidebar = styled(Col)`


    z-index: 1000;
    background: #2c2c2c;
    // position:fixed;
    height: 100vh;
    width: 17rem ;
    // min-width:17rem;
    display:flex;
    // flex: 17rem ;
    // max-width: 17rem ;
    // min-width: 17rem !important;
    justify-content: space-between;
    transition: width .2s, height 2s, transform .2s;
    @media only screen and (max-width: 992px) {
      //  width:2px !important;
      // left: -260px;
      width:0rem;
      position: absolute !important;
      }
    
    @media only screen and (max-width: 768px) {
      // width: 0px !important ;
      // position: relative !important;
    } 
  
  
  // .ant-layout-sider-children {
  //   // display: flex;
  //   // flex-direction: row;
  //   justify-content: space-between;
  //   width: 100%;
  //   // height:100vh;
  //   background: #2c2c2c;
  //   // background: gray; 
  // }
`;

export const SecondHeader = styled(Col)`
    z-index: 9000;
    border-bottom: .5px solid #CDCDCD;
    width: 100%;
    height: 3rem;
    display:flex;
    align-items:center;
    background: #72959A;

`;

export const MenuCollapse = styled(Col)`
  z-index:9999;
  // position: absolute !important;
  // right: -2rem;
  // background: #ED510C;
  // background: #2c2c2c;
  height: 3rem;
  width:3rem;
  min-width:3rem;
  display:flex;
  justify-content:center;
  align-items:center;
  border-radius:0 50% 50% 0;
  @media only screen and (max-width: 992px) {
    // left: 0 ;
    // position: absolute !important;
    z-index:999;
  } 
`;

