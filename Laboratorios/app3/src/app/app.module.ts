import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HijoComponent } from './hijo/hijo.component';
import { NietoComponent } from './nieto/nieto.component';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { PoligonoComponent } from './poligono/poligono.component';
import { PuntoComponent } from './punto/punto.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, HijoComponent, NietoComponent, TarjetaComponent, PoligonoComponent, PuntoComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
