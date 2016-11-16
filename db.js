var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Movie = new Schema({
	title: { type: String, required: true},
	description: { type: String, required: true},
	updated_at: Date
});

module.exports = mongoose.model('Movie', Movie);
mongoose.connect('mongodb://localhost/movies');