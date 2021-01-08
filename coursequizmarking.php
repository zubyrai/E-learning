<?php

$qid = $_POST['qid'];
$student = $_POST['student'];
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


	$result2 = $conn->prepare("SELECT answerid from QuizAnswers WHERE quizid = ? AND uid = (SELECT uid FROM User where uname = ?)");
	 $result2->bind_param('is',$qid,$student);
	 $result2->execute();
	  $result2->bind_result($answerid);
	 while($result2->fetch())
{
	array_push($stack, $answerid);
}
	echo json_encode(array("answerid"=>$stack));
?>