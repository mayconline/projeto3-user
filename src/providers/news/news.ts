
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import { ToastController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';


@Injectable()
export class NewsProvider {

  private PATH = 'news/';

  constructor(private afDb: AngularFireDatabase, private fb:FirebaseApp,
  private toast:ToastController, private loadingCtrl: LoadingController) {
    
  }

  getAll(){
    
    return this.afDb.list(this.PATH, ref=> ref.orderByChild('titulo'))
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

 public save(noticia:any){
  return new Promise((resolve, reject) => {

    if(noticia.key) {
          this.afDb.list(this.PATH)
            .update(noticia.key, {titulo: noticia.titulo,
               descricao: noticia.descricao, 
               destaque: noticia.destaque,
               url:noticia.url, 
               fullPath:noticia.fullPath})
            .then(()=> resolve())
            .catch((e)=> reject(e));
    }else{
          this.afDb.list(this.PATH)
            .push({ titulo: noticia.titulo,
              descricao: noticia.descricao, 
              destaque: noticia.destaque,
              url:noticia.url, 
              fullPath:noticia.fullPath})
            .then(()=> resolve());
            


    }
  });

} //

//UP LOAD DA IMAGEM COM A RECOMPENSA //

public uploadAndSave(noticia: any, image:any) {
  

  return new Promise((resolve, reject) => {
   if (noticia.key) {
     this.save(noticia);
   } else {
 
      // chamando o loading
    let loading = this.loadingCtrl.create({
      content:'Salvando ...'
    });
    loading.present(); 
   
 
     let storageRef = this.fb.storage().ref();
     const filename = noticia.titulo 
     const basePath = `news/${filename}.jpg`
 
     noticia.fullPath = basePath
 
     const imageRef = storageRef.child(noticia.fullPath)
     
 
     imageRef.putString(image,firebase.storage.StringFormat.DATA_URL)
     
     
 
     .then((snapshot)=>{
   
      noticia.url = snapshot.downloadURL
      
 
      this.save(noticia);
      
       
      this.toast.create({ message: 'Noticia Adicionada', duration: 3000}).present();
      
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

 //

// remover a recompensa e a foto do storage

public remove( noticia:any) {
   
  return this.afDb.list(this.PATH).remove(noticia.key)
      .then(() => {
        this.removeFile(noticia.fullPath)
      });
  }

  public removeFile(fullPath: string) {
    let storageRef = this.fb.storage().ref();
    storageRef.child(fullPath).delete();
}

//

// colocar as recompensas em destaque //

getDestaque(){
    
  return this.afDb.list(this.PATH, ref=> ref.orderByChild('destaque').equalTo(true))
  .snapshotChanges()
  .map(changes =>{
      return changes.map(recomp =>({ key: recomp.payload.key,...recomp.payload.val() }));


  })
}

//


}
