fakesoApp.controller('UserController',function($scope, userService, $state, $cookies, requestService){
    $scope.user;
    $scope.topUsers;
    $scope.qsts;
    requestService.GetTopUser(function(res){
        if(res.result){
            $scope.topUsers = res.data;
            console.log($scope.topUsers);
        }else{}
    });
    $scope.topQsts;
    requestService.GetHotQuestList(function(res){
        console.log(res);
        if(res.result){
            $scope.topQsts = res.data;
        }else{
        }
    });
    $scope.goUser = function(uid){
        $state.go('user',{uID:uid});
    };
    requestService.GetUser(function(res){
        console.log(res);
        if(res.result){
            $scope.user = res.data;
            requestService.GetQuestByUserId({id:$scope.user.id},function(res){
                if(res.result){
                    $scope.qsts = res.data;
                    console.log($scope.qsts,"q");
                }else{}
            });
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