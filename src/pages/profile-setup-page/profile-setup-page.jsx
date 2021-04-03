import React, { useRef, useState } from 'react';
import { CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';
import moment from 'moment';

import CustomProgress from '../../components/antd/custom-progress-bar/custom-progress-bar';
import Question from '../../components/question/question';
import { questionsList, fieldNames } from '../../components/question/questions-list';
import CustomCarousel from '../../components/antd/custom-carousel/custom-carousel';
import CustomButton from '../../components/antd/custom-button/custom-button';
import CustomSpace from '../../components/antd/custom-space/custom-space';
import CustomForm from '../../components/antd/custom-form/custom-form';
import { computeWorkoutType } from '../../workout-creation/compute-workout-type';


import './profile-setup.css';

const ProfileSetupPage = ({currentUser, setUserGoals, history}) => {
    const carouselQuestion = useRef(null);
    const formRef = useRef(null);
    const initialValues = currentUser.goalSet ?
        {...currentUser, birthday: moment(new Date(currentUser.birthday.seconds * 1000))} 
        : {weight: 70, height: 180};
    const [formQuestionsList, setFormQuestionsList] = useState(questionsList.filter(q => q.name !== "musclePriority"));
    const [formProgress, setFormProgress] = useState((Object.keys(initialValues).length/fieldNames.length)*100);

    const handleValuesChange = (changedValues, allValues) => {
        //handle conditional show of muscles to prioritize
        if(changedValues.isMusclePrioritized) {
            if(changedValues.isMusclePrioritized === "false") {
                setFormQuestionsList(questionsList.filter(q => q.name !== "musclePriority"))
            } else if(changedValues.isMusclePrioritized === "true") {
                setFormQuestionsList(questionsList)
            }
            carouselQuestion.current.goTo(2, false);
        }
        const touchedFields = Object.keys(formRef.current.getFieldsValue(true))
        formRef.current.validateFields(touchedFields)
            .then(result => {
                console.log(result)
                const validFields = Object.keys(result); 
                setFormProgress(validFields.length/fieldNames.length*100);
            })
            .catch(err => {
                let progress = touchedFields.length
                progress = progress - err.errorFields.length;
                setFormProgress(progress/fieldNames.length*100);
            });
    }

    const onFinish = (values) => {
        console.log('Success:', values);
        const { trainingFrequency, trainingDuration, fitnessLevel, goal, musclePriority } = values;
        values.birthday = values.birthday.toDate();
        values.splitType = computeWorkoutType(trainingFrequency, trainingDuration, fitnessLevel, goal, musclePriority)
        try {
            setUserGoals(currentUser.id, values, history)
        } catch (e){
            alert(e);
        }
      };
    const onFinishFailed = (errorInfo) => {
        //scroll to first error
        const firstErrorName = errorInfo.errorFields[0].name[0];
        let firstErrorIdx = fieldNames.findIndex(n => n === firstErrorName);
        firstErrorIdx = firstErrorIdx > 4 ? 5 : firstErrorIdx;
        carouselQuestion.current.goTo(firstErrorIdx, false);
    };
    return (
      <div className="profile-setup-page">
        <CustomProgress className="setup-progress" style={{marginTop: '5vh'}}
            percent={formProgress} steps={fieldNames.length} size="large" strokeColor="#52c41a"
            format={(percent) => 'Profile Setup'} />
        <CustomForm name="profileSetup" onFinish={onFinish} onFinishFailed={onFinishFailed}
            onValuesChange={handleValuesChange} ref={formRef}
            initialValues={initialValues}>
            <CustomCarousel effect={"fade"} customRef={carouselQuestion} dots={false}>
                {formQuestionsList.map((question, idx) =>
                    <Question key={idx} question={question}/>  
                )}
            </CustomCarousel>
            <CustomSpace size={"middle"}>
                <CustomButton shape="round"
                    onClick={() => carouselQuestion.current.prev()}>{<CaretLeftOutlined />}</CustomButton>
                <CustomButton htmlType="submit" shape="round">Submit</CustomButton>
                <CustomButton shape="round"
                    onClick={() => carouselQuestion.current.next()}>{<CaretRightOutlined />}</CustomButton>
            </CustomSpace>
        </CustomForm>
      </div>
    );
};

//form styling trainFreq, session length, stats

export default ProfileSetupPage;