//Test
import { Component, OnInit, OnDestroy } from '@angular/core';
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

  public users: User[];
  public s_users: Subscription;

  public loaded:boolean;

  constructor(private firestoreService: FirestoreService,
              private router: Router,
              private route: ActivatedRoute){
                this.users=[];
                this.loaded = false;
              }


  async ngOnInit() {
    this.s_users = await this.firestoreService.getUsers().subscribe(data=>{
      this.users = data;
      this.route.paramMap.subscribe(async params=>{
        let id=params['params']['id'];
        let aux_user
        aux_user = this.comprobarUser(this.users, id);
        if (aux_user==undefined) {
          this.router.navigate(['**']);
        }
        else{
          this.loaded = true;
          this.user = new User(aux_user.username, aux_user.password, aux_user.level, aux_user.h3lper, aux_user.review_normal, aux_user.review_h3lper, aux_user.experience, aux_user.coins);

        }
      });
    });
  }

  comprobarUser(users:User[], id:string){
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == id) {
        return users[i]
      }
    }
    return undefined
  }


}
