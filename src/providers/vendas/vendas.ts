
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthServiceProvider } from '../auth-service/auth-service';


/*
  Generated class for the VendasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VendasProvider {

  
  user:any;
  private PATH = 'resgates/';

  constructor( private afDb: AngularFireDatabase, private afAuth: AngularFireAuth, private authService: AuthServiceProvider) {
    this.obterUser();
    }



    getUserAll(){
    
      return this.afDb.list(this.PATH ,  ref=> ref.orderByChild('status').equalTo('Solicitado'))
      .snapshotChanges()
      .map(changes =>{
          return changes.map(u =>({ key: u.payload.key,...u.payload.val() }));
    
    
      })
    }

    getUserAllEntregue(){
    
      return this.afDb.list(this.PATH,  ref=> ref.orderByChild('status').equalTo('Entregue'))
      .snapshotChanges()
      .map(changes =>{
          return changes.map(u =>({ key: u.payload.key,...u.payload.val() }));
    
    
      })
    }

    

    getUserProd(){
    
      return this.afDb.list(this.PATH , ref=> ref.orderByChild('Userkey').equalTo(this.afAuth.auth.currentUser.uid))
      .snapshotChanges()
      .map(changes =>{
          return changes.map(u =>({ key: u.payload.key,...u.payload.val() }));
    
    
      })
    }



    trocarStatus(resgate:any){
      return new Promise((resolve, reject) => {
    
              this.afDb.list(this.PATH)
                .update(resgate.key, {status: resgate.status})
                .then(()=> resolve())
                .catch((e)=> reject(e));
        
      });
    
    }


// atualiza pontos do usuario ao resgatar um produto 
    atualizaPonto(user:any){
      return new Promise((resolve, reject) => {
    
              this.afDb.list('userProfile/')
                .update(this.user.key, {pontos: this.user.pontos})
                .then(()=> resolve())
                .catch((e)=> reject(e));
        
      });
    
    };


    calcPontos(pontosProd){
      
      return this.user.pontos = this.user.pontos - pontosProd

    };
//
  

//resgata o produto //
    save(resgate:any){
      return new Promise((resolve, reject) => {
        this.calcPontos(resgate.pontosProd);
        this.atualizaPonto(this.user);

              this.afDb.list(this.PATH)
               
              
              .push({
                Userkey:this.user.key,
                prodNome: resgate.prodNome,
                prodKey: resgate.prodKey,
                userNome: this.user.name,
                status: resgate.status,
                pontosProd: resgate.pontosProd,
                 
                                

               })
                .then(()=> resolve())
               
        
      });
  
  }


  remove(key:string){
    return this.afDb.list(this.PATH).remove(key)

  } 


//obtem os dados do usuario //
  obterUser(){
    this.afAuth.authState.subscribe(firebaseUser =>{
   if(firebaseUser){
     const usuarioLogado = this.authService.getUserInfo().subscribe(userData =>{
       this.user = userData;
      
      
      
     })
   }else {
     this.user = {};
   }
 })

} 
  
  
  
  


}


