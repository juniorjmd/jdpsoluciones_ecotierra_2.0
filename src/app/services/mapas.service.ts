import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Mapa } from '../models/mapa';

@Injectable({
  providedIn: 'root'
})
export class MapasService {
  URL = 'http://ecotierra.jdpsoluciones.com/API/';
  constructor(private http: HttpClient) { }

  obtenerUsuarios() {
    return this.http.get(`${this.URL}listarPuntos.php`);
  }

  altaUsuario(usuario: Mapa) {
    return this.http.post(`${this.URL}insertarPunto.php`, JSON.stringify(usuario));
  }

  bajaUsuario(idUsuario: number) {
    return this.http.get(`${this.URL}eliminarPunto.php?idUsuario=${idUsuario}`);
  }

  seleccionarUsuario(idUsuario: number) {
    return this.http.get(`${this.URL}seleccionarPunto.php?idMapa=${idUsuario}`);
  }

  editarUsuario(usuario: Mapa) {
    console.log("jelou",usuario);
    return this.http.post(`${this.URL}editarPunto.php`, JSON.stringify(usuario));
  }


}

