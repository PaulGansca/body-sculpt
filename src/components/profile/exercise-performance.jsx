import React, { useState, useEffect } from 'react';

import CustomSelect from '../antd/custom-inputs/custom-select';
import ExercisePerformanceChart from '../exercise-performance-chart/exercise-performance-chart';

import './profile.css';

const ExercisePerformance = ({workouts}) => {
    const [uniqueExercises, setUniqueExercises] = useState({});
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(-1);
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
        setUniqueExercises(temp)
    }, [workouts]);

    useEffect(() => {
        const optionList = Object.keys(uniqueExercises).map(id => ({
            props: {value: id, key: id},
            text: uniqueExercises[id].name
        }));
        setOptions(optionList);
    }, [uniqueExercises])

    return (
        <div className="exercise-performance">
            <CustomSelect className="exercise-dropdown" placeholder={"Select Exercise"} options={options}
                showSearch optionFilterProp="children" onSelect={(exerciseId) => setSelectedOption(exerciseId)}
                style={{width: 300}} filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                } />
            {selectedOption > -1 ? <ExercisePerformanceChart {...uniqueExercises[selectedOption]} /> : <></>}
        </div>
    )
};

export default ExercisePerformance;