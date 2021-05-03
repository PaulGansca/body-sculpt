import React from 'react';
import moment from 'moment';
import { Descriptions } from 'antd';
import { Link } from 'react-router-dom';

import CustomButton from '../antd/custom-button/custom-button'

const ProfileDetails = ({displayName, email, fitnessLevel, birthday, goal,
    isMusclePrioritized, musclePriority, weight, height, gender,
    trainingDuration, trainingFrequency}) => {
    return (
        <div className="profile-details">

            <Descriptions extra={<CustomButton type="link"><Link to="/user/profile-setup">Configure Profile</Link></CustomButton>}>
                <Descriptions.Item label="Display Name">{displayName}</Descriptions.Item>
                <Descriptions.Item label="Email">{email}</Descriptions.Item>
                <Descriptions.Item label="Birthday">{moment(new Date(birthday.seconds * 1000)).format("Do of MMM YYYY")}</Descriptions.Item>
                <Descriptions.Item label="Fitness Level">{fitnessLevel}</Descriptions.Item>
                <Descriptions.Item label="Goal">{goal}</Descriptions.Item>
                <Descriptions.Item className="muscles-prioritized-label" label="Prioritize Muscles?">{isMusclePrioritized ? "Yes" : "No"}</Descriptions.Item>
                {isMusclePrioritized ? <Descriptions.Item label="Muscles Prioritized">{musclePriority}</Descriptions.Item> : <></>}
                <Descriptions.Item label="Weight">{weight}</Descriptions.Item>
                <Descriptions.Item label="Height">{height}</Descriptions.Item>
                <Descriptions.Item label="Gender">{gender}</Descriptions.Item>
                <Descriptions.Item label="Session Length">{trainingDuration}</Descriptions.Item>
                <Descriptions.Item label="Sessions/Week">{trainingFrequency}</Descriptions.Item>
            </Descriptions>
        </div>
    )
};

export default ProfileDetails;