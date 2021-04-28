/**
 * "dependencies": {
    "nodemailer": "^6.5.0",
    "@google-cloud/firestore": "^3.7.4",
    "firebase-admin": "^8.10.0",
    "firebase-functions": "^3.6.0",
    "moment": "^2.29.1"
  }
 */


/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
const nodemailer = require('nodemailer');
const moment = require('moment')
const Firestore = require('@google-cloud/firestore');
const PROJECTID = "body-sculpt-5ab47";
const COLLECTION_NAME = "users";
const firestore = new Firestore({
  projectId: PROJECTID,
  timestampsInSnapshots: true,
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
  }
});

exports.sendReminder = async (req, res) => {
  let dayNumber = moment().day();
  //let message = req.query.message || req.body.message || 'Hello World!';
  const data = [];
  try {
    const users = await firestore.collection(COLLECTION_NAME)
                    .where('workoutReminders', '==', true)
                    .where(`trainingDays.${dayNumber}`, '==', true)
                    .get();
    if (users.empty) {
        res.status(404).send({ error: 'Unable to find the document' });
    }
    users.forEach(r => {
      const user = r.data();
      //EMAIL SENDING WORKS
      transporter.sendMail({
        from: process.env.EMAIL_USERNAME, // sender address
        to: user.email, // list of receivers
        subject: "Workout Reminder 💪", // Subject line
        text: "You have scheduled a training session today, don't forget to show up! :)", // plain text body
        html: `<p>Hello ${user.displayName}, <br/><br/> You have a scheduled 
        <a target="_blank" href="https://body-sculpt-5ab47.web.app/user/workout/new">training session</a> 
        for today, don't forget to show up! :)</p>
        <p>Kind regards, <br/><br/> Team BodySculpt</p>`, // html body

      }).then(info => {
        console.log({info});
        //res.status(200).send("EMAIL SENT");
      }).catch(console.error);
    })
    res.status(200).send("EMAIL SENT");
  } catch (err) {
      return res.status(404).send({ error: 'Unable to retrieve the document' });
  }
};
