import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';
import { PerfilPageModule } from '../perfil/perfil.module';
import { DestaquesPageModule } from '../destaques/destaques.module';

@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
    PerfilPageModule,
    DestaquesPageModule
  ],
})
export class TabsPageModule {}
