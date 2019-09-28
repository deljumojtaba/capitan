var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
const smsServise = require('../tools/sendMsg')
const captainController = require('../tools/captainController')
const customerController = require('../tools/customerController')

/////////////////////////////////////////
////////////add captain
////////////////////////////////////////
router.post('/addcaptain', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const reqUser = req.user
    if (reqUser.role !== 'superAdmin' && reqUser.role !== 'admin') {
        return res.status(403).send({
            error: `access denied`
        })
    } else {
        captainController.addCaptain(req, res)
    }
});

/////////////////////////////// edit captain

router.post('/editcaptain', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    captainController.editCaptain(req, res)
});

//////////////////////////////delete captain
router.delete('/deletecaptain', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const reqUser = req.user
    if (reqUser.role === 'admin' || reqUser.role === 'superAdmin') {
        captainController.deleteCaptain(req, res)
    } else {
        return res.status(403).send({
            error: `access denied`
        })
    }
});

/////////////////////////////// all captain

router.get('/allcaptain', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const reqUser = req.user
    if (reqUser.role === 'admin' || reqUser.role === 'superAdmin') {
        captainController.allCaptain(req, res)
    } else {
        return res.status(403).send({
            error: `access denied`
        })
    }
});




module.exports = router;