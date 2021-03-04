import React from 'react';

import { PlusOutlined } from '@ant-design/icons';

import WorkoutHeader from '../../components/workout-header/workout-header';
import ExercisesList from '../../components/exercises-list/exercises-list';
import CustomButton from '../../components/antd/custom-button/custom-button';

const WorkoutPage = (props) => {
    const { exercises, muscles, primaryMuscles, musclesImages } = props;

    const AddExercise = <CustomButton style={{marginRight: 130}} shape={"round"} icon={<PlusOutlined />}>Add Exercise</CustomButton>;

    return (
        <div className="workout-page">
            <WorkoutHeader primaryMuscles={primaryMuscles} musclesImages={musclesImages} />
            <ExercisesList AddExercise={AddExercise} exercises={exercises} muscles={muscles} />
        </div>
    )
};

export default WorkoutPage;