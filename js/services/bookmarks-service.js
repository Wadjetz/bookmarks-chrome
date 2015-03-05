var $ = require('jquery');
var BrowserService = require('./browser-service');

var apiUrl = "http://bookmarks-wadjetz.rhcloud.com";
//apiUrl = "http://localhost:8888";

var localStorageTimeout = 12344;

module.exports.getBookmarks = function (callback) {


	BrowserService.storage.get('last_update', function (items) {
		console.log('last_update', items);
	});

	BrowserService.storage.get('bookmarks', function (items) {
		if ($.isEmptyObject(items)) {
			$.get(apiUrl + '/api/secure/bookmarks', function(res) {
				BrowserService.storage.save({ 'bookmarks': res }, function () {
					BrowserService.storage.save({ 'last_update': Date.now() });
					console.log("bookmarks from API", res);
					callback(res);
				});
			});
		} else {
			console.log("bookmarks from Storage", items);
			callback(items.bookmarks);
		}
	});
};

module.exports.getRecentsBookmarks = function (callback) {
	$.get(apiUrl + '/api/secure/bookmarks?order=recents', function(res) {
		callback(res);
	});
};

module.exports.save = function (bookmark, callback) {
	$.ajax({
		type: 'POST',
      	url: apiUrl + '/api/secure/bookmarks',
      	dataType: 'json',
      	data: bookmark,
      	success: function(data) {
        	callback(data);
      	},
      	error: function(xhr, status, err) {
        	callback(null, err, status);
      	}
    });
};

module.exports.getKeywords = function (callback) {
	$.ajax({
		type: 'GET',
		url: apiUrl + '/api/secure/bookmarks/get/keywords',
		success: function(data) {
			callback(data);
		},
		error: function(xhr, status, err) {
			callback(null, err);
		}
	});
};

module.exports.clicked = function (id, callback) {
	$.ajax({
		type: 'PUT',
		url: apiUrl + '/api/secure/bookmarks/click/' + id,
		success: function(data) {
			callback(data);
		},
		error: function(xhr, status, err) {
			callback(null, err);
		}
	});
};

module.exports.isConnected = function (callback) {
	$.ajax({
		type: 'GET',
		url: apiUrl + '/api/users/connected',
		success: function(data) {
			callback(data);
		},
		error: function(xhr, status, err) {
			callback(null, err);
		}
	});
};

module.exports.login = function (user, callback) {
	$.ajax({
		type: 'POST',
		url: apiUrl + '/api/users/login',
		data: user,
		success: function(data) {
			callback(data);
		},
		error: function(xhr, status, err) {
			callback(null, err);
		}
	});
};

module.exports.isExist = function (url, callback) {
	$.ajax({
		type: 'GET',
      	url: apiUrl + '/api/secure/bookmarks/by/url',
      	data: {
			url: url
		},
      	success: function(data) {
        	callback(data);
      	},
      	error: function(xhr, status, err) {
        	callback(null, err, status);
      	}
    });
};
