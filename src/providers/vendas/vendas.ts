
import { Injectable } from '@angular/core';
import { AngularFireDatabase /*, AngularFireList */} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs/Subscription';
import { AuthServiceProvider } from '../auth-service/auth-service';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
//import { Observable } from 'rxjs/Observable';
//import { tap, map, take } from 'rxjs/operators'

@Injectable()
export class VendasProvider {

  
  user:any;
  private PATH = 'resgates/';

  constructor( private afDb: AngularFireDatabase, private afAuth: AngularFireAuth,
     private authService: AuthServiceProvider) {
        
    this.obterUser();
    }


   /* ionViewDidEnter(){
      this.nextPage()
      .pipe(take(1))
      .subscribe();

    } */


    getUserAll(){
    
      return this.afDb.list(this.PATH,  ref=> ref.orderByChild('dataResgate'))
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
       // this.calcPontos(resgate.pontosProd);
      //  this.atualizaPonto(this.user);

              this.afDb.list(this.PATH)
               
              
              .push({
                Userkey:this.user.key,
                cpfUser:this.user.cpf,
                prodNome: resgate.prodNome,
                prodKey: resgate.prodKey,
                userNome: this.user.name,
                status: resgate.status,
                pontosProd: resgate.pontosProd,
                dataResgate: resgate.dataResgate, 
                url: resgate.url,
                dias:resgate.dias,
                mesResgate: resgate.mesResgate,
                anoResgate: resgate.anoResgate
              
         

                 
                                

               }) .then(()=> {
                 
                this.calcPontos(resgate.pontosProd);
                this.atualizaPonto(this.user);
                resolve()
              })
            
             
               
        
      });
  
  }


  remove(key:string){
    return this.afDb.list(this.PATH).remove(key)

  } 


//subscrever para pegar dados dos usuarios
user$:Subscription;
userinfo$:Subscription;
obterUser() {
this.user$ =  this.afAuth.authState.subscribe(firebaseUser => {
    if (firebaseUser) {
    this.userinfo$ =   this.authService.getUserInfo().subscribe(userData => {
        this.user = userData;


      })
    } else {
      this.user = {};
    }
  })

}


ionViewWillUnload(){
  this.user$.unsubscribe();
  this.userinfo$.unsubscribe();
  
}


  
  
/*
  // infity scroll historico de resgates //
  
  private _historicos$ = new BehaviorSubject<any[]>([]); // 1
   batch = 2; 
   lastKey = ''; 
   finished = false; 


   get historicos$(): Observable<any[]> {
    return this._historicos$.asObservable();
 }

 mapListKeys<T>(list: AngularFireList<T>): Observable<T[]> {
  return list
     .snapshotChanges()
     .map(actions => 
        actions.map(action => 
           ({ key: action.key, ...action.payload.val() })
        )
     );
}

private getMovies(batch: number, lastKey: string): // 1 e 2
Observable<any[]> 
{

   return this.mapListKeys<any>( // 3
      this.afDb.list<any>(this.PATH, ref => { // 4
         const query = ref
            .orderByKey()
            .limitToFirst(batch);

         return (this.lastKey) // 5
            ? query.startAt(this.lastKey) 
            : query;
       })
   );

}
 
nextPage(): Observable<any[]> {
  if (this.finished) { return this.historicos$; } // 1

  return this.getMovies(this.batch + 1, this.lastKey) // 2
     .pipe(
        tap(movies => {

           this.lastKey = movies[movies.length-1]['key']; // 3

           const newMovies = movies.slice(0, this.batch); // 4

           const currentMovies = this._historicos$.getValue(); // 5

           if ( this.lastKey == newMovies[newMovies.length-1]['key']) 
           { 
                this.finished = true;
           }

           this._historicos$.next(currentMovies.concat(newMovies)) }
        )
     )
}

*/

}

