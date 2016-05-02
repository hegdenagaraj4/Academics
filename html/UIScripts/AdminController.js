app.controller('adminController',['$scope','technophiliaService',adminController]);
function adminController($scope,technophiliaService){
		
	$scope.updateCurrentTeam = function(){
		$scope.status = null;
		technophiliaService.updateCurrentProject($scope.currentProject).then(
			function success(response){
				$scope.currentFetchedProject = response.data[0]['project_name'];
				$scope.status = "updated successfully  " + $scope.currentFetchedProject;
			},
			function failure(response){
				$scope.status = "error" + response.status;
			}
		);
	};
	
	$scope.allProjects = {};
	(function getProjects(){
		technophiliaService.fetchAllProjects().then(
			function success(response){
				$scope.allProjects = response.data;
				for ( var i = 0; i < response.data.length; i++) {
					if(response.data[i]['Status'] === "1"){
						$scope.currentFetchedProject = response.data[i]['project_name'];
						break;
					}
						
				}
			},
			function failure(response){
				console.log(response.data);
			});
	})();
}
