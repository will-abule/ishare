import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/project.service';
import { Observable } from 'rxjs';
import { CoursesService } from '../../../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Upload } from '../../../models/courses';
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  selectedFiles         : FileList | null;
  Courses               : Upload;
  file;
  Projects              : Observable<Project[]>
  activeButton          = false;

  imageChangedEvent     : any = '';
  croppedImage          : any = '';
  cropperReady          = false;
  
  public markdownContent: string = ``;
  
  constructor(
    private router           : Router, 
    private CoursesService   : CoursesService,
    private ProjectService   : ProjectService
  ) { }

  ngOnInit() {
    this.Projects = this.ProjectService.getProjects();
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
      // this.Courses = new Upload(file.item(0));
      this.CoursesService.saveCourseNew(this.croppedImage, l,)
    } else {
      console.error('No file found!');
    }
  }

  cancel(){
    this.router.navigate(['/admin/courses'])
  }
}