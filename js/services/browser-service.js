
var chromeApi = chrome;
var tabsApi = chrome.tabs;

module.exports.openNewTab = function (url) {
	if ((tabsApi !== null) && (tabsApi !== undefined)) {
		tabsApi.create({
			url: url
		});
	}
};

module.exports.getTabInfo = function (callback) {
	if ((tabsApi !== null) && (tabsApi !== undefined) && callback) {
		tabsApi.query({
			'active': true,
			'lastFocusedWindow': true
		}, function (tabs) {
			callback(tabs[0].url, tabs[0].title);
		});
	}
};

module.exports.storage = {
	save: function (obj, callback) {
		chrome.storage.local.set(obj, callback);
	},
	get: function (keys, callback) {
		chrome.storage.local.get(keys, callback);
	},
	remove: function(keys, callback) {
		chrome.storage.local.remove(keys, callback);
	}
};
