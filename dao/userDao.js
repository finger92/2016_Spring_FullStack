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

exports.getTopUsers = function(){
    return User.find({},'id username level create_time')
        .sort({
            level: 'desc'
        }).limit(10).exec();
}

