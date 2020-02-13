const path = require("path");

function sendResume(req, res) {
    const file = path.resolve(__dirname, "..", "resources", "resume_pdf.pdf");
    res.download(file);
}

module.exports = {
    sendResume
};
