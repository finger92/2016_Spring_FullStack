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
    
    u_id: {
        type: Schema.ObjectId,
		ref: 'User' 
    },
    
    create_time:{
        type: Date,
        default: Date.now
    }
});

mongoose.model('Comnt', ComntSchema);
exports.Comnt = mongoose.model('Comnt');