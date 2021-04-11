export const WORKOUT_SPLITS_DAYS = {
    broSplit: [
        {name: "Arms", muscleIds: [1,5], startingOrder: [1,5], category: [8]},
        {name: "Back", muscleIds: [12], startingOrder: [12], category: [12]},
        {name: "Chest", muscleIds: [4], startingOrder: [4], category: [11]},
        {name: "Legs", muscleIds: [11,8,10,7], startingOrder: [11,10], category: [9,14]},
        {name: "Shoulders", muscleIds: [2], startingOrder: [2], category: [13]},
    ],
    upperLower: [
        {name: "Upper", muscleIds: [1,5,12,4,2], startingOrder: [4,12,2], category: [8,12,11,13]},
        {name: "Lower", muscleIds: [11,8,10,7], startingOrder: [11,10], category: [9,14]},
    ],
    pushPullLegs: [
        {name: "Push", muscleIds: [4,5,2], startingOrder: [4,2], category: [11,8,13]},
        {name: "Pull", muscleIds: [12,1], startingOrder: [12], category: [12,8]},
        {name: "Legs", muscleIds: [11,8,10,7], startingOrder: [11,10], category: [9,14]},
    ],
    fullBody: [
        {name: "FullBody", muscleIds: [1,5,12,4,2,11,8,10,7], startingOrder: [11,10,4,12], category: [8,12,11,13,9,14]}
    ],
};

export const SPLIT_INFORMATION = {
    broSplit: {
        title: "Body Part Split",
        information: `It's a simple workout split which works best for intermediate and advanced lifters.
                      It gives special emphasis to upper body muscles, as each major muscle group is trained
                      on a designated day. This advanced-level split enables you to increase volume and intensity
                      to maximum levels without having to worry about leaving anything in the tank for a body part
                      to follow. Each muscle group is trained when it's rested, so there's no prefatigue 
                      to limit your volume and intensity.`
    },
    upperLower: {
        title: "Upper Lower Split",
        information: `As you can probably glean from the name, it splits training into two different types of workouts:
                      upper-body workouts and lower-body workouts. Normally, the upper/lower split has you working out
                      in the gym four days per week—two upper-body days and two lower-body days. Few training splits are
                      as versatile as the upper/lower split, which means there are many ways to program your exercises
                      into each day. This an intense split as you have to hit multiple muscle groups hard in the same
                      session and requires warming up multiple times.`
    },
    pushPullLegs: {
        title: "Push Pull Legs Split",
        information: `The push pull legs (PPL) split has been around for decades and is one of the most proven workout
                      splits of all time. While it’s often the chosen split for new gymgoers, it works perfectly well
                      for more advanced lifters looking to gain muscle and strength, too. The main idea of PPL is:
                      on push days you train pushing muscles (Chest, Shoulders, Triceps), on pull days you train pulling
                      muscles (Back, Biceps) and on leg days you train all the leg muscles (Glutes, Quadriceps, Hamstrings
                      , Calves). It allows you to train muscles that work in pairs in one day giving a break to other groups.`
    },
    fullBody: {
        title: "Fullbody Split",
        information: `Training every major muscle group in a single workout is usually the domain of beginners, most often
                      characterized by a single exercise per body part for just a few sets. One of the primary reasons the
                      volume is kept intentionally low per muscle group is that the primary adaptations made by beginners
                      come via the nervous system. You teach your body to activate and utilize more muscle fibers, rather
                      than realizing physical gains in fiber size and strength. This requires greater frequency, and since
                      the volume of work is so low, this workout should ideally be repeated three times per week, with 48
                      hours between workouts. They are also the basis of strength gain programms due to the frequency you
                      can train lifting techniques in a week. If you’re new to weightlifting, looking to get strong,
                      pressed for time this is ideal.`
    }
}

export const REP_RANGE_BY_GOAL = {
    "strengthGain": {
        start: [3,5],
        mid: [6,7,8],
        end: [10]
    },
    "muscleGain": {
        start: [8],
        mid: [9,10,11],
        end: [12,15]
    },
    "endurance": {
        start: [13,14],
        mid: [15,18,20],
        end: [20,25]
    }
}

// % of 1 rep max
export const INTENSITY_BY_REPS = {
    1: 1,
    3: 0.95,
    5: 0.90,
    6: 0.85,
    12: 0.67,
    15: 0.58,
}

/*

Recommended Training Volumes to Achieve Specific Goals

Training Goal       Repetitions        Intensity (% 1-RM)

Endurance               ≥ 12                ≤ 67%

Hypertrophy            6 - 12              67 - 85%

Maximum Strength        ≤ 6                 ≥ 85%

Reference:  NSCA Essentials of Strength Training and Conditioning (3rd ed.) 2008.

*/