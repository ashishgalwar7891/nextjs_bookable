import styled from '@emotion/styled';
import { Typography, Row, Col } from 'antd';
import { Button } from 'antd/es/radio';

export const BoxCol = styled(Col)`
    font-size: 14px;
    font-style: normal;
    border-radius: 3px;
    font-weight: 400;
    line-height: 125%;
    color: #2C2C2C;
    padding: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background: #F7F6F5;
`;

export const CardCol = styled(Col)`
    border-radius: 5px;
    height:100%;
    border: 1px solid #72959A;
    background: var(--purple-dark, #F7F6F5);
    color: white;
    // margin: 5px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap:5px;
    align-items:
    padding: 0;
    max-width: 100%;
    @media (max-width: 700px) {
        flex-direction: column-reverse;
        max-width: 100% !important;
    }
`;

export const ImgCol = styled(Col)`
    max-width: 30%;
    @media (max-width: 768px) {
        max-width: fit-content !important;
    }
`;
