import { Courses } from '../../../models/courses';
import { CoursesService } from '../../../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/project.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  Courses       : Courses
  id            : string
  Projects      : Observable<Project[]>
  activeButton  = false;
  public markdownContent: string = ``;
  
  constructor(
    private CoursesService    : CoursesService,
    private route             : ActivatedRoute,
    private router            : Router,
    private ProjectService    : ProjectService
  ) {
    this.id = this.route.snapshot.paramMap.get('id')
   }

   ngOnInit() {
    // this.category = this.CategoryService.getCategory(this.id).take(1).subscribe(p => this.category = p)
    this.Projects = this.ProjectService.getProjects();
    this.CoursesService.getCourse(this.id).pipe(take(1)).subscribe((p) => {
      this.Courses = p,
      this.markdownContent = p.body
    })
    
  }

  delete(p){
    this.CoursesService.deleteCourse(p,this.id)
  }

  cancel(){
    this.router.navigate(['/admin/courses'])
  }

  save(p){
    this.CoursesService.updateCourse(p,this.id)
  }


}