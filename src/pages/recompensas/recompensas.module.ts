import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecompensasPage } from './recompensas';
import { ModalRecompensaPageModule } from '../modal-recompensa/modal-recompensa.module';


@NgModule({
  declarations: [
    RecompensasPage,
  ],
  imports: [
    IonicPageModule.forChild(RecompensasPage),
    ModalRecompensaPageModule
  
  ],
})
export class RecompensasPageModule {}
