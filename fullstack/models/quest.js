var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestSchema = new Schema({
    title: {
		type: String,
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
	
	answ_num: {
		type: Number,
		default: 0
	},
    
    view_num:{
        type: Number,
        default: 0
    },
    
    create_time:{
        type: Date,
        default: Date.now
    }
});

mongoose.model('Quest', QuestSchema);
exports.Quest = mongoose.model('Quest');