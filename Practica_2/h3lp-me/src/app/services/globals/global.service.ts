import { Injectable } from '@angular/core';

import { User } from '../../user'

import { CookieService } from 'ngx-cookie-service';

import { FirestoreService } from '../firestore/firestore.service'



@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private currentUser:User;

  constructor(private cookieService: CookieService, private firestoreService: FirestoreService) {

    this.userFromCookie();
  }

  async userFromCookie(){
    if (this.cookieService.check('currentUser')) {
      let id = this.cookieService.get("currentUser");

      let aux_user = await this.firestoreService.getUser(id);

      if (aux_user != undefined) {
        this.currentUser = aux_user;
      }
    }
  }

  getCurrentUser(){
    return this.currentUser;
  }

  setCurrentUser(user:User){
    this.currentUser = user;
  }

  deleteCurrentUser(){
    this.currentUser = undefined;
  }

}
