const path = require('path');
const fs = require('fs');

const safelyDeleteImage = (imageUrl) => {
  try {
    const filename = new URL(imageUrl).pathname.split('/uploads/')[1];
    if (!filename) return;

    const filePath = path.join(__dirname, '../public/uploads', filename);
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (!err) {
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) console.error('❌ Error deleting:', filename);
          else console.log('✅ Deleted:', filename);
        });
      } else {
        console.warn('⚠️ File not found:', filename);
      }
    });
  } catch (e) {
    console.warn('⚠️ Invalid image URL:', imageUrl);
  }
};
module.exports = {
  safelyDeleteImage,
};
