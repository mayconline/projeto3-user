import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { UsuariosProvider } from '../../providers/usuarios/usuarios';
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

  constructor( private usuarioProvider:UsuariosProvider, private afAuth:AngularFireAuth,
    private authService:AuthServiceProvider,
    public navCtrl: NavController, public navParams: NavParams) {

     
     this.obterUser();

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


  editarUser(usuario:any){
    this.navCtrl.push('EditarUsuarioPage', {usuario:usuario});

  }







  

}
