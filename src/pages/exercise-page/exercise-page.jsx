import React, { useState } from 'react';

import { InfoCircleOutlined, LeftOutlined } from '@ant-design/icons'

import CustomTabs from '../../components/antd/custom-tabs/custom-tabs';

const ExercisePage = (props) => {
    const [activeKey, setActiveKey] = useState("workload");
    const { exercise } = props;

    const tabOne = {content: <h1 ></h1>,
                    props: {key: "workload"}}
    const tabTwo = {content: <h1>{exercise.description ? exercise.description.replace(/<\/?[^>]+(>|$)/g, "") : ""}</h1>,
                    props: {key: "info"}}
    console.log(activeKey)
    return (
        <>
            <h1>{activeKey === "info" ? <LeftOutlined onClick={() => setActiveKey("workload")} /> : <></>} 
                <span style={{margin: '0 20px'}}>{exercise.name}</span>
                {activeKey === "workload" ? <InfoCircleOutlined onClick={() => setActiveKey("info")} /> : <></>}
            </h1>
            <CustomTabs tabBarStyle={{display: 'none'}} tabPanes={[tabOne, tabTwo]} activeKey={activeKey} />
        </>
    )
}

export default ExercisePage;