import React from 'react';
import moment from 'moment';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import CustomAlert from '../antd/custom-alert/custom-alert';

const ExercisePerformanceChart = ({sets}) => {
    let allTimeMax = {max: 0};
    const data = sets.reduce((acc, set) => {
        const max = Math.round(set.weight * (1 + (set.reps/30)))
        if(!acc[set.datePerformed] || 
            acc[set.datePerformed].max < max) {
            acc[set.datePerformed] = {
                datePerformed: moment(set.datePerformed).format("DD-MM-YYYY"), //x axis
                reps: set.reps, // lines
                weight: set.weight, //y axis,
                max, // calculate 1 RM for y axis
                label: ``
            }
        }
        if(allTimeMax.max < max) allTimeMax = {...acc[set.datePerformed]}
        return acc;
    }, {});
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
          return (
            <div className="custom-tooltip">
              <p className="label">1RM of <b>{payload[0].payload.max} KGs</b></p>
              <p className="intro">Calculated from: {payload[0].payload.reps} reps X {payload[0].payload.weight} KGs</p>
            </div>
          );
        }
      
        return null;
      };
    const size = window.innerWidth < 1050 ? "100%" : (window.innerWidth > 1500 ? "75%" : "65%");
    return (
        <div className="exercise-performance-chart">
            <CustomAlert style={{width: size}} type={"info"} message={"1 Rep Max (RM)"} showIcon
            description={"Maximum weight you can lift for one rep, computed using Epley's formula: weight * (1 + reps / 30)"}  />
            <div className="chart-container">
                <ResponsiveContainer width={size} height={300}>
                    <LineChart
                        data={Object.keys(data).map(date => data[date])}
                        margin={{
                            top: 20,
                            right: 30,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis label={{ value: 'Date performed', position: 'insideBottom' }}
                        dataKey="datePerformed" />
                        <YAxis label={{ value: 'Calculated 1RM', angle: -90, position: 'insideLeft' }}
                        dataKey="max"/>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line name="1 Rep Max" type="monotone" dataKey="max" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
                <div className="record-display">
                    <p style={{fontWeight: 'bold'}}>All time Record:</p>
                    <p className="label">1RM of <b>{allTimeMax.max} KGs</b> on {allTimeMax.datePerformed}</p>
                    <p className="intro">Calculated from: {allTimeMax.reps} reps X {allTimeMax.weight} KGs</p>
                </div>
            </div>
        </div>
    )
};

export default ExercisePerformanceChart;