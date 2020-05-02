import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore/firestore.service'
import { Subscription } from 'rxjs';

import { User } from '../user'

import { Advertisement } from "../advertisement";

import { GlobalService } from '../services/globals/global.service';

import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public users: User[];
  public s_users: Subscription;

  public add:Advertisement;

  public p_add: Promise<Advertisement>;

  public loaded:boolean;

  public add_picture:string;

  public correct:boolean;
  public repeat:boolean;


  constructor(private firestoreService: FirestoreService, private router: Router, private route: ActivatedRoute, public global:GlobalService, private bar: MatSnackBar) {
    this.loaded = false;
    this.correct = false;
    this.repeat = false;
  }

  async ngOnInit(){
    this.s_users = this.firestoreService.getUsers().subscribe(data=>{
      this.users = data;
    });

    this.route.paramMap.subscribe(async params=>{
      let id = params['params']['id'];

      this.add = await this.firestoreService.getService(id);

      if (this.add == undefined) {
        this.router.navigate(['**']);
      }
      else{
        this.firestoreService.getImg(this.add.picture).subscribe(url=>{
          this.add_picture = url;
          this.loaded = true;
          console.log(this.add.requests);


        });
      }
    });


  }

  async solicitar(){
    let aux_user = await this.firestoreService.getUser(this.global.getCurrentUser().id);
    let user = new User(aux_user.username, aux_user.password, aux_user.level, aux_user.h3lper, aux_user.review_normal, aux_user.review_h3lper, aux_user.experience, aux_user.coins, aux_user.picture, aux_user.ofrecidos, aux_user.solicitados);

    user.id = aux_user.id;

    if(!user.solicitados.includes(this.add.id)){

      user.solicitados.push(this.add.id);

      user.addXP(10);
      this.firestoreService.updateUser(user);

      this.bar.open("Obtenidos puntos de experiencia", "10XP", {
        duration: 5000,
      });

      this.add.requests.push(user.username);
      this.firestoreService.updateService(this.add);



      let owner_user;

      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].username == this.add.owner_name) {
          owner_user = new User(this.users[i].username, this.users[i].password, this.users[i].level, this.users[i].h3lper, this.users[i].review_normal, this.users[i].review_h3lper, this.users[i].experience, this.users[i].coins, this.users[i].picture, this.users[i].ofrecidos, this.users[i].solicitados);
          owner_user.id = this.users[i].id;
        }
      }

      owner_user.addXP(50);
      owner_user.coins += 5;

      this.firestoreService.updateUser(owner_user);

      this.correct = true;
    }
    else{
      this.correct = false;
      this.repeat = true;
    }



  }

}
