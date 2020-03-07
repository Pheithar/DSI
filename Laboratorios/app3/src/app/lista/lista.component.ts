import { Component, OnInit, Input, QueryList, ContentChild, ContentChildren, Output, EventEmitter } from '@angular/core';

import { ElemListaComponent } from '../elem-lista/elem-lista.component';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {


  @Output() cambios = new EventEmitter();

  @ContentChildren(ElemListaComponent) elementos!:QueryList<ElemListaComponent>;

  @Input() public nombre1:string;
  @Input() public nombre2:string;

  parent:Array<string>;
  parentId:Array<number>;
  childId:Array<Array<number>>;

  todosElementos:Array<Array<string>>;

  public values:Array<string> = ["", ""];

  seleccion:string;

  constructor() {
    this.nombre1 = "";
    this.nombre2 = "";

    this.parent = [];
    this.parentId = [];
    this.childId = [];

    this.todosElementos = [];
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    for (let elem of this.elementos.toArray()){
      if (elem.parent == 0){
        this.parent.push(elem.value);
        this.parentId.push(elem.id);
        this.todosElementos.push([]);
        this.childId.push([]);
      }
      else{
        for(let i = 0; i < this.parentId.length; i++){
          if(this.parentId[i] == elem.parent){
            this.todosElementos[i].push(elem.value);
            this.childId[i].push(elem.id);
          }
        }
      }
    }
  }

  cambio1(){
    console.log([this.values[0], this.todosElementos[this.parent.indexOf(this.values[0])][0]])

    let indexa = this.parent.indexOf(this.values[0])

    let a = this.parentId[indexa]
    let b = this.childId[indexa][0]

    this.cambios.emit([a, b])
  }
  cambio2(){
    console.log(this.values)

    let indexa = this.parent.indexOf(this.values[0])
    let indexb = this.todosElementos[indexa].indexOf(this.values[1])

    let a = this.parentId[indexa]
    let b = this.childId[indexa][indexb]


    this.cambios.emit([a, b])
  }
}
