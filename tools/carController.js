const mongoose = require('mongoose');
const config = require('../config/database');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const passport = require('passport');
const Manufactuier = require('../models/manufactuier')
const CarBrand = require('../models/carBrand')
const CarName = require('../models/carName')


module.exports = {
  //////// add Manufactuier
  async addManufactuier(req, res) {
    try {
      const existManufactuier = await Manufactuier.findOne({
        name: req.body.name
      })
      if (existManufactuier) {
        return res.json({
          success: false,
          msg: 'کارخانه سازنده قبلا وارد شده است .'
        });
      }
      const newManufactuier = await new Manufactuier({
        name: req.body.name

      }).save()
      res.json({
        success: true,
        newManufactuier,
        msg: 'کارخانه سازنده با موفقیت افزوده شد .'
      });



    } catch (error) {
      res.status(500).send({
        error: `An error has occured ${error}`
      })
    }
  },
  ////////delete manufactuier

  async deleteManufactuier(req, res) {
    try {
      const manufactuier = await Manufactuier.findByIdAndDelete(req.body._id)
      if (!manufactuier) return res.json({
        success: false,
        message: 'manufactuier not fuond'
      })
      return res.json({
        manufactuier,
        success: true,
        message: 'manufactuier has bin deleted'
      })
    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      })
    }
  },
  ////////////////edite manufactuier

  async editManufactuier(req, res) {
    try {
      const filter = {
        _id: req.body._id
      };
      const update = {
        name: req.body.name
      };
      let newManufactuier = await Manufactuier.findByIdAndUpdate(filter, update)
      if (!newManufactuier) return res.json({
        success: false,
        message: 'Manufactuier not fuond'
      })
      await newManufactuier.save();
      newManufactuier = await Manufactuier.findById(filter)
      await res.json({
        success: true,
        newManufactuier,
        message: 'Manufactuier has been updated'
      })
    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      })
    }
  },
  //////////////////////////////add Car Brand

  async addCarBrand(req, res) {
    try {
      const existCarBrand = await CarBrand.findOne({
        name: req.body.name
      })
      if (existCarBrand) {
        return res.json({
          success: false,
          msg: 'برند خودرو مورد نظر قبلا وجود داشته است .'
        });
      }
      const newCarBrand = await new CarBrand({
        name: req.body.name,
        manufactuierId: req.body.manufactuierId

      }).save()
      res.json({
        success: true,
        newCarBrand,
        msg: 'برند خودرو با موفقیت افزوده شد .'
      });



    } catch (error) {
      res.status(500).send({
        error: `An error has occured ${error}`
      })
    }
  },
  ////////////////////////////// edit car brand
  async editCarBrand(req, res) {
    try {
      const filter = {
        _id: req.body._id
      };
      const update = {
        name: req.body.name,
        manufactuierId: req.body.manufactuierId

      };
      let newCarBrand = await CarBrand.findByIdAndUpdate(filter, update)
      if (!newCarBrand) return res.json({
        success: false,
        message: 'Carbrand not fuond'
      })
      await newCarBrand.save();
      newCarBrand = await CarBrand.findById(filter)
      await res.json({
        success: true,
        newCarBrand,
        message: 'Carbrand has been updated'
      })
    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      })
    }
  },
  /////////////////////////////////delete Car Brand
  async deleteCarBrand(req, res) {
    try {
      const carbrand = await CarBrand.findByIdAndDelete(req.body._id)
      if (!carbrand) return res.json({
        success: false,
        message: 'car Brand not fuond'
      })
      return res.json({
        carbrand,
        success: true,
        message: 'car brand has bin deleted'
      })
    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      })
    }
  },
  //////////////////////////////////add car Name
  async addCarName(req, res) {
    try {
      const existCarName = await CarName.findOne({
        name: req.body.name
      })
      if (existCarName) {
        return res.json({
          success: false,
          msg: 'نام خودرو مورد نظر قبلا وجود داشته است .'
        });
      }
      const newCarName = await new CarName({
        name: req.body.name,
        manufactuierId: req.body.manufactuierId,
        carbrandId: req.body.carbrandId,


      }).save()
      res.json({
        success: true,
        newCarName,
        msg: 'نام خودرو با موفقیت افزوده شد .'
      });



    } catch (error) {
      res.status(500).send({
        error: `An error has occured ${error}`
      })
    }
  },
  //////////////edit car name
  async editCarName(req, res) {
    try {
      const filter = {
        _id: req.body._id
      };
      const update = {
        name: req.body.name,
        manufactuierId: req.body.manufactuierId,
        carBrandId: req.body.carbrandId
      };
      let newCarName = await CarName.findByIdAndUpdate(filter, update)
      if (!newCarName) return res.json({
        success: false,
        message: 'نام خودرو مورد نظر پیدا نشد .'
      })
      await newCarName.save();
      newCarName = await CarName.findById(filter)
      await res.json({
        success: true,
        newCarName,
        message: 'نام خودرو مورد نظر با موفقیت ویرایش شد '
      })
    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      })
    }
  },
  async deleteCarName(req, res) {
    try {
      const carname = await CarName.findByIdAndDelete(req.body._id)
      if (!carname) return res.json({
        success: false,
        message: 'car Name not fuond'
      })
      return res.json({
        carname,
        success: true,
        message: 'car Name has bin deleted'
      })
    } catch (error) {
      res.status(400).send({
        error: `An error has occured ${error}`
      })
    }
  }

}