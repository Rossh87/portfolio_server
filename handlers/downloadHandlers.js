const path = require('path');

function sendResume(req, res) {
	const file = path.resolve(process.cwd(), 'resources', 'resume_pdf.pdf');
	res.download(file);
}

module.exports = {
	sendResume
}