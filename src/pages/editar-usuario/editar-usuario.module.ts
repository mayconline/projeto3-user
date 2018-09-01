import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarUsuarioPage } from './editar-usuario';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    EditarUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarUsuarioPage),
    BrMaskerModule
  ],
})
export class EditarUsuarioPageModule {}
