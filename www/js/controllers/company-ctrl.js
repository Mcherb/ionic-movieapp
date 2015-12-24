(function() {
    'use strict';

    angular.module('movieapp').controller('homeController', ['companyService', '$state', homeController]);

    function homeController(companyService, $state) {
        var vm = this;

        vm.clickCompany = function(companyId) {
            companyService.get(companyId).then(function(data) {
                $state.go('app.distributors', {
                    company: companyId
                });
            });
        };
    }

})();
