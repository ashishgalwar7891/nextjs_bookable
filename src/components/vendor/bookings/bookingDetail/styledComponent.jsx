import styled from '@emotion/styled';
import { Button, Col, Row, Tag, Typography, Checkbox } from 'antd';

export const CustomCol = styled(Col)`
    display: flex;
    flex-direction: column;
`;

export const CustomRow = styled(Row)`
    display: flex;
    flex-direction: column;
`;

export const StyBodySmallReg = styled(Typography.Text)`
    color: #7B7B7B;
    font-size:14px;
    font-weight:400;
`;

export const StyBodySmallBold = styled(Typography.Text)`
    color: #7B7B7B;
    font-size:14px;
    font-weight:600;
`;

export const BodyOrgBold = styled(Typography.Text)`
    color: #ED510C;
    font-size:24px;
    font-weight:600;
`;