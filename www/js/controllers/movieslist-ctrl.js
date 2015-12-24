(function() {
    'use strict';

    angular.module('movieapp').controller('moviesListController', ['$stateParams', '$log', 'companyService', moviesListControlle]);

    function moviesListControlle($stateParams, $log, companyService) {
        var vm = this;
        var distributor = $stateParams.distributor;

        vm.movies = companyService.getMoviesByDistributor(distributor);
    }

})();
