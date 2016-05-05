<?php
// 	require_once 'connect.php';
	require_once 'connectdeploy.php';
	
	if (isset($_GET['currentProject']))
	{
		 $currentProjectNumber =  $_GET['currentProject'];
		 
		 $query = "UPDATE project SET Status=0 where Status=1";
		 $result = mysql_query($query) or die(header("HTTP/1.1 500 ".mysql_error()));
		 
		 $query = "UPDATE project SET Status=1 where project_id='$currentProjectNumber'";
		 $result = mysql_query($query) or die(header("HTTP/1.1 500 ".mysql_error()));

		 $query = "select project_id,project_name from project where Status='1'";
		 $result = mysql_query($query) or die(header("HTTP/1.1 500 ".mysql_error()));
		 
		 $rows = array();
		 while($r = mysql_fetch_assoc($result)) {
		 	$rows[] = $r;
		 }
		 echo json_encode($rows);
	}
?>