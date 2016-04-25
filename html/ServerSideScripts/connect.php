<?php
//root is the username mysql is the password
$connect=mysql_connect('localhost','root','mysql');
if($connect===FALSE)
	die("connection  failed");
$database=mysql_select_db("technophilia");
if($database===FALSE)
	die('could not find database');
?>