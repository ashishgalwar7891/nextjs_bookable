import styled from '@emotion/styled';
import { Typography, Row, Col } from 'antd';
import { Button } from 'antd/es/radio';

export const CustomRow = styled(Row)``;

export const CustomCol = styled(Col)``;

export const CardButton = styled(Button) `
    background: transparent;
    color: #fff;
    border: 1px solid #F2F1F0;
    border-radius: 5px;
    margin: 5px 0 
`;

export const CustomTag = styled.span`
    font-size: .9em;
    font-style: normal;
    // font-weight: 400;
    // line-height: 160%;
    color: #2C2C2C;
    padding: 2px 3px;
    // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);    
    background: #F7F6F5;
    margin-right: 5px;
    border: .2px #ccc6c6 solid;
    border-radius:5px;
    @media screen and (max-width: 601px) {
          font-size: .5rem;
      }
`;
export const SpecialTag = styled.span`
    position:absolute;
    left:.5rem;
    top:.5rem;
    color:#ED510C;
    font-size: .7em;
    font-weight: 600;
    // font-style: normal;
    padding: 2px 6px;  
    background: #F7F6F5;
    margin-right: 5px;
    border: .2px #ED510C solid;
    border-radius:10px;
    @media screen and (max-width: 601px) {
          font-size: .5rem;
      }
`;

