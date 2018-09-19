//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { OneSignal, OSNotificationPayload} from '@ionic-native/onesignal';

import {oneSignalAppId, senderId} from '../../onesigConfig';


@Injectable()
export class OnesignalProvider {

  constructor(public oneSignal:OneSignal) {
  
  }

  private onPushReceived(payload:OSNotificationPayload){
    alert('push received' + payload.body);
  }

  private onPushOpened(payload:OSNotificationPayload){
    alert('push opened' + payload.body);
  }

  init(){

  

      this.oneSignal.startInit( oneSignalAppId, senderId );
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
      
      this.oneSignal.handleNotificationReceived().subscribe(() => { 

          data=> this.onPushReceived(data.payload);
       
       });
    
       this.oneSignal.handleNotificationOpened().subscribe(() => {
        data => this.onPushOpened(data.notification.payload);
      });
       
    
      this.oneSignal.endInit();
    

    }
 





}
