const express = require('express');
const mongoose = require('mongoose');
const app = express();
const applicationRouter = require('./routes/applications');
const agendaRouter = require('./routes/agendas');
const NPUrouter = require('./routes/NPUs');
const methodOverride = require('method-override');
const cookieSession = require('cookie-session');

require('dotenv').config()

const mongoConnect = process.env.mongoConnect;
const client_id = process.env.client_id
const client_secret = process.env.client_secret
const cookie_secret = process.env.cookie_secret

const port = process.env.PORT || 3000;

// get callback uri from environment
function getCallbackURI() {
  if (process.env.NODE_ENV === 'production') {
    var callbackURI = 'https://agendenator.onrender.com'
  } else {
    var callbackURI = `http://localhost:${port}`
  };
  return callbackURI;
};
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(cookieSession({
  secret: cookie_secret,
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  keys: [cookie_secret]
}));

app.get('/', async (req, res) => {
  res.render('index', { req: req });
  // console.log(req.session);
});

app.get('/logout', (req, res) => {
  req.session = null;
  req.cookies = null;
  res.clearCookie('session');
  res.clearCookie('session.sig');
  res.redirect('/');
});

app.get('/login/google', (req, res) => {
  const callbackURI = getCallbackURI();
  res.redirect('https://accounts.google.com/o/oauth2/v2/auth?client_id=' + client_id +
    '&redirect_uri=' + callbackURI + '/login/google/callback&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email');
});

async function getAccessToken(code) {
  const callbackURI = getCallbackURI();
  const url = 'https://oauth2.googleapis.com/token';
  const params = {
    client_id: client_id,
    client_secret: client_secret,
    redirect_uri: `${callbackURI}/login/google/callback`,
    grant_type: 'authorization_code',
    code: code
  };
  const body = Object.keys(params).map(key => key + '=' + params[key]).join('&');
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: body
  }).then((response) => {
    // console.log(response)
    return response.json();
  }).then((data) => {
    return data;
  });
  // console.log(body);
  // console.log('getAccessTokenResults', JSON.stringify(res));
  return res.access_token;
};

async function getGoogleUser(access_token) {
  const url = 'https://www.googleapis.com/oauth2/v2/userinfo?access_token=' + access_token;
  const res = await fetch(url).then((response) => {
    return response.json();
  }).then((data) => {
    return data;
  }).catch((err) => {
    console.log('getGoogleUser', err);
  });
  // console.log('getGoogleUser results:', res);
  return res;
};

app.get('/login/google/callback', async (req, res) => {
  const code = req.query.code;
  const token = await getAccessToken(code);
  const googleUserData = await getGoogleUser(token);
  if (googleUserData) {
    req.session.user = googleUserData.id;
    req.session.email = googleUserData.email;
    req.session.name = googleUserData.name;
    req.session.image = googleUserData.picture;
    req.session.token = token;
    console.log('Google User Data:', googleUserData);
    res.redirect('/applications');
  } else {
    res.send('Error!');
  }
  return googleUserData;
});

// Connecting to the database
mongoose.connect(mongoConnect, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

app.use('/agenda', agendaRouter);
app.use('/show', applicationRouter);
app.use('/NPUs', NPUrouter);
app.use('/applications', applicationRouter);