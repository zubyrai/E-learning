<?php

$cid = $_POST['cid'];
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


	$result2 = $conn->prepare("SELECT contentid from Content WHERE courseid =  ? ");
	 $result2->bind_param('i',$cid);
	 $result2->execute();
	  $result2->bind_result($courseid);
	 while($result2->fetch())
{
	array_push($stack, $courseid);
}
	echo json_encode(array("contentid"=>$stack));
?>