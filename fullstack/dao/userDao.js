var User = require('../models').User;

exports.save = function(user){
    return user.save();
}

exports.findByEmail = function(email){
    return User.findOne({
        email: email
    }).exec();
}

exports.findById = function(id){
    return User.findById(id).exec();
}


