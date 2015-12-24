(function() {
    'use strict';

    angular.module('movieapp').controller('favoritesController', ['$log', 'companyService', favoritesController]);

    function favoritesController($log, companyService) {
        var vm = this;

        vm.favorites = companyService.getFavorites();
    }

})();
