import React, { useRef, useState } from 'react';
import { Form } from 'antd';
import { CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';

import CustomProgress from '../../components/antd/custom-progress-bar/custom-progress-bar';
import Question from '../../components/question/question';
import { questionsList, fieldNames } from '../../components/question/questions-list';
import CustomCarousel from '../../components/antd/custom-carousel/custom-carousel';
import CustomButton from '../../components/antd/custom-button/custom-button';
import CustomSpace from '../../components/antd/custom-space/custom-space';


import './profile-setup.css';

const ProfileSetupPage = (props) => {
    const carouselQuestion = useRef(null);
    const formRef = useRef(null);
    const [formQuestionsList, setFormQuestionsList] = useState(questionsList.filter(q => q.name !== "musclePriority"));
    const [formProgress, setFormProgress] = useState(0);

    const {currentUser, setUserGoals, history} = props;

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
        const touchedFields = fieldNames.filter(name => formRef.current.isFieldTouched(name))
        formRef.current.validateFields(touchedFields)
            .then(result => {
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
        values.birthday = values.birthday.toDate();
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
        <Form name="profileSetup" onFinish={onFinish} onFinishFailed={onFinishFailed}
            onValuesChange={handleValuesChange} ref={formRef}
            initialValues={{weight: 70, height: 180}}>
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
        </Form>
      </div>
    );
};

//form styling trainFreq, session length, stats

export default ProfileSetupPage;