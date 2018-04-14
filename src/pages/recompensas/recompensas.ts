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
   this.initializeItems();
 
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



    
   
  nome: string = '';
  produtos: any;

  initializeItems() {
  
    this.produtos =  [{
      nome:'Carro',
      ponto:100
    } ,
    {
      nome:'Blusa',
      ponto:50
    } ];
  
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.produtos = this.produtos.filter((produto) => {
        return (produto.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }



   abrirModal(produto){
   
      const meuModal = this.modal.create('ModalRecompensaPage', {data:produto})
      meuModal.present();
      
   }
  
   

  ionViewDidLoad() {
    console.log('produtos');
  }

}
