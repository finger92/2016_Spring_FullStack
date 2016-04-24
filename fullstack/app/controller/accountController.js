fakesoApp.controller('AccountController', function($scope,$state,$window,$cookies, requestService, userService){
    
    $scope.userData = {};	
    
    $scope.user = {
        username: '',
        email: '',
        password: '',
        experience: '',
        level: '',
        noti_num: '',
        create_time: '',
    };
    $scope.emailerr = false;
    $scope.psworderr = false;
    $scope.usererr = false;
    $scope.exist_err = false;
    $scope.emailpattern = /^.+@.+\..+$/;
    $scope.logged = false;
    
    $scope.isLogged = function(){
        return $cookies.login == 'true';
    }
    
    $scope.username = $cookies.username;
    
    $scope.doSignup = function(){
        console.log($scope.user);
        var isMatch = $scope.emailpattern.test($scope.user.email);
        if(isMatch)    $scope.emailerr = false;
        else $scope.emailerr = true;
        if($scope.user.password != undefined) $scope.psworderr = false;
        else $scope.psworderr = true;
        if($scope.user.username != undefined) $scope.usererr = false;
        else $scope.user.username = true;
        console.log($scope.emailerr,$scope.psworderr,$scope.usererr);
        if(!$scope.emailerr && !$scope.psworderr && !$scope.usererr){
            requestService.DoRegister($scope.user,function(res){
                console.log(res,1);
                //console.log(res.result);
                if(res.result){
                    $scope.doLogin();
                    $state.go('home');
                }else{
                }
            });
        }
    };
    
    $scope.doLogin = function(){
        //console.log($scope.user);
        var isMatch = $scope.emailpattern.test($scope.user.email);
        if(isMatch)    $scope.emailerr = false;
        else $scope.emailerr = true;
        if($scope.user.password != undefined) $scope.psworderr = false;
        else $scope.psworderr = true;
        //console.log($scope.emailerr,$scope.psworderr,1);
        if(!$scope.emailerr && !$scope.psworderr){
            requestService.DoLogin($scope.user,function(res){
                console.log(res);
                if(res.result){
                    $cookies.login = true;
                    console.log(res.id);
                    $cookies.userId = res.id;
                    $cookies.username = res.username;
                    $state.go('home');
                }else{
                }
            });
        }
    };
    
    $scope.doLogout = function(){
        requestService.DoLogout(function(){
            console.log("log out");
            $cookies.login = false;
            delete $cookies.userId;
            $state.reload();
            console.log("log out 1");
        });
    }
});