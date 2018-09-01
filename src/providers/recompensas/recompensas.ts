
import { Injectable } from '@angular/core';
import {AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';
import { LoadingController } from 'ionic-angular';
import { ToastController} from 'ionic-angular';



@Injectable()
export class RecompensasProvider {

    private PATH = 'recompensas/';
    
    
    
  constructor( private afDb: AngularFireDatabase, private fb:FirebaseApp,
  private toast:ToastController, private loadingCtrl: LoadingController) {
    
    
  }


  getAll(){
    
    return this.afDb.list(this.PATH, ref=> ref.orderByChild('nome'))
    .snapshotChanges()
    .map(changes =>{
        return changes.map(recomp =>({ key: recomp.payload.key,...recomp.payload.val() }));


    })
  }


  get(key:string){
    
    return this.afDb.object(this.PATH + key)
    .snapshotChanges()
    .map( recomp =>{   
      return {key: recomp.key, ...recomp.payload.val()}  ; 

    })

  }

// salvar e editar a recompensa //

 public save(recompensa:any){
    return new Promise((resolve, reject) => {

      if(recompensa.key) {
            this.afDb.list(this.PATH)
              .update(recompensa.key, {nome: recompensa.nome, pontos: recompensa.pontos, destaque: recompensa.destaque, url:recompensa.url, fullPath:recompensa.fullPath, dias:recompensa.dias})
              .then(()=> resolve())
              .catch((e)=> reject(e));
      }else{
            this.afDb.list(this.PATH)
              .push({ nome: recompensa.nome, pontos: recompensa.pontos, destaque: recompensa.destaque, url:recompensa.url, fullPath: recompensa.fullPath, dias:recompensa.dias})
              .then(()=> resolve());
              


      }
    });

}

//UP LOAD DA IMAGEM COM A RECOMPENSA //

public uploadAndSave(recompensa: any, image:any) {
  

 return new Promise((resolve, reject) => {
  if (recompensa.key) {
    this.save(recompensa);
  } else {

    // chamando o loading
    let loading = this.loadingCtrl.create({
      content:'Salvando ...'
    });
    loading.present(); 
   

    let storageRef = this.fb.storage().ref();
    const filename = recompensa.nome  
    const basePath = `recompensas/${filename}.jpg`

    recompensa.fullPath = basePath

    const imageRef = storageRef.child(recompensa.fullPath)
    

    imageRef.putString(image,firebase.storage.StringFormat.DATA_URL)
    
    

    .then((snapshot)=>{
  
     recompensa.url = snapshot.downloadURL
     

     this.save(recompensa);
     
      
     this.toast.create({ message: 'Recompensa Adicionada', duration: 3000}).present();

     //encerrando o loading
     loading.dismiss();
     

     
      }) 

      .catch((e)=>{
       this.toast.create({ message: 'Falha ao gravar os dados', duration:3000}).present();
       console.error(e);
       loading.dismiss();
        
    }) 


    
      
  }
});
}
 
// remover a recompensa e a foto do storage

  public remove( recompensa:any) {
   
  return this.afDb.list(this.PATH).remove(recompensa.key)
      .then(() => {
        this.removeFile(recompensa.fullPath)
      });
  }

  public removeFile(fullPath: string) {
    let storageRef = this.fb.storage().ref();
    storageRef.child(fullPath).delete();
}


// colocar as recompensas em destaque //

  getDestaque(){
    
    return this.afDb.list(this.PATH, ref=> ref.orderByChild('destaque').equalTo(true))
    .snapshotChanges()
    .map(changes =>{
        return changes.map(recomp =>({ key: recomp.payload.key,...recomp.payload.val() }));


    })
  }


  

}

