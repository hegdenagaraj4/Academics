<?php
	require_once 'connect.php';
	$query = "select * from Project where Status='1'";
	$result = mysql_query($query) or die(mysql_error());
	$rows = array();
	while($r = mysql_fetch_assoc($result)) {
		$rows[] = $r;
	}
 	$currentProjectNumber = $rows[0]['project_id'];
 	
 	//SELECT ProjectNo,rating,count(*) as PerRatingCount FROM `Votes` WHERE projectno='10' group by rating
 	$query = "select P.project_id as ProjectNo,P.project_name as ProjectName,R.rating as Rating
 	,count(*) as Count from 
 	Rating as R join Project as P on P.project_id=R.project_id where P.project_id='$currentProjectNumber' 
 	group by R.rating";
 	
 	$result = mysql_query($query) or die(mysql_error());
 	$rows = array();
 	while($r = mysql_fetch_assoc($result)) {
 		$rows[] = $r;
 	}
 	
	echo json_encode($rows);
?>
