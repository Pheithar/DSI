import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore/firestore.service'
import { Subscription } from 'rxjs';

import { Advertisement } from "../advertisement";

import { GlobalService } from '../services/globals/global.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public add:Advertisement;

  public p_add: Promise<Advertisement>;

  public loaded:boolean;

  public add_picture:string;

  public correct:boolean;
  public repeat:boolean;


  constructor(private firestoreService: FirestoreService, private router: Router, private route: ActivatedRoute, public global:GlobalService) {
    this.loaded = false;
    this.correct = false;
    this.repeat = false;
  }

  async ngOnInit(){

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

        });
      }
    });


  }

  async solicitar(){
    let user = await this.firestoreService.getUser(this.global.getCurrentUser().id);
    if(!user.solicitados.includes(this.add.id)){
      user.solicitados.push(this.add.id);
      this.firestoreService.updateUser(user);
      this.correct = true;
    }
    else{
      this.correct = false;
      this.repeat = true;
    }



  }

}
