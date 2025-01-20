const shortid = require("shortid");
//nanoid is not working
const Url = require("../Model/Urls");

// we will give shortUrl and this will give us the coresponsign redirect url
//model is collection in the database

const handleCreateShortUrl = async (req, res) => {
  const { redirectUrl } = req.body;
  if (!redirectUrl) {
    return res.status(400).json({ error: "redirectUrl is required" });
  }
  const shortUrl = shortid();
  try {
    const newUrl = new Url({
      shortUrl,
      redirectUrl,
      visitHistory: [],
      createdBy:req.user._id
    });

    await newUrl.save();

    return res.render("home",{id:shortUrl})

    //  return res.status(201).json({ message: `ShortUrl  ${shortUrl} is created` });
  } catch (err) {
    console.error("Error saving to databse", err.message);
    res.status(500).json({ error: "Failed to create Short Url" });
  }
};

const handleGetRedirectUrl = async (req, res) => {
  try {
    const shortUrl  = req.params.shortUrl;
    const entry = await Url.findOneAndUpdate(
      { shortUrl },
      {
        $push: {
          visitHistory: { timeStamp :Date.now()},
        },
      }
    );
    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }
    res.status(200).redirect(entry.redirectUrl);
    
  } catch (err) {
    console.error("Error fetching metadata:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


const handleGetVisitCount = async (req, res) => {
  try {
    const shortUrl = req.params.shortUrl;
    const entry = await Url.findOne(
      { shortUrl },);
    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }
    res.status(200).json({VisitCount:entry.visitHistory.length})
  } catch (err) {
    console.error("Error fetching metadata:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};





module.exports = { handleCreateShortUrl, handleGetRedirectUrl,handleGetVisitCount };
