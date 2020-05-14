import { Injectable } from '@angular/core';

import { User } from '../../user'

import { CookieService } from 'ngx-cookie-service';

import { FirestoreService } from '../firestore/firestore.service'



@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private currentUser:User;

  private user_picture;

  constructor(private cookieService: CookieService, private firestoreService: FirestoreService) {

    this.userFromCookie();
  }

  async forceLoad(){
    await this.userFromCookie();
  }

  async userFromCookie(){

    if (this.cookieService.check('currentUser')) {

      let id = this.cookieService.get("currentUser");

      let aux_user = await this.firestoreService.getUser(id);

      if (aux_user != undefined) {
        this.setCurrentUser(aux_user);
      }
    }
  }

  setCurrentUserPicture(picture){
    this.firestoreService.getImg(picture).subscribe(url=>{
      this.user_picture = url;
    });
  }

  getCurrentUser(){
    return this.currentUser;
  }

  setCurrentUser(user:User){
    this.currentUser = user;
    this.setCurrentUserPicture(this.currentUser.picture);
  }

  deleteCurrentUser(){
    this.currentUser = undefined;
  }

  getCurrentUserPicture(){
    return this.user_picture;
  }

}
