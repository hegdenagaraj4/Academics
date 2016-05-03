app.factory('technophiliaService',['$http',technophiliaService]);
function technophiliaService(http){
	
	return {
		fetchDataForGlobalDistribution : function(){
			return http({method:'GET',url: 'ServerSideScripts/fetchdata.php'}); 
		},
		fetchCurrentProjectAverageRating : function(){
			return http({method:'GET',url: 'ServerSideScripts/fetchCurrentProjectRating.php'}); 
		},
		fetchCurrentProjectVotingDistibution:function(){
			return http({method:'GET',url: 'ServerSideScripts/fetchCurrentProjectVotesDistribution.php'}); 
		},
		fetchAllProjects:function(){
			return http({method:'GET',url: 'ServerSideScripts/fetchAllProjects.php'}); 
		},
		updateCurrentProject:function(currentProject){
			return http({
				method:'GET',
				url: 'ServerSideScripts/updateCurrentProject.php',
				params:{'currentProject':currentProject}
			}); 
		},
		deactivateAllProjects:function(){
			return http({method:'GET',url: 'ServerSideScripts/deactivateAllProjects.php'});
		},
		startTechnophilia:function(){
			return http({method:'GET',url: 'ServerSideScripts/startTechnophilia.php'});
		}
	};
	
};