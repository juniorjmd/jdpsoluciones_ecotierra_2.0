import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { ActivatedRoute, Router } from '@angular/router';
import { MapasService } from 'src/app/services/mapas.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements AfterViewInit {


 
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  private map!: L.Map;

  mapas: any = [];


  mapa = {
    idMapa: 0,
    longitud: 0,
    latitud: 0
  }

  mapaseleccionado = {
    idMapa: 0,
    longitud: 0,
    latitud: 0
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.mapasServicio.obtenerUsuarios().subscribe(
      (res: any) => {
        console.log(res);
        this.mapas = res;
        this.makeCapitalMarkers(this.map);
      },
      (err : any ) => console.log(err)

    );
  }

  constructor(private mapasServicio: MapasService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.initMap();
    
    
  }

  makeCapitalMarkers(map: L.Map): void {
    console.log("holaaas",this.mapas);
      for (const c of this.mapas) {
        const lon = c.longitud;
        const lat = c.latitud;
        const marker = L.marker([lat, lon]);
        console.log("holaaas",map);
        marker.addTo(map);
      }

  }

  altaUsuario() {
    this.mapasServicio.altaUsuario(this.mapa).subscribe(
      (res : any ) => {
        console.log(res);
        alert("El punto fue registrado con exito");
        this.obtenerUsuarios();
        this.makeCapitalMarkers(this.map);
      },
      (err : any ) => console.error(err)
    );
  } 

  bajaUsuario(idMapa: number) {
    this.mapasServicio.bajaUsuario(idMapa).subscribe(
      (res : any ) => {
        console.log(res);
        this.obtenerUsuarios();
        alert("El punto fue eliminado con exito");
        this.obtenerUsuarios();
        this.makeCapitalMarkers(this.map);
      },
      (err : any ) => console.error(err)
    );
  }

  editarUsuario() {
    this.mapasServicio.editarUsuario(this.mapaseleccionado).subscribe(
      (res : any ) => {
        console.log(res);
        alert("El punto fue editado con exito");
        this.obtenerUsuarios();
        this.makeCapitalMarkers(this.map);
      },
      (err : any ) => console.error(err)
    );
  }

  seleccionarUsuario(idMapa: number) {
    console.log(idMapa)
    this.mapasServicio.seleccionarUsuario(idMapa).subscribe(
      (res: any) => {
        console.log(res);
        this.mapaseleccionado = res[0];
        this.makeCapitalMarkers(this.map);
      },
      (err : any ) => console.error(err)
    );
  }
}
