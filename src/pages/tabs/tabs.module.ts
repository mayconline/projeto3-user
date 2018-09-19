import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';


import { DestaquesPageModule } from '../destaques/destaques.module';

import { RecompensasPageModule } from '../recompensas/recompensas.module';
import { UsuariosPageModule } from '../usuarios/usuarios.module';
import { HistoricoResgatePageModule } from '../meus-resgates/historico-resgate.module';



@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
    UsuariosPageModule,
    DestaquesPageModule,
    RecompensasPageModule,
    HistoricoResgatePageModule
  ]
})
export class TabsPageModule {}
