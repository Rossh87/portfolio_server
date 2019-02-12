// express setup
const express = require('express');
const app = express();
const PORT = process.env.PORT;

// Get middleware and local handlers
const bodyParser = require('body-parser');
const handleErrors = require('./handlers/errorHandlers');
const cors = require('cors');

// Get routers
const projectRoutes = require('./routes/projectRoutes');

// Add middlewares
app.use(bodyParser.json());
app.use(cors());

// routes
app.use('/projects', projectRoutes);

// Handle errors
app.use(handleErrors);

// init server on PORT
app.listen(PORT || 8002, () => {
	console.log(`listening on ${PORT || "8002"}`);
})