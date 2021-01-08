<?php

$name = $_POST['name'];
$picture = $_FILES['picture']['tmp_name'];
$desc = $_POST['desc'];
$course = $_POST['course'];
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

$result = $conn->prepare("SELECT courseid from Courses WHERE coursename =  ?");
$result->bind_param('s',$course);
$result->execute();
$result->bind_result($row);
while($result->fetch())
{
	$add = $row;
}

$result2 = $conn->prepare("SELECT MAX(contentorder) from Content WHERE courseid =  ?");
$result2->bind_param('s',$add);
$result2->execute();
$result2->bind_result($row2);
while($result2->fetch())
{
	$int = (int)$row2;
	$order = $int + 1;
}


$conn2 = new mysqli($path, $user, $pass,$db);

$result3 = $conn2->prepare("SELECT MAX(quizid) from Content");
$result3->execute();
$result3->bind_result($row3);
while($result3->fetch())
{
	$int = (int)$row3;
	$quizid = $int + 1;
}

$conn3 = new mysqli($path, $user, $pass,$db);

$result4 = $conn3->prepare("INSERT INTO Content(contentname,contentdesc,courseid,contentorder,picture,quizid) VALUES(?,?,?,?,LOAD_FILE(?),?)");

if($result4)

{
	$result4->bind_param('ssiisi',$name,$desc,$add,$order,$picture,$quizid);
	$result4->execute();

 	echo json_encode(array("quizid"=>$quizid));
 }

?>