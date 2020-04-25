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

  constructor(private firestoreService: FirestoreService, private router: Router, private route: ActivatedRoute,) {
    this.loaded = false;
  }

  async ngOnInit(){

    this.route.paramMap.subscribe(async params=>{
      let id = params['params']['id'];

      this.add = await this.firestoreService.getService(id);

      if (this.add == undefined) {
        this.router.navigate(['**']);
      }
      else{
        this.loaded = true;
      }

    });


  }

}
