const express = require('express');

const router = express.Router();

//Label Model
const Label = require('../../models/Labels');

// @route GET api/labels
// @desc GET all labels
// @access Public
router.get('/labels', (req,res) => {
    Label.find()
        .sort({ newlabel: -1 })
        .then(label => res.json(label));
});

/*----- Save Note -----*/
// @route POST api/labels
// @desc POST a label
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
// @route DELETE api/labels
// @desc DELETE a label
// @access Public
router.delete('/labels/:id', function(req, res, next) {
    Label.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
});
  
/*----- Update Note ------*/
// @route PUT api/notes
// @desc PUT a note
// @access Public 
router.put('/labels/:id', (req,res,next) => {
    Label.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
        if(err) return next(err);
        res.json(post);
    });
});

module.exports = router;