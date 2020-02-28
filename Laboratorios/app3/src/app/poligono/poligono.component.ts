import { Component, OnInit,ContentChild,ViewChild,QueryList,ElementRef,AfterViewInit,ContentChildren } from '@angular/core';

import { PuntoComponent } from '../punto/punto.component';

@Component({
  selector: 'app-poligono',
  templateUrl: './poligono.component.html',
  styleUrls: ['./poligono.component.css']
})
export class PoligonoComponent implements OnInit {

   @ContentChildren(PuntoComponent) public puntos!:QueryList<PuntoComponent>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    //Se muestran 3 formas distintas de acceder a los elementos de la lista:
    
    console.log(this.puntos.map(nieto=>nieto.x));
   
    for (let nieto of this.puntos.toArray()) {
      console.log(nieto.x);
    }

    this.puntos.forEach(p=>{console.log(p.x);})
  }


}