const URL = require("../models/URL");
const { nanoid } = require("nanoid");
const { transforURL } = require("../utils/helper");

/**
 * Creates a new short URL from an original URL
 * @async
 * @function handleCreateShortURL
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.originalUrl - The original URL to be shortened
 * @param {Object} res - Express response object
 * @returns {Promise<void>} JSON response with the created short URL data or error message
 * @description This function creates a short URL using nanoid, stores it in the database, and returns the short URL details
 * @example
 * // POST /api/shorten
 * // Body: { "originalUrl": "https://example.com" }
 * // Response: { "status": "success", "data": { "originalUrl": "https://example.com", "shortUrl": "http://localhost:3000/abc123", "shortCode": "abc123" } }
 */
const handleCreateShortURL = async (req, res) => {
  const { originalUrl } = req.body;
  let finalUrl = transforURL(originalUrl);
  console.log(req,'reqqq')
  if (!originalUrl)
    return res
      .status(400)
      .json({ status: "error", message: "Original URL is required." });

  try {
    const shortCode = nanoid(8);
    const newUrl = await URL.create({
      shortCode,
      originalUrl: finalUrl,
      createdBy: req.user._id,
    });
    res.status(201).json({
      status: "success",
      message: "Short URL created",
      data: {
        originalUrl: finalUrl,
        shortUrl: `http://localhost:${process.env.PORT}/${shortCode}`,
        shortCode,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

/**
 * Redirects to the original URL using the short code and tracks visit analytics
 * @async
 * @function handleRedirectToOriginalURL
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.shortCode - The short code to look up
 * @param {string} req.ip - Client IP address
 * @param {Object} req.headers - Request headers containing user-agent, referrer, etc.
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Redirects to original URL or returns error message
 * @description This function finds the original URL by short code, increments visit count, logs visit details, and redirects the user
 * @example
 * // GET /abc123
 * // Redirects to the original URL and logs visit analytics
 */
const handleRedirectToOriginalURL = async (req, res) => {
  const shortCode = req.params.shortCode;
  console.log(shortCode, "shortCode");
  try {
    const urlEntry = await URL.findOne({ shortCode });
    if (!urlEntry) {
      return res.status(404).json({
        status: "error",
        message: "Short URL not found",
      });
    }
    const visitDetails = {
      timestamp: Date.now(),
      ip: req.ip || req.headers["x-forwarded-for"],
      userAgent: req.headers["user-agent"],
      referrer: req.get("referrer") || req.get("referer") || "N/A",
    };
    urlEntry.visitCount += 1;
    urlEntry.visitHistory.push(visitDetails);
    await urlEntry.save();
    res.redirect(urlEntry.originalUrl);
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "Server Error", error: err.message });
  }
};

/**
 * Updates the original URL for an existing short code
 * @async
 * @function handleUpdateShortURL
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.shortCode - The short code to update
 * @param {Object} req.body - Request body
 * @param {string} req.body.originalUrl - The new original URL
 * @param {Object} res - Express response object
 * @returns {Promise<void>} JSON response with updated URL data or error message
 * @description This function updates the original URL associated with a short code while preserving visit analytics
 * @example
 * // PUT /api/url/abc123
 * // Body: { "originalUrl": "https://newexample.com" }
 * // Response: { "status": "success", "message": "Short URL updated successfully.", "data": {...} }
 */
const handleUpdateShortURL = async (req, res) => {
  const { shortCode } = req.params;
  const { originalUrl } = req.body;
  if (!originalUrl || originalUrl.trim() === "") {
    return res.status(400).json({
      status: "error",
      message: "Original URL is required and must be a non-empty string.",
    });
  }
  let finalUrl = transforURL(originalUrl);
  try {
    const updatedUrl = await URL.findOneAndUpdate(
      { shortCode },
      { originalUrl: finalUrl },
      { new: true, runValidators: true }
    );
    if (!updatedUrl)
      return res.stauts(404).json({
        status: "error",
        message: "Short URL not found.",
      });
    res.status(200).json({
      status: "success",
      message: " Short URL updated successfully.",
      data: updatedUrl,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: "error",
      message: "Server Error",
      error: err.message,
    });
  }
};

/**
 * Deletes a short URL entry from the database
 * @async
 * @function handleDeleteShortURL
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.shortCode - The short code to delete
 * @param {Object} res - Express response object
 * @returns {Promise<void>} JSON response with deleted URL data or error message
 * @description This function permanently removes a short URL entry and all its associated analytics data
 * @example
 * // DELETE /api/url/abc123
 * // Response: { "status": "success", "message": "Short URL deleted", "data": {...} }
 */
const handleDeleteShortURL = async (req, res) => {
  const { shortCode } = req.params;
  try {
    const deletedUrl = await URL.findOneAndDelete({ shortCode });
    if (!deletedUrl) {
      return res.status(404).json({
        status: "error",
        message: "Short URL not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Short URL deleted",
      data: deletedUrl,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: "error",
      message: "Server Error",
      error: err.message,
    });
  }
};

/**
 * Retrieves all short URLs from the database
 * @async
 * @function handleGetAllShortURL
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} JSON response with array of all URL entries or error message
 * @description This function fetches and returns all short URL entries stored in the database
 * @example
 * // GET /api/urls
 * // Response: { "status": "success", "data": { "urls": [...] } }
 */
const handleGetAllShortURL = async (req, res) => {
  try {
    const urls = await URL.find({});
    res.status(200).json({
      status: "success",
      data: { urls },
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: "error",
      message: "Server Error",
      error: err.message,
    });
  }
};

/**
 * Retrieves analytics and statistics for a specific short URL
 * @async
 * @function handleGetStats
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.shortCode - The short code to get statistics for
 * @param {Object} res - Express response object
 * @returns {Promise<void>} JSON response with URL statistics including visit count and history or error message
 * @description This function returns comprehensive analytics data for a short URL including visit count, visit history with timestamps, IP addresses, user agents, and referrers
 * @example
 * // GET /api/stats/abc123
 * // Response: { "status": "success", "data": { "originalUrl": "https://example.com", "shortUrl": "localhost:3000/abc123", "visitCount": 5, "visitHistory": [...] } }
 */
const handleGetStats = async (req, res) => {
  const { shortCode } = req.params;
  try {
    const urlEntry = await URL.findOne({ shortCode });
    if (!urlEntry)
      return res
        .status(404)
        .json({ status: "error", message: "Short URL not found" });
    res.status(200).json({
      status: "success",
      data: {
        originalUrl: urlEntry.originalUrl,
        shortUrl: `localhost:${process.env.PORT}/${shortCode}`,
        visitCount: urlEntry.visitCount,
        visitHistory: urlEntry.visitHistory,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      status: "error",
      message: "Server Error",
      error: err.message,
    });
  }
};

module.exports = {
  handleCreateShortURL,
  handleRedirectToOriginalURL,
  handleUpdateShortURL,
  handleDeleteShortURL,
  handleGetAllShortURL,
  handleGetStats,
};
