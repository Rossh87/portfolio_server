// express setup
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const path = require("path");

// Get middleware and local handlers
const bodyParser = require("body-parser");
const handleErrors = require("./handlers/errorHandlers");
const cors = require("cors");

// Get routers
const projectRoutes = require("./routes/projectRoutes");
const emailRoutes = require("./routes/emailRoutes");
const downloadRoutes = require("./routes/downloadRoutes");
const deploymentRoutes = require("./routes/deploymentRoutes");

// Add middlewares
app.use(bodyParser.json());
app.use(cors());

// Serve static assets (i.e. React bundles).  Note that
// build process handles file versioning of client-side files,
// so we can safely cache responses for a long time.
app.use(
    express.static(`${__dirname}/../portfolio_client/build`, {
        maxAge: "30 days"
    })
);

// Routes.  Note these routes *must* terminate the req/res cycle
// Otherwise the request will fall through to the wildcard route below,
// and server will respond with index.html rather than just AJAX data.
app.use("/api/projects", projectRoutes);
app.use("/api/contact", emailRoutes);
app.use("/api/download", downloadRoutes);
app.use("/deployment", deploymentRoutes);

// Serve built HTML.  Since updates to resources requrested by this file
// will be reflected in the name of the requested file, client should not cache this file for long.
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../portfolio_client/build/index.html"), {
        maxAge: "1m"
    });
});

// Handle errors
app.use(handleErrors);

// init server on PORT
app.listen(PORT || 8002, () => {
    console.log(`listening on ${PORT || "8002"}`);
});
