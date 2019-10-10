const mongoose = require('mongoose');
const passport = require('passport');
const config = require('../config/database');
require('../config/passport')(passport);
const express = require('express');
const User = require('../models/user')
const smsServise = require('./sendMsg')
const Service = require('../models/service')
const Part = require('../models/part')
const SosProblem = require('../models/sosproblem')
var Kavenegar = require('kavenegar');
var api = Kavenegar.KavenegarApi({
    apikey: '655A4D716767785037385543704C616F692B6F535231693054696C52463870484A4C2B316A3376437333343D'
});

module.exports = {

    /////// add service 
    async addService(req, res) {
        try {
            const existService = await Service.findOne({
                name: req.body.name
            })
            if (existService) {
                return res.json({
                    success: false,
                    msg: 'نام خدمات مورد نظر قبلا وجود داشته است .'
                });
            }
            const newService = await new Service({
                name: req.body.name,
                carName: req.body.carNameId,
                carBrand: req.body.carBrandId,
                price: req.body.price

            }).save()
            res.json({
                success: true,
                newService,
                msg: 'نام خدمات با موفقیت افزوده شد .'
            });



        } catch (error) {
            res.status(500).send({
                error: `An error has occured ${error}`
            })
        }
    },

    //////// edit service
    async editService(req, res) {
        try {
            const filter = {
                _id: req.body._id
            };
            const update = {
                name: req.body.name,
                price: req.body.price,
                carBrand: req.body.carBrand,
                carName: req.body.carName
            };
            let newService = await Service.findByIdAndUpdate(filter, update)
            if (!newService) return res.json({
                success: false,
                message: 'Service not fuond'
            })
            await newService.save();
            newService = await Service.findById(filter)
            await res.json({
                success: true,
                newService,
                message: 'Service has been updated'
            })
        } catch (error) {
            res.status(400).send({
                error: `An error has occured ${error}`
            })
        }
    },
    //////// delete service 
    async deleteService(req, res) {
        try {
            const service = await Service.findByIdAndDelete(req.body._id)
            if (!service) return res.json({
                success: false,
                message: 'Service Name not fuond'
            })
            return res.json({
                service,
                success: true,
                message: 'service Name has bin deleted'
            })
        } catch (error) {
            res.status(400).send({
                error: `An error has occured ${error}`
            })
        }
    },
    /////// add part 
    async addPart(req, res) {
        try {
            const existPart = await Part.findOne({
                code: req.body.code
            })
            if (existPart) {
                return res.json({
                    success: false,
                    msg: 'کد قطعه مورد نظر قبلا وجود داشته است .'
                });
            }
            const newPart = await new Part({
                name: req.body.name,
                code: req.body.code,
                price: req.body.price,
                carName: req.body.carNameId,
                carBrand: req.body.carBrandId,
                manufactuier: req.body.manufactuierId,
                brand: req.body.brand

            }).save()
            res.json({
                success: true,
                newPart,
                msg: ' قطعه با موفقیت افزوده شد .'
            });



        } catch (error) {
            res.status(500).send({
                error: `An error has occured ${error}`
            })
        }
    },

    //////// edit part
    async editPart(req, res) {
        try {
            const filter = {
                _id: req.body._id
            };
            const update = {
                name: req.body.name,
                code: req.body.code,
                price: req.body.price,
                carName: req.body.carNameId,
                carBrand: req.body.carBrandId,
                manufactuier: req.body.manufactuierId,
                brand: req.body.brand
            };
            let newPart = await Part.findByIdAndUpdate(filter, update)
            if (!newPart) return res.json({
                success: false,
                message: 'part not fuond'
            })
            await newPart.save();
            newPart = await Part.findById(filter)
            await res.json({
                success: true,
                newPart,
                message: 'part has been updated'
            })
        } catch (error) {
            res.status(400).send({
                error: `An error has occured ${error}`
            })
        }
    },
    //////// delete part
    async deletePart(req, res) {
        try {
            const part = await Part.findByIdAndDelete(req.body._id)
            if (!part) return res.json({
                success: false,
                message: 'Part Name not fuond'
            })
            return res.json({
                part,
                success: true,
                message: 'part Name has bin deleted'
            })
        } catch (error) {
            res.status(400).send({
                error: `An error has occured ${error}`
            })
        }
    },
    //////////////// add problem
    async addProblem(req, res) {
        try {
            const existProblem = await SosProblem.findOne({
                problemId: req.body.problemId
            })
            if (existProblem) {
                return res.json({
                    success: false,
                    msg: 'شماره خدمات مورد نظر قبلا وجود داشته است .'
                });
            }
            const newProblem = await new SosProblem({
                problemId: req.body.problemId,
                userPhone: req.body.userPhone,
                address: req.body.address,
                carType: req.body.carType,
                problem: req.body.problem,
                numberPlates: req.body.numberPlates,
                dateOfProblem: req.body.dateOfProblem,
                timeOfProblem: req.body.timeOfProblem

            }).save()
            //////////////////// send message to captainplus
            const captainPlus = await User.findOne({ role: 'captainplus' })
            let mobileNumber = captainPlus.mobile
            let msg = `درخواست جدید به شماره ${req.body.problemId}  جهت مشاهده به پنل خودتان مراجعه کنید`
            api.Send({
                message: msg,
                sender: "10008445",
                receptor: mobileNumber
            },
                function (response, status) {
                    console.log(response);
                    console.log(status);
                    res.json({
                        status,
                        success: true,
                        msg: 'درخواست خدمات با موفقیت ثبت شد .',
                        response,
                        newProblem
                    })
                });
            // res.json({
            //     success: true,
            //     newProblem,
            //     msg: 'درخواست خدمات با موفقیت ثبت شد .'
            // });

        } catch (error) {
            res.status(500).send({
                error: `An error has occured ${error}`
            })
        }





    },
    //////////////////// get all problems
    async getAllProblems(req, res) {
        try {
            let page = req.body.page
            let AllProblems 
            const count = await SosProblem.count({})
            if (page === 1) {
             AllProblems = await SosProblem.find({}).sort({created: -1}).limit(20)
            }
            else {
             AllProblems = await SosProblem.find({}).sort({created: -1}).skip((page - 1) * 20)

            }
            if (!AllProblems || AllProblems.length === 0) {
                return res.json({ success: false, msg: 'درخواستی وجود ندارد  ' })
            }
            res.json({ success: true, AllProblems, count ,msg: ' لیست کل درخواست ها ' })
        } catch (error) {
            res.status(400).send({
                error: `An error has occured ${error}`
            })
        }
    },
    /////////////////// get problem condition
    async getConditionProblem(req, res) {
        try {
            let reqCondition = req.body.condition
            let page = req.body.page
            const count = await SosProblem.count({condition: reqCondition})
            const conditionProblem = await SosProblem.find({ condition: reqCondition }).sort({created: -1}).skip((page - 1) * 20)
            if (!conditionProblem || conditionProblem.length === 0) {
                return res.json({ success: false, msg: 'درخواستی وجود ندارد  ' })
            }
            res.json({ success: true, conditionProblem,count, msg: ' لیست کل درخواست ها ' })
        } catch (error) {
            res.status(400).send({
                error: `An error has occured ${error}`
            })
        }
    },
    //////////////////// finished problem
    async finishedProblem(req, res) {
        try {
                const filter = {
                    problemId: req.body.problemId
                };
                const update = {
                    problemId: req.body.problemId,
                    userPhone: req.body.userPhone,
                    address: req.body.address,
                    carType: req.body.carType,
                    problem: req.body.problem,
                    numberPlates: req.body.numberPlates,
                    dateOfProblem: req.body.dateOfProblem,
                    timeOfProblem: req.body.timeOfProblem,
                    condition: 'finished',
                    cMobile: req.body.cMobile,
                    cName: req.body.cName,
                    timeOfSend: req.body.timeOfSend,
                    dateOfSend: req.body.dateOfSend
                };
                let newProblem = await SosProblem.findOneAndUpdate(filter, update)
                if (!newProblem) return res.json({
                    success: false,
                    message: 'درخواستی پیدا نشد'
                })
                await newProblem.save();
                newProblem = await SosProblem.findOne(filter)
                await res.json({
                    success: true,
                    newProblem,
                    message: 'درخواست با موفقیت پایان یافت'
                })
            } catch (error) {
                res.status(400).send({
                    error: `An error has occured ${error}`
                })
            }
        
    }
}