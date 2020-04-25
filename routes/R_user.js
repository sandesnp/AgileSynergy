const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const USER = require('../models/users');
const AUTH = require('./R_auth');

router.post('/signup', (req, res, next) => {
	USER.findOne({ email: req.body.email })
		.then((usersA) => {
			if (usersA != null) {
				let err = new Error(
					'This email has been already used for Registration.'
				);
				err.status = 401;
				return next(err);
			} else {
				bcrypt.hash(req.body.password, 10, function (err, hash) {
					if (err) {
						throw new Error('Could not encrypt Password!');
					}
					let USERA = new USER(req.body);
					USERA.password = hash;
					USERA.save().then((usersB) => {
						let token = jwt.sign({ userID: usersB._id }, process.env.SECRET);
						res.json({ status: 'Signup Success!', token: token });
					});
				});
			}
		})
		.catch(next);
	console.log('Signup Post');
});

router.post('/login', (req, res, next) => {
	USER.findOne({ username: req.body.username })
		.then((usersA) => {
			if (usersA === null) {
				let err = new Error('Username not found!');
				err.status = 401;
				return next(err);
			}
			bcrypt.compare(req.body.password, usersA.password, function (
				err,
				status
			) {
				if (!status) {
					let err = new Error('Password does not match!');
					err.status = 401;
					return next(err);
				}
				console.log('Login post');
				let token = jwt.sign({ userID: usersA._id }, process.env.SECRET);
				res.json({ status: 'Successfully logged in', token: token });
			});
		})
		.catch(next);
});

module.exports = router;
