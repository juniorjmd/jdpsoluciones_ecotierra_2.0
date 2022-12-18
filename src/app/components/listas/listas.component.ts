import { Component } from '@angular/core';
import { Mapa } from 'src/app/models/mapa';
import { MapasService } from 'src/app/services/mapas.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss']
})
export class ListasComponent {
  puntos:Mapa[] ; 

  faTrash = faTrash;
  constructor( private mapasServicio:MapasService){
    this.puntos=[{ id:0, longitud:0,
      latitud:0}]
      this.getCoordenadas();

  }
  getCoordenadas() {
    this.puntos =[{ id:0, longitud:0,
      latitud:0}];
    this.mapasServicio.obtenerMapas().subscribe(
      {next : (res) => {
       // Swal.fire('Thank you...', JSON.stringify(res), 'success')
 
        if (res.RESPONS === 'ok' || res.RESPONS === 'OK' ){ 
          this.puntos = res.datos; 
        }
          else{
            alert(res.RESPONS)
          }
       
      },
      error : (err ) => console.log(err) 
    }
    );
  }
  listSorted(e:any){

  }
  borrarMapa( Mapa: Mapa){

    Swal.fire({
      title: `¿Estas seguro de borrar este punto ? `,
      text: ` Una vez eliminado sera imposible recuperar dicha informacion : 
            latitud:${Mapa.latitud} \r
            longitud:${Mapa.longitud} 
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borralo!',
      cancelButtonText: 'No, mantenlo'
    }).then((result) => {
      if (result.value) {

        this.mapasServicio.borrarMapa( Mapa.id).subscribe(
          { next : (res ) => {
             console.log(res);
             if (res.RESPONS === 'ok' || res.RESPONS === 'OK' ){   
              Swal.fire(
                'Borrado!',
                'El punto fue eliminado con exito.',
                'success'
              )
             this.getCoordenadas();
            }
              else{
                alert(res.RESPONS)
              }
            
           }  ,
           error : (err ) => Swal.fire(
            'ERROR',JSON.stringify(err),
            'error'
          ) }
         )


       
      } else if (result.dismiss === Swal.DismissReason.cancel) { 
      }
    })

    
  }

}
