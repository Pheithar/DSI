import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-elem-lista',
  templateUrl: './elem-lista.component.html',
  styleUrls: ['./elem-lista.component.css']
})
export class ElemListaComponent implements OnInit {

  @Input() id:number;
  @Input() parent:number;
  @Input() value:string;

  constructor() {
    this.id = 0;
    this.parent = 0;
    this.value = "";
  }

  ngOnInit() {
  }

}
