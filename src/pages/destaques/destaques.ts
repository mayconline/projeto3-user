import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DestaquesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-destaques',
  templateUrl: 'destaques.html',
})
export class DestaquesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  logout(){
    this.navCtrl.push('LoginPage');
  }
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad DestaquesPage');
  }

}
