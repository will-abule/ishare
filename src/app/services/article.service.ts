import { Upload, Article } from '../models/article';
import { FirestoreService } from './firestore.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { NotifyService } from "./notify.service";
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({providedIn: 'root'})
export class ArticleService {

  basePath  =   'article';

  constructor(
    private afs     : FirestoreService,
    private router  : Router,
    private notify  : NotifyService,
    private storage : AngularFireStorage
  ) { }


    getArticle(id: string) : Observable<Article> {
      return this.afs.doc$(`${this.basePath}/${id}`)
    }

    getArticles() : Observable<Article[]> {
      return this.afs.colWithIds$(this.basePath, ref =>{
        return ref.orderBy('updatedAt', 'desc')
      })
    }

    getUserArticles(id) : Observable<Article[]> {
      return this.afs.colWithIds$(this.basePath, ref =>{
        return ref.where('uid', '==', id).orderBy('updatedAt', 'desc')
      })
    }

    deleteArticle(Article, id) {

      this.deleteFileData(id)
      .then( () => {
        this.deleteFileStorage(Article.name);
      })
      .catch((error) => this.handleError(error));
    }



  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  saveArticle(Article: Upload, a) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    text;
    const fileUrl = `${Article.file.name + text}`
    
    const uploadTask = this.storage.upload(`${this.basePath}/${fileUrl}`, Article.file )
    .then(() => {
      const ref = this.storage.ref(`${this.basePath}/${fileUrl}`);
      const downloadURL = ref.getDownloadURL().subscribe(url => { 
        const Url = url; 
        const data = {
          title           :   a.title,
          discription     :   a.discription,
          url             :   Url,
          name            :   Article.file.name,
          body            :   a.body,
          author          :   a.author,
          uid             :   a.uid,
          type            :   'article'
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

  saveArticleNew(url, a, uid) {
    const data = {
      title           :   a.title,
      discription     :   a.discription,
      url             :   url,
      body            :   a.body,
      author          :   a.author,
      uid             :   uid,
      type            :   'article'
    } 
    if (url) {
      return this.saveFileData(data)
    } else {
      console.error('No download URL!');
      this.notify.update('Upload failed!', 'error')
    }
  }


  // Executes the file uploading to firebase
  updateArticle(Article, id) {
    this.updateFileData(Article, id)
  }

  // Writes the file details to the realtime db Document
  private saveFileData(Article) {
   
    return this.afs.add(this.basePath,Article)
    .then( () => {
      this.notify.update('Posted', 'success')
      this.router.navigate(['/admin/articles'])
    })
    .catch(err => this.handleError(err))

  }
  


  // Writes the file details to the realtime db Document
  private updateFileData(Article: Article, id) {
  
    const data = {
      title         :   Article.title,
      discription   :   Article.discription,
      author        :   Article.author,
      body          :   Article.body
    };
        
    return this.afs.update(`${this.basePath}/${id}`,data)
    .then( () => {
      this.notify.update('Updated', 'success')
      this.router.navigate(['/admin/articles'])
    })
    .catch(err => this.handleError(err))
  }


  // Writes the file details to the realtime db
  private deleteFileData(id) {

    return this.afs.delete(`${this.basePath}/${id}`)
    .then( () => {
      this.notify.update('Deleted', 'error')
      this.router.navigate(['/admin/articles'])
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