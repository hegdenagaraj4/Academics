<?php
	require_once 'connect.php';
// 	require_once 'connectdeploy.php';
	
	$query = 'select avg(rating) as averageRating from rating';
	$result = mysql_query($query) or die(header("HTTP/1.1 500 ".mysql_error()));
	
	$averageRating = mysql_fetch_array($result)[0];
 	if($averageRating == null)
 		$averageRating = 0;
	
	
	$thresholdNumberOfVotes = 10;
	$query = "SELECT P.project_id as ProjectNo,P.project_name as ProjectName, avg(R.rating) as AverageRating,count(R.user_id) as Voters,
	((avg(R.rating) * count(R.user_id) + $averageRating * $thresholdNumberOfVotes)/($thresholdNumberOfVotes+count(R.user_id))) as Rating FROM
	  project as P left join rating as R on P.project_id=R.project_id group by P.project_id";
	$result = mysql_query($query) or die(header("HTTP/1.1 500 ".mysql_error()));
	
	$rows = array();
	while($r = mysql_fetch_assoc($result)) {
		$rows[] = $r;
	}
	echo json_encode($rows);
?>