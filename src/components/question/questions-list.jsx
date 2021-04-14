import React from 'react';

import { Form } from 'antd';

import CustomRadio from '../antd/custom-inputs/custom-radio';
import CustomCheckbox from '../antd/custom-inputs/custom-checkbox';
import CustomInputNumber from '../antd/custom-inputs/custom-input-number';
import CustomDatePicker from '../antd/custom-inputs/custom-datepicker';
import CustomSlider from '../antd/custom-inputs/custom-slider';

const questionsData = {
    fitnessLevel: {
        beginner: <>{<span style={{fontWeight: 'bold'}}>Beginner:</span>}  I haven’t worked out
            seriously before and don’t have a
            routine in place.</>,
        intermediate: <>{<span style={{fontWeight: 'bold'}}>Intermediate:</span>} I have some 
            experience working out and train
            regularly.</>,
        advanced: <>{<span style={{fontWeight: 'bold'}}>Advanced:</span>} I know what I’m doing
        and have been training consistenly
        for over two years.</>
    },
    goal: {
        // weightLoss: <>{<span style={{fontWeight: 'bold'}}>Weight loss:</span>} short rest times,
        // circuit style training to maximize fat burn.</>,
        muscleGain: <>{<span style={{fontWeight: 'bold'}}>Muscle Hypertrophy:</span>} workouts focus
        on building muscle to improve aesthetics and strength.</>,
        strengthGain: <>{<span style={{fontWeight: 'bold'}}>Strength Training:</span>} longer rest times,
        small number of reps, increase power output consistenly.</>,
        endurance: <>{<span style={{fontWeight: 'bold'}}>Endurance Training:</span>} short rest times,
        high number of reps, improve cardio and functional performance.</>,
    },
    isMusclePrioritized: {
        true: <>{<span style={{fontWeight: 'bold'}}>Yes</span>} </>,
        false: <>{<span style={{fontWeight: 'bold'}}>No</span>} </>,
    },
    musclePriority: {
        1: <>{<span style={{fontWeight: 'bold'}}>Biceps</span>} </>,
        5: <>{<span style={{fontWeight: 'bold'}}>Triceps</span>} </>,
        4: <>{<span style={{fontWeight: 'bold'}}>Chest</span>} </>,
        12: <>{<span style={{fontWeight: 'bold'}}>Back</span>} </>,
        10: <>{<span style={{fontWeight: 'bold'}}>Quadriceps</span>} </>,
        11: <>{<span style={{fontWeight: 'bold'}}>Hamstrings</span>} </>,
        7: <>{<span style={{fontWeight: 'bold'}}>Calves</span>} </>,
        8: <>{<span style={{fontWeight: 'bold'}}>Glutes</span>} </>,
        2: <>{<span style={{fontWeight: 'bold'}}>Shoulders</span>} </>
    },
    gender: {
        male: <>{<span style={{fontWeight: 'bold'}}>Male</span>} </>,
        female: <>{<span style={{fontWeight: 'bold'}}>Female</span>} </>
    },
    privacy: {
        public: <>{<span style={{fontWeight: 'bold'}}>Public</span>} </>,
        private: <>{<span style={{fontWeight: 'bold'}}>Private</span>} </>
    }
}

export const fieldNames = ["fitnessLevel", "goal", "isMusclePrioritized", "trainingFrequency", "trainingDuration", "height", "weight", "birthday", "gender"]

export const questionsList = [
    {
        text: 'What is your Fitness Level?',
        input: <Form.Item className="profile-setup-input" rules={[{required: true,
            message: 'Please set fitness level!'}]} name={"fitnessLevel"}>
                <CustomRadio className="multi-choice-input" name={"fitnessLevel"}
                options={questionsData["fitnessLevel"]} />
            </Form.Item>,
    },
    {
        text: 'What is your main goal?',
        input: <Form.Item className="profile-setup-input" rules={[{required: true,
            message: 'Please set a goal!'}]} name={"goal"}>
                <CustomRadio className="multi-choice-input"
             options={questionsData["goal"]} name={"goal"} />
            </Form.Item>,
    },
    {
        text: 'Is there a muscle you want to prioritize?',
        input: <Form.Item className="profile-setup-input" rules={[{required: true,
            message: 'Set interest in specialization'}]} name={"isMusclePrioritized"}>
                <CustomRadio className="multi-choice-input"
             options={questionsData["isMusclePrioritized"]} name={"isMusclePrioritized"} />
            </Form.Item>,
    },
    {
        text: 'Choose muscles to prioritize:',
        input: <Form.Item className="profile-setup-input" rules={[{max: 2, type: "array",
            message: 'Maximum of 2 muscles'}]} name={"musclePriority"}>
                <CustomCheckbox className="multi-choice-input"
             options={questionsData["musclePriority"]} name={"musclePriority"} />
            </Form.Item>,
        name: "musclePriority"
    },
    {
        text: 'How many days/week do you want to train?',
        input: <Form.Item className="profile-setup-input" rules={[{required: true,
            message: 'Set training frequency'}]} name={"trainingFrequency"} key={"trainingFrequency"}>
                <CustomSlider className="question-input" min={1} max={7} name={"trainingFrequency"} />
            </Form.Item>,
    },
    {
        text: 'How long would you like your sessions to be (in minutes)?',
        input: <Form.Item className="profile-setup-input" rules={[{required: true,
            message: 'Set session length'}]} name={"trainingDuration"} key={"trainingDuration"}>
                <CustomSlider className="question-input" min={30} max={120} name={"trainingDuration"} />
            </Form.Item>,
    },
    {
        text: 'What are your stats?',
        input: <><Form.Item name={"height"} rules={[{required: true,
            message: 'Please set height'}]} key={"height"}><CustomInputNumber className="question-input"
                min={100} max={250} placeholder="height" name={"height"}
                formatter={value => `${value}cm`}
                parser={value => value.replace('cm', '')} /></Form.Item>
                <Form.Item name={"weight"} rules={[{required: true,
            message: 'Please set weight'}]} key={"weight"}><CustomInputNumber className="question-input"
                min={30} max={200} placeholder="weight" name={"weight"}
                formatter={value => `${value}kg`}
                parser={value => value.replace('kg', '')} /></Form.Item>
                <Form.Item rules={[{required: true, message: 'Please set birthday!'}]} 
                    name={"birthday"} key={"birthday"}><CustomDatePicker placeholder="Birthday" name="birthday" /></Form.Item>
                <Form.Item rules={[{required: true, message: 'Please set gender!'}]}
                    name={"gender"} key={"gender"}><CustomRadio className="multi-choice-input" name={"gender"}
                options={questionsData["gender"]} /></Form.Item><Form.Item rules={[{required: true, message: 'Please configure profile privacy!'}]}
                    name={"privacy"} key={"privacy"}><CustomRadio className="multi-choice-input" name={"privacy"}
                options={questionsData["privacy"]} /></Form.Item></>,
    }
]