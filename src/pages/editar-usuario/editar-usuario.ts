import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
@IonicPage()
@Component({
  selector: 'page-editar-usuario',
  templateUrl: 'editar-usuario.html',
})
export class EditarUsuarioPage {
  usuario:any;
  form: FormGroup;
  pontos:number;
 

  constructor(private usuarioProvider:UsuariosProvider, private formBuilder:FormBuilder,
    public navCtrl: NavController, public navParams: NavParams, private toast:ToastController) {

    this.usuario = this.navParams.data.usuario || {};
    this.pontos = this.navParams.data.usuario.pontos;
    this.createForm();
    }


    private createForm() {
      this.form = this.formBuilder.group({
        key:[this.usuario.key],
        name: [this.usuario.name, [Validators.required] ],
        cpf: [this.usuario.cpf, [Validators.required] ],
        pontos:[this.pontos],
        role:[this.usuario.role]
      });

      
    }


  

    onSubmit(){
      if(this.form.valid){
          this.usuarioProvider.save(this.form.value)
            .then(()=> {
                this.toast.create({ message: 'Perfil Editado', duration: 3000}).present();
                this.navCtrl.pop();
            })
            .catch((e)=>{
                this.toast.create({ message: 'Falha ao gravar os dados', duration:3000}).present();
                console.error(e);
            })
      }
  }  
  

  

}
