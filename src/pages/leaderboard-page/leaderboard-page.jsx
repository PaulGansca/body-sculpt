import React, { useState } from 'react';
import { Row, Col, Typography } from 'antd';
import moment from 'moment';

import CustomTable from '../../components/antd/custom-table/custom-table';
import CustomSelect from '../../components/antd/custom-inputs/custom-select';
import columns from './columns';
import CustomResult from '../../components/antd/custom-result/custom-result';
import { getExerciseInfo } from '../../api/wger';

import './leaderboard.css';

const { Title } = Typography;

const LeaderboardPage = ({users, location}) => {
    const [selectedOption, setSelectedOption] = useState(false);
    const [exerciseCategory, setExerciseCategory] = useState("");
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const exercises = users.reduce((acc, user) => {
        Object.keys(user.records).forEach(exerciseId => {
            if(!acc[exerciseId]) acc[exerciseId] = user.records[exerciseId].name
        })
        return acc;
    }, {});
    const options = Object.keys(exercises).map(exerciseId => ({
        props: {value: exerciseId, key: exerciseId},
        text: exercises[exerciseId]
    }));

    //badge position
    return (
        <div className="leaderboard-page">
            <Row>
                <Col className="leaderboard-panel" xs={{ offset: 1, span: 22 }} md={{offset: 2, span: 20}} lg={{offset: 4, span: 16}}>
                    <Typography>
                        <Title level={2}>Leaderboard for {moment().startOf('week').format("MMM Do")} - {moment().endOf('week').format("MMM Do")} </Title>
                    </Typography>
                    {options.length ? <><Typography style={{ textAlign: 'left' }}>
                        <Title level={5}>Showing records on: <CustomSelect style={{width: 300, marginBottom: 10, marginLeft: 10}} placeholder={"Select Exercise"}
                        options={options} onSelect={async (id) => {setExerciseCategory((await getExerciseInfo(id)).category.name); setSelectedOption(id)}} /></Title>
                    </Typography>
                    <CustomTable
                        columns={selectedOption ? columns(selectedOption, searchText, searchedColumn,
                            setSearchText, setSearchedColumn, exerciseCategory) : []}
                        rowKey={user => user.userId}
                        dataSource={selectedOption ? users.filter(u => u.records[selectedOption])
                                .sort((a, b) => b.records[selectedOption].max - a.records[selectedOption].max) : []
                        }
                    /></> : <CustomResult status="warning" title="At the moment there are no entries for this week." />}
                </Col>
            </Row>
        </div> 
    )
}

export default LeaderboardPage;