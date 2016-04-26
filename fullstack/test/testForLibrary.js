(function(){
var Library = require('../common/library.js');

exports.testAddUserExp = function(test){
    var user = {experience:0, level:0};
    
    // test case 1
    user = Library.addUserExp(user, 3);
    test.equal(user.experience, 3);
    
    // test case 2
    user = {experience:3, level:0};
    user = Library.addUserExp(user, 3);
    test.equal(user.experience, 1);
    test.equal(user.level, 1);
    test.done();
};

exports.testAddNum = function(test){
    var num = 1;
    
    // test case 1
    test.equal(Library.addNum(num, 1), 2);
    test.done();
};

exports.testAddVote = function(test){
    
    // test case 1
    var vote = 0;
    var vote_num = 0;
    var new_vote = Library.addVote(vote, vote_num, 2);
    test.equal(new_vote, 2);
    
    // test case 2
    vote = 2;
    vote_num = 1;
    new_vote = Library.addVote(vote, vote_num, 4);
    test.equal(new_vote, 3);
    test.done();
};

exports.testRankAnswList = function(test){
    
    // weight = 3.7
    var a = {u_level:3, vote:4};
    
    // weight = 3.2
    var b = {u_level:6, vote:2};
    
    // weight = 3
    var c = {u_level:3, vote:3};
    
    // weight = 3
    var d = {u_level:3, vote:3};
    
    var l = [b, d, c, a];
    l = Library.rankAnswList(l);
    
//    test.equal(l,a);
    test.ok(testUListCont(l[0].answ, a));
    test.ok(testUListCont(l[1].answ, b));
    test.ok(testUListCont(l[2].answ, d));
    test.ok(testUListCont(l[3].answ, c));
    test.done();
}

function testUListCont(actual, expect){
    if(actual.u_level == expect.u_level &
        actual.vote == expect.vote){
        return true;
    }
    return false;
}
}())
