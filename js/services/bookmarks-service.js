var $ = require('jquery');

var apiUrl = "http://bookmarks-wadjetz.rhcloud.com";

module.exports.getBookmarks = function (callback) {
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
        	callback(err, status);
      	}
    });
};
