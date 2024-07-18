import styled from '@emotion/styled';
import { Typography, Modal } from 'antd';

export const ConfirmModal = styled(({ screen, ...other }) => (<Modal {...other} />))`
    .ant-modal-content {
        width: 100%;
        height: 250px;
        background: #F2F1F0;
    }
`;

export const CustomText = styled(Typography.Text) `
    color: #000;
    font-size: 16px;
    font-weight: 400;
`;

export const CustomGreyText = styled(Typography.Text) `
    color: #72959A;
    font-size: 16px;
    font-weight: 600;
`;

export const CustomTitleText = styled(Typography.Text) `
    color: #2C2C2C;  // Black 
    font-size: 20px;
    font-weight: 700;
    margin: 8px 0;
`;

export const StyledText = styled(Typography.Text) `
    color: #000;
    font-size: 16px;
    font-weight: 600;
    margin: 8px 0;
`;

export const StyledGreyText = styled(Typography.Text) `
    color: #72959A;
    font-size: 16px;
    font-weight: 600;
    margin: 8px 0;
`;
