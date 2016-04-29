<?php
	require_once 'connect.php';
	$query = 'select * from Projects';
	$result = mysql_query($query) or die(mysql_error());
	$rows = array();
	while($r = mysql_fetch_assoc($result)) {
		$rows[] = $r;
	}
 	$currentProjectNumber = $rows[0]['ProjectNo'];
 	
 	//SELECT ProjectNo,rating,count(*) as PerRatingCount FROM `Votes` WHERE projectno='10' group by rating
 	$query = "select ProjectNo,Rating,count(*) as Count from Votes where ProjectNo='$currentProjectNumber' group by rating";
 	$result = mysql_query($query) or die(mysql_error());
 	$rows = array();
 	while($r = mysql_fetch_assoc($result)) {
 		$rows[] = $r;
 	}
 	
	echo json_encode($rows);
?>
