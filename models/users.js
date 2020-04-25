const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
	firstname: {
		type: String,
		required: false,
		minlength: 5,
		maxlength: 50,
	},
	lastname: {
		type: String,
		required: false,
		minlength: 5,
		maxlength: 50,
	},
	phonenumber: {
		type: String,
		required: false,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 8,
		maxlength: 40,
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
	},
	profile_image: {
		type: String,
	},
});

module.exports = mongoose.model('User', userScheme);
