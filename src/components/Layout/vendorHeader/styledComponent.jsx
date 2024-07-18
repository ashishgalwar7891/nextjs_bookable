import styled from '@emotion/styled';
import {Layout } from 'antd';


const { Header, Content } = Layout;

export const CustomHeader = styled(Header)`

height:64px !important;
position:sticky;
z-index:9999;
max-width:1200px;
padding: 0;
margin: 0 auto;
top: 0;
left: 0;
`;