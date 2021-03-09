import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import ExerciseListItem from '../exercises-list-item/exercise-list-item';
import ExerciseWorkload from '../exercises-list-item/exercise-workload';
import SwapDeleteIcons from '../exercises-list-item/swap-delete-icons';

import { exerciseCategory }  from '../../static/exercise-category';
import { selectWorkout } from '../../redux/workout/workout.selectors';
import { selectCurrentUserId } from '../../redux/user/user.selectors';
import { moveExercise } from '../../redux/workout/workout.actions';

import './exercises-list.css';

const ExercisesList = (props) => {
    const { exercises, muscles, AddExercise, moveExercise, workout, userId } = props;
    const SortableExercise = SortableElement(({exercise, idx, muscleImage, ...otherProps}) => 
        <ExerciseListItem {...otherProps} idx={idx} ExerciseWorkload={ExerciseWorkload}
            SwapDeleteIcons={SwapDeleteIcons} exercise={exercise}
            muscleImage={muscleImage} key={exercise.id} />);
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
                    return <SortableExercise key={idx} index={idx} exercise={exercise} idx={idx} muscleImage={muscleImage} />
                })}
        </div>
    ));
    return (
        <SortableList pressDelay={200} exercises={exercises} onSortEnd={({oldIndex, newIndex}) => moveExercise(oldIndex, newIndex, workout, userId)} />
    )
};

const mapStateToProps = createStructuredSelector({
    workout: selectWorkout,
    userId: selectCurrentUserId
})

const mapDispatchToProps = dispatch => ({
    moveExercise: (oldIndex, newIndex, workout, userId) => dispatch(moveExercise(oldIndex, newIndex, workout, userId, dispatch)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesList);