function handleErrors(err, req, res, next) {
	if(err) {
		res.json({
			name: 'From custom err handler',
			message: err.message
		});
	}
};

module.exports = handleErrors;