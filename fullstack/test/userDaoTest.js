(function(){
    var userDao = require('../dao/userDao.js');
    var User = require('../models').User;

    var user = new User();
    user.email = 'test@gmail.com';
    user.username = 'yzhou';
    user.password = '123';
    
    exports.testSave = function(test){
        userDao.save (user).then(
            function(result){
                test.equal(result.email, user.email);
                test.equal(result.username, user.username);
                test.equal(result.password, user.password);
                test.done();
            }
        ).catch(function(err){test.done();});
    }

    exports.testFindByEmail = function(test){
        userDao.findByEmail(user.email) .then(
            function(result) {
                test.equal(result.email, user.email);
                test.equal(result.username, user.username);
                test.equal(result.password, user.password);
                user = result;
                test.done();
            }
        ).catch(
            function(err) {
                test.ok(false, err);
                test.done();
            }
        );
    };

    exports.testFindById = function(test){
        userDao.findById(user.id) .then(
            function(result) {
                test.equal(result.email, user.email);
                test.equal(result.username, user.username);
                test.equal(result.password, user.password);
                test.done();
            }
        ).catch(
            function(err) {
                test.ok(false, err);
                test.done();
            }
        );
    };

    exports.testUpdateInfo = function(test){
        user.experience = 1;
        userDao.save(user) .then(
            function(result) {
                test.equal(result.experience, 1);
                test.done();
            }
        ).catch(
            function(err) {
                test.ok(false, err);
                test.done();
            }
        );
    };
}())