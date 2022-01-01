const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
  exports.createStripe = functions.firestore.document('/users/{documentID}')
  .onCreate(async (snap, context) => {
    if(snap.data().profession[0])
    {
      // Set your secret key. Remember to switch to your live secret key in production.
      // See your keys here: https://dashboard.stripe.com/apikeys
      
      console.log(db.collection('secret').get());
      let fbKey = await db.collection('secret').get().catch(err => {return});
      fbKey = fbKey.docs[0].data();
      const stripe = require('stripe')(fbKey.key);

      const account = await stripe.accounts.create({type: 'standard'});

      const accountLink = await stripe.accountLinks.create({
        account: fbKey.userID,
        refresh_url: 'https://higherplace.co/ArtistSignUp',
        return_url: 'https://higherplace.co/profile',
        type: 'account_onboarding',
      });
      
    }
    return;

  });

