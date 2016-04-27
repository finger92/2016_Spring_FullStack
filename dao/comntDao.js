var Comnt = require('../models').Comnt;

exports.save = function(comnt){
    return comnt.save();
}

exports.findByAnswId = function(answ_id){
    return  Comnt.find({answ_id:answ_id},  'id content u_name u_level create_time').exec();
}


