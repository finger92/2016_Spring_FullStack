var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswSchema = new Schema({
    quest_id: {
		type: Schema.ObjectId,
		ref: 'Quest'
	},
    
    content: {
		type: String
	},
    
	u_name: {
		type: String
	},
    
    u_level: {
        type: Number
    },
	
	vote: {
		type: Number,
		default: 0
	},
    
    create_time:{
        type: Date,
        default: Date.now
    }
});

mongoose.model('Answ', QuestSchema);
exports.Answ = mongoose.model('Answ');