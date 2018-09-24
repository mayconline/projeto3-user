import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs/Subscription';

import { OnesignalProvider } from '../providers/onesignal/onesignal';
import {isCordovaAvailable} from '../cordovaHabilitado';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any
  user$:Subscription;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, afAuth: AngularFireAuth,
  oneSignalProvider:OnesignalProvider ) {

    
 
  
  this.user$ =  afAuth.authState.subscribe(user=>{
        if(user){
          this.rootPage = 'TabsPage';
        } else{
          this.rootPage = 'LoginPage'
        }
    });

  


    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //statusBar.styleDefault();

      //statusBar.overlaysWebView(true);
      statusBar.backgroundColorByHexString('#8A2BE2');
      splashScreen.hide();

      if(isCordovaAvailable()){  oneSignalProvider.init();
       // oneSignalProvider.enviarTag("uid_user","123");
      // oneSignalProvider.testeEnvio();
        
      //  oneSignalProvider.deleteTag("user_type");
        //obtem o id do usuario//
       // oneSignalProvider.obterOneUserId();
        //envio de mensagem pasando id e a mensagem //
      //oneSignalProvider.enviarOneSig();
      }
    
      
    });
  }

  ionViewWillUnload(){
    this.user$.unsubscribe();
   
    
  }

 
  


}

