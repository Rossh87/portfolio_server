// express setup
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const path = require('path');

// Get middleware and local handlers
const bodyParser = require('body-parser');
const handleErrors = require('./handlers/errorHandlers');
const cors = require('cors');

// Get routers
const projectRoutes = require('./routes/projectRoutes');
const emailRoutes = require('./routes/emailRoutes');

// Add middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(`${__dirname}/../portfolio_client/build`));

// routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', emailRoutes);


// Serve bundle
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../portfolio_client/build/index.html'));
});

// Handle errors
app.use(handleErrors);

// init server on PORT
app.listen(PORT || 8002, () => {
	console.log(`listening on ${PORT || "8002"}`);
})