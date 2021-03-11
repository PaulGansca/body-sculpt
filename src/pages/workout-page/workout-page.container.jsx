import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Route, Switch } from 'react-router-dom';

import { createCurrentWorkout, setCurrentWorkout } from '../../redux/workout/workout.actions';
import { selectWorkoutExercises } from '../../redux/workout/workout.selectors';
import { selectCurrentUserId, selectCurrentWorkout } from '../../redux/user/user.selectors';
import WorkoutPage from './workout-page';
import ExercisePageContainer from '../exercise-page/exercise-page-container';

const workoutEffects = (WrappedComponent) => ({createCurrentWorkout, currentUserId,
    setCurrentWorkout, currentWorkout, match, ...otherProps}) => {
    const { exercises } = otherProps;
    const [muscles, setMusclesArr] = useState([]);
    const [primaryMuscles, setPrimaryMuscles] = useState({});
    const [musclesImages, setMusclesImages] = useState([]);

    useEffect(() => {
        //fetch muscles targeted images
        fetch("https://wger.de/api/v2/muscle/").then(muscles => muscles.json()
            .then(muscles => setMusclesArr(muscles.results)));
        if(currentUserId) {
            if(currentWorkout.id && currentWorkout.exercises.length) setCurrentWorkout(currentWorkout)
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
    currentWorkout: selectCurrentWorkout
})

const mapDispatchToProps = dispatch => ({
    createCurrentWorkout: userId => dispatch(createCurrentWorkout(userId, dispatch)),
    setCurrentWorkout: currentWorkout => dispatch(setCurrentWorkout(currentWorkout, dispatch))
})

const WorkoutPageContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    workoutEffects
)(WorkoutPage);

export default WorkoutPageContainer;
