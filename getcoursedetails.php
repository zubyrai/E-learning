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

$result = $conn->prepare("SELECT coursename,coursedesc,picture,coursedetails from Courses WHERE courseid =  ? ");
$result->bind_param('i',$cid);
$result->execute();
$result->bind_result($cname,$cdesc,$cpicture,$cdetails);
while($result->fetch())
{
 if ($cname !== NULL) 
 {
 	$picture = '<img src="data:image/jpeg;base64,'.base64_encode( $cpicture ).'"/>';
	echo json_encode(array("name"=>$cname,"desc"=>$cdesc,"picture"=>$picture,"details"=>$cdetails));
}
}
?>