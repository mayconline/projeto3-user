import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecompensasPage } from './recompensas';
import { ModalRecompensaPageModule } from '../modal-recompensa/modal-recompensa.module';

import { HistoricoResgatePageModule } from '../meus-resgates/historico-resgate.module';


@NgModule({
  declarations: [
    RecompensasPage,
  ],
  imports: [
    IonicPageModule.forChild(RecompensasPage),
    ModalRecompensaPageModule,
    HistoricoResgatePageModule
  
  ],
})
export class RecompensasPageModule {}
