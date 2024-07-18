import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Checkbox, Row, Col } from 'antd';

const CustomPopconfirm = ({ showDayExcludeDate, setShowDayExcludeDate, dayExcludeDate, rowData, selectedTimeSlot, selctedlocId, tempExSlot, setSelectedArr, testing, selectedArr }) => {
    const [checkedCheckBox, setCheckedCheckbox] = useState({});
    // console.log("pop dayExcludeDate ==>>", dayExcludeDate, testing, selctedlocId);

    useEffect( () => {
        setCheckedCheckbox(testing)
    }, [])

    // function isObjectEmpty(obj) {
    //     return Object.keys(obj).length === 0 && obj.constructor === Object;
    // }

    const handleCheckboxChange = (date, index, value) => {
        
        if (!value) {
            console.log("value is ==", value);

            selectedArr.forEach(item => {
                const innerData = item[selctedlocId];
                if (innerData && innerData[date]) {
                    innerData[date] = innerData[date].filter(entry => entry.key !== selectedTimeSlot.key);
                }
            });
        }

        setCheckedCheckbox(
            (prevStatus) => {
                const updatedStatus = { ...prevStatus };
                if (updatedStatus[selctedlocId] && updatedStatus[selctedlocId][date]) {
                    delete updatedStatus[selctedlocId][date]; 
                    // if (isObjectEmpty(updatedStatus?.[selctedlocId])) {
                    //     delete updatedStatus?.[selctedlocId];
                    // }

                } else {
                    updatedStatus[selctedlocId] = {
                        ...updatedStatus[selctedlocId],
                        [date]: [selectedTimeSlot]
                    }
                }
                return updatedStatus;
            }
        );
    };

    const handleConfirm = () => {
        setSelectedArr((p)=>{
            let data = [...p]
            const result = data.concat(checkedCheckBox);
            
            let filteredData = result && result.filter(item => {
                if (item?.[selctedlocId]) {
                    const keys = Object.keys(item?.[selctedlocId]);
                    return keys.some(key => item?.[selctedlocId]?.[key].length > 0);
                } else {
                    return item
                }
            });
            return filteredData
        })
        setShowDayExcludeDate(false);
    };

    const handleCancel = () => {
        setShowDayExcludeDate(false);
    };

    return (
        <Popconfirm
        open={showDayExcludeDate}
        description={
            <div style={{ width:'250px' }}>
                <Row>
                    <Col>Offline <span style={{ color:'#EA8933', fontWeight: 600, marginRight:'4px' }} >{selectedTimeSlot?.startTime} - {selectedTimeSlot?.endTime}</span>
                        slots for <br/> {rowData?.day}s
                    </Col>
                </Row>
                <hr style={{ margin :'5px 0', color:'#F2F1F0' }} />
                {dayExcludeDate.map((item, index) => (
                    <Checkbox
                        key={index}
                        checked={checkedCheckBox?.[selctedlocId]?.[item]}
                        // checked={isCheckBoxChecked}
                        onChange={(e) => handleCheckboxChange(item, index, e.target.checked)}
                    >
                    {item.slice(0,6)}
                    </Checkbox>
                ))}
            </div>
        }   
            icon={null}
            okText= 'Apply'
            okButtonProps={{ 
                disabled: !checkedCheckBox.hasOwnProperty(selctedlocId.toString()), 
                style: { backgroundColor:'transparent', color:'#000', border:'1px solid #000', fontWeight:600, marginRight:'20px' } 
            }}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            // onOpenChange={() => console.log('open change')}
        >
        {/* <Button type="primary">Open Popconfirm with Checkboxes</Button> */}
        </Popconfirm>
    );
};

export default CustomPopconfirm;
