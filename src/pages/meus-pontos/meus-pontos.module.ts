import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeusPontosPage } from './meus-pontos';

@NgModule({
  declarations: [
    MeusPontosPage,
  ],
  imports: [
    IonicPageModule.forChild(MeusPontosPage),
  ],
})
export class MeusPontosPageModule {}
