const express = require('express');

const router = express.Router();
// const multer = require('multer');
// const path = require('path');
var async = require('async');
var nodemailer = require('nodemailer');

// var passport = require('passport');
// require('../../config/passport')(passport);

//Note Model
const Note = require('../../models/Notes');

// @route GET api/notes
// @desc GET all notes
// @access Public
router.get('/notes', (req,res) => {
    Note.find()
        .sort({ notetitle: -1 })
        .then(note => res.json(note));
});

// router.get('/notes',passport.authenticate('jwt', { session: false }), function(req, res) {
//     var token = getToken(req.headers);
//     if(token) {
//         Note.find(function(err, notes) {
//             if(err) return next(err);
//             res.json(notes);
//         });
//     }
//     else {
//         return res.status(403).send({success: false, msg: 'Unauthorised'});
//     }
// });

/*----- Save Note -----*/
// @route POST api/notes
// @desc POST a note
// @access Public
router.post('/notes', (req,res) => {
    const newNote = new Note({
        userId: req.body.userId,
        notetitle: req.body.notetitle,
        notedata: req.body.notedata,
        ispin: req.body.ispin,
        istrash: req.body.istrash,
        isarchive: req.body.isarchive,
        background: req.body.background,
        reminder: req.body.reminder,
        label: req.body.label,
        image: req.body.image,
        sharenotewith: req.body.sharenotewith
    });

    // newNote.save().then(note => res.json(note));
    
    newNote.save((err) => {
        if(err) {
            console.log("Failed",err);
            return res.json({success: false, msg: "Failed"});
        }
        res.json({success: true, msg: "Successful."});
    });
});

// router.post('/notes', passport.authenticate('jwt', {session: false}),function(req, res) {
//     var token = getToken(req.headers);
//     if(token) {
//         Note.create(req.body, function(err, post) {
//             if(err) return next(err);
//             res.json(post);
//         });
//     }
//     else {
//         return res.status(403).send({ success: false, msg: 'Unauthorized.'});
//     }
// });

/*----- Delete Note ------*/
// @route DELETE api/users
// @desc DELETE a user
// @access Public
router.delete('/notes/:id', function(req, res, next) {
    Note.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  
/*----- Update Note ------*/
// @route PUT api/notes
// @desc PUT a note
// @access Public 
router.put('/notes/:id', (req,res,next) => {
    Note.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
        if(err) return next(err);
        res.json(post);
    });
});

// getToken = function(headers) {
//     if(headers && headers.authorization) {
//         var parted = head
//         .authorization.split(' ');
//         if(parted.length === 2) {
//             return parted[1];
//         }
//         else {
//             return null;
//         }
//     }
//     else {
//         return null;
//     }
// };


router.post('/sharenote', function(req, res) {
    username = req.body.username;
    sharewith = req.body.sharenotewith;
    userfullname = req.body.userfullname;

    async.waterfall([
      function(done) {
        Note.findOne({ _id: req.body.key}, function(err, note) {
            if (!Note) {
                res.status(401).send({success: false, msg: 'Failed.'});
            }

            note.sharenotewith = req.body.sharenotewith;

            note.save(function(err) {
                done(err, note);
            });
        });
      },
      function(note, done) {
        var smtpTransport = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'sadesale94@gmail.com',
            pass: 'Sdesale25#'
          }
        });
        var mailOptions = {
          to: note.sharenotewith,
          from: userfullname,
          subject: 'Shared a note with you',
          text: 'Hello,\n\n' +
            userfullname + '( ' + username +' )' + 'shared a note with you.\n\n' +
            'http://localhost:3000/home/notes'
        };

        smtpTransport.sendMail(mailOptions, function(err) {
            res.json({success: true, msg: 'Success!.'})
        });
      }
    ], function(err) {
        res.json({success: false, msg: 'Failed'});
    });
  });

module.exports = router;