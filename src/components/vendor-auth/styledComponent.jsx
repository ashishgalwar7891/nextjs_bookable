import styled from '@emotion/styled';
import { Row, Col } from 'antd';

export const CustomVendorAuthCol = styled(Col)`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    @media (max-width: 768px) {
        padding-left: 70px;
        padding-right: 70px;
    }

    @media (max-width: 470px) {
        padding-left: 27px;
        padding-right: 27px;
    }
`;

export const CustomVendorAuthContent = styled(Col)`
    max-width: 100%;
    @media (max-width: 768px) {
        flex: initial;
    }
    @media (max-width: 991px) {
        flex: initial;
    }
`;

export const PersonaformCol = styled(Col)`
    @media (max-width: 991px) {
        max-width: 100% !important;
    }
`;

export const CustomPersonalRow = styled(Row)`
    @media (max-width: 991px) {
        display: Block;
    }
`;

export const PersonaCol = styled(Col)`
    @media (max-width: 991px) {
        max-width: 100%;
        padding: 30px !important;
    }
`;