// extract env variables
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

// setup Airtable to request remote db
const Airtable = require('airtable');

// incorporate api key automatically
Airtable.configure({
	apiKey: AIRTABLE_API_KEY
});

// return configured airtable object that server will use
const db = Airtable.base(AIRTABLE_BASE_ID);

module.exports = db;