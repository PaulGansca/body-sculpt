import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import WorkoutPage from './workout-page';

const workoutEffects = (WrappedComponent) => ({setCurrentUser, ...otherProps}) => {
    const [exercises, setExercisesArr] = useState([]);
    const [muscles, setMusclesArr] = useState([]);
    useEffect(() => {
        //fetch muscles targeted images
        fetch("https://wger.de/api/v2/muscle/").then(muscles => muscles.json()
            .then(muscles => setMusclesArr(muscles.results)))

        //fetch exercises
        const exerciseFetch = Promise.all([
            fetch("https://wger.de/api/v2/exerciseinfo/192/"),
            fetch("https://wger.de/api/v2/exerciseinfo/113/"),
            fetch("https://wger.de/api/v2/exerciseinfo/181/"),
            fetch("https://wger.de/api/v2/exerciseinfo/100/"),
            fetch("https://wger.de/api/v2/exerciseinfo/123/")]);
        
        exerciseFetch.then(resultArray => {
            const temp = []
            resultArray.forEach((exercise, idx) => exercise.json().then(data => {
                temp.push(data);
                if(idx === resultArray.length-1) setExercisesArr(temp)
            }));
        });


        return () => {
            console.log('UNMOUNT');
        };
    }, []);
    console.log("RENREDERE")
    return <WrappedComponent muscles={muscles} exercises={exercises} {...otherProps} />
}

// const mapStateToProps = createStructuredSelector({
//     currentUser: selectCurrentUser
// })

// const mapDispatchToProps = dispatch => ({
//     setCurrentUser: user => dispatch(setCurrentUser(user))
// })

const WorkoutPageContainer = compose(
    //connect(mapStateToProps, mapDispatchToProps),
    workoutEffects
)(WorkoutPage);

export default WorkoutPageContainer;
