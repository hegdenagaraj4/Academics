<?php
	require_once 'connect.php';
// 	require_once 'connectdeploy.php';

	$query = "truncate table rating";
	$result = mysql_query($query);
	
	$query = "update project set Status='0' where Status='1'";
	$result1 = mysql_query($query);
	
	if($result == 1 && result1 == 1)
		echo "done";
	else 
		echo "failed".mysql_error();
?>