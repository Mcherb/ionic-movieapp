(function() {
    'use strict';

    angular.module('movieapp').controller('extraController', ['$ionicPlatform', '$cordovaVibration', '$cordovaDialogs', extraController]);

    function extraController($ionicPlatform, $cordovaVibration, $cordovaDialogs) {
        var vm = this;

        vm.vibrate = function() {
            $ionicPlatform.ready(function() {
                $cordovaVibration.vibrate(500);
            });
        };

        vm.alert = function() {
            $ionicPlatform.ready(function() {
                $cordovaDialogs.alert('Hello adservians', 'Adservio', 'O-K-?');
            });
        };

    }

})();
