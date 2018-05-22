import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { PontosProvider } from '../../providers/pontos/pontos';

/**
 * Generated class for the PontosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pontos',
  templateUrl: 'pontos.html',
})
export class PontosPage {

  pontos:any = "Historico";

  usuarios:Observable<any>;
  notas:Observable<any>;
  constructor( private usuarioProvider: UsuariosProvider,
    private pontosProvider:PontosProvider,
    private toast:ToastController,
    public navCtrl: NavController, public navParams: NavParams) {

   
  }



// crud //



inserirPonto(usuario:any){
    this.navCtrl.push('InserirPontosPage', {usuario:usuario});

  }

  
   removerPonto(key:string){
     this.pontosProvider.remove(key)
       .then(()=>{

         this.toast.create({ message: 'Removido com Sucesso', duration:3000}).present();
         
       })
       .catch((e)=>{
         
         this.toast.create({ message: 'Falha ao remover ', duration:3000}).present();
         console.error(e);

       })
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
           
               return v.cpf.toLowerCase().indexOf(val.toLowerCase()) !== -1;
            
        }));
     
    }
  } // searchbar //



 
  ionViewWillLoad(){
          //recupera e inicializa os itens do banco //
          
     
      this.notas = this.pontosProvider.getAllNome();

  } 

  

}
