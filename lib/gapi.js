var googleapis = require('googleapis')
var OAuth2Client = googleapis.OAuth2Client
var client = '396408363131-14fn0vdrl14taohaabiooboqe8u2p4p7.apps.googleusercontent.com'
var secret = '0I5zd108-BREAL1TSp67Q4e8'
var redirect = 'http://localhost:3000/oauth2callback'
var calendar_auth_url = ''
var oauth2Client = new OAuth2Client(client, secret, redirect);

exports.ping = function() {
console.log('pong');
};

'use strict';

const {google} = require('googleapis');
// const nconf = require('nconf');
const readline = require('readline');
const plus = google.plus('v1');
const path = require('path');
const OAuth2Client = google.auth.OAuth2;

// nconf.argv().env().file(path.join(__dirname, '/oauth2.keys.json'));
// const keys = nconf.get('web');

// Client ID and client secret are available at
// https://code.google.com/apis/console
const CLIENT_ID = "396408363131-14fn0vdrl14taohaabiooboqe8u2p4p7.apps.googleusercontent.com";
const CLIENT_SECRET = keys.client_secret;
const REDIRECT_URL = keys.redirect_uris[0];

const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getAccessToken (oauth2Client, callback) {
  // generate consent page url
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // will return a refresh token
    scope: 'https://www.googleapis.com/auth/plus.me' // can be a space-delimited string or an array of scopes
  });

  console.log('Visit the url: ', url);
  rl.question('Enter the code here:', code => {
    // request access token
    oauth2Client.getToken(code, (err, tokens) => {
      if (err) {
        return callback(err);
      }
      // set tokens to the client
      // TODO: tokens should be set by OAuth2 client.
      oauth2Client.setCredentials(tokens);
      callback();
    });
  });
}

// retrieve an access token
getAccessToken(oauth2Client, () => {
  // retrieve user profile
  plus.people.get({ userId: 'me', auth: oauth2Client }, (err, profile) => {
    if (err) {
      throw err;
    }
    console.log(profile.displayName, ':', profile.tagline);
  });
});