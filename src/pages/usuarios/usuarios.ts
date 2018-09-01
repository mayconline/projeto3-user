import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Subscription } from 'rxjs/Subscription';


import { AngularFireAuth } from 'angularfire2/auth';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the UsuariosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usuarios',
  templateUrl: 'usuarios.html',
})
export class UsuariosPage {

  
  user:any ={};

  constructor( private afAuth:AngularFireAuth,
    private authService:AuthServiceProvider,
    public navCtrl: NavController, public navParams: NavParams) {

     

  }


 
  //subscriber para pegar os dados do usuario
  user$:Subscription;
  userinfo$:Subscription;
   obterUser() {
  this.user$ =  this.afAuth.authState.subscribe(firebaseUser => {
      if (firebaseUser) {
      this.userinfo$ =  this.authService.getUserInfo().subscribe(userData => {
          this.user = userData;
          


        })
      } else {
        this.user = {};
      }
    })

  }


  editarUser(usuario:any){
    this.navCtrl.push('EditarUsuarioPage', {usuario:usuario});

  }

  ionViewWillLoad(){
    this.obterUser();
  }

  ionViewWillUnload(){
   
    this.user$.unsubscribe();
    this.userinfo$.unsubscribe();  
  
  } 



  

}
