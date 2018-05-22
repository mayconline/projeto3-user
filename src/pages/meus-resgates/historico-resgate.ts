import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { VendasProvider } from '../../providers/vendas/vendas';


@IonicPage()
@Component({
  selector: 'page-historico-resgate',
  templateUrl: 'historico-resgate.html',
})
export class HistoricoResgatePage {
  user:any = {};
  resgates:any;
  entregues:any;
  status:any = "solicitados"

  constructor( private afAuth:AngularFireAuth, private resgateService:VendasProvider,
    public authService:AuthServiceProvider, private toast:ToastController,
    public navCtrl: NavController, public navParams: NavParams) {  }



  sair(){
    this.authService.logout();
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

 



  ionViewWillLoad(){
    this.resgates = this.resgateService.getUserAll();
    this.entregues = this.resgateService.getUserAllEntregue();
    this.obterUser();
    
 
  }


}
