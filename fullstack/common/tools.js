//var bcrypt = require('bcrypt');
var moment = require('moment');
moment.locale('us-en');

// formate date
exports.formatDate = function(date, friendly) {
    date = moment(date);

    if (friendly) {
        return date.fromNow();
    } else {
        return date.format('YYYY-MM-DD HH:mm');
    }

};

exports.validateId = function(str) {
    return (/^[a-zA-Z0-9\-_]+$/i).test(str);
};

exports.isEmpty = function(val) {
    return val == undefined || val == null || val == '' || val.length == 0;
};

/**
 * test if value is null
 */
exports.hasNull = function(data) {
    for (var key in data) {
        if (data[key] == undefined || data[key] == null) {
//            console.log(key);
            return true;
        }
    }
    return false;
};

exports.isNum = function(val){
    if (val!=null && val!=""){
        return !isNaN(val);
    }
    return false;
}

exports.isLegalVote = function(val){
    if (exports.isNum(val)){
        if(val >= 0 && val <= 5)
        return true;
    }
    return false;
}

exports.isArray = function(obj){
    return Object.prototype.toString.call(obj) === '[object Array]';
}

