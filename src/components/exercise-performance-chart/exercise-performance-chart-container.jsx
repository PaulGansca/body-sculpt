import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchWorkouts } from '../../redux/workouts/workouts.actions';
import { selectIsLoading, selectCurrentUserId } from '../../redux/user/user.selectors';
import { selectWorkoutsArray, selectIsLoading as workoutsLoading } from '../../redux/workouts/workouts.selectors';

import ExerciseChart from './exercise-performance-chart';
import WithSpinner from '../../components/with-spinner/with-spinner';
import WithEmpty from '../with-empty/with-empty';

const exerciseEffects = (WrappedComponent) => ({fetchWorkouts, ...otherProps}) => {
    const { currentUserId, userLoading, workoutsLoading, exerciseId, workouts } = otherProps;
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
        <WrappedComponent loading={workoutsLoading || userLoading} isEmpty={!uniqueExercises[exerciseId]}
            emptyText={"No past achievements for this exercise yet."} emptyProps={{image: "https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"}}
            {...uniqueExercises[exerciseId]} userId={currentUserId} {...otherProps} />
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
    exerciseEffects,
    WithSpinner,
    WithEmpty
)(ExerciseChart);

export default ExerciseChartContainer;
