'use strict';
const api = require('express').Router();
const db = require('../db');
const campus = db.models.campus;

// Get /api/campus route
api.get('/', (req, res) => {
	campus.findAll()
	.then((campusList)=>res.send(campusList))
	.catch(console.error);
});

module.exports = api;
