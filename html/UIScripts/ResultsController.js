app.controller('resultsController',['$http','$interval','$scope','technophiliaService',resultsController]);
function resultsController(http,interval,$scope,technophiliaService){
		
	$scope.myData = [
	                 {ProjectNo: '1', Rating: 0},{ProjectNo: '2', Rating: 0},
	                 {ProjectNo: '3', Rating: 0},{ProjectNo: '4', Rating: 0},
	                 {ProjectNo: '5', Rating: 0},{ProjectNo: '6', Rating: 0},
	                 {ProjectNo: '7', Rating: 0},{ProjectNo: '8', Rating: 0},
	                 {ProjectNo: '9', Rating: 0},{ProjectNo: '10', Rating: 0},
	                 {ProjectNo: '11', Rating: 0},{ProjectNo: '12', Rating: 0},
	                 {ProjectNo: '13', Rating: 0},{ProjectNo: '14', Rating: 0},
	                 {ProjectNo: '15', Rating: 0},{ProjectNo: '16', Rating: 0},
	                 {ProjectNo: '17', Rating: 0},{ProjectNo: '18', Rating: 0},
	                 {ProjectNo: '19', Rating: 0},{ProjectNo: '20', Rating: 0}
	             ];
	
	
	$scope.prepareDataForBarChart = function(data){
		for(var index=0;index<data.length;index++){
			if(+data[index]['AverageRating'] === 0 ){
				data[index]['Rating'] = "0";
			}
		}
		$scope.myData = data;
		
	};
	
	$scope.fetchData = function(){
		return technophiliaService.fetchData().then(function success(response){
			$scope.prepareDataForBarChart(response.data);
		},function failure(response){
			console.log("error");
		});
	};
	
	interval($scope.fetchData,3000);
	
	(function Initalize(){
		$scope.dataFetched = false;
		$scope.fetchData().then(
			function success(response){
				$scope.dataFetched = true;
				},
			function failure(response){console.log(response)});
	})();
}
