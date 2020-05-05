//Test
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore/firestore.service'
import { Subscription } from 'rxjs';

import { DatePipe } from '@angular/common';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


import { StarRatingComponent } from 'ng-starrating';

import { GlobalService } from '../services/globals/global.service';

import { User } from '../user'

import { Advertisement } from '../advertisement'


import { FormGroup, FormControl, Validators } from '@angular/forms';

import {MatSnackBar} from '@angular/material/snack-bar';


export interface nuevoServicioData {
  user: User;
}

export interface passUser {
  user: User;
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  public t:File;

  public user: User;

  public globalUser: User;

  public users: User[];
  public s_users: Subscription;

  public loaded:boolean;

  public test_image_url:string;

  public user_picture:string;

  public services_ofrecidos:Advertisement[];
  public services_solicitados:Advertisement[];

  constructor(public dialog: MatDialog,
              private firestoreService: FirestoreService,
              private router: Router,
              private route: ActivatedRoute,
              private global:GlobalService){
                this.users=[];
                this.loaded = false;
                this.services_ofrecidos = [];
                this.services_solicitados = [];



              }


  async ngOnInit() {

    await this.global.forceLoad();


    if (this.global.getCurrentUser() != undefined) {
      this.globalUser = this.global.getCurrentUser();
    }
    else{
      this.globalUser = undefined;
    }

    this.route.paramMap.subscribe(async params=>{
      let id = params['params']['id'];

      let aux_user = await this.firestoreService.getUser(id);

      if (aux_user == undefined) {
        this.router.navigate(['**']);
      }
      else{
        this.user = new User(aux_user.username, aux_user.password, aux_user.level, aux_user.h3lper, aux_user.review_normal, aux_user.review_h3lper, aux_user.experience, aux_user.coins, aux_user.picture, aux_user.ofrecidos, aux_user.solicitados);
        this.user.id = aux_user.id

        this.setPicture(this.user.picture);


        for (let i = 0; i < this.user.ofrecidos.length; i++) {
          let ofre = await this.firestoreService.getService(this.user.ofrecidos[i]);
          this.services_ofrecidos.push(ofre);
        }
        for (let i = 0; i < this.user.solicitados.length; i++) {
          let soli = await this.firestoreService.getService(this.user.solicitados[i]);
          this.services_solicitados.push(soli);
        }

        this.loaded = true;

      }
    });
  }

  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    alert(`Old Value:${$event.oldValue},
      New Value: ${$event.newValue},
      Checked Color: ${$event.starRating.checkedcolor},
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }


  newService(){
    const dialogRef = this.dialog.open(nuevoServicio, {
      width: '50%',
      data: {user: this.user}
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        this.services_ofrecidos = [];
        for (let i = 0; i < this.user.ofrecidos.length; i++) {
          let ofre = await this.firestoreService.getService(this.user.ofrecidos[i]);
          this.services_ofrecidos.push(ofre);
        }
      }
    });
  }

  updateImage(){
    const dialogRef = this.dialog.open(nuevaImagen, {
      width: '30%',
      data: {user: this.user}
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.user.picture = result;
        this.global.setCurrentUserPicture(result);
        this.setPicture(result);

      }
    });
  }

  setPicture(picture){
    this.firestoreService.getImg(picture).subscribe(url=>{
      this.user_picture = url;
    });
  }
}






interface Category {
  value: number;
  viewValue: string;
}

interface Province {
  value: number;
  viewValue: string;
}


// NUEVO SERVICIO


@Component({
  selector: 'pop-up-nuevo-servicio',
  templateUrl: './profile.component.pop-up-nuevo-servicio.html',
  styleUrls: ['./profile.component.scss'],
  providers: [DatePipe]
})
export class nuevoServicio implements OnInit{

  public wrong_user: boolean;

  username: string;

  serviceName:string;

  serviceDescription:string;

  selectedCategory:string;
  categorys: Category[] = [
    {value: 0, viewValue: 'Fotografía'},
    {value: 1, viewValue: 'Infomática'},
    {value: 2, viewValue: 'Cocina'},
    {value: 3, viewValue: 'Hogar'},
    {value: 4, viewValue: 'Otros'},
  ];

  selectedProvince:string;

  provinces: Province[] = [
    {value: 0, viewValue: 'Álava'},
    {value: 1, viewValue: 'Albacete'},
    {value: 2, viewValue: 'Alicante'},
    {value: 3, viewValue: 'Almería'},
    {value: 4, viewValue: 'Asturias'},
    {value: 5, viewValue: 'Ávila'},
    {value: 6, viewValue: 'Badajoz'},
    {value: 7, viewValue: 'Barcelona'},
    {value: 8, viewValue: 'Busrgos'},
    {value: 9, viewValue: 'Cáceres'},
    {value: 10, viewValue: 'Cádiz'},
    {value: 11, viewValue: 'Cantabria'},
    {value: 12, viewValue: 'Castellón'},
    {value: 13, viewValue: 'Ciudad Real'},
    {value: 14, viewValue: 'Córdoba'},
    {value: 15, viewValue: 'La Coruña'},
    {value: 16, viewValue: 'Cuenca'},
    {value: 17, viewValue: 'Gerona'},
    {value: 18, viewValue: 'Granada'},
    {value: 19, viewValue: 'Guadalajara'},
    {value: 20, viewValue: 'Guipúzcoa'},
    {value: 21, viewValue: 'Huelva'},
    {value: 22, viewValue: 'Huesca'},
    {value: 23, viewValue: 'Baleares'},
    {value: 24, viewValue: 'Jaén'},
    {value: 25, viewValue: 'León'},
    {value: 26, viewValue: 'Lérida'},
    {value: 27, viewValue: 'Lugo'},
    {value: 28, viewValue: 'Madrid'},
    {value: 29, viewValue: 'Málaga'},
    {value: 30, viewValue: 'Murcia'},
    {value: 31, viewValue: 'Navarra'},
    {value: 32, viewValue: 'Orense'},
    {value: 33, viewValue: 'Palencia'},
    {value: 34, viewValue: 'Las Palmas'},
    {value: 35, viewValue: 'Pontevedra'},
    {value: 36, viewValue: 'La Rioja'},
    {value: 37, viewValue: 'Salamanca'},
    {value: 38, viewValue: 'Segovia'},
    {value: 39, viewValue: 'Sevilla'},
    {value: 40, viewValue: 'Soria'},
    {value: 41, viewValue: 'Tarragona'},
    {value: 42, viewValue: 'Santa Cruz de Tenerife'},
    {value: 43, viewValue: 'Teruel'},
    {value: 44, viewValue: 'Toledo'},
    {value: 45, viewValue: 'Valencia'},
    {value: 46, viewValue: 'Valladolid'},
    {value: 47, viewValue: 'Vizcaya'},
    {value: 48, viewValue: 'Zamora'},
    {value: 49, viewValue: 'Zaragoza'},
    {value: 50, viewValue: 'Ceuta'},
    {value: 51, viewValue: 'Melilla'}
  ];

  city:string;

  selectedFile = null;

  price:string;
  pay:string;

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<nuevoServicio>, @Inject(MAT_DIALOG_DATA) public data: nuevoServicioData, public router: Router, public route: ActivatedRoute, private firestoreService: FirestoreService, private global:GlobalService, private datePipe: DatePipe, private bar: MatSnackBar){
    this.username = this.data.user.username;
    }

    ngOnInit(){

    }

    ngOnDestroy(){
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async createService(){
    let myDate = new Date();
    let today = this.datePipe.transform(myDate, 'yyyy-MM-dd');

    let newService = new Advertisement(this.serviceName, this.selectedCategory, this.serviceDescription, "test", this.username, this.city + ", " + this.selectedProvince, today, [], this.price + " " + this.pay);
    let id = await this.firestoreService.createService(newService);


    if (this.selectedFile == null) {
      newService.picture = "default.svg";
    }
    else{
      let storageRef = this.firestoreService.getStorage().ref(id);
      await storageRef.put(this.selectedFile).then(function(snapshot) {
        newService.picture = id
      });
    }

    this.data.user.addXP(30);

    this.bar.open("Obtenidos puntos de experiencia", "30XP", {
      duration: 5000,
    });

    this.data.user.ofrecidos.push(id);

    await this.firestoreService.updateUser(this.data.user);

    await this.firestoreService.updateService(newService);
    this.dialogRef.close(true);

  }

  onFileSelected(event){
    this.selectedFile = event.target.files[0];
  }
}

@Component({
  selector: 'pop-up-nueva-imagen',
  templateUrl: './profile.component.new-image.html',
  styleUrls: ['./profile.component.scss']
})
export class nuevaImagen implements OnInit{

  selectedFile = null;
  user = null;

  constructor(private firestoreService: FirestoreService, public dialog: MatDialog, public dialogRef: MatDialogRef<nuevaImagen>, @Inject(MAT_DIALOG_DATA) public data: passUser){
    this.user = this.data.user;
  }

  ngOnInit(){}

  onFileSelected(event){
    console.log(event);
    this.selectedFile = event.target.files[0];
  }

  async uploadFile(){
    if (this.selectedFile != null) {
      let storageRef = this.firestoreService.getStorage().ref(this.data.user.username);
      await storageRef.put(this.selectedFile);

      this.user.picture = this.data.user.username;

      let aux_user = new User(this.user.username, this.user.password, this.user.level, this.user.h3lper, this.user.review_normal, this.user.review_h3lper, this.user.experience, this.user.coins, this.user.picture, this.user.solicitados, this.user.ofrecidos)

      aux_user.id = this.user.id

      this.firestoreService.updateUser(aux_user);

      this.dialogRef.close(this.user.picture);
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
