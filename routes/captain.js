const mongoose = require('mongoose');
const passport = require('passport');
const config = require('../config/database');
require('../config/passport')(passport);
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const smsServise = require('../tools/sendMsg')
const captainController = require('../tools/captainController')
const customerController = require('../tools/customerController')
const mid = require('../tools/mid')

/////////////////////////////////////////
////////////add captain
////////////////////////////////////////
router.post('/addcaptain', passport.authenticate('jwt', {
    session: false
}),mid.test, (req, res) => {
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
}),mid.test, (req, res) => {
    captainController.editCaptain(req, res)
});
//////////////////////////////delete captain
router.delete('/deletecaptain', passport.authenticate('jwt', {
    session: false
}),mid.test, (req, res) => {
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
}),mid.test, (req, res) => {
    const reqUser = req.user
    if (reqUser.role === 'admin' || reqUser.role === 'superAdmin') {
        captainController.allCaptain(req, res)
    } else {
        return res.status(403).send({
            error: `access denied`
        })
    }
});

/////////////////////////// add captainplus
router.post('/addcaptainplus', passport.authenticate('jwt', {
    session: false
}),mid.test, (req, res) => {
    const reqUser = req.user
    if (reqUser.role !== 'superAdmin' && reqUser.role !== 'admin') {
        return res.status(403).send({
            error: `access denied`
        })
    } else {
        captainController.addCaptainPlus(req, res)
    }
});


module.exports = router;