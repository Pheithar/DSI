import { User } from './user';

export class Advertisement{

  id:string;
  name:string;
  category:string;
  description:string;
  picture:string;
  owner:User;
  location:string;
  creation_date:string;


  constructor(name:string, category:string, description:string, picture:string, owner:User, location:string, creation_date:string){
    this.name = name;
    this.category = category;
    this.description = description;
    this.picture = picture;
    this.owner= owner;
    this.location = location;
    this.creation_date = creation_date;
  }
}
