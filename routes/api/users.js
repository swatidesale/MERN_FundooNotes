// const express = require('express');

// const router = express.Router();

// //User Model
// const User = require('../../models/Users');

// // @route GET api/users
// // @desc GET all users
// // @access Public
// router.get('/', (req,res) => {
//     User.find()
//         .sort({ firstname: -1 })
//         .then(users => res.json(users))
// });

/*----- Save User -----*/
// @route POST api/users
// @desc POST a users
// @access Public
// router.post('/',(req,res) => {
//     const newUser = new User({
//         firstname: req.body.firstname,
//         lastname: req.body.lastname,
//         username: req.body.username,
//         password: req.body.password
//     });

//     newUser.save().then(user => res.json(user));
// });

// /*----- Delete User ------*/
// // @route DELETE api/users
// // @desc DELETE a user
// // @access Public
// router.delete('/:id',(req,res) => {
//     User.findById(req.params.id)
//         .then(user => user.remove().then(() => res.json({success: true}))
//     ).catch(err => res.status(404).json({success: false}))
// });

// module.exports = router;

var mongoose = require('mongoose');
var passport = require('passport');
var settings = require('../../config/settings');
require('../../config/passport');
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require('../../models/Users');
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

router.post('/register', (req,res) => {
    if(!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please enter username and password.'});
    }
    else if(req.body.password !== req.body.confirmPassword) {
        res.json({success: false, msg: 'Password does not match'});
    }
    else {
        var newuser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password,
            // confirmPassword: req.body.confirmPassword
        });

        //save user
        newuser.save((err) => {
            if(err) {
                return res.json({success: false, msg: "Username already exists."});
            }
            res.json({success: true, msg: "Registration Successful."});
        });
    }
});

router.post('/login', (req,res) => {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if(err) throw err;

        if(!user) {
            res.status(401).send({success: false, msg: "Authentication failed, User not found."});
        }
        else {
            //check if password matches
            bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
                if(isMatch && !err) {
                    //if user is found and password is right create a token
                    var token = jwt.sign(user.toJSON(), settings.secret);
                    //return the information including token as JSON
                    res.json({success: true, user: user, token: 'JWT ' + token});
                }
                else {
                    res.status(402).send({success: false, msg: "Authentication failed, Wrong password"});
                }
            });
        }
    });
});

router.get('/forgot', function(req, res) {
    res.render('forgot', {
      user: req.user
    });
});


router.post('/forgot', (req,res,next) => {
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
            User.findOne({ username: req.body.username}, function(err, user) {
                if(!user) {
                     res.status(401).send({success: false, msg: 'No account with email address exists'});
                }
                else {
                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 3600000;

                    user.save(function(err) {
                        done(err, token, user);
                    });
                }
            });
        },
        function(token, user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'sadesale94@gmail.com',
                    pass: 'Sdesale25#' 
                }
            });
            var mailOptions = {
                to: user.username,
                from: 'sadesale94@gmail.com',
                subject: 'MERN Stack Fundoo Notes Reset Password',
                text: 'You are receiving this because you (or someone else) have requested the reset' + 
                ' password for your account.\n\n Please click on following link, or paste this into your' +
                ' browser to complete the proccess.\n\n' +
                'http://' + req.headers.host + '/reset/' + token + '\n\n' + 
                // 'http://localhost:3000/resetPassword' +
                ' if you did not requested this, please ignore this email and your password will remain unchanged.\n' 
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                // res.redirect('/reset');
                res.json({success: true, msg: 'An e-mail has been sent'});
                done(err, 'done');
            });
        }
    ],
    function(err) {
        if(err) return next(err);
        res.json({success: false, msg: 'Failed'});
    });
});

router.get('/reset/:token', (req,res) => {
    console.log("Inside get rest token");
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $get: Date.now()}}, function(err, username) {
        if(!username) {
            res.status(401).send({success: false, msg:'Password reset token is invalid or has expired.'});
        }
        else {
            console.log("Inside else",req.username);
            res.render('reset', {
                user: req.username
            });
        }
    });
});

router.post('/reset/:token', function(req, res) {
    async.waterfall([
      function(done) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
            if (!user) {
                // req.flash('error', 'Password reset token is invalid or has expired.');
                // return res.redirect('back');
                res.status(401).send({success: false, msg: 'Password reset token is invalid or has expired.'});
            }
    
            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
    
            user.save(function(err) {
                // req.logIn(user, function(err) {
                    done(err, user);
                // });
            });
        });
      },
      function(user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'sadesale94@gmail.com',
            pass: 'Sdesale25#'
          }
        });
        var mailOptions = {
          to: user.username,
          from: 'sadesale94@gmail.com',
          subject: 'Your password has been changed',
          text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user.username + ' has just been changed.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
        //   req.flash('success', 'Success! Your password has been changed.');
        //   done(err);
            res.json({success: true, msg: 'Success! Your password has been changed.'})
        });
      }
    ], function(err) {
    //   res.redirect('/');
        res.json({success: false, msg: 'Filed'});
    });
  });
module.exports = router;