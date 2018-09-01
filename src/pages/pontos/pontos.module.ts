import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PontosPage } from './pontos';
import { ModalNotasPageModule } from '../modal-notas/modal-notas.module';


@NgModule({
  declarations: [
    PontosPage,
  ],
  imports: [
    IonicPageModule.forChild(PontosPage),
    ModalNotasPageModule

  ]
  
})
export class PontosPageModule {}
