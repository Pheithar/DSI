import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore/firestore.service'
import { Subscription } from 'rxjs';

import { User } from '../user'


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public users: User[];
  public s_users: Subscription;

  constructor(public router: Router, public route: ActivatedRoute, private firestoreService: FirestoreService){
    this.users=[];

  }

  ngOnInit(){
    this.s_users = this.firestoreService.getUsers().subscribe(data=>{
      this.users = data;
    });
  }

  ngOnDestroy(){
    this.s_users.unsubscribe();
  }

  public change() {
  }

  public testNavigate(){
    console.log(this.users[0].level);

    this.router.navigate(['/profile', this.users[0].id,     // En URL y participan en el routing.
                        {param_extra1:'XXX',param_extra2:57}],  // Se pasan codificados en la url.
                        { state: { param_not_in_url: 'bar' }}   // No se muestran en la URL
                        );
  }

}
