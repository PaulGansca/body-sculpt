//fitness literature references
//https://legionathletics.com/best-workout-splits/
//https://www.bodybuilding.com/content/the-ultimate-guide-to-an-effective-training-split.html
export const computeWorkoutType = 
    (trainingFrequency, trainingDuration, fitnessLevel, goal, musclePriority = []) => {
        // upper-lower takes long time only select if long sessions
        if(trainingDuration >= 60) {
            if(fitnessLevel === "intermediate" || fitnessLevel === "advanced") {
                if(trainingFrequency === 4) {
                    //upper-lower is best done 4 times a week and not for begginers
                    return "upperLower";
                }
                if(trainingFrequency >= 5 && goal !== "strengthGain") {
                    console.log("HERERE")
                    //for lifters who want to gain muscle mass or endurance
                    return "broSplit";
                }
                if(goal === "strengthGain") {
                    //for lifters who want to gain strength
                    return "fullBody";
                }
                //lifters who don't have many days to spend in the gym
                return "pushPullLegs";
            } else {
                if(musclePriority.length && trainingFrequency > 2) return "pushPullLegs";
                else return "fullBody";
            }
        } else {
            if(trainingDuration >= 40) {
                if(fitnessLevel === "intermediate" || fitnessLevel === "advanced") {
                    if(trainingFrequency >= 5 && goal !== "strengthGain") {
                        //for lifters who want to gain muscle mass or endurance
                        return "broSplit";
                    }
                    if((goal === "strengthGain" || musclePriority.length === 0 ) && trainingFrequency === 4) {
                        //for lifters who want to gain strength
                        return "upperLower";
                    }
                    //lifters who don't have many days to spend in the gym
                    if(trainingFrequency > 2) return "pushPullLegs";
                    else return "fullBody";
                }
                else {
                    if((trainingFrequency === 3 && goal !== "strengthGain") || trainingFrequency === 6 ) {
                        return "pushPullLegs"
                    }
                    if(trainingFrequency === 3 && goal === "strengthGain") {
                        return "fullBody"
                    }
                    if(trainingFrequency > 1) return "broSplit"
                    else return "fullBody";
                }
            } else return "fullBody"
        }

}

