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
 

   obterOneUserId(){
     this.oneSignal.getPermissionSubscriptionState().then(data=> {

      data.permissionStatus.hasPrompted;
      data.permissionStatus.status;
      data.subscriptionStatus.subscribed;
      data.subscriptionStatus.userSubscriptionSetting;
      data.subscriptionStatus.pushToken;

      var OneID = data.subscriptionStatus.userId;
      alert('id do usuario'+ OneID );


     })
     .catch((e)=>e);

      
     
   }

   // metodo para enviar mensagem onesignal

   enviarOneSig( oneID, mensagem){
    //this.oneSignal.getIds().then(data=>{
       
      var notificationObj = {
        contents:{en: mensagem },
        include_player_ids: [oneID]   
      }
      this.oneSignal.postNotification(notificationObj);

    // })
    // .catch((e)=>e);
   }




}
