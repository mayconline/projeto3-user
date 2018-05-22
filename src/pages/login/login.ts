import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';






@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public form: FormGroup;

  constructor( private authService: AuthServiceProvider, private toast: ToastController,
    public navCtrl: NavController, public navParams: NavParams, private formBuilder:FormBuilder) {
      this.createForm();
  }


  createForm(){
    this.form = this.formBuilder.group({

      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required]]

    }); 
   }

   onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value)
        .then(() => {
          //this.toast.create({ message: 'Seja Bem vindo', duration: 3000 }).present();
          //this.navCtrl.setRoot('TabsPage');
        })
        
        .catch((error: any) => {
          let toast = this.toast.create({ duration: 3000, position: 'bottom' });
          if (error.code == 'auth/invalid-email') {
            toast.setMessage('e-mail invalido');
          } else if (error.code == 'auth/user-disabled') {
            toast.setMessage('usuário desativado');
          } else if (error.code == 'auth/user-not-found') {
            toast.setMessage('usuário não cadastrado');
          } else if (error.code == 'auth/wrong-password') {
            toast.setMessage('senha errada');
          }
toast.present();    
                        });
    }
}




// Funcoes de Navegacao //
registrese(){
    this.navCtrl.push('RegistroPage');

  };

 irResetPage(){

  this.navCtrl.push('ResetSenhaPage');   

 } 

}
