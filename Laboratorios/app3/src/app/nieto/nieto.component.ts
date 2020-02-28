import { Component, OnInit,Directive,Input } from '@angular/core';

//@Directive({selector: 'app-nieto'})
@Component({
  selector: 'app-nieto',
  templateUrl: './nieto.component.html',
  styleUrls: ['./nieto.component.css']
})
export class NietoComponent implements OnInit {

  @Input() x:number;

  constructor() {
    this.x=0.0;
   }

  ngOnInit() {
  }

}