<?php

$qid = $_POST['qid'];
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

$result = $conn->prepare("SELECT question from QuizQuestions WHERE questionid =  ? ");
$result->bind_param('i',$qid);
$result->execute();
$result->bind_result($questionid);
while($result->fetch())
{

	echo json_encode(array("question"=>$questionid));
}
?>