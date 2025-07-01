const cloudinary = require('cloudinary').v2;

cloudinary.config({
  secure: true, // عشان الروابط تبقى https
});

module.exports = cloudinary;
