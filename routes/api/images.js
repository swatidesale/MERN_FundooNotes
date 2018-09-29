const express = require('express');

const router = express.Router();
const multer = require('multer');
const path = require('path');

const Image = require('../../models/Images');


// @route GET api/labels
// @desc GET all labels
// @access Public
router.get('/uploadimage', (req,res) => {
    Image.find()
        .sort({ image: -1 })
        .then(image => res.json(image));
});

const storage = multer.diskStorage({
    destination: './client/src/assets',
    filename: function(req, file, cb) {
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000},
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('newimage');

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname) {
        return cb(null,true);
    } else {
        cb('Error: Images Only!');
    }
}

router.use(express.static('./public'));


router.post('/uploadimage', (req,res) => {
    console.log("Upload image");
    upload(req, res, (err) => {
        if(err) {
            console.log("First err", err);
            res.send({
                msg: err
            });
        }
        else if(req.file === undefined) {
            console.log("NO file selected");
            res.send({
                msg: 'No File selected'
            });
        }
        else {
            console.log("FIle uploaded");
            console.log("Path : ",req.file.filename);
            console.log("Path : ",req.file.path);
            
            const newImage = new Image({
                image: `/Users/bridgeit/Desktop/swati/MERNFundooApp/${req.file.path}`
            });
            
            newImage.save((err) => {
                if(err) {
                    console.log("Failed",err);
                    return res.json({success: false, msg: "Failed"});
                }
                res.json({success: true, msg: "Successful."});
            });

            // res.json({
            //     msg: 'File uploaded',
            //     file: `uploads/${req.file.path}`
            // });

            // Note.findOne({notetitle: req.body.notetitle}, function(err, note) {
            //     if (err) {
            //         return done(err);
            //     }

            //     note.image = `/Users/bridgeit/Desktop/swati/MERNFundooApp/${req.file.path}`
            //     console.log("Image.....",note.image);
                
            //     note.save(function(err) {
            //         if (err) {
            //             throw err;
            //         }
            //     });
            // });
        }
    });
});

module.exports = router;