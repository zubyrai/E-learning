<?php

$name = $_POST['name'];
$picture = $_FILES['picture']['tmp_name'];
$desc = $_POST['desc'];
$video = $_FILES['video']['tmp_name'];
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
while($result->fetch())
{
	$int = (int)$row2;
	$order = $int + 1
}

$conn2 = new mysqli($path, $user, $pass,$db);

$result3 = $conn2->prepare("INSERT INTO Content(contentname,contentdesc,courseid,contentorder,picture,video) VALUES(?,?,?,?,LOAD_FILE(?),LOAD_FILE(?))");
if($result3)

{
	$result3->bind_param('ssiiss',$name,$desc,$add,$order,$picture,$video);
	$result3->execute();

 	echo json_encode(array("result"=>"added!"));
 }

?>