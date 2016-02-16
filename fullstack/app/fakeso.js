var fakesoApp = angular.module('fakesoApp', [
    'ui.router'
]);

fakesoApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $urlRouterProvider.otherwise("/home");
    $httpProvider.defaults.withCredentials = true;

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: '/app/view/home.html',
        controller: 'HomeController'
    });
    
    $stateProvider.state('404', {
        url: '/404',
        templateUrl: '/app/view/error.html',
        controller: 'ErrorController'
    });
    
});

fakesoApp.controller