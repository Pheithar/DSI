import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore/firestore.service'
import { Subscription } from 'rxjs';

import { GlobalService } from '../services/globals/global.service';

import { User } from '../user'

export interface IniciarSesionData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent{

  username: string;
  password: string;

  constructor(public dialog: MatDialog, public router: Router, private global:GlobalService) {}

  abrirIniciarSesion(): void {
    const dialogRef = this.dialog.open(popUpIniciar, {
      width: '20%',
      data: {password: this.password, username: this.username}
    });
  }

  abrirIniciarRegistro(): void {
    const dialogRef = this.dialog.open(popUpRegistro, {
      width: '20%',
      data: {password: this.password, username: this.username}
    });
  }

  getGlobalUser(){
    return this.global.getCurrentUser();
  }

  cerrarSesion(){
    this.global.deleteCurrentUser();
    this.router.navigate([""]);
  }

  irPerfil(){
    console.log("AA?");

    let id = this.getGlobalUser().id;
    this.router.navigate(['/profile', id]);
  }

}


// INICIAR SESIÓN


@Component({
  selector: 'pop-up-iniciar',
  templateUrl: './header.component.pop-up-iniciar.html',
  styleUrls: ['./header.component.scss']
})
export class popUpIniciar implements OnInit{

  public users: User[];
  public s_users: Subscription;

  public wrong_user: boolean;

  username: string;
  password: string;

  hide = true;

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<popUpIniciar>, @Inject(MAT_DIALOG_DATA) public data: IniciarSesionData, public router: Router, public route: ActivatedRoute, private firestoreService: FirestoreService, private global:GlobalService){
      this.users=[];
    }

    ngOnInit(){
      this.s_users = this.firestoreService.getUsers().subscribe(data=>{
        this.users = data;
      });
    }

    ngOnDestroy(){popUpIniciar
      this.s_users.unsubscribe();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }



  iniciarSesion(username:string, password:string){

    this.wrong_user = false;

    let user = this.comprobarDatosInicioSesion(this.users, username, password);

    if(user){
      let id = user.id;

      //poner ese usuario como el que ha iniciado sesión
      this.global.setCurrentUser(user);

      //Navegar al perfil
      this.router.navigate(['/profile', id]);     // En URL y participan en el routing.
      this.onNoClick();


    }
    else{
        this.wrong_user = true;

    }

  }

  comprobarDatosInicioSesion(users:User[], username:string, password:string){
    for (let i = 0; i < users.length; i++) {
      if (users[i].username == username && users[i].password == password) {
        return users[i]
      }
    }
    return undefined
  }

  abrirIniciarRegistro(): void {
    const dialogRef = this.dialog.open(popUpRegistro, {
      width: '20%',
      data: {password: this.password, username: this.username}
    });
  }


}

// REGISTRO

interface h3lperSelect {
  value: boolean;
  viewValue: string;
}


@Component({
  selector: 'pop-up-registro',
  templateUrl: './header.component.pop-up-registro.html',
  styleUrls: ['./header.component.scss']
})
export class popUpRegistro implements OnInit{

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

  constructor(public dialogRef: MatDialogRef<popUpRegistro>, @Inject(MAT_DIALOG_DATA) public data: IniciarSesionData, public router: Router, public route: ActivatedRoute, private firestoreService: FirestoreService, private global:GlobalService){
      this.users=[];
    }

    ngOnInit(){
      this.s_users = this.firestoreService.getUsers().subscribe(data=>{
        this.users = data;
      });
    }

    ngOnDestroy(){popUpRegistro
      this.s_users.unsubscribe();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async iniciarRegistro(username:string, password:string){

    this.used_name = false;

    let unused_name = this.checkUsername(this.users, username);

    if (unused_name) {
      if (this.password_confirm == password) {
        //Crear el usuario
        let id = await this.firestoreService.createUser(new User(username, password, this.h3lper_selected));

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
