<?php
	require_once 'connect.php';
	$query = 'select avg(Rating) as averageRating from Votes';
	$result = mysql_query($query) or die(mysql_error());
	$averageRating = mysql_fetch_array($result)[0];
	
	$thresholdNumberOfVotes = 10;
	$sql = "SELECT ProjectNo, avg(rating) as AverageRating,count(rating) as Voters,
	((avg(rating) * count(rating) + $averageRating * $thresholdNumberOfVotes)/($thresholdNumberOfVotes+count(rating))) as Rating FROM
	 `Votes` group by projectno ";
	$result = mysql_query($sql) or die(mysql_error());
	
	$rows = array();
	while($r = mysql_fetch_assoc($result)) {
		$rows[] = $r;
	}
	echo json_encode($rows);
?>