import { Col, Dropdown, Menu, Row, Table } from "antd";
import { Fragment, useState } from "react";
import styled from '@emotion/styled';

export const CustomVendorTable = styled(Table)`
border-radius: 5px;
width: 100%;
.ant-table-thead > tr > .ant-table-cell {
    background-color: #E0E0E0;
    padding: 8px 16px !important;
}
.ant-table-tbody {
    background-color: #E0E0E0 !important;
}
.ant-table-tbody>tr>td {
    padding: 8px 16px !important;
}
`;

const CustomTable = ({data, columns}) => {

    return (
        <Fragment>
                <Col span={24}>
                    <CustomVendorTable 
                        dataSource={data} 
                        columns={columns} 
                        pagination={true}
                        style={{ width:'100%'}}
                        size="middle"
                    />
                </Col>
        </Fragment>
    )
}

export default CustomTable;