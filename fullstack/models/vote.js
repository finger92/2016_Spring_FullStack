var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VoteSchema = new Schema({
	u_id: {
		type: Schema.ObjectId,
		ref: 'User'
	},

	answ_id: {
		type: Schema.ObjectId,
		ref: 'Answ'
	}
});

mongoose.model('Vote', VoteSchema);
exports.Vote = mongoose.model('Vote');