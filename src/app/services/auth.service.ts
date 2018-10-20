import { User } from '../models/users'
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FirestoreService } from './firestore.service';
import { NotifyService } from "./notify.service";

@Injectable({ providedIn: 'root' })

export class AuthService {

  user: Observable<User | null>;
  data: User

  constructor(
    private afAuth: AngularFireAuth,
    private afs: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    private notify: NotifyService
  ) {

    this.user = this.afAuth.authState
      .pipe(
        switchMap((user) => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
      )
  }

  ////// OAuth Methods /////

  googleLogin() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'
    localStorage.setItem('returnUrl', returnUrl)

    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'
    localStorage.setItem('returnUrl', returnUrl)

    const provider = new firebase.auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'
    localStorage.setItem('returnUrl', returnUrl)

    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'
    localStorage.setItem('returnUrl', returnUrl)

    const provider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string, name: string) {

    const credential = firebase.auth.EmailAuthProvider.credential(email, password);

    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.user.sendEmailVerification()
        return this.setUserDoc(user.user, name); // if using firestore
      })
      // .catch((error) => this.handleError(error) );
      .catch((error) => {
        if (error.code == 'auth/account-exists-with-different-credential') {
          firebase.auth().currentUser.linkWithCredential(credential)
            .then((user) => {
              console.log("Account linking success", user);
              this.router.navigate(['/orders']);
            }, function (error) {
              console.log("Account linking error", error);
            });
        } else {
          this.handleError(error)
        }
      });
  }

  emailLogin(email: string, password: string) {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'
    localStorage.setItem('returnUrl', returnUrl)


    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        return this.setUserDoc2(user.user); // if using firestore
      })
      .catch((error) => this.handleError(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => {
        this.notify.update('Password update has been sent! Please check your email', 'success');
        this.router.navigate(['/login']);
      })
      .catch(error => this.handleError(error));
  }

  // Sends email allowing user to verify password
  reSend() {

    var user = firebase.auth().currentUser;

    return user.sendEmailVerification()
      .then(() => {
        this.notify.update('Verification code has been sent successfully to your mail! please verify your email', 'success')
        this.router.navigate(['/login']);
      })
      .catch(error => this.handleError(error));
  }

  // allowing user to sign out 
  signOut() {
    this.afAuth.auth.signOut()
      .then(() => {
        this.notify.update('Signing out was successfull!', 'success')
        this.router.navigate(['/']);
      });
  }

  private oAuthLogin(provider: firebase.auth.AuthProvider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.notify.update('Welcome to iShare!', 'success');

        this.updateUserData(credential.user);
        this.router.navigate(['/lessons']);
      })
      .catch((error) => {
        if (error.code == 'auth/account-exists-with-different-credential') {
          this.notify.update('An account already exists with the same email address, Click on forget password and reset your password ', 'error')
        } else {
          this.handleError(error)
        }
      });
  }




  // Sets user data to firestore after succesful login
  private setUserDoc(userData, name: string) {

    const userRef = this.afs.doc(`users/${userData.uid}`);

    const data: User = {
      uid: userData.uid,
      email: userData.email || null,
      veb: userData.emailVerified,
      displayName: name || userData.displayName || userData.email || 'Nameless User',
      roles: {
        users: true,
      }
    }

    return userRef.set(data)
      .then(() => {
        this.notify.update('An email verification was sent to your mail, please verify your email and Login', 'success');
        this.router.navigate(['/login']);
      })
      .catch((error) => this.handleError(error));
  }

  private setUserDoc2(userData) {

    const userRef = this.afs.doc(`users/${userData.uid}`);

    const data = {
      veb: userData.emailVerified,
    }
    return userRef.update(data)
      .then(() => {
        this.user.subscribe(user => {
          if (user) {
            const returnUrl = localStorage.getItem('returnUrl')
            this.router.navigateByUrl(returnUrl);
            this.notify.update('Welcome to iShare! ', 'success');
          }
        })
        // this.router.navigate(['/lessons']);
        // this.notify.update('Welcome to iShare! ', 'success');
      })
      .catch((error) => this.handleError(error));
  }

  // Sets user data to firestore after succesful login
  private updateUserData(userData) {

    const userRef = this.afs.doc(`users/${userData.uid}`);

    const data: User = {
      uid: userData.uid,
      email: userData.email || null,
      displayName: userData.displayName || userData.email || 'Nameless User',
      veb: userData.emailVerified,
      roles: {
        users: true,
      }
    }

    return userRef.set(data, { merge: true })
      .then(() => {
        this.router.navigate(['/lessons']);
      })
  }





  ///// Role-based Authorization //////
  users(user: User): boolean {
    const allowed = ['admin', 'users', 'subscriber', 'guest', 'superAdmin']
    return this.checkAuthorization(user, allowed)
  }

  guest(user: User): boolean {
    const allowed = ['admin', 'guest', 'subscriber', 'superAdmin']
    return this.checkAuthorization(user, allowed)
  }

  subscriber(user: User): boolean {
    const allowed = ['admin', 'subscriber', 'superAdmin']
    return this.checkAuthorization(user, allowed)
  }

  admin(user: User): boolean {
    const allowed = ['admin', 'superAdmin']
    return this.checkAuthorization(user, allowed)
  }
  superAdmin(user: User): boolean {
    const allowed = ['superAdmin']
    return this.checkAuthorization(user, allowed)
  }


  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true
      }
    }
    return false
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error')
  }

}