const express = require("express");
const {
  handleCreateShortURL,
  handleRedirectToOriginalURL,
  handleUpdateShortURL,
  handleDeleteShortURL,
  handleGetAllShortURL,
  handleGetStats
} = require("../controllers/url");
const router = express.Router();

router.route("/").get(handleGetAllShortURL).post(handleCreateShortURL);
router.route('/status/:shortCode').get(handleGetStats)

router
  .route("/:shortCode")
  .get(handleRedirectToOriginalURL)
  .patch(handleUpdateShortURL)
  .delete(handleDeleteShortURL);

module.exports = router;
