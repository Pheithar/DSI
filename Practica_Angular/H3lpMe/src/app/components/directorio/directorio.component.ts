import { Component, OnInit, Input, QueryList, ContentChild, ContentChildren } from '@angular/core';

import { ElementoComponent } from '../elemento/elemento.component';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.component.html',
  styleUrls: ['./directorio.component.scss']
})
export class DirectorioComponent implements OnInit {

  @Input() nombre:string;

  @ContentChildren(ElementoComponent) elementos!:QueryList<ElementoComponent>;


  displayedColumns: string[] = ['name', 'tlf', 'email', 'type', 'regular', 'actions'];
  dataSource = [];

  constructor() {
    this.nombre = "Directorio de ejemplo"
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    for (let elem of this.elementos.toArray()){
      this.dataSource.push(elem.table)
    }
    console.log(this.dataSource)
  }


}
