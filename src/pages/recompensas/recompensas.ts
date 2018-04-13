import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ModalController } from 'ionic-angular';

/**
 * Generated class for the RecompensasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recompensas',
  templateUrl: 'recompensas.html',
})
export class RecompensasPage {
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App, public modal: ModalController) {
   
 
  }


  Pontos(){
    this.navCtrl.push('MeusPontosPage');
 }

 meuResgate(){
  this.navCtrl.push('MeusResgatesPage');
 }

  voltarLogin(){
    
    this.app.getRootNav().setRoot( 'LoginPage' );
     
   }



   produtos =  [{
    nome:'Produto 1',
    ponto:100
  } ,
  {
    nome:'Produto 2',
    ponto:50
  } ];
  
  
   
   abrirModal(produto){
   
      const meuModal = this.modal.create('ModalRecompensaPage', {data:produto})
      meuModal.present();
      
   }
  
   

  ionViewDidLoad() {
    console.log('produtos');
  }

}
