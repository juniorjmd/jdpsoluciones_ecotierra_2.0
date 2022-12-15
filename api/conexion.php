<?php
  header('Access-Control-Allow-Origin: http://localhost:4200'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

// DATOS DE CONEXION A LA BASE DE DATOS
function conexion() {
  $conexion = mysqli_connect("jdpsoluciones.com", "jdpsoluc_ecotierra", "Promjosdom*", "jdpsoluc_ecotierra");
  
  return $conexion;
}

?>