'use strict';
const router = require('express').Router();
const db = require('../db');
const Campus = db.models.campus;
const Students = db.models.user;

// Get /api/campus route
router.get('/', (req, res) => {
	Campus.findAll()
	.then((campusList)=>res.send(campusList))
	.catch(console.error);
});

// Get single student route
router.get('/:id', (req,res) => {
	Campus.findOne({
		where: {
			id: req.params.id
		},
		include: [{model: Students, as:'student'}]
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
	Campus.findOne({
		where: {
			id: req.params.id
		}
	})
	.then(function (campus) {
		for (var key in req.body) {
			campus[key] = req.body[key];
		}
		return campus.save();
	})
	.then((campus) => res.json(campus))
	.catch(next);
});

// This route allows for the addition of data
router.post('/', function (req, res, next) {
	Campus.create(req.body)
	.then((campus) => res.json(campus))
	.catch(next);
});

// This route allows for the delete of data
router.delete('/:id', function (req, res, next) {
	Campus.destroy({
		where: {
			id: req.params.id
		}
	})
	.then((campus) => res.json(campus))
	.catch(next);
});

module.exports = router;
