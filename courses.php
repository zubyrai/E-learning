<?php

$uname = $_GET['uname'];
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


	$result = $conn->prepare("SELECT courseid from Courses");
	 $result->execute();
	  $result->bind_result($courseid);
	 while($result->fetch())
{
	array_push($stack, $courseid);
}
	echo json_encode(array("courses"=>$stack));
?>