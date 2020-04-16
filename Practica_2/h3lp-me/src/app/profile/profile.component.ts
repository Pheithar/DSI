//Test
import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore/firestore.service'
import { Subscription } from 'rxjs';

import { User } from '../user'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  public user: User;

  constructor(private firestoreService: FirestoreService,
              private router: Router,
              private route: ActivatedRoute,
              )
  {}


  ngOnInit() {
    // // EJEMPLO de recuperación de parametros pasados en {state}:
    // console.log("NOT IN URL: ", history.state.param_not_in_url);

    this.route.paramMap.subscribe(params=>{
      // // Aquí se recuperan todos los parametros pasados en la URL:
      // console.log("IN URL: ", params);

      let id =params['params']['id'];
      if(id!=undefined)
        this.firestoreService.getUser(id).then(r=>{
          this.user=r;
        });
      else{
          console.log("USUARIO DESCONOCIDO");
      }
    })
  }

}
