const MAILGUN_API_KEY=process.env.MAILGUN_API_KEY;
const MAILGUN_DOMAIN_NAME=process.env.MAILGUN_DOMAIN_NAME;
const mailgun = require('mailgun-js')({apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN_NAME});

module.exports = mailgun;