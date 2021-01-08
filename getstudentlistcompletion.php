<?php

$course = $_POST['course'];
$path = "127.0.0.1:3306";
$user = "root";
$pass = "";
$db = "elearning";
$e = 0;
$stack = array();
$stack2 = array();
// Create connection
$conn = new mysqli($path, $user, $pass,$db);

// Check connection
if ($conn->connect_error) {
    echo json_encode(array("result"=>"failed"));
} 

$result = $conn->prepare("SELECT courseid from Courses WHERE coursename =  ? ");
$result->bind_param('s',$course);
$result->execute();
$result->bind_result($row);
while($result->fetch())
{
	$cid = $row;
	
}

$conn2 = new mysqli($path, $user, $pass,$db);

$result2 = $conn2->prepare("SELECT uid from UserCourses WHERE courseid =  ? AND coursecompleted = 'n' ");
$result2->bind_param('i',$cid);
$result2->execute();
$result2->bind_result($row2);
while($result2->fetch())
{
	array_push($stack,$row2);
	
}

$uid = implode(",",$stack);


$conn3 = new mysqli($path, $user, $pass,$db);

$result3 = $conn3->prepare("SELECT uname from User WHERE uid in  (".$uid.") ");
$result3->execute();
$result3->bind_result($row3);
while($result3->fetch())
{
	array_push($stack2,$row3);
}



	echo json_encode(array("uname"=>$stack2));


?>