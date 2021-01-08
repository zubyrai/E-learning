<?php

$uname = $_POST['uid'];
$answer = $_POST['answer'];
$questionid = $_POST['qid'];
$quizid = $_POST['quizid'];
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

$result = $conn->prepare("SELECT uid from User WHERE uname =  ?");
$result->bind_param('s',$uname);
$result->execute();
$result->bind_result($row);
while($result->fetch())
{
	$add = $row;
}

$result2 = $conn->prepare("INSERT INTO QuizAnswers(answer,questionid,uid,quizid) VALUES (?,?,?,?)");
$result2->bind_param('siii',$answer,$questionid,$add,$quizid);
$result2->execute();

 	echo json_encode(array("result"=>"Added!"));



?>