var Quest = require('../models').Quest;

exports.save = function(quest){
    return quest.save();
}

exports.findAll = function(){
    return  Quest.find({}, 'id title u_id answ_num view_num last_act_time create_time')
        .populate('u_id','username level')
        .sort({
            create_time: 'desc'
        }).exec();
}

exports.findById = function(id){
    return Quest.findById(id).exec();
}

exports.findByUserId = function(id){
    return Quest.find({u_id: id}, 'id title content u_name u_level answ_num view_num last_act_time create_time')
    .sort({
        last_act_time: 'desc'
    }).exec();
}

exports.findHot = function(){
    return Quest.find({},'id title content u_name u_level answ_num view_num last_act_time create_time')
        .sort({
            last_act_time: 'desc'
        }).limit(10).exec();
}

