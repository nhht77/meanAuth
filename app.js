const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


//Connect to the database
mongoose.connect(config.database);

// On connection
mongoose.connection.on('connected', ()=>{
    console.log('Connected to the database ' + config.database);
})

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();

const users = require('./routes/users');

//PORT
const port = process.env.port || 8080;

//CORS MIDDLEWARE
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//BODYPARSER MIDDLEWARE
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//INDEX ROUTE
app.get('/', (req, res) => { 
    res.send('Hello  the sites');
})

app.get('*', (req, res) => {
    res.sendFile(__dirname, '/public/index.html')
})

app.listen(port, () => { console.log('Server started to run on ' + port)})