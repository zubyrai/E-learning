<?php

$uname = $_POST['uname'];
$path = "127.0.0.1:3306";
$user = "root";
$pass = "";
$db = "elearning";
$e = 0;
$stack = array();
// Create connection
$conn = new mysqli($path, $user, $pass,$db);

// Check connection
if ($conn->connect_error) {
    echo json_encode(array("result"=>"failed"));
} 


$result = $conn->prepare("SELECT coursename from Courses WHERE courseid IN (SELECT courseid FROM UserCourses WHERE uid = (SELECT uid from User WHERE uname= ?))");
	$result->bind_param('s',$uname);
	$result->execute();
	$result->bind_result($course);
	while($result->fetch())
	{
		array_push($stack, $course);
	}
	echo json_encode(array("courses"=>$stack));	


?>