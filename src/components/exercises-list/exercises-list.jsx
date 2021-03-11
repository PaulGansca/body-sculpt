import React from 'react';
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import ExerciseListItem from '../exercises-list-item/exercise-list-item';
import ExerciseWorkload from '../exercises-list-item/exercise-workload';
import SwapDeleteIcons from '../exercises-list-item/swap-delete-icons';

import { exerciseCategory }  from '../../static/exercise-category';

import './exercises-list.css';

const ExercisesList = (props) => {
    const { exercises, muscles, AddExercise, moveExercise, workout, userId, history } = props;
    const SortableExercise = SortableElement(({exercise, idx, muscleImage, ...otherProps}) => 
        <ExerciseListItem {...otherProps} idx={idx} ExerciseWorkload={ExerciseWorkload}
            SwapDeleteIcons={SwapDeleteIcons} exercise={exercise} history={history}
            muscleImage={muscleImage} key={exercise.db_id} />);
    const SortableList = SortableContainer(({ exercises }) => (
      <div className="exercises-list">
                {AddExercise ? <AddExercise /> : <></>}
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
        </div>
    ));
    return (
        <SortableList pressDelay={200} exercises={exercises} onSortEnd={({oldIndex, newIndex}) => moveExercise(oldIndex, newIndex, workout, userId)} />
    )
};

export default ExercisesList;