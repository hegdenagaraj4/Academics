<?php
	require_once 'connect.php';
	$query = 'select avg(rating) as averageRating from Rating';
	$result = mysql_query($query) or die(mysql_error());
	$averageRating = mysql_fetch_array($result)[0];
	
	$thresholdNumberOfVotes = 10;
	$sql = "SELECT P.project_id as ProjectNo,P.project_name as ProjectName, avg(R.rating) as AverageRating,count(R.rating) as Voters,
	((avg(R.rating) * count(R.rating) + $averageRating * $thresholdNumberOfVotes)/($thresholdNumberOfVotes+count(R.rating))) as Rating FROM
	 Rating as R inner join Project as P on P.project_id group by P.project_id";
	$result = mysql_query($sql) or die(mysql_error());
	
	$rows = array();
	while($r = mysql_fetch_assoc($result)) {
		$rows[] = $r;
	}
	echo json_encode($rows);
?>