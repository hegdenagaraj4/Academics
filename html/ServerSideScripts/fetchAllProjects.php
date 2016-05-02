<?php
	require_once 'connect.php';
// 	require_once 'connectdeploy.php';
	$query = 'select * from project';
	$result = mysql_query($query) or die(mysql_error());
	$rows = array();
	while($r = mysql_fetch_assoc($result)) {
		$rows[] = $r;
	}
	echo json_encode($rows);	
	
?>