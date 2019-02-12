const express = require('express');
const router = express.Router();

// Get relevant route handlers
const { getAllRecords, getOneProjectType } = require('../handlers/projectsHandlers');

// This responds with a single object whose keys correspond to project types (react, js, etc.)
// Each key contains an array of objects.  Each object represents the data for a single project
// of the appropriate type for that key.
router.get('/', getAllRecords);

// This responds with a single array of objects.  Each object represents the data for a single
// project of the type that corresponds to the 'name' parameter in the request.
router.get('/:name', getOneProjectType);

module.exports = router;