var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminSchema = new Schema({
    email: {
		type: String,
		index: {
			unique: true
		}
	},
    
    username: {
		type: String
	},
    
	password: {
		type: String
	},
	
	experience: {
		type: Number,
		default: 0
	},
    
    level:{
        type: Number,
        default: 1
    },
    
    create_time:{
        type: Date,
        default: Date.now
    }
});

mongoose.model('User', AdminSchema);
exports.Admin = mongoose.model('User');