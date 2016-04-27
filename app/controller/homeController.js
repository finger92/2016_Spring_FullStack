fakesoApp.controller('HomeController',function($scope, userService, $state, $cookies, requestService){
    $scope.user = {
        username: '',
        level: '',
        create_time:''
    };
    if($cookies.userId !== undefined){
        requestService.GetUser(function(res){
            if(res.result){
                $scope.user = res.data;
            }
        });
    }
    requestService.GetHotQuestList(function(res){
        console.log(res);
        if(res.result){
            $scope.topQsts = res.data;
        }else{
        }
    });
    requestService.GetTopUser(function(res){
        console.log(res);
        if(res.result){
            $scope.topUsers = res.data;
        }else{
        }
    });
    $scope.jumpTo = function(id){
        $state.go('quest',{qstId:id});
    }
});