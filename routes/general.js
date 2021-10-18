const { uploadGet, uploadPost } = require("../controller/uploadController");
const { filesMulter } = require("../middleware/multer");

const generalRoute = require("express").Router();

//HOMEPAGE
generalRoute.route("/").get(uploadGet).post(filesMulter.any(), uploadPost)


module.exports = generalRoute