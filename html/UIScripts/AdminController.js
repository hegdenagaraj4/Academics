app.controller('adminController',['$scope','technophiliaService',adminController]);
function adminController($scope,technophiliaService){
		
	$scope.updateCurrentTeam = function(){
		$scope.status = null;
		technophiliaService.updateCurrentProject($scope.currentProject).then(
			function success(response){
				$scope.currentFetchedProject = response.data[0]['project_name'];
				$scope.status = "Project Updated successfully to " + $scope.currentFetchedProject;
			},
			function failure(response){
				$scope.status = response.status  + " " + response.statusText;
			}
		);
	};
	
	$scope.startTechnophilia = function(){
		$scope.status = null;
		
		if($scope.validationText && $scope.validationText.toLowerCase() === "ok"){
			$scope.validationText = null;
			technophiliaService.startTechnophilia().then(
					function success(response){
						$scope.status = response.status  + " " + response.statusText;
					},
					function failure(response){
						$scope.status = response.status  + " " + response.statusText;
					}
				);
		}else{
			$scope.status = "Correct password is 'ok'";
		}
		
	};
	$scope.endTechnophilia = function(){
		$scope.status = null;
		technophiliaService.endTechnophilia().then(
			function success(response){
				$scope.status = response.status  + " " + response.statusText;
				$scope.currentFetchedProject = null;
				$scope.currentProject = null;
			},
			function failure(response){
				$scope.status = response.status  + " " + response.statusText;
			}
		);
	};
	
	
	$scope.allProjects = {};
	
	(function getProjects(){
		$scope.status = null;
		technophiliaService.fetchAllProjects().then(
			function success(response){
				$scope.status = response.status  + " " + response.statusText;
				$scope.allProjects = response.data;
				for ( var i = 0; i < response.data.length; i++) {
					if(response.data[i]['Status'] === "1"){
						$scope.currentFetchedProject = response.data[i]['project_name'];
						break;
					}
				}
			},
			function failure(response){
				$scope.status = response.status  + " " + response.statusText;
			});
	})();
}
