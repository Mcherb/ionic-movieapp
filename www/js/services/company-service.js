(function() {
    'use strict';

    angular.module('movieapp').factory('companyService', ['$http', '$q', '$log', '$ionicLoading', companyService]);

    function companyService($http, $q, $log, $ionicLoading) {

        var url = 'http://api.myapifilms.com/imdb/idCompany?idCompany=$companyId$&token=fd296991-bdb4-4a51-a3fc-d9b97acf688b&format=json&language=en-us&exactFilter=0&limit=1';
        var movieDetailsurl = 'http://api.myapifilms.com/tmdb/movieInfoImdb?idIMDB=$MOVIE_ID$&token=fd296991-bdb4-4a51-a3fc-d9b97acf688b&format=json&language=en&alternativeTitles=0&casts=0&images=1&keywords=0&releases=0&videos=0&translations=0&similarMovies=1&reviews=1&lists=1';

        var localCache = [];
        var currentCompany;

        var favorites = [];

        var getAllFromCompany = function(companyId) {

            var deferred = $q.defer();

            $ionicLoading.show({
                template: 'Loading ...'
            });

            var cachedValue = localCache[companyId];

            if (cachedValue) {

                $ionicLoading.hide();
                setCurrentCompany(cachedValue);
                deferred.resolve(cachedValue);
            } else {

                var compUrl = url.replace('$companyId$', companyId);
                $http.get(compUrl).then(function(companyInfo) {

                    $ionicLoading.hide();

                    var data = companyInfo.data.data;
                    localCache[companyId] = data; //Cacher les données
                    setCurrentCompany(data);
                    deferred.resolve(data);
                }, function(errorData) {
                    $log.log(errorData);
                    $ionicLoading.hide();
                    deferred.reject(errorData);
                });
            }

            return deferred.promise;

        };

        var setCurrentCompany = function(data) {
            currentCompany = data;
        };

        var getCurrentCompany = function() {
            return currentCompany;
        };

        var getMoviesByDistributor = function(distributor) {
            var company = getCurrentCompany();
            var companyField = company.companies[0].company;

            var moviesHolder = _.find(companyField, {
                'filmography': distributor
            });

            return moviesHolder.movies;
        };

        var getMovieDetail = function(movieId) {

            var deferred = $q.defer();

            var movieUrl = movieDetailsurl.replace('$MOVIE_ID$', movieId);

            $ionicLoading.show({
                template: 'Loading ...'
            });

            $http.get(movieUrl).then(function(details) {
                deferred.resolve(details.data.data);
                $ionicLoading.hide();
            }, function(errorData) {
                deferred.reject(errorData);
                $ionicLoading.hide();
            });

            return deferred.promise;
        };

        var addRemoveFavorites = function(movie, remove) {
            if (remove) {
                _.remove(favorites, {
                    'imdb_id': movie.imdb_id
                });
                $log.log('movie removed');
                $log.log(favorites.length);
            } else {
                if (!isInFavorites(movie.imdb_id)) {
                    favorites.push(movie);
                    $log.log('movie added');
                    $log.log(favorites.length);
                }
            }
        };

        var isInFavorites = function(movieId) {
            var movie = _.find(favorites, {
                'imdb_id': movieId
            });
            return !_.isEmpty(movie);
        };


        return {
            get: getAllFromCompany,
            getCurrentCompany: getCurrentCompany,
            getMoviesByDistributor: getMoviesByDistributor,
            getMovieDetail: getMovieDetail,
            manageFavorites: addRemoveFavorites,
            isInFavorites: isInFavorites,
            getFavorites: function() {
                return favorites;
            }
        };

    }

})();
