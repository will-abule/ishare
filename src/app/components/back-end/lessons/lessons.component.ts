import { Lesson } from '../../../models/lesson';
import { LessonService } from '../../../services/lesson.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lesson',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonComponent implements OnInit, OnDestroy {

  Lesson            :   Lesson[]
  filteredLesson    :   Lesson[]
  sub                :   Subscription
  p                  :   number = 1

  constructor(private lesson: LessonService) { }

  ngOnInit() {
    this.sub = this.lesson.getLessons().subscribe(p => this.Lesson = this.filteredLesson = p)
  }

  filter(query:string ) {
    this.filteredLesson = (query) ?
     this.Lesson.filter(p => p.title.toLowerCase().includes(query.toLowerCase())):
     this.Lesson
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}

