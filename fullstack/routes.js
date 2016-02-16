var express = require('express');
var sign = require('./routes/sign');
var adminRoute = require('./routes/adminRoute');
var userRoute = require('./routes/userRoute');
var questRoute = require('./routes/questRoute');
var answRoute = require('./routes/answRoute');
var comntRoute = require('./routes/comntRoute');
var app = express();

module.exports = function(app) {
    // user
    app.post('/doRegister',userRoute.createUser);
    app.post('/doLogin',userRoute.login);
    app.get('/doLogout', sign.ensureAuthenticated, sign.logout);
    app.get('/getSelf', sign.ensureAuthenticated, userRoute.getSelf);
    app.put('/addExp', sign.ensureAuthenticated, userRoute.addExp);
    app.put('/changePwd', sign.ensureAuthenticated, userRoute.changePwd);
    
    // question
    app.post('/postQuest', sign.ensureAuthenticated, questRoute.postQuest);
    app.get('/getQuestList', questRoute.getQuestList);
    app.get('/getQuestById', questRoute.getQuestById);
    app.get('/getQuestByUserId', sign.ensureAuthenticated, questRoute.getQuestByUserId);
    app.get('/getHotQuestList', questRoute.getHotQuestList);
    app.put('/addViewerNum', questRoute.addViewerNum);
    
    // answer
    app.post('/postAnsw', sign.ensureAuthenticated, answRoute.postAnsw);
    app.get('/getAnswList', answRoute.getAnswList);
    app.put('/voteAnsw', sign.ensureAuthenticated, answRoute.voteAnsw);
    
    // comment
    app.post('/postComnt', sign.ensureAuthenticated, comntRoute.postComnt);
    app.get('/getComntList', comntRoute.getComntList);
    
    // admin
    app.post('/admin', adminRoute.createAdmin);
}