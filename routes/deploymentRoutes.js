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

const requestSignatureIsValid = (incomingSignature, payload, secret) => {
    const signatureToMatch =
        "sha1=" +
        createHmac("sha1", secret)
            .update(payload)
            .digest("hex");
    return timingSafeEqual(
        Buffer.from(incomingSignature),
        Buffer.from(signatureToMatch)
    );
};

router.post("/", (req, res) => {
    // get signature from request header
    const incomingSignature = req.get("X-Hub-Signature");

    // stringify the JSON payload of request so it can be added to
    // HMAC hash
    const payload = JSON.stringify(req.body);

    if (requestSignatureIsValid(incomingSignature, payload, WEBHOOK_SECRET)) {
        updateClient();
        res.send("Client update request accepted");
    } else {
        throw new Error("Request failed--permission denied");
    }
});

module.exports = router;
