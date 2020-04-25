//Test
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore/firestore.service'
import { Subscription } from 'rxjs';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


import { StarRatingComponent } from 'ng-starrating';

import { GlobalService } from '../services/globals/global.service';

import { User } from '../user'

export interface nuevoServicioData {
  username: string;
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  public user: User;

  public globalUser: User;

  public users: User[];
  public s_users: Subscription;

  public loaded:boolean;

  constructor(public dialog: MatDialog,
              private firestoreService: FirestoreService,
              private router: Router,
              private route: ActivatedRoute,
              private global:GlobalService){
                this.users=[];
                this.loaded = false;
                if (this.global.getCurrentUser() != undefined) {
                  this.globalUser = this.global.getCurrentUser();
                }
                else{
                  this.globalUser = undefined;
                }
              }


  async ngOnInit() {

    this.s_users = await this.firestoreService.getUsers().subscribe(data=>{
      this.users = data;
      this.route.paramMap.subscribe(async params=>{
        let id=params['params']['id'];
        let aux_user
        aux_user = this.comprobarUser(this.users, id);
        if (aux_user==undefined) {
          this.router.navigate(['**']);
        }
        else{
          this.loaded = true;
          this.user = new User(aux_user.username, aux_user.password, aux_user.level, aux_user.h3lper, aux_user.review_normal, aux_user.review_h3lper, aux_user.experience, aux_user.coins);

        }
      });
    });
  }

  comprobarUser(users:User[], id:string){
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == id) {
        return users[i]
      }
    }
    return undefined
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
      data: {username: "Pheithar"}
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
  styleUrls: ['./profile.component.scss']
})
export class nuevoServicio implements OnInit{

  public wrong_user: boolean;

  username: string;

  serviceName:string;

  serviceDescription:string;

  selectedCategory:string;
  categorys: Category[] = [
    {value: 0, viewValue: 'Cuidado del hogar'},
    {value: 1, viewValue: 'Profesor'},
    {value: 2, viewValue: 'Fontanería'},
    {value: 3, viewValue: 'Jardinería'},
    {value: 4, viewValue: 'Instalaciones eléctricas'},
    {value: 5, viewValue: 'Otros'}
  ];

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

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<nuevoServicio>, @Inject(MAT_DIALOG_DATA) public data: nuevoServicioData, public router: Router, public route: ActivatedRoute, private firestoreService: FirestoreService, private global:GlobalService){
    this.username = this.data.username;
    }

    ngOnInit(){

    }

    ngOnDestroy(){
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
