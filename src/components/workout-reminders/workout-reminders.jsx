import React, { useState } from 'react';
import { Checkbox } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CustomSelect from '../antd/custom-inputs/custom-select';
import { DAYS_OF_WEEK } from './days-of-week';
import { selectWorkoutReminders, selectTrainingDays } from '../../redux/user/user.selectors';

const WorkoutReminders = ({workoutReminders, trainingDays = {}, setProfileSettings, userId}) => {
    const [isChecked, setIsChecked] = useState(workoutReminders);
    const onChange = (e) => {
        setIsChecked(e.target.checked);
        if(e.target.checked) setProfileSettings(userId, {workoutReminders: true})
        else setProfileSettings(userId, {workoutReminders: false, trainingDays: {}})
    };
    return (
        <div>
            <label>Workout reminders: </label>
            <Checkbox checked={isChecked} onChange={onChange} />
            {isChecked ? <CustomSelect allowClear={true} style={{width: 480, marginBottom: 15, marginLeft: 15}}  
                    placeholder={"Select training days"} mode={"multiple"} options={DAYS_OF_WEEK}
                    defaultValue={Object.keys(trainingDays).map(d => DAYS_OF_WEEK.find(day => day.props.value === parseInt(d)).text)}
                    onChange={(day, days) => setProfileSettings(userId, 
                        {trainingDays: days.reduce((acc, d) => {acc[d.value] = true; return acc}, {})})} />
            : <></>}
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    workoutReminders: selectWorkoutReminders,
    trainingDays: selectTrainingDays
})

export default connect(mapStateToProps)(WorkoutReminders);