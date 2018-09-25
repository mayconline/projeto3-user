import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';




@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabsRoot = 'DestaquesPage'
  tabsRoot3 = 'HistoricoResgatePage'
  tabsRoot2 = 'RecompensasPage'
 
 


  constructor(public navCtrl: NavController, private afAuth:AngularFireAuth, private toast: ToastController) {}

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(user => {
      if(user){
        this.toast.create({
          message: ` Seja Bem Vindo : ${user.email}`,
          duration:3000
      }).present();


      } else {

        this.toast.create({
          message: `Deslogado com Sucesso `,
          duration:3000
      }).present();

      }
        
    });
  }

}
