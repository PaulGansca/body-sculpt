import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CheckCircleOutlined } from '@ant-design/icons';

import { selectWorkoutState } from '../../redux/workout/workout.selectors';

const ExerciseWorkload = (props) => {
    const { exercise, workoutState } = props;
    const repRange = {min: exercise.sets[0].reps, max: exercise.sets[0].reps};
    const weightRange = {min: exercise.sets[0].weight, max: exercise.sets[0].weight};
    let setLoggedCount = 0;
    exercise.sets.forEach(s => {
        if(s.reps < repRange.min) repRange.min = s.reps
        else if(s.reps > repRange.max) repRange.max = s.reps;

        if(s.weight < weightRange.min) weightRange.min = s.weight
        else if(s.weight > weightRange.max) weightRange.max = s.weight;

        if(s.isLogged) setLoggedCount += 1;
    })
    return (
        <div style={{display: 'flex', flexFlow: 'column', alignItems: 'baseline', overflow: 'hidden'}}>
                <span style={{textAlign: 'left'}}>{exercise.name}</span>
                {workoutState !== "not started" && setLoggedCount > 0 ?
                 <span style={{color: "green"}}><CheckCircleOutlined /> {setLoggedCount}/{exercise.sets.length} sets</span> :
                 <span>{exercise.sets.length} sets |
                     {repRange.min === repRange.max ? ` ${repRange.max}` : ` ${repRange.min}-${repRange.max}`} reps
                     {weightRange.min === weightRange.max ? ` | ${weightRange.max} kg` : ""}</span>}
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    workoutState: selectWorkoutState,
})

const ExerciseWorkloadContainer = compose(
    connect(mapStateToProps),
)(ExerciseWorkload);

export default ExerciseWorkloadContainer;