export class User{

  id:string;
  username:string;
  password:string;
  level:number;
  h3lper:boolean;
  review_normal:number[];
  review_h3lper:number[];
  experience:number;
  coins:number;


  constructor(username:string, password:string, h3lper:boolean){
    this.username = username;
    this.password = password;
    this.level = 1;
    this.h3lper = h3lper;
    this.review_normal = [];
    this.review_h3lper = [];
    this.experience = 0;
    this.coins = 0;
  }
}
