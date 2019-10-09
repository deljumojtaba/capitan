const mongoose = require('mongoose');
const passport = require('passport');
const config = require('../config/database');
require('../config/passport')(passport);
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const smsServise = require('../tools/sendMsg')
const serviceController = require('../tools/serviceController')
const mid = require('../tools/mid')


/////////////////////////////add Service

router.post('/addservise', passport.authenticate('jwt', {
    session: false
}), mid.test, (req, res) => {
    const reqUser = req.user
    if (reqUser.role !== 'superAdmin' && reqUser.role !== 'admin') {
        return res.status(403).send({
            error: `access denied`
        })
    } else {
        serviceController.addService(req, res)
    }
});

///////////////////////////////// edit service


router.put('/editservice', passport.authenticate('jwt', {
    session: false
}),mid.test, (req, res) => {
    const reqUser = req.user
    if (reqUser.role === 'admin' || reqUser.role === 'superAdmin') {
        serviceController.editService(req, res)
    } else {
        return res.status(403).send({
            error: `access denied`
        })
    }
});


/////////////////////////////////delete service


router.delete('/deleteservice', passport.authenticate('jwt', {
    session: false
}),mid.test, (req, res) => {
    console.log(req.user)
    const reqUser = req.user
    if (reqUser.role === 'admin' || reqUser.role === 'superAdmin') {
        serviceController.deleteService (req, res)
    } else {
        return res.status(403).send({
            error: `access denied`
        })
    }
});


/////////////////////////////add part

router.post('/addpart', passport.authenticate('jwt', {
    session: false
}),mid.test, (req, res) => {
    const reqUser = req.user
    if (reqUser.role !== 'superAdmin' && reqUser.role !== 'admin') {
        return res.status(403).send({
            error: `access denied`
        })
    } else {
        serviceController.addPart(req, res)
    }
});

///////////////////////////////// edit part


router.put('/editpart', passport.authenticate('jwt', {
    session: false
}),mid.test, (req, res) => {
    const reqUser = req.user
    if (reqUser.role === 'admin' || reqUser.role === 'superAdmin') {
        serviceController.editPart(req, res)
    } else {
        return res.status(403).send({
            error: `access denied`
        })
    }
});

/////////////////////////////////delete part

router.delete('/deletepart', passport.authenticate('jwt', {
    session: false
}),mid.test, (req, res) => {
    const reqUser = req.user
    if (reqUser.role === 'admin' || reqUser.role === 'superAdmin') {
        serviceController.deletePart (req, res)
    } else {
        return res.status(403).send({
            error: `access denied`
        })
    }
});
//////////////////////// sos Problem
router.post('/addproblem', passport.authenticate('jwt', {
    session: false
}),mid.test, (req, res) => {

        serviceController.addProblem(req, res)
    
});

////////////////////////// show all problems 
router.post('/getallproblems', passport.authenticate('jwt', {
    session: false
}),mid.test, (req, res) => {

    const reqUser = req.user
    if (reqUser.role === 'admin' || reqUser.role === 'superAdmin'|| reqUser.role === 'captainplus') {
        serviceController.getAllProblems (req, res)
    } else {
        return res.status(403).send({
            error: `access denied`
        })
    }
    
});

////////////////////////// show condition problems 
router.post('/conditionproblem', passport.authenticate('jwt', {
    session: false
}),mid.test, (req, res) => {

    const reqUser = req.user
    if (reqUser.role === 'admin' || reqUser.role === 'superAdmin' || reqUser.role === 'captainplus') {
        serviceController.getConditionProblem (req, res)
    } else {
        return res.status(403).send({
            error: `access denied`
        })
    }
})
    /////////////////////// finished problem
    router.put('/finishproblem', passport.authenticate('jwt', {
        session: false
    }),mid.test, (req, res) => {
    
        const reqUser = req.user
        if (reqUser.role === 'admin' || reqUser.role === 'superAdmin'|| reqUser.role === 'captainplus') {
            serviceController.finishedProblem (req, res)
        } else {
            return res.status(403).send({
                error: `access denied`
            })
        }
    
});



module.exports = router;