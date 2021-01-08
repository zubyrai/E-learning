<?php

$uname = $_GET['name'];
$password = $_GET['password'];
$host = "elearning.crdizwbievnc.eu-west-2.rds.amazonaws.com";
$port = "3306";
$user = "Elearning";
$pass = "Samairash25*";
$db = "elearning";


// Create connection
//$conn = new mysqli($host, $user, $pass, $db);

$conn = mysqli_connect($host, $user, $pass, $db, $port);
// Check connection
if ($conn->connect_error) {
	echo json_encode(array("result"=>"failed"));
	//echo($conn->connect_error);
} 

$result = $conn->prepare("SELECT uid from User WHERE uname =  ? AND password = ?");
$result->bind_param('ss',$uname,$password);
$result->execute();
$result->bind_result($row);
while($result->fetch())
 if ($row !== NULL) 
 {
 	echo json_encode(array("result"=>$uname));
 }
 else
 {
	 console.log($conn->error);
	$error = $conn->errno . ' ' . $conn->error;
    echo $error;
 	//echo json_encode(array("result"=>"user_has_failed_login_verification"));
 }

?>