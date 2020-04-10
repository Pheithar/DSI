import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { User } from '../../user';

@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  private afs:AngularFirestoreCollection<User>;

  constructor(private firestore: AngularFirestore) {

    this.afs=this.firestore.collection('users');
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
    return this.afs.doc(data.id).set(data);
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
}
