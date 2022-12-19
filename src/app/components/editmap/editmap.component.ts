import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { Mapa } from 'src/app/models/mapa';
import { MapasService } from 'src/app/services/mapas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editmap',
  templateUrl: './editmap.component.html',
  styleUrls: ['./editmap.component.scss']
})
export class EditmapComponent {
  faSave =  faSave;
  puntoSeleccionado:Mapa = { id:0,
    latitud: 0 ,
    longitud: 0 ,
    desc:''
    };
    puntos:Mapa[]=[ ];
  
    constructor(private mapasServicio: MapasService ,
      public dialogo: MatDialogRef<EditmapComponent>, 
      @Inject(MAT_DIALOG_DATA) public punto:Mapa  ) { 
        this.puntoSeleccionado = punto;
      } 


    guardarMapa(){
      if(this.puntoSeleccionado.desc?.trim() === ''){
        Swal.fire(
          'ERROR','Debe ingresar un titulo ',
          'error'
        ) ;
        return ;
      }
      this.mapasServicio.editarMapa(this.puntoSeleccionado).subscribe(
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
            this.dialogo.close(res);
           }
          
            else{
              alert(res.RESPONS)
            }
          
         }  ,
         error : (err ) => console.error(err) }
       )
    }
}
