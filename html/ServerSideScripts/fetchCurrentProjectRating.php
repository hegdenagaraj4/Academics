<?php
	require_once 'connect.php';
// 	require_once 'connectdeploy.php';
	$query = "select * from project where Status='1'";
	$result = mysql_query($query) or die(mysql_error());
	$rows = array();
	while($r = mysql_fetch_assoc($result)) {
		$rows[] = $r;
	}
 	$currentProjectNumber = $rows[0]['project_id'];

 	$query = "select P.project_id as ProjectNo,P.project_name as ProjectName,AVG(R.rating) as AverageRating from rating as R 
 	join project as P on P.project_id=R.project_id where P.project_id='$currentProjectNumber'";
 	
 	$result = mysql_query($query) or die(mysql_error());
 	$rows = array();
 	while($r = mysql_fetch_assoc($result)) {
 		$rows[] = $r;
 	}
 	
	echo json_encode($rows);
?>