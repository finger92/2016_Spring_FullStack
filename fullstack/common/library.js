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
    return (pre_vote * vote_num + vote)/(vote_num + 1);
}

// generate the rank list according to the vote(70%) and 
// u_level(30%)
exports.rankAnswList = function(answlist){
    var temp = new Array();
    var result = new Array();
    
    if(answlist.length == 0) return new Array();
    if(answlist.length == 1) return answlist;
    
    var init = answlist[0];
    var i =0;
    for(var answ in answlist){
        var weight = answlist[answ].vote*7+answlist[answ].u_level*3;
        while(!tools.isEmpty(temp[weight])) weight += 1;
        temp[weight] = answlist[answ];
    }
    
    for(var answ in temp){
//        if(!isNaN(temp[answ])){
            result.push(temp[answ]);
//        }
    }
    
    result = result.reverse();
    
//    for(var answ in answlist){
//        temp[answ.vote*7+answ.u_level*3]
//    }
//    result.append();
    return result;
}
