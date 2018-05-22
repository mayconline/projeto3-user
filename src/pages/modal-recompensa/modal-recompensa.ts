import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { VendasProvider } from '../../providers/vendas/vendas';



/**
 * Generated class for the ModalRecompensaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-recompensa',
  templateUrl: 'modal-recompensa.html',
})
export class ModalRecompensaPage {

 

  prod:any;
  user:any = {}; 
  form:FormGroup;
  status:any;
  constructor( private toast: ToastController,
    private afAuth:AngularFireAuth, private authService:AuthServiceProvider, private formBuilder:FormBuilder,
    public navCtrl: NavController, public navParams: NavParams, public view: ViewController, private resgateService:VendasProvider) {

    
  }

  
  createForm(){
    this.form = this.formBuilder.group({

      prodKey:[this.prod.key],
      prodNome:[this.prod.nome, [Validators.required]],
      status:['Solicitado'],
      pontosProd: [this.prod.pontos]

    }); 
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


//metodo de criar / editar //

onSubmit(){
  if(this.form.valid){
      this.resgateService.save(this.form.value)
        .then(()=> {
            this.toast.create({ message: 'Recompensa Adicionada', duration: 3000}).present();
            this.navCtrl.pop();
        })
        .catch((e)=>{
            this.toast.create({ message: 'Falha ao gravar os dados', duration:3000}).present();
            console.error(e);
        })
  }
}  

   

  fechar(){
    this.view.dismiss();
  };

  irHistorico(){
    this.navCtrl.setRoot('HistoricoResgatePage');
  };
  
  ionViewWillLoad() {

   this.obterUser();      
  
this.prod = this.navParams.data.recompensa || {};
this.createForm();





  }


  
   

  

}
