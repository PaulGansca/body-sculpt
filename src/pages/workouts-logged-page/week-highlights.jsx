import React from 'react';
import { Statistic } from 'antd';
import { ArrowUpOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';

import CustomCard from '../../components/antd/custom-card/custom-card';
import CustomTooltip from '../../components/antd/custom-tooltip/custom-tooltip';
import CustomSpace from '../../components/antd/custom-space/custom-space';

const WeekHighlights = ({streak, countWorkoutsInWeek, canReachWeeklyTarget, trainingFrequency, workoutsInWeek, weight}) => {
    console.log(workoutsInWeek);
    const minutesTrained = Math.round(workoutsInWeek.reduce((acc, w) => acc += parseFloat(w.timeElapsed.substring(0,w.timeElapsed.indexOf(":"))), 0));
    const calories = minutesTrained * (3*3.5*weight) / 200
    return (
        <CustomCard style={{marginBottom: 20}} >
            <CustomSpace wrap={true} size={"large"}>
                <Statistic
                        title="Training Streak"
                        value={streak}
                        style={{marginRight: 20}}
                        valueStyle={{ color: streak > 0 ? '#3f8600' : '' }}
                        prefix={<ArrowUpOutlined />}
                        suffix="weeks"
                    />
                <Statistic
                    title="Sessions / week"
                    value={`${countWorkoutsInWeek}/${trainingFrequency}`}
                    valueStyle={{ color: canReachWeeklyTarget ? '#3f8600' : '#cf1322' }}
                    suffix={canReachWeeklyTarget ? 
                        <CustomTooltip title={`You are on track to hit your weekly session goal`}><LikeOutlined /></CustomTooltip> : 
                        <CustomTooltip title={`You won't be able to hit your weekly session goal`}><DislikeOutlined /></CustomTooltip>}
                />
                <Statistic
                    title="Calories burned / week"
                    value={Math.round(calories)}
                    valueStyle={{ color: 'rgb(255 188 0)' }}
                    suffix="kcal"
                />
                <Statistic
                    title="Minutes trained / week"
                    value={minutesTrained}
                    suffix="minutes"
                />
            </CustomSpace>
        </CustomCard>
    )
};

export default WeekHighlights;