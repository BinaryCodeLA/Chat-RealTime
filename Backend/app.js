const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const errorMiddleware = require('./middleware/error');
const config = require('./config');



//import routes
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');

//initialize app
const app = express();

//middlewares
var corsOptions = {
    origin: ['http://localhost:4200/','http://localhost:4040/mean-chat-app.io/'],
    optionsSuccessStatus: 200
  }
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
require('./config/passport')(passport);

//static folder
app.use(config.root, express.static(path.join(__dirname,'public')));

//set routes
//users
app.use(`${config.apiPath}`, userRoutes);
//messages
app.use(`${config.apiPath}`,messageRoutes);

//error middleware
app.use(errorMiddleware);

app.get('*',(req, res) => {
    res.sendFile(path.resolve('public/index.html'));
});

module.exports = app;