const router = require("express").Router();
const createpost = require("../Models/createpost");
const comments = require("../Models/createcomment");

// const profilecreation = require("../Models/adminuser");
// const verify = require("./verifytoken");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// var nodemailer = require('nodemailer');


router.post("/createpost", async (req, res) => {

    var newpost = new createpost({
      subject : req.body.subject,
      category : req.body.category,
      date : req.body.date,
      time : req.body.time,
      location : req.body.location,
      expires_on : req.body.expires_on,
      description : req.body.description,
      notify_to : req.body.notify_to,
      dateSubmitted : req.body.dateSubmitted
    });
  
    try {
      const response = await newpost.save();
      res.send(response);
    } catch (err) {
      console.log(err);
    }
  
  });


  router.post("/createcomments", async (req, res) => {

    var newpost = new comments({
      announcement_id : req.body.id,
      comments: req.body.comments,
      dateSubmitted : req.body.dateSubmitted
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
  
  router.get('/deletepost', async function (req, res) {
    const removed = await createpost.deleteOne({_id: req.query.id});
    res.status(200).send({"msg": "deleted successfully"})
  })
  
  module.exports = router;