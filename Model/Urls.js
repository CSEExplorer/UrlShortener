const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  shortUrl: {
    type: String,
    required: true,
    unique: true, 
  },
  redirectUrl: {
    type: String,
    required: true, // Typically, a redirect URL should be required
    
  },
  visitHistory: [
    {
      timeStamp: {
        type: Date,
        default: Date.now, // Automatically adds the current timestamp
      },
    },
  ],
  createdBy:{
    type : mongoose.Schema.Types.ObjectId,
    ref:"users"
  }
},{timestamps:true});

const Url = mongoose.model("Url", UrlSchema);

module.exports = Url;
