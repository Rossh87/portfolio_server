function handleErrors(err, req, res, next) {
	if(err) {
		res.status(404).json({
			name: 'From custom err handler',
			message: err.message
		});
	}
};

module.exports = handleErrors;