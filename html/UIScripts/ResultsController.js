app.controller('resultsController',['$http','$interval','$scope','technophiliaService',resultsController]);
function resultsController(http,interval,$scope,technophiliaService){
		
	$scope.myData = [
	                 /*{ProjectNo: '1', Rating: 0},{ProjectNo: '2', Rating: 0},
	                 {ProjectNo: '3', Rating: 0},{ProjectNo: '4', Rating: 0},
	                 {ProjectNo: '5', Rating: 0},{ProjectNo: '6', Rating: 0},
	                 {ProjectNo: '7', Rating: 0},{ProjectNo: '8', Rating: 0},
	                 {ProjectNo: '9', Rating: 0},{ProjectNo: '10', Rating: 0},
	                 {ProjectNo: '11', Rating: 0},{ProjectNo: '12', Rating: 0},
	                 {ProjectNo: '13', Rating: 0},{ProjectNo: '14', Rating: 0},
	                 {ProjectNo: '15', Rating: 0},{ProjectNo: '16', Rating: 0},
	                 {ProjectNo: '17', Rating: 0},{ProjectNo: '18', Rating: 0},
	                 {ProjectNo: '19', Rating: 0},{ProjectNo: '20', Rating: 0}*/
	             ];
	$scope.leaders = {};
	var recallInterval = 3000;
	
	$scope.currentProjectAverageRatingTrend = [];
	$scope.currentProjectVotingDistribution = [];
	$scope.currentProjectNo = null;
	
	$scope.prepareDataForBarChart = function(data){
		for(var index=0;index<data.length;index++){
			if(+data[index]['AverageRating'] === 0 ){
				data[index]['Rating'] = "0";
			}
		}
		$scope.myData = data;
	};
	$scope.getLeaders = function(data,numberOfLeaders){
		var copiedJsonData = JSON.parse(JSON.stringify(data));//cloning the object to not modify the model variable
		$scope.leaders = copiedJsonData.sort(function sorting(a,b){
			if(parseFloat(b.Rating) === parseFloat(a.Rating)){
				return parseInt(b.Voters) - parseInt(a.Voters);
			}
			return parseFloat(b.Rating) - parseFloat(a.Rating);//descending
		}).slice(0,numberOfLeaders).filter(function removeNotVotedTeams(json){//filtering out non voted teams
			return parseFloat(json.Rating) > 0;
		});
	};
	$scope.fetchDataForGlobalDistribution = function(){
		return technophiliaService.fetchDataForGlobalDistribution().then(function success(response){
			$scope.prepareDataForBarChart(response.data);
			$scope.getLeaders($scope.myData,5);
		},function failure(response){
			console.log("error");
		});
	};
	
	$scope.prepareDataForTrendLine = function(data){
		if(data.length > 0){//check for data is there or not
			if(data[0]['ProjectNo']){//check if project no is there in the json or not
				if(parseInt(data[0]['ProjectNo']) !== +$scope.currentProjectNo){// if project changed ..set to default
					$scope.currentProjectVotingDistribution = [];
					$scope.currentProjectNo = parseInt(data[0]['ProjectNo']);
				}
			}
			
			
			if (data[0]['AverageRating']) {
				$scope.currentProjectAverageRatingTrend.push({
					"Time":new Date(),
					"Rating":data[0]['AverageRating']
				});		
			}
		}
	};
	
	$scope.fetchCurrentProjectAverageRating = function(){
		return technophiliaService.fetchCurrentProjectAverageRating().then(function success(response){
			$scope.prepareDataForTrendLine(response.data);
			
		},function failure(response){
			console.log("error");
		});
	};
	
	$scope.prepareDataForVotingDistribution = function(data){
		if(data.length > 0){//check for data is there or not
			if(data[0]['ProjectNo']){//check if project no is there in the json or not
				if(parseInt(data[0]['ProjectNo']) !== +$scope.currentProjectNo){// if project changed ..set to default
					$scope.currentProjectAverageRatingTrend = [];
					$scope.currentProjectNo = parseInt(data[0]['ProjectNo']);
				}
			}
			$scope.currentProjectVotingDistribution = data;
			/*if (data[0]['AverageRating']) {
				$scope.currentProjectAverageRatingTrend.push({
					"Time":new Date(),
					"Rating":data[0]['AverageRating']
				});		
			}*/
		}
	};
	
	$scope.fetchCurrentProjectVotingDistribution = function(){
		return technophiliaService.fetchCurrentProjectVotingDistibution().then(function success(response){
			$scope.prepareDataForVotingDistribution(response.data);			
		},function failure(response){
			console.log("error");
		});
	};
	
	
	(function Initalize(){
		$scope.dataFetched = false;
		$scope.liveResultsPagePathName = "/results.html";
		$scope.fetchDataForGlobalDistribution().then(
			function success(response){
				$scope.dataFetched = true;
				},
			function failure(response){console.log(response)});
		
		
		$scope.fetchCurrentProjectAverageRating().then(
				function success(response){
					$scope.dataRatingFetched = true;
					},
				function failure(response){console.log(response)});
		
		if(location.pathname === $scope.liveResultsPagePathName){
			interval($scope.fetchDataForGlobalDistribution,recallInterval);
			interval($scope.fetchCurrentProjectAverageRating,recallInterval);
			interval($scope.fetchCurrentProjectVotingDistribution,recallInterval);
		}
	})();
}
