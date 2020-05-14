import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore/firestore.service'
import { Subscription } from 'rxjs';

import { GlobalService } from '../services/globals/global.service';

import { User } from '../user'

import { CookieService } from 'ngx-cookie-service';

export interface IniciarSesionData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  username: string;
  password: string;

  constructor(public dialog: MatDialog){}

  ngOnInit(){}

  registro(): void {
    const dialogRef = this.dialog.open(popUpMainRegistro, {
      width: '20%',
      data: {password: this.password, username: this.username}
    });
  }


}

interface h3lperSelect {
  value: boolean;
  viewValue: string;
}


@Component({
  selector: 'pop-up-main-registro',
  templateUrl: './main.component.pop-up-registro.html',
  styleUrls: ['../header/header.component.scss']
})
export class popUpMainRegistro implements OnInit{

  public users: User[];
  public s_users: Subscription;

  public password_confirm:string;

  public h3lper_selected:boolean;
  public h3lper: h3lperSelect[] = [
    {value: false, viewValue: 'No quiero ser h3lper'},
    {value: true, viewValue: 'Quiero ser h3lper'},
  ];

  public used_name:boolean;


  hide = true;

  constructor(public dialogRef: MatDialogRef<popUpMainRegistro>, public router: Router, public route: ActivatedRoute, private firestoreService: FirestoreService, private global:GlobalService, @Inject(MAT_DIALOG_DATA) public data: IniciarSesionData){
      this.users=[];
    }

    ngOnInit(){
      this.s_users = this.firestoreService.getUsers().subscribe(data=>{
        this.users = data;
      });
    }

    ngOnDestroy(){popUpMainRegistro
      this.s_users.unsubscribe();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async iniciarRegistro(username:string, password:string){

    this.used_name = false;

    let unused_name = this.checkUsername(this.users, username);

    if (unused_name) {
      if (this.password_confirm == password && password.length >= 6) {
        //Crear el usuario
        let id = await this.firestoreService.createUser(new User(username, password, 1, this.h3lper_selected, [], [], 0, 0, "user.svg", [], []));

        //poner ese usuario como el que ha iniciado sesión
        this.global.setCurrentUser(await this.firestoreService.getUser(id));

        //Navegar al perfil
        this.router.navigate(['/profile', id]);     // En URL y participan en el routing.
        this.onNoClick();
      }
      else{
      }
    }
    else{
      this.used_name = true;
    }
  }

  checkUsername(users:User[], username:string){
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username) {
          return false;
        }
      }
      return true;
  }
}
