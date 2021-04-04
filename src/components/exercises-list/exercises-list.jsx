import React from 'react';
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { PlusOutlined } from '@ant-design/icons';

import ExerciseListItem from '../exercises-list-item/exercise-list-item';
import ExerciseWorkload from '../exercises-list-item/exercise-workload';
import SwapDeleteIcons from '../exercises-list-item/swap-delete-icons';
import Timer from '../timer/timer';
import FinishWorkoutModal from '../finish-workout-modal/finish-workout-modal';
import CustomButton from '../antd/custom-button/custom-button';

import { exerciseCategory }  from '../../static/exercise-category';

import './exercises-list.css';

const ExercisesList = (props) => {
    const { exercises, muscles, AddExercise, moveExercise,
         history, workoutState, createCurrentWorkout, currentUserId } = props;

    const SortableExercise = SortableElement(({exercise, idx, muscleImage, ...otherProps}) => 
        <ExerciseListItem {...otherProps} idx={idx} ExerciseWorkload={ExerciseWorkload}
            SwapDeleteIcons={SwapDeleteIcons} exercise={exercise} history={history}
            muscleImage={muscleImage} key={exercise.db_id} />);
    const SortableList = SortableContainer(({ exercises }) => (
      <div className="exercises-list">
                <div>
                    {workoutState === "not started" ? 
                    <CustomButton danger style={{marginRight: 20}} shape={"round"} icon={<PlusOutlined />}
                        onClick={() => createCurrentWorkout(currentUserId)}>New Workout</CustomButton> : <></> }
                    <AddExercise />
                    {workoutState !== "not started" ? <Timer workoutState={workoutState} /> : <></>}
                </div>
                {exercises.map((exercise, idx) => {
                    const muscleImage = { imgUrls: [] };
                    if(!exercise.muscles.length) {
                        const category = exerciseCategory[exercise.category.name]
                        muscleImage.imgUrls.push(`https://wger.de/${category.image_url_main}`);
                        muscleImage.isFront = category.isFront
                        muscleImage.id = category.muscleIds[0];
                    }
                    exercise.muscles.forEach(m => {
                        const muscle = muscles.find(muscle => muscle.id === m.id);
                        if(exerciseCategory[exercise.category.name].muscleIds.includes(muscle.id)) {
                            muscleImage.imgUrls.push(`https://wger.de/${muscle.image_url_main}`);
                            muscleImage.isFront = muscle.is_front;
                            muscleImage.id = m.id;
                        }
                    });
                    return <SortableExercise key={exercise.db_id} index={idx} exercise={exercise} idx={idx} muscleImage={muscleImage} />
                })}
                <FinishWorkoutModal />
        </div>
    ));
    return (
        <SortableList pressDelay={200} exercises={exercises} onSortEnd={({oldIndex, newIndex}) => moveExercise(oldIndex, newIndex, exercises)} />
    )
};

export default ExercisesList;