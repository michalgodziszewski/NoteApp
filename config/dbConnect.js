const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const dbConnect = async () => {
  try {
    await mongoose.connect(db, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true
    });

    console.log('MongoDb Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = dbConnect;
