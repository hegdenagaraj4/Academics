app.factory('technophiliaService',['$http',technophiliaService]);
function technophiliaService(http){
	
	return {
		fetchData : function(){
			return http({method:'GET',url: 'ServerSideScripts/fetchdata.php'}); 
		}
		
	};
	
};