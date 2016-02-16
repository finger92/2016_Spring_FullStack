hereseasApp.factory('userService', function ($http, $state, $cookies) {


    var userService = this;
    var host = "http://127.0.0.1";
    //var host = "http://api.hereseas.com";
    
    var toSignup = false;
    var toLogin = false;

    var loginState = false;   
    
    var userInfo = {};
    //var itemDraft = [];
    
    var signupOrLogin = 'login';
    
    this.getHost = function(){
        return host;
    };
    
    
    this.setSignupOrLogin = function(state){
        signupOrLogin = state;
    };
    
    this.getSignupOrLogin = function(){
        return signupOrLogin;
    };

    return userService;
});
