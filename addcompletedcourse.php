<?php

$course = $_POST['course'];
$student = $_POST['student'];
$path = "127.0.0.1:3306";
$user = "root";
$pass = "";
$db = "elearning";

// Create connection
$conn = new mysqli($path, $user, $pass,$db);

// Check connection
if ($conn->connect_error) {
    echo json_encode(array("result"=>"failed"));
} 


$result = $conn->prepare("UPDATE UserCourses SET coursecompleted = 'y' WHERE courseid = (SELECT courseid FROM Courses WHERE coursename= ?) AND uid = (SELECT uid FROM User WHERE uname = ?)");
$result->bind_param('ss',$course,$student);
$result->execute();

 	echo json_encode(array("result"=>"Added!"));



?>