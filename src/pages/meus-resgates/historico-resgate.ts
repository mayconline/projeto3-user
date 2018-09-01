import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { VendasProvider } from '../../providers/vendas/vendas';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { Subscription } from 'rxjs/Subscription';


@IonicPage()
@Component({
  selector: 'page-historico-resgate',
  templateUrl: 'historico-resgate.html',
})
export class HistoricoResgatePage {
  user: any = {};

  resgates: Observable<any>;
  entregues: any;
  status: any = "solicitados"

  ptbr = moment.locale('pt-br');
  dataHoje: any;
  mesHoje:any;
  keyuserAtual = this.afAuth.auth.currentUser.uid;

 
  constructor(private afAuth: AngularFireAuth, private resgateService: VendasProvider,
    public authService: AuthServiceProvider, private toast: ToastController,
    public navCtrl: NavController, public navParams: NavParams,
    public modal: ModalController) {

    this.dataAtual();
    this.contar(this.mesHoje);
    this.contarAguardando(this.mesHoje);
    this.contarEntregue(this.mesHoje);
  
  
  }



  date:boolean = false;
  clickDate(){
    this.date = !this.date;
  }

  searchBarOpen:boolean = false;
 
  barClick(){
    this.searchBarOpen = !this.searchBarOpen;
  
   
  }

  dataAtual() {

    this.dataHoje = moment.locale('pt-br');

    this.dataHoje =  moment().toJSON();
    this.mesHoje = moment().format('MMMM');
    this.anoHoje = moment().format('YYYY');
    //console.log(this.mesHoje)

  
  }

  

  armeses = ['janeiro', 'fevereiro', 'março','abril', 'maio',
  'junho','julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  
  anoHoje:any;
  anos =['2018', '2019', '2020','2021'];

  abrirModal(resgate: Observable<any>) {

    const meuModal = this.modal.create('ModalResgatePage', { resgate: resgate })
    meuModal.present();
 
  }




  removerResgate(key: string) {
    this.resgateService.remove(key)
      .then(() => {

        this.toast.create({ message: 'Removido com Sucesso', duration: 3000 }).present();

      })
      .catch((e) => {

        this.toast.create({ message: 'Falha ao remover ', duration: 3000 }).present();
        console.error(e);

      })
  }


  //subscriber para pegar os dados do usuario
  user$:Subscription;
  userinfo$:Subscription;
   obterUser() {
  this.user$ =  this.afAuth.authState.subscribe(firebaseUser => {
      if (firebaseUser) {
      this.userinfo$ =  this.authService.getUserInfo().subscribe(userData => {
          this.user = userData;
          


        })
      } else {
        this.user = {};
      }
    })

  }

 



//metodos de contar elementos por filtro //
  private subsS:Subscription;   // metodo pra dar subscribe e unsubscribe depois //
    contar(input){
    //array
     this.subsS =  this.resgateService.getUserAll()
    //acessa o Observable
     .subscribe( x =>  this.items = x
        //filtra por dentro do Obervable
                .filter(x => x.status === 'Solicitado' && x.mesResgate === input && x.Userkey===this.keyuserAtual).length
    ) 
  }

items;


private subsA:Subscription;
contarAguardando(input){
  //array
   this.subsA = this.resgateService.getUserAll()
  //acessa o Observable
   .subscribe( x =>  this.contAguard = x
      //filtra por dentro do Obervable
              .filter(x => x.status === 'Aguardando' && x.mesResgate === input && x.Userkey===this.keyuserAtual).length
  )
}

contAguard;

private subsE:Subscription;
contarEntregue(input){
  //array
   this.subsE =  this.resgateService.getUserAll()
  //acessa o Observable
   .subscribe( x =>  this.contEntregue = x
      //filtra por dentro do Obervable
              .filter(x => x.status === 'Entregue' && x.mesResgate === input && x.Userkey===this.keyuserAtual).length
  )
}

contEntregue;




 //inicializa as funcoes

  ionViewWillLoad() {
  this.resgates = this.resgateService.getUserAll();
  this.entregues = this.resgateService.getUserAllEntregue();
  this.obterUser();
   
  
  }


  ionViewWillUnload(){
    this.subsA.unsubscribe();
    this.subsE.unsubscribe();
    this.subsS.unsubscribe();
    this.user$.unsubscribe();
    this.userinfo$.unsubscribe();  
  
  } 

   // searchbar solicitado//

   getRes(ev: any) {
    // Reset items back to all of the items
    this.resgates = this.resgateService.getUserAll();
    

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.resgates = this.resgates
        .map(pessoaList => pessoaList.filter((v) => {
           
               return v.prodNome.toLowerCase().indexOf(val.toLowerCase())!== -1;
              
            
        }));
     
    }
  } // searchbar selecione solicitado //

   // searchbar  finalizados//

   getFim(ev: any) {
    // Reset items back to all of the items
    this.entregues = this.resgateService.getUserAllEntregue();

   

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.entregues = this.entregues
        .map(entrelist => entrelist.filter((v) => {
           
               return v.prodNome.toLowerCase().indexOf(val.toLowerCase())!== -1;
              
            
        }));
     
    }
  } // searchbar selecione user //io


}



// funcao pra contar quantos tem status igual a valor //
/*
contarSolicitado(input){
  const ent = this.resgates = this.resgateService.getUserAll();
  
  const c =   ent.map( x => {

    return x.map(u =>({ 
      
      Status: u.status
    
    }).Status

  );
  })
  
    if(input =='Solicitado') {  c.subscribe( x => this.resultS = x.filter(x=>x==input).length )  }
      else if
      (input =='Aguardando') {  c.subscribe( x => this.resultA = x.filter(x=>x==input).length )  }
      else if
      (input =='Entregue') {  c.subscribe( x => this.resultE = x.filter(x=>x==input).length )  }
 
}

  resultS;
  resultA;
  resultE;
 
  inputS = 'Solicitado'
  inputA = 'Aguardando'
  inputE = 'Entregue'
  */



  

 // infinity scroll

  /*
  ionViewDidEnter() {
  this.resgates = this.resgateService.historicos$
  this.resgateService.nextPage().pipe(take(1)).subscribe();
    
  
  }
    

  
  doInfinite(infiniteScroll): Promise<void> { 
    if (!this.resgateService.finished) { 
       return new Promise((resolve, reject) => {
          this.resgateService.nextPage() 
             .pipe(take(1))
             .subscribe(movies => {
             
                resolve();
             });
       });
    }
    return Promise.resolve();
 }


 doRefresh(refresher) {
 
  
  

  setTimeout(() => {
    
   
    refresher.complete();
  }, 2000);
}
*/

  //