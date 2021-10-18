const multer = require("multer");


exports.filesMulter = multer({
    fileFilter: (req, file, cb) => {
    cb(null, true);  
    }
})