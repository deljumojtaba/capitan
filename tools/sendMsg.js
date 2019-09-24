var mongoose = require('mongoose');
const Mobile = require ('../models/mobile')


var Kavenegar = require('kavenegar');
var api = Kavenegar.KavenegarApi({
    apikey: '655A4D716767785037385543704C616F692B6F535231693054696C52463870484A4C2B316A3376437333343D'
});
module.exports = {
async registerMobile (req , res) {
    const mobileNumber = req.body.mobile
    // const existMobile = await Mobile.findOne({number:mobileNumber}) ;
    // if(existMobile) {
    //  return res.json({success: false, msg: 'شماره وارد شده نکراری میباشد '});

    // } else {
    console.log(mobileNumber)
    const serverCode = Math.floor(Math.random() * (9999 - 1111) + 1111)
    const msg = `کد اعتبار سنجی شما در کاپیتان کار  ${serverCode} می باشد .`

///////////////////////////////////////////////////
//  **** create new mobile and code
//////////////////////////////////////////////////

const newMobile = new Mobile({
  registerCode : serverCode ,
  number :mobileNumber
});
newMobile.save() ;
 api.Send({
        message: msg,
        sender: "2000004346",
        receptor: mobileNumber
    },
    function(response, status) {
        console.log(response);
        console.log(status);
        res.send({
            status , 
            response
        })
    });
  // }
},

async acceptMobile(req , res) {
  console.log(req.body)
   const userCode =  req.body.userCode
   const mobile = req.body.mobile
   const chekerMobile = await Mobile.findOne({number : mobile , registerCode : userCode})
   if (!chekerMobile) {
    res.json({success: false, msg: 'اظلاعات وارد شده صحیح نمیباشد '});
   }
   else {
     
    res.json({success: true, msg: 'لطفا اطلاعت دیگر را کامل کنید'});
    

    };
  
   
  }




}

    