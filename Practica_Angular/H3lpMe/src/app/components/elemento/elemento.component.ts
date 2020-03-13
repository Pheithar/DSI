import { Component, OnInit, Input } from '@angular/core';

export interface elementTable {
  name: string;
  tlf: string;
  email: string;
  type: string;
  regular:string;
  actions:string;
}


@Component({
  selector: 'app-elemento',
  templateUrl: './elemento.component.html',
  styleUrls: ['./elemento.component.scss']
})
export class ElementoComponent implements OnInit {

  @Input() name:string;
  @Input() tlf:string;
  @Input() email:string;
  @Input() type:string;
  @Input() regular:string;
  @Input() actions:string;

  table:elementTable;



  constructor() {
    this.name = "";
    this.tlf = "";
    this.email = "";
    this.type = "";
    this.regular = "";
    this.actions = "";

    this.table = {name:"", tlf: "", email: "", type: "", regular:"", actions:""};
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.table.name = this.name;
    this.table.tlf = this.tlf;
    this.table.email = this.email;
    this.table.type = this.type;
    this.table.regular = this.regular;
    this.table.actions = this.actions;
  }

}
