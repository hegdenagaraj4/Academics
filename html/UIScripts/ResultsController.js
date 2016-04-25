app.controller('resultsController',['$http','$interval','$scope','technophiliaService',resultsController]);
function resultsController(http,interval,$scope,technophiliaService){
		
	$scope.myData = [
	                 {ProjectNo: 'AngularJS', Rating: 300},
	                 {ProjectNo: 'D3.JS', Rating: 150},
	                 {ProjectNo: 'jQuery', Rating: 400},
	                 {ProjectNo: 'Backbone.js', Rating: 300},
	                 {ProjectNo: 'Ember.js', Rating: 100}
	             ];
	/*this.fetchdata = function(caller){
	 	var that=caller;
		return http({method:'GET',url: 'ServerSideScripts/fetchdata.php'}).then(function success(response){
			that.votes = response.data;
			interval(that.fetchdata,2000,0,true,that);
		},function failure(response){
			console.log("error");
		});
	};*/
	$scope.changeData = function(){
		$scope.myData.push({name:'new',count:1000});
	};
	
	$scope.fetchData = function(){
		return technophiliaService.fetchData().then(function success(response){
			$scope.myData = response.data;
		},function failure(response){
			console.log("error");
		});
	};
	
	interval($scope.fetchdata,3000);
	
	(function Initalize(){
		$scope.dataFetched = false;
		$scope.fetchData().then(
			function success(response){
				$scope.dataFetched = true;
				},
			function failure(response){console.log(response)});
	})();
}
