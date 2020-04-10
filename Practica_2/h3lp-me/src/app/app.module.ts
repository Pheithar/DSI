import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//FireBase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';


// Modulo para hacer 'routin' entre las ventanas
import { RouterModule, Routes } from '@angular/router';

// Módulos
import { MainComponent } from './main/main.component'; // Página principal
import { ProfileComponent } from './profile/profile.component'; //Página de perfil
import { NotFoundComponent } from './not-found/not-found.component'; // Página del error 404

// Definición de las rutas
const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: '**', component: NotFoundComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ProfileComponent,
    NotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: true }), //Enable tracing es solo para debuggear
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
