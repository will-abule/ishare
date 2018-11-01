import { Upload, Lesson } from '../models/lesson';
import { FirestoreService } from './firestore.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { NotifyService } from "./notify.service";
import { AngularFireStorage } from '@angular/fire/storage';

 @Injectable({providedIn: 'root'})
export class LessonService {

  basePath  =   'lesson';

  constructor(
    private afs     : FirestoreService,
    private router  : Router,
    private notify  : NotifyService,
    private storage : AngularFireStorage
  ) { }


    getLesson(id: string) : Observable<Lesson> {
      return this.afs.doc$(`${this.basePath}/${id}`)
    }

    getLessons() : Observable<Lesson[]> {
      return this.afs.colWithIds$(this.basePath, ref =>{
        return ref.orderBy('createdAt', 'desc')
      })
    }

    getLessonsWithId(id) : Observable<Lesson[]> {
      return this.afs.colWithIds$(this.basePath, ref =>{
        return ref.where('category', '==', id).orderBy('updatedAt', 'asc')
      })
    }

    deleteLesson(Lesson, id) {
      console.log(Lesson.name);

      this.deleteFileData(id)
      .then( () => {
        this.deleteFileStorage(Lesson.name);
      })
      .catch((error) => this.handleError(error));
    }



  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  saveLesson(Lesson: Upload, l: Lesson) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    text;
    const fileUrl = `${Lesson.file.name + text}`
    
    const uploadTask = this.storage.upload(`${this.basePath}/${fileUrl}`, Lesson.file )
    .then(() => {
      const ref = this.storage.ref(`${this.basePath}/${fileUrl}`);
      const downloadURL = ref.getDownloadURL().subscribe(url => { 
        const Url = url; 
        const data = {
          title              :   l.title,
          discription        :   l.discription,
          url                :   Url,
          name               :   Lesson.file.name,
          body               :   l.body,
          videoUrl           :   l.videoUrl,
          category           :   l.category,
          type               :   'lesson'
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

  saveLessonNew(url, l) {
    const data = {
      title              :   l.title,
      discription        :   l.discription,
      url                :   url,
      body               :   l.body,
      videoUrl           :   l.videoUrl,
      category           :   l.category,
      type               :   'lesson'
    } 
    if (url) {
      return this.saveFileData(data)
    } else {
      console.error('No download URL!');
      this.notify.update('Upload failed!', 'error')
    }
  }


  // Executes the file uploading to firebase
  updateLesson(Lesson, id) {
    this.updateFileData(Lesson, id)
  }

  // Writes the file details to the realtime db Document
  private saveFileData(Lesson: Lesson) {
   
    return this.afs.add(this.basePath,Lesson)
    .then( () => {
      this.notify.update('Posted', 'success')
      this.router.navigate(['/admin/lessons'])
    })
    .catch(err => this.handleError(err))
  }
  


  // Writes the file details to the realtime db Document
  private updateFileData(Lesson: Lesson, id) {
        
    return this.afs.update(`${this.basePath}/${id}`,Lesson)
    .then( () => {
      this.notify.update('Updated', 'success')
      this.router.navigate(['/admin/lessons'])
    })
    .catch(err => this.handleError(err))
  }


  // Writes the file details to the realtime db
  private deleteFileData(id) {

    return this.afs.delete(`${this.basePath}/${id}`)
    .then( () => {
      this.notify.update('Deleted', 'error')
      this.router.navigate(['/admin/lessons'])
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