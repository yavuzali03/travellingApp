const express = require("express");
const router = express.Router();
const { getNearbyAll } = require("../controllers/places");

router.get("/all-nearby", getNearbyAll);

module.exports = router;
