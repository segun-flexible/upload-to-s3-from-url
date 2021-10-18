require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET_NAME
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  accessKeyId,
  secretAccessKey
})

// uploads a file to s3
function uploadFile(file) {

  const uploadParams = {
    Bucket: bucketName,
    Body: file.buffer,
    ContentType: file.ContentType,
    Key: file.originalname
  }

  return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile
