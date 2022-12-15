<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  require("conexion.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB
  $conexion = conexion(); // CREA LA CONEXION
  // REALIZA LA QUERY A LA DB
  $resultado = [];
   $datos = [];
  $registros = mysqli_query($conexion, "SELECT * FROM mapa");
  // RECORRE EL RESULTADO Y LO GUARDA EN UN ARRAY
  while ($resultado = mysqli_fetch_array($registros))  
  {
    $datos[] = $resultado;
  }
   
 
  header('Content-Type: application/json'); 
  
echo json_encode($datos);
  ?>