fakesoApp.controller('AswController', function($scope,$state,$window,$stateParams, requestService, userService){
    $scope.answer = {
        quest_id: '',
        content: '',
        u_name: '',
        u_level: '',
        vote: '',
        create_time: '',
    };
    $scope.asws;
            console.log($stateParams.quest_id);
    requestService.GetAnswList({quest_id:$stateParams.quest_id},function(res){
        console.log(quest_id);
        if(res.result){
            console.log(res);
        }else{
        
        }
    });
    
});