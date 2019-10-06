const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const morgan = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config/database');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');
const adminRouter = require('./routes/admin');
const superAdminRouter = require('./routes/superAdmin');
const bodyParser = require('body-parser')
require('./config/passport')(passport)
const customerRouter = require('./routes/customer')
const captainRouter = require('./routes/captain')
const serviseRouter = require('./routes/service')
const captainPlusRouter = require('./routes/captainplus')



const app = express();
mongoose.connect(config.database, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/admin', adminRouter);
app.use('/superadmin', superAdminRouter);
app.use('/customer', customerRouter);
app.use('/captain', captainRouter);
app.use('/service', serviseRouter);
app.use('/captainplus', captainPlusRouter);





// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
