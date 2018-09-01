import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalNotasPage } from './modal-notas';

@NgModule({
  declarations: [
    ModalNotasPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalNotasPage),
  ],
})
export class ModalNotasPageModule {}
