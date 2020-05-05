export class Advertisement{

  id:string;
  name:string;
  category:string;
  description:string;
  picture:string;
  owner_name:string;
  location:string;
  creation_date:string;
  requests:string[];
  price:string;


  constructor(name:string, category:string, description:string, picture:string, owner_name:string, location:string, creation_date:string, requests:string[], price:string){
    this.name = name;
    this.category = category;
    this.description = description;
    this.picture = picture;
    this.owner_name = owner_name;
    this.location = location;
    this.creation_date = creation_date;
    this.requests = requests;
    this.price = price;
  }

  setId(id:string){
    this.id = id;
  }
}
