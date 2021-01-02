const router = require("express").Router();
const profilecreation = require("../Models/adminuser");
// const createpost = require("../Models/createpost");
// const comments = require("../Models/createcomment");
// const verify = require("./verifytoken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var nodemailer = require('nodemailer');


// router.post("/createpost", async (req, res) => {

//   var newpost = new createpost({
//     subject : req.body.subject,
//     category : req.body.category,
//     date : req.body.date,
//     time : req.body.time,
//     location : req.body.location,
//     expires_on : req.body.expires_on,
//     description : req.body.description,
//     notify_to : req.body.notify_to,
//     dateSubmitted : req.body.dateSubmitted
//   });

//   try {
//     const response = await newpost.save();
//     res.send(response);
//   } catch (err) {
//     console.log(err);
//   }

// });
// router.post("/createcomments", async (req, res) => {

//   var newpost = new comments({
//     announcement_id : req.body.id,
//     comments: req.body.comments,
//     dateSubmitted : req.body.dateSubmitted
//   });

//   try {
//     const response = await newpost.save();
//     res.send(response);
//   } catch (err) {
//     console.log(err);
//   }

// });

// router.get("/retrivingpost/", async (req, res) => {
//   let user = req.query.user;
//   let response = await createpost.find({user:user});
//   res.send(response);
// });

// router.get("/retrivingcomment/", async (req, res) => {
//   let id = req.query.id;
//   let response = await comments.find({announcement_id:id});
//   res.send(response);
// });

// router.get("/retrivingallcomment/", async (req, res) => {
//   let id = req.query.id;
//   let response = await comments.find();
//   res.send(response);
// });

// router.get('/deletepost', async function (req, res) {
//   const removed = await createpost.deleteOne({_id: req.query.id});
//   res.status(200).send({"msg": "deleted successfully"})
// })

router.post("/register", async (req, res) => {

  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(req.body.password, salt);

  let user = new profilecreation({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    company_name: req.body.company_name, 
    domain_name: req.body.domain_name,
    location: req.body.location,
    email: req.body.email,
    password: hashedpassword,
    no_of_employees: req.body.no_of_employees
   
  });

  try {
    let saveduser = await user.save();
    res.send({success: "User saved successfully:",saveduser});
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {

  const user = await profilecreation.findOne({ email: req.body.email });
  if (!user) return res.status(200).send({code : 404, info : "Email not found" });

  const validpassword = await bcrypt.compare(req.body.password, user.password);
  if (!validpassword) return res.status(200).send({code : 401, info : "Password Not Match" });

  const token = jwt.sign({ _id: user._id }, process.env.Secret_text);
  res.header("auth-token", token);
  res.send({code : 200,  token: token, user: user.name });


});




router.post("/verifyemail", async(req, res) =>{
  let toEmail = req.body.email;
  let code = Math.floor(Math.random() * 999999) + 100000 ;
  if(String(code).length > 6)
  {
    code = parseInt(String(code).slice(0,5));
  }

  const emailexist = await profilecreation.findOne({ email: toEmail });
  if (emailexist) return res.status(201).send({ msg: "Email already exist." });

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'commentmyideas@gmail.com',
      pass: 'Aadhik1234'
    }
  });

  var mailOptions = {
    from: 'commentmyideas@gmail.com',
    to: toEmail,
    subject: 'Email verification',
    text: `your email verification code ${code}. It is valid for next 60 seconds.`
  };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
       return res.status(400).send("not a valid email")
      } else {
       return res.send({code: code, responsemsg: "email send successfully.."})
      }
    });

})

module.exports = router;
