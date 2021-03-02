import React, { useState, useEffect } from 'react';

import WorkoutHeader from '../../components/workout-header/workout-header';
import ExercisesList from '../../components/exercises-list/exercises-list';

const WorkoutPage = (props) => {
    const { exercises, muscles } = props;

    const [primaryMuscles, setPrimaryMuscles] = useState({});
    const [musclesImages, setMusclesImages] = useState([]);

    useEffect(() => {
        exercises.forEach(e => e.muscles.forEach(m =>
            setPrimaryMuscles(prevState => {return {...prevState, [m.id]: m.name}})
       ));
    }, [exercises]);

    useEffect(() => {
        Object.keys(primaryMuscles).forEach(id => {
            const muscle = muscles.find(muscle => muscle.id === parseInt(id))
            const imgUrls = [`https://wger.de/${muscle.image_url_main}`];
            const isFront = muscle.is_front;
            setMusclesImages(prevState => [...prevState, {imgUrls, isFront, id: parseInt(id)}])
        })
    }, [primaryMuscles, muscles]);
    console.log(exercises)
    // console.log(musclesImages)

    return (
        <div className="workout-page">
            <WorkoutHeader primaryMuscles={primaryMuscles} musclesImages={musclesImages} />
            <ExercisesList exercises={exercises} muscles={muscles} />
        </div>
    )
};

export default WorkoutPage;