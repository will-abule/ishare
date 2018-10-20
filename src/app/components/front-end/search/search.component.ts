import { ArticleService } from './../../../services/article.service';
import { LessonService } from '../../../services/lesson.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  Lesson            :   any[]
  Article           :   any[]
  data              :   any[]
  filteredLesson    
  defaultImage      =   'assets/loading.gif';
  offset            =   100;
  p: number         =   1;
  touched           =   false

  constructor(private lesson: LessonService, private article : ArticleService) { 
    this.lesson.getLessons().subscribe(p => {this.Lesson = p})
    this.article.getArticles().subscribe(a => this.Article = a)
  }

  ngOnInit() {

  }

  filter(query:string ) {
    this.touched      = true
    
    this.data = this.Lesson.concat(this.Article)

    if (this.data) {

      this.filteredLesson = (query) ?
      this.data.filter(p => p.title.toLowerCase().includes(query.toLowerCase())):
      this.filteredLesson = [] = []
      
      if(query === "") {
        this.touched = false
      }
      
    }
  }

}

