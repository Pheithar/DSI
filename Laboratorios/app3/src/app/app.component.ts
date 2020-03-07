import { Component, QueryList, ContentChild, ContentChildren, ViewChild } from '@angular/core';

import { ListaComponent } from "./lista/lista.component";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  namelist1:string;
  namelist2:string;

  value1:string;
  value2:string;


  @ViewChild(ListaComponent, {static:true}) lista:ListaComponent;
  name = 'APP 03 - Custom Components...';

  contactos=[['Juan','juan@nose.esx','91-111.11.11'],
			['Maria','maria@nose.Xes','91-222.22.22'],
      ['Pepe','','91-333.33.33']];

    constructor() {
      this.namelist1 = "Comunidad";
      this.namelist2 = "Provincia";

      this.value1 = "";
      this.value2 = "";

    }

    ngAfterViewInit() {
    }

  update($event){
    console.log("Actualización")
    this.value1 = $event[0];
    this.value2 = $event[1];
  }

  displayInfo(){
    alert(this.namelist1 + ": " + this.value1 + "\n" + this.namelist2 + ": " + this.value2)
  }


}
