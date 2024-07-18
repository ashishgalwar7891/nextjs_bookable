import styled from '@emotion/styled';
import { Menu, Typography, Col, Drawer } from 'antd';
import Aside from 'antd/lib/layout/Sider';



export const CustomDrawer = styled(Drawer)`
  .ant-drawer-header {
    padding: 0 !important;
  }
  .ant-drawer-body {
    margin: 0 !important;
    padding: 0 !important;
}
`


export const CustomDrawerMenu = styled(Menu)`
margin: 3rem 0 0 0;
height:100%;
width: 100%;
background: #2C2C2C;
color:'#F2F1F0';
overflow-y:auto;
  .ant-menu-item {
    padding: 30px 0;
    border-radius:0px;
    padding-left: 20px !important;
    display: flex;
    gap:2%;
    align-items: center;
    // background: rgba(57, 105, 165, 0.05);
    color:#ffffff !important;
    
  }
  li:selected{
    background: #EA8933 !important;
  }
  .ant-menu-item-active{
    background: #EA8933 !important;
    color: black;
  }
  .ant-menu-item:active{
    background: #ED510C !important;
  }

  .ant-menu-inline .ant-menu-item:not(:last-child) {
    margin-bottom: 0;
  }

  @media only screen and (max-width: 576px) {
    
  }
  @media only screen and (max-width: 768px) {
    // display:none !important;
      
  } 

`;



export const SidebarHeading = styled(Typography.Paragraph)`
  margin-bottom: 0 !important;
  font-size: 15px;
  font-weight: 300;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CustomHeading = styled('h2')`
    color: #ED510C;
    font-weight: 500;
    font-size: 24px;
    padding: 8px 0;
`;


