import { ProjectService } from '../../../services/project.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Upload } from '../../../models/project';
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  selectedFiles         : FileList | null;
  Project               : Upload;
  file;
  activeButton          = false;
  imageChangedEvent     : any = '';
  croppedImage          : any = '';
  cropperReady          = false;
  
  constructor(
    private router          : Router, 
    private ProjectService  : ProjectService
  ) { }

  ngOnInit() {
  }

  detectFiles($event) {
    this.selectedFiles = ($event.target as HTMLInputElement).files;
    this.imageChangedEvent = event;
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

  save(a) {
    const file = this.selectedFiles;
    if (file && file.length === 1) {
      this.Project = new Upload(file.item(0));
      this.ProjectService.saveProjectNew(this.croppedImage, a)
    } else {
      console.error('No file found!');
    }
  }

  cancel(){
    this.router.navigate(['/admin/projects'])
  }
}