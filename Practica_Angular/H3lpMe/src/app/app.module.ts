import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DirectorioComponent } from './components/directorio/directorio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    DirectorioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // material
    MatCardModule,
    MatTableModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
