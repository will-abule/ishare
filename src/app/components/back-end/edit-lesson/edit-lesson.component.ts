import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { Lesson } from '../../../models/lesson';
import { Observable } from 'rxjs';
import { LessonService } from '../../../services/lesson.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css']
})
export class EditLessonComponent implements OnInit {

  Lesson        : Lesson
  Categories    : Observable<Category[]>;
  id            : string
  activeButton  = false;
  public markdownContent: string = ``;
  
  constructor(
    private LessonService     : LessonService,
    private CategoryService   : CategoryService,
    private route             : ActivatedRoute,
    private router            : Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id')
   }

   ngOnInit() {
    this.Categories = this.CategoryService.getCategories();

    this.LessonService.getLesson(this.id).pipe(take(1)).subscribe((p) => {
      this.Lesson = p
      this.markdownContent = p.body
    })
  }

  delete(p){
    this.LessonService.deleteLesson(p,this.id)
  }

  cancel(){
    this.router.navigate(['/admin/lessons'])
  }

  save(p){
    this.LessonService.updateLesson(p,this.id)
  }


}