app.controller('adminController',['$scope','technophiliaService',adminController]);
function adminController($scope,technophiliaService){
		
	$scope.updateCurrentTeam = function(){
		$scope.status = null;
		technophiliaService.updateCurrentProject($scope.currentProject).then(
			function success(response){
				$scope.status = "updated successfully";
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
			},
			function failure(response){
				console.log(response.data);
			});
	})();
}
