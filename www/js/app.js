// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('movieapp', ['ngCordova', 'ionic'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
}).config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            abstract: true,
            url: '/home',
            templateUrl: 'templates/home.html'
        })
        .state('home.companies', {
            url: '/companies',
            views: {
                'companies': {
                    templateUrl: 'templates/home/companies.html'
                }
            }
        })
        .state('home.favorites', {
            url: '/favorites',
            views: {
                'favorites': {
                    templateUrl: 'templates/home/favorites.html'
                }
            }
        })

    .state('app', {
            abstract: true,
            url: '/app',
            templateUrl: 'templates/side-menu.html'
        })
        .state('app.distributors', {
            url: '/distributors/:company',
            views: {
                'main-content': {
                    templateUrl: 'templates/sidemenu/distributors.html'
                }
            }
        })
        .state('app.movies-list', {
            url: '/movies-list/:distributor',
            views: {
                'main-content': {
                    templateUrl: 'templates/sidemenu/movies-list.html'
                }
            }
        })
        .state('app.movie-detail', {
            url: '/movie-detail/:movie/:movieTitle',
            views: {
                'main-content': {
                    templateUrl: 'templates/sidemenu/movie-detail.html'
                }
            }
        })
        .state('app.extra', {
            url: '/extra',
            views: {
                'main-content': {
                    templateUrl: 'templates/sidemenu/extra.html'
                }
            }
        });

    $urlRouterProvider.otherwise('/home/companies');

});
