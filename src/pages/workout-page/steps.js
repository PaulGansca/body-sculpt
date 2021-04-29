const steps = [
    {
      target: "body",
      content: `BodySculpt has generated your first workout based on your preferences.
                This tutorial will explain how this page works.`,
      title: "Welcome Tour",
      placement: "center",
    },
    {
      target: ".workout-header",
      content: "This panel contains the muscles targetted in today's session",
    },
    {
        target: ".exercises-list",
        content: `This is the list of exercises you have been assigned for today.
                  You can reorder exercises through drag & drop.`,
    },
    {
        target: ".new-workout-btn",
        content: `You can always generate a new training session if this one isn't for you.`,
    },
    {
        target: ".add-exercise-btn",
        content: `Or just add any exercise you want`,
    },
    {
        target: ".swap-exercise-btn",
        content: `You can swap exercises you don't like with simillar alternatives`,
    },
    {
        target: ".delete-exercise-btn",
        content: `Or delete any exercise from the workout`,
    },
    {
        target: ".exercise-list-item",
        content: `Click an exercise to view more information or
                  to start logging sets once workout is in progress`,
        spotlightClicks: true,
        disableOverlayClose: true,
    },
    {
        target: ".toggle-state-btn",
        content: `When ready click Start Workout to begin`,
        disableOverlayClose: true,
    },
]

export default steps;