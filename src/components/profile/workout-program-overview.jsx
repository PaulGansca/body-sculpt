import React, { useState } from 'react';
import _ from 'lodash';
import { SwapOutlined } from '@ant-design/icons';

import WorkoutReminders from '../workout-reminders/workout-reminders';
import CustomTag from '../antd/custom-tag/custom-tag';
import CustomButton from '../antd/custom-button/custom-button';
import CustomTooltip from '../antd/custom-tooltip/custom-tooltip';
import CustomModal from '../antd/custom-modal/custom-modal';
import CustomAlert from '../antd/custom-alert/custom-alert';
import CustomSelect from '../antd/custom-inputs/custom-select';
import { SPLIT_INFORMATION } from '../../static/workout-splits-days';
import { USER_DATA_TAXONOMY } from '../../static/user-data-taxonomy';
import { muscleNamesTaxonomy } from '../../static/exercise-category';

import './profile.css';

const WorkoutProgramOverview = ({goal, fitnessLevel, isMusclePrioritized, musclesPrioritized,
        splitType, trainingFrequency, isSplitLoading, setProfileSettings, id}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(splitType);
    const options = Object.keys(SPLIT_INFORMATION).map(split => ({
        props: {value: split, key: split},
        text: SPLIT_INFORMATION[split].title
    }))
    return (
        <div className="workout-program">
            <h1>{SPLIT_INFORMATION[splitType].title}
                <CustomTooltip title={"Choose a different training program."}>
                        <CustomButton style={{position: 'relative', top: -5, left: 5}} onClick={() => setIsModalVisible(true)} 
                            size={"small"} shape={"round"} icon={<SwapOutlined />} />
                </CustomTooltip>
            </h1>
            <CustomModal visible={isModalVisible} onOk={() => {setProfileSettings(id, {splitType: selectedOption}); setIsModalVisible(false);}}  
                confirmLoading={isSplitLoading} onCancel={() => setIsModalVisible(false)}>
                Available programs: <CustomSelect style={{width: 200, marginBottom: 15}} defaultValue={selectedOption} placeholder={"Select Program"}
                    options={options} onSelect={(split) => setSelectedOption(split)} />
                <CustomAlert type="info" description={SPLIT_INFORMATION[selectedOption].information} />
            </CustomModal>
            <p className="workout-description">{SPLIT_INFORMATION[splitType].information}</p>
            <p>Goal: <CustomTag color={'#2db7f5'}>{USER_DATA_TAXONOMY.goal[goal]}</CustomTag></p>
            <p>Experience Level: <CustomTag color={'#2db7f5'}>{_.capitalize(fitnessLevel)}</CustomTag></p>
            {isMusclePrioritized === "true" ? <p>Emphasising training: {' '}
                {musclesPrioritized.map(m => <CustomTag color={'#2db7f5'}>{muscleNamesTaxonomy[m]}</CustomTag>)}
            </p> : <></>}
            <p>Training Frequncy: <CustomTag color={'#2db7f5'}>{trainingFrequency} x Week</CustomTag></p>
            <WorkoutReminders setProfileSettings={setProfileSettings} userId={id} />
        </div>
    )
};

export default WorkoutProgramOverview;