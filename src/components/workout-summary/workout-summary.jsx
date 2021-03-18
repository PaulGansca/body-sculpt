import React from 'react';

const WorkoutSummary = ({timeElapsed, exercises, weight}) => {
    const volume = exercises.reduce((acc, e) => {
        e.sets.forEach(s => acc += s.weight * s.reps);
        return acc;
    }, 0);
    const exercisesComplete = exercises.filter(e =>
        e.sets.findIndex(s => !s.isLogged) === -1).length;
    const colonIdx = timeElapsed.indexOf(":");
    const minutes = parseInt(timeElapsed.substring(0,colonIdx));
    const calories = minutes * (3*3.5*weight) / 200
    //Total calories burned = Duration (in minutes)*(MET*3.5*weight in kg)/200 
    // where MET is metabolic equivalent for task
    return (
        <p>Duration: <span style={{fontWeight: 'bold'}}>{timeElapsed} </span>
         Exercises: <span style={{fontWeight: 'bold'}}>{exercisesComplete} </span>
         Volume: <span style={{fontWeight: 'bold'}}>{volume} kg </span>
         Calories: <span style={{fontWeight: 'bold'}}>{calories} kcal</span></p>
    );
};

export default WorkoutSummary;