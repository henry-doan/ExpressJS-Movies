var express = require('express');
var redis = require('redis');
var redisClient = redis.createClient();
var router = express.Router();
var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');

/* GET movie listings */
router.get('/', function(req, res, next) {
	Movie.find( function (err, movies, count) {
		res.render('movies', { movies: movies });
	});
});

/* POST add movie */
router.post('/', function(req, res, next) {
	new Movie({
		title: req.body.name,
		description: req.body.description,
		updated_at: Date.now()
	}).save( function( err, movie, count ) {
		res.redirect('/movies');
	});
});

/* GET a movie */
router.get('/:id', function(req, res, next) {
	Movie.findById(req.params.id, function(err, movie) {
		res.render('movie', { movie: movie });
	});
});

/* EDIT a movie */
router.post('/edit/:id', function(req, res, next) {
	Movie.findById( req.params.id, function(err, movie) {
		movie.title = req.body.name,
		movie.description = req.body.description,
		movie.updated_at = Date.now();
		movie.save( function(err, movie, count) {
			res.redirect('/movies');
		});
	});
});

/* DELETE a movie */
router.post('/:id', function(req, res, next) {
	Movie.findById(req.params.id, function(err, movie) {
		movie.remove( function(err, movie) {
			res.redirect('/movies');
		});
	});
});

module.exports = router;