<?php 
function cargarBD ($dbWork = NULL,$hostdb = NULL , $passdb = NULL , $userdb = NULL){
	session_start();
   $database= is_null($dbWork) ? $_SESSION["database"] : $dbWork;
  //echo $database;
   $host = is_null($hostdb) ? $_SESSION["host"] : $hostdb;
   $pass = is_null($passdb) ? $_SESSION["clavedb"] : $passdb;
   $user = is_null($userdb) ? $_SESSION["usuariodb"] : $userdb;
   $mysqli = new mysqli($host,$user,$pass,$database); 
	return $mysqli;

} 



?>
 