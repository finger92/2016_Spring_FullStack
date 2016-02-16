hereseasApp.controller('QuestController', function($scope,$state,$window, requestService, userService, $mdDialog, $cookies,alertService){
        
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
    
});