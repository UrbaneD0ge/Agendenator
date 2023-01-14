const express = require('express');
const mongoose = require('mongoose');
const app = express();
const applicationRouter = require('./routes/applications');
const agendaRouter = require('./routes/agendas');
const NPUrouter = require('./routes/NPUs');
const methodOverride = require('method-override');

const mongoConnect = process.env.mongoConnect;

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
  res.render('index');
});

app.get('/login/google', (req, res) => {
  res.redirect('https://accounts.google.com/o/oauth2/v2/auth?client_id=' + client_id +
    '&redirect_uri=http://localhost:' + port +
    '/login/google/callback&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email');
});


async function getAccessToken(code) {
  const url = 'https://oauth2.googleapis.com/token';
  const params = {
    client_id: client_id,
    client_secret: client_secret,
    redirect_uri: `http://localhost:${port}/login/google/callback`,
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
    req.session.token = token;
    // console.log('Google User Data:', googleUserData);
    res.redirect('/reservations');
  } else {
    res.send('Error!');
  }
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
