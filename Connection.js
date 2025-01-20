const mongoose = require("mongoose");

const ConnectMongoDb = async (uri) => {
  return mongoose.connect(uri);
};

module.exports = { ConnectMongoDb };
