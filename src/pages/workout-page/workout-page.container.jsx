import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Route, Switch } from 'react-router-dom';

import { createCurrentWorkout, setWorkout, fetchWorkout, resetState } from '../../redux/workout/workout.actions';
import { selectWorkoutExercises, selectIsLoading as selectIsWorkoutLoading, selectError } from '../../redux/workout/workout.selectors';
import { selectCurrentUserId, selectCurrentWorkout, selectIsLoading } from '../../redux/user/user.selectors';
import WorkoutPage from './workout-page';
import ExercisePageContainer from '../exercise-page/exercise-page-container';
import CustomSpin from '../../components/antd/custom-spin/custom-spin';
import { MUSCLES_DATA } from '../../static/muscle-images';
import { exerciseCategory }  from '../../static/exercise-category';

const workoutEffects = (WrappedComponent) => ({createCurrentWorkout, currentUserId, fetchWorkout, error,
    setWorkout, currentWorkout, match, resetState, ...otherProps}) => {
    const { exercises } = otherProps;
    const [primaryMuscles, setPrimaryMuscles] = useState({});
    const [musclesImages, setMusclesImages] = useState([]);

    useEffect(() => {
        if(currentUserId) {
            if(match.params.workoutId === "new") {
                if(currentWorkout.exercises.length) setWorkout(currentWorkout)
                else createCurrentWorkout(currentUserId)
            } else {
                fetchWorkout(currentUserId, match.params.workoutId)
            }
        }
        return () => {
            resetState()
        }
        // eslint-disable-next-line
    }, [currentUserId, match.params.workoutId]);

    useEffect(() => {
        if(error === "Permission Denied") alert(error)
    }, [error])

    useEffect(() => {
        const primaryMuscles = {}
        exercises.forEach(e => {
            if(!e.muscles.length) {
                const mId = exerciseCategory[e.category.name].muscleIds[0];
                primaryMuscles[mId] = MUSCLES_DATA[mId].name
            }
            e.muscles.forEach(m => primaryMuscles[m.id]= m.name)
        });
        setPrimaryMuscles(primaryMuscles)
    }, [exercises]);

    useEffect(() => {
        const musclesImages = [];
        Object.keys(primaryMuscles).forEach(id => {
            const muscle = MUSCLES_DATA.find(muscle => muscle.id === parseInt(id))
            const imgUrls = [`https://wger.de/${muscle.image_url_main}`];
            const isFront = muscle.is_front;
            musclesImages.push({imgUrls, isFront, id: parseInt(id)})
        })
        setMusclesImages(musclesImages)
    }, [primaryMuscles]);

    return (
        otherProps.isUserLoading || otherProps.isWorkoutLoading  ? 
            <CustomSpin className="main-spinner" size={"large"} />  :
            <Switch>
                <Route exact={true} path={`${match.path}`} render={() => 
                <WrappedComponent primaryMuscles={primaryMuscles} musclesImages={musclesImages} muscles={MUSCLES_DATA} {...otherProps} />} />
                <Route exact={true} path={`${match.path}/exercise/:exerciseId`} component={ExercisePageContainer} />
            </Switch>
    )
}

const mapStateToProps = createStructuredSelector({
    exercises: selectWorkoutExercises,
    currentUserId: selectCurrentUserId,
    currentWorkout: selectCurrentWorkout,
    isUserLoading: selectIsLoading,
    isWorkoutLoading: selectIsWorkoutLoading,
    error: selectError,
})

const mapDispatchToProps = dispatch => ({
    createCurrentWorkout: userId => dispatch(createCurrentWorkout(userId, dispatch)),
    setWorkout: workout => dispatch(setWorkout(workout, dispatch)),
    fetchWorkout: (userId, workoutId) => dispatch(fetchWorkout(userId, workoutId, dispatch)),
    resetState: () => dispatch(resetState(dispatch))
})

const WorkoutPageContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    workoutEffects
)(WorkoutPage);

export default WorkoutPageContainer;
