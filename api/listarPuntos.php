<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  header('Content-Type: application/json');
  require("conexion.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB
  $conexion = conexion(); // CREA LA CONEXION
  // REALIZA LA QUERY A LA DB
  $registros = mysqli_query($conexion, "SELECT * FROM mapa");
  // RECORRE EL RESULTADO Y LO GUARDA EN UN ARRAY
  while ($resultado = mysqli_fetch_array($registros))  
  {
    $datos[] = $resultado;
  }
   
  
echo json_encode($datos);
  ?>