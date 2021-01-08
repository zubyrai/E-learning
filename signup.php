<?php

$uname = $_GET['name'];
$password = $_GET['password'];
$path = "elearning.crdizwbievnc.eu-west-2.rds.amazonaws.com:3306";
$user = "Elearning";
$pass = "Samairash25*";
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
if($result->fetch())
{

	echo json_encode(array("result"=>"Username exists!"));
}
else
{
$result2 = $conn->prepare("INSERT INTO User(uname,password,utype) VALUES (?,?,'u')");
$result2->bind_param('ss',$uname,$password);
$result2->execute();

 	echo json_encode(array("result"=>"Sign up successful!"));
}


?>