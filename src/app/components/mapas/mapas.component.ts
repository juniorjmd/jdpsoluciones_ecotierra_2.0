import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons'; 
import { LatLngExpression, Map, marker, Marker, popup, tileLayer ,  Icon, icon   } from 'leaflet';

import { Mapa} from 'src/app/models/mapa';
import { MapasService } from 'src/app/services/mapas.service';
import Swal from 'sweetalert2';
import * as L from 'leaflet';
import { isNumber, isString } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.scss']
})
export class MapasComponent  implements AfterViewInit  {
  faSave =  faSave;
  faTrash = faTrash;
  puntoSeleccionado:Mapa = { id:0,
  latitud: 0 ,
  longitud: 0 ,
  desc:''
  };
  private map:any;
  private defaultIcon: Icon = icon({
    iconUrl: 'assets/leaflet/marker-icon.png',
    shadowUrl: 'assets/leaflet/marker-shadow.png',
    iconSize: [41, 51], // => random values you have to choose right ones for your case
    iconAnchor: [20, 51] // => random values too
  });



  puntos:Mapa[]=[{ id:0, longitud:0,
    latitud:0}];

    puntosClick:Mapa[]=[ ];



  constructor(private mapasServicio: MapasService, private router: Router, 
    private activatedRoute: ActivatedRoute) { }
  ngAfterViewInit(): void {
     
      this.initMap(); 

  }
  deleteStorage(punto:Mapa , index:number){ 
    this.puntosClick.splice(index, 1);  

    
 //localStorage.setItem('PUNTOS_CLICK' , JSON.stringify(this.puntosClick) )
 
  }


  guardarMapas(punto:Mapa , index:number){
    if(punto.desc?.trim() === ''){
      Swal.fire(
        'ERROR','Debe ingresar un titulo ',
        'error'
      ) ;
      return ;
    }
    this.mapasServicio.ingresarMapa(punto ).subscribe(
      { next : (res ) => {
         console.log(res);
         if (res.RESPONS === 'ok' || res.RESPONS === 'OK' ){  
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.puntos = res.datos;
          this.agregarPuntosAlMap();
          this.puntosClick.splice(index, 1); 
          //localStorage.setItem('PUNTOS_CLICK' , JSON.stringify(this.puntosClick) )


         }
        
          else{
            alert(res.RESPONS)
          }
        
       }  ,
       error : (err ) => console.error(err) }
     )
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
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.puntos = res.datos;
          this.agregarPuntosAlMap()
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
      
      
    let numTotal =  localStorage.getItem('numLog' )  ;
    if (numTotal == null) numTotal = '0';

    for (let i=0 ; i<=  parseInt(numTotal) ; i++ ){ 
       localStorage.removeItem('lat'+i) 
       localStorage.removeItem('lon'+i)  
       localStorage.removeItem('numLog')  
   }
   localStorage.setItem('numLog' , '0') 

     

      
      Marker.prototype.options.icon = this.defaultIcon;
     this.map = new Map('map').setView([11.2321, -74.1951] , 13);
     tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
      	maxZoom: 20,
      	attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map); 
       this.getCoordenadas()
     // this.addMarker([11.2321, -74.1951])
     this.map.on('click' , this.clickEnElMapa)
    }

   
    clickEnElMapa(e:any  ){ 
      console.log('elemento del clicc',e);

      
      localStorage.setItem('lat'  ,  e.latlng.lat )
      localStorage.setItem('lon' ,  e.latlng.lng )
      
      $('#yosolomiro').trigger('click');     
    }
    

setCircle(coordenada:LatLngExpression){
  const circle = L.circle(coordenada, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(this.map);
}

   getCoordenadasClick(){ 

if(localStorage.getItem('lat') !== null && localStorage.getItem('lon') !== null ){
   
  let aux  = localStorage.getItem('lat') !== null ? localStorage.getItem('lat') : '0' ;
     
  let l1 = 0;
   
  l1 = (aux ) ? parseFloat(aux) : 0;  
  this.puntoSeleccionado.latitud= l1
  aux  = localStorage.getItem('lon') !== null ? localStorage.getItem('lon') : '0' 
  let l2 = (aux ) ? parseFloat(aux) : 0; 
  this.puntoSeleccionado.longitud= l2;
  
const mrk = this.addMarker([l1,l2] , '',true)
console.log('mrk' , mrk);

  this.puntosClick.push( {
    id : 0 ,
    longitud : l2 ,
   latitud : l1,
   desc :'',
   mrk : mrk
 }) 

// localStorage.setItem('PUNTOS_CLICK' , JSON.stringify(this.puntosClick) )
}

}
     
  limpiarPuntosClick(){
   
    console.log( this.puntosClick);
    
    this.puntosClick.forEach((punto)=>{ 
      this.map.removeLayer(punto.mrk)
    })
    
    this.puntosClick = [];
  } 
   agregarPuntosAlMap(){
    this. limpiarPuntosClick();
    let cont = 0;
    let array : LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][] = [] ;
     
    this.puntos.forEach(punto=>{
      const l1 = (punto.latitud === undefined) ?0 : punto.latitud;
      const l2 = (punto.longitud === undefined) ?0 : punto.longitud;

      const lnew = L
     
      let coordenada:LatLngExpression = [ l1, l2 ] ; 
      console.log('click en el mapa' ,coordenada);  
      lnew.marker(coordenada,{title :punto.desc }).addTo(this.map); 
      array[cont] = coordenada ;
      cont++;
      if(cont == 3 ){
        cont =  0; 
        L.polygon(array).addTo(this.map);
      }
    }) 
 
   }  

  getCoordenadas() {
    this.puntos =[{ id:0, longitud:0,
      latitud:0}];
    this.mapasServicio.obtenerMapas().subscribe(
      {next : (res) => {
 
        if (res.RESPONS === 'ok' || res.RESPONS === 'OK' ){ 
           
          this.puntos = Object.values(res.datos)  ; 
         
         this.agregarPuntosAlMap();


        }
          else{
            alert(res.RESPONS)
          }
       
      },
      error : (err ) => console.log(err) 
    }
    );
  }


    addMarker(coordenada:LatLngExpression,title?:string, click = false ){    
      console.log('coordenada markes', coordenada);
      let option =   {
        title: title ,
        opacity: 0.5,
        radius: 500
    }
 
        
      const mak =    marker(coordenada,option).addTo(this.map);       
      if(click){
        return mak
      }
      return;

    }
  }
