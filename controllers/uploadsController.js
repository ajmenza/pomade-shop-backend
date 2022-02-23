const path = require('path');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadProductImageLocal = async (req, res) => {
  // check if file exists
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded');
  }
  const productImage = req.files.image;
  // check format
  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please Upload Image');
  }
  const maxSize = 1024 * 1024;
  // check size
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError('Please uploade image smaller than 1KB');
  }
  const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`);

  await productImage.mv(imagePath);
  return res.status(StatusCodes.OK).json({ image: { src: `/uploads/${productImage.name}` } });
}

const uploadProductImage = async (req, res) => {
  console.log(req.files);
  // Cloudinary handles all of the erros
  const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
    use_filename: true,
    folder: 'pomade-shope/products'
  });
  // Deletes image from temp folder since we no longer need it
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
}

module.exports = {
  uploadProductImage
}
