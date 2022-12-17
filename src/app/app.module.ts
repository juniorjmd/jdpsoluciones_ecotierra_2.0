import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MapasService } from './services/mapas.service'; 

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon'; 
import {MatTreeModule} from '@angular/material/tree';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion'; 
import { EditmapComponent } from './components/editmap/editmap.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BodyComponent } from './components/body/body.component';
import { MapasComponent } from './components/mapas/mapas.component';
import { ListasComponent } from './components/listas/listas.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,  HeaderComponent,
    EditmapComponent,
     BodyComponent, 
     MapasComponent, ListasComponent, HomeComponent, SidebarComponent, BienvenidaComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatTreeModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    FontAwesomeModule,
    AppRoutingModule
  ],
  providers: [MapasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
