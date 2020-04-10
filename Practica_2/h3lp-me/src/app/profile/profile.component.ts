//Test
import { Component, OnInit,OnDestroy } from '@angular/core';
import { FirestoreService } from '../services/firestore/firestore.service'
import { Subscription } from 'rxjs';

import { User } from '../user'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit,OnDestroy {
  public users: User[];
  public s_users: Subscription;

  constructor(private firestoreService: FirestoreService){
    this.users = [];
  }

  ngOnInit(){
    this.s_users = this.firestoreService.getUsers().subscribe(data=>{
      this.users = data;
    });
  }

  ngOnDestroy(){
    this.s_users.unsubscribe();
  }

  // TEST PARA CREAR USUARIOS
  public createUser(){
    let aux: User = new User('1', 'AAA', 'BBB', 1);
    this.firestoreService.createUser(aux);
    console.log(this.users);
    return 1;
  }

  public test(){
    console.log("FUNCIONA");
  }
}
