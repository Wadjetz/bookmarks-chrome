angular.module('BookmarksServiceModule', []).service('BookmarksService', [
    '$http',
    '$q',
    function ($http, $q) {
        var self = this;

        var serverUrl = 'http://localhost:8888';
        serverUrl = "http://bookmarks-wadjetz.rhcloud.com";

        self.isConected = function () {
            var deferred = $q.defer();
            $http.get(serverUrl+'/api/users/connected')
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject("No connected");
                });
            return deferred.promise;
        };

        self.getUrlByUrl = function (url) {
            return $http.get(serverUrl+ '/api/secure/bookmarks/by/url', {
                'url' : url
            });
        }

        self.getKeywords = function () {
            var deferred = $q.defer();
            $http.get(serverUrl+ '/api/secure/bookmarks/get/keywords')
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject("Error loading keywords");
                });
            return deferred.promise;
        };

        self.connection = function (login, password) {
            var deferred = $q.defer();
            $http.post(serverUrl+'/api/users/login', {
                'login'    : login,
                'password' : password
            })
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject("Error connection");
                });
            return deferred.promise;
        };

        self.search = function (query) {
            var deferred = $q.defer();
            $http.get(serverUrl + '/api/secure/bookmarks/search/' + query)
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject("Error searching keywords");
                });
            return deferred.promise;
        };

        self.getBookmarks = function () {
            var deferred = $q.defer();
            $http.get(serverUrl + '/api/secure/bookmarks')
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject("Error loading bookmarks");
                });
            return deferred.promise;
        };

        self.getBookmarkById = function (id) {
            var deferred = $q.defer();
            $http.get(serverUrl + '/api/secure/bookmarks/' + id)
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject("Error loading bookmark");
                });
            return deferred.promise;
        };

        self.getBookmarkByKeywords = function (keywords) {
            //console.log(keywords);
            var deferred = $q.defer();
            $http.get(serverUrl + '/api/secure/bookmarks/by/keywords', {
                params: {
                    'keywords': keywords
                }
            })
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).
                error(function (data, status, headers, config) {
                    deferred.reject("Error loading bookmark");
                });
            return deferred.promise;
        };

        self.update = function (id, bookmark) {
            var deferred = $q.defer();
            $http.put(serverUrl + '/api/secure/bookmarks/' + bookmark._id, bookmark)
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject("Error loading bookmark");
                });
            return deferred.promise;
        };

        self.create = function (bookmark) {
            var deferred = $q.defer();
            $http.post(serverUrl + '/api/secure/bookmarks', bookmark)
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject("Error Creating bookmark");
                });
            return deferred.promise;
        }


        self.deleteBookmark = function (id) {
            var deferred = $q.defer();
            $http.delete(serverUrl + '/api/secure/bookmarks/' + id)
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject("Error deleting bookmark");
                });
            return deferred.promise;
        };

        self.bookmarkClick = function (id) {
            console.log('Serv bookmarkClick = ' + id);
            var deferred = $q.defer();
            $http.put(serverUrl + '/api/secure/bookmarks/click/' + id)
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    deferred.reject("Error deleting bookmark");
                });
            return deferred.promise;
        };

        self.getCurrentUrl = function (callback) {
            chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
                //console.log(tabs);
                callback(tabs[0].url, tabs[0].title);
            });
        };
    }
]);


