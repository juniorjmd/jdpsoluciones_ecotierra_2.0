import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mapa, ordenMap } from '../models/mapa';
import { MapaRequest } from '../models/mapa-request';
import { global } from './globals';

@Injectable({
  providedIn: 'root'
})
export class MapasService {
 // URL = 'https://ecotierra.jdpsoluciones.com/API/action/';
 URL = global.url
  headers = new HttpHeaders().set('Content-Type' , 'application/x-www-form-urlencoded');
  optHeader =  {headers : this.headers } ;

  constructor(private http: HttpClient) { 
    console.log('servicio mapas inicializado');
    
  }
  obtenerMapas() {  
     return this.http.get<MapaRequest>( `${this.URL}mapas` , this.optHeader);
  }

  ingresarMapa(Mapa: Mapa){
    const action = { 
      latitud: Mapa.latitud , 
      longitud : Mapa.longitud , 
      desc : Mapa.desc
    } 

    let params = 'json=' + JSON.stringify(action); 
    
    return this.http.post<MapaRequest>(`${this.URL}mapas` , params , this.optHeader );
  }
  ordenarListaMapa(lista: ordenMap[]){
    let params = 'json=' + JSON.stringify(lista); 
    return this.http.post<MapaRequest>(`${this.URL}mapas/sorte` , params , this.optHeader );
  }
  borrarMapa(_ID_MAPA:number){    
    return this.http.delete<MapaRequest>(`${this.URL}mapas/${_ID_MAPA}` , this.optHeader);
  }

  

  
  seleccionarMapa(_ID_MAPA: number) { 
    return this.http.get<MapaRequest>(`${this.URL}mapas/${_ID_MAPA}`, this.optHeader);
  }




  editarMapa(Mapa: Mapa) {  
  let params = 'json=' + JSON.stringify(Mapa); 
  console.log(`${this.URL}mapas/${Mapa.id}`, params, this.optHeader);
  
    return this.http.put<MapaRequest>(`${this.URL}mapas/${Mapa.id}`, params, this.optHeader);
  }

  


}

