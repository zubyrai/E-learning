<?php

$question = $_POST['question'];
$quizid = $_POST['qid'];
$path = "127.0.0.1:3306";
$user = "root";
$pass = "";
$db = "elearning";
$order = 1;

// Create connection
$conn = new mysqli($path, $user, $pass,$db);

// Check connection
if ($conn->connect_error) {
    echo json_encode(array("result"=>"failed"));
} 

$result = $conn->prepare("SELECT MAX(questionorder) from QuizQuestions WHERE quizid =  ?");
$result->bind_param('i',$quizid);
$result->execute();
$result->bind_result($row);
while($result->fetch())
{
	$int = (int)$row;
	$order = $int + 1;
}

$conn2 = new mysqli($path, $user, $pass,$db);

$result2 = $conn2->prepare("INSERT INTO QuizQuestions(question,quizid,questionorder) VALUES (?,?,?)");
$result2->bind_param('sis',$question,$quizid,$order);
$result2->execute();

 	echo json_encode(array("result"=>"Added!"));



?>