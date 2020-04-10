export class User{

  id: string;
  username: string;
  password: string;
  level: number;


  constructor(id: string, username: string, password: string, level: number){
    this.id = id;
    this.username = username;
    this.password = password;
    this.level = level;
  }


}
