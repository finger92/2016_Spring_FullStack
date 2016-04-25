fakesoApp.controller('AswController', function($scope,$state,$window,$stateParams, requestService, userService){
    $scope.answer = {
        quest_id: '',
        content: '',
        u_name: '',
        u_level: '',
        vote: '',
        create_time: '',
    };
    $scope.answs = [];
    $scope.comment = {
        answ_id: '',
        content: '',
    };
    $scope.comments = [];
    
//    console.log($stateParams);
    $scope.getAnws = function(){
        requestService.GetAnswList({id:$stateParams.qstId},function(answ_res){
            if(answ_res.result){
                console.log(answ_res.data);
                //get comment of each answer
                angular.forEach(answ_res.data,function(key){
                    requestService.GetComntList({id:key._id},function(comt_res){
                        if(comt_res.result){
                            var answ = {
                                content:key.content,
                                create_time:key.create_time,
                                u_level:key.u_level,
                                u_name:key.u_name,
                                vote:key.vote,
                                comnts:comt_res.data
                            }
                            $scope.answs.push(answ);
                            //console.log($scope.comments,"z");
                        }else{
                        }
                    });
                });
            }else{

            }
           //console.log($scope.comments,"final"); 
        });
    };
    $scope.getAnws();

    $scope.doCmtPost = function(aid){
        //console.log($scope.answer);
        $scope.comment.answ_id = aid;
//        console.log($scope.comment);
        requestService.PostComnt($scope.comment, function(res){
            console.log(res);
            if(res.result){
                $state.reload();
            }else{
                if(res.err="ERR_REQUIRELOGIN_ERR")
                    $window.alert("Please Login first!");
                else    console.log(res);
            }
        });
    };
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
