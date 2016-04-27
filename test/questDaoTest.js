(function(){
    var questDao = require('../dao/questDao.js');
    var Quest = require('../models').Quest;

    var quest = new Quest();
    quest.title = 'test quest';
    quest.content = 'test';
    quest.u_id = '56fdc91c1b8ae3da67a140f0';

    exports.testSave = function(test){
        questDao.save(quest) .then(
            function(result) {
                test.equal(result.title, quest.title);
                test.equal(result.content, quest.content);
                test.equal(result.u_id.toHexString(), quest.u_id.toHexString());
                quest = result;
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
        questDao.findById(quest.id) .then(
            function(result) {
                test.equal(result.id, quest.id);
                test.equal(result.title, quest.title);
                test.equal(result.content, quest.content);
                test.equal(result.u_id.toHexString(), quest.u_id.toHexString());
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