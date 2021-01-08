<?php

$name = $_POST['name'];
$picture = $_FILES['picture']['tmp_name'];
$desc = $_POST['desc'];
$details = $_POST['details'];
$marker = $_POST['marker'];
$teacher = $_POST['teacher'];
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
$result->bind_param('s',$marker);
$result->execute();
$result->bind_result($row);
while($result->fetch())
{
	$add = $row;
}

$result2 = $conn->prepare("SELECT uid from User WHERE uname =  ?");
$result2->bind_param('s',$teacher);
$result2->execute();
$result2->bind_result($rowt);
while($result2->fetch())
{
	$addt = $rowt;
}

 $null = NULL;
$result3 = $conn->prepare('INSERT INTO Courses(coursename,coursedesc,coursedetails,markerid,teacherid,picture) VALUES (?,?,?,?,?,LOAD_FILE(?))');
if($result3)

{
	$result3->bind_param('sssiis',$name,$desc,$details,$add,$addt,$picture);
$result3->execute();

 	echo json_encode(array("result"=>"added!"));
 }


?>