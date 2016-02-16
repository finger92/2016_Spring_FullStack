hereseasApp.controller('AccountCtrl', function($scope,$state,$window, requestService, userService, $mdDialog, $cookies,alertService){
    
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
    $scope.emailpattern = /^.+@.+\..+$/;
    
});