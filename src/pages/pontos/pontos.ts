import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { PontosProvider } from '../../providers/pontos/pontos';



@IonicPage()
@Component({
  selector: 'page-pontos',
  templateUrl: 'pontos.html',
})
export class PontosPage {

  keyuserAtual = this.afAuth.auth.currentUser.uid;

  usuarios:Observable<any>;
  notas:Observable<any>;
  constructor( private afAuth: AngularFireAuth,
    private pontosProvider:PontosProvider,
    private toast:ToastController,
    public navCtrl: NavController, public navParams: NavParams,
  public modal:ModalController) {

   
  }


  searchBarOpen:boolean = false;
  hideBackButton:boolean = false;

  barClick(){
    this.searchBarOpen = !this.searchBarOpen;
    this.hideBackButton = !this.hideBackButton;
  }
 
// crud //



viewNota(nota: Observable<any>) {

  const meuModal = this.modal.create('ModalNotasPage', { nota:nota })
  meuModal.present();

}

  
  

  // searchbar historico//

  getHist(ev: any) {
    // Reset items back to all of the items
    
    this.notas = this.pontosProvider.getAllNome();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.notas = this.notas
        .map(notaList => notaList.filter((v) => {
           
               return v.nota.toLowerCase().indexOf(val.toLowerCase()) !== -1;
            
        }));
     
    }
  } // searchbar //



 
  ionViewWillLoad(){
          //recupera e inicializa os itens do banco //
          
     
      this.notas = this.pontosProvider.getAllNome();
    
  } 

  

}
