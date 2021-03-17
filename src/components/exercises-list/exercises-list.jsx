import React from 'react';
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { PlayCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

import ExerciseListItem from '../exercises-list-item/exercise-list-item';
import ExerciseWorkload from '../exercises-list-item/exercise-workload';
import SwapDeleteIcons from '../exercises-list-item/swap-delete-icons';
import Timer from '../timer/timer';
import CustomButton from '../antd/custom-button/custom-button';

import { exerciseCategory }  from '../../static/exercise-category';

import './exercises-list.css';

const ExercisesList = (props) => {
    const { exercises, muscles, AddExercise, moveExercise,
         history, workoutState, toggleWorkoutState } = props;
    const btnClass = workoutState === "not started" ? "" : "finish-workout-btn";
    const SortableExercise = SortableElement(({exercise, idx, muscleImage, ...otherProps}) => 
        <ExerciseListItem {...otherProps} idx={idx} ExerciseWorkload={ExerciseWorkload}
            SwapDeleteIcons={SwapDeleteIcons} exercise={exercise} history={history}
            muscleImage={muscleImage} key={exercise.db_id} />);
    const SortableList = SortableContainer(({ exercises }) => (
      <div className="exercises-list">
                <div>
                    <AddExercise />
                    {workoutState !== "not started" ? <Timer workoutState={workoutState} /> : <></>}
                </div>
                {exercises.map((exercise, idx) => {
                    const muscleImage = { imgUrls: [] };
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
                <CustomButton className={`toggle-state-btn ${btnClass}`} shape={"round"} icon={workoutState === "not started" ? <PlayCircleOutlined /> : <CheckCircleOutlined />}
                onClick={() => {
                    let state = workoutState === "not started" || workoutState === "paused" ? "in progress" : "paused";
                    toggleWorkoutState(state)
                }}>{workoutState === "not started" ? "Start Workout" : "Finish Workout"}</CustomButton>
        </div>
    ));
    return (
        <SortableList pressDelay={200} exercises={exercises} onSortEnd={({oldIndex, newIndex}) => moveExercise(oldIndex, newIndex, exercises)} />
    )
};

export default ExercisesList;