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
const downloadRoutes = require('./routes/downloadRoutes');

// Add middlewares
app.use(bodyParser.json());
app.use(cors());

// Serve static assets (i.e. React bundles).  Note that
// client-side build process handles file versioning,
// so we can safely cache responses for a long time.
app.use(express.static(
	`${__dirname}/../portfolio_client/build`),
	{maxAge: '30 days'}
);

// routes.  Note these routes *must* terminate the req/res cycle
// Otherwise the request will fall through to the wildcard route below,
// and server will respond with index.html rather than just AJAX data.
app.use('/api/projects', projectRoutes);
app.use('/api/contact', emailRoutes);
app.use('/api/download', downloadRoutes);


// Serve built HTML.  We'll cache this as well.
app.get('*', (req, res) => {
	res.sendFile(
		path.join(__dirname, '../portfolio_client/build/index.html'),
		{maxAge: '30 days'}	
	);
});

// Handle errors
app.use(handleErrors);

// init server on PORT
app.listen(PORT || 8002, () => {
	console.log(`listening on ${PORT || "8002"}`);
})