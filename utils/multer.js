const multer = require("multer");
const path = require("path");

// Multer config
// cb = call back
module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname)
        if (ext !== ".jpg" && ext != ".jpeg" && ext !== ".png" && ext != ".JPG" && ext != ".JPEG" && ext != ".PNG") {
            cb(("File type is not supported"), false);
            return;
        }
        cb(null, true);
    },
});