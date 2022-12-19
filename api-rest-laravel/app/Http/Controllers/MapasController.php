<?php

namespace App\Http\Controllers;
use App\Mapa;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class MapasController extends Controller
{
     
    public function index(  ) {
      //  $mapas = Mapa::all()->sortBy('sorte');
        
         $mapas = Mapa::orderBy('sorte')->get();
         
        
        $_DATA=array(
            "code"=> 200,
            "filas_var" => sizeof($mapas),
            "datos"=> $mapas , 
            "RESPONS" => 'OK'
        );
        
       return response()->json($_DATA , $_DATA['code']);
        
    }
    public function show( $id ) { 
        $mapas = Mapa::find( $id);
         
        if(is_object($mapas)){
            
            $_DATA=array(
            "code"=> 200,
            "filas_var" => 1,
            "datos"=> [$mapas] , 
            "RESPONS" => 'OK'
        );}else{$_DATA=array(
            "code"=> 404, 
            "message"=> 'la categoria no existe' , 
            "RESPONS" => 'error'
        );}
        
        
       return response()->json($_DATA , $_DATA['code']);
        
    }
    public function destroy($id){
        if($id>0){
              $mapa = new Mapa();
               Mapa::Where('id', $id)->delete();
                $data = array(
                  "status" => "success",
                  "code" => "200","RESPONS" => 'ok',
                  "message" => "mapa eliminado correctamente" ,
                   "datos" =>  Mapa::orderBy('sorte')->get()
              );
        }else{
               $data = array(
                   "json" => $json, 
                  "status" => "error",
               "RESPONS" => 'error',
                  "code" => "404",
                  "message" => "Los datos enviados no son correctos, eleminacion no realizado" 
              );
        }
             return response()->json($data , $data['code']); 
        
    }
    public function sorteAllMapas(Request $request){
        
        $json =  $request->input('json' , null);
           
          $param_arr = json_decode($json,true);
          //var_dump($param_arr);
         // die();
          if(  !empty($param_arr)){ 
              foreach ($param_arr as   $value) {
                    
                  Mapa::Where('id', $value['id'])->update(array("sorte"=>$value['sorte'] ));
              }
          $maps = new Mapa();
           $data = array(
                  "status" => "success",
                   "RESPONS" => 'OK',
                  "code" => "200",
                  "message" => "mapas ordenados correctamente" 
              );
          
          }else{
               $data = array(
                   "json" => $json, 
                  "status" => "error",
               "RESPONS" => 'error',
                  "code" => "404",
                  "message" => "Los datos enviados no son correctos, ordenamiento no realizado" 
              );
          }
          
            return response()->json($data , $data['code']); 
        
    }
    public function getAllMapas() {
        $mapas = Mapa::orderBy('sorte')->get();
        $datos = [];
        
        foreach($mapas as $mapa){
            
           array_push($datos,Array(
               "id" => $mapa->id,
               "latitud" => $mapa->latitud,
               "longitud" => $mapa->longitud,
               "desc" => $mapa->desc
           ));
           
        }
        
       return  $datos ;
        
    }
    public function store(Request $request ) {   
          $json =  $request->input('json' , null);
          $param = json_decode($json);
          $param_arr = json_decode($json,true);
          $param_arr = array_map('trim', $param_arr);
          if(!empty($param) && !empty($param_arr)){
          $validate = \Validator::make($param_arr, [
              'longitud'=>'required',
              'latitud'=>'required',
              'desc'=>'required|string',
          ]);
          
          if($validate->fails()){
              $data = array(
                  "status" => "error",
                  "RESPONS" => 'error',
                  "code" => "404",
                  "message" => "error de validacion, mapa no creado",
                  "errors" => $validate->errors(),
              ); 
          }else{ $mapa = new Mapa();
               
               $mapa->longitud =  $param->longitud;
               $mapa->latitud =  $param->latitud ; 
               $mapa->desc =  $param->desc ; 
               $mapa->save();
               $data = array(
                  "status" => "success",
                   "RESPONS" => 'OK',
                  "code" => "200",
                  "message" => "mapa creado correctamente" ,
                   "datos" =>  Mapa::orderBy('sorte')->get() 
              );
               
          }
          
          }else{ $data = array(
                  "status" => "error",
               "RESPONS" => 'error',
                  "code" => "404",
                  "message" => "Los datos enviados no son correctos, mapa no creado" 
              );}
          return response()->json($data , $data['code']);
    }
    
    
    
      public function update($id, Request $request ) { 
          $_DATA["datos"] = [];
          
          
          $json =  $request->input('json' , null);
          $param = json_decode($json);
          $param_arr = json_decode($json,true);
          $param_arr = array_map('trim', $param_arr);
          if(!empty($param) && !empty($param_arr)){
          unset ($param_arr['id']);
          unset($param_arr['create_at']);
          //unset($param_arr['longitud']);
          //unset($param_arr['latitud']);
          $validate = \Validator::make($param_arr, [ 
              'desc'=>'required|string',
          ]);
          
          if($validate->fails()){
              $data = array(
                  "status" => "error",
                  "code" => "404",
                  "message" => "error de validacion, mapa no editado",
                  "errors" => $validate->errors(),
              );
              return response()->json($data,404);
          }else{
              $mapa = new Mapa();
               Mapa::Where('id', $id)->update($param_arr);
                $data = array(
                  "status" => "success",  "RESPONS" => 'OK',
                  "code" => "200",
                  "message" => "mapa editado correctamente" ,
                   "datos" =>   Mapa::orderBy('sorte')->get()
              );
               
          }
          
          }else{ $data = array(
                  "status" => "error",
                  "code" => "404",
                  "message" => "Los datos enviados no son correctos, mapa no editado" 
              );}
          return response()->json($data , $data['code']);
    }
    
    
    
}
