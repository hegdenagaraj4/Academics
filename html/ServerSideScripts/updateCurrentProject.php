<?php
	require_once 'connect.php';
	
	if (isset($_GET['currentProject']))
	{
		 $currentProjectNumber = null;
		 $currentProjectNumber =  $_GET['currentProject'];
		 
		 $query = "UPDATE Project SET Status=0 where Status=1";
		 $result = mysql_query($query) or die(mysql_error());
		 
		 $query = "UPDATE Project SET Status=1 where project_id='$currentProjectNumber'";
		 $result = mysql_query($query) or header("HTTP/1.0 500 Internal Server Error");
		 	
	}
?>