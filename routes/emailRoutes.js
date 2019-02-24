const express = require('express');
const router = express.Router();
const {
	sendEmailMessage,
	validatorChain,
	extractErrors
} = require('../handlers/emailHandlers');

router.post('/', validatorChain, extractErrors, sendEmailMessage);

module.exports = router;