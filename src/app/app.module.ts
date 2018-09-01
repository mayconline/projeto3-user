import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, LoadingController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera'

import {AngularFireModule } from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';


import { MyApp } from './app.component';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { LoginPageModule } from '../pages/login/login.module';
import { RecompensasProvider } from '../providers/recompensas/recompensas';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { UsuariosProvider } from '../providers/usuarios/usuarios';
import { PontosProvider } from '../providers/pontos/pontos';
import { VendasProvider } from '../providers/vendas/vendas';
import { NewsProvider } from '../providers/news/news';

@NgModule({
  declarations: [
    MyApp
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    LoginPageModule
  
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RecompensasProvider,
    AuthServiceProvider,
    UsuariosProvider,
    PontosProvider,
    VendasProvider,
    Camera,
    LoadingController,
    NewsProvider

  ]
})
export class AppModule {}
