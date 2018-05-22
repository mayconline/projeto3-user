import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalRecompensaPage } from './modal-recompensa';
import { HistoricoResgatePageModule } from '../meus-resgates/historico-resgate.module';

@NgModule({
  declarations: [
    ModalRecompensaPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalRecompensaPage),
    HistoricoResgatePageModule
  ],
})
export class ModalRecompensaPageModule {}
