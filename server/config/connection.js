const mongoose = require("mongoose");

// created connection for heroku and local
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/googlebooks"
);

module.exports = mongoose.connection;
