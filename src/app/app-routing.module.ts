import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { BodyComponent } from './components/body/body.component';
import { HomeComponent } from './components/home/home.component';
import { ListasComponent } from './components/listas/listas.component';
import { MapasComponent } from './components/mapas/mapas.component';

const routes: Routes = [  
  { path : '' , component : BienvenidaComponent},
  { path : 'home' , component : BodyComponent ,
     children : [       
        { path : 'mapas' , component : MapasComponent},
        { path : 'listas' , component : ListasComponent},
        { path :'**',redirectTo : 'mapas'}
      
      ]
    } ,
{ path :'**',
redirectTo : ''}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
