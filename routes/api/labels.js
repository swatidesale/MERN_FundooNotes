const express = require('express');

const router = express.Router();

//Note Model
const Label = require('../../models/Labels');

// @route GET api/notes
// @desc GET all notes
// @access Public
router.get('/labels', (req,res) => {
    Label.find()
        .sort({ newlabel: -1 })
        .then(label => res.json(label));
});

// router.get('/', function(req, res, next) {
//     Book.find(function (err, products) {
//       if (err) return next(err);
//       res.json(products);
//     });
//   });

/*----- Save Note -----*/
// @route POST api/notes
// @desc POST a note
// @access Public
router.post('/labels', (req,res) => {
    const newLabel = new Label({
        newlabel: req.body.newlabel,
        userId: req.body.userId
    });

    // newNote.save().then(note => res.json(note));

    newLabel.save((err) => {
        if(err) {
            console.log("Failed",err);
            return res.json({success: false, msg: "Failed"});
        }
        res.json({success: true, msg: "Successful."});
    });
});

/*----- Delete Note ------*/
// @route DELETE api/users
// @desc DELETE a user
// @access Public
// router.delete('/notes/:id', (req,res) => {
//     Note.findById(req.params.id)
//         .then(user => user.remove().then(() => res.json({ success: true }))
//         ).catch(err => res.status(404).json({ success: false }))
// });

// router.delete('/notes/:id', function(req, res, next) {
//     Note.findByIdAndRemove(req.params.id, req.body, function (err, post) {
//       if (err) return next(err);
//       res.json(post);
//     });
//   });
  
  
/*----- Update Note ------*/
// @route PUT api/notes
// @desc PUT a note
// @access Public 
// router.put('/notes/:id', (req,res,next) => {
//     Note.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
//         if(err) return next(err);
//         res.json(post);
//     });
// });

module.exports = router;