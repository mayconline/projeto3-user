import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsuariosPage } from './usuarios';
import { EditarUsuarioPageModule } from '../editar-usuario/editar-usuario.module';

@NgModule({
  declarations: [
    UsuariosPage,
  ],
  imports: [
    IonicPageModule.forChild(UsuariosPage),
    EditarUsuarioPageModule
  ],
})
export class UsuariosPageModule {}
