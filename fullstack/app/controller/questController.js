fakesoApp.controller('QuestListController', function($scope,$state,$window, requestService, userService){
    $scope.qsts;
    $scope.topQsts;
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
    
    requestService.GetQuestList(function(res){
        if(res.result){
            console.log(res);
            $scope.qsts = res.data;
            console.log($scope.qsts);
        }else{
        }
    });
    
    requestService.GetHotQuestList(function(res){
        console.log(res);
        if(res.result){
            $scope.topQsts = res.data;
        }else{
        }
    });
    
    
    $scope.goQst = function(qstID){
        requestService.AddViewerNum({quest_id: qstID}, function(res){
            if(res.result){
                console.log(res);
            }else{
            }
        });
        $state.go('quest',{qstId:qstID});
    };
    
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
    $scope.topQsts;
    requestService.GetHotQuestList(function(res){
        console.log(res);
        if(res.result){
            $scope.topQsts = res.data;
        }else{
        }
    });
    
    $scope.asws;
    //console.log($stateParams.qstId);
    requestService.GetQuestById({id:$stateParams.qstId},function(res){
//        console.log(res);
        if(res.result){
            $scope.quest = res.data;
            requestService.GetAnswList({id:$stateParams.qstId},function(res){
//                console.log(res);
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
    
    $scope.goQst = function(qstID){
        requestService.AddViewerNum({quest_id: qstID}, function(res){
            if(res.result){
                console.log(res);
            }else{
            }
        });
        $state.go('quest',{qstId:qstID});
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
            if(res.result){
                $state.go('questlist');
                requestService.GetUser(function(res){
                    console.log(res);
                    if(res.result){
                        $scope.user = res.data;
                        requestService.AddExp({u_id:$scope.user.id, exp:1},function(uRes){
                            if(uRes.result){
                                console.log(uRes);
                            }else{}
                        });
                    }else{
                    }
                });
            }
            else{
                if(res.err=="ERR_REQUIRELOGIN_ERR")
                    $window.alert("Please Login first!");
                console.log(res);
            }
        });
    };
    $scope.addExp = function(){

    };  
});