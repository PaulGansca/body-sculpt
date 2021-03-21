import React from 'react';
import moment from 'moment';
import { Row, Col } from 'antd';

import CustomCalendar from '../../components/antd/custom-calendar/custom-calendar';

import './workouts-logged.css';

const WorkoutsLoggedPage = ({workouts, history, trainingFrequency, setWorkout}) => {
    const getWorkoutData = (value) => {
        return workouts.filter(w => value.isSame(moment(w.date).format('YYYY-MM-DD')));
      }
    const cellRender = (date) => {
        const workouts = getWorkoutData(moment(date.format('YYYY-MM-DD')))
        return (
            workouts.length ? 
                <div onClick={() => {setWorkout(workouts[0]); history.push(`/user/workout/${workouts[0].id}`)}} className="ant-picker-cell-inner ant-picker-calendar-date">
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
    const today = moment();
    const from_date = today.day() === 0 ? moment().subtract(1, 'd').startOf('week').add(1, 'd').format("YYYY-MM-DD")
     : moment().startOf('week').add(1, 'd').format("YYYY-MM-DD");
    const to_date = today.day() === 0 ? moment().subtract(1, 'd').endOf('week').add(1, 'd').format("YYYY-MM-DD")
    : moment().endOf('week').add(1, 'd').format("YYYY-MM-DD");
    const workoutsInWeek = workouts.filter(w => moment(moment(w.date).format('YYYY-MM-DD')).isBetween(moment(from_date), moment(to_date))).length
    
    return (
        <div className="workouts-logged-container">
            <Row>
                <Col xs={{span: 22, offset: 1}} md={{span: 20, offset: 2}} lg={{span: 18, offset: 3}}>
                    <h1>Very beautiful list of WorkoutsLogged</h1>
                    <CustomCalendar dateFullCellRender={cellRender} className="workouts-logged-calendar" fullscreen={false} />
                    <h3>Sessions this week {workoutsInWeek}/{trainingFrequency} - 
                        {7 - (moment().day() === 0 ? 6 : moment().day()) >= trainingFrequency - workoutsInWeek ?
                        " You are on track to hit your weekly session goal." :
                        " You won't be able to hit your weekly session goal."}</h3>
                </Col>
            </Row>
        </div>
    );
};

export default WorkoutsLoggedPage;