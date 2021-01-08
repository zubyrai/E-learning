<?php

$uname = $_GET['uname'];
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

$result = $conn->prepare("SELECT uid,utype from User WHERE uname =  ? ");
$result->bind_param('s',$uname);
$result->execute();
$result->bind_result($uid,$utype);
while($result->fetch())
 if ($uid !== NULL && $utype !== NULL) 
 {

 	 echo json_encode(array("uid"=>$uid,"utype"=>$utype));
 }

?>