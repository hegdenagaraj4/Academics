<?php
	require_once 'connect.php';
	$query = "select * from Project where Status='1'";
	$result = mysql_query($query) or die(mysql_error());
	$rows = array();
	while($r = mysql_fetch_assoc($result)) {
		$rows[] = $r;
	}
 	$currentProjectNumber = $rows[0]['project_id'];

 	$query = "select P.project_id,P.project_name,AVG(R.rating) as AverageRating from Rating as R 
 	inner join 
 	Project as P on P.project_id where P.project_id='$currentProjectNumber'";
 	
 	$result = mysql_query($query) or die(mysql_error());
 	$rows = array();
 	while($r = mysql_fetch_assoc($result)) {
 		$rows[] = $r;
 	}
 	
	echo json_encode($rows);
?>