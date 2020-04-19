import { Injectable } from '@angular/core';

import { User } from '../../user'

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private currentUser:User;

  constructor() { }

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
