var express = require('express');
var sign = require('./routes/sign');
var adminRoute = require('./routes/adminRoute');
var userRoute = require('./routes/userRoute');
var questRoute = require('./routes/questRoute');
var app = express();

module.exports = function(app) {
    // user
    app.post('/doRegister',userRoute.createUser);
    app.post('/doLogin',userRoute.login);
    app.get('/doLogout', sign.ensureAuthenticated, sign.logout);
    app.get('/getSelf', sign.ensureAuthenticated, userRoute.getSelf);
    app.put('/addExp', sign.ensureAuthenticated, userRoute.addExp);
    app.put('/changePwd', sign.ensureAuthenticated, userRoute.changePwd);
    
    // quest
    app.post('/postQuest', sign.ensureAuthenticated, questRoute.postQuest);
    app.get('/getQuestList', questRoute.getQuestList);
    app.put('/addViewerNum', questRoute.addViewerNum);
    app.put('/addAnswerNum', questRoute.addAnswerNum);
    
    // admin
    app.post('/admin', adminRoute.createAdmin);
    
    // root
    app.get('/', function(req, res) {
        res.render('index',{ title: 'Express' });
    });
}