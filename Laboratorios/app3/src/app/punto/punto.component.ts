import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-punto',
  templateUrl: './punto.component.html',
  styleUrls: ['./punto.component.css']
})
export class PuntoComponent implements OnInit {

  @Input() x:number;
  @Input() y:number;

  constructor() {
    this.x=0.0;
   }

  ngOnInit() {
    
  }

}