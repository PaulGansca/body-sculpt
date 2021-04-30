import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Route, Switch } from 'react-router-dom';

import { createCurrentWorkout, setWorkout, fetchWorkout, resetState } from '../../redux/workout/workout.actions';
import { selectWorkoutExercises, selectIsLoading as selectIsWorkoutLoading, selectError } from '../../redux/workout/workout.selectors';
import { selectCurrentUserId, selectCurrentWorkout, selectIsLoading,
    selectCurrentUser} from '../../redux/user/user.selectors';
import WorkoutPage from './workout-page';
import ExercisePageContainer from '../exercise-page/exercise-page-container';
import CustomSpin from '../../components/antd/custom-spin/custom-spin';
import { MUSCLES_DATA } from '../../static/muscle-images';
import { exerciseCategory, muscleNamesTaxonomy }  from '../../static/exercise-category';
import WithEmpty from '../../components/with-empty/with-empty';

const workoutEffects = (WrappedComponent) => ({createCurrentWorkout, currentUserId, fetchWorkout, error,
    setWorkout, currentWorkout, match, resetState, ...otherProps}) => {
    const { exercises } = otherProps;
    const [primaryMuscles, setPrimaryMuscles] = useState({});
    const [musclesImages, setMusclesImages] = useState([]);
    const [run, setRun] = useState(!window.localStorage.getItem("workoutTutorial") ? true : false);

    useEffect(() => {
        if(currentUserId) {
            if(match.params.workoutId === "new") {
                if(currentWorkout.exercises.length) setWorkout(currentWorkout)
                else createCurrentWorkout(currentUserId, otherProps.currentUser)
            } else {
                fetchWorkout(currentUserId, match.params.workoutId)
            }
            window.localStorage.setItem("workoutTutorial", "complete");
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
                primaryMuscles[mId] = muscleNamesTaxonomy[mId]
            }
            e.muscles.forEach(m => primaryMuscles[m.id]= muscleNamesTaxonomy[m.id])
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
    console.log(error);
    return (
        otherProps.isUserLoading || otherProps.isWorkoutLoading  ? 
            <CustomSpin className="main-spinner" size={"large"} />  :
            <Switch>
                <Route exact={true} path={`${match.path}`} render={() => 
                <WrappedComponent isEmpty={error} emptyText={<span style={{color: 'white'}}>Workout not found</span>}
         emptyProps={{image: "https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg", style: {margin: '10vh'}}}
                 run={run} setRun={setRun} primaryMuscles={primaryMuscles} musclesImages={musclesImages} muscles={MUSCLES_DATA} {...otherProps} />} />
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
    currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    createCurrentWorkout: (userId, currentUser) => 
        dispatch(createCurrentWorkout(userId, currentUser, dispatch)),
    setWorkout: workout => dispatch(setWorkout(workout, dispatch)),
    fetchWorkout: (userId, workoutId) => dispatch(fetchWorkout(userId, workoutId, dispatch)),
    resetState: () => dispatch(resetState(dispatch))
})

const WorkoutPageContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    workoutEffects,
    WithEmpty
)(WorkoutPage);

export default WorkoutPageContainer;
