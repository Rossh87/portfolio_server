const express = require('express');
const router = express.Router();
const {sendResume} = require('../handlers/downloadHandlers');

router.get('/resume', sendResume);

module.exports = router;