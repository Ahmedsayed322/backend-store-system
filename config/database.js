const mongoose = require('mongoose');
const startConnection = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('❌ Failed to connect to MongoDB:', err.message);
      process.exit(1);
    });
};
module.exports = {
  startConnection,
};
