import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit {

  public value:string;

  constructor(public route: ActivatedRoute, public router: Router) {
    this.value = ""
  }

  ngOnInit(): void {
  }

  goTo(destine:string, search:boolean){
    if (destine == "") {
      this.router.navigate(['/services']);
    }
    else{
      this.router.navigate(['/services', destine]);
    }
  }

  search(){
    this.router.navigate(['/services', {search:this.value}]);
    this.value = "";
  }

}
