<?php
	require_once 'connect.php';
// 	require_once 'connectdeploy.php';
	$query = 'select * from projec';
	$result = mysql_query($query);	
	$rows = array();
	while($r = mysql_fetch_assoc($result)) {
		$rows[] = $r;
	}
	echo json_encode($rows);	
	
?>