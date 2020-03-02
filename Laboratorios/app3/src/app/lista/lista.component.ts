import { Component, OnInit, Input, QueryList, ContentChild, ContentChildren } from '@angular/core';

import { ElemListaComponent } from '../elem-lista/elem-lista.component';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  @ContentChildren(ElemListaComponent) elementos!:QueryList<ElemListaComponent>;

  @Input() nombre1:string;
  @Input() nombre2:string;

  @Input() parent:Array<string>;
  @Input() parentId:Array<number>;

  @Input() todosElementos:Array<Array<string>>;

  constructor() {
    this.nombre1 = "";
    this.nombre2 = "";

    this.parent = [];
    this.parentId = [];

    this.todosElementos = [];

  }

  ngOnInit() {

  }

  ngAfterViewInit() {

    for (let elem of this.elementos.toArray()){
      if (elem.parent == 0){
        this.parent.push(elem.value)
        this.parentId.push(elem.id)
        this.todosElementos.push([])
      }
      else{
        for(let i = 0; i < this.parentId.length; i++){
          if(this.parentId[i] == elem.parent){
            this.todosElementos[i].push(elem.value)
          }
        }
      }
    }

  }

}
