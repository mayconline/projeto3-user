import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';




@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  
  voltarLogin(){
    this.navCtrl.push('LoginPage');
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

}
