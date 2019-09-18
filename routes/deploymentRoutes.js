const { exec } = require("child_process");
const express = require("express");
const router = express.Router();
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
const { createHmac, timingSafeEqual } = require("crypto");

const updateClient = () => {
    exec("scripts/updateClient.sh", (err, stdout, stderr) => {
        if (err) {
            throw err;
        }

        console.log(stdout);
    });
};

const genComparisonHash = (body) => {
    const hmac = createHmac("sha1", WEBHOOK_SECRET);

    hmac.update(body);

    return `sha1=${hmac.digest("hex")}`;
};

router.post("/", (req, res) => {
    // convert to buffer for timing-safe comparison
    const incomingHashBuffer = Buffer.from(req.get("X-Hub-Signature"));
    const comparisonHashBuffer = genComparisonHash(req.body);

    if (timingSafeEqual(incomingHashBuffer, comparisonHashBuffer)) {
        updateClient();
        res.send("Client update request accepted");
    } else {
        throw new Error("Request failed--permission denied");
    }
});

module.exports = router;
