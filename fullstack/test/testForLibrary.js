var Library = require('../common/library.js');

exports.testAddUserExp = function(test){
    var user = {experience:0, level:0};
    
    // test case 1
    user = Library.addUserExp(user, 3);
    test.equal(user.experience, 3,"add user experience should be ok");
    
    // test case 2
    user = {experience:3, level:0};
    user = Library.addUserExp(user, 3)
    test.equal(user.experience, 1);
    test.equal(user.level, 1,"add user level should be ok");
    test.done();
};

exports.testAddNum = function(test){
    var num = 1;
    
    // test case 1
    test.equal(Library.addNum(num, 1), 2,"add num should be ok");
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
    test.equal(new_vote, 3,"add num should be ok");
    test.done();
};

exports.testGetDateDis  = function(test){
    Library.getDateDis(ISODate("2016-02-06T19:36:53.557Z"));

}