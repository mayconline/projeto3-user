import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';




/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App) {
  }

 

  voltarLogin(){
    
  
   this.app.getRootNav().setRoot( 'LoginPage' );
    
  
  }
  

 
 ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

}
