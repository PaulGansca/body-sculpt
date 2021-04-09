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