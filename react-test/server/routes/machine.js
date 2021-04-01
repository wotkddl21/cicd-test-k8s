const express = require('express');
const router = express.Router();
const multer = require('multer');
const {Machine}=require('../models/Machine')
//=================================
//             product
//=================================

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
   
  var upload = multer({ storage: storage }).single("file")



router.post('/image',(req,res)=>{
    // 가져온 이미지를 저장하는 과정 진행
    upload(req,res,err=>{
        if(err){
            return res.json({success: false,err})
        }
        return res.json({success:true,filePath:res.req.file.path  , fileName: res.req.file.filename})
    })
})

router.post('/',(req,res)=>{
  //받아온 세탁기 정보를 DB에 저장
  const machine = new Machine(req.body);//세탁소 객체 생성
  machine.save((err)=>{
    if(err) return res.status(400).json({success:false,err})
    return res.status(200).json({success:true})
  });
})

router.get('/getmachine',(req,res)=>{
  //from laundry collection
  let type = req.query.type;
  let productId = req.query.id;
  if (type === "array"){
    
    let ids = req.query.id.split(',')
    productId = ids.map(item=>{
      return item
    })
    Machine.find({_id:{$in:productId}})
    .exec((err,machineInfo)=>{
      if(err) return res.status(400).json({success:false,err})
      return res.status(200).json({success: true, data:machineInfo})
    })

  }else{
    Machine.find({laundry:productId}) // 모든 laundry정보 불러옴
    .exec((err,machineInfo)=>{
      if (err) return res.status(400).json({success:false,err})
      return res.status(200).json({success :true, Data:machineInfo})
    })
}
  //.populate()
})

router.get('/machines_by_id',(req,res)=>{
  let ids = req.query.id.split(',');
  let productIds = ids.map(item=>{
    return item
  })  // productIds = [ '_id','_id','_id']
  Machine.find({_id:{$in: productIds}})
})


module.exports = router;
