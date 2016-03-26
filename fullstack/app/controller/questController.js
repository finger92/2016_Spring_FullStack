fakesoApp.controller('QuestListController', function($scope,$state,$window, requestService, userService){
    $scope.qsts;
    $scope.quest = {
        title: '',
        content: '',
        u_name: '',
        u_level: '',
        answ_num: '',
        view_num: '',
        last_act: '',
        last_act_time: '',
        create_time: '',
    };
    
    getQuestList = function(){
        requestService.GetQuestList(function(res){
            if(res.result){
                //console.log(res);
                $scope.qsts = res.data;
                console.log($scope.qsts);
            }else{
            }
        });
    };
    getQuestList();
    
    $scope.goQst = function(qstID){
        $state.go('quest',{qstId:qstID});
    }
});

fakesoApp.controller('QuestController',function($scope,$state,$window,$stateParams, requestService, userService){
    $scope.readyReply = false;
    $scope.quest = {
        title: '',
        content: '',
        u_name: '',
        u_level: '',
        answ_num: '',
        view_num: '',
        last_act: '',
        last_act_time: '',
        create_time: '',
    };
    $scope.newasw = {
        content: '',
    }
    $scope.asws;
    //console.log($stateParams.qstId);
    requestService.GetQuestById({quest_id:$stateParams.qstId},function(res){
        console.log(res);
        if(res.result){
            console.log(res);
            $scope.quest = res.data;
            requestService.GetAnswList({quest_id:$stateParams.qstId},function(res){
                console.log(res);
                if(res.result)
                {
                    $scope.asws = res.data;
                }else{
                    
                }
            });
        }else{
        
        }
    });
    
    $scope.doPostAsw = function(){
        console.log($stateParams.qstId,$scope.newasw.content);
        requestService.PostAnsw({quest_id:$stateParams.qstId,
                                 content: $scope.newasw.content},function(res){
            console.log(1);
            console.log(res);
            if(res.result){
                console.log(res);
                $state.reload();
            }
        });
    };
    
    $scope.showReplyPanel = function(){
        $scope.readyReply = true;
    };
    
    $scope.hideReplyPanel = function(){
        $scope.readyReply = false;
    };
});
fakesoApp.controller('QuestPostController',function($scope,$state,$window, requestService, userService){
    $scope.quest = {
        title: '',
        content: '',
    };
    $scope.qsts;
    $scope.doPostPst = function(){
        requestService.PostQuest($scope.quest,function(res){
            console.log(res);
            $state.go('questlist');
        });
    };
});