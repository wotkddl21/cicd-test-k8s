const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const {Machine} = require("../models/Machine");
const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        history: req.user.history,
        point : req.user.point
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);
    console.log(user)
    user.save((err, doc) => {
        if (err) {console.log(err , doc);
        return res.json({ success: false, err });
        }
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id , userPoint : user.point
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

router.get('/removeHistory',auth,(req,res)=>{
    let removeid = req.query.id;
    let removetime = req.query.time *1;
    let addpoint = req.query.price;
    console.log(removeid,removetime)
    User.findOneAndUpdate({_id:req.user._id},
        {
            $pull:{
                history :{
                    id: removeid,
                    time : removetime                
                }
            },
            $inc:{ "point":addpoint}
        },
        {new:true}
        )
    .exec((err,user)=>{
      if(err) return res.status(400).send(err)
      else{
        var minfo = "";
        Machine.findOneAndUpdate(
            {_id: removeid, "schedule.s" :removetime  },
            {$set: {   "schedule.$.reservation" : 0}},
            {new:true},
            (err,machineInfo)=>{
                if(err) console.log(err)
                console.log(machineInfo)
            }
        )
      }
      return res.status(200).send({success:true,userInfo:user})
  })
})
router.get('/user_by_email',(req,res)=>{
    
    let userEmail = req.query.userEmail
    //받아온 세탁소 정보를 DB에 저장
    //세탁소id를 통해 세탁소와, 그에 따른 세탁기 정보를 불러온다.
    User.find({email:userEmail})
    .exec((err,user)=>{
      if(err) return res.status(400).send(err)
      return res.status(200).send({success:true,userInfo:user})
  })
})
router.post('/addToHistory',auth,(req,res)=>{
    // User Collection에서, _id에 해당하는 user정보 불러오기
    User.findOne({_id:req.user._id},
        (err,userInfo)=>{
            User.findOneAndUpdate(
                {_id: req.user._id},
                {
                    $push:{
                        history :{
                            id: req.body.productId,  // 세탁기의 id가 저장됨
                            time : req.body.scheduleTime,
                            date: Date.now()
                        }
                    },
                    $inc:{ "point":-req.body.price}
                },
                {new : true},
                (err,userInfo)=>{
                    console.log(userInfo)
                    if(err) return res.status(400).json({success:false,err})
                    else{
                        var minfo = "";
                        Machine.findOneAndUpdate(
                            {_id: req.body.productId, "schedule.s" :req.body.scheduleTime  },
                            {$inc: {   "schedule.$.reservation" : 1}},
                            {new:true},
                            (err,machineInfo)=>{
                                if(err) console.log(err)
                                minfo = machineInfo;
                            }
                        
                        )
                        return res.status(200).json({info:userInfo.history})
                    }
                }
            )
        }
    )
})


router.post('/chargePoint',auth,(req,res)=>{
    // User Collection에서, _id에 해당하는 user정보 불러오기
    User.findOneAndUpdate(
        {_id: req.user._id},
        {
            $inc:{ "point":req.body.chargepoint}
        },
        {new : true},
        (err,userInfo)=>{
            console.log(userInfo)
            if(err) return res.status(400).json({success:false,err})
            else{
                return res.status(200).json({success:true,info:userInfo})
            }
        }
    )    
})



module.exports = router;
