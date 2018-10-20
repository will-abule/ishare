import { Article } from './../../../models/article';
import { ArticleService } from './../../../services/article.service';
import { Observable } from 'rxjs';
import { Project } from '../../../models/project';
import { ProjectService } from '../../../services/project.service';
import { Component, OnInit } from '@angular/core';
import { NguCarousel, NguCarouselStore, NguCarouselService } from '@ngu/carousel';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Project : Observable<Project[]>
  Article : Observable<Article[]>
  defaultImage = 'assets/loading.gif';
  offset = 100;
  p: number = 1;
  showSpinner = true;
  public carouselTile: NguCarousel;

  constructor(private ProjectService : ProjectService, private ArticleService : ArticleService) { }

  ngOnInit() {
    this.Article = this.ArticleService.getArticles();
    this.Project = this.ProjectService.getProjects()
    this.Project.subscribe((x) => {
      this.showSpinner = false;
    });

    this.carouselTile = {
      grid: {xs: 1, sm: 2, md: 3, lg: 4, all: 0},
      slide: 2,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: false
      },
      load: 2,
      touch: true,
      easing: 'ease'
    }
  }

}
