<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  header('Content-Type: application/json');
  $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  try{
  require("conexion.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

  $conexion = conexion(); // CREA LA CONEXION
  
  mysqli_query($conexion, "UPDATE mapa
  SET latitud=$params->latitud,
    longitud=$params->longitud
  WHERE id=$params->id");
    
  
  class Result {}

  // GENERA LOS DATOS DE RESPUESTA
  $response = new Result();
  
  $response->query = "UPDATE mapa SET latitud=$params->latitud, longitud=$params->longitud  WHERE id=$params->id";
  $response->resultado = 'OK';
  $response->mensaje = 'EL USUARIO SE ACTUALIZO EXITOSAMENTE';
  }catch (Exception  $e){
   
  $response->query = "UPDATE mapa SET latitud=$params->latitud, longitud=$params->longitud  WHERE id=$params->id";
  $response->resultado = 'error =>' .$e ;
    http_response_code(502);
 }
 echo json_encode($response); 
?>