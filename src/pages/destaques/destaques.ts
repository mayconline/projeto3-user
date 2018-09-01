import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ModalController } from 'ionic-angular';
import { RecompensasProvider } from '../../providers/recompensas/recompensas';
import { Observable } from 'rxjs/Observable';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { NewsProvider } from '../../providers/news/news';
import { Subscription } from 'rxjs/Subscription';



@IonicPage()
@Component({
  selector: 'page-destaques',
  templateUrl: 'destaques.html',
})
export class DestaquesPage {
  noticias:Observable<any>;
  recompensas: Observable <any>;
  user:any ={};


  constructor( private afAuth:AngularFireAuth,
     private recompProvider:RecompensasProvider, private authService:AuthServiceProvider,
    public navCtrl: NavController, public navParams: NavParams, public app: App,
  private newservice:NewsProvider,
  public modal: ModalController) {}

 
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

 

 
   sair(){ 
 
    this.authService.logout();
  }
 
  irPontos(){
    this.navCtrl.push('PontosPage')
  }

  irPerfil(){
    this.navCtrl.push('UsuariosPage')
  }


  abrirModal(recompensa: Observable<any>){
   
    const meuModal = this.modal.create('ModalRecompensaPage', {recompensa:recompensa})
    meuModal.present();
    
 }

ionViewWillLoad(){
  //recupera e inicializa os itens do banco //

  this.recompensas = this.recompProvider.getDestaque();
  
  this.noticias = this.newservice.getAll();

  this.obterUser(); 
 

} 

ionViewWillUnload(){
  this.user$.unsubscribe();
  this.userinfo$.unsubscribe();
  
}


}
