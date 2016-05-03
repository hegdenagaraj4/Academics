<?php
	require_once 'connect.php';
// 	require_once 'connectdeploy.php';
	
	$query = 'select avg(rating) as averageRating from rating';
	$result = mysql_query($query);
	$averageRating = mysql_fetch_array($result)[0];
//  	echo "saf".$averageRating;
	
	
	$thresholdNumberOfVotes = 10;
	$sql = "SELECT P.project_id as ProjectNo,P.project_name as ProjectName, avg(R.rating) as AverageRating,count(R.rating) as Voters,
	((avg(R.rating) * count(R.rating) + $averageRating * $thresholdNumberOfVotes)/($thresholdNumberOfVotes+count(R.rating))) as Rating FROM
	  project as P left join rating as R on P.project_id=R.project_id group by P.project_id";
	$result1 = mysql_query($sql);
	
	$rows = array();
	while($r = mysql_fetch_assoc($result1)) {
		$rows[] = $r;
	}
	if($result != null && $result1 !=null )
		echo json_encode($rows);
	else
		echo header("HTTP/1.0 500 Internal Server Error");
		
?>