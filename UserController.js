(function(){

	var app = angular.module("githubViewer");

	var UserController = function($scope, github, $routeParams, $log){
		var onUserComplete = function(data){
			$scope.user = data;
			github.getRepos($scope.user)
				 .then(onRepos, onError);
		};

		var onRepos = function(data){
			$scope.repos = data;
		};

		var onError = function(reason){
			$scope.error = "Could not load the data.";
		};

		$scope.search = function(username){
			$log.info("Searching for " + username);
			github.getUser(username).then(onUserComplete, onError);
			 if(countdownInterval){
			 	$interval.cancel(countdownInterval);
			 }
		};

		$scope.username = $routeParams.username;
		$scope.sortOrderBy = "-name";
		github.getUser($scope.username).then(onUserComplete, onError);
	};

	app.controller("UserController", UserController);

}());