import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CheckCircleOutlined } from '@ant-design/icons';

import CustomButton from '../antd/custom-button/custom-button';
import CustomTooltip from '../antd/custom-tooltip/custom-tooltip';

import { logSet, logSetWithSwapExercise } from '../../redux/workout/workout.actions';
import { selectWorkoutExercises } from '../../redux/workout/workout.selectors';
import { selectCurrentUserId, selectDisplayName, selectUserWeight,
     selectGender, selectPrivacy, selectFitnessLevel } from '../../redux/user/user.selectors';

import { createLeaderboardEntry } from '../../firebase/crud-leaderboard';

const LogSet = ({logSet, exercise, currentSet, exercises, exerciseIdx,
    logSetWithSwapExercise, userId, displayName, weight, gender, privacy, fitnessLevel }) => {
    const handleLog = (setsLogged) => {
        const swapIdx = exercises.findIndex(e => e.sets.findIndex(s => !s.isLogged) > -1);
        if(swapIdx < exerciseIdx) {
            exercises[exerciseIdx] = exercise
            logSetWithSwapExercise(exercises, exerciseIdx, swapIdx)
        }
        else logSet(exercise)
        //calculateleaderboard entry for setsLogged
        const data = {displayName: privacy === "public" ? displayName : "Anonymous", exerciseId: exercise.id,
             weight, gender, fitnessLevel }
        setsLogged.forEach(s => {
            const performance = {date: new Date(), name: exercise.name,
                max: Math.round(s.weight * (1 + s.reps / 30)), set: {reps: s.reps, weight: s.weight}};
            if(data.performance) {
                if(data.performance.max < performance.max) data.performance = performance
            } else data.performance = performance
        });
        createLeaderboardEntry(userId, data);
    }
    return (
        <>
        <CustomTooltip title={`Marks highlighted set as complete`}>
            <CustomButton style={{marginRight: 15}} onClick={() => {
                exercise.sets[currentSet].isLogged = true;
                handleLog([exercise.sets[currentSet]])
            }} icon={<CheckCircleOutlined />}
            shape={"round"}>Log Set</CustomButton>
        </CustomTooltip>
        <CustomTooltip title={`Marks all sets as complete`}>
            <CustomButton onClick={() => {
                exercise.sets.forEach(s => s.isLogged = true)
                handleLog(exercise.sets)
            }} icon={<CheckCircleOutlined />}
            shape={"round"}>Log All Sets</CustomButton>
        </CustomTooltip>
        </>
    );
};

const mapStateToProps = createStructuredSelector({
    exercises: selectWorkoutExercises,
    userId: selectCurrentUserId,
    displayName: selectDisplayName,
    weight: selectUserWeight,
    gender: selectGender,
    privacy: selectPrivacy,
    fitnessLevel: selectFitnessLevel
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