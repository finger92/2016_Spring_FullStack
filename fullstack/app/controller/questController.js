fakesoApp.controller('QuestController', function($scope,$state,$window, requestService, userService){
        
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
    
    $scope.doPostPst = function(){
        requestService.PostQuest($scope.quest,function(res){
            console.log(res.result);
        });
    }
});