import styled from '@emotion/styled';
import {Layout } from 'antd';


const { Header, Content } = Layout;

export const CustomHeader = styled(Header)`
background-color:#2c2c2c !important;
height: 62px !important;
position:sticky;
z-index:9999;
width:100%;
padding: 0;
top: 0;
left: 0;
`;