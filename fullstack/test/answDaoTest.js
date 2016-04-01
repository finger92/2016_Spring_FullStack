(function(){
    var answDao = require('../dao/questDao.js');
    var Answ = require('../models').Answ;

    var answ = new Answ();
    answ.content = 'test';
    answ.quest_id = '56fde7ed8e9d04be0e22cdb3';
    answ.u_id = '56fdc91c1b8ae3da67a140f0';

    exports.testSave = function(test){
        answDao.save(answ) .then(
            function(result) {
                test.equal(result.content, answ.content);
                test.equal(result.u_id.toHexString(), answ.u_id.toHexString());
                answ = result;
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