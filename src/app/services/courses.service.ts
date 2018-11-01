import { Upload, Courses } from '../models/courses';
import { FirestoreService } from './firestore.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { NotifyService } from "./notify.service";
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({providedIn: 'root'})
export class CoursesService {

  basePath  =   'courses';

  constructor(
    private afs     : FirestoreService,
    private router  : Router,
    private notify  : NotifyService,
    private storage : AngularFireStorage
  ) { }


    getCourse(id: string) : Observable<Courses> {
      return this.afs.doc$(`${this.basePath}/${id}`)
    }

    getCourses2() : Observable<Courses[]> {
      return this.afs.colWithIds$(this.basePath, ref =>{
        return ref.orderBy('title', 'asc')
      })
    }

    getCourses(id) : Observable<Courses[]> {
      return this.afs.colWithIds$(this.basePath, ref =>{
        return ref.where('project', '==', id).orderBy('createdAt', 'asc')
      })
    }

    deleteCourse(Courses, id) {

      this.deleteFileData(id)
      .then( () => {
        this.deleteFileStorage(Courses.name);
      })
      .catch((error) => this.handleError(error));
    }



  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  saveCourse(Courses: Upload, c) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    text;
    const fileUrl = `${Courses.file.name + text}`
    
    const uploadTask = this.storage.upload(`${this.basePath}/${fileUrl}`, Courses.file )
    .then(() => {
      const ref = this.storage.ref(`${this.basePath}/${fileUrl}`);
      const downloadURL = ref.getDownloadURL().subscribe(url => { 
        const Url = url; 
        const data = {
          title              :   c.title,
          url                :   Url,
          name               :   Courses.file.name,
          body               :   c.body,
          videoUrl           :   c.videoUrl,
          project            :   c.project
        } 
        if (Url) {
          return this.saveFileData(data)
        } else {
          console.error('No download URL!');
          this.notify.update('Upload failed!', 'error')
        }
      })
    })
  }


  saveCourseNew(Url, c) {
    const data = {
      title              :   c.title,
      url                :   Url,
      body               :   c.body,
      videoUrl           :   c.videoUrl,
      project            :   c.project
    } 
    if (Url) {
      return this.saveFileData(data)
    } else {
      console.error('No download URL!');
      this.notify.update('Upload failed!', 'error')
    }
  }


  // Executes the file uploading to firebase
  updateCourse(Courses, id) {
    this.updateFileData(Courses, id)
  }

  // Writes the file details to the realtime db Document
  private saveFileData(Courses: Courses) {
   
    return this.afs.add(this.basePath, Courses)
    .then( () => {
      this.notify.update('Posted', 'success')
      this.router.navigate(['/admin/courses'])
    })
    .catch(err => this.handleError(err))

  }
  


  // Writes the file details to the realtime db Document
  private updateFileData(Courses : Courses, id) {
        
    return this.afs.update(`${this.basePath}/${id}`, Courses)
    .then( () => {
      this.notify.update('Updated', 'success')
      this.router.navigate(['/admin/courses'])
    })
    .catch(err => this.handleError(err))
  }


  // Writes the file details to the realtime db
  private deleteFileData(id) {

    return this.afs.delete(`${this.basePath}/${id}`)
    .then( () => {
      this.notify.update('Deleted', 'error')
      this.router.navigate(['/admin/courses'])
    })
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error')
  }

}