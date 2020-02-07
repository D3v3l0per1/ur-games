const functions = require('firebase-functions');
const app = require('express')();

const FBAuth = require('./util/FBAuth');

const { getAllGames, PostAGame } = require('./handlers/games');
const { signup, login } = require('./handlers/users');

// Games Routes
app.get('/games', getAllGames);
app.post('/game', FBAuth, PostAGame);

// User Routes
app.post('/signup', signup);
app.post('/login', login);

exports.api = functions.region('europe-west1').https.onRequest(app);
