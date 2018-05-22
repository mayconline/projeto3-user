
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class UsuariosProvider {

  constructor(private afDb:AngularFireDatabase, private afAuth:AngularFireAuth) {
    
  }

  private PATH = 'userProfile/'


  /*getUserAll(){
    
    return this.afDb.list(this.PATH)
    .snapshotChanges()
    .map(changes =>{
        return changes.map(u =>({ key: u.payload.key,...u.payload.val() }));
  
  
    })
  }*/

  getUserInfo() {
    return this.afDb.object(this.PATH + this.afAuth.auth.currentUser.uid)
      .snapshotChanges()
      .map(changes => {
        return { key: changes.key, ...changes.payload.val() };
      });
  } 
  


  save(usuario:any){
    return new Promise((resolve, reject) => {

            this.afDb.list(this.PATH)
              .update(usuario.key, {name: usuario.name, cpf: usuario.cpf})
              .then(()=> resolve())
              .catch((e)=> reject(e));
      
    });

}


updatePontos(usuario:any){
  return new Promise((resolve, reject) => {

          this.afDb.list(this.PATH)
            .update(usuario.key, { pontos: usuario.pontos})
            .then(()=> resolve())
            .catch((e)=> reject(e));
    
  });

}




}