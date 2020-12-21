const router = require("express").Router();
const usermodel = require("../Models/adminuser");
const createpost = require("../Models/createpost");
const comments = require("../Models/createcomment");
const verify = require("./verifytoken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.post("/createpost", async (req, res) => {

  console.log(req.body);

  var newpost = new createpost({
    subject : req.body.subject,
    category : req.body.category,
    date : req.body.date,
    time : req.body.time,
    location : req.body.location,
    expires_on : req.body.expires_on,
    description : req.body.description,
    notify_to : req.body.notify_to
  });

  try {
    const response = await newpost.save();
    res.send(response);
  } catch (err) {
    console.log(err);
  }

});
router.post("/createcomments", async (req, res) => {

  console.log(req.body);

  var newpost = new comments({
    announcement_id : req.body.id,
    comments: req.body.comments
  });

  try {
    const response = await newpost.save();
    res.send(response);
  } catch (err) {
    console.log(err);
  }

});

router.get("/retrivingpost/", async (req, res) => {
  let user = req.query.user;
  let response = await createpost.find({user:user});
  res.send(response);
});

router.get("/retrivingcomment/", async (req, res) => {
  let id = req.query.id;
  let response = await comments.find({announcement_id:id});
  res.send(response);
});

router.get("/retrivingallcomment/", async (req, res) => {
  let id = req.query.id;
  let response = await comments.find();
  res.send(response);
});



// handler for the /user/:id path, which renders a special page
router.get('/deletepost', async function (req, res) {
  console.log( req.query.id )
  const removed = await createpost.deleteOne({_id: req.query.id});
  res.status(200).send({"msg": "deleted successfully"})
})

const { authenticationvalidation, loginvalidation } = require("../validate");

router.get("/", verify, (req, res) => {
  res.send("i'm Authenticated.");
});

router.post("/register", async (req, res) => {
  //Lets Validate
  const { error } = authenticationvalidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Email Exist or not
  const emailexist = await usermodel.findOne({ email: req.body.email });
  if (emailexist) return res.status(200).send({ msg: "Email already exist." });

  //Hashing Passwords
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(req.body.password, salt);

  let user = new usermodel({
    name: req.body.name, //firstname+" "+secondname
    password: hashedpassword,
    email: req.body.email,
  });

  try {
    let saveduser = await user.save();
    res.send({success: "User saved successfully:",saveduser});
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  //Validating Inputs
  const { error } = loginvalidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Email Exist or not
  const user = await usermodel.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email not found");

  //password correct or wrong
  const validpassword = await bcrypt.compare(req.body.password, user.password);
  if (!validpassword) return res.status(400).send("Invalid password");

  const token = jwt.sign({ _id: user._id }, process.env.Secret_text);
  res.header("auth-token", token);
  res.send({ token: token, user: user.name });
});

module.exports = router;
