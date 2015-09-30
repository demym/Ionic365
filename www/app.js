// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.services','ngCordova','ngSanitize','ngResource','ui.calendar'])




.run(function($ionicPlatform) {

	
  $ionicPlatform.ready(function() {
	  colog("$ionicPlatform READY");
	  ionic.Platform.fullScreen()
     if(window.StatusBar) {
      StatusBar.styleDefault();
    }
	 $ionicPlatform.registerBackButtonAction(function () {
   
     navigator.app.backHistory();
   
    }, 100);
	
	if (navigator.userAgent.indexOf("Android") != -1) {
             //$.mobile.defaultPageTransition = 'none';
             //$.mobile.defaultDialogTransition = 'none';
            // $.mobile.buttonMarkup.hoverDelay = 0
         }
		 
	
	
	
  });
})



.config(function($stateProvider, $urlRouterProvider,$cordovaInAppBrowserProvider,$httpProvider) {
	
	/* $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.common = 'Content-Type: application/json';
        delete $httpProvider.defaults.headers.common['X-Requested-With'];*/
	
  $httpProvider.interceptors.push('AuthInterceptor');	
	
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
	  cache: false,
      templateUrl: "menu.html",
      controller: 'AppCtrl'
    })
	
	 .state('appadmin', {
      url: "/appadmin",
      abstract: true,
	  cache: false,
      templateUrl: "menu_admin.html",
      controller: 'AppCtrl'
    })
	
	.state('_planner', {
      url: "/_planner",
      abstract: true,
	  cache: false,
      templateUrl: "menu_planner2.html",
      controller: 'AppCtrl'
    })
	.state('appadmin.admin', {
      url: "/admin",
      
	  cache: false,
      views: {
        'menuContent' :{
          templateUrl: "admin.html",
          controller: 'AdminCtrl'
        }
      }
    })

    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "search.html"
        }
      }
    })
	.state('app.close', {
      url: "/closeapp",
      views: {
        'menuContent' :{
          templateUrl: "search.html"
        }
      }
    })

    .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "browse.html"
        }
      }
    })
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent' :{
          templateUrl: "playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })
    .state('app.homepage', {
      url: "/homepage",
	  cache: false,
      views: {
        'menuContent' :{
          templateUrl: "homepage4.html",
          controller: 'HomepageCtrl'
        }
      }
    })
    .state('app.planner', {
      url: "/planner",
	  cache: false ,
	//  templateUrl: "menu_planner2.html",//
	   
	  //  controller: 'PlannerCtrl'
     views: {
       	'menuContent':{
		 templateUrl: "planner.html",
		 controller: 'PlannerCtrl'
		},
		'menuList':{
			templateUrl: "menulist.html"
		}
		
      }
    })
    .state('app.elibrary', {
      url: "/elibrary",
	    cache: false,
      views: {
        'menuContent' :{
          templateUrl: "elibrary3.html",
          controller: 'ElibraryCtrl'
        }
      }
    })
	.state('appadmin.shares', {
      url: "/shares",
	    cache: false,
      views: {
        'menuContent' :{
          templateUrl: "shares.html",
          controller: 'SharesCtrl'
        }
      }
    })
	.state('appadmin.customers', {
      url: "/customers",
	    cache: false,
      views: {
        'menuContent' :{
          templateUrl: "customers.html",
          controller: 'AdminCtrl'
        }
      }
    })
	.state('appadmin.users', {
      url: "/users",
	    cache: false,
      views: {
        'menuContent' :{
          templateUrl: "users.html",
          controller: 'UsersCtrl'
        }
      }
    })
	.state('app.sharewith', {
      url: "/sharewith",
	    cache: false,
		
      views: {
        'menuContent' :{
          templateUrl: "sharewith.html",
          controller: 'SharewithCtrl'
        }
      }
    })
    .state('app.mymessages', {
      url: "/mymessages",
      views: {
        'menuContent' :{
          templateUrl: "mymessages.html",
          controller: 'MyMessageCtrl'
        }
      }
    })
    .state('app.trybuy', {
      url: "/trybuy",
	  cache: false,
      views: {
        'menuContent' :{
          templateUrl: "trybuy.html",
          controller: 'TrybuyCtrl'
        }
      }
    })
	.state('app.tools', {
      url: "/tools",
	  cache: false,
      views: {
        'menuContent' :{
          templateUrl: "tools.html",
          controller: 'ToolsCtrl'
        }
      }
    })
	.state('app.social', {
      url: "/social",
	  cache: false,
      views: {
        'menuContent' :{
          templateUrl: "social.html",
          controller: 'SocialCtrl'
        }
      }
    })
    .state('app.login', {
      url: '/login',
	  cache: false,
	   views: {
        'menuContent' :{
          templateUrl: "login.html",
          controller: 'LoginCtrl'
        }
      }
  })
  .state('app.signin', {
      url: '/signin',
	  cache: false,
	   views: {
        'menuContent' :{
          templateUrl: "signin.html",
          controller: 'SigninCtrl'
        }
      }
  })
	.state('app.reachme', {
      url: "/reachme",
	  cache: false,
      views: {
        'menuContent' :{
          templateUrl: "reachme2.html",
          controller: 'ReachmeCtrl'
        }
      }
    })
	.state('app.takethetour', {
      url: "/takethetour",
      views: {
        'menuContent' :{
          templateUrl: "takethetour2.html",
          controller: 'TourCtrl'
        }
      }
    })
	.state('app.calendar', {
    url: "/calendar",
    views: {
      'menuContent': {
        templateUrl: "calendar.html",
        controller: 'EventCtrl'
      }
    }
  })
 
  .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
})



