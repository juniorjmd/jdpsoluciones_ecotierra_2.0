<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept"); 
  header('Content-Type: application/json');
  
  require("conexion.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

  $conexion = conexion(); // CREA LA CONEXION
  
  // REALIZA LA QUERY A LA DB
  $idUsuario = $_POST['idUsuario'];
  mysqli_query($conexion, "DELETE FROM mapa WHERE id=$idUsuario");
    
  
  class Result {}

  // GENERA LOS DATOS DE RESPUESTA
  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = 'EL USUARIO SE ELIMINO EXITOSAMENTE';

  echo json_encode($response); // MUESTRA EL JSON GENERADO
?>