import { Observable } from 'rxjs';
import { FirestoreService } from './firestore.service';
import { About, Terms, Privacy } from '../models/settings';
import { Injectable } from '@angular/core';
import { NotifyService } from "./notify.service";

 @Injectable({providedIn: 'root'})
export class SettingsService {

  constructor(private afs: FirestoreService, private notify  : NotifyService) { }

  getAbout()    : Observable<About>{
    return this.afs.doc$('about/about')
  }

  updateAbout(About : About){
    this.updateAboutData(About)
  }


  getTerms()    : Observable<Terms>{
    return this.afs.doc$('terms/terms')
  }

  updateTerms(Terms : Terms){
    this.updateTermsData(Terms)
  }



  getPrivacy()    : Observable<Privacy>{
    return this.afs.doc$('privacy/privacy')
  }

  updatePrivacy(Privacy : Privacy){
    this.updatePrivacyData(Privacy)
  }



  private updateAboutData(About : About){
    this.afs.update('about/about',About)
    .then( () => {
      this.notify.update('Updated', 'success')
    })
    .catch(err => this.handleError(err))
  }


  private updateTermsData(Terms : Terms){
    this.afs.update('terms/terms',Terms)
    .then( () => {
      this.notify.update('Updated', 'success')
    })
    .catch(err => this.handleError(err))
  }

  private updatePrivacyData(Privacy : Privacy){
    this.afs.update('privacy/privacy',Privacy)
    .then( () => {
      this.notify.update('Updated', 'success')
    })
    .catch(err => this.handleError(err))
  }
  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error')
  }

}