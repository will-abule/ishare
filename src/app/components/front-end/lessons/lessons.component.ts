import { take } from 'rxjs/operators';
import { LessonService } from '../../../services/lesson.service';
import { Observable, of } from 'rxjs';
import { Lesson } from '../../../models/lesson';
import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

  value : number
  Lesson : Observable<Lesson[]>
  showSpinner = true;
  defaultImage = 'assets/loading.gif';
  offset = 100;
  p: number = 1;

  constructor(
    private LessonService   : LessonService,
    private seo             : SeoService
  ) { }

  ngOnInit() {
    this.Lesson = this.LessonService.getLessons();

    this.Lesson.subscribe((x) => {
      this.showSpinner = false;
    });

    this.Lesson.subscribe(e => this.value = e.length )

    this.seo.generateTags({
      title: 'Lessons', 
      description: 'Detailed easy and well defined written code to help you build Awesome! apps.', 
      image: 'https://teamishare.com/assets/img/iSharelogo.png',
      slug: 'lessons'
    })
  }

}
