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
  picture:string;

  solicitados:string[];
  ofrecidos:string[];


  XPMultiply:number = 100;

  constructor(username:string, password:string, level:number, h3lper:boolean, review_normal:number[], review_h3lper:number[], experience:number, coins:number, picture:string, ofrecidos:string[], solicitados:string[]){
    this.username = username;
    this.password = password;
    this.level = level;
    this.h3lper = h3lper;
    this.review_normal = review_normal;
    this.review_h3lper = review_h3lper;
    this.experience = experience;
    this.coins = coins;
    this.picture = picture;

    this.ofrecidos = ofrecidos;
    this.solicitados = solicitados;
  }

  getXPtoNextLevel(){ //Experiencia total para nivel siguiente
    return this.level * this.level * this.XPMultiply;
  }

  getProporcionalXP(){ //Porcentaje de
    return this.experience * 100 / this.getXPtoNextLevel();
  }

  addXP(experience:number){
    this.experience += experience;

    while (this.experience >= this.getXPtoNextLevel()) {
      this.experience = this.experience - this.getXPtoNextLevel();
      this.level += 1;
      this.coins += 10;
    }
  }
}
