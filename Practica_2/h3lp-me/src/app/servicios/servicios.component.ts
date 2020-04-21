
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

  constructor(public router: Router, public route: ActivatedRoute, private firestoreService: FirestoreService, private global:GlobalService) {
    this.adds = [];

  }

  ngOnInit(): void {
    this.s_adds = this.firestoreService.getServices().subscribe(data=>{
      this.adds = data;
      console.log(this.adds);

    });
  }

  ngOnDestroy(){
    this.s_adds.unsubscribe();
  }

  test(){
    this.firestoreService.createServicio(new Advertisement("Anuncio 1", "Limpieza", "Hola a todos y todas", "picture", "iuqy", "Madrid", "2/2"));

  }

}
