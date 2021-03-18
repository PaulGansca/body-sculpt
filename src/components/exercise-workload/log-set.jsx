import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CheckCircleOutlined } from '@ant-design/icons';

import CustomButton from '../antd/custom-button/custom-button';
import CustomTooltip from '../antd/custom-tooltip/custom-tooltip';

import { logSet, logSetWithSwapExercise } from '../../redux/workout/workout.actions';
import { selectWorkoutExercises } from '../../redux/workout/workout.selectors';

const LogSet = ({logSet, exercise, currentSet, exercises, exerciseIdx, logSetWithSwapExercise}) => {
    const handleLog = () => {
        const swapIdx = exercises.findIndex(e => e.sets.findIndex(s => !s.isLogged) > -1);
                if(swapIdx < exerciseIdx) {
                    exercises[exerciseIdx] = exercise
                    logSetWithSwapExercise(exercises, exerciseIdx, swapIdx)
                }
                else logSet(exercise)
    }
    return (
        <>
        <CustomTooltip title={`Marks highlighted set as complete`}>
            <CustomButton style={{marginRight: 15}} onClick={() => {
                exercise.sets[currentSet].isLogged = true;
                handleLog()
            }} icon={<CheckCircleOutlined />}
            shape={"round"}>Log Set</CustomButton>
        </CustomTooltip>
        <CustomTooltip title={`Marks all sets as complete`}>
            <CustomButton onClick={() => {
                exercise.sets.forEach(s => s.isLogged = true)
                handleLog()
            }} icon={<CheckCircleOutlined />}
            shape={"round"}>Log All Sets</CustomButton>
        </CustomTooltip>
        </>
    );
};

const mapStateToProps = createStructuredSelector({
    exercises: selectWorkoutExercises,
})

const mapDispatchToProps = dispatch => ({
    logSet: (exercise) => dispatch(logSet(exercise, dispatch)),
    logSetWithSwapExercise: (exercise, exerciseIdx, swapIdx) => 
        dispatch(logSetWithSwapExercise(exercise, exerciseIdx, swapIdx, dispatch))
})

const LogSetContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(LogSet);

export default LogSetContainer;