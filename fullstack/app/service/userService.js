fakesoApp.factory('userService', function ($http, $state) {


    var userService = this;
    var host = "http://127.0.0.1";    
    var toSignup = false;
    var toLogin = false;

    var loginState = false;   
    
    var userInfo = {};
    
    var signupOrLogin = 'login';
    
    this.getHost = function(){
        return host;
    };
    

    return userService;
});
