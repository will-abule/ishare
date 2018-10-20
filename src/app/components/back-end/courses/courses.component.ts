import { Courses } from '../../../models/courses';
import { CoursesService } from '../../../services/courses.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {

  Courses            :   Courses[]
  filteredCourses    :   Courses[]
  sub                :   Subscription
  p                  :   number = 1

  constructor(private courses: CoursesService) { }

  ngOnInit() {
    this.sub = this.courses.getCourses2().subscribe(p => this.Courses = this.filteredCourses = p)
  }

  filter(query:string ) {
    this.filteredCourses = (query) ?
     this.Courses.filter(p => p.title.toLowerCase().includes(query.toLowerCase())):
     this.Courses
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}

