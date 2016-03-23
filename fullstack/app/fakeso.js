var fakesoApp = angular.module('fakesoApp', [
    'ui.router','ngResource','ngCookies'
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
    
    $stateProvider.state('questlist', {
        url: '/quests',
        templateUrl: '/app/view/questlist.html',
        controller: 'QuestController'
    });
    
    $stateProvider.state('quest', {
        url: '/quest/:qstId',
        templateUrl: '/app/view/question.html',
        controller: 'QuestController'
    });
    
    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: '/app/view/signup.html',
        controller: 'AccountController'
    });
    
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: '/app/view/login.html',
        controller: 'AccountController'
    });
    
    $stateProvider.state('postqst', {
        url: '/postqst',
        templateUrl: '/app/view/post-quest.html',
        controller: 'QuestController'
    });
});
