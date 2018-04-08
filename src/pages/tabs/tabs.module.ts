import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';
import { PerfilPageModule } from '../perfil/perfil.module';
import { DestaquesPageModule } from '../destaques/destaques.module';
import { MeusPontosPageModule } from '../meus-pontos/meus-pontos.module';
import { RecompensasPageModule } from '../recompensas/recompensas.module';
import { MeusResgatesPageModule } from '../meus-resgates/meus-resgates.module';

@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
    PerfilPageModule,
    DestaquesPageModule,
    MeusPontosPageModule,
    RecompensasPageModule,
    MeusResgatesPageModule
    
  ],
})
export class TabsPageModule {}
