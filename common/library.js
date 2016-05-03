var tools = require('../common/tools');

// experience per level, if cur experience is more 
// than this, the level should be upgraded accordin
// to this.
var exp_plevel = 5;

// add new experience to user
exports.addUserExp = function(user, exp) {
    var pre_exp = user.experience
    user.experience = (pre_exp + exp) % exp_plevel;
    user.level += parseInt((pre_exp + exp) / exp_plevel);
    return user
};

exports.addNum = function(pre_num, adder){
    return pre_num + adder;
}

// calculate the average vote
exports.addVote = function(pre_vote, vote_num, vote){
//    console.log(pre_vote,vote_num,vote);
//    console.log((pre_vote * vote_num + vote), (vote_num + 1));
    return (pre_vote * vote_num + vote)/(vote_num + 1);
}

// check if user had voted
exports.checkVote = function(answList, answId){
    for(var answ in answList){
        if(answList[answ].answ_id.toHexString() == answId){
            return false;
        }
    }
    return true;
}

// generate the rank list according to the vote(70%) and 
// u_level(30%)
exports.rankAnswList = function(answlist){
    var temp = new Array();
    var result = new Array();
    var weight = new Array();
    
    if(answlist.length == 0) return result;
//    if(answlist.length == 1) return answlist;
    
    var init = answlist[0];
    var i = 0;
    
    for(var answ in answlist){
        weight[answ] = answlist[answ].vote*7+answlist[answ].u_id.level*3;
    }
    
    while(answlist.length != result.length){
        var n = 0;
        var gt = weight[n];
        for(var j in weight){
            if(weight[j] > gt){
                gt = weight[j];
                n = j;
            }
        }
        result.push({"answ":answlist[n],"weight":weight[n]});
        weight[n] = -1;
    }
//    console.log(result);
    return result;
}
