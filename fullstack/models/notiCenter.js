var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotiCenterSchema = new Schema({
    u_id: {
		type: Schema.ObjectId,
		ref: 'User'
	},
    
    quest_title: {
        type: String
    },
    
    quest_create: {
        type: Date
    },
    
    quest_id: {
		type: Schema.ObjectId,
		ref: 'Quest'
	},
    
});

mongoose.model('NotiCenter', NotiCenterSchema);
exports.NotiCenter = mongoose.model('NotiCenter');