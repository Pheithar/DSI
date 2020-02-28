import { Component, OnInit,ContentChild,ViewChild,QueryList,ElementRef,AfterViewInit,ContentChildren } from '@angular/core';

import { NietoComponent } from '../nieto/nieto.component';


@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styleUrls: ['./hijo.component.css']
})
export class HijoComponent implements OnInit {

  @ContentChildren(NietoComponent) nietos!:QueryList<NietoComponent>;

  constructor() { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {

    //Se muestran 3 formas distintas de acceder a los elementos de la lista:
    
    console.log(this.nietos.map(nieto=>nieto.x));
   
    for (let nieto of this.nietos.toArray()) {
      console.log(nieto.x);
    }

    this.nietos.forEach(p=>{console.log(p.x);})
  }

}