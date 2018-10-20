import { Article } from '../../../models/article';
import { ArticleService } from '../../../services/article.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  Article       : Article
  id            : string
  activeButton  = false;
  public markdownContent: string = ``;
  
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
    private ArticleService: ArticleService,
    private route : ActivatedRoute,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id')
   }

   ngOnInit() {
    // this.category = this.CategoryService.getCategory(this.id).take(1).subscribe(p => this.category = p)
    this.ArticleService.getArticle(this.id).pipe(take(1)).subscribe((p) => {
      this.Article = p
      this.markdownContent = p.body
    })
    
  }

  delete(p){
    this.ArticleService.deleteArticle(p,this.id)
  }

  cancel(){
    this.router.navigate(['/admin/ariticles'])
  }

  save(p){
    this.submit = 'loading '
    this.loader = true
    
    this.ArticleService.updateArticle(p, this.id)
  }


}