const Campaign = require("../models/compagain");

// Create new campaign
exports.createCampaign = async (req, res) => {
  try {
    const {
      campaignName,
      objective,
      ctaLabel,
      headline,
      description,
      destination,
      locationType,
      location,
      latitude,
      longitude,
      radius,
      minAge,
      maxAge,
      gender,
      interests,
      dailyBudget,
      totalDays,
      startDate,
      endDate,
      bidding,
      maxBid,
    } = req.body;

    // handle media file (if uploaded)
    let mediaFile = null;
    if (req.file) {
      mediaFile = req.file.filename; // store filename
    }

    const campaign = await Campaign.create({
      campaignName,
      objective,
      ctaLabel,
      headline,
      description,
      media: mediaFile,
      destination,
      locationType,
      location,
      latitude: latitude ? parseFloat(latitude) : null,
      longitude: longitude ? parseFloat(longitude) : null,
      radius: radius ? parseInt(radius) : null,
      minAge: minAge ? parseInt(minAge) : null,
      maxAge: maxAge ? parseInt(maxAge) : null,
      gender,
      interests: interests ? JSON.parse(interests) : [],
      dailyBudget: dailyBudget ? parseFloat(dailyBudget) : null,
      totalDays: totalDays ? parseInt(totalDays) : null,
      startDate,
      endDate,
      bidding,
      maxBid: maxBid ? parseFloat(maxBid) : null,
    });

    res.status(201).json({ success: true, campaign });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to create campaign" });
  }
};

// Get all campaigns
exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.findAll();
    res.json({ success: true, campaigns });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch campaigns" });
  }
};

// Get campaign by ID
exports.getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findByPk(req.params.id);
    if (!campaign) return res.status(404).json({ error: "Campaign not found" });
    res.json({ success: true, campaign });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch campaign" });
  }
};

// Update campaign
exports.updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByPk(req.params.id);
    if (!campaign) return res.status(404).json({ error: "Campaign not found" });

    if (req.file) {
      req.body.media = req.file.filename;
    }
    if (req.body.interests) {
      req.body.interests = JSON.parse(req.body.interests);
    }

    // convert numbers safely
    if (req.body.latitude) req.body.latitude = parseFloat(req.body.latitude);
    if (req.body.longitude) req.body.longitude = parseFloat(req.body.longitude);
    if (req.body.radius) req.body.radius = parseInt(req.body.radius);
    if (req.body.minAge) req.body.minAge = parseInt(req.body.minAge);
    if (req.body.maxAge) req.body.maxAge = parseInt(req.body.maxAge);
    if (req.body.dailyBudget) req.body.dailyBudget = parseFloat(req.body.dailyBudget);
    if (req.body.totalDays) req.body.totalDays = parseInt(req.body.totalDays);
    if (req.body.maxBid) req.body.maxBid = parseFloat(req.body.maxBid);

    await campaign.update(req.body);
    res.json({ success: true, campaign });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to update campaign" });
  }
};

// Delete campaign
exports.deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByPk(req.params.id);
    if (!campaign) return res.status(404).json({ error: "Campaign not found" });

    await campaign.destroy();
    res.json({ success: true, message: "Campaign deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to delete campaign" });
  }
};
