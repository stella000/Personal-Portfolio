var myApp = angular.module('myApp', ['ui.router'])

// Config route provider
.config(function($stateProvider) {
    $stateProvider
    .state('home', {
    url:'/',
    templateUrl: 'pages/home.html',
    controller: 'HomeController',
  })
  .state('work', {
    url:'/work',
    templateUrl: 'pages/work.html',
    controller: 'WorkController',
  })
  .state('resume', {
    url:'/resume',
    templateUrl: 'pages/resume.html',
    controller: 'ResumeController',
  })
})

// Landing page controller: define $scope.number as a number
.controller('HomeController', function($scope){
  $scope.number = 20
})

.controller('WorkController', function($scope){
  $scope.number = 20
})

// Content controller: define $scope.url as an image
.controller('ResumeController', function($scope){
})

