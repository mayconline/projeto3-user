import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
 
@IonicPage()
@Component({
  selector: 'page-modal-resgate',
  templateUrl: 'modal-resgate.html',
})
export class ModalResgatePage {
  
  resgate:any

  ptbr = moment.locale('pt-br');
  dataEntre:any;
  dataSolicitacao:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
  public view: ViewController) {
    this.dataEntrega();
    this.dataSoli();
    this.mesGo();
  //  console.log(this.mes);

  }

  dias:number = this.navParams.data.resgate.dias;
  mes:any;

  dataEntrega(){
   
    this.dataEntre = moment.locale('pt-br');
   //this.data = moment().format('L');
   this.dataEntre =   moment(this.navParams.data.resgate.dataResgate).add(this.dias,'days').calendar();
   
  
  }

  mesGo(){
    this.mes = moment(this.navParams.data.resgate.dataResgate).format('MMMM');
   
  }

   

  dataSoli(){
   
    this.dataSolicitacao = moment.locale('pt-br');
 
   this.dataSolicitacao =  moment(this.navParams.data.resgate.dataResgate).calendar();
  }


   


  fechar(){
    this.view.dismiss();
  };

  ionViewWillLoad() { 
    this.resgate = this.navParams.data.resgate || {};
  console.log(this.resgate)
  }

}
