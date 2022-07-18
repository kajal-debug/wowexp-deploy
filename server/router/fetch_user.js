const express = require('express');
const User = require('../models/User');
const router = express.Router();
router.get('/',[],async function(req,response){
let data = User.find().then((result)=>{
    console.log("result++",result)
    response.status(200).json({ msg: 'Successfully fetch data', data:result });
}).catch((err)=>{
    response.status(404).json({msg:"something went worng" , err:err})
})
console.log("response",data)
})
module.exports = router;