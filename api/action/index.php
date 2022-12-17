 <?php
 header('Access-Control-Allow-Origin: *'); 
 include_once '../php/db_conection.php';
 include_once 'config.php';
header("Content-type:application/json; charset=utf-8");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding,Authorization,Autorizacion");
ini_set('memory_limit', '-1');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {    
  header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, autorizacion");
 header("HTTP/1.1 200 OK");
die();
}     
$headers = getallheaders(); 
foreach ($headers as $header => $value) {  
   if ( strtoupper(trim($header))==='AUTORIZACION'){ 
       define('LLAVE_SESSION', TRIM($value)); 
   }
}  
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    http_response_code(200);
  
   $json = file_get_contents('php://input');
   $_POST = json_decode($json, true); 
foreach ($_POST as $clave => $valor){
    $$clave = $valor;
}  
}

 $_DATA = ARRAY();
 $action = strtoupper ($action);
 //$_DATA['ENVIADOS'] = $_variables;
 switch($action){
	
         case 'GET_MAPAS':
	 
	 $_DATA['RESPONS']='OK';
	 try{ 
		 $mysqli = cargarBD(DATABASE_NAME,HOST,PASS,USERDB);
		 $aux_where = '';
		 if (isset($_ID_MAPA) and trim($_ID_MAPA)!='' and $_ID_MAPA>0){	
                     $aux_where = "where  id = $_ID_MAPA";
                 }
		 $query = "SELECT * FROM  mapa $aux_where ;";
		 $result = $mysqli->query($query);
			$_DATA["query"] = $query;
			$_DATA["filas_var"]=$mysqli->affected_rows;
			$i=0;
			if ($_DATA["filas_var"]>0){
				while ($row = $result->fetch_assoc()) {
				$data[$i] =$row;
				$i++;
				}
			}
		 } catch (Exception $e){
				$_DATA['RESPONS']='ERROR : '.$e->getMessage() ;
			}

		$_DATA["datos"]=$data;
	 break; 
         case 'SET_MAPA':
	 
	 $_DATA['RESPONS']='OK';
	 try{ $_DATA["datos"]=$_POST;
		 $mysqli = cargarBD(DATABASE_NAME,HOST,PASS,USERDB);
		 $aux_where = '';
        $query = "INSERT INTO  `mapa` ( `longitud`, `latitud`, `desc`)".
                         " VALUES ".
                         " ( $longitud, $latitud , '$desc' );"; 
		 $_DATA["query"] = $query;  
		 $result = $mysqli->query($query);
		
		 } catch (Exception $e){
				$_DATA['RESPONS']='ERROR : '.$e->getMessage() ;
			} 
	 break; 
         
           case 'DELETE_MAPA':
	 
	 $_DATA['RESPONS']='OK';
	 try{ $_DATA["datos"]=$_POST;
		 $mysqli = cargarBD(DATABASE_NAME,HOST,PASS,USERDB);
		 $aux_where = '';
        $query = "DELETE FROM `mapa` WHERE id =   $_ID_MAPA ;";
                 
                 
                 
		 $_DATA["query"] = $query;  
		 $result = $mysqli->query($query);
		
		 } catch (Exception $e){
				$_DATA['RESPONS']='ERROR : '.$e->getMessage() ;
			} 
	 break; 
         case 'UPDATE_MAPA':
	 
	 $_DATA['RESPONS']='OK';
	 try{ $_DATA["datos"]=$_POST;
		 $mysqli = cargarBD(DATABASE_NAME,HOST,PASS,USERDB);
		 $aux_where = '';
                 $_ID_MAPA = $Mapa['id'] ;
                 $_latitud = $Mapa['latitud'] ;
                 $_longitud = $Mapa['longitud'] ;
                 $_desc = trim($Mapa['desc']) ;
                 
                 
        $query = "update `mapa` set"
                . " latitud = $_latitud"
                . ", longitud = $_longitud"
                . ", desc = '$_desc'"
                . "  WHERE id =   $_ID_MAPA ;";
                 
                 
                 
		 $_DATA["query"] = $query;  
		 $result = $mysqli->query($query);
		
		 } catch (Exception $e){
				$_DATA['RESPONS']='ERROR : '.$e->getMessage() ;
			} 
	 break;  
                     
		 }
 echo json_encode($_DATA);
 
 ?>