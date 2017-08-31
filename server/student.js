'use strict';
const router = require('express').Router();
const db = require('../db');
const Students = db.models.user;
const Campus = db.models.campus;

// Get /api/student route
router.get('/', (req, res) => {
	Students.findAll({
		include: {model: Campus, as: 'campus_name'},
		order: ['id']
	})
	.then((studentList)=>res.send(studentList))
	.catch(console.error);
});

// Get single student route
router.get('/:id', (req,res) => {
	Students.findOne({
		where: {
			id: req.params.id
		},
		include: {model: Campus, as:'campus_name'}
	})
	.then((campus) =>{
		if (campus === null) {
			res.status(404).send();
		} else {
			res.send(campus);
		}
	})
	.catch(console.error);
});

// This route allows for the edit/update of data
router.put('/:id', function (req, res, next) {
	Students.findOne({
		where: {
			id: req.params.id
		}
	})
	.then(function (student) {
		for (var key in req.body) {
			student[key] = req.body[key];
		}
		return student.save();
	})
	.then((student) => res.json(student))
	.catch(console.error);
});

// This route allows for the addition of data
router.post('/', function (req, res, next) {
	Students.create(req.body)
	.then((student) => res.json(student))
	.catch(console.error);
});

// This route allows for the delete of data
router.delete('/:id', function (req, res, next) {
	Students.destroy({
		where: {
			id: req.params.id
		}
	})
	.then((student) => res.json(student))
	.catch(console.error);
});

module.exports = router;
//.status(204).end()
