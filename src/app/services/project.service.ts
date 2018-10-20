import { Upload, Project } from '../models/project';
import { FirestoreService } from './firestore.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { NotifyService } from "./notify.service";
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({providedIn: 'root'})
export class ProjectService {

  basePath  =   'project';

  constructor(
    private afs     : FirestoreService,
    private router  : Router,
    private notify  : NotifyService,
    private storage : AngularFireStorage
  ) { }


    getProject(id: string) : Observable<Project> {
      return this.afs.doc$(`${this.basePath}/${id}`)
    }

    getProjects() : Observable<Project[]> {
      return this.afs.colWithIds$(this.basePath, ref =>{
        return ref.orderBy('updatedAt', 'desc')
      })
    }

    deleteProject(Lesson, id) {

      this.deleteFileData(id)
      .then( () => {
        this.deleteFileStorage(Lesson.name);
      })
      .catch((error) => this.handleError(error));
    }



  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  saveProject(Project: Upload, p) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    text;
    const fileUrl = `${Project.file.name + text}`
    
    const uploadTask = this.storage.upload(`${this.basePath}/${fileUrl}`, Project.file )
    .then(() => {
      const ref = this.storage.ref(`${this.basePath}/${fileUrl}`);
      const downloadURL = ref.getDownloadURL().subscribe(url => { 
        const Url = url; 
        const data = {
          title              :   p.title,
          discription        :   p.discription,
          url                :   Url,
          projectUrl         :   p.projectUrl,
          name               :   Project.file.name,
          type               :   'project'
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

  saveProjectNew(Url, p) {
    const data = {
      title              :   p.title,
      discription        :   p.discription,
      url                :   Url,
      projectUrl         :   p.projectUrl,
      type               :   'project'
    };
    if (Url) {
      return this.saveFileData(data)
    } else {
      console.error('No download URL!');
      this.notify.update('Upload failed!', 'error')
    }
  }


  // Executes the file uploading to firebase
  updateProject(Project, id) {
    this.updateFileData(Project, id)
  }

  // Writes the file details to the realtime db Document
  private saveFileData(Project: Project) {

    const data: Project = {
      // name          :   Project.name,
      title         :   Project.title,
      url           :   Project.url,
      projectUrl    :   Project.projectUrl,
      discription   :   Project.discription,
      type          :   'project'
    };

    console.log(data)
   
    return this.afs.add(this.basePath,data)
    .then( () => {
      this.notify.update('Posted', 'success')
      this.router.navigate(['/admin/projects'])
    })
    .catch(err => this.handleError(err))
  }
  


  // Writes the file details to the realtime db Document
  private updateFileData(Project: Project, id) {
  
    const data = {
      title         :   Project.title,
      projectUrl    :   Project.projectUrl,
      discription   :   Project.discription
    };
        
    return this.afs.update(`${this.basePath}/${id}`,data)
    .then( () => {
      this.notify.update('Updated', 'success')
      this.router.navigate(['/admin/projects'])
    })
    .catch(err => this.handleError(err))
  }


  // Writes the file details to the realtime db
  private deleteFileData(id) {

    return this.afs.delete(`${this.basePath}/${id}`)
    .then( () => {
      this.notify.update('Deleted', 'error')
      this.router.navigate(['/admin/projects'])
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