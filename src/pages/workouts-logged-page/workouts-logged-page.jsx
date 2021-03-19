import React from 'react';
import moment from 'moment';

import CustomCalendar from '../../components/antd/custom-calendar/custom-calendar';

import './workouts-logged.css';

const WorkoutsLoggedPage = ({workouts, history}) => {
    const fullscreen = window.innerWidth < 500 ? false : true;
    const getWorkoutData = (value) => {
        return workouts.filter(w => value.isSame(moment(w.date).format('YYYY-MM-DD')));
      }
    const cellRender = (date) => {
        const workouts = getWorkoutData(moment(date.format('YYYY-MM-DD')))
        return (
            workouts.length ? 
                <div onClick={() => history.push(`/user/workout/${workouts[0].id}`)} className="ant-picker-cell-inner ant-picker-calendar-date">
                    <div className="ant-picker-calendar-date-value workout-logged">{date.date()}</div>
                    <div className="ant-picker-calendar-date-content">
                        {workouts.map(w => <span className="cal-time-elapsed" key={w.id}>{w.timeElapsed}</span>)}
                    </div>
                </div>
                :
                <div className="ant-picker-cell-inner ant-picker-calendar-date">
                    <div className="ant-picker-calendar-date-value">{date.date()}</div>
                </div>
        )
    }
    return (
        <div className="workouts-logged-container">
            <h1>Very beautiful list of WorkoutsLogged</h1>
            <CustomCalendar dateFullCellRender={cellRender} className="workouts-logged-calendar" fullscreen={fullscreen} />
        </div>
    );
};

export default WorkoutsLoggedPage;