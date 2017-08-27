'use strict';
const api = require('express').Router();
const db = require('../db');
const students = db.models.user;

// Get /api/student route
api.get('/', (req, res) => {
	students.findAll()
	.then((studentList)=>res.send(studentList))
	.catch(console.error);
});

module.exports = api;
