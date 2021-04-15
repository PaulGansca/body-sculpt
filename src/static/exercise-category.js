// shows relevant muscle ids from WGER api grouped by
// the general category an exercise belongs to 
export const exerciseCategory = {
    "Abs": { categoryId: 10, muscleIds: [6,14,3], isFront: true, "image_url_main": "/static/images/muscles/main/muscle-6.svg", },
    "Arms": { categoryId: 8, muscleIds: [1,5,13], isFront: true, "image_url_main": "/static/images/muscles/main/muscle-1.svg", },
    "Back": { categoryId: 12, muscleIds: [12,9], isFront: false, "image_url_main": "/static/images/muscles/main/muscle-12.svg", },
    "Calves": { categoryId: 14, muscleIds: [7,15], isFront: false, "image_url_main": "/static/images/muscles/main/muscle-7.svg", },
    "Chest": { categoryId: 11, muscleIds: [4], isFront: true, "image_url_main": "/static/images/muscles/main/muscle-4.svg", },
    "Legs": { categoryId: 9, muscleIds: [11,8,10], isFront: false, "image_url_main": "/static/images/muscles/main/muscle-11.svg", },
    "Shoulders": { categoryId: 13, muscleIds: [2], isFront: true, "image_url_main": "/static/images/muscles/main/muscle-2.svg",}
}

export const MAX_WORKLOAD = {beginner: 10, intermediate: 15, advanced: 20};

export const bestExercises = {
    6: [125, 91], // ABS
    12: [107, 109], // BACK
    1: [81, 74, 86], // Bicep
    4: [163, 192, 101], // Chest
    10: [105, 111, 113], // QUADS
    8: [191, 161, 249], // GLUTES
    11: [209, 160, 116], // HAMSTRINGS
    7: [308, 776, 102], // CALVES
    2: [227, 119, 802], //DELTS
    5: [217, 84, 85] //triceps
}


export const muscleNamesTaxonomy = {
    1: "Biceps",
    5: "Triceps",
    4: "Chest",
    12: "Back",
    10: "Quadriceps",
    11: "Hamstrings",
    7: "Calves",
    8: "Glutes",
    2: "Shoulders",
    13: "Elbow Flexor",
    14: "Obliques",
    6: "Abs",
    3: "Serratus Anterior",
    15: "Lower Calves",
    9: "Trapezius",
}