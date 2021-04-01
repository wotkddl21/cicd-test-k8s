const express = require('express');
const router = express.Router();
const multer = require('multer');
const {Laundry}=require('../models/Laundry')
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
  //받아온 세탁소 정보를 DB에 저장
  const laundry = new Laundry(req.body);//세탁소 객체 생성
  laundry.save((err)=>{
    if(err) return res.status(400).json({success:false,err})
    return res.status(200).json({success:true})
  });
})

router.post('/laundry',(req,res)=>{
  //from laundry collection
  Laundry.find() // 모든 laundry정보 불러옴
  .exec((err,laundryInfo)=>{
    if (err) return res.status(400).json({success:false,err})
    return res.status(200).json({success :true, laundryInfo})
  })

})
router.get('/several_id',(req,res)=>{
  let ids = req.query.id.split(',');
  let productId = ids.map(item=>{
    return item
  })
  console.log(productId)
  Laundry.find({_id:{$in:productId}})
    .exec((err,laundryInfo)=>{
      if(err) return res.status(400).json({success:false,err})
      console.log(laundryInfo)
      return res.status(200).json({success: true, data:laundryInfo})
    })
})


router.get('/products_by_id',(req,res)=>{
  
  let productId = req.query.id
  let temp_product='';
  //받아온 세탁소 정보를 DB에 저장
  //세탁소id를 통해 세탁소와, 그에 따른 세탁기 정보를 불러온다.
  Laundry.find({_id:productId})
  .exec((err,product)=>{
    if(err) return res.status(400).send(err)
    temp_product = product
    return res.status(200).send({success:true,temp:temp_product})
    
  })
})




module.exports = router;
