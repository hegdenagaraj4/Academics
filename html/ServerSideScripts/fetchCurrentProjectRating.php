<?php
	require_once 'connect.php';
	$query = 'select * from Projects';
	$result = mysql_query($query) or die(mysql_error());
	$rows = array();
	while($r = mysql_fetch_assoc($result)) {
		$rows[] = $r;
	}
 	$currentProjectNumber = $rows[0]['ProjectNo'];
 	
 	$query = "select avg(rating) as AverageRating from Votes where ProjectNo=$currentProjectNumber";
 	$result = mysql_query($query) or die(mysql_error());
 	$rows = array();
 	while($r = mysql_fetch_assoc($result)) {
 		$rows[] = $r;
 	}
 	
	echo json_encode($rows);
?>