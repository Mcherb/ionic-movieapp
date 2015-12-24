(function() {
    'use strict';

    angular.module('movieapp').controller('distributorsController', ['$state', '$stateParams', '$log', 'companyService', distributorsController]);

    function distributorsController($state, $stateParams, $log, companyService) {
        var vm = this;
        var companyId = $stateParams.company;

        vm.init = function() {

            $log.log("fff")


            companyService.get(companyId).then(function(data) {
                vm.distibutors = data.companies[0].company;
            }, function(raison) {
                $log.error('cannot get companies');
            });
        };

        vm.getMovies = function(distributor) {
            vm.init();
            $state.go('app.movies-list', {
                distributor: distributor.filmography
            });
        };

        vm.init();
    }

})();
