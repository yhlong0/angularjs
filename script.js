(function(){

	var app = angular.module("githubViewer", []);

	var MainController = function($scope, $http, $interval, $log){
		var onUserComplete = function(response){
			$scope.user = response.data;
			$http.get($scope.user.repos_url)
				 .then(onRepos, onError);
		};

		var onRepos = function(response){
			$scope.repos = response.data;
		};

		var onError = function(reason){
			$scope.error = "Could not load the data.";
		};

		$scope.search = function(username){
			$log.info("Searching for " + username);
			$http.get("https://api.github.com/users/" + username)
			 .then(onUserComplete, onError);
			 if(countdownInterval){
			 	$interval.cancel(countdownInterval);
			 }
		};
		
		var decrementCountdown = function(){
			$scope.countdown -= 1;
			if($scope.countdown < 1){
				$scope.search($scope.username);
			}
		};

		var countdownInterval = null;

		var startCountdown = function(){
			countdownInterval = $interval(decrementCountdown, 1000, 5);
		};

		$scope.message = "Hello";
		$scope.username = "angular";
		$scope.sortOrderBy = "-name";
		$scope.countdown = 5;
		startCountdown();
	};

	app.controller("MainController", MainController);

}());