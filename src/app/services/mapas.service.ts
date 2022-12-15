import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mapa } from '../models/mapa';

@Injectable({
  providedIn: 'root'
})
export class MapasService {
  URL = 'https://ecotierra.jdpsoluciones.com/API/';
  constructor(private http: HttpClient) { 
    console.log('servicio mapas inicializado');
    
  }

  obtenerMapas() {
    const uri = `${this.URL}listarPuntos.php`;
    console.log(uri);
    
    return this.http.get<Mapa[]>(uri);
  }

  altaMapa(Mapa: Mapa) {
    const uri = `${this.URL}insertarPunto.php`;
    console.log(uri);
    
    return this.http.post(uri, JSON.stringify(Mapa));
  }

  bajaMapa(idMapa: number) {
    const uri = `${this.URL}eliminarPunto.php`;
    console.log(uri);
    return this.http.get<Mapa[]>(`${uri}?idMapa=${idMapa}`);
  }

  seleccionarMapa(idMapa: number) {
    const uri = `${this.URL}seleccionarPunto.php`;
    console.log(uri);
    return this.http.get<Mapa[]>(`${uri}?idMapa=${idMapa}`);
  }

  editarMapa(Mapa: Mapa) {
    const uri = `${this.URL}editarPunto.php`;
    console.log(uri);
    console.log("jelou",Mapa);
    return this.http.post(uri, JSON.stringify(Mapa));
  }


}

