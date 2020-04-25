//Requirements
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

//Routes
const RouteUser = require('./routes/R_user');
const AUTH = require('./routes/R_auth');
const profileUpload = require('./routes/image_upload');

//Using
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.options('*', cors());
app.use(cors());

mongoose
	.connect(process.env.URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then((db) => {
		console.log('Successfully Connected to mongodb server');
	});

app.use('/users', RouteUser);
app.use('/upload', profileUpload);

app.listen(process.env.PORT, () => {
	console.log(`Application is running in localhost:${process.env.PORT}`);
});
