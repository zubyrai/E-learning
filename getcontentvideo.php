<?php

$cid = $_POST['cid'];
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

$result = $conn->prepare("SELECT contentname,video from Content WHERE contentid =  ? ORDER BY contentorder DESC");
$result->bind_param('i',$cid);
$result->execute();
$result->bind_result($cname,$cvideo);
while($result->fetch())
{
 if ($cname !== NULL) 
 {
 	$video = '<video src="data:video/mp4;base64,'.base64_encode( $cvideo ).'" height="100%" width="100%" controls></video>';
	echo json_encode(array("name"=>$cname,"video"=>$video));
}
}
?>