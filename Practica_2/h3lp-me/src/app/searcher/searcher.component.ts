import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit {

  value = '';

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  goTo(destine:string){
    this.router.navigate(['/services', destine]);
  }

}
