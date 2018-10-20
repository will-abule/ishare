import { AuthService } from './auth.service';
import { User } from '../models/users';
import { FirestoreService } from './firestore.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router'
import { NotifyService } from "./notify.service";
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class UserService {

  basePath = 'users';

  constructor(
    private afs: FirestoreService,
    private auth: AuthService,
    private router: Router,
    private notify: NotifyService,
    private route: ActivatedRoute,
    private storage: AngularFireStorage
  ) { }


  getUser(id: string): Observable<User> {
    return this.afs.doc$(`${this.basePath}/${id}`)
  }

  getUsers(): Observable<User[]> {
    return this.afs.colWithIds$(this.basePath, ref => {
      return ref.orderBy('updatedAt', 'desc')
    })
  }

  getUsers2(id): Observable<User[]> {
    return this.afs.colWithIds$(this.basePath, ref => {
      return ref.where('category', '==', id).orderBy('updatedAt', 'asc')
    })
  }

  getTeamMembers(id): Observable<User[]> {
    return this.afs.colWithIds$(this.basePath, ref => {
      return ref.where('team', '==', true).orderBy('createdAt', 'asc')
    })
  }

  addToTeam(u) {
    this.addTeam(u)
  }

  removeFromTeam(u) {
    this.removeTeam(u)
  }

  makeSuperAdmin(userData) {
    const id = userData.uid
    return this.superAdmin(userData, id)
      .catch((error) => this.handleError(error));
  }

  makeAdmin(userData) {
    const id = userData.uid
    return this.admin(userData, id)
      .catch((error) => this.handleError(error));
  }

  makeSubscriber(userData: User) {
    const id = userData.uid
    return this.subscriber(userData, id)
      .catch((error) => this.handleError(error));
  }

  makeSubscriber2(userData: User) {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'
    localStorage.setItem('returnUrl', returnUrl)

    const id = userData.uid
    return this.subscriber2(userData, id)
      .catch((error) => this.handleError(error));
  }

  makeUser(userData) {
    const id = userData.uid
    return this.user(userData, id)
      .catch((error) => this.handleError(error));
  }

  makeGuest(userData) {
    const id = userData.uid
    return this.guest(userData, id)
      .catch((error) => this.handleError(error));
  }

  deleteUser(User, id) {

    this.deleteFileData(id)
      .catch((error) => this.handleError(error));
  }


  saveProfileWithImage(Photo, p, uid) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    text;
    const fileUrl = `${Photo.file.name + text}`

    const uploadTask = this.storage.upload(`${this.basePath}/${fileUrl}`, Photo.file)
      .then(() => {
        const ref = this.storage.ref(`${this.basePath}/${fileUrl}`);
        const downloadURL = ref.getDownloadURL().subscribe(url => {
          const Url = url;
          const data = {
            displayName: p.displayName,
            discription: p.discription,
            url: Url,
            uid: uid
          };
          if (Url) {
            return this.saveFileData(data)
          } else {
            console.error('No download URL!');
            this.notify.update('Upload failed!', 'error')
          }
        })
      })
  }

  saveProfile(p, url, uid) {
    const data = {
      displayName: p.displayName,
      url        : url,
      discription: p.discription,
      uid: uid
    };
    this.saveFileData(data)
  }

  private saveFileData(profile) {

    if (profile.url) {
      const data = {
        displayName: profile.displayName,
        discription: profile.discription,
        url: profile.url
      };

      console.log(data)

      return this.afs.update(`${this.basePath}/${profile.uid}`, data)
        .then(() => {
          this.notify.update('Profile Updated!', 'success')
          this.router.navigate(['/'])
        })
        .catch(err => this.handleError(err))
    } else {
      const data = {
        displayName: profile.displayName,
        discription: profile.discription,
      };

      console.log(data)

      return this.afs.update(`${this.basePath}/${profile.uid}`, data)
        .then(() => {
          this.notify.update('Profile Updated!', 'success')
          this.router.navigate(['/'])
        })
        .catch(err => this.handleError(err))
    }
  }


  private addTeam(u) {

    const path = `${this.basePath}/${u.uid}`

    const data = {
      team: true
    }
    return this.afs.update(path, data)
      .then(() => {
        this.notify.update(`${u.displayName} has been Added to team!`, 'success')
        this.router.navigate(['/'])
      })
      .catch((error) => this.handleError(error));
  }


  private removeTeam(u) {

    const path = `${this.basePath}/${u.uid}`

    const data = {
      team: false
    }
    return this.afs.update(path, data)
      .then(() => {
        this.notify.update(`${u.displayName} has been removed from team members!`, 'error')
        this.router.navigate(['/'])
      })
      .catch((error) => this.handleError(error));
  }

  private admin(userData: User, id) {

    const path = `${this.basePath}/${id}`

    const data: User = {
      uid: id,
      email: userData.email || null,
      displayName: userData.displayName || userData.email || 'Nameless User',
      roles: {
        admin: true,
      }
    }
    return this.afs.update(path, data)
      .then(() => {
        this.notify.update('User Role has been updated to an Admin!', 'success')
        this.router.navigate(['/'])
      })
      .catch((error) => this.handleError(error));

  }

  // Writes the file details to the realtime db Document
  private superAdmin(userData: User, id) {

    const path = `${this.basePath}/${id}`

    const data: User = {
      uid: id,
      email: userData.email || null,
      displayName: userData.displayName || userData.email || 'Nameless User',
      roles: {
        superAdmin: true
      }
    }
    return this.afs.update(path, data)
      .then(() => {
        this.notify.update('User Role has been updated to a Super Admin!', 'success')
        this.router.navigate(['/'])
      })
      .catch((error) => this.handleError(error));
  }

  private subscriber(userData: User, id) {

    const path = `${this.basePath}/${id}`

    const data: User = {
      uid: id,
      email: userData.email || null,
      displayName: userData.displayName || userData.email || 'Nameless User',
      roles: {
        users: true,
        subscriber: true,
      }
    }
    return this.afs.update(path, data)
      .then(() => {
        this.auth.user.subscribe(user => {
          if (user) {

            const returnUrl = localStorage.getItem('returnUrl')
            this.router.navigateByUrl(returnUrl);
            this.notify.update('User Role has been updated to a Subscriber!', 'success')
          }
        })
      })
      .catch((error) => this.handleError(error));

  }

  private subscriber2(userData: User, id) {

    const path = `${this.basePath}/${id}`

    const data: User = {
      uid: id,
      email: userData.email || null,
      displayName: userData.displayName || userData.email || 'Nameless User',
      roles: {
        users: true,
        subscriber: true,
      }
    }
    return this.afs.update(path, data)
      .then(() => {
        this.auth.user.subscribe(user => {
          if (user) {
            const returnUrl = localStorage.getItem('returnUrl')
            this.router.navigateByUrl(returnUrl);
            this.notify.update('Welcome to iShare! ', 'success');
          }
        })

        this.notify.update('User Role has been updated to a Subscriber!', 'success')
        this.router.navigate(['/'])
      })
      .catch((error) => this.handleError(error));

  }

  private guest(userData: User, id) {

    const path = `${this.basePath}/${id}`

    const data: User = {
      uid: id,
      email: userData.email || null,
      displayName: userData.displayName || userData.email || 'Nameless User',
      roles: {
        guest: true,
      }
    }

    return this.afs.update(path, data)
      .then(() => {
        this.notify.update('User Role has been updated to a Guest!', 'success')
        this.router.navigate(['/'])
      })
      .catch((error) => this.handleError(error));
  }

  private user(userData: User, id) {

    const path = `${this.basePath}/${id}`

    const data: User = {
      uid: id,
      email: userData.email || null,
      displayName: userData.displayName || userData.email || 'Nameless User',
      roles: {
        users: true,
      }
    }

    return this.afs.update(path, data)
      .then(() => {
        this.notify.update('User Role has been updated to a Non Subscriber!', 'success')
        this.router.navigate(['/'])
      })
      .catch((error) => this.handleError(error));
  }

  // Writes the file details to the realtime db
  private deleteFileData(id) {

    return this.afs.delete(`${this.basePath}/${id}`)
      .then(() => {
        this.notify.update('Deleted', 'error')
        this.router.navigate(['/admin/users'])
      })
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error')
  }

}