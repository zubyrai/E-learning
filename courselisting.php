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

$result = $conn->prepare("SELECT uid from User WHERE uname =  ? ");
$result->bind_param('s',$uname);
$result->execute();
$result->bind_result($uid);
while($result->fetch())
{
 if ($uid !== NULL) 
 {
 	$e = $uid;

 }
}

	$result2 = $conn->prepare("SELECT courseid from UserCourses WHERE uid =  ? ");
	 $result2->bind_param('i',$e);
	 $result2->execute();
	  $result2->bind_result($courseid);
	 while($result2->fetch())
{
	array_push($stack, $courseid);
}
	echo json_encode(array("courses"=>$stack,"uid"=>$e));
?>