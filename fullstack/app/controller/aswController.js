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
    $scope.rate = {
        answ_id: '',
        vote: '',
    };
    $scope.comments = [];
    
//    console.log($stateParams);
    $scope.getAnws = function(){
        requestService.GetAnswList({id:$stateParams.qstId},function(answ_res){
            if(answ_res.result){
                //get comment of each answer
                $scope.answs = answ_res.data;
                if($scope.answs.answ == undefined)  $scope.answs.answ = $scope.answs;
                angular.forEach($scope.answs,function(key){
                    //console.log(key);
                    var kid;
                    if(key.answ == undefined)   kid = key._id;
                    else kid = key.answ._id;
                    //console.log(kid);
                    requestService.GetComntList({id:kid},function(comt_res){
                        if(comt_res.result){
                            console.log(comt_res);
                            key['comnts'] = comt_res.data
                            //console.log($scope.answs);
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
                if(res.err=="ERR_REQUIRELOGIN_ERR")
                    $window.alert("Please Login first!");
                else    console.log(res);
            }
        });
    };
    
    $scope.rateAnsw = function(aid){
        console.log(aid);
        $scope.rate.answ_id = aid;
        requestService.VoteAnsw($scope.rate, function(res){
            if(res.result)
                $state.reload();
            else{
                console.log(res);
                if(res.err=="ERR_REQUIRELOGIN_ERR")
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
                requestService.GetUser(function(res){
                    console.log(res);
                    if(res.result){
                        $scope.user = res.data;
                        requestService.AddExp({u_id:$scope.user.id, exp:1},function(uRes){
                            if(uRes.result){
                                console.log(uRes);
                            }else{}
                        });
                    }else{
                    }
                });
            }else{
                if(res.err=="ERR_REQUIRELOGIN_ERR")
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
                if(res.err=="ERR_REQUIRELOGIN_ERR")
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
