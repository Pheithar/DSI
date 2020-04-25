import { Component, OnInit, Input } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { Advertisement } from "../advertisement";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() add:Advertisement;

  constructor(public router: Router, public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  goToService(){
    this.router.navigate(['/add', this.add.id])
  }

}
