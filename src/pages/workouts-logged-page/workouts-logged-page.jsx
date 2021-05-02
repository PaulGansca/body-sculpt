import React from 'react';
import moment from 'moment';
import { Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import CustomCalendar from '../../components/antd/custom-calendar/custom-calendar';
import WorkoutSummary from '../../components/workout-summary/workout-summary';
import CustomCard from '../../components/antd/custom-card/custom-card';
import CustomButton from '../../components/antd/custom-button/custom-button';
import WeekHighlights from './week-highlights';

import './workouts-logged.css';

const WorkoutsLoggedPage = ({workouts, history, trainingFrequency, setWorkout,
     weight, deleteWorkout, userId}) => {
    const sortedWorkouts = workouts.sort((a,b) => new Date(b.date) - new Date(a.date));
    const getWorkoutData = (value) => {
        return workouts.find(w => value.isSame(moment(w.date).format('YYYY/MM/DD')));
      }
    const cellRender = (date) => {
        const workout = getWorkoutData(moment(date.format('YYYY/MM/DD')))
        return (
            workout ? 
                <div onClick={() => {setWorkout(workout); history.push(`/user/workout/${workout.id}`)}} className="ant-picker-cell-inner ant-picker-calendar-date">
                    <div className="ant-picker-calendar-date-value workout-logged">{date.date()}</div>
                    <div className="ant-picker-calendar-date-content">
                        <span className="cal-time-elapsed" key={workout.id}>{workout.timeElapsed}</span>
                    </div>
                </div>
                :
                <div className="ant-picker-cell-inner ant-picker-calendar-date">
                    <div className="ant-picker-calendar-date-value">{date.date()}</div>
                </div>
        )
    }
    const today = moment();
    const from_date = today.day() === 0 ? moment().subtract(1, 'd').startOf('week').add(1, 'd').format("YYYY/MM/DD")
     : moment().startOf('week').add(1, 'd').format("YYYY/MM/DD");
    const to_date = today.day() === 0 ? moment().subtract(1, 'd').endOf('week').add(1, 'd').format("YYYY/MM/DD")
    : moment().endOf('week').add(1, 'd').format("YYYY/MM/DD");
    const workoutsInWeek = workouts.filter(w => (moment(moment(w.date).format('YYYY/MM/DD')).isBetween(moment(from_date), moment(to_date)) ||
                            moment(w.date).format('YYYY/MM/DD') === from_date || moment(w.date).format('YYYY/MM/DD') === to_date));
    const countWorkoutsInWeek = workoutsInWeek.length;
    const canReachWeeklyTarget = 7 - (moment().day() === 0 ? 6 : moment().day()) >= trainingFrequency - countWorkoutsInWeek;

    let streak = 0;
    if(canReachWeeklyTarget) {
        const currentWeek = moment().startOf('week').format("YYYY/MM/DD")
        .concat("-").concat(moment().endOf('week').format("YYYY/MM/DD"));
        let weeklyWorkouts  = sortedWorkouts.reduce((acc, w) => {
            const weekKey = moment(w.date).startOf('week').format("YYYY/MM/DD")
                        .concat("-").concat(moment(w.date).endOf('week').format("YYYY/MM/DD"))
            if(!acc[weekKey]) {
                acc[weekKey] = 1
            } else acc[weekKey] += 1
            return acc;
        }, {});
        delete weeklyWorkouts[currentWeek];
        streak = Object.keys(weeklyWorkouts).findIndex(weekKey => weeklyWorkouts[weekKey] < trainingFrequency);
    }
    
    return (
        <div className="workouts-logged-container">
            <Row>
                <Col xs={{span: 24}} md={{span: 20, offset: 2}} lg={{span: 18, offset: 3}}>
                    <CustomCalendar dateFullCellRender={cellRender} className="workouts-logged-calendar" fullscreen={false} />
                    <WeekHighlights streak={streak} countWorkoutsInWeek={countWorkoutsInWeek} workoutsInWeek={workoutsInWeek}
                        canReachWeeklyTarget={canReachWeeklyTarget} trainingFrequency={trainingFrequency} weight={weight} />
                    <Row justify={window.innerWidth < 800 ? 'center' : 'space-between'} gutter={[16, 16]}>
                    {sortedWorkouts.map(w => 
                    <CustomCard key={w.id} size="small" title={moment(w.date).format("ddd, MMM Do YYYY")} style={{ width: 330 }} hoverable={true}
                    actions={[
                        <CustomButton onClick={() => deleteWorkout(userId, w.id)}
                            size={"small"} danger shape={"round"} icon={<DeleteOutlined />} />
                    ]}
                     extra={<CustomButton type="link" onClick={() => {setWorkout(w); history.push(`/user/workout/${w.id}`)}}>View Workout</CustomButton>}>
                        <WorkoutSummary exercises={w.exercises} timeElapsed={w.timeElapsed} weight={weight} />
                    </CustomCard>
                    )}
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default WorkoutsLoggedPage;