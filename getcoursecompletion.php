<?php

$uname = $_POST['uname'];
$path = "127.0.0.1:3306";
$user = "root";
$pass = "";
$db = "elearning";
$e = 0;
$stack = array();
$stack2 = array();
$stack3 = array();
// Create connection
$conn = new mysqli($path, $user, $pass,$db);

// Check connection
if ($conn->connect_error) {
    echo json_encode(array("result"=>"failed"));
} 

$result = $conn->prepare("SELECT courseid,coursecompleted from UserCourses WHERE uid =  (SELECT uid FROM User WHERE uname = ?) ");
$result->bind_param('s',$uname);
$result->execute();
$result->bind_result($row,$row2);
while($result->fetch())
{
	array_push($stack, $row);
	array_push($stack2, $row2);
}

$cid = implode(",",$stack);


$result2 = $conn->prepare("SELECT coursename from Courses WHERE courseid IN (".$cid.")");
$result2->execute();
$result2->bind_result($row3);
while($result2->fetch())
{
	array_push($stack3, $row3);
}
 	echo json_encode(array("cname"=>$stack3,"completed"=>$stack2));



?>