const asyncHandler = require("../helpers/asyncHandler");
const { uploadFile } = require("../helpers/s3");
const request = require("request")
const fs = require("fs")
const path = require("path")
exports.uploadGet = asyncHandler(async (req, res, next) => {
    res.render("upload")
})

exports.uploadPost = asyncHandler(async (req, res, next) => {
    /* const upload = await uploadFile(req.files[0]) */

    const thePath = path.join(process.cwd(), "public", "content", `${req.body.title.toLowerCase().split(" ").join("_") + "." + req.body.type}`)
  
    request.head(req.body.url, function(err, resp, body){
    
    let contentType = resp.headers['content-type'];

    request(req.body.url).pipe(fs.createWriteStream(thePath)).on('close', async () => {
        
        //Upload To S3
        const readeable = fs.readFileSync(thePath);
        const upload = await uploadFile({
            buffer: readeable,
            originalname: req.body.title + "." + req.body.type,
            contentType
        });

        res.json({ status: true, data: upload })

        //Delete FIle
        fs.unlinkSync(thePath)
        
    });
  });
    
    
})