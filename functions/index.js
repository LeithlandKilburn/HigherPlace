const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')();
const app = express();
const cors = require('cors')({origin: "http://localhost:3000"});


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const validateUser = async (req, res, next) => 
{
  // Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
  // The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
  // `Authorization: Bearer <Firebase ID Token>`.
  // when decoded successfully, the ID Token content will be added as `req.user`.
    
  functions.logger.log('Check if request is authorized with Firebase ID token');

  if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
  !(req.cookies && req.cookies.__session)) 
  {
    functions.logger.error(
      'No Firebase ID token was passed as a Bearer token in the Authorization header.',
      'Make sure you authorize your request by providing the following HTTP header:',
      'Authorization: Bearer <Firebase ID Token>',
      'or by passing a "__session" cookie.'
    );
    res.status(403).send('Unauthorized');
  }

  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) 
  {
    functions.logger.log('Found "Authorization" header');
    functions.logger.log(req.body);
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else if(req.cookies) 
  {
    functions.logger.log('Found "__session" cookie');
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else 
  {
    // No cookie
    res.status(403).send('Unauthorized');
  }
  
  try 
  {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    functions.logger.log('ID Token correctly decoded', decodedIdToken);
    req.user = decodedIdToken;
    next();
  } catch (error) 
  {
    functions.logger.error('Error while verifying Firebase ID token:', error);
    res.status(403).send('Unauthorized');
  }
}
/*STRIPE ONBOARDING. STRIPE ONBOARDING. STRIPE ONBOARDING. STRIPE ONBOARDING. STRIPE ONBOARDING. STRIPE ONBOARDING. STRIPE ONBOARDING.
STRIPE ONBOARDING. STRIPE. ONBOARDING STRIPE. ONBOARDING STRIPE. ONBOARDING STRIPE. ONBOARDING STRIPE. ONBOARDING. STRIPE ONBOARDING.*/
const onboardStripe = async (req, res) =>
{
  let fbKey = await db.collection('secret').get().catch(err => {return});
    fbKey = fbKey.docs ? fbKey.docs[0].data() : "exit this function";
    if (fbKey === "exit this function")
    {
      res.send("Failed");
    }
    const stripe = require('stripe')(fbKey.key);

    //Create Strip account and store Stripe ID. Create Strip account and store Stripe ID. Create Strip account and store Stripe ID.
    const account = await stripe.accounts.create(
    {
      type: 'standard',
      country: req.body.country,
      email: req.body.email,
    });
    functions.logger.log(account);
    functions.logger.log(account.id);
    await db.collection('users').doc(req.body.uid).update({stripeID: account.id});

    //Create AccountLink and send user there. Create AccountLink and send user there. Create AccountLink and send user there.
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: 'https://higherplace.co/StripeOnboard',
      return_url: 'https://higherplace.co/profile',
      type: 'account_onboarding',
    });
    res.send(accountLink.url);
}

/*RETRIEVE STRIPE ID. RETRIEVE STRIPE ID. RETRIEVE STRIPE ID. RETRIEVE STRIPE ID. RETRIEVE STRIPE ID. RETRIEVE STRIPE ID. RETRIEVE STRIPE ID.
RETRIEVE STRIPE ID. RETRIEVE STRIPE ID. RETRIEVE STRIPE ID. RETRIEVE STRIPE ID. RETRIEVE STRIPE ID. RETRIEVE STRIPE ID. RETRIEVE STRIPE ID.*/
const getAccount = async (req, res) =>
{
  //Get API Key. Get API Key. Get API Key. Get API Key. Get API Key.  Get API Key. Get API Key. Get API Key. Get API Key. Get API Key. 
  let fbKey = await db.collection('secret').get().catch(err => {return});
  fbKey = fbKey.docs ? fbKey.docs[0].data() : "exit this function";
  if (fbKey === "exit this function"){return};
  const stripe = require('stripe')(fbKey.key);

  //See if the user has completed onboarding. See if the user has completed onboarding. See if the user has completed onboarding.
  const account = await stripe.accounts.retrieve(req.query.id);
  res.send({"onboarded": `${account.charges_enabled}`});
}

const retryOnboarding = async (req, res) =>
{
  //Get API Key. Get API Key. Get API Key. Get API Key. Get API Key.  Get API Key. Get API Key. Get API Key. Get API Key. Get API Key. 
  let fbKey = await db.collection('secret').get().catch(err => {return});
  fbKey = fbKey.docs ? fbKey.docs[0].data() : "exit this function";
  if (fbKey === "exit this function"){return};
  const stripe = require('stripe')(fbKey.key);

  //Create AccountLink and send user there. Create AccountLink and send user there. Create AccountLink and send user there.
  const accountLink = await stripe.accountLinks.create({
    account: req.body.accID,
    refresh_url: 'https://higherplace.co/StripeOnboard',
    return_url: 'https://higherplace.co/profile',
    type: 'account_onboarding',
  });
  
  res.json({ "url" : accountLink.url});
}

//EXPRESS MIDDLEWARE. EXPRESS MIDDLEWARE. EXPRESS MIDDLEWARE. EXPRESS MIDDLEWARE. EXPRESS MIDDLEWARE. EXPRESS MIDDLEWARE. EXPRESS MIDDLEWARE.
app.use(cookieParser, cors, validateUser); 
app.use(bodyParser.urlencoded({extended: false}));

//EXPRESS ROUTES. EXPRESS ROUTES. EXPRESS ROUTES. EXPRESS ROUTES. EXPRESS ROUTES. EXPRESS ROUTES. EXPRESS ROUTES. EXPRESS ROUTES. EXPRESS ROUTES.
app.post('/createStripe', async (req, res) =>
{
  functions.logger.log(req, 'RUNNING ONBOARDING STRIPE POST REQUEST');
  let fbKey = await db.collection('secret').get().catch(err => {return});
    fbKey = fbKey.docs ? fbKey.docs[0].data() : "exit this function";
    if (fbKey === "exit this function")
    {
      res.send("Failed");
    }
    const stripe = require('stripe')(fbKey.key);

    //Create Strip account and store Stripe ID. Create Strip account and store Stripe ID. Create Strip account and store Stripe ID.
    const account = await stripe.accounts.create(
    {
      type: 'standard',
      country: req.body.country,
      email: req.body.email,
    });
    functions.logger.log(account);
    functions.logger.log(account.id);
    await db.collection('users').doc(req.body.uid).update({stripeID: account.id});

    //Create AccountLink and send user there. Create AccountLink and send user there. Create AccountLink and send user there.
    /*const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: 'https://higherplace.co/StripeOnboard',
      return_url: 'https://higherplace.co/profile',
      type: 'account_onboarding',
    });*/

    functions.logger.log(res);
    functions.logger.log(res.header);
    res.json({ "url" : accountLink.url});
});

app.get('/createStripe', getAccount);
app.patch('/createStripe', retryOnboarding);

//GOOGLE CLOUD FUNCTIONS. GOOGLE CLOUD FUNCTIONS. GOOGLE CLOUD FUNCTIONS. GOOGLE CLOUD FUNCTIONS. GOOGLE CLOUD FUNCTIONS. GOOGLE CLOUD FUNCTIONS.
exports.onboardStripe = functions.https.onRequest(app);