const express = require('express')
var moment = require('jalali-moment');
var useragent = require('useragent');
var statusLogger = require("status-logger")
const morgan = require('morgan')
const uuid = require('node-uuid')
const uuidv4 = require('uuid-v4')
const chalk = require('chalk');
const fs = require('fs')
const path = require('path')
const rfs = require('rotating-file-stream')
const log = require('daily-log')(__filename);

var winston = require('winston');
require('winston-daily-rotate-file');


let mid = {};
mid.test = (req, res, next) => {


  req._id = uuidv4();

  //ip requester

  ipRequester = req.ip

  //time
  let dates = moment().locale('fa').format('YYYY/M/D');
  // var time = new Date();
  var date = dates.toString();


  let date_ob = new Date();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  //method GET or POST....
  method = req.method

  // which host? sev 1 or 2
  whichHost = req.headers.host
  //status

  let status = chalk.green(res.statusCode);
  //user agent
  var UserAgent = useragent.parse(req.headers['user-agent'], req.query.jsuseragent);

  /////id user
  if (!req.user) {
    var userId = "user not authorize"
    var mobileUseMid = "user not authorize"
    var blockUserMid = "user not authorize"
  } else {
    userId = req.user._id
    mobileUseMid = req.user.mobile
    blockUserMid = req.user.block
  }
//**** if user blocked m-k ****//
if( blockUserMid == true){
 return res.status(401).send({
    success: false,
    msg: 'you are blocked'
  })
}
//****************************//



  console.log("---------> " + whichHost + "------ " + method + "------ " + "date: " + date + "----" + " time : " + hours + ":" + minutes + ":" + seconds + "-----" + req._id + "-----" + ipRequester + "----" + UserAgent + "---" + "status:" + status);


  const logger = whichHost + "------ " + method + "------ " + "date: " + date + "----" + " time : " + hours + ":" + minutes + ":" + seconds + "-----" + req._id + "-----" + "ip: " + ipRequester + "----" + UserAgent + "---" + "status:" + res.statusCode + "-----" + "idUser :" + userId + '---' + "mobile number :" + mobileUseMid + "---- block = " + blockUserMid



  var transport = new(winston.transports.DailyRotateFile)({
    filename: 'logs/%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m'

  });

  transport.on('rotate', function (oldFilename, newFilename) {
  });

  var logge = winston.createLogger({
    transports: [
      transport
    ]
  });

  logge.info(logger);


  next();
}

module.exports = mid;