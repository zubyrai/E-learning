<?php

$student = $_POST['student'];
$course = $_POST['course'];
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
$result->bind_param('s',$student);
$result->execute();
$result->bind_result($row);
while($result->fetch())
{
	$uid = $row;
	
}

$conn2 = new mysqli($path, $user, $pass,$db);

$result2 = $conn2->prepare("SELECT courseid from UserCourses WHERE uid = ? AND courseid = (SELECT courseid FROM Courses WHERE coursename = ?) ");
$result2->bind_param('is',$uid,$course);
$result2->execute();
$result2->bind_result($row2);
while($result2->fetch())
{
	$cid = $row2;
	
}


$conn3 = new mysqli($path, $user, $pass,$db);

$result3 = $conn3->prepare("SELECT contentname,quizid from Content WHERE quizid IS NOT NULL AND courseid = ?");
$result3->bind_param('i',$cid);
$result3->execute();
$result3->bind_result($row3,$row4);
while($result3->fetch())
{
	array_push($stack,$row3);
	$quizdetails = $row4;
}



	echo json_encode(array("quiz"=>$stack,"quizid"=>$quizdetails));


?>