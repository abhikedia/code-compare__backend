const express = require('express');
const router = express.Router();

router.route("/").get((_, res) => res.json("Running"));

module.exports = router;
