import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {

    @Input() public nombre:string;
    @Input() public email:string;
    @Input() public telefono:string;
   
    //Permite hacer algo cuando se da valor a una propiedad:
    @Input() public set nombre2(nombre: string) {
      this.nombre = nombre;
  }
  constructor() {
     this.nombre="";
     this.email="";
     this.telefono="";
   }

  ngOnInit() {
  }

}