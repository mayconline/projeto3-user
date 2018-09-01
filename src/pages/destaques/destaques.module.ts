import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DestaquesPage } from './destaques';
import { PontosPageModule } from '../pontos/pontos.module';
import { UsuariosPageModule } from '../usuarios/usuarios.module';


@NgModule({
  declarations: [
    DestaquesPage,
  ],
  imports: [
    IonicPageModule.forChild(DestaquesPage),
    PontosPageModule,
    UsuariosPageModule
   
  ],
})
export class DestaquesPageModule {}
