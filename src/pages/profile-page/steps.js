const steps = [
    {
      target: "body",
      content: `From here you can view muscle recovery, training style,
                change account settings and view achievements`,
      placement: "center",
      title: "Profile Page",
    },
    {
        target: ".muscles-overview-section",
        content: `Keep track of muscle recovery to avoid overtraining`,
        placement: "bottom",
    },
    {
        target: ".workout-program",
        content: `Training style chosen by BodySculpt which workout generation follows.
                  Reasoning is included for each style.`,
        placement: "top",
    },
    {
        target: ".workout-program .ant-btn",
        content: `You can always choose a different routine by clicking this button.`,
        placement: "top",
    },
    {
        target: ".workout-program div",
        content: `Configure workout email reminders and make sure you never forget about a training session`,
        placement: "top",
    },
    {
        target: ".profile-details",
        content: `View your profile information at a glance`,
        placement: "top",
    },
    {
        target: ".profile-details .ant-btn",
        content: `You can always update your training preferences by clicking configure profile`,
        placement: "top",
    },
    {
        target: ".exercise-performance",
        content: `View past performances and all time records on any exercise`,
        placement: "top",
    },
    {
        target: ".exercise-performance a",
        content: `Check how you compare to others on a weekly basis leader board`,
        placement: "top",
    },
]

export default steps;