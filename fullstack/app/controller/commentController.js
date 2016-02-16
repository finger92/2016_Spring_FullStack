hereseasApp.controller('CommentController', function($scope,$state,$window, requestService, userService, $mdDialog, $cookies,alertService){
        
    $scope.comment = {
        answ_id: '',
        content: '',
        poster: '',
        create_time: '',
    };
    
});