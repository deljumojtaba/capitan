const mongoose = require('mongoose');
const passport = require('passport');
const config = require('../config/database');
require('../config/passport')(passport);
const express = require('express');
const captainController = require ('../tools/captainController')
const router = express.Router();
const smsServise = require('../tools/sendMsg')
const serviceController = require('../tools/serviceController')
const mid = require('../tools/mid')




//////// add captain to sos problem

router.put('/startfixproblem', passport.authenticate('jwt', {
    session: false
}),mid.test, (req, res) => {
    const reqUser = req.user
    if (reqUser.role === 'captainplus' || reqUser.role === 'superAdmin') {
        captainController.startFixProblem(req, res)
    } else {
        return res.status(403).send({
            error: `access denied`
        })
    }
});


module.exports = router;
