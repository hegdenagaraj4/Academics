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
		}		
	};
	
};