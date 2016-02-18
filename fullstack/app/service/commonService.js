var commonResponseHandler = function (res) {
    return res.data;
};

var errResponseHandler = function (res) {
    return {
        result: false,
        err: 'Server error:' + res.status
    };
};


fakesoApp.factory('dateService', function () {
    return {
        getDayNunByYearMonth: function (year, month) {
            return new Date(year, parseInt(month)+1, 0).getDate();
        },
        compareDate:function(){
            
        }
    };
});



fakesoApp.factory('requestService', ['$resource','userService', function($resource,userService){
    var host = userService.getHost()+'/';
    
    return $resource(host+':dir/:action/:id/:search', {dir: "@dir", id: "@id", action:"@action"}, {
        DoRegister: { method: "POST", params: { dir: "doRegister" } }, 
        DoLogin: { method: "POST", params: { dir: "doLogin"} },
        DoLogout: { method: "GET", params: { dir: "doLogout"} },
        GetUser: { method: "GET", params: { dir: "getSelf"} },
        AddExp: { method: "PUT", params: { dir: "addExp"} },
        ChangePwd: { method: "PUT", params: { dir: "changePwd"} },
        PostQuest: { method: "POST", params: { dir: "postQuest"} },
        GetHotQuestList: { method: "GET", params: { dir: "getHotQuestList"} },
        GetQuestById: { method: "GET", params: { dir: "getQuestById"} },
        GetQuestByUserId: { method: "GET", params: { dir: "getQuestByUserId"} },
        GetQuestList: { method: "GET", params: { dir: "getQuestList"} },
        AddViewerNum: { method: "PUT", params: { dir: "addViewerNum"} },
        PostAnsw: { method: "POST", params: { dir: "postAnsw"} },
        GetAnswList: { method: "GET", params: { dir: "getAnswList"} },
        VoteAnsw: { method: "PUT", params: { dir: "voteAnsw"} },
        PostComnt: { method: "POST", params: { dir: "postComnt"} },
        GetComntList: { method: "GET", params: { dir: "getComntList"} },
    });
}]);