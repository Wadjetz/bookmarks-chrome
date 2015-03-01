var $ = require('jquery');

var apiUrl = "http://bookmarks-wadjetz.rhcloud.com";

module.exports.getBookmarks = function (callback) {
	$.get(apiUrl + '/api/secure/bookmarks', function(res) {
		callback(res);
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
