var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ComntSchema = new Schema({
    answ_id: {
		type: Schema.ObjectId,
		ref: 'Quest'
	},
    
    content: {
		type: String
	},
    
	u_name: {
		type: String
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

mongoose.model('Comnt', QuestSchema);
exports.Comnt = mongoose.model('Comnt');