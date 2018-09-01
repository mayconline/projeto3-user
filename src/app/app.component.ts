import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs/Subscription';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any
  user$:Subscription;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, afAuth: AngularFireAuth) {

  
  this.user$ =  afAuth.authState.subscribe(user=>{
        if(user){
          this.rootPage = 'TabsPage'
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
    });
  }

  ionViewWillUnload(){
    this.user$.unsubscribe();
   
    
  }
  

}

