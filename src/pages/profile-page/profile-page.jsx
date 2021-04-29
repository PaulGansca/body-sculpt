import React, { useState } from 'react';
import moment from 'moment';
import { Row, Col } from 'antd';
import Joyride from 'react-joyride';

import MusclesSore from '../../components/muscles-engaged/muscles-sore';
import CustomCollapse from '../../components/antd/custom-collapse/custom-collapse';
import WorkoutProgramOverview from '../../components/profile/workout-program-overview';
import ProfileDetails from '../../components/profile/profile-details';
import ExercisePerformance from '../../components/profile/exercise-performance';
import steps from './steps';

import './profile-page.css';

const ProfilePage = (props) => {
    const { workouts, currentUser, setProfileSettings, isSplitLoading, run, setRun } = props;
    const [activePanels, setActivePanels] = useState([]);
    const handlePanelChange = (panels) => setActivePanels(panels)
    const panels = [{
        content: <WorkoutProgramOverview setProfileSettings={setProfileSettings} isSplitLoading={isSplitLoading} {...currentUser} />, 
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
    const handleJoyrideCallback = (data) => {
        const { status, index, action, lifecycle } = data;
        if(index === 0 && action === "update" && lifecycle === "tooltip") handlePanelChange(["1"])
        if(index === 3 && action === "update" && lifecycle === "tooltip") handlePanelChange(["1", "2"])
        if(index === 6 && action === "update" && lifecycle === "tooltip") handlePanelChange(["1", "2", "3"])
        if(status === "finished" || status === "skipped") setRun(false);
        window.localStorage.setItem("profileTutorial", "complete");
    }

    return (
        <div className="profile-page">
            <Row>
                <Col xs={{ offset: 1, span: 22 }} md={{offset: 2, span: 20}} lg={{offset: 4, span: 16}}>
                    <MusclesSore fitnessLevel={currentUser.fitnessLevel}
                    recentWorkouts={workouts.filter(w => moment().subtract(7, 'd').isSameOrBefore(w.date))} />
                    <CustomCollapse activeKey={activePanels} onChange={handlePanelChange} ghost style={{marginTop: 24, borderRadius: 15}} panels={panels} />
                </Col>
            </Row>
            <Joyride
                callback={handleJoyrideCallback}
                continuous={true}
                run={run}
                scrollToFirstStep={true}
                getHelpers={Joyride.getHelpers}
                showProgress={true}
                showSkipButton={true}
                steps={steps}
                styles={{
                    options: {
                    zIndex: 10000,
                    },
                }}
                />
        </div>
    )
};

export default ProfilePage;