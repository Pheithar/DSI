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

  constructor(public dialog: MatDialog) {}

  abrirIniciarSesion(): void {
    const dialogRef = this.dialog.open(popUpIniciar, {
      width: '20%',
      data: {password: this.password, username: this.username}
    });

    dialogRef.afterClosed().subscribe(result => {

      this.username = result;
    });
  }

  abrirIniciarRegistro(): void {
    const dialogRef = this.dialog.open(popUpRegistro, {
      width: '20%',
      data: {password: this.password, username: this.username}
    });

    dialogRef.afterClosed().subscribe(result => {

      this.username = result;
    });
  }

}


// INICIAR SESIÓN


@Component({
  selector: 'pop-up-iniciar',
  templateUrl: 'header.component.pop-up-iniciar.html',
})
export class popUpIniciar implements OnInit{

  public users: User[];
  public s_users: Subscription;



  hide = true;

  constructor(public dialogRef: MatDialogRef<popUpIniciar>, @Inject(MAT_DIALOG_DATA) public data: IniciarSesionData, public router: Router, public route: ActivatedRoute, private firestoreService: FirestoreService){
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

    let user = this.comprobarDatosInicioSesion(this.users, username, password);

    if(user){
      console.log("INICIAR SESIÓN");

    }
    else{
      console.log("Nombre o contraseña incorrecto");

    }

  }

  comprobarDatosInicioSesion(users:User[], username:string, password:string){
    for (let i = 0; i < users.length; i++) {
      if (users[i].username == username && users[i].password == password) {
        return users[i]
      }
    }
    return ""
  }


}

// REGISTRO

interface h3lperSelect {
  value: boolean;
  viewValue: string;
}


@Component({
  selector: 'pop-up-registro',
  templateUrl: 'header.component.pop-up-registro.html',
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



  hide = true;

  constructor(public dialogRef: MatDialogRef<popUpRegistro>, @Inject(MAT_DIALOG_DATA) public data: IniciarSesionData, public router: Router, public route: ActivatedRoute, private firestoreService: FirestoreService){
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

    let unused_name = this.checkUsername(this.users, username);

    if (unused_name) {
      if (this.password_confirm == password) {
        //Crear el usuario
        let id = await this.firestoreService.createUser(new User(username, password, this.h3lper_selected));

        //poner ese usuario como el que ha iniciado sesión
        GlobalService.currentUser = await this.firestoreService.getUser(id);

        //Navegar al perfil
        this.router.navigate(['/profile', id]);     // En URL y participan en el routing.

      }
      else{
        console.log("Las contraseñas no coinciden");
      }
    }
    else{
      console.log("Nombre ya usado");
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
