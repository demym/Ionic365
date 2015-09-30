angular.module('ionicApp', ['ionic'])


    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "app.html",
                controller: 'AppCtrl'
            })

            .state('app.search', {
                url: "/search",
                views: {
                    'appContent' :{
                        templateUrl: "search.html"
                    },
                    'menuList': {
                        templateUrl : "menu01.html"
                    }
                }
            })

            .state('app.browse', {
                url: "/browse",
                views: {
                    'appContent' :{
                        templateUrl: "browse.html"
                    },
                    'menuList': {
                        templateUrl : "menu02.html"
                    }
                }
            })

            .state('app.playlists', {
                url: "/playlists",
                views: {
                    'appContent' :{
                        templateUrl: "playlists.html",
                        controller: 'PlaylistsCtrl'
                    },
                    'menuList': {
                        templateUrl : "menu03.html",
                        controller: "PlaylistsCtrl"
                    }

                }
            })

            .state('app.single', {
                url: "/playlists/:playlistId",
                views: {
                    'appContent' :{
                        templateUrl: "playlist.html",
                        controller: 'PlaylistCtrl'
                    }
                }
            })

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/playlists');
    })

    .controller('AppCtrl', function($scope) {
    })

    .controller('PlaylistsCtrl', function($scope, $state) {
        $scope.playlists = [
            { title: 'Reggae', id: 1 },
            { title: 'Chill', id: 2 },
            { title: 'Dubstep', id: 3 },
            { title: 'Indie', id: 4 },
            { title: 'Rap', id: 5 },
            { title: 'Cowbell', id: 6 }
        ];

        $scope.goTabs = function() {
            console.log('Going to tabs!');
            $state.go("app.tabs.home");
        }
    })

    .controller('PlaylistCtrl', function($scope, $stateParams) {
    })
