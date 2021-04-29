import React from 'react';
import { Link } from 'react-router-dom';

const steps = [
    {
      target: ".exercise-sets-list",
      content: `BodySculpt will automatically try to assign the ideal set number and
                Reps x Weight based on your performances and muscle fatigue, however
                these are only suggestions, adjust as necessary.`,
      placement: "bottom",
      title: "Exercise Page",
    },
    {
      target: ".exertion-rating-container",
      content: `RPE rating helps the system understand how difficult the set performed
                was for you.`,
      spotlightClicks: true,
      placement: "top"
    },
    {
        target: ".swap-exercise-btn",
        content: `If this exercise isn't for you, swap with simillar alternatives`,
    },
    {
        target: ".exercise-chart-container",
        content: `View past performances and all time records on this exercise`,
        spotlightClicks: true,
        placement: "top"
    },
    {
        target: ".exercise-info-icon",
        content: `Click here to view exercise information, tips and muscles used`,
        disableOverlayClose: true,
    },
    {
        target: "body",
        content: <>You are now ready to start your workout any 
                time. {" "}<Link to='/user/workout/new'>Go back to workout</Link></>,
        placement: "center",
      },
]

export default steps;