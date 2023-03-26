const express = require('express');
const compileCode = require('../controllers/codeController');
const router = express.Router();

router.route('/').post(compileCode);

module.exports = router;