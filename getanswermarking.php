<?php

$aid = $_POST['aid'];
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

$result = $conn->prepare("SELECT questionid from QuizAnswers WHERE answerid =  ? ");
$result->bind_param('i',$aid);
$result->execute();
$result->bind_result($row);
while($result->fetch())
{
	$questionid = $row;
}

$result2 = $conn->prepare("SELECT question from QuizQuestions WHERE questionid =  ? ");
$result2->bind_param('i',$questionid);
$result2->execute();
$result2->bind_result($row2);
while($result2->fetch())
{
	$question = $row2;
}

$result3 = $conn->prepare("SELECT answer from QuizAnswers WHERE answerid =  ? ");
$result3->bind_param('i',$aid);
$result3->execute();
$result3->bind_result($row3);
while($result3->fetch())
{
	$answer = $row3;
}


	echo json_encode(array("question"=>$question,"answer"=>$answer));

?>