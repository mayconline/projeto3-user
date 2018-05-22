import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { NgForm } from '@angular/forms';




@IonicPage()
@Component({
  selector: 'page-reset-senha',
  templateUrl: 'reset-senha.html',
})
export class ResetSenhaPage {

userEmail:string ='';
@ViewChild('form') form: NgForm;

  constructor( private authService: AuthServiceProvider, private toast: ToastController,
    public navCtrl: NavController, public navParams: NavParams) {
  }


  resetPassword(){
  if(this.form.form.valid){
    let toast =  this.toast.create({ duration: 3000, position: 'bottom' });
  this.authService.resetPassword(this.userEmail)
  .then(() => { 
        toast.setMessage('Email de Redefinição de Senha Enviado para seu email')
        toast.present();
        this.navCtrl.pop();
    })
  .catch((error:any) =>{
    if (error.code == 'auth/invalid-email') {
      toast.setMessage('O e-mail digitado não é valido.');
    } else if (error.code == 'auth/user-not-found') {
      toast.setMessage('O usuário não foi encontrado.');
    }

toast.present();

  });
}

  }

  

}
