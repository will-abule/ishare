import { Category } from '../models/category';
import { FirestoreService } from './firestore.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { NotifyService } from "./notify.service";

 @Injectable({providedIn: 'root'})
export class CategoryService {

  basePath  =   'category';

  constructor(
    private afs     : FirestoreService,
    private router  : Router,
    private notify  : NotifyService
  ) { }


    getCategory(id: string) : Observable<Category> {
      return this.afs.doc$(`${this.basePath}/${id}`)
    }

    getCategories() : Observable<Category[]> {
      return this.afs.colWithIds$(this.basePath, ref =>{
        return ref.orderBy('title', 'asc')
      })
    }

    getCategories2(id) : Observable<Category[]> {
      return this.afs.colWithIds$(this.basePath, ref =>{
        return ref.where('category', '==', id).orderBy('updatedAt', 'asc')
      })
    }

    deleteCategory(category, id) {

      this.deleteFileData(id)
      .catch((error) => this.handleError(error));
    }



  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  saveCategory(Category) {
    this.saveFileData(Category)
  }


  // Executes the file uploading to firebase
  updateCategory(Category, id) {
    this.updateFileData(Category, id)
  }

  // Writes the file details to the realtime db Document
  private saveFileData(Category: Category) {

    const data : Category = {
      title     :   Category.title,
      url       :   Category.url,
    };

    // console.log(data)
   
    return this.afs.add(this.basePath,data)
    .then( () => {
      this.notify.update('Posted', 'success')
      this.router.navigate(['/admin/categories'])
    })
    .catch(err => this.handleError(err))

  }
  


  // Writes the file details to the realtime db Document
  private updateFileData(Category : Category, id) {
  
    const data : Category = {
      title     :   Category.title,
      url       :   Category.url,
    };
        
    return this.afs.update(`${this.basePath}/${id}`,data)
    .then( () => {
      this.notify.update('Updated', 'success')
      this.router.navigate(['/admin/categories'])
    })
    .catch(err => this.handleError(err))
  }


  // Writes the file details to the realtime db
  private deleteFileData(id) {

    return this.afs.delete(`${this.basePath}/${id}`)
    .then( () => {
      this.notify.update('Deleted', 'error')
      this.router.navigate(['/admin/categories'])
    })
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error')
  }

}