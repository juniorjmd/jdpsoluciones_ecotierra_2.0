import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSave } from '@fortawesome/free-solid-svg-icons'; 
import { LatLngExpression, Map, marker, Marker, tileLayer } from 'leaflet';

import { Mapa} from 'src/app/models/mapa';
import { MapasService } from 'src/app/services/mapas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.scss']
})
export class MapasComponent  implements AfterViewInit  {
  faSave =  faSave;
  
  puntoSeleccionado:Mapa = { id:0,
  latitud: 0 ,
  longitud: 0 ,
  desc:''
  };
  private map:any;



  constructor(private mapasServicio: MapasService, private router: Router, 
    private activatedRoute: ActivatedRoute) { }
  ngAfterViewInit(): void {
     
      this.initMap(); 

  }



  guardarMapa(){
    if(this.puntoSeleccionado.desc?.trim() === ''){
      Swal.fire(
        'ERROR','Debe ingresar un titulo ',
        'error'
      ) ;
      return ;
    }
    this.mapasServicio.ingresarMapa(this.puntoSeleccionado).subscribe(
      { next : (res ) => {
         console.log(res);
         if (res.RESPONS === 'ok' || res.RESPONS === 'OK' ){  
          alert("El punto fue registrado con exito");
          this.puntoSeleccionado = { id:0,
            latitud: 0 ,
            longitud: 0 ,
            desc:''
            };
         }
        
          else{
            alert(res.RESPONS)
          }
        
       }  ,
       error : (err ) => console.error(err) }
     )
  }
    private initMap(): void {
     this.map = new Map('map').setView([11.2321, -74.1951] , 13);
     tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
      	maxZoom: 20,
      	attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map); 

      this.addMarker([11.2321, -74.1951])
    }
    private addMarker(coordenada:LatLngExpression){      
         marker(coordenada).addTo(this.map);       

    }
  }
