fakesoApp.controller('AswController', function($scope,$state,$window,$stateParams, requestService, userService){
    $scope.answer = {
        quest_id: '',
        content: '',
        u_name: '',
        u_level: '',
        vote: '',
        create_time: '',
    };
    $scope.anws;
    console.log($stateParams);
    $scope.getAnws = function(){
        requestService.GetAnswList({id:$stateParams.qstId},function(res){
            //console.log(quest_id);
            if(res.result){
                //console.log($scope.anws,0);
                $scope.anws = res.data;
                console.log($scope.anws,1);
            }else{

            }
        });
    };
    $scope.getAnws();
});

fakesoApp.controller('AswPostController', function($scope,$state,$window,$stateParams, requestService, userService){
    $scope.answer = {
        quest_id : $stateParams.qstId,
        content: ''
    };
    //console.log($stateParams);
    $scope.doPost = function(){
        //console.log($scope.answer);
        requestService.PostAnsw($scope.answer, function(res){
            console.log(res);
            if(res.result){
                $state.reload();
            }else{
                if(res.err="ERR_REQUIRELOGIN_ERR")
                    $window.alert("Please Login first!");
            }
        });
    };
});

fakesoApp.controller('CommentController', function($scope,$state,$window,$stateParams, requestService, userService){
    $scope.commentss = {
        answ_id: '666',
        content: '',
    };
    $scope.comments;
    console.log($stateParams,"cmt");
    $scope.getCmts = function(){
        requestService.GetComntList({id:$stateParams.qstId},function(res){
            //console.log(quest_id);
            if(res.result){
                //console.log($scope.anws,0);
                $scope.cmts = res.data;
                console.log($scope.comment,1);
            }else{

            }
        });
    };
    $scope.getCmts();
    
    $scope.doCmtPost = function(){
        //console.log($scope.answer);
        requestService.PostComnt($scope.comment, function(res){
            console.log(res);
            if(res.result){
                $state.reload();
            }else{
                if(res.err="ERR_REQUIRELOGIN_ERR")
                    $window.alert("Please Login first!");
            }
        });
    };
});

fakesoApp.controller('CmtPostController', function($scope,$state,$window,$stateParams, requestService, userService){
    $scope.comment = {
        answ_id: '',
        content: '',
    };
    //console.log($stateParams);
});
