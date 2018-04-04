import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { RegistroPageModule } from '../registro/registro.module';
import { TabsPageModule } from '../tabs/tabs.module';

@NgModule({
  declarations: [
    LoginPage
   
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    RegistroPageModule,
   TabsPageModule
  ],
})
export class LoginPageModule {}
