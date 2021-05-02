/**
 *   "dependencies": {
    "@google-cloud/firestore": "^3.7.4",
    "firebase-admin": "^8.10.0",
    "firebase-functions": "^3.6.0"
  }
 */

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

const Firestore = require('@google-cloud/firestore');
const PROJECTID = "body-sculpt-5ab47";
const admin = require('firebase-admin');
const serviceAccount = require("./admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount.admin)
});
const COLLECTION_NAME = "leaderboard";
// const firestore = new Firestore({
//   projectId: PROJECTID,
//   timestampsInSnapshots: true,
// });

async function deleteQueryBatch(db, query, resolve) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(db, query, resolve);
  });
}

async function deleteCollection(db, collectionPath) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy('__name__')

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve).catch(reject);
  });
}

exports.wipeLeaderboard = (req, res) => {
  let message = req.query.message || req.body.message || 'Hello World!';
  deleteCollection(firestore,COLLECTION_NAME)
    .then(() => res.status(200).send("WIPED DB"))
    .catch(err => resstatus(400).send(err))
};
