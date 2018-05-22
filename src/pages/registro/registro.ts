import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';


import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';




@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  public form: FormGroup;
  

  constructor( private toast:ToastController, 
    public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
  private authService:AuthServiceProvider) {

    this.createForm();
  
  }


  private createForm() {
    this.form = this.formBuilder.group({
      
      name: [''],
      cpf: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      pontos:[0]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      let toast = this.toast.create({ duration: 3000, position: 'bottom' });

      this.authService.registrar(this.form.value)

        .then((user:any) => {
          user.sendEmailVerification();

          toast.setMessage('Usuário criado com sucesso.');
          toast.present();  



          this.navCtrl.setRoot('LoginPage');
        })
        
        .catch((error:any)=>{

          if (error.code  == 'auth/email-already-in-use') {
            toast.setMessage('O e-mail digitado já está em uso.');
          } else if (error.code  == 'auth/invalid-email') {
            toast.setMessage('e-mail invalido');
          } else if (error.code  == 'auth/operation-not-allowed') {
            toast.setMessage('Sem autorização para criar usuarios');
          } else if (error.code  == 'auth/weak-password') {
            toast.setMessage('Senha minima de 6 caracteres');
          }
    toast.present();
        });

    }
}








 /* async registrar(user: User){

    let toast = this.toast.create({ duration: 3000, position: 'bottom' });

    await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
    
    .then((user:any) =>{
    
      user.sendEmailVerification();

          toast.setMessage('Usuário criado com sucesso.');
          toast.present();  

        this.navCtrl.setRoot('LoginPage');
    })

    .catch((error:any)=>{

      if (error.code  == 'auth/email-already-in-use') {
        toast.setMessage('O e-mail digitado já está em uso.');
      } else if (error.code  == 'auth/invalid-email') {
        toast.setMessage('e-mail invalido');
      } else if (error.code  == 'auth/operation-not-allowed') {
        toast.setMessage('Sem autorização para criar usuarios');
      } else if (error.code  == 'auth/weak-password') {
        toast.setMessage('Senha minima de 6 caracteres');
      }
toast.present();
    });

    /*try{
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      if(result){
        this.navCtrl.push('LoginPage');
      }
    }
      catch(e){
        console.error(e);
      }


  }



  voltarLogin(){
    this.navCtrl.setRoot('LoginPage');
  } 
 */
}
