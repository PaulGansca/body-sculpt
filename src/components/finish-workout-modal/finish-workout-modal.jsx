import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import { PlayCircleOutlined, CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';

import CustomModal from '../antd/custom-modal/custom-modal';
import CustomButton from '../antd/custom-button/custom-button';
import WorkoutSummary from '../workout-summary/workout-summary';

import { toggleWorkoutState, completeWorkout } from '../../redux/workout/workout.actions';
import { selectWorkoutState, selectWorkoutExercises, selectTimeElapsed } from '../../redux/workout/workout.selectors';
import { selectUserWeight, selectCurrentUserId } from '../../redux/user/user.selectors';


const FinishWorkoutModal = ({workoutState, toggleWorkoutState, weight, exercises, timeElapsed,
        currentUserId, workoutId, completeWorkout, history}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        if(workoutState) {
            if(workoutState === "paused") setIsModalVisible(true)
        }
        // eslint-disable-next-line 
    }, [workoutState]);

    const handleOk = () => {
        setIsModalVisible(false);
        const exercisesComplete = JSON.parse(JSON.stringify(exercises)).filter(e => {
            e.sets = e.sets.filter(s => s.isLogged)
            return e.sets.length > 0 ? true : false;
        })
        const workout = {
            id: workoutId,
            date: new Date(),
            exercises: exercisesComplete,
            workoutState: 'complete',
            timeElapsed,
            userId: currentUserId
        }
        completeWorkout(workout, currentUserId, history)
    }

    const btnClass = workoutState === "not started" ? "" : "finish-workout-btn";
    return (
        <>
            {workoutState !== "complete" ? <CustomButton className={`toggle-state-btn ${btnClass}`} shape={"round"} icon={workoutState === "not started" ? <PlayCircleOutlined /> : <CheckCircleOutlined />}
                onClick={() => {
                    let state = workoutState === "not started" || workoutState === "paused" ? "in progress" : "paused";
                    toggleWorkoutState(state)
                }}>
                {workoutState === "not started" ? "Start Workout" : "Finish Workout"}</CustomButton> :
                <CustomButton className={`toggle-state-btn ${btnClass}`} onClick={() => setIsModalVisible(true)}
                    icon={<InfoCircleOutlined />} shape={"round"}>View Summary</CustomButton>}
            {workoutState !== "complete" ? <CustomModal visible={isModalVisible} onOk={() => handleOk()}
                onCancel={() => {toggleWorkoutState("in progress"); setIsModalVisible(false)}} cancelText="Resume Workout" okText="Log Workout">
                <p>Finish and log your workout?</p>
                <WorkoutSummary timeElapsed={timeElapsed} exercises={exercises} weight={weight} />
            </CustomModal> :
            <CustomModal visible={isModalVisible} footer={null}
                onCancel={() => setIsModalVisible(false)} okText="Log Workout">
                <p>Workout details at a glance:</p>
                <WorkoutSummary timeElapsed={timeElapsed} exercises={exercises} weight={weight} />
            </CustomModal>}
        </>
    )
};

const mapStateToProps = createStructuredSelector({
    workoutState: selectWorkoutState,
    timeElapsed: selectTimeElapsed,
    weight: selectUserWeight,
    exercises: selectWorkoutExercises,
    currentUserId: selectCurrentUserId,
});

const mapDispatchToProps = dispatch => ({
    toggleWorkoutState: (state) => dispatch(toggleWorkoutState(state, dispatch)),
    completeWorkout: (workout, currentUserId, history) => dispatch(completeWorkout(workout, currentUserId, history, dispatch))
});

const FinishWorkoutModalContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
)(FinishWorkoutModal);

export default FinishWorkoutModalContainer;