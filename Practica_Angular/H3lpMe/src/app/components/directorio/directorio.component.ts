import { Component, OnInit, Input } from '@angular/core';

export interface PeriodicElement {
  name: string;
  tlf: number;
  email: string;
  type: string;
  regular:string;
  actions:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: "Pepe Perez", tlf: 658585693, email: "potatomcpapa@me.li", type: "Trabajo", regular:"Sí", actions:"Edit, delete"},
  {name: "Pablo Mármol", tlf: 634257816, email: "i<3rocks@bc.pb", type: "Personal", regular:"No", actions:"Edit, delete"},
];



@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.component.html',
  styleUrls: ['./directorio.component.scss']
})
export class DirectorioComponent implements OnInit {

  @Input() nombre:string;

  displayedColumns: string[] = ['name', 'tlf', 'email', 'type', 'regular', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor() {
    this.nombre = "Directorio de ejemplo"
  }

  ngOnInit(): void {
  }



}
