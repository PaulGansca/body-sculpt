import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Route, Switch } from 'react-router-dom';

import { createCurrentWorkout, setWorkout } from '../../redux/workout/workout.actions';
import { selectWorkoutExercises, selectIsLoading as selectIsWorkoutLoading } from '../../redux/workout/workout.selectors';
import { selectCurrentUserId, selectCurrentWorkout, selectIsLoading } from '../../redux/user/user.selectors';
import WorkoutPage from './workout-page';
import ExercisePageContainer from '../exercise-page/exercise-page-container';
import CustomSpin from '../../components/antd/custom-spin/custom-spin';

const workoutEffects = (WrappedComponent) => ({createCurrentWorkout, currentUserId,
    setWorkout, currentWorkout, match, ...otherProps}) => {
    const { exercises } = otherProps;
    const [muscles, setMusclesArr] = useState([]);
    const [primaryMuscles, setPrimaryMuscles] = useState({});
    const [musclesImages, setMusclesImages] = useState([]);

    useEffect(() => {
        //fetch muscles targeted images
        fetch("https://wger.de/api/v2/muscle/").then(muscles => muscles.json()
            .then(muscles => setMusclesArr(muscles.results)));
        if(currentUserId) {
            //TO DO use match to get workout id and set either current workout or workout from array
            //console.log(match)
            if(currentWorkout.id && currentWorkout.exercises.length) setWorkout(currentWorkout)
            else createCurrentWorkout(currentUserId)
        }
        // eslint-disable-next-line
    }, [currentUserId]);

    useEffect(() => {
        const primaryMuscles = {}
        exercises.forEach(e => e.muscles.forEach(m => primaryMuscles[m.id]= m.name));
        setPrimaryMuscles(primaryMuscles)
    }, [exercises]);

    useEffect(() => {
        const musclesImages = []
        Object.keys(primaryMuscles).forEach(id => {
            const muscle = muscles.find(muscle => muscle.id === parseInt(id))
            const imgUrls = [`https://wger.de/${muscle.image_url_main}`];
            const isFront = muscle.is_front;
            musclesImages.push({imgUrls, isFront, id: parseInt(id)})
        })
        setMusclesImages(musclesImages)
    }, [primaryMuscles, muscles]);
    return (
        otherProps.isUserLoading || otherProps.isWorkoutLoading  ? 
            <CustomSpin size={"large"} />  :
            <Switch>
                <Route exact={true} path={`${match.path}`} render={() => 
                <WrappedComponent primaryMuscles={primaryMuscles} musclesImages={musclesImages} muscles={muscles} {...otherProps} />} />
                <Route exact={true} path={`${match.path}/exercise/:exerciseId`} component={ExercisePageContainer} />
            </Switch>
    )
}

const mapStateToProps = createStructuredSelector({
    exercises: selectWorkoutExercises,
    currentUserId: selectCurrentUserId,
    currentWorkout: selectCurrentWorkout,
    isUserLoading: selectIsLoading,
    isWorkoutLoading: selectIsWorkoutLoading
})

const mapDispatchToProps = dispatch => ({
    createCurrentWorkout: userId => dispatch(createCurrentWorkout(userId, dispatch)),
    setWorkout: workout => dispatch(setWorkout(workout, dispatch))
})

const WorkoutPageContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    workoutEffects
)(WorkoutPage);

export default WorkoutPageContainer;
