angular.module('starter.services', ['ngResource'])




  	
.factory('TwitterService', function($cordovaOauth, $cordovaOauthUtility, $http, $resource, $q) {
    // 1
    var twitterKey = "STORAGE.TWITTER.KEY";
    var clientId = 'Uzfi2kahegpKUHT2DOnVtY9OH';
    var clientSecret = 'lGsLNBEP9C9q6k4lW6o8BR6tro8EC1XEDSSfM3DyBSqDcc70qJ';

    // 2
    function storeUserToken(data) {
        window.localStorage.setItem(twitterKey, JSON.stringify(data));
    }

    function getStoredToken() {
        return window.localStorage.getItem(twitterKey);
    }

    // 3
    function createTwitterSignature(method, url) {
        var token = angular.fromJson(getStoredToken());
        var oauthObject = {
            oauth_consumer_key: clientId,
            oauth_nonce: $cordovaOauthUtility.createNonce(10),
            oauth_signature_method: "HMAC-SHA1",
            oauth_token: token.oauth_token,
            oauth_timestamp: Math.round((new Date()).getTime() / 1000.0),
            oauth_version: "1.0"
        };
        var signatureObj = $cordovaOauthUtility.createSignature(method, url, oauthObject, {}, clientSecret, token.oauth_token_secret);
        $http.defaults.headers.common.Authorization = signatureObj.authorization_header;
    }

    return {
        // 4
        initialize: function() {
            var deferred = $q.defer();
            var token = getStoredToken();

            if (token !== null) {
                deferred.resolve(true);
            } else {
                $cordovaOauth.twitter(clientId, clientSecret).then(function(result) {
                    storeUserToken(result);
                    deferred.resolve(true);
                }, function(error) {
                    deferred.reject(false);
                });
            }
            return deferred.promise;
        },
        // 5
        isAuthenticated: function() {
            return getStoredToken() !== null;
        },
        // 6
        getHomeTimeline: function() {
            var home_tl_url = 'https://api.twitter.com/1.1/statuses/home_timeline.json';
            createTwitterSignature('GET', home_tl_url);
            return $resource(home_tl_url).query();
        },
        storeUserToken: storeUserToken,
        getStoredToken: getStoredToken,
        createTwitterSignature: createTwitterSignature
    };
})
.factory('EventService', function($q, $resource) {
    var events = $resource('./data/events.json').query();

    return {
        // 文字列と開始日、終了日でイベント情報を検索する
        find: function(string_s, start_s, end_s, distance_s, latitude_s, longitude_s) {
            var deferred = $q.defer();
            var results = events.filter(function(element) {
		// 距離チェック
	        var currentLatLng = new google.maps.LatLng(latitude_s,longitude_s);
		var objectLatLng = new google.maps.LatLng(element.location.geo.latitude,element.location.geo.longitude);
		var distance = google.maps.geometry.spherical.computeDistanceBetween(currentLatLng,objectLatLng);
		var distanceCheck = distance <= distance_s;

                // 文字列チェック
                var fullString = element.name + " " + element.description;
		if(!string_s) string_s = "";
                var stringCheck = fullString.toLowerCase().indexOf(string_s.toLowerCase()) > -1;

                // 開始日、終了日チェック
                var startDate = new Date(element.startDate);
                var endDate = new Date(element.endDate);
                var start = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate()).getTime();
                var end = new Date(endDate.getFullYear(),endDate.getMonth(),endDate.getDate()).getTime();
                var startEndCheck = (end - start_s.getTime()) * (end_s.getTime() - start) > 0;

                return stringCheck && startEndCheck && distanceCheck;
            });
            deferred.resolve(results);
            return deferred.promise;
        },

	findAll: function() {
            var deferred = $q.defer();
            deferred.resolve(events);
            return deferred.promise;
        },

        // eventIdのイベント情報を返す
        findById: function(eventId) {
            var deferred = $q.defer();
            var event = events[eventId - 1];
            deferred.resolve(event);
            return deferred.promise;
        },

        // fullcalendar用にイベント情報を変換する
        getCalendarInfo: function() {
            var calEvents = new Array();
            for(var i=0; i<events.length; i++) {
                var calEvent = new Object();
                calEvent['title'] = events[i].name;
                calEvent['start'] = events[i].startDate;
                calEvent['end'] = events[i].endDate;
                calEvent['url'] = "#/tabs/calendar/" + events[i].id;
                calEvents.push(calEvent);
            }
            return calEvents;
        },

        // Google Mapのマーカー用にイベント情報を変換する
        getMarkerInfo: function() {
          var markers = new Array();
          for(var i=0; i<events.length; i++) {
	      var marker = {
		  id: events[i].id,
		  title: "<a href='#/tabs/map/" + events[i].id + "'>" + events[i].name + "</a>",
		  latitude: events[i].location.geo.latitude,
		  longitude: events[i].location.geo.longitude,
		  show: false,
		  onClick: function() {
		      this.show = !this.show;
		  }.bind(this)
	      };
	      markers.push(marker);
          }
          return markers;
        }
    }
})
.factory('BluemixService', function($http,$q, $resource,globals) {
	
    
	var rooturl=globals.rooturl;
	
	var mailobj={
		from: "",
		to: "",
		subject: "",
		text: "",
		html: ""
	}

    return {
		
		
		sendMail: function(mobj,callback){
			$http.post(rooturl+"/events/sendmail",{ mailobject: mobj})
            .success(function(data) {

				colog("success ! "+data)
				data.error=false;
				data.errormsg="";
				if (callback) callback(data);
				return data;
			})
			.error(function(data){
				colog("error ! "+data) 
				data.error=true;
				data.errormsg=data.message;
				if (callback) callback(data);
				return data;
			});
			
			
		},
		
		listObjects: function(options,callback) {
		  	var opt = { 
				dbname: "users",
				filters: [{
					tagname: "",
					tagvalue: "",
					exact: false,
					ignorecase: true
				}],
				sortby: ""
             };
            jQuery.extend(opt, options);
			
			var dbname=opt.dbname;
			var retvalue={
				rows: []
			}
				
			$http.get(rooturl+"/events/listobjects/"+dbname, { 
  		   		   "a": "a"
     		} )
            .success(function(data) {
				
				
				
				for (var i=0; i<data.rows.length; i++){
					
					var doc=data.rows[i].doc;
					
					for (var j=0; j<opt.filters.length; j++){
						var filter=opt.filters[j];
						var tag=filter.tagname.trim();
						var value=filter.tagvalue.trim();
						
						
						
						if (tag!="")  {   //filterfound
							
							colog("found tag "+tag+" to search for")
							if (doc[tag]){
								colog("this document has tag "+tag)
								var text=String(doc[tag]);
								colog("doc."+tag+"="+text)
								if (text.indexOf(value)>-1){
									retvalue.rows.push(data.rows[i]);
									
								}
							}
							
						} else
						{
						 //colog("filter is empty, adding plain row")	
						 retvalue.rows.push(data.rows[i]);	
						}
						
					}
					
					
					
					
					if (opt.filters.length==0) retvalue.rows.push(data.rows[i])
				}
				
				
				if (opt.sortby.trim()!=""){
					
					colog("sorting data by tag "+opt.sortby)
					var sortby=opt.sortby.toLowerCase();
					retvalue.rows.sort(function(a,b){
						
						var a1=a.doc[sortby];
						var b1=b.doc[sortby];
						if (a1>b1) return 1;
						if (a1<b1) return -1;
						return 0;
						
						
					})
					
					
				}

				colog("success ! got "+retvalue.rows.length+" rows ")
				
				if (callback) callback(retvalue);
				return retvalue;
			})
			.error(function(data){
				colog("error ! "+data) 
				if (callback) callback(data);
				return data;
			});
			
			
		}
		
		
		
	}
	
	
})




.factory('SAuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized
      }[response.status], response);
      return $q.reject(response);
    }
  };
})


.factory('AuthInterceptor', function ($rootScope, $q, $location) {
	var c=JSON.parse(getCookie("user"));
	
    var token="login";
	if (c) {
		colog("found user cookie")
	if (c.token) {
		token=c.token;
		colog("applying user cookie")
		}
	}
	
	//alert(token)
	
		var AUTH_EVENTS={
		notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
		
	}
	
	var USER_ROLES={
		admin: 'admin_role',
        public_role: 'public_role',
		ibm_salesrep: 'ibm_salesrep'
	}
	
	

	
	
    return {
        // Add authorization token to headers
        request: function (config) {
            config.headers = config.headers || {};
            //var token = localStorageService.get('token');
            
            /*if (token && token.expires && token.expires > new Date().getTime()) {
              config.headers['x-auth-token'] = token.token;
            }*/
			var c=JSON.parse(getCookie("user"))
			var token="";
			if (c) token=c.token;
			//colog("adding token: "+token)
			
			var cc=getCookie("token");
			config.headers['x-auth-token'] = cc;
            
            return config;
        },
		 response: function (response) {
            // do something on success
			 if(response.headers()['content-type'] === "application/json; charset=utf-8"){
               //console.log("INTERCEPTOR GOT JSON RESPONSE")
			   //console.log(response)
                // Validate response, if not ok reject
				if (response.data){
					
					if (response.data.success==false){
						
						var error=response.data.message;
						//colog("success: false, message: "+error)
						if (error.toLowerCase().indexOf("expired")>-1) {
							colog("token expired")
							 $location.path('/login');
							 return $q.reject(response);
							
						}
						if (error.toLowerCase().indexOf("failed to authenticate token")>-1) {
							colog("token invalid")
							 $location.path('/login');
							 return $q.reject(response);
							
						}
						
					}
					
				}
             }   
            
            return response;
        },
		responseError: function (responseerror) {
			console.log("responseError")
			console.log(responseerror)
		  $rootScope.$broadcast({
			401: AUTH_EVENTS.notAuthenticated,
			403: AUTH_EVENTS.notAuthorized
		  }[responseerror.status], responseerror);
		  $location.path('/login');
		  return $q.reject(responseerror);
		}
    };
})



.service('AuthService', function($q, $http, USER_ROLES) {
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var username = '';
  var isAuthenticated = false;
  var role = '';
  var authToken;

  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }

  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }

  function useCredentials(token) {
    username = token.split('.')[0];
    isAuthenticated = true;
    authToken = token;

    if (username == 'admin') {
      role = USER_ROLES.admin
    }
    if (username == 'user') {
      role = USER_ROLES.public
    }

    // Set the token as header for your requests!
    $http.defaults.headers.common['X-Auth-Token'] = token;
  }

  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    isAuthenticated = false;
    $http.defaults.headers.common['X-Auth-Token'] = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

  var login = function(name, pw) {
    return $q(function(resolve, reject) {
      if ((name == 'admin' && pw == '1') || (name == 'user' && pw == '1')) {
        // Make a request and receive your auth token from your server
        storeUserCredentials(name + '.yourServerToken');
        resolve('Login success.');
      } else {
        reject('Login Failed.');
      }
    });
  };

  var logout = function() {
    destroyUserCredentials();
  };

  var isAuthorized = function(authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
  };

  loadUserCredentials();

  return {
    login: login,
    logout: logout,
    isAuthorized: isAuthorized,
    isAuthenticated: function() {return isAuthenticated;},
    username: function() {return username;},
    role: function() {return role;}
  };
})

.service('CordovaService', function() {
  document.addEventListener("deviceready", function() {
    console.log('** cordova ready **');
  }, false);
});



/*
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
})*/




