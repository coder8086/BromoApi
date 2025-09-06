const express = require("express");
const router = express.Router();
const campaignController = require("../controllers/campaignController");
const multer = require("multer");

// file upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Routes
router.post("/createCampaign", upload.single("media"), campaignController.createCampaign);
router.get("/getCampaign", campaignController.getCampaigns);
router.get("getCompaignById/:id", campaignController.getCampaignById);
router.put("updateCompaign/:id", upload.single("media"), campaignController.updateCampaign);
router.delete("deleteCampaign/:id", campaignController.deleteCampaign);

module.exports = router;
