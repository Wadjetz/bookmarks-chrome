
var BookmarksChromeApp = angular.module('BookmarksChromeApp', ['BookmarksServiceModule']);

BookmarksChromeApp.controller('BookmarksCtrl', ['$scope', 'BookmarksService', function ($scope, BookmarksService) {
	$scope.connection = false;
	$scope.login = "";
	$scope.password = "";

	$scope.succes = false;
	$scope.exist = false;

	BookmarksService.isConected().then(function (response) {
		$scope.connection = true;
	}, function (response) {
		$scope.connection = false;
	});

	BookmarksService.getCurrentUrl(function (url, title) {
		$scope.url = url;
		$scope.title = title;

		BookmarksService.getUrlByUrl(url).then(function (response) {
			if (response.data.bookmark != null) {
				$scope.exist = true;
			} else {
				$scope.exist = false;
			}
		});
		
	});

	BookmarksService.getKeywords().then(function (keywordsList) {
		$scope.keywordsList = keywordsList;
	}, function (err) {
		$scope.keywordsList = ['chrome'];
	})
	

	$scope.loginSubmit = function () {
		if ($scope.formLogin.$valid) {
			BookmarksService.connection($scope.login, $scope.password).then(function (response) {
				console.log(response);
				if (response.error != undefined && response.error == false) {
					$scope.message = "";
					$scope.connection = true;
				} else {
					$scope.message = response.message;
				}
			}, function (response) {
				if (response.error != undefined && response.error == true) {
					$scope.message = response.message;
				} else {
					$scope.message = response;
				}
			});
		}
	};

	$scope.createBookmarks = function () {
		var formBookmarkData = {
			url         : $scope.url,
			title       : $scope.title,
			description : $scope.description,
			keywords    : $scope.newKeyword
		};
		console.log(formBookmarkData);

		if (formBookmarkData.keywords == "") {
			formBookmarkData.keywords = "AAA";
		}

		if ($scope.formBookmarks.$valid) {
			BookmarksService.create(formBookmarkData).then(function (response) {
				$scope.succes = true;
				console.log(response);
				//$scope.message = response;
			}, function (response) {
				console.log(response);
				//$scope.message = response;
			});
		}
	};
}]);


