 
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class UsuariosProvider {

  constructor(private afDb:AngularFireDatabase) {
    
  }

  private PATH = 'userProfile/'


  getUserAll(){
    
    return this.afDb.list(this.PATH, ref=> ref.orderByChild('name'))
    .snapshotChanges()
    .map(changes =>{
        return changes.map(u =>({ key: u.payload.key,...u.payload.val() }));
  
  
    })
  }
  


  save(usuario:any){
    return new Promise((resolve, reject) => {

            this.afDb.list(this.PATH)
              .update(usuario.key, {name: usuario.name, cpf: usuario.cpf, pontos: usuario.pontos, role:usuario.role})
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

getUserCpf(){
    
  return this.afDb.list(this.PATH)
  .snapshotChanges()
  .map(changes =>{
      return changes.map(u =>({ key: u.payload.key,...u.payload.val().cpf }));


  })
}


}