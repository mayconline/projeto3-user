import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-modal-notas',
  templateUrl: 'modal-notas.html',
})
export class ModalNotasPage {

  nota:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public view:ViewController) {
  }




  fechar(){
    this.view.dismiss();
  };

  ionViewWillLoad() { 
    this.nota = this.navParams.data.nota || {};
   console.log(this.nota)
  }
}
