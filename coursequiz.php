<?php

$qid = $_POST['qid'];
$path = "127.0.0.1:3306";
$user = "root";
$pass = "";
$db = "elearning";
$stack = array();
// Create connection
$conn = new mysqli($path, $user, $pass,$db);

// Check connection
if ($conn->connect_error) {
    echo json_encode(array("result"=>"failed"));
} 


	$result2 = $conn->prepare("SELECT questionid from QuizQuestions WHERE quizid =  ? ORDER BY questionorder DESC");
	 $result2->bind_param('i',$qid);
	 $result2->execute();
	  $result2->bind_result($questionid);
	 while($result2->fetch())
{
	array_push($stack, $questionid);
}
	echo json_encode(array("questionid"=>$stack));
?>