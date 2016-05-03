<?php
	require_once 'connect.php';
// 	require_once 'connectdeploy.php';
	$query = "update project set Status='0' where Status='1'";
	$result = mysql_query($query);
	
	if($result == 1)
		echo "done";
	else 
		echo "failed".mysql_error();
?>