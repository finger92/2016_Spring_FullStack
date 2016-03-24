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
});