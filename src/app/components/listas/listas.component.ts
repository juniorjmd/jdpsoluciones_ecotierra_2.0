import { Component } from '@angular/core';
import { Mapa, ordenMap } from 'src/app/models/mapa';
import { MapasService } from 'src/app/services/mapas.service';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { EditmapComponent } from '../editmap/editmap.component';
import { MapaRequest } from 'src/app/models/mapa-request';
@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss']
})
export class ListasComponent {
  puntos:Mapa[] ; 
  

  faTrash = faTrash;
  faEdit = faEdit;
  constructor( private mapasServicio:MapasService,
    private dialog :MatDialog){
    this.puntos=[{ id:0, longitud:0,
      latitud:0}]
      this.getCoordenadas();

  }

  editarMapa(punto:Mapa){
    this.dialog.open(EditmapComponent,{data:punto})
    .afterClosed()
    .subscribe((confirmado:MapaRequest )=>{ 
console.log('datos confirmados' , confirmado);

      if(confirmado.RESPONS =='ok'){
        
        
        this.puntos = confirmado.datos;
        
      }else{ 
         console.log('error') 
      }
    })
  }
  getCoordenadas() {
    this.puntos =[{ id:0, longitud:0,
      latitud:0}];
    this.mapasServicio.obtenerMapas().subscribe(
      {next : (res) => {
        console.log(res);
        
       // Swal.fire('Thank you...', JSON.stringify(res), 'success')
 
        if (res.RESPONS === 'ok' || res.RESPONS === 'OK' ){ 
          this.puntos = Object.values(res.datos) ; 
        }
          else{
            alert(res.RESPONS)
          }
       
      },
      error : (err ) => console.log(err) 
    }
    );
  } 
listSorted(event: CdkDragDrop<string[]>) {
  let orden:ordenMap[] = [];
  moveItemInArray(this.puntos, event.previousIndex, event.currentIndex);
  console.log(this.puntos);
  
  this.puntos.forEach((punto , index)=>{
    orden.push({
      'id' : punto.id,
    'sorte' : index
    })
  })
  console.log(orden);
  
  this.mapasServicio.ordenarListaMapa(orden).subscribe( {next : (res) => {
   
    
   // Swal.fire('Thank you...', JSON.stringify(res), 'success')

    if (res.RESPONS === 'ok' || res.RESPONS === 'OK' ){ 
      console.log(res);

    }
      else{
        alert(res.RESPONS)
      }
   
  },
  error : (err ) => console.log(err) 
}
);
  
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
              this.puntos = res.datos
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
