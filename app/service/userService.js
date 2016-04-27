fakesoApp.factory('userService', function ($http, $state) {


    var userService = this;
    var host = "http://52.36.23.134:3000";    
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
