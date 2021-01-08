<?php

$aid = $_POST['answerid'];
$feedback = $_POST['feedback'];
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


$result = $conn->prepare("UPDATE QuizAnswers SET feedback = ? WHERE answerid = ?");
$result->bind_param('si',$feedback,$aid);
$result->execute();

 	echo json_encode(array("result"=>"Added!"));



?>