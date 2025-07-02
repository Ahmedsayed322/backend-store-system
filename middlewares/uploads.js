const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName = uniqueName + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Only image files are allowed (jpeg, png, jpg, webp)'), false);
  }

  // ✅ منع الصور المتكررة داخل نفس الطلب
  if (!req._uploadedFilenames) req._uploadedFilenames = new Set();

  if (req._uploadedFilenames.has(file.originalname)) {
    return cb(new Error(`Duplicate image "${file.originalname}" in request`), false);
  }

  req._uploadedFilenames.add(file.originalname);

  // ✅ منع الصور المكررة على السيرفر (اختياري)
  const uploadPath = path.join(__dirname, '..', 'public', 'uploads', file.originalname);
  if (fs.existsSync(uploadPath)) {
    return cb(new Error(`File "${file.originalname}" already exists on server`), false);
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
});

const multipleUpload = upload.fields([
  { name: 'images', maxCount: 5 },
  { name: 'coverImage', maxCount: 1 },
]);
module.exports = multipleUpload;
////////////////////////////////////////////////////////////////////
// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('../utils/cloud'); // تأكد إن المسار صح

// // إعداد التخزين على Cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     const folderName = 'uploads'; // اسم الفولدر على Cloudinary
//     const fileName = `${Date.now()}-${file.originalname}`;
//     return {
//       folder: folderName,
//       public_id: fileName,
//       allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
//     };
//   },
// });

// // فلترة الملفات (يسمح فقط بالصور)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
//   if (!allowedTypes.includes(file.mimetype)) {
//     return cb(new Error('Only image files are allowed (jpeg, png, jpg, webp)'), false);
//   }
//   cb(null, true);
// };

// // إعداد multer
// const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 2 * 1024 * 1024, // 2MB
//   },
// });

// const multipleUpload = upload.fields([
//   { name: 'images', maxCount: 5 },
//   { name: 'coverImage', maxCount: 1 },
// ]);

// module.exports = multipleUpload;
