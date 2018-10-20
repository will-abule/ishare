import { switchMap } from 'rxjs/operators';
import { LessonService } from '../../../services/lesson.service';
import { Observable } from 'rxjs';
import { Lesson } from '../../../models/lesson';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShareButtons } from '@ngx-share/core';
import { take } from 'rxjs/operators';
import { SeoService } from '../../../services/seo.service';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit {

  Lesson        : Observable<Lesson>
  seoData 
  Lesson2       : Lesson;
  showSpinner   = true;
  defaultImage  = 'assets/loading.gif';
  offset        = 100;
  id            : string;
  player        : YT.Player;

  pageId
  url

  constructor(
    @Inject(DOCUMENT) private document: any,
    private LessonService   : LessonService,
    private route           : ActivatedRoute,
    public  share           : ShareButtons,
    private seo             : SeoService
  ) {
    this.pageId = this.url = this.document.location.href
   }

  ngOnInit() {
    this.seoData = this.route.params.pipe(switchMap(param => this.LessonService.getLesson(param['id'])))
    .pipe(
      take(1)
    ).subscribe(data => {
      this.seo.generateTags({
        title: data.title, 
        description: data.discription, 
        image: data.url, 
        slug: `lesson/${this.route.snapshot.paramMap.get('id')}`
      })
    })

    this.id = this.route.snapshot.paramMap.get('id')
    this.Lesson = this.route.params.pipe(switchMap(param => this.LessonService.getLesson(param['id'])))
    this.Lesson.subscribe((x) => {
      this.showSpinner = false;
    })
  }
 
  savePlayer (player) {
    this.player = player;
  }

  onStateChange(event){
    console.log('player state', event.data);
  }

}
