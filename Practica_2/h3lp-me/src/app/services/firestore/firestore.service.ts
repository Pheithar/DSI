import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

import { User } from '../../user';
import { Advertisement } from '../../advertisement';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  private afs:AngularFirestoreCollection<User>;
  private afsadds:AngularFirestoreCollection<Advertisement>;


  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {

    this.afs=this.firestore.collection('users');
    this.afsadds=this.firestore.collection('services');
  }


  // Obtener todos los usuarios de la base de datos
  public getUsers():Observable<User[]>{
    return this.afs.valueChanges();
  }

  // Obtener un contacto por id
  public getUser(id: string):Promise<User>{
    return this.afs.doc(id).get().toPromise().then(r=>{
      return r.data() as User;
    });
  }

  // ACtualiza un contacto
  public updateUser(data:User){
    return this.afs.doc(data.id).set(Object.assign({}, data));
  }

  // Elimina un contacto, por id
  public removeUser(id: string){
    return this.afs.doc(id).delete();
  }

  public createUser(data: User):Promise<string>{
    data.id=this.firestore.createId();
    return this.afs.doc(data.id).set({... data}).then(r=>{
      return data.id;
    });
  }

  // Obtener todos los sericios de la base de datos
  public getServices():Observable<Advertisement[]>{
    return this.afsadds.valueChanges();
  }

  // Obtener un servicio por id
  public getService(id: string):Promise<Advertisement>{
    return this.afsadds.doc(id).get().toPromise().then(r=>{
      return r.data() as Advertisement;
    });
  }

  // Actualiza un servicio
  public updateService(data:Advertisement){
    return this.afsadds.doc(data.id).set(data);
  }

  // Elimina un servicio, por id
  public removeService(id: string){
    return this.afsadds.doc(id).delete();
  }

  public createService(data: Advertisement):Promise<string>{
    data.id=this.firestore.createId();
    return this.afsadds.doc(data.id).set({... data}).then(r=>{
      return data.id;
    });
  }

  // public getSets():Observable<Set[]>
  // {
  //   return this.firestore.collection<Set>('sets',ref=>ref.orderBy('id')).valueChanges();
  //
  // }

  public getImg(img:string):Observable<string>{
    let ref = this.storage.ref(img);
    console.log(img);

    return ref.getDownloadURL();

  }

  public uploadImg(img:string):Observable<string>{
    let ref = this.storage.ref(img);
    console.log(img);

    return ref.getDownloadURL();

  }

  getStorage(){
    return this.storage;
  }

}
