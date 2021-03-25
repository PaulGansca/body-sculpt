import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchWorkouts } from '../../redux/workouts/workouts.actions';
import { selectIsLoading, selectCurrentUserId } from '../../redux/user/user.selectors';
import { selectWorkoutsArray, selectIsLoading as workoutsLoading } from '../../redux/workouts/workouts.selectors';

import ExerciseChart from './exercise-performance-chart';
import CustomSpin from '../../components/antd/custom-spin/custom-spin';

const exerciseEffects = (WrappedComponent) => ({fetchWorkouts, currentUserId, userLoading,
    workoutsLoading, exerciseId, workouts, ...otherProps}) => {
    const [uniqueExercises, setUniqueExercises] = useState({});
    useEffect(() => {
            fetchWorkouts(currentUserId)
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const temp = workouts.reduce((acc, workout) => {
            workout.exercises.forEach(exercise => {
                if(!acc[exercise.id]) {
                    acc[exercise.id] = JSON.parse(JSON.stringify(exercise));
                    acc[exercise.id].sets = acc[exercise.id].sets.map(s => {
                        s.datePerformed = workout.date
                        return s;
                    });
                } else {
                    acc[exercise.id].sets = acc[exercise.id].sets.concat(exercise.sets.map(s => {
                        s.datePerformed = workout.date
                        return s;
                    }));
                }
            });
            return acc;
        }, {});
        setUniqueExercises(temp);
    }, [workouts]);

    return (
        workoutsLoading || userLoading || !uniqueExercises[exerciseId] ? 
            <CustomSpin size={"large"} />  :
            <WrappedComponent {...uniqueExercises[exerciseId]} userId={currentUserId} {...otherProps} />
    )
}

const mapStateToProps = createStructuredSelector({
    userLoading: selectIsLoading,
    workoutsLoading: workoutsLoading,
    workouts: selectWorkoutsArray,
    currentUserId: selectCurrentUserId
})

const mapDispatchToProps = (dispatch) => ({
    fetchWorkouts: (userId) => dispatch(fetchWorkouts(userId, dispatch))
})

const ExerciseChartContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    exerciseEffects
)(ExerciseChart);

export default ExerciseChartContainer;
