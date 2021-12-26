import AWS from 'aws-sdk'

const AWS_ACCESS_KEY_ID = process.env.NX_AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.NX_AWS_SECRET_ACCESS_KEY
const AWS_REGION = process.env.NX_AWS_REGION
const AWS_BUCKET = process.env.NX_AWS_BUCKET
const AWS_S3_DOMAIN = process.env.NX_AWS_S3_DOMAIN

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
})

const myBottlesBucket = new AWS.S3({
  params: { Bucket: AWS_BUCKET },
  region: AWS_REGION,
})

const getS3PutObjectParams = (image, name) => ({
  ACL: 'public-read',
  Body: image,
  Bucket: AWS_BUCKET,
  Key: name,
})

export const uploadImage = async (image: File): Promise<string> => {
  if (!image) return

  const imageName = `${Date.now()}_${image.name.replaceAll(' ', '_')}`
  const uploadedFile = await myBottlesBucket
    .putObject(getS3PutObjectParams(image, imageName))
    .promise()

  if (uploadedFile.$response.httpResponse.statusCode !== 200) {
    throw new Error('Upload failed')
  }

  return AWS_S3_DOMAIN + imageName
}
