const express = require('express');

const router = express.Router();

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
router.post('/notes', (req,res) => {
    const newNote = new Note({
        notetitle: req.body.notetitle,
        notedata: req.body.notedata,
        ispin: req.body.ispin,
        istrash: req.body.istrash,
        isarchive: req.body.isarchive,
        background: req.body.background,
        reminder: req.body.reminder
    });

    // newNote.save().then(note => res.json(note));

    newNote.save((err) => {
        if(err) {
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

module.exports = router;