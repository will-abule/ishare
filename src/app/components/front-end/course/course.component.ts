import { CoursesService } from '../../../services/courses.service';
import { Observable } from 'rxjs';
import { Courses } from '../../../models/courses';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShareButtons } from '@ngx-share/core';
import { take } from 'rxjs/operators';
import { SeoService } from '../../../services/seo.service';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  Course       : Observable<Courses>
  showSpinner   = true;
  defaultImage  = 'assets/loading.gif';
  offset        = 100;
  id            : string;
  player        : YT.Player;
  seoData
  pageId
  url

  constructor(
    @Inject(DOCUMENT) private document: any,
    private CoursesService  : CoursesService,
    private route           : ActivatedRoute,
    public  share           : ShareButtons,
    private seo             : SeoService
  ) { 
    this.pageId = this.url = this.document.location.href
  }

  ngOnInit() {
    this.seoData = this.route.params.pipe(switchMap(param => this.CoursesService.getCourse(param['id'])))
    .pipe(
      take(1)
    ).subscribe(data => {
      this.seo.generateTags({
        title: data.title, 
        description: data.project, 
        image: data.url, 
        slug: `project/${data.project}/${this.route.snapshot.paramMap.get('id')}`
      })
    })


    this.id = this.route.snapshot.paramMap.get('id')
    this.Course = this.route.params.pipe(switchMap(param => this.CoursesService.getCourse(param['id'])))

    this.Course.subscribe((x) => {
      this.showSpinner = false;
    });
  }

   
  savePlayer (player) {
    this.player = player;
    console.log('Video Url', player.getVideoUrl())
    }
  onStateChange(event){
    console.log('player state', event.data);
  }

}
