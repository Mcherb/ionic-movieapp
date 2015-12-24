(function() {
    'use strict';

    angular.module('movieapp').controller('movieDetailController', ['$stateParams', '$log', 'companyService', movieDetailController]);

    function movieDetailController($stateParams, $log, companyService) {
        var vm = this;
        var lastMovie = null;

        vm.finished = false;

        vm.favorit = companyService.isInFavorites($stateParams.movie);

        companyService.getMovieDetail($stateParams.movie).then(function(movieDetail) {
            $log.log(movieDetail);

            vm.movieTitle = $stateParams.movieTitle;

            if (movieDetail) {
                lastMovie = movieDetail;
                vm.movieName = movieDetail.original_title;
                vm.overview = movieDetail.overview;
                vm.genres = movieDetail.genres;
            } else {
                lastMovie = null;
            }

            vm.finished = true;

        }, function(errors) {
            $log.error(errors);
            vm.finished = true;
        });

        vm.favoritChange = function() {
            if (lastMovie) {
                companyService.manageFavorites(lastMovie, !vm.favorit);
            }
        };

    }

})();
