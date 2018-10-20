import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import { Observable } from 'rxjs';
import { LessonService } from '../../../services/lesson.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Upload } from '../../../models/lesson';
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.css']
})
export class AddLessonComponent implements OnInit {

  selectedFiles         : FileList | null;
  Lesson                : Upload;
  file;
  Categories            : Observable<Category[]>
  activeButton          = false;
  imageChangedEvent     : any = '';
  croppedImage          : any = '';
  cropperReady          = false;
  public markdownContent: string = ``;
  
  constructor(
    private router          : Router, 
    private LessonService   : LessonService,
    private CategoryService : CategoryService
  ) { }

  ngOnInit() {
    this.Categories = this.CategoryService.getCategories();
  }

  detectFiles($event) {
    this.selectedFiles = ($event.target as HTMLInputElement).files;
    this.imageChangedEvent = $event;
  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }

  imageLoaded() {
    this.cropperReady = true;
  }
  
  loadImageFailed () {
    console.log('Load failed');
  }

  save(l) {
    const file = this.selectedFiles;
    if (file && file.length === 1) {
      // this.Lesson = new Upload(file.item(0));
      this.LessonService.saveLessonNew(this.croppedImage, l)
    } else {
      console.error('No file found!');
    }
  }

  cancel(){
    this.router.navigate(['/admin/lessons'])
  }
}