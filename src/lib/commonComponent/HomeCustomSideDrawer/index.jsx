import styled from '@emotion/styled';
import { Button, Drawer, Space } from "antd";

const CustomSideDrawer = styled(Image)`
    .ant-drawer-content-wrapper {
        height: fit-content;
    }
`;


<CustomSideDrawer 
    style={{paddingTop:'70px'}}
    title={ `Review ${reviewData?.service_name || 'no data'}` }
    placement="right"
    size={'large'}
    onClose={onClose}
    open={open}
>
    Heellooooo
</CustomSideDrawer>
