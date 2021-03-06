import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import { updateExerciseWorkload } from '../../redux/workout/workout.actions';
import { selectWorkoutExercises, selectIsLoading, selectWorkoutState } from '../../redux/workout/workout.selectors';
import WithEmpty from '../../components/with-empty/with-empty';
import ExercisePage from './exercise-page';

const exerciseEffects = (WrappedComponent) => (props) => {
    const { match, exercises } = props;
    //use later for making sure correct workout is set in redux state and exercise
    const { exerciseId } = match.params;
    const exercise = exercises.find(e => e.db_id === exerciseId);
    const [run, setRun] = useState(!window.localStorage.getItem("exerciseTutorial") ? true : false);
    return (
        <WrappedComponent isEmpty={!exercise} emptyText={<span style={{color: 'white'}}>Exercise not found</span>}
         emptyProps={{image: "https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg", style: {margin: '10vh'}}}
         run={run} setRun={setRun} exercise={exercise} {...props} />    
    )

}

const mapStateToProps = createStructuredSelector({
    exercises: selectWorkoutExercises,
    isLoading: selectIsLoading,
    workoutState: selectWorkoutState
})

const mapDispatchToProps = dispatch => ({
    updateExerciseWorkload: (exercise) => dispatch(updateExerciseWorkload(exercise, dispatch))
})

const ExercisePageContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    exerciseEffects,
    WithEmpty
)(ExercisePage);

export default ExercisePageContainer;