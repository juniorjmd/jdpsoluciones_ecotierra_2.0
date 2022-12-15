import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { ActivatedRoute, Router } from '@angular/router';
import { MapasService } from 'src/app/services/mapas.service';
import { Mapa } from '../../models/mapa';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

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

  mapaseleccionado:Mapa = {
    id: 0,
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
    this.obtenerMapas();
  }
  guardarMapa(){
    this.mapasServicio.ingresarMapa(this.mapa).subscribe(
      { next : (res ) => {
         console.log(res);
         if (res.RESPONS === 'ok' || res.RESPONS === 'OK' ){  
          alert("El punto fue registrado con exito");
         this.obtenerMapas();
         this.makeCapitalMarkers(this.map);}
          else{
            alert(res.RESPONS)
          }
        
       }  ,
       error : (err ) => console.error(err) }
     )
  }
  borrarMapa(idMapa: number){
    this.mapasServicio.borrarMapa(idMapa).subscribe(
      { next : (res ) => {
         console.log(res);
         if (res.RESPONS === 'ok' || res.RESPONS === 'OK' ){  
          alert("El punto fue eliminado con exito");
         this.obtenerMapas();
        }
          else{
            alert(res.RESPONS)
          }
        
       }  ,
       error : (err ) => console.error(err) }
     )
  }

  obtenerMapas() {
    this.mapas = [];
    this.mapasServicio.obtenerMapas().subscribe(
      {next : (res) => {
        console.log('llego',res);
        if (res.RESPONS === 'ok' || res.RESPONS === 'OK' ){ 
          this.mapas = res.datos;
          this.makeCapitalMarkers(this.map);
        }
          else{
            alert(res.RESPONS)
          }
       
      },
      error : (err ) => console.log(err) 
    }
    );
  }

  constructor(private mapasServicio: MapasService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.initMap();
    
    
  }

  makeCapitalMarkers(map: L.Map): void {
    console.log("inicio markers",this.mapas);
      for (const c of this.mapas) {
        const lon = c.longitud;
        const lat = c.latitud;
        const marker = L.marker([lat, lon]);
        console.log("registro",map);
        marker.addTo(map);
      }

  }

  altaMapa() {
    this.mapasServicio.altaMapa(this.mapa).subscribe(
     { next : (res : any ) => {
        console.log(res);
        alert("El punto fue registrado con exito");
        this.obtenerMapas();
        this.makeCapitalMarkers(this.map);
      }  ,
      error : (err : any ) => console.error(err) }
    )
  };
  
 

  bajaMapa(idMapa: number) {
    this.mapasServicio.bajaMapa(idMapa).subscribe(
      { next : (res : any ) => {
        console.log(res);
        this.obtenerMapas();
        alert("El punto fue eliminado con exito");
        this.obtenerMapas();
        this.makeCapitalMarkers(this.map);
      },
       
      error :(err : any ) => console.error(err) }
    );
  }

  editarMapa() {
    this.mapasServicio.editarMapa(this.mapaseleccionado).subscribe(
      {next :(res : any ) => {
        console.log(res);
        alert("El punto fue editado con exito");
        this.obtenerMapas();
        this.makeCapitalMarkers(this.map);
      },
      error : (err : any ) => console.error(err) }
    );
  }

  _seleccionarMapa(idMapa: number) {
    console.log(idMapa)
    this.mapasServicio.seleccionarMapa(idMapa).subscribe(
      { next : (res: any) => {
        console.log(res);
        this.mapaseleccionado = res[0];
        this.makeCapitalMarkers(this.map);
      },
       error:(err : any ) => console.error(err) }
    );
  }



  seleccionarMapa(idMapa: number)  {
    this.mapas = [];
    this.mapasServicio.seleccionarMapa(idMapa).subscribe(
      {next : (res) => {
        console.log('llego',res);
        if (res.RESPONS === 'ok' || res.RESPONS === 'OK' ){ 
          //this.mapas = res.datos;
           res.datos
        this.mapaseleccionado =  (res.datos[0]!== undefined) ? res.datos[0] : this.mapaseleccionado     ;
          this.makeCapitalMarkers(this.map);
        }
          else{
            alert(res.RESPONS)
          }
       
      },
      error : (err ) => console.log(err) 
    }
    );
  }
}
