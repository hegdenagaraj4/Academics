<?php
// 	require_once 'connect.php';
	require_once 'connectdeploy.php';
	
	/* $query = "SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED" ;
	$result = mysql_query($query) or die(mysql_error()); */
	
//	echo $result;
	
	$query = "select * from project where Status='1'";
	$result = mysql_query($query) or die(header("HTTP/1.1 500 ".mysql_error()));
	
	//echo $result.'eqwe';
	
	/* $query = "commit";
	$result1 = mysql_query($query) or die(mysql_error()); */
	
	//echo $result1.'faasafs';
	
	$rows = array();
	while($r = mysql_fetch_assoc($result)) {
		$rows[] = $r;
	}
 	$currentProjectNumber = $rows[0]['project_id'];
/*  	$query = "SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED" ;
 	$result = mysql_query($query) or die(mysql_error()); */
 	
 	//echo $result;
 	
 	$query = "select P.project_id as ProjectNo,P.project_name as ProjectName,R.rating as Rating
 	,count(*) as Count from 
 	rating as R join project as P on P.project_id=R.project_id where P.project_id='$currentProjectNumber' 
 	group by R.rating";
 	
 	$result = mysql_query($query) or die(header("HTTP/1.1 500 ".mysql_error()));
 	
 	//echo $result.'eqwe';
 	
 	
 	/* $query = "commit";
 	$result1 = mysql_query($query) or die(mysql_error());
 */ 	
 	//echo $result1.'faasafs';
 	
 
 	$rows = array();
 	while($r = mysql_fetch_assoc($result)) {
 		$rows[] = $r;
 	}
	echo json_encode($rows);
?>
