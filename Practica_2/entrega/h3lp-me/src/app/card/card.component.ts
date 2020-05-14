import { Component, OnInit, Input } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { Advertisement } from "../advertisement";

import { FirestoreService } from '../services/firestore/firestore.service'


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  public add_picture:string;

  @Input() add:Advertisement;

  constructor(private firestoreService: FirestoreService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.firestoreService.getImg(this.add.picture).subscribe(url=>{
      this.add_picture = url;
    })
  }

  goToService(){
    this.router.navigate(['/add', this.add.id])
  }

}
