<?php

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

$result = $conn->prepare("SELECT uname from User WHERE utype = 'm'");
$result->execute();
$result->bind_result($mname);
while($result->fetch())
{

 	
	echo json_encode(array("mname"=>$mname));

}
?>