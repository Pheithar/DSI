
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore/firestore.service'
import { Subscription } from 'rxjs';

import { GlobalService } from '../services/globals/global.service';

import { Advertisement } from '../advertisement'
import { User } from '../user'


@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent implements OnInit {

  public adds: Advertisement[]; //Array que almacena todos lo anuncios
  public s_adds: Subscription; //Establecer conexion con la BBDD y registrar cambios

  public filter:string;
  public search:string;

  public loaded:boolean;

  constructor(public router: Router, public route: ActivatedRoute, private firestoreService: FirestoreService, private global:GlobalService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params=>{
      this.filter = params['params']['filter'];
      this.loaded = false;
      this.adds = [];


      this.s_adds = this.firestoreService.getServices().subscribe(data=>{
        for (let i = 0; i < data.length; i++) {

          if (this.filter == undefined) {
            this.search = params['params']['search'];
            if (this.search != undefined && this.search != "") {
              if (data[i].name.toLowerCase().startsWith(this.search.toLowerCase())) {
                this.adds.push(new Advertisement(data[i].name, data[i].category, data[i].description, data[i].picture, data[i].owner_name, data[i].location, data[i].creation_date, data[i].requests, data[i].price));
                this.adds[i].setId(data[i].id);
              }
            }
            else{
              this.adds.push(new Advertisement(data[i].name, data[i].category, data[i].description, data[i].picture, data[i].owner_name, data[i].location, data[i].creation_date, data[i].requests, data[i].price));
              this.adds[i].setId(data[i].id);
            }


          }
          else{
            if (data[i].category == this.filter) {
              this.adds.push(new Advertisement(data[i].name, data[i].category, data[i].description, data[i].picture, data[i].owner_name, data[i].location, data[i].creation_date, data[i].requests, data[i].price));
              this.adds[this.adds.length - 1].setId(data[i].id);
            }
          }
        }
      });

      this.loaded = true;
    });
  }

  ngOnDestroy(){
    this.s_adds.unsubscribe();
  }



}
