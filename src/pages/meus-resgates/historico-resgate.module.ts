import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricoResgatePage } from './historico-resgate';

import { ModalResgatePageModule } from '../modal-resgate/modal-resgate.module';


@NgModule({
  declarations: [
    HistoricoResgatePage,
  ],
  imports: [
    IonicPageModule.forChild(HistoricoResgatePage),
   ModalResgatePageModule,

  ],
})
export class HistoricoResgatePageModule {}
