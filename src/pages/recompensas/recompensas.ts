import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ModalController, ToastController } from 'ionic-angular';
import { RecompensasProvider } from '../../providers/recompensas/recompensas';
import { Observable } from 'rxjs/Observable';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-recompensas',
  templateUrl: 'recompensas.html',
})
export class RecompensasPage {
  
  recompensas: Observable<any>;
  user:any = {};

  constructor( private authService:AuthServiceProvider, private afAuth:AngularFireAuth,
    private recompProvider:RecompensasProvider, private toast: ToastController,
    public navCtrl: NavController, public navParams: NavParams, public app: App, public modal: ModalController) {
 
  }
  
  
  //navegação
 abrirModal(recompensa: Observable<any>){
   
    const meuModal = this.modal.create('ModalRecompensaPage', {recompensa:recompensa})
    meuModal.present();
    
 }


 irHistoricoResgate(){
   this.navCtrl.push('HistoricoResgatePage');
 }

 sair(){
  this.authService.logout();
}




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


  



 

 

  

   // searchbar //

   getItems(ev: any) {
    // Reset items back to all of the items
    this.recompensas = this.recompProvider.getAll();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.recompensas = this.recompensas
        .map(pessoaList => pessoaList.filter((v) => {
           
               return v.nome.toLowerCase().indexOf(val.toLowerCase()) !== -1;
            
        }));
     
    }
  } // searchbar //



 
  ionViewWillLoad(){
          //recupera e inicializa os itens do banco //
          this.recompensas = this.recompProvider.getAll();
          this.obterUser();

  } 

}
