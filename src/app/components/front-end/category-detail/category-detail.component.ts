import { LessonService } from '../../../services/lesson.service';
import { Observable, Subscription } from 'rxjs';
import { Lesson } from '../../../models/lesson';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit, OnDestroy {

  Lesson 
  filteredLesson = []
  showSpinner = true;
  defaultImage = 'assets/loading.gif';
  offset = 100;
  p: number = 1;
  id: string;
  sub:Subscription
  empty = false

  constructor(
    private LessonService  : LessonService,
    private route           : ActivatedRoute,
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')
      this.sub = this.LessonService.getLessonsWithId(this.id)
      .subscribe(l => this.Lesson = this.filteredLesson = l )
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}
