app.controller('resultsController',['$http','$interval','$scope','technophiliaService',resultsController]);
function resultsController(http,interval,$scope,technophiliaService){
		
	$scope.myData = [
	                 {ProjectNo: '1', Rating: 0},{ProjectNo: '2', Rating: 0},
	                 {ProjectNo: '3', Rating: 0},{ProjectNo: '4', Rating: 0},
	                 {ProjectNo: '5', Rating: 0},{ProjectNo: '6', Rating: 0},
	                 {ProjectNo: '7', Rating:0},{ProjectNo: '8', Rating: 0},
	                 {ProjectNo: '9', Rating: 0},{ProjectNo: '10', Rating: 0},
	                 {ProjectNo: '11', Rating: 0},{ProjectNo: '12', Rating: 0},
	                 {ProjectNo: '13', Rating: 0},{ProjectNo: '14', Rating: 0},
	                 {ProjectNo: '15', Rating: 0},{ProjectNo: '16', Rating: 0},
	                 {ProjectNo: '17', Rating: 0},{ProjectNo: '18', Rating: 0}
	             ];
	
	$scope.leaders = {};
	
	var recallInterval = 3000;
	$scope.var1 = true;
	$scope.var2 = true;
	$scope.var3 = true;
	
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
				return parseFloat(json.Rating) >= 0;
			});
		
	};
	$scope.fetchDataForGlobalDistribution = function(){
		$scope.var1 = false;
		return technophiliaService.fetchDataForGlobalDistribution().then(function success(response){
			$scope.prepareDataForBarChart(response.data);
			$scope.getLeaders($scope.myData,5);
		},function failure(response){
			console.log("error in fetchDataForGlobalDistribution");
		});
	};
	
	$scope.prepareDataForTrendLine = function(data){
		if(data.length > 0){//check for data is there or not
			if(data[0]['ProjectNo'] === null){
				$scope.currentProjectNo = null;
				$scope.currentProjectAverageRatingTrend = [];
			}
			if(data[0]['ProjectNo'] && (parseInt(data[0]['ProjectNo']) !== +$scope.currentProjectNo)){//check if project no is there in the json or not
				$scope.currentProjectAverageRatingTrend = [];
				$scope.currentProjectNo = parseInt(data[0]['ProjectNo']);
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
		$scope.var2 = false;
		return technophiliaService.fetchCurrentProjectAverageRating().then(function success(response){
			$scope.prepareDataForTrendLine(response.data);
			
		},function failure(response){
			console.log("error in fetchCurrentProjectAverageRating");
		});
	};
	
	$scope.prepareDataForVotingDistribution = function(data){
		var tempVotingDistribution = [
		                              { Rating: '4', Count: 0 },
		                              { Rating: '3', Count: 0 },
			   			              { Rating: '2', Count: 0 },
			   			              { Rating: '1', Count: 0 }, 
			   			              { Rating: '0', Count: 0 }
						               ]; 
		if(data.length > 0){//check for data is there or not
			data = data.sort(function (a,b) {return parseInt(b.Rating) - parseInt(a.Rating)});
			for ( var i = 0; i < data.length; i++) {
				
				tempVotingDistribution[tempVotingDistribution.length -1 -parseInt(data[i]['Rating'])]['Count'] = parseInt(data[i]['Count']); 
			}
			$scope.currentProjectVotingDistribution = tempVotingDistribution;
		}
		else{
			$scope.currentProjectVotingDistribution = tempVotingDistribution;
		}
	};
	
	$scope.fetchCurrentProjectVotingDistribution = function(){
		$scope.var3 = false;
		return technophiliaService.fetchCurrentProjectVotingDistibution().then(function success(response){
			$scope.prepareDataForVotingDistribution(response.data);	
		},function failure(response){
			console.log("error in fetchCurrentProjectVotingDistribution");
		});
	};
	$scope.executeAllFunctions = function (){
		
		if($scope.var1 && $scope.var2 && $scope.var3){
			$scope.fetchDataForGlobalDistribution().then(function success(){
				$scope.var1 = true;				
			});
			$scope.fetchCurrentProjectAverageRating().then(function success(){
				$scope.var2 = true;				
			});
			$scope.fetchCurrentProjectVotingDistribution().then(function success(){
				$scope.var3 = true;				
			});
		}
		};
	
	
	(function Initalize(){
		$scope.dataFetched = false;
		$scope.liveResultsPagePathName = "/results.html";
		interval($scope.executeAllFunctions,recallInterval);
		
		/*if(location.pathname === $scope.liveResultsPagePathName){
			interval($scope.fetchDataForGlobalDistribution,recallInterval);
			interval($scope.fetchCurrentProjectAverageRating,recallInterval);
			interval($scope.fetchCurrentProjectVotingDistribution,recallInterval);
		}*/
	})();
}
