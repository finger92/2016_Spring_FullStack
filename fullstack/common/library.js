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
