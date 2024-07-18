import { CustomCol, CustomRow } from "./styledComponent";
import { Fragment } from "react";

const PageHeader = () => {

    const onFinish = async (values) => {
        console.log(values)
    };

    return (
        <Fragment>
            <CustomRow>
                <CustomCol span={24} style={{backgroug:'var(--gradient-1, linear-gradient(180deg, #4E39B7 0%, #322477 100%))' }} >
                    <h1>Header page here</h1>
                </CustomCol>
            </CustomRow>
        </Fragment>
    )
}

export default PageHeader;