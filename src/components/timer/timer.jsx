import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';


import { updateTimeElapsed } from '../../redux/workout/workout.actions';
import { selectTimeElapsed } from '../../redux/workout/workout.selectors';

const Timer = (props) => {
    const { timeElapsed = "0:0", workoutState, updateTimeElapsed, display } = props;
    const colonIdx = timeElapsed.indexOf(":");
    const minutes = parseInt(timeElapsed.substring(0,colonIdx));
    const seconds =  parseInt(timeElapsed.substring(colonIdx+1));
    useEffect(()=>{
        let myInterval = setInterval(() => {
                if(workoutState === "in progress") {
                    if (seconds < 59) {
                        updateTimeElapsed(`${minutes < 10 ? `0${minutes}` : minutes}:${seconds + 1 < 10 ?  `0${seconds + 1}` : seconds + 1}`)
                    }
                    if (seconds === 59) {
                        updateTimeElapsed(`${minutes + 1 < 10 ? `0${minutes + 1}` : minutes + 1}:00`)
                    }
                }
            }, 1000)
        return ()=> {
                clearInterval(myInterval);
              };
        });
    return (
        <span style={{...display}}>Time Elapsed: { minutes === 0 && seconds === 0
            ? <span>00:00</span>
            : <span> {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</span> 
        }</span>
    );
};

const mapStateToProps = createStructuredSelector({
    timeElapsed: selectTimeElapsed,
})

const mapDispatchToProps = dispatch => ({
    updateTimeElapsed: (timeElapsed) => dispatch(updateTimeElapsed(timeElapsed))
});


const TimerHoc = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Timer);

export default TimerHoc;