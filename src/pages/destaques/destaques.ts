import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { RecompensasProvider } from '../../providers/recompensas/recompensas';
import { Observable } from 'rxjs/Observable';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { NewsProvider } from '../../providers/news/news';

/**
 * Generated class for the DestaquesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  private newservice:NewsProvider) {}

 
  
  
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

 

 
   sair(){
    this.authService.logout();
  }
 



ionViewWillLoad(){
  //recupera e inicializa os itens do banco //

  this.recompensas = this.recompProvider.getDestaque();
  
  this.noticias = this.newservice.getAll();

  this.obterUser(); 


} 


}
