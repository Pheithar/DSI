import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Página principal
import { MainComponent } from './main/main.component';
//Página de perfil
import { ProfileComponent } from './profile/profile.component';
// Página del error 404
import { NotFoundComponent } from './not-found/not-found.component';
// Componente del header
import {HeaderComponent, popUpIniciar, popUpRegistro} from './header/header.component';
// Componente del footer
import { FooterComponent } from './footer/footer.component';
// Componente de las tarjetas
import { CardComponent } from './card/card.component';
// Componente donde están todos los servicios
import { ServiciosComponent } from './servicios/servicios.component';

import { AddComponent } from './add/add.component';

// Definición de las rutas
const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'services', component: ServiciosComponent },
  { path: 'services/:filter', component: ServiciosComponent },
  { path: 'error404', component: NotFoundComponent },
  { path: 'add/:id', component: AddComponent },
  { path: '**', redirectTo:'error404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
