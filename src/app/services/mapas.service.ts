import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mapa } from '../models/mapa';
import { MapaRequest } from '../models/mapa-request';

@Injectable({
  providedIn: 'root'
})
export class MapasService {
  URL = 'https://ecotierra.jdpsoluciones.com/API/action/';
  constructor(private http: HttpClient) { 
    console.log('servicio mapas inicializado');
    
  }

 

   obtenerMapas() { 
    const action = {
      action : 'GET_MAPAS'
    } 
    console.log(this.URL ,action );
    
    return this.http.post<MapaRequest>(this.URL , action);
  }

  ingresarMapa(Mapa: Mapa){
    const action = {
      action : 'SET_MAPA',
      latitud: Mapa.latitud , 
      longitud : Mapa.longitud , 
      desc : Mapa.desc
    } 
    console.log(this.URL ,action );
    
    return this.http.post<MapaRequest>(this.URL , action);
  }

  borrarMapa(_ID_MAPA:number){
    const action = {
      action : 'DELETE_MAPA',
      _ID_MAPA 
    } 
    console.log(this.URL ,action );
    
    return this.http.post<MapaRequest>(this.URL , action);
  }

  altaMapa(Mapa: Mapa) {
    const uri = `${this.URL}insertarPunto.php`;
    console.log(uri);
    
    return this.http.post(uri, JSON.stringify(Mapa));
  }

  bajaMapa(idMapa: number) {
    const uri = `${this.URL}eliminarPunto.php`;
    console.log(uri);
    return this.http.get(`${uri}?idMapa=${idMapa}`);
  }

  
  seleccionarMapa(_ID_MAPA: number) {
    const action = {
      action : 'GET_MAPAS',
      _ID_MAPA 
    } 
    return this.http.post<MapaRequest>(this.URL, action);
  }




  editarMapa(Mapa: Mapa) { 
  const action = {
    action : 'UPDATE_MAPA',
    Mapa 
  } 
    return this.http.post<MapaRequest>(this.URL,action);
  }

  _editarMapa(Mapa: Mapa) {
    const uri = `${this.URL}editarPunto.php`;
    console.log(uri);
    console.log("jelou",Mapa);
    return this.http.post(uri, JSON.stringify(Mapa));
  }


}

