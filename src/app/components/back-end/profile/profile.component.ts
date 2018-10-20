import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { userUpload, User } from '../../../models/users';
import { ImageCroppedEvent } from 'ngx-image-cropper/src/image-cropper.component';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponentAdmin implements OnInit {

  user                  : User
  u                     : userUpload
  edit                  = false;
  activeButton          = false;

  imageChangedEvent     : any = '';
  croppedImage          : any = '';
  cropperReady          = false;


  selectedFiles: FileList | null;
  submit = 'Submit'
  loader = false

  public options: Object = {
    charCounterCount: true,
    // Set the image upload parameter.
    imageUploadParam: 'image_param',

    // Set the image upload URL.
    imageUploadURL: 'assets/upload_image',

    // Additional upload params.
    imageUploadParams: { id: 'my_editor' },

    // Set request type.
    imageUploadMethod: 'POST',

    // Set max image size to 5MB.
    imageMaxSize: 5 * 1024 * 1024,

    // Allow to upload PNG and JPG.
    imageAllowedTypes: ['jpeg', 'jpg', 'png', 'svg', 'gif'],
    events: {
      'froalaEditor.initialized': function () {
        console.log('initialized');
      },
      'froalaEditor.image.beforeUpload': function (e, editor, images) {
        //Your code 
        if (images.length) {
          // Create a File Reader.
          const reader = new FileReader();
          // Set the reader to insert images when they are loaded.
          reader.onload = (ev) => {
            const result = ev.target['result'];
            editor.image.insert(result, null, null, editor.image.get());
            console.log(ev, editor.image, ev.target['result'])
          };
          // Read image as base64.
          reader.readAsDataURL(images[0]);
        }
        // Stop default upload chain.
        return false;
      }

    },


    // Set the video upload parameter.
    videoUploadParam: 'video_param',

    // Set the video upload URL.
    videoUploadURL: 'assets/upload_video',

    // Additional upload params.
    videoUploadParams: { id: 'my_video_editor' },

    // Set request type.
    videoUploadMethod: 'POST',

    // Set max video size to 50MB.
    videoMaxSize: 50 * 1024 * 1024,

    // Allow to upload PNG and JPG.
    videoAllowedTypes: ['mp4', 'avi', 'flv', 'wmv', 'mov'],
    viseoEvents: {
      'froalaEditor.initialized': function () {
        console.log('initialized');
      },
      'froalaEditor.video.beforeUpload': function (e, editor, videos) {
        //Your code 
        if (videos.length) {
          // Create a File Reader.
          const reader = new FileReader();
          // Set the reader to insert videos when they are loaded.
          reader.onload = (ev) => {
            const result = ev.target['result'];
            editor.video.insert(result, null, null, editor.video.get());
            console.log(ev, editor.video, ev.target['result'])
          };
          // Read video as base64.
          reader.readAsDataURL(videos[0]);
        }
        // Stop default upload chain.
        return false;
      }

    }
  }

  constructor(
    public  auth        : AuthService,
    private UserService : UserService
  ) { }

  ngOnInit() {
    this.auth.user.subscribe(user => this.user = user)
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
    if (this.user.uid) {
      this.submit = 'Saving '
      this.loader = true

      console.log(this.croppedImage);
      

      this.UserService.saveProfile(a, this.croppedImage, this.user.uid)
  
      // const file = this.selectedFiles;
      // if (file && file.length === 1) {
      //   this.u = new userUpload(file.item(0));
      //   this.UserService.saveProfileWithImage(this.u, a, this.user.uid)
      // } else {
        
      // }
    }
  }


}
