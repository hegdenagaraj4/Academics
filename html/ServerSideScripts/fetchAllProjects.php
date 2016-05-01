<?php
	require_once 'connect.php';
	$query = 'select * from Project';
	$result = mysql_query($query) or die(mysql_error());
	$rows = array();
	while($r = mysql_fetch_assoc($result)) {
		$rows[] = $r;
	}
	echo json_encode($rows);	
	
?>