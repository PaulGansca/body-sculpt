import React from 'react';
import moment from 'moment';
import { Row, Col } from 'antd';

import MusclesSore from '../../components/muscles-engaged/muscles-sore';
import CustomCollapse from '../../components/antd/custom-collapse/custom-collapse';
import WorkoutProgramOverview from '../../components/profile/workout-program-overview';
import ProfileDetails from '../../components/profile/profile-details';
import ExercisePerformance from '../../components/profile/exercise-performance';

import './profile-page.css';

const ProfilePage = (props) => {
    const { workouts, currentUser } = props;
    console.log(currentUser);
    const panels = [{
        content: <WorkoutProgramOverview />, 
        props: {header: "Workout style overview", key: "1",
                className: "profile-page-panel"}
    }, {
        content: <ProfileDetails {...currentUser} />, 
        props: {header: "Account", key: "2",
                className: "profile-page-panel"}
    }, {
        content: <ExercisePerformance workouts={workouts} />, 
        props: {header: "Exercise Perfomance", key: "3",
                className: "profile-page-panel"}
    }];
    return (
        <div className="profile-page">
            <h1>User: {currentUser.displayName}</h1>
            <Row>
                <Col xs={{ offset: 1, span: 22 }} md={{offset: 2, span: 20}} lg={{offset: 4, span: 16}}>
                    <MusclesSore fitnessLevel={currentUser.fitnessLevel}
                    recentWorkouts={workouts.filter(w => moment().subtract(7, 'd').isSameOrBefore(w.date))} />
                    <CustomCollapse ghost style={{marginTop: 24, borderRadius: 15}} panels={panels} />
                </Col>
            </Row>
        </div>
    )
};

export default ProfilePage;