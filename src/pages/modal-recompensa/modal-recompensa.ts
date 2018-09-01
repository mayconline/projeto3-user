import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { VendasProvider } from '../../providers/vendas/vendas';
import * as moment from 'moment';
import { Subscription } from 'rxjs/Subscription';
 

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
  dataResgate:any;
  ptbr = moment.locale('pt-br');
  mesResgate:any;
  anoResgate:any;



  constructor( private toast: ToastController,
    private afAuth:AngularFireAuth, private authService:AuthServiceProvider, private formBuilder:FormBuilder,
    public navCtrl: NavController, public navParams: NavParams, 
    public view: ViewController, 
    private resgateService:VendasProvider) {
   
     this.formDate();
   
     

  }


  formDate(){
    this.dataResgate = moment.locale('pt-br');
   this.dataResgate = moment().toJSON();
   this.mesResgate = moment().format('MMMM');
   this.anoResgate = moment().format('YYYY')
  }


 
 
  
  
  createForm(){
    this.form = this.formBuilder.group({

      prodKey:[this.prod.key],
      prodNome:[this.prod.nome, [Validators.required]],
      status:['Solicitado'],
      pontosProd: [this.prod.pontos],
      dataResgate:[this.dataResgate],
      url:[this.prod.url],
      dias:[this.prod.dias],
      mesResgate:[this.mesResgate],
      anoResgate:[this.anoResgate]
      
    }); 
   }



  

//subscrever para pegar dados dos usuarios
user$:Subscription;
userinfo$:Subscription;
obterUser() {
this.user$ =  this.afAuth.authState.subscribe(firebaseUser => {
    if (firebaseUser) {
    this.userinfo$ =   this.authService.getUserInfo().subscribe(userData => {
        this.user = userData;


      })
    } else {
      this.user = {};
    }
  })

}



//metodo de criar / editar //

onSubmit(){
  if(this.form.valid){
    
      this.resgateService.save(this.form.value)
        .then(()=> {
            this.toast.create({ message: 'Resgate Efetuado com Sucesso', duration: 3000}).present();
            //this.navCtrl.push('TabsPage');
            this.navCtrl.pop();
        })
        .catch((e)=>{
            this.toast.create({ message: 'Ocorreu um erro, favor tentar novamente', duration:3000}).present();
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


  
ionViewWillUnload(){
  this.user$.unsubscribe();
  this.userinfo$.unsubscribe();
 
}
   

  

}
